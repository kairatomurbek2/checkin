from django.core.management import BaseCommand

from webapp.models import Invite


class Command(BaseCommand):
    def handle(self, *args, **options):
        Invite.clean_invite()
