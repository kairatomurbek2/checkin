import random

from allauth.account.models import EmailAddress
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from faker import Faker

from main.settings import BASE_DIR
from webapp.models import Company, Category, Specialist

ASSET_IMAGE = {
    'name': 'category_icon.png',
    'path': '%s/api_mob/tests/assets/img/category_icon.png' % BASE_DIR,
    'content_type': 'image/png'
}

SEX = [
    'Мужской', 'Женский'
]

LOGIN_URL = '/api/v1/rest-auth/login/'


class Helper(object):
    @staticmethod
    def assert_status_code(test_obj, response, status_code):
        test_obj.assertEqual(response['Content-Type'], 'application/json')
        test_obj.assertEqual(response.status_code, status_code)

    @staticmethod
    def do_request_to_login(client, url, email, password):
        return client.post(url, {
            'email': email, 'password': password
        })

    @staticmethod
    def dict_has_keys(keys, dict):
        non_existing_keys = []

        for k in keys:
            if k not in dict:
                non_existing_keys.append(k)

        if len(non_existing_keys) > 0:
            raise Exception('keys %s dont exist in dict' % non_existing_keys)

        return True

    @staticmethod
    def login_and_get_auth_token(test_obj, client, url, email, password):
        response = Helper.do_request_to_login(client, url, email, password)

        Helper.assert_status_code(test_obj, response, 200)
        json_content = response.json()

        if 'key' not in json_content:
            raise Exception('login action failed')

        return json_content['key']

    @staticmethod
    def create_user(faker, username_prefix='', default_email=''):
        username = '%s_%s' % (faker.words()[0].replace(' ', '_'), username_prefix)
        email = '%s@somemail.com' % username if default_email == '' else default_email
        password = '%s_password' % username

        user = get_user_model().objects.create(username=username, email=email)
        user.set_password(password)
        user.save()

        EmailAddress.objects.create(user=user, email=email, primary=True, verified=True)

        return dict(user=user, username=username, email=email, password=password)

    @staticmethod
    def create_company(faker, prefix='', slug=''):
        fake_word = faker.words()[0]

        company = Company.objects.create(
            name='%s_%s' % (prefix, fake_word), street_address=fake_word, short_info=fake_word,
            info=fake_word, phone='+996771177643', short_phone='0707',
            email='test@localhost', legal_data=fake_word, website='http://google.com',
            message_decline=fake_word, rating=2.5, latitude=25.6, longitude=38.9,
            slug=slug
        )

        return dict(company=company)

    @staticmethod
    def create_category(faker, img, slug=''):
        fake_word = faker.words()[0]

        category = Category.objects.create(
            name=fake_word, image=img, icon=img,
            parent=None, slug=slug
        )

        return dict(category=category)

    @staticmethod
    def create_master(faker, user, img, categories, companies, prefix=''):
        fake_word = faker.words()[0]

        master = Specialist.objects.create(
            user=user, photo=img, mobile_photo=img,
            full_name='%s_%s' % (prefix, fake_word), sex=fake_word,
            street_address=fake_word, short_info=fake_word,
            info=fake_word, message_decline=fake_word,
            rating=2.5, edited_by=user
        )

        for c in categories:
            master.categories.add(c)

        for c in companies:
            master.company.add(c)

        master.save()

        return dict(master=master)


class CreateEditMasterTest(TestCase):
    def test_create_master(self):
        faker = Faker()
        fake_word = faker.words()[0]

        user_data = Helper.create_user(faker=faker)
        company_data = Helper.create_company(faker=faker, prefix='create_master_')

        with open(ASSET_IMAGE['path'], 'rb') as category_icon:
            img = SimpleUploadedFile(name=ASSET_IMAGE['name'], content=category_icon.read(),
                                     content_type=ASSET_IMAGE['content_type'])
            category_data = Helper.create_category(faker=faker, img=img)

        auth_token = Helper.login_and_get_auth_token(self, self.client, LOGIN_URL, user_data['email'],
                                                     user_data['password'])

        with open(ASSET_IMAGE['path'], 'rb') as photo:
            master_data = {
                'company': [company_data['company'].pk],
                'full_name': fake_word,
                'sex': random.choice(SEX),
                'street_address': fake_word,
                'short_info': fake_word,
                'info': fake_word,
                'categories': [category_data['category'].pk],
                'message_decline': fake_word,
                'rating': random.randint(1, 5),
                'photo': photo
            }

            response = self.client.post(reverse('master_create_api'), master_data,
                                        **dict(HTTP_AUTHORIZATION='Token %s' % auth_token))

        Helper.assert_status_code(self, response, 201)

    def test_edit_master(self):
        faker = Faker()
        fake_word = faker.words()[0]

        user_data = Helper.create_user(faker=faker)
        current_company_data = Helper.create_company(faker=faker, prefix='first_', slug='slug_1')
        new_company_data = Helper.create_company(faker=faker, prefix='second_', slug='slug_2')

        with open(ASSET_IMAGE['path'], 'rb') as category_icon:
            img = SimpleUploadedFile(name=ASSET_IMAGE['name'], content=category_icon.read(),
                                     content_type=ASSET_IMAGE['content_type'])

            current_category_data = Helper.create_category(faker=faker, img=img, slug='slug_1')
            new_category_data = Helper.create_category(faker=faker, img=img, slug='slug_2')

            Helper.create_master(faker=faker, user=user_data['user'],
                                 img=img, categories=[current_category_data['category']],
                                 companies=[current_company_data['company']], prefix='first_')

        auth_token = Helper.login_and_get_auth_token(self, self.client, LOGIN_URL, user_data['email'],
                                                     user_data['password'])
        master_update_data = {
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

        with open(ASSET_IMAGE['path'], 'rb') as photo:
            master_update_data['photo'] = photo
            response = self.client.put(reverse('master_edit_api'), master_update_data,
                                       **dict(HTTP_AUTHORIZATION='Token %s' % auth_token))

        Helper.assert_status_code(self, response, 200)
