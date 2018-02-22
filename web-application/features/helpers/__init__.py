import os

from allauth.account.models import EmailAddress
from django.contrib.auth import get_user_model

from webapp.models import *

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ASSET_IMAGE = {
    'name': 'category_icon.png',
    'path': '%s/assets/img/category_icon.png' % BASE_DIR,
    'content_type': 'image/png'
}

LOGIN_URL = '/api/v1/rest-auth/login/'


def assert_status_code(context, response, status_code):
    context.test.assertEqual(response['Content-Type'], 'application/json')
    context.test.assertEqual(response.status_code, status_code)


def do_request_to_login(context, url, email, password):
    return context.client.post(url, {
        'email': email, 'password': password
    })


def dict_has_keys(keys, dict):
    non_existing_keys = []

    for k in keys:
        if k not in dict:
            non_existing_keys.append(k)

    if len(non_existing_keys) > 0:
        raise Exception('keys %s dont exist in dict' % non_existing_keys)

    return True


def login_and_get_auth_token(context, url, email, password):
    response = do_request_to_login(context, url, email, password)

    assert_status_code(context, response, 200)
    json_content = response.json()

    if 'key' not in json_content:
        raise Exception('login action failed')

    return json_content['key']


def create_user(faker, username_prefix='', default_email=''):
    username = '%s_%s' % (faker.words()[0].replace(' ', '_'), username_prefix)
    email = '%s@somemail.com' % username if default_email == '' else default_email
    password = '%s_password' % username

    user = get_user_model().objects.create(username=username, email=email)
    user.set_password(password)
    user.save()

    EmailAddress.objects.create(user=user, email=email, primary=True, verified=True)

    return dict(user=user, username=username, email=email, password=password)


def create_company(faker):
    fake_word = faker.words()[0]

    company = Company.objects.create(
        name=fake_word, street_address=fake_word, short_info=fake_word,
        info=fake_word, phone='+996771177643', short_phone='0707',
        email='test@localhost', legal_data=fake_word, website='http://google.com',
        message_decline=fake_word, rating=2.5, latitude=25.6, longitude=38.9
    )

    return dict(company=company)


def create_category(faker, img):
    fake_word = faker.words()[0]

    category = Category.objects.create(
        name=fake_word, image=img, icon=img,
        parent=None
    )

    return dict(category=category)