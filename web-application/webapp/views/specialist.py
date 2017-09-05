import datetime

from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic import CreateView
from django.views.generic import ListView
from django.views.generic import TemplateView
from django.views.generic import UpdateView

from main.parameters import Messages
from webapp import forms
from webapp.forms import ContactFormSet
from webapp.models import Specialist, Category, SpecialistContact
from webapp.views.filters import SpecialistFilter


class MastersList(ListView):
    template_name = 'specialist/specialist_list.html'
    filterset_class = SpecialistFilter
    model = Specialist
    context_object_name = 'specialist_list'
    paginate_by = 24

    def get_queryset(self):
        if self.request.is_ajax():
            self.template_name = 'specialist/object.html'
        return Specialist.objects.all()

    def get_context_data(self, **kwargs):
        context = super(MastersList, self).get_context_data(**kwargs)
        specialist_list = self.filterset_class(self.request.GET, queryset=self.get_queryset())
        context['filter'] = specialist_list.form
        pagination = Paginator(specialist_list.qs, self.paginate_by)
        page = self.request.GET.get('page')
        try:
            specialist_list = pagination.page(page)
        except PageNotAnInteger:
            specialist_list = pagination.page(1)
        except EmptyPage:
            raise Http404("That page contains no results")
        context['specialist_list'] = specialist_list.object_list
        context['is_paginated'] = specialist_list.has_next()
        return context


class MasterCreateView(LoginRequiredMixin, CreateView):
    success_message = Messages.AddMaster.adding_success
    error_message = Messages.AddMaster.adding_error
    template_name = 'specialist/new_specialist.html'
    model = Specialist
    form_class = forms.MasterCreateForm

    def get_context_data(self, **kwargs):
        context = super(MasterCreateView, self).get_context_data(**kwargs)
        context['form'] = self.form_class(initial={'full_name': self.request.user.get_full_name()})
        if self.request.POST:
            context['formset'] = ContactFormSet(self.request.POST)
        else:
            context['formset'] = ContactFormSet()

        return context

    def get_success_url(self):
        messages.add_message(self.request, messages.SUCCESS, self.success_message)
        return reverse('master_detail', args=(self.object.slug,))

    def form_valid(self, form):
        context = self.get_context_data()
        formset = context['formset']
        specialist = form.save(commit=False)
        specialist.user = self.request.user
        specialist.edited_at = datetime.datetime.now()
        specialist.edited_by = self.request.user
        specialist.save()
        if formset.is_valid():
            formset.instance = specialist
            formset.save()
        form.save_m2m()
        return super(MasterCreateView, self).form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, self.error_message)
        return super(MasterCreateView, self).form_invalid(form)


class MasterEditView(LoginRequiredMixin, UpdateView):
    template_name = 'specialist/edit_specialist.html'
    form_class = forms.MasterCreateForm
    model = Specialist

    def get_object(self, queryset=None):
        return Specialist.objects.get(slug=self.kwargs['master_slug'])


class MasterDetailView(TemplateView):
    template_name = 'specialist/master_detail.html'
    model = Specialist

    def get_context_data(self, **kwargs):
        context = super(MasterDetailView, self).get_context_data(**kwargs)
        context['master'] = get_object_or_404(self.model, slug=self.kwargs.get('master_slug'))
        return context
