from django.core.management import BaseCommand

from webapp.models import Specialist


class Command(BaseCommand):
    def handle(self, *args, **options):
        for specialist in Specialist.objects.all():
            specialist.mobile_photo = specialist.photo
            specialist.save()
