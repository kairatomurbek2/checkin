from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.views.generic import UpdateView

from webapp import forms


class ProfileEditView(LoginRequiredMixin, UpdateView):
    template_name = 'profile/edit_user.html'
    model = User
    slug_field = 'username'
    form_class = forms.ProfileEditForm

    def get_success_url(self):
        return self.request.META['HTTP_REFERER']
