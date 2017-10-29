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
from main.choices import STATUS_CHOICES, SEX_CHOICES, RATING_CHOICES
from main.media_path import category_image_upload_path, company_path, certificate_path, specialist_path
import datetime
from smtplib import SMTPException
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.urls import reverse
from django.views.generic import CreateView
from django.views.generic import ListView
from django.views.generic import TemplateView
from django.views.generic import UpdateView
from main.parameters import Messages
from webapp import forms
from webapp.forms import CertFormSet, PhoneFormSet
from webapp.models import Company, Category, Specialist, Invite, Rating
from webapp.views.base_views import BaseFormView
from webapp.views.filters import CompanyFilter


class CompanySpecialistList(ListView):
    template_name = 'category/company_specialist_list.html'
    filterset_class = CompanyFilter
    model = Company

    def get_context_data(self, **kwargs):
        context = super(CompanySpecialistList, self).get_context_data(**kwargs)
        company_filter = self.filterset_class(self.request.GET, queryset=self._get_company())
        master_filter = self.filterset_class(self.request.GET, queryset=self._get_specialist())
        context['filter'] = company_filter.form
        context['companies'] = company_filter
        context['masters'] = master_filter
        return context

    def _get_company(self):
        return Company.objects.filter(categories__in=[i for i in
                                                      Category.objects.get(slug=self.kwargs['slug']).get_descendants(
                                                          include_self=True)])

    def _get_specialist(self):
        return Specialist.objects.filter(categories__in=[i for i in
                                                         Category.objects.get(
                                                             slug=self.kwargs['slug']).get_descendants(
                                                             include_self=True)])


class CompanyList(ListView):
    template_name = 'company/company_list.html'
    filterset_class = CompanyFilter
    model = Company
    context_object_name = 'company_list'
    paginate_by = 24

    def get_queryset(self):
        if self.request.is_ajax():
            self.template_name = 'company/object.html'
        return Company.objects.all()

    def get_context_data(self, **kwargs):
        context = super(CompanyList, self).get_context_data(**kwargs)
        company_filter = self.filterset_class(self.request.GET, queryset=self.get_queryset())
        context['filter'] = company_filter.form
        pagination = Paginator(company_filter.qs, self.paginate_by)
        page = self.request.GET.get('page')
        try:
            company_list = pagination.page(page)
        except PageNotAnInteger:
            company_list = pagination.page(1)
        except EmptyPage:
            raise Http404("That page contains no results")
        context['company_list'] = company_list.object_list
        context['is_paginated'] = company_list.has_next()
        return context


class CompanyCreateView(LoginRequiredMixin, CreateView):
    success_message = Messages.AddCompany.adding_success
    error_message = Messages.AddCompany.adding_error
    template_name = 'company/new_company.html'
    model = Company
    form_class = forms.CompanyCreateForm

    def get_context_data(self, **kwargs):
        context = super(CompanyCreateView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = CertFormSet(self.request.POST, self.request.FILES)
        else:
            context['formset'] = CertFormSet()
        return context

    def get_success_url(self):
        messages.add_message(self.request, messages.SUCCESS, self.success_message)
        return reverse('company_detail', args=(self.object.slug,))

    def form_valid(self, form):
        context = self.get_context_data()
        formset = context['formset']
        company = form.save(commit=False)
        company.user = self.request.user
        company.edited_at = datetime.datetime.now()
        company.edited_by = self.request.user
        company.save()
        if formset.is_valid():
            formset.instance = company
            formset.save()
        form.save_m2m()
        self.send_email_notification(company)
        return super(CompanyCreateView, self).form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, self.error_message)
        return super(CompanyCreateView, self).form_invalid(form)

    @staticmethod
    def send_email_notification(company):
        context = {
            "name": company.name,
            "link": settings.DOMAIN_URL + '/admin/webapp/company/' + str(company.id) + '/change/',
            "created_at": company.created_at,
            "phone": company.phone,
            "email": company.email
        }

        def get_html_message():
            return render_to_string("email/success_reg_company.html", context)

        message = get_html_message()
        mail = EmailMessage('Зарегистрирована новая компания', message, to=[settings.EMAIL_HOST_USER])
        mail.content_subtype = 'html'
        mail.send()


class CompanyDetail(TemplateView):
    template_name = 'company/company_detail.html'

    model = Company

    def get_context_data(self, **kwargs):
        context = super(CompanyDetail, self).get_context_data(**kwargs)
        context['company'] = get_object_or_404(self.model, slug=self.kwargs.get('company_slug'))
        context['form'] = forms.RatingForm
        return context


