from django.conf import settings
from django.core.files.base import ContentFile
from django.db import transaction
from django.db.models import signals
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from sorl.thumbnail import get_thumbnail

from main.settings import FCM_PRIVATE_KEY
from webapp.models import Company, CompanyContact, Reservation, Specialist, create_schedule_setting, ScheduleSetting, \
    MOBILE_IMAGE_CROP_SIZE
from webapp.firebase import FirebaseHelper

# from main.settings_local import FIREBASE_URL, FIREBASE_SECRET, FIREBASE_USER_EMAIL
from main.parameters import Messages
from main.choices import CONFIRMED, REFUSED


@receiver(post_save, sender=Company)
def create_company_phone(sender, instance, created, **kwargs):
    if created:
        CompanyContact.objects.get_or_create(company=instance, phone=instance.phone)
        instance.save()


@receiver(post_save, sender=Reservation)
def create_or_change_reservation(sender, instance, created, **kwargs):
    firebase_helper = FirebaseHelper(firebase_url=settings.FIREBASE_URL, firebase_secret=settings.FIREBASE_SECRET,
                                     firebase_email=settings.FIREBASE_USER_EMAIL, fcm_key=FCM_PRIVATE_KEY)

    if created or instance.status in [CONFIRMED, REFUSED]:
        specialist = instance.specialist
        user = instance.user
        date_time = instance.date_time_reservation.strftime('%m %b,%H:%M').split(',')

        if created:
            msg = Messages.Firebase.new_reservation.format(**{
                'user': '%s %s' % (instance.user.last_name, instance.user.first_name),
                'date': date_time[0],
                'time': date_time[1]
            })
            push_receiver = instance.specialist.user
        else:
            message_template = Messages.Firebase.reservation_confirmed if instance.status == CONFIRMED else \
                Messages.Firebase.reservation_refused

            msg = message_template.format(**{
                'specialist': instance.specialist.full_name,
                'date': date_time[0],
                'time': date_time[1]
            })
            push_receiver = instance.user

        data = {
            'id': instance.pk,
            'specialist_slug': specialist.slug,
            'user_id': user.pk,
            'full_name': instance.full_name,
            'date_time': instance.date_time_reservation,
            'phone': str(instance.phone),
            'message': msg,
            'status': str(instance.status)
        }

        devices_ids = [t.firebase_id for t in push_receiver.fcm_tokens.all()]

        if created:
            firebase_helper.reservation_new(data=data, notification_title='Новое уведомление', notification_body=msg,
                                            devices_ids=devices_ids)
        else:
            firebase_helper.reservation_changed(data=data, notification_title='Новое уведомление', notification_body=msg,
                                                devices_ids=devices_ids)


@receiver(post_save, sender=Specialist)
def create_mobile_photo_for_specialist(sender, instance, created, **kwargs):
    if instance.photo:
        resized = get_thumbnail(instance.photo, MOBILE_IMAGE_CROP_SIZE)

        signals.post_save.disconnect(create_mobile_photo_for_specialist, sender=Specialist)
        instance.mobile_photo.save(resized.name, ContentFile(resized.read()), False)
        instance.save()
        signals.post_save.connect(create_mobile_photo_for_specialist, sender=Specialist)


def specialist_companies_changed(sender, instance, **kwargs):
    with transaction.atomic():
        if kwargs['action'] == 'post_add':
            spec_schedule = ScheduleSetting.objects.filter(specialist=instance, company=None).first()

            if spec_schedule is not None:
                spec_schedule.truncate_fields()

            for pk in list(kwargs['pk_set']):
                create_schedule_setting(specialist=instance, company=Company.objects.get(pk=pk))


m2m_changed.connect(specialist_companies_changed, sender=Specialist.company.through)