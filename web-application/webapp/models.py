from __future__ import unicode_literals

import uuid

from PIL import Image
from datetime import timedelta

from django.conf import settings
from django.core.files.base import ContentFile
from django.db import models
from django.utils import timezone
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from django.utils.translation import ugettext_lazy as _
from pytils.translit import slugify
from redactor.fields import RedactorField
from sorl.thumbnail import ImageField, get_thumbnail
from phonenumber_field.modelfields import PhoneNumberField
from taggit.managers import TaggableManager
from main.choices import STATUS_CHOICES, SEX_CHOICES, RATING_CHOICES, STATUS_CHOICES_RESERVATION
from main.media_path import category_image_upload_path, company_path, certificate_path, specialist_path, \
    category_icon_upload_path, specialist_mobile_path, mobile_company_path
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.urls import reverse

MOBILE_IMAGE_CROP_SIZE = "150x150"


def create_schedule_setting(specialist=None, company=None):
    monday = WorkDay.objects.create()
    tuesday = WorkDay.objects.create()
    wednesday = WorkDay.objects.create()
    thursday = WorkDay.objects.create()
    friday = WorkDay.objects.create()
    saturday = WorkDay.objects.create()
    sunday = WorkDay.objects.create()

    ScheduleSetting.objects.create(specialist=specialist, company=company, monday=monday, tuesday=tuesday, wednesday=wednesday,
                                   thursday=thursday, friday=friday, saturday=saturday, sunday=sunday)


class CategoryManager(models.Manager):
    def get_queryset(self):
        return super(CategoryManager, self).get_queryset().filter(is_active=True)


class Category(MPTTModel):
    name = models.CharField(verbose_name=_('Название'), max_length=80)
    slug = models.SlugField(verbose_name=_('Ярлык'), max_length=90, unique=True)
    image = ImageField(verbose_name=_('Изображение'), upload_to=category_image_upload_path, blank=True)
    icon = ImageField(verbose_name=_('Иконка для моб приложение'), upload_to=category_icon_upload_path, blank=True)
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


