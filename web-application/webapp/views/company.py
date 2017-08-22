from django.views.generic import ListView

from webapp.models import Company, Category


class CompanyList(ListView):
    template_name = 'company/company_list.html'
    model = Company

    def get_queryset(self):
        return self.model.objects.filter(categories__in=[i for i in
                                                         Category.objects.get(slug=self.kwargs['slug']).get_descendants(
                                                             include_self=True)])
