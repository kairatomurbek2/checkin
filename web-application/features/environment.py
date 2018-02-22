from django.test import Client
from faker import Faker
from django.core.management import call_command


def before_all(context):
    context.client = Client()
    context.faker = Faker()


def before_feature(context, feature):
    call_command('flush', verbosity=0, interactive=False)