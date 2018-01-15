from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.views.generic import ListView
from django.views.generic import UpdateView

from webapp import forms
from webapp.models import FavoriteSpecialist, Reservation


class ProfileEditView(LoginRequiredMixin, UpdateView):
    template_name = 'profile/edit_user.html'
    model = User
    slug_field = 'username'
    form_class = forms.ProfileEditForm

    def get_success_url(self):
        return self.request.META['HTTP_REFERER']


class ProfileFavoriteListView(LoginRequiredMixin, ListView):
    model = FavoriteSpecialist
    template_name = 'profile/favorite_list.html'
    slug_field = 'username'

    def get_context_data(self, **kwargs):
        context = super(ProfileFavoriteListView, self).get_context_data(**kwargs)
        if self.request.user.is_authenticated:
            context['fav_spec'] = self.model.objects.filter(user=self.request.user).values_list('specialist', flat=True)
        return context

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)


class HistoryReservationUser(LoginRequiredMixin, ListView):
    model = Reservation
    template_name = 'profile/reservation_list.html'
    slug_field = 'username'
    context_object_name = 'reservation_list'

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.model.objects.filter(user=self.request.user)
