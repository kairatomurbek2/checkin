from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.models import User
from django import forms


class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')
