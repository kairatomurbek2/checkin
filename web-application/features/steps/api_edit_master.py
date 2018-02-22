from behave import *
from django.core.files.uploadedfile import SimpleUploadedFile
from features.helpers import *
import random
from webapp.models import *

use_step_matcher("re")


@given("a user who is already a master")
def step_impl(context):
    faker = context.faker
    fake_word = faker.words()[0]

    user_data = create_user(faker=faker)
    current_company_data = create_company(faker=faker, prefix='first_', slug='slug_1')
    new_company_data = create_company(faker=faker, prefix='second_', slug='slug_2')

    with open(ASSET_IMAGE['path'], 'rb') as category_icon:
        img = SimpleUploadedFile(name=ASSET_IMAGE['name'], content=category_icon.read(),
                                 content_type=ASSET_IMAGE['content_type'])

        current_category_data = create_category(faker=faker, img=img, slug='slug_1')
        new_category_data = create_category(faker=faker, img=img, slug='slug_2')

        create_master(faker=faker, user=user_data['user'],
                      img=img, categories=[current_category_data['category']],
                      companies=[current_company_data['company']], prefix='first_')

    context.auth_token = login_and_get_auth_token(context, LOGIN_URL, user_data['email'], user_data['password'])
    context.master_update_data = {
        'company': [new_company_data['company'].pk, current_company_data['company'].pk],
        'full_name': fake_word,
        'sex': random.choice(SEX),
        'street_address': fake_word,
        'short_info': fake_word,
        'info': fake_word,
        'categories': [new_category_data['category'].pk, current_category_data['category'].pk],
        'message_decline': fake_word,
        'rating': random.randint(1, 5)
    }
    context.user = user_data['user']


@when('app sends request to "api_edit_master" url with updating required data')
def step_impl(context):
    master_data = context.master_update_data

    with open(ASSET_IMAGE['path'], 'rb') as photo:
        master_data['photo'] = photo
        context.response = context.client.put(reverse('master_edit_api'), master_data,
                                               **dict(HTTP_AUTHORIZATION='Token %s' % context.auth_token))


@then("it should get response with update success status")
def step_impl(context):
    assert_status_code(context, context.response, 200)