class CompanyEditView(LoginRequiredMixin, UpdateView):
    success_message = Messages.AddCompany.update_success
    error_message = Messages.AddCompany.adding_error
    template_name = 'company/edit_company.html'
    model = Company
    form_class = forms.CompanyUpdateForm

    def get_object(self, queryset=None):
        return Company.all_objects.get(slug=self.kwargs['company_slug'])

    def get_context_data(self, **kwargs):
        context = super(CompanyEditView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = CertFormSet(self.request.POST, self.request.FILES, instance=self.object)
            context['phones'] = PhoneFormSet(self.request.POST, instance=self.object)
        else:
            context['formset'] = CertFormSet(instance=self.object)
            context['phones'] = PhoneFormSet(instance=self.object)
        return context

    def get_success_url(self):
        messages.add_message(self.request, messages.SUCCESS, self.success_message)
        return reverse('company_detail', args=(self.object.slug,))

    def form_valid(self, form):
        context = self.get_context_data()
        phones = context['phones']
        formset = context['formset']
        company = form.save(commit=False)
        company.edited_at = datetime.datetime.now()
        company.edited_by = self.request.user
        company.save()
        if phones.is_valid() and formset.is_valid():
            phones.save()
            formset.save()
        form.save_m2m()
        return super(CompanyEditView, self).form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, self.error_message)
        return super(CompanyEditView, self).form_invalid(form)


class SpecialistSearchView(BaseFormView):
    template_name = 'company/specialist_search.html'
    form_class = forms.SpecialistSearchForm
    users = User.objects.none()

    def post(self, request, *args, **kwargs):
        form = self.form_class(**self.get_form_kwargs())
        if form.is_valid():
            self.users = self.__get_users(form)
            if 'invite_user' in request.POST:
                invite_form = forms.UserInviteForm(users=self.users, **self.get_form_kwargs())
                if invite_form.is_valid():
                    return self.invite_form_valid(invite_form)
                return self.invite_form_invalid(form, invite_form)
            return self.form_valid(form)
        return self.form_invalid(form)

    def form_valid(self, form):
        invite_form = None
        if self.users:
            invite_form = forms.UserInviteForm(users=self.users)
        else:
            messages.error(self.request, Messages.UserInvite.user_not_found)
        return self.render_to_response({'form': form, 'users': self.users, 'invite_form': invite_form})

    def __get_users(self, form):
        company = Company.objects.get(slug=self.kwargs['company_slug'])
        email = form.cleaned_data['email']
        if not Specialist.objects.filter(user__email=email, company=company):
            users = User.objects.filter(email=email)
            if email:
                users = users.filter(email=email)
            return users

    def invite_form_valid(self, invite_form):
        invite = self.__create_invite(invite_form)
        company = Company.objects.get(slug=self.kwargs['company_slug'])
        self.__send_email_to_user(invite, invite_form.cleaned_data['user'])
        return HttpResponseRedirect(company.get_absolute_url())

    def __create_invite(self, invite_form):
        company = Company.objects.get(slug=self.kwargs['company_slug'])
        user = invite_form.cleaned_data['user']
        invite = Invite.objects.create(invite_from=self.request.user, invite_to=user, invite_company=company)
        return invite

    def __send_email_to_user(self, invite, user):
        context = {
            'invite': invite,
            'base_url': settings.DOMAIN_URL
        }
        html_template = 'email/company_invite_notification.html'
        plain_template = 'email/company_invite_notification.txt'
        subject = 'Приглашение от учреждение %s' % Company.objects.get(slug=self.kwargs['company_slug'])
        html_content = render_to_string(html_template, context)
        plain_content = render_to_string(plain_template, context)
        try:
            user.email_user(
                subject=subject,
                message=plain_content,
                from_email=settings.EMAIL_HOST_USER,
                html_message=html_content
            )
            messages.success(self.request, Messages.UserInvite.user_invite_success)
        except SMTPException:
            messages.error(self.request, Messages.UserInvite.user_invite_failed)

    def invite_form_invalid(self, form, invite_form):
        messages.error(self.request, Messages.UserInvite.user_invite_error)
        return self.render_to_response({'form': form, 'users': self.users, 'invite_form': invite_form})


class CreateReviewForCompanyView(LoginRequiredMixin, CreateView):
    model = Rating
    form_class = forms.RatingForm
    template_name = 'company/company_detail.html'

    def get_success_url(self):
        return reverse('company_detail', args=(self.kwargs.get('company_slug'),))

    def form_valid(self, form):
        company = Company.objects.get(slug=self.kwargs.get('company_slug'))
        rating = form.save(commit=False)
        rating.user = self.request.user
        rating.company = company

        return super(CreateReviewForCompanyView, self).form_valid(form)


class ReviewCompanyListView(ListView):
    template_name = 'company/all_review.html'
    model = Rating

    def get_queryset(self):

        queryset = Rating.objects.filter(company__slug=self.kwargs.get('company_slug'))

        return queryset


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
        return super(CompanyManager, self).get_queryset().filter(status='AC').order_by('-rating', '-logo',
                                                                                       '-short_info',
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

    def save(self, *args, **kwargs):

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
        return super(SpecialistManager, self).get_queryset().filter(status='AC').order_by('-rating', '-photo',
                                                                                          '-short_info',
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

    def save(self, *args, **kwargs):

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
        ordering = ['created_at']

    def __init__(self, *args, **kwargs):
        super(Rating, self).__init__(*args, **kwargs)

    def __str__(self):
        return str(self.count)

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
