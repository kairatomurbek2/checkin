from django.core.management import BaseCommand

from webapp.models import Specialist, Company


class Command(BaseCommand):
    def handle(self, *args, **options):
        for company in Company.all_objects.all():
            company.mobile_logo = company.logo
            company.save()