class Employees(models.Model):
    user = models.OneToOneField(User, related_name='employee')
    owner = models.BooleanField(default=False, verbose_name=_('Владелец компании'))
    administrator = models.BooleanField(default=False, verbose_name=_('Администратор компании'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата добавления'))

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = _('Сотрудник')
        verbose_name_plural = _('Сотрудники')


class CompanyManager(models.Manager):
    def get_queryset(self):
        return super(CompanyManager, self).get_queryset().filter(status='AC').order_by('-rating', '-logo',
                                                                                       '-short_info',
                                                                                       '-created_at')


class Company(models.Model):
    user = models.ManyToManyField(Employees, related_name='companies', verbose_name=_('Пользователь'))
    logo = models.ImageField(verbose_name=_('Логотип'), upload_to=company_path, blank=True, null=True)
    mobile_logo = models.ImageField(verbose_name=_('Логотип для телефонов'), upload_to=mobile_company_path, blank=True,
                                    null=True)
    name = models.CharField(verbose_name=_('Название'), max_length=200)
    slug = models.SlugField(verbose_name=_('Ярлык'), unique=True, max_length=150)
    street_address = models.CharField(verbose_name=_('Адрес'), max_length=250, blank=True, null=True)
    short_info = models.TextField(verbose_name=_('Краткая информация'), max_length=250, blank=True, null=True)
    info = RedactorField(verbose_name=_('Подробная информация'))
    phone = PhoneNumberField(verbose_name=_('Номер телефона'))
    short_phone = models.CharField(max_length=6, blank=True, null=True, verbose_name=('Короткий номер'))
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
    rating = models.FloatField(verbose_name=_('Рейтинг'), editable=False, blank=True, null=True)
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

    def save(self, crop_data=None, *args, **kwargs):
        if self.rating:
            self.rating = round(self.rating, 2)

        super(Company, self).save(*args, **kwargs)

        def get_html_message(template):
            return render_to_string("email/%s.html" % template, context)

        if self.status == 'DC' and self.status != self.__original_status:
            self.__original_status = self.status

            context = {
                "message": self.message_decline
            }

            message = get_html_message("decline")
            mail = EmailMessage('Отказано в регистрации', message, to=[self.email])
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

        if self.logo and crop_data:
            img = Image.open(self.logo)

            cropped = img.crop((crop_data['x'], crop_data['y'], crop_data['x'] + crop_data['width'],
                                crop_data['y'] + crop_data['height']))
            cropped.save(self.logo.path)

        if self.logo:
            resized = get_thumbnail(self.logo, MOBILE_IMAGE_CROP_SIZE)
            self.mobile_logo.save(resized.name, ContentFile(resized.read()), False)

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
        return super(SpecialistManager, self).get_queryset().filter(status='AC').order_by('-rating', '-photo',
                                                                                          '-short_info',
                                                                                          '-created_at')


class Specialist(models.Model):
    user = models.ForeignKey(User, related_name='user_specialists', verbose_name=_('Пользователь'))
    company = models.ManyToManyField(Company, related_name='company_specialists', verbose_name=_('Учреждение'),
                                     blank=True)
    photo = models.ImageField(verbose_name=_('Фото'), upload_to=specialist_path)
    mobile_photo = models.ImageField(verbose_name=_('Фото для мобильного приложение'), upload_to=specialist_mobile_path)
    full_name = models.CharField(verbose_name=_('ФИО'), max_length=250)
    sex = models.CharField(verbose_name=_('Пол'), choices=SEX_CHOICES, max_length=10, blank=True, null=True)
    slug = models.SlugField(verbose_name=_('Ярлык'), unique=True, max_length=250)
    street_address = models.CharField(verbose_name=_('Адрес'), max_length=250, blank=True, null=True)
    short_info = models.TextField(verbose_name=_('Краткая информация'), max_length=250, blank=True, null=True)
    info = RedactorField(verbose_name=_('Подробная информация'), null=True, blank=True)
    categories = models.ManyToManyField(Category, related_name='specialist_categories', verbose_name=_('Категории'))
    status = models.CharField(choices=STATUS_CHOICES, max_length=2, default='MD', verbose_name=_('Статус'))
    message_decline = models.TextField(max_length=500, verbose_name=_('Сообщение для отказа в регистрции'), blank=True,
                                       null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Создан'))
    rating = models.FloatField(verbose_name=_('Рейтинг'), editable=False, blank=True, null=True)
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

    def save(self, crop_data=None, *args, **kwargs):
        if self.rating:
            self.rating = round(self.rating, 2)
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

            create_schedule_setting(specialist=self)

        if self.photo and crop_data:
            img = Image.open(self.photo)

            cropped = img.crop((crop_data['x'], crop_data['y'], crop_data['x'] + crop_data['width'],
                                crop_data['y'] + crop_data['height']))
            cropped.save(self.photo.path)

        if self.photo:
            resized = get_thumbnail(self.photo, MOBILE_IMAGE_CROP_SIZE)
            self.mobile_photo.save(resized.name, ContentFile(resized.read()), False)

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

    class Meta:
        verbose_name = _('Приглашение')
        verbose_name_plural = _('Приглашения')

    @classmethod
    def clean_invite(cls):
        """
        Удаление инвайтов, после N дней
        """
        cls.objects.filter(invite_date__lte=timezone.now() - timedelta(days=settings.INVITE_DAYS_LIMIT)).delete()


class WorkDay(models.Model):
    time = models.CharField(max_length=255, verbose_name=_('Время'), null=True, blank=True)
    interval = models.CharField(max_length=255, verbose_name=_('Интервал'), null=True, blank=True)
    live_recording = models.CharField(max_length=255, verbose_name=_('Живая запись'), null=True, blank=True)
    lunch_settings = models.CharField(max_length=255, verbose_name=_('Обед'), null=True, blank=True)

    class Meta:
        verbose_name = _('Рабочий день')
        verbose_name_plural = _('Рабочие дни')


class ScheduleSetting(models.Model):
    specialist = models.ForeignKey(Specialist, related_name='schedule_setting_specialist', verbose_name=_('Специалист'),
                                   null=True)
    company = models.ForeignKey(Company, related_name='schedule_setting_company', null=True, blank=True)
    monday = models.ForeignKey(WorkDay, verbose_name=_('Понедельник'), related_name='mondays', null=True, blank=True)
    tuesday = models.ForeignKey(WorkDay, verbose_name=_('Вторник'), related_name='tuesdays', null=True, blank=True)
    wednesday = models.ForeignKey(WorkDay, verbose_name=_('Среда'), related_name='wednesdays', null=True, blank=True)
    thursday = models.ForeignKey(WorkDay, verbose_name=_('Четверг'), related_name='thursday', null=True, blank=True)
    friday = models.ForeignKey(WorkDay, verbose_name=_('Пятница'), related_name='fridays', null=True, blank=True)
    saturday = models.ForeignKey(WorkDay, verbose_name=_('Суббота'), related_name='saturdays', null=True, blank=True)
    sunday = models.ForeignKey(WorkDay, verbose_name=_('Воскресенье'), related_name='sundays', null=True, blank=True)

    class Meta:
        verbose_name = _('Настройка расписание')
        verbose_name_plural = _('Настройка расписаний')


class RatingManager(models.Manager):
    def get_queryset(self):
        return super(RatingManager, self).get_queryset().order_by('-created_at')


class Rating(models.Model):
    user = models.ForeignKey(User, verbose_name=_('Пользователь'))
    specialist = models.ForeignKey(Specialist, related_name='rating_specialist', verbose_name=_('Специалист'),
                                   blank=True, null=True)
    company = models.ForeignKey(Company, related_name='rating_company', verbose_name=_('Учреждение'), blank=True,
                                null=True)

    count = models.PositiveIntegerField(choices=RATING_CHOICES, verbose_name=_('Диапазон'))
    comment = models.TextField(verbose_name=_('Комментарий'))

    created_at = models.DateTimeField(auto_now_add=True)
    all_objects = models.Manager()
    objects = RatingManager()

    class Meta:
        verbose_name = _('Рейтинг')
        verbose_name_plural = _('Рейтинги (Отзывы)')
        ordering = ['-created_at']

    def __init__(self, *args, **kwargs):
        super(Rating, self).__init__(*args, **kwargs)

    def __str__(self):
        return str(self.count)

    def get_user(self):
        return self.user.username

    def save(self, *args, **kwargs):
        super(Rating, self).save(*args, **kwargs)
        if self.specialist:
            if self.specialist.rating is None:
                self.specialist.rating = self.count
            else:
                current_rating = self.specialist.rating
                self.specialist.rating = (current_rating + float(self.count)) / 2

            self.specialist.save()

        if self.company:
            if self.company.rating is None:
                self.company.rating = self.count
            else:
                current_rating = self.company.rating
                self.company.rating = (current_rating + float(self.count)) / 2

            self.company.save()


class Reservation(models.Model):
    specialist = models.ForeignKey(Specialist, related_name='specialist_reservations')
    user = models.ForeignKey(User, related_name='user_reservations', verbose_name=_('Кто бронировал'))
    full_name = models.CharField(verbose_name=_('ФИО'), max_length=250)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Создан'))
    date_time_reservation = models.DateTimeField(verbose_name=_('Дата и время бронирование'))
    status = models.CharField(choices=STATUS_CHOICES_RESERVATION, max_length=10, default='armored',
                              verbose_name=_('Статус'))
    phone = PhoneNumberField(verbose_name=_('Номер телефона'))
    edited_at = models.DateTimeField(auto_now=True, null=True, verbose_name=_('Когда редактирован'))
    edited_by = models.ForeignKey(User, blank=True, null=True, verbose_name=_('Кем редактирован'))

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = _('Предварительный заказ')
        verbose_name_plural = _('предварительные заказы')


class FavoriteSpecialist(models.Model):
    specialist = models.ForeignKey(Specialist, related_name='specialist_favorites')
    user = models.ForeignKey(User)

    class Meta:
        verbose_name = _("Избранный специалист")
        verbose_name_plural = _("Избранные специалисты")
