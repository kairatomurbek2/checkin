from django.core.files.base import ContentFile
from django.core.management import BaseCommand
from sorl.thumbnail import get_thumbnail

from webapp.models import Specialist, Company


class Command(BaseCommand):
    def handle(self, *args, **options):
        for company in Company.all_objects.all():
            resized = get_thumbnail(company.mobile_logo, "150x150")
            company.mobile_logo.save(resized.name, ContentFile(resized.read()), True)
            company.save()
