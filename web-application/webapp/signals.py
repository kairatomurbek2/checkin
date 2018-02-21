from django.db.models.signals import post_save
from django.dispatch import receiver

from webapp.models import Company, CompanyContact, Reservation
from webapp.firebase import FirebaseHelper

from main.settings_local import FIREBASE_URL, FIREBASE_SECRET, FIREBASE_USER_EMAIL
from main.parameters import Messages
from main.choices import CONFIRMED, REFUSED


@receiver(post_save, sender=Company)
def create_company_phone(sender, instance, created, **kwargs):
    if created:
        CompanyContact.objects.get_or_create(company=instance, phone=instance.phone)
        instance.save()


@receiver(post_save, sender=Reservation)
def create_or_change_reservation(sender, instance, created, **kwargs):
    firebase_helper = FirebaseHelper(firebase_url=FIREBASE_URL, firebase_secret=FIREBASE_SECRET,
                                     firebase_email=FIREBASE_USER_EMAIL)

    if created:
        specialist_user = instance.specialist.user
        date_time = instance.date_time_reservation.strftime('%m %b,%H:%M').split(',')

        msg = Messages.Firebase.new_reservation.format(**{
            'user': instance.user.username,
            'date': date_time[0],
            'time': date_time[1]
        })
        data = {
            'user_id': specialist_user.pk,
            'message': msg
        }

        firebase_helper.reservation_new(data=data)
    elif instance.status in [CONFIRMED, REFUSED]:
        user = instance.user
        message_template = Messages.Firebase.reservation_accepted if instance.status == CONFIRMED else \
                           Messages.Firebase.reservation_declined
        date_time = instance.date_time_reservation.strftime('%m %b,%H:%M').split(',')

        msg = message_template.format(**{
            'specialist': instance.specialist.user.username,
            'date': date_time[0],
            'time': date_time[1]
        })
        data = {
            'user_id': user.pk,
            'message': msg
        }

        firebase_helper.reservation_changed(data=data)
