from django.db.models.signals import post_save
from django.dispatch import receiver

from webapp.models import Company, CompanyContact, Reservation
from webapp.firebase import FirebaseHelper

from main.settings_local import FIREBASE_URL, FIREBASE_SECRET, FIREBASE_USER_EMAIL


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
        data = {
            'user_id': specialist_user.pk,
            'message': ''
        }

        firebase_helper.reservation_new(data=data)
    else:
        user = instance.user
        data = {
            'user_id': user.pk,
            'message': ''
        }
        
        firebase_helper.reservation_changed(data=data)