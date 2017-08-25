from __future__ import unicode_literals

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Sum
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from django.utils.translation import ugettext_lazy as _
from redactor.fields import RedactorField
from sorl.thumbnail import ImageField
from phonenumber_field.modelfields import PhoneNumberField

from main.choices import STATUS_CHOICES
from main.media_path import category_image_upload_path, company_path, certificate_path, specialist_path


class CategoryManager(models.Manager):
    def get_queryset(self):
        return super(CategoryManager, self).get_queryset().filter(is_active=True)


class Category(MPTTModel):
    name = models.CharField(verbose_name=_('Название'), max_length=80)
    slug = models.SlugField(verbose_name=_('Ярлык'), max_length=90, unique=True)
    image = ImageField(verbose_name=_('Изображение'), upload_to=category_image_upload_path, blank=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True)
    is_active = models.BooleanField(verbose_name=_('Активна'), default=True)
    all_objects = models.Manager()
    objects = CategoryManager()

    def __str__(self):
        return self.name

    class MPTTMeta:
        order_insertion_by = ['name']

    class Meta:
        verbose_name = _('Категория')
        verbose_name_plural = _('Категории')


class CompanyManager(models.Manager):
    def get_queryset(self):
        return super(CompanyManager, self).get_queryset().filter(status='AC').order_by('-logo', '-short_info',
                                                                                       '-created_at')


class Company(models.Model):
    user = models.ForeignKey(User, related_name='companies', verbose_name=_('Пользователь'))
    logo = models.ImageField(verbose_name=_('Логотип'), upload_to=company_path, blank=True, null=True)
    name = models.CharField(verbose_name=_('Название'), max_length=200)
    slug = models.SlugField(verbose_name=_('Ярлык'), unique=True, max_length=150)
    street_address = models.CharField(verbose_name=_('Адрес'), max_length=250, blank=True, null=True)
    short_info = models.TextField(verbose_name=_('Краткая информация'), max_length=250, blank=True, null=True)
    info = RedactorField(verbose_name=_('Подробная информация'))
    phone = PhoneNumberField(verbose_name=_('Номер телефона'))
    email = models.EmailField(verbose_name=_('Эл. адрес'))
    legal_data = models.TextField(verbose_name=_('Юридистические данные'), max_length=500, blank=True, null=True)
    website = models.URLField(verbose_name=_('Веб-сайт'), blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name='categories', verbose_name=_('Категории'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Создан'))
    edited_at = models.DateTimeField(auto_now=True, null=True, verbose_name=_('Когда редактирован'))
    edited_by = models.ForeignKey(User, blank=True, null=True, verbose_name=_('Кем редактирован'))
    status = models.CharField(choices=STATUS_CHOICES, max_length=2, default='MD', verbose_name=_('Статус'))
    all_objects = models.Manager()
    objects = CompanyManager()

    def __str__(self):
        return self.name

    def get_categories(self):
        try:
            return ', '.join(
                [i.get('name', None) for i in self.categories.values('name')])
        except TypeError:
            return ''

    class Meta:
        verbose_name = _('Учреждение')
        verbose_name_plural = _('Учреждения')


class SpecialistManager(models.Manager):
    def get_queryset(self):
        return super(SpecialistManager, self).get_queryset().order_by('-photo', '-short_info', '-created_at')


class Specialist(models.Model):
    user = models.ForeignKey(User, related_name='user_specialists', verbose_name=_('Пользователь'))
    company = models.ForeignKey(Company, related_name='company_specialists', verbose_name=_('Учреждение'), blank=True,
                                null=True)
    photo = models.ImageField(verbose_name=_('Фото'), upload_to=specialist_path)
    full_name = models.CharField(verbose_name=_('ФИО'), max_length=250)
    slug = models.SlugField(verbose_name=_('Ярлык'), unique=True, max_length=250)
    street_address = models.CharField(verbose_name=_('Адрес'), max_length=250, blank=True, null=True)
    short_info = models.TextField(verbose_name=_('Краткая информация'), max_length=250, blank=True, null=True)
    info = RedactorField(verbose_name=_('Подробная информация'))
    categories = models.ManyToManyField(Category, related_name='specialist_categories', verbose_name=_('Категории'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Создан'))
    edited_at = models.DateTimeField(auto_now=True, null=True, verbose_name=_('Когда редактирован'))
    edited_by = models.ForeignKey(User, blank=True, null=True, verbose_name=_('Кем редактирован'))
    all_objects = models.Manager()
    objects = SpecialistManager()

    def __str__(self):
        return self.full_name

    def get_categories(self):
        try:
            return ', '.join(
                [i.get('name', None) for i in self.categories.values('name')])
        except TypeError:
            return ''

    class Meta:
        verbose_name = _('Специалист')
        verbose_name_plural = _('Специалисты')


class Certificate(models.Model):
    company = models.ForeignKey(Company, related_name='certifications', verbose_name=_('Учреждение'))
    certificate = ImageField(verbose_name=_('Сертификат'), upload_to=certificate_path)
    name = models.CharField(verbose_name=_('Название'), max_length=80, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Сертификат')
        verbose_name_plural = _('Сертификаты')


class CompanyContact(models.Model):
    company = models.ForeignKey(Company, related_name='contacts', verbose_name=_('Учреждение'))
    phone = PhoneNumberField(verbose_name=_('Номер телефона'))

    class Meta:
        verbose_name = _('Контакт')
        verbose_name_plural = _('Контакты')


class SpecialistContact(models.Model):
    specialist = models.ForeignKey(Specialist, related_name='specialist_contacts', verbose_name=_('Специалист'))
    phone = PhoneNumberField(verbose_name=_('Номер телефона'))

    class Meta:
        verbose_name = _('Контакт специалиста')
        verbose_name_plural = _('Контакты специалистов')
