from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404
from django.shortcuts import render
from django.views.generic import ListView
from django.views.generic import TemplateView

from webapp.models import Specialist
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


class MasterCreateView(TemplateView):
    template_name = 'specialist/new_specialist.html'
