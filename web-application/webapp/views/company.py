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
