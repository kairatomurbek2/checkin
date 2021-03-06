from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'f1p+^!5dp@dcy-sfzugpgmkx($pw^9h^g)6%n)#^=u3*$y$c4s'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['51.254.188.57', 'www.checkin.kg', 'checkin.kg']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.flatpages',
    'ckeditor',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'rest_framework.authtoken',
    'rest_auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_swagger',
    'rest_auth.registration',
    'sorl.thumbnail',
    'phonenumber_field',
    'dal',
    'dal_select2',
    'taggit',
    'mptt',
    'taggit_serializer',
    'modeltranslation',
    'multiselectfield',
    'redactor',
    'widget_tweaks',
    'django_filters',
    'dj_pagination',
    'webapp',
    'django_cleanup'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',
    'dj_pagination.middleware.PaginationMiddleware',
]

ROOT_URLCONF = 'main.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'webapp.context_processors.categories'
            ],
        },
    },
]

WSGI_APPLICATION = 'main.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'checkin_db',
        'USER': 'checkin',
        'PASSWORD': '3B4q2C5d'
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

# Internationalization
# MODELTRANSLATION_DEFAULT_LANGUAGE = 'ru'
# MODELTRANSLATION_FALLBACK_LANGUAGES = ('ru', )

LANGUAGE_CODE = 'ru'
LANGUAGES = (
    (u'ru', _(u'Русский')),

)

TIME_ZONE = 'Asia/Bishkek'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "staticfiles"),

]
# media
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# SORL THUMBNAIL
THUMBNAIL_COLORSPACE = None
THUMBNAIL_PRESERVE_FORMAT = True

# Redactor
REDACTOR_UPLOAD = 'uploads/'
REDACTOR_OPTIONS = {'lang': 'ru', 'plugins': ['table', 'video']}
REDACTOR_UPLOAD_HANDLER = 'redactor.handlers.UUIDUploader'

# CKEDITOR
CKEDITOR_UPLOAD_SLUGIFY_FILENAME = False
CKEDITOR_JQUERY_URL = 'http://libs.baidu.com/jquery/2.0.3/jquery.min.js'
CKEDITOR_IMAGE_BACKEND = "pillow"
CKEDITOR_UPLOAD_PATH = "uploads/"

# config ckeditor
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': (
            ['div', 'Source', '-', 'Save', 'NewPage', 'Preview', '-', 'Templates'],
            ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'SpellChecker', 'Scayt'],
            ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
            ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
            ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
            ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink', 'Anchor'],
            ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'],
            ['Styles', 'Format', 'Font', 'FontSize'],
            ['TextColor', 'BGColor'],
            ['Maximize', 'ShowBlocks', '-', 'About', 'pbckcode'],
        ),
    }
}
# allauth
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)
SITE_ID = 1
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_ADAPTER = 'webapp.adapters.AccountAdapter'

LOGIN_REDIRECT_URL = '/'

SOCIALACCOUNT_QUERY_EMAIL = True

SOCIALACCOUNT_EMAIL_REQUIRED = False
SOCIALACCOUNT_AUTO_SIGNUP = True
SOCIALACCOUNT_EMAIL_VERIFICATION = None

# Taggit
TAGGIT_CASE_INSENSITIVE = True

# email configuration
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'chekin.kg@gmail.com'
EMAIL_HOST_PASSWORD = 'chekin123'
EMAIL_PORT = 587

# Rest Framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_PERMISSION_CLASSES': (
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    )
}

DOMAIN_URL = 'http://51.254.188.57'

SOCIALACCOUNT_PROVIDERS = \
    {'facebook':
         {'METHOD': 'oauth2',
          'SCOPE': ['email', 'public_profile', 'user_friends'],
          'AUTH_PARAMS': {'auth_type': 'rerequest'},
          'FIELDS': [
              'id',
              'email',
              'name',
              'first_name',
              'last_name',
              'verified',
              'locale',
              'timezone',
              'link',
              'gender',
              'updated_time'],
          'EXCHANGE_TOKEN': True,
          'LOCALE_FUNC': lambda request: 'ru_RU',
          'VERIFIED_EMAIL': False,
          'VERSION': 'v2.4'},
     'google':
         {'SCOPE': ['email'],
          'AUTH_PARAMS': {'access_type': 'online'}
          }

     }

FIREBASE_URL = 'https://checkin-kg.firebaseio.com'
FIREBASE_SECRET = 'w6wF4M8FEE385fmGJYOzhhTIXisKFDjGM2drdSbs'
FIREBASE_USER_EMAIL = 'chekin.kg@gmail.com'
FCM_PRIVATE_KEY = 'AAAABby6uJE:APA91bGTg3z6Ayd9CF9Xf7Fmd54D9zwfj9eoFbhuN-dQeqTLFNYgdMkZzq2DuEArVHJJHPapAaQKYszCdTxSFOU4Xx2MftrxjmEXPaZxA_GKjAGyyQKvdT9vQ-wxG4TQtAubvnm8ebOY'

INVITE_DAYS_LIMIT = 12
SPECIALIST_CREATE_PERMISSION_DENIED = 'SPECIALIST_CREATE_PERMISSION_DENIED'
COMPANY_CREATE_PERMISSION_DENIED = 'COMPANY_CREATE_PERMISSION_DENIED'

try:
    from settings_local import *
except ImportError:
    pass
