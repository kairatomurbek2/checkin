import datetime
import json
import threading
from smtplib import SMTPException

from django.db import transaction
from django.db.models import Q
from allauth.account.models import EmailAddress
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect
from django.template.loader import render_to_string
from django.urls import reverse
from django.views import View
from django.views.generic import CreateView
from django.views.generic import FormView
from django.views.generic import ListView
from django.views.generic import TemplateView
from django.views.generic import UpdateView

from main.choices import ACTIVE
from main.parameters import Messages
from webapp import forms
from webapp.forms import CertFormSet, PhoneFormSet
from webapp.models import Company, Category, Specialist, Invite, Rating, Employees, Reservation
from webapp.views.base_views import BaseFormView
from webapp.views.filters import CompanyFilter, ReservationFilter, SpecialistFilter, CompanySpecialistFilter
from webapp.views.specialist import ReservationTableListView


class CompanySpecialistList(ListView):
    template_name = 'category/company_specialist_list.html'
    filterset_class = CompanySpecialistFilter
    model = Company

    def get_context_data(self, **kwargs):
        context = super(CompanySpecialistList, self).get_context_data(**kwargs)
        company_filter = self.filterset_class(self.request.GET, queryset=self._get_company())
        master_filter = self.filterset_class(self.request.GET, queryset=self._get_specialist())
        if self.kwargs['slug']:
            try:
                category = Category.objects.get(slug=self.kwargs['slug'])
                if category.is_root_node() or (category.is_child_node() and not category.is_leaf_node()):
                    context['category_list'] = category.get_children()
                elif category.is_leaf_node():
                    context['category_list'] = category.get_siblings(include_self=True)
                context['category'] = category
            except:
                raise Http404
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


class MastersCompanyListView(ListView):
    template_name = 'company/master_list.html'
    filterset_class = SpecialistFilter
    model = Specialist
    context_object_name = 'master_list'

    def get_context_data(self, **kwargs):
        context = super(MastersCompanyListView, self).get_context_data(**kwargs)
        master_filter = self.filterset_class(self.request.GET, queryset=Specialist.objects.filter(
            company__slug=self.kwargs['company_slug']))
        context['master_list'] = master_filter
        context['company'] = Company.objects.get(slug=self.kwargs['company_slug'])
        return context


class MasterCompanyDetailView(TemplateView):
    template_name = 'company/master_reservation.html'
    model = Specialist

    def get_context_data(self, **kwargs):
        context = super(MasterCompanyDetailView, self).get_context_data(**kwargs)
        master = get_object_or_404(self.model, slug=self.kwargs.get('master_slug'))
        context['master'] = master
        context['company'] = Company.objects.get(slug=self.kwargs['company_slug'])
        return context


class CompanyCreateView(CreateView):
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
        with transaction.atomic():
            image_crop_data = self.request.POST.get('image-crop-data')
            crop_data_json = json.loads(image_crop_data) if image_crop_data else None

            context = self.get_context_data()
            formset = context['formset']
            company = form.save(commit=False)

            employee = Employees.objects.filter(user=self.request.user, owner=True).first()

            if not employee:
                employee = Employees(user=self.request.user, owner=True)
                employee.save()

            company.edited_at = datetime.datetime.now()
            company.edited_by = self.request.user
            company.save(crop_data=crop_data_json)
            company.user.add(employee)
            company.save()

            if formset.is_valid():
                formset.instance = company
                formset.save()
            form.save_m2m()
            thread = threading.Thread(target=CompanyCreateView.send_email_notification, args=(company,))
            thread.start()
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
        company = get_object_or_404(self.model, slug=self.kwargs.get('company_slug'))
        context['company'] = company
        context['form'] = forms.RatingForm
        context['owners'] = company.user.filter(owner=True).values_list('user', flat=True)
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
        image_crop_data = self.request.POST.get('image-crop-data')
        crop_data_json = json.loads(image_crop_data) if image_crop_data else None

        context = self.get_context_data()
        phones = context['phones']
        formset = context['formset']
        company = form.save(commit=False)
        company.edited_at = datetime.datetime.now()
        company.edited_by = self.request.user
        company.save(crop_data=crop_data_json)

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
        email = form.cleaned_data['email']

        if email:
            return Specialist.objects.filter(
                Q(user__first_name__icontains=email) | Q(user__email=email) | Q(user__last_name__icontains=email) | Q(
                    full_name__icontains=email))

    def invite_form_valid(self, invite_form):
        spec = invite_form.cleaned_data['user']
        company = Company.objects.get(slug=self.kwargs['company_slug'])

        if spec.company.all().count() == 2:
            messages.error(self.request, Messages.UserInvite.specialist_companies_limit)
        else:
            invite = self.__create_invite(invite_form)
            user = User.objects.filter(user_specialists=spec).first()
            self.__send_email_to_user(invite, user)

        return HttpResponseRedirect(company.get_absolute_url())

    def __create_invite(self, invite_form):
        company = Company.objects.get(slug=self.kwargs['company_slug'])
        user_specialist = invite_form.cleaned_data['user']
        user = User.objects.filter(user_specialists=user_specialist).first()
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
    success_message = Messages.AddReview.adding_success_company
    model = Rating
    form_class = forms.RatingForm
    template_name = 'company/rating_company_form.html'

    def get_success_url(self):
        messages.add_message(self.request, messages.SUCCESS, self.success_message)
        return reverse('company_detail', args=(self.kwargs.get('company_slug'),))

    def form_valid(self, form):
        company = Company.objects.get(slug=self.kwargs.get('company_slug'))
        rating = form.save(commit=False)
        rating.user = self.request.user
        rating.company = company
        rating.save()
        return super(CreateReviewForCompanyView, self).form_valid(form)


