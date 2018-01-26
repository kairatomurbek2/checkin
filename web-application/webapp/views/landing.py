from dal import autocomplete
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse
from django.views import View
from django.views.generic import TemplateView
from taggit.models import Tag
from webapp.models import Company, Specialist, FavoriteSpecialist


class HomeView(TemplateView):
    template_name = 'general/home.html'


class TagAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated():
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
        if value:
            qs = qs.filter(Q(name__icontains=value) | Q(company_tags__name__icontains=value)).distinct()
        return qs

    def _get_specialist(self):
        value = self.request.GET['q']
        qs = Specialist.objects.all()
        if value:
            qs = qs.filter(Q(full_name__icontains=value) | Q(tags__name__icontains=value)).distinct()
        return qs


class FavoriteCreateView(View):
    def get(self, request):
        specialist_slug = request.GET.get("specialist")
        if specialist_slug:
            favorite, created = FavoriteSpecialist.objects.get_or_create(specialist_id=specialist_slug,
                                                                         user=request.user)
        else:
            return JsonResponse({
                "status": "error",
                "message": "specialist query param is required"
            })
        if not created:
            favorite.delete()
            flash_message = "Специалист успешно удален из избранных"
        else:
            flash_message = "Специалист успешно добавлен в избранное"
        favorites_count = request.user.favoritespecialist_set.count()
        data = {
            "created": created,
            "flash_message": flash_message,
            "favorites_count": favorites_count
        }
        return JsonResponse(data)
