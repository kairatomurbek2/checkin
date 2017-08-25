from django.views.generic import ListView
from django.views.generic import TemplateView

from webapp.models import Specialist


class MastersList(ListView):
    template_name = 'specialist/specialist_list.html'
    model = Specialist


class MasterCreateView(TemplateView):
    template_name = 'specialist/new_specialist.html'
