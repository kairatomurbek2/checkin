from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.views.generic import ListView
from django.views.generic import TemplateView

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


class CompanyCreateView(TemplateView):
    template_name = 'company/new_company.html'


class CompanyDetail(TemplateView):
    template_name = 'company/company_detail.html'

    model = Company

    def get_context_data(self, **kwargs):
        context = super(CompanyDetail, self).get_context_data(**kwargs)
        context['master'] = get_object_or_404(self.model, slug=self.kwargs.get('company_slug'))
        return context
