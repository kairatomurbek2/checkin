from django.views.generic import ListView

from webapp.models import Specialist


class MastersList(ListView):
    template_name = 'specialist/specialist_list.html'
    model = Specialist