class ReviewCompanyListView(ListView):
    template_name = 'company/all_review.html'
    model = Rating

    def get_context_data(self, **kwargs):
        context = super(ReviewCompanyListView, self).get_context_data(**kwargs)
        context['company'] = get_object_or_404(Company, slug=self.kwargs.get('company_slug'))
        return context

    def get_queryset(self):
        queryset = Rating.objects.filter(company__slug=self.kwargs.get('company_slug'))
        return queryset


class AddAdministratorView(CreateView):
    success_message = Messages.AddCompany.add_administrator_success
    model = User
    form_class = forms.AddAdministratorForm
    template_name = "company/add_administrator.html"

    def get_success_url(self):
        messages.add_message(self.request, messages.SUCCESS, self.success_message)
        com = Company.objects.get(slug=self.kwargs.get('company_slug'))
        return reverse('administrator_list', kwargs={'company_slug': com.slug})

    def form_valid(self, form):
        user = form.save(commit=False)
        fm_email = form.cleaned_data['email']
        user.username = fm_email.replace("@", "").replace(".", "")
        user.save()
        email = EmailAddress(user=user, email=user.email, verified=True, primary=True)
        email.save()
        employee = Employees(user=user, administrator=True)
        employee.save()
        company = Company.objects.get(slug=self.kwargs.get('company_slug'))
        company.user.add(employee)
        company.save()
        return super(AddAdministratorView, self).form_valid(form)


class ReservationAdministratorListView(LoginRequiredMixin, ListView):
    model = Reservation
    filterset_class = ReservationFilter
    template_name = 'company/reservation_list_administrator.html'

    def get_context_data(self, **kwargs):
        context = super(ReservationAdministratorListView, self).get_context_data(**kwargs)
        reservation_filter = self.filterset_class(self.request.GET, queryset=self._get_reservation_list())
        context['reservation_filter'] = reservation_filter
        return context

    def _get_reservation_list(self):
        empployy = Employees.objects.get(user=self.request.user)
        return Reservation.objects.filter(specialist__company__user=empployy).order_by('-created_at')


class EmployeesListView(LoginRequiredMixin, ListView):
    model = Employees
    template_name = 'company/employees_list.html'
    context_object_name = 'employees_list'

    def get_context_data(self, **kwargs):
        context = super(EmployeesListView, self).get_context_data(**kwargs)
        context['company'] = Company.objects.get(slug=self.kwargs['company_slug'])
        return context

    def get_queryset(self):
        return self.model.objects.filter(companies__slug=self.kwargs['company_slug'], administrator=True)


class EmployeesDelete(View):
    success_message = Messages.Employees.delete_employe_success
    warning_message = Messages.Employees.employe_warning_message

    def post(self, *args, **kwargs):
        try:
            employe = Employees.objects.get(pk=self.request.POST.get('employe_id'))
            employe.user.delete()
            employe.delete()
            messages.add_message(self.request, messages.SUCCESS, self.success_message)
        except Employees.DoesNotExist:
            messages.add_message(self.request, messages.WARNING, self.warning_message)
        return redirect(self.request.META['HTTP_REFERER'])


