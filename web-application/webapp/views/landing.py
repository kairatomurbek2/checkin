from dal import autocomplete
from django.views.generic import TemplateView
from taggit.models import Tag


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
