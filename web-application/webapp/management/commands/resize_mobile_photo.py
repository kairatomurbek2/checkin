from django.core.files.base import ContentFile
from django.core.management import BaseCommand
from sorl.thumbnail import get_thumbnail

from webapp.models import Specialist


class Command(BaseCommand):
    def handle(self, *args, **options):
        for specialist in Specialist.objects.all():
            resized = get_thumbnail(specialist.mobile_photo, "150x150")
            specialist.mobile_photo.save(resized.name, ContentFile(resized.read()), True)
            specialist.save()
