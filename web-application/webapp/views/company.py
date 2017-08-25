from django.views.generic import ListView
from django.views.generic import TemplateView

from webapp.models import Company, Category


class CompanySpecialistList(ListView):
    template_name = 'category/company_specialist_list.html'
    model = Company

    def get_queryset(self):
        return self.model.objects.filter(categories__in=[i for i in
                                                         Category.objects.get(slug=self.kwargs['slug']).get_descendants(
                                                             include_self=True)])


class CompanyList(ListView):
    template_name = 'company/company_list.html'
    model = Company


class CompanyCreateView(TemplateView):
    template_name = 'company/new_company.html'
