from django.conf import settings
from django.db import transaction
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver

from webapp.models import Company, CompanyContact, Reservation, Specialist, create_schedule_setting, ScheduleSetting
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
                                     firebase_email=settings.FIREBASE_USER_EMAIL)

    if created or instance.status in [CONFIRMED, REFUSED]:
        specialist = instance.specialist
        user = instance.user
        date_time = instance.date_time_reservation.strftime('%m %b,%H:%M').split(',')

        if created:
            msg = Messages.Firebase.new_reservation.format(**{
                'user': instance.user.username,
                'date': date_time[0],
                'time': date_time[1]
            })
        else:
            message_template = Messages.Firebase.reservation_confirmed if instance.status == CONFIRMED else \
                Messages.Firebase.reservation_refused

            msg = message_template.format(**{
                'specialist': instance.specialist.user.username,
                'date': date_time[0],
                'time': date_time[1]
            })

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

        if created:
            firebase_helper.reservation_new(data=data)
        else:
            firebase_helper.reservation_changed(data=data)


def specialist_companies_changed(sender, instance, **kwargs):
    with transaction.atomic():
        if kwargs['action'] == 'post_add':
            spec_schedule = ScheduleSetting.objects.filter(specialist=instance, company=None).first()

            if spec_schedule is not None:
                spec_schedule.truncate_fields()

            for pk in list(kwargs['pk_set']):
                create_schedule_setting(specialist=instance, company=Company.objects.get(pk=pk))


m2m_changed.connect(specialist_companies_changed, sender=Specialist.company.through)