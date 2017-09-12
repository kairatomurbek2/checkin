from dal import autocomplete
from django.db.models import Q
from django.views.generic import TemplateView
from taggit.models import Tag
from webapp.models import Company, Specialist


class HomeView(TemplateView):
    template_name = 'general/home.html'


class TagAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.is_authenticated():
            return Tag.objects.none()

        qs = Tag.objects.all()

        if self.q:
            qs = qs.filter(name__istartswith=self.q)

        return qs


class SearchView(TemplateView):
    template_name = 'general/search.html'

    def get_context_data(self, **kwargs):
        context = super(SearchView, self).get_context_data(**kwargs)
        context['companies'] = self._get_company()
        context['masters'] = self._get_specialist()
        context['q'] = self.request.GET['q']
        return context

    def _get_company(self):
        value = self.request.GET['q']
        qs = Company.objects.all()
        if self.request.GET['q']:
            qs = qs.filter(Q(name__icontains=value) | Q(company_tags__name__icontains=value)).distinct()
        return qs

    def _get_specialist(self):
        value = self.request.GET['q']
        qs = Specialist.objects.all()
        if self.request.GET['q']:
            qs = qs.filter(Q(full_name__icontains=value) | Q(tags__name__icontains=value)).distinct()
        return qs