class EmployeesSpecialistListView(LoginRequiredMixin, ListView):
    model = Specialist
    template_name = 'company/employees_specialist_list.html'
    context_object_name = 'employees_specialist_list'

    def get_context_data(self, **kwargs):
        context = super(EmployeesSpecialistListView, self).get_context_data(**kwargs)
        context['company'] = Company.objects.get(slug=self.kwargs['company_slug'])
        return context

    def get_queryset(self):
        return self.model.objects.filter(company__slug=self.kwargs['company_slug'])


class EmployeesSpecialistDelete(View):
    success_message = Messages.Employees.delete_employe_specialist_success
    warning_message = Messages.Employees.employe_specialist_warning_message

    def post(self, *args, **kwargs):
        company = Company.objects.get(slug=self.kwargs['company_slug'])
        try:
            employe = Specialist.objects.get(pk=self.request.POST.get('employe_id'))
            employe.company.remove(company)
            employe.save()
            messages.add_message(self.request, messages.SUCCESS, self.success_message)
        except Specialist.DoesNotExist:
            messages.add_message(self.request, messages.WARNING, self.warning_message)
        return redirect(self.request.META['HTTP_REFERER'])


class AddMasterCompany(LoginRequiredMixin, FormView):
    success_message = Messages.AddMaster.owner_adding_success
    error_message = Messages.AddMaster.adding_error
    template_name = 'company/add_master.html'

    def get(self, request, *args, **kwargs):
        user_form = forms.CompanyUserAddForm
        user_form.prefix = 'user_form'
        form = forms.MasterCreateForm
        form.prefix = 'form'
        return self.render_to_response(self.get_context_data(user_form=user_form, form=form))

    def post(self, request, *args, **kwargs):
        company = Company.objects.get(slug=self.kwargs['company_slug'])
        user_form = forms.CompanyUserAddForm(self.request.POST, prefix='user_form')
        form = forms.MasterCreateForm(self.request.POST, self.request.FILES, prefix='form')
        if user_form.is_valid() and form.is_valid():
            user = self._create_user(user_form, full_name=form.cleaned_data['full_name'])
            specialist = self._create_specialist(form, user)
            specialist.company.add(company)
            specialist.status = ACTIVE
            specialist.edited_by = self.request.user
            specialist.save()
            for category in self.request.POST.getlist('form-categories'):
                specialist.categories.add(category)
            for tag in self.request.POST.getlist('form-tags'):
                specialist.tags.add(tag)
            messages.add_message(self.request, messages.SUCCESS, self.success_message)
            return redirect(reverse('employees_specialist_list', kwargs={'company_slug': company.slug}))
        else:
            return self.form_invalid(user_form, form, **kwargs)

    def form_invalid(self, user_form, form, **kwargs):
        user_form.prefix = 'user_form'
        form.prefix = 'form'
        messages.add_message(self.request, messages.ERROR, self.error_message)
        return self.render_to_response(self.get_context_data(user_form=user_form, form=form))

    def _create_user(self, user_form, full_name):
        password = user_form.cleaned_data['password1']
        fm_email = user_form.cleaned_data['email']
        user = user_form.save()
        user.first_name = full_name
        user.set_password(password)
        user.username = fm_email.replace("@", "").replace(".", "")
        user.save()
        email = EmailAddress(user=user, email=user.email, verified=True, primary=True)
        email.save()
        return user

    def _create_specialist(self, form, user):
        full_name = form.cleaned_data['full_name']
        short_info = form.cleaned_data['short_info']
        info = form.cleaned_data['info']
        photo = form.cleaned_data.get('photo')
        street_address = form.cleaned_data['street_address']
        sex = form.cleaned_data['sex']
        specialist = Specialist.objects.create(full_name=full_name, short_info=short_info, info=info, photo=photo,
                                               user=user, street_address=street_address, sex=sex)
        return specialist


class CompanyReservationTableListView(ReservationTableListView):

    template_name = 'company/reservation_list.html'

    def get_context_data(self, **kwargs):
        context = super(CompanyReservationTableListView, self).get_context_data(**kwargs)
        context['company_slug'] = self.kwargs['company_slug']

        return context

    def _get_reservation_list(self):
        return Reservation.objects.filter(specialist__company__slug=self.kwargs['company_slug']).order_by('-created_at')