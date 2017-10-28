from __future__ import unicode_literals

import uuid

from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.db import models
from django.template.loader import render_to_string
from django.urls import reverse
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from django.utils.translation import ugettext_lazy as _
from pytils.translit import slugify
from redactor.fields import RedactorField
from sorl.thumbnail import ImageField
from phonenumber_field.modelfields import PhoneNumberField
from taggit.managers import TaggableManager
from main.choices import STATUS_CHOICES, SEX_CHOICES
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
    message_decline = models.TextField(max_length=500, verbose_name=_('Сообщение для отказа в регистрции'), blank=True,
                                       null=True)
    company_tags = TaggableManager(verbose_name=_('Услуги'), blank=True)
    latitude = models.FloatField(blank=True, null=True, verbose_name=_("Широта"))
    longitude = models.FloatField(blank=True, null=True, verbose_name=_("Долгота"))
    all_objects = models.Manager()
    objects = CompanyManager()

    __original_status = None

    def __init__(self, *args, **kwargs):
        super(Company, self).__init__(*args, **kwargs)
        self.__original_status = self.status

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Company, self).save(*args, **kwargs)

        def get_html_message(template):
            return render_to_string("email/%s.html" % template, context)

        if self.status == 'DC' and self.status != self.__original_status:
            self.__original_status = self.status

            context = {
                "message": self.message_decline
            }

            message = get_html_message("decline")
            mail = EmailMessage('Отказано в регистриции', message, to=[self.email])
            mail.content_subtype = 'html'
            mail.send()

        elif self.status == 'AC' and self.status != self.__original_status:
            self.__original_status = self.status

            context = {
                "message": "Вы успешно зарегистрированы на нашей платформе"
            }

            message = get_html_message("success_to_active")
            mail = EmailMessage('Успешная регистрация компании', message, to=[self.email])
            mail.content_subtype = 'html'
            mail.send()

    def get_categories(self):
        try:
            return ', '.join(
                [i.get('name', None) for i in self.categories.values('name')])
        except TypeError:
            return ''

    def get_absolute_url(self):
        return reverse('company_detail', kwargs={'company_slug': self.slug})

    class Meta:
        verbose_name = _('Учреждение')
        verbose_name_plural = _('Учреждения')


class SpecialistManager(models.Manager):
    def get_queryset(self):
        return super(SpecialistManager, self).get_queryset().filter(status='AC').order_by('-photo', '-short_info',
                                                                                          '-created_at')


