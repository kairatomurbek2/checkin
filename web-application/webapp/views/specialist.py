from django.views.generic import ListView
from django.views.generic import TemplateView

from webapp.models import Specialist
from webapp.views.filters import SpecialistFilter


class MastersList(ListView):
    template_name = 'specialist/specialist_list.html'
    filterset_class = SpecialistFilter
    model = Specialist

    def get_context_data(self, **kwargs):
        context = super(MastersList, self).get_context_data(**kwargs)
        specialist_filter = self.filterset_class(self.request.GET, queryset=Specialist.objects.all())
        context['specialist_filter'] = specialist_filter
        return context


class MasterCreateView(TemplateView):
    template_name = 'specialist/new_specialist.html'
