import datetime

from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import EmailMessage
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.urls import reverse
from django.views.generic import CreateView
from django.views.generic import ListView
from django.views.generic import TemplateView
from django.views.generic import UpdateView

from main.choices import MODERATION
from main.parameters import Messages
from webapp import forms
from webapp.forms import CertFormSet, PhoneFormSet
from webapp.models import Company, Category
from webapp.views.filters import CompanyFilter


class CompanySpecialistList(ListView):
    template_name = 'category/company_specialist_list.html'
    model = Company

    def get_queryset(self):
        return self.model.objects.filter(categories__in=[i for i in
                                                         Category.objects.get(slug=self.kwargs['slug']).get_descendants(
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
