from behave import *
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from features.helpers import *
import random
from webapp.models import *

use_step_matcher("re")


@given("some user who wants to be a master")
def step_impl(context):
    faker = context.faker
    fake_word = faker.words()[0]

    user_data = create_user(faker=faker)
    company_data = create_company(faker=faker, prefix='create_master_')

    with open(ASSET_IMAGE['path'], 'rb') as category_icon:
        img = SimpleUploadedFile(name=ASSET_IMAGE['name'], content=category_icon.read(),
                                 content_type=ASSET_IMAGE['content_type'])
        category_data = create_category(faker=faker, img=img)

    context.auth_token = login_and_get_auth_token(context, LOGIN_URL, user_data['email'], user_data['password'])
    context.master_data = {
        'company': [company_data['company'].pk],
        'full_name': fake_word,
        'sex': random.choice(SEX),
        'street_address': fake_word,
        'short_info': fake_word,
        'info': fake_word,
        'categories': [category_data['category'].pk],
        'message_decline': fake_word,
        'rating': random.randint(1, 5)
    }
    context.user = user_data['user']


@when('app sends request to "api_create_master" url with all required data')
def step_impl(context):
    master_data = context.master_data

    with open(ASSET_IMAGE['path'], 'rb') as photo:
        master_data['photo'] = photo
        context.response = context.client.post(reverse('master_create_api'), master_data,
                                               **dict(HTTP_AUTHORIZATION='Token %s' % context.auth_token))


@then("it should get response with success status")
def step_impl(context):
    assert_status_code(context, context.response, 201)
