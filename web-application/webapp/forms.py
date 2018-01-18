from __future__ import unicode_literals

from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from django.forms import modelformset_factory
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django import forms
from phonenumber_field.formfields import PhoneNumberField
from redactor.widgets import RedactorEditor
from taggit.forms import TagWidget
from main.choices import SEX_CHOICES, RATING_CHOICES

from webapp.models import Specialist, SpecialistContact, Company, Certificate, CompanyContact, Rating, ScheduleSetting


class ProfileEditForm(forms.ModelForm):
    first_name = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': _('Имя')}))
    last_name = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': _('Фамилия')}))

    class Meta:
        model = User
        fields = ('first_name', 'last_name')


class MasterCreateForm(forms.ModelForm):
    full_name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': _('ФИО')}))
    street_address = forms.CharField(required=False,
                                     widget=forms.Textarea(attrs={'placeholder': _('Адрес'), 'rows': 4}))
    short_info = forms.CharField(required=False,
                                 widget=forms.Textarea(attrs={'placeholder': _('Краткая информация'), 'rows': 4}))

    sex = forms.ChoiceField(required=False, choices=SEX_CHOICES, widget=forms.Select)

    class Meta:
        model = Specialist
        widgets = {
            'info': RedactorEditor(),
            'tags': TagWidget()
        }
        fields = ['photo', 'full_name', 'street_address', 'short_info', 'info', 'tags', 'categories', 'sex']


class SpecialistContactForm(forms.ModelForm):
    phone = PhoneNumberField(required=False, widget=forms.TextInput(attrs={'placeholder': _('Номер телефона')}))

    class Meta:
        model = SpecialistContact
        fields = ['phone', ]


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


class CompanyUpdateForm(forms.ModelForm):
    name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': _('Название учреждения')}))
    email = forms.EmailField(required=True,
                             widget=forms.EmailInput(attrs={'placeholder': _('Эл. адрес компании')}))
    website = forms.URLField(required=False, widget=forms.URLInput(attrs={'placeholder': _('Веб-сайт')}))
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
        fields = ['logo', 'name', 'street_address', 'short_info', 'legal_data', 'website',
                  'categories', 'info', 'email', 'company_tags', 'latitude', 'longitude']


class CertificateForm(forms.ModelForm):
    # certificate = forms.ImageField(widget=forms.FileInput)
    class Meta:
        model = Certificate
        fields = ['certificate', ]


CertFormSet = forms.inlineformset_factory(Company, Certificate, form=CertificateForm, extra=1,
                                          can_delete=True)

CertSpecialistFormSet = forms.inlineformset_factory(Specialist, Certificate, form=CertificateForm, extra=1,
                                                    can_delete=True)


class CompanyContactForm(forms.ModelForm):
    phone = PhoneNumberField(required=False, widget=forms.TextInput(attrs={'placeholder': _('Номер телефона')}))

    class Meta:
        model = CompanyContact
        fields = ['phone', ]


PhoneFormSet = forms.inlineformset_factory(Company, CompanyContact, form=CompanyContactForm, extra=1,
                                           can_delete=True)


class SpecialistSearchForm(forms.Form):
    email = forms.EmailField(required=True,
                             widget=forms.EmailInput(attrs={'placeholder': _('Введите email специалиста')}))
    prefix = 'search'

    def is_valid(self):
        valid = super(SpecialistSearchForm, self).is_valid()
        if valid:
            if self.is_empty(self.cleaned_data['email']) and self.is_empty(self.cleaned_data['username']):
                self.add_error(None, _('Either username or email is required'))
                return False
        return valid

    def is_empty(self, value):
        return value == '' or value is None


class UserInviteForm(forms.Form):
    user = forms.ModelChoiceField(queryset=User.objects.all(), required=True, empty_label=None)
    prefix = 'invite'

    def __init__(self, *args, **kwargs):
        users = kwargs.pop('users', User.objects.none())
        super(UserInviteForm, self).__init__(*args, **kwargs)
        self.fields['user'].queryset = users


class RatingForm(forms.ModelForm):
    count = forms.RadioSelect(choices=RATING_CHOICES)
    comment = forms.CharField(required=True, widget=forms.Textarea(attrs={'rows': 10, 'cols': 30}))

    class Meta:
        model = Rating
        fields = ['count', 'comment']


class ScheduleSettingForm(forms.ModelForm):
    class Meta:
        model = ScheduleSetting
        fields = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']


class ScheduleSettingUpdateForm(forms.ModelForm):
    class Meta:
        model = ScheduleSetting
        fields = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', ]


class AddAdministratorForm(UserCreationForm):
    email = forms.EmailField(required=True)

    def clean_email(self):
        data = self.cleaned_data['email']
        if User.objects.filter(email=data).exists():
            raise ValidationError(_('Пользователь с таким email уже существует'), code='email_used')
        return data

    def __init__(self, *args, **kwargs):
        super(AddAdministratorForm, self).__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = ['email', ]


class CompanyUserAddForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.TextInput(attrs={'placeholder': _('Введите email мастера')}))
    password1 = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': _('Пароль')}))
    password2 = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': _('Пароль (еще раз)')}))

    def clean_email(self):
        data = self.cleaned_data['email']
        if User.objects.filter(email=data).exists():
            raise ValidationError(_('Пользователь с таким email уже существует'), code='email_used')
        return data

    def __init__(self, *args, **kwargs):
        super(CompanyUserAddForm, self).__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = ['email', ]
