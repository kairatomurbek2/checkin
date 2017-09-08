from django.db.models.signals import post_save
from django.dispatch import receiver

from webapp.models import Company, CompanyContact


@receiver(post_save, sender=Company)
def create_company_phone(sender, instance, created, **kwargs):
    if created:
        CompanyContact.objects.get_or_create(company=instance, phone=instance.phone)
        instance.save()
