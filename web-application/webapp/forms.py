from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django import forms
from phonenumber_field.formfields import PhoneNumberField
from redactor.widgets import RedactorEditor
from taggit.forms import TagWidget

from webapp.models import Specialist, SpecialistContact, Company, Certificate


class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')


class MasterCreateForm(forms.ModelForm):
    full_name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': _('ФИО')}))
    street_address = forms.CharField(required=False,
                                     widget=forms.Textarea(attrs={'placeholder': _('Адрес'), 'rows': 4}))
    short_info = forms.CharField(required=False,
                                 widget=forms.Textarea(attrs={'placeholder': _('Краткая информация'), 'rows': 4}))

    class Meta:
        model = Specialist
        widgets = {
            'info': RedactorEditor(),
            'tags': TagWidget()
        }
        fields = ['photo', 'full_name', 'street_address', 'short_info', 'info', 'tags', 'categories']


class SpecialistContactForm(forms.ModelForm):
    phone = PhoneNumberField(required=False, widget=forms.TextInput(attrs={'placeholder': _('Номер телефона')}))

    class Meta:
        model = SpecialistContact
        fields = ['phone']


ContactFormSet = forms.inlineformset_factory(Specialist, SpecialistContact, form=SpecialistContactForm, extra=1,
                                             can_delete=True)


class CompanyCreateForm(forms.ModelForm):
    name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': _('Название учреждения')}))
    email = forms.EmailField(required=True,
                             widget=forms.EmailInput(attrs={'placeholder': _('Эл. адрес компании')}))
    website = forms.URLField(required=False, widget=forms.URLInput(attrs={'placeholder': _('Веб-сайт')}))
    phone = PhoneNumberField(required=True, widget=forms.TextInput(attrs={'placeholder': _('Номер телефона')}))
    street_address = forms.CharField(required=False,
                                     widget=forms.Textarea(attrs={'placeholder': _('Адрес'), 'rows': 4}))
    short_info = forms.CharField(required=False,
                                 widget=forms.Textarea(attrs={'placeholder': _('Краткая информация')}))

    class Meta:
        model = Company
        widgets = {
            'info': RedactorEditor(),
            'company_tags': TagWidget()
        }
        fields = ['logo', 'slug', 'name', 'street_address', 'short_info', 'phone', 'legal_data', 'website',
                  'categories', 'info', 'email', 'company_tags', 'latitude', 'longitude']


class CertificateForm(forms.ModelForm):
    certificate = forms.ImageField(widget=forms.FileInput)

    class Meta:
        model = Certificate
        fields = ['certificate']


CertFormSet = forms.inlineformset_factory(Company, Certificate, form=CertificateForm, extra=1,
                                          can_delete=True)