class Specialist(models.Model):
    user = models.ForeignKey(User, related_name='user_specialists', verbose_name=_('Пользователь'))
    company = models.ForeignKey(Company, related_name='company_specialists', verbose_name=_('Учреждение'), blank=True,
                                null=True)
    photo = models.ImageField(verbose_name=_('Фото'), upload_to=specialist_path)
    full_name = models.CharField(verbose_name=_('ФИО'), max_length=250)
    sex = models.CharField(verbose_name=_('Пол'), choices=SEX_CHOICES, max_length=10, blank=True, null=True)
    slug = models.SlugField(verbose_name=_('Ярлык'), unique=True, max_length=250)
    street_address = models.CharField(verbose_name=_('Адрес'), max_length=250, blank=True, null=True)
    short_info = models.TextField(verbose_name=_('Краткая информация'), max_length=250, blank=True, null=True)
    info = RedactorField(verbose_name=_('Подробная информация'))
    categories = models.ManyToManyField(Category, related_name='specialist_categories', verbose_name=_('Категории'))
    status = models.CharField(choices=STATUS_CHOICES, max_length=2, default='MD', verbose_name=_('Статус'))
    message_decline = models.TextField(max_length=500, verbose_name=_('Сообщение для отказа в регистрции'), blank=True,
                                       null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Создан'))
    edited_at = models.DateTimeField(auto_now=True, null=True, verbose_name=_('Когда редактирован'))
    edited_by = models.ForeignKey(User, blank=True, null=True, verbose_name=_('Кем редактирован'))
    tags = TaggableManager(verbose_name=_('Услуги'), blank=True)
    all_objects = models.Manager()
    objects = SpecialistManager()

    def __init__(self, *args, **kwargs):
        super(Specialist, self).__init__(*args, **kwargs)
        self.__original_status = self.status

    def __str__(self):
        return self.full_name

    def get_categories(self):
        try:
            return ', '.join(
                [i.get('name', None) for i in self.categories.values('name')])
        except TypeError:
            return ''

    def get_absolute_url(self):
        return reverse('master_detail', kwargs={'master_slug': self.slug})

    def save(self, *args, **kwargs):
        super(Specialist, self).save(*args, **kwargs)

        if not self.slug:
            self.slug = slugify(self.full_name + '-' + str(self.id))

        def get_html_message(template):
            return render_to_string("email/%s.html" % template, context)

        if self.status == 'DC' and self.status != self.__original_status:
            self.__original_status = self.status

            context = {
                "message": self.message_decline
            }

            message = get_html_message("decline")
            mail = EmailMessage('Отказано в регистриции', message, to=[self.user.email])
            mail.content_subtype = 'html'
            mail.send()

        elif self.status == 'AC' and self.status != self.__original_status:
            self.__original_status = self.status

            context = {
                "message": "Вы успешно зарегистрированы на нашей платформе"
            }

            message = get_html_message("success_to_active")
            mail = EmailMessage('Успешная регистрация специалиста', message, to=[self.user.email])
            mail.content_subtype = 'html'
            mail.send()

    class Meta:
        verbose_name = _('Специалист')
        verbose_name_plural = _('Специалисты')


class Certificate(models.Model):
    company = models.ForeignKey(Company, related_name='certifications', verbose_name=_('Учреждение'), blank=True,
                                null=True)
    specialist = models.ForeignKey(Specialist, related_name='specialist_certifications', blank=True, null=True)
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


class Invite(models.Model):
    invite_date = models.DateField(auto_now_add=True, verbose_name=_('Даты отправки инвайта'))
    invite_from = models.ForeignKey(User, verbose_name=_('Приглашение от  отправителя'), related_name='invites_sent')
    invite_to = models.ForeignKey(User, verbose_name=_('Приглашение в отправителю'), related_name='invites_received')
    invite_company = models.ForeignKey(Company, verbose_name=_('Приглашение в компанию'))
    accepted = models.BooleanField(default=False)
    code = models.CharField(max_length=64, default=uuid.uuid4, editable=False)

    def get_company_list(self):
        return self.invite_company.all()

    class Meta:
        verbose_name = _('Приглашение')
        verbose_name_plural = _('Приглашения')


class TimeInterval(models.Model):
    time_interval = models.CharField(max_length=255, verbose_name=_('Время'))

    def __str__(self):
        return self.time_interval

    class Meta:
        verbose_name = _('Промежуток времени')
        verbose_name_plural = _('Промежутки времени')


class ScheduleSetting(models.Model):
    specialist = models.ForeignKey(Specialist, related_name='schedule_setting_specialist', verbose_name=_('Специалист'),
                                   null=True)
    monday = models.CharField(max_length=255, verbose_name=_('Понедельник'), null=True, blank=True)
    tuesday = models.CharField(max_length=255, verbose_name=_('Вторник'), null=True, blank=True)
    wednesday = models.CharField(max_length=255, verbose_name=_('Среда'), null=True, blank=True)
    thursday = models.CharField(max_length=255, verbose_name=_('Четверг'), null=True, blank=True)
    friday = models.CharField(max_length=255, verbose_name=_('Пятница'), null=True, blank=True)
    saturday = models.CharField(max_length=255, verbose_name=_('Суббота'), null=True, blank=True)
    sunday = models.CharField(max_length=255, verbose_name=_('Воскресенье'), null=True, blank=True)
    lunch = models.CharField(max_length=255, verbose_name=_('Обед'), null=True, blank=True)
    time_interval = models.ForeignKey(TimeInterval, related_name='time_intervals_schedule')

    def __str__(self):
        return self.specialist.full_name

    class Meta:
        verbose_name = _('Настройка расписание')
        verbose_name_plural = _('Настройка расписаний')
