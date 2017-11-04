from __future__ import unicode_literals

from django import forms
from django.db.models import Q
from django.utils.translation import ugettext_lazy as _

import django_filters

from main.choices import STATUS_CHOICES_RESERVATION
from webapp import models
from webapp.models import Category, Specialist, Reservation
from datetime import datetime


def categories(request):
    return models.Category.objects.all()


def assembly_status():
    choices = []
    for assembly_status in STATUS_CHOICES_RESERVATION:
        choices.append(assembly_status)
    return choices


class CompanyFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(label=_('Поиск'),
                                       widget=forms.TextInput(attrs={'placeholder': _('Найти учреждение...')}),
                                       method='search_company')

    categories = django_filters.ModelMultipleChoiceFilter(
        queryset=categories,
        widget=forms.CheckboxSelectMultiple(attrs={
            'template': 'category_checklist'
        }),
        method='filter_categories',
        label=_('Отрасль'), to_field_name='slug'
    )

    def filter_categories(self, queryset, name, value):
        lookup = '__'.join([name, 'in'])
        if value:
            categories = Category.objects.filter(pk__in=value)
            categories_ids = []
            for category in categories:
                for id in category.get_descendants(include_self=True):
                    categories_ids.append(id)
            return queryset.filter(**{lookup: categories_ids}).distinct()
        else:
            return queryset.filter(**{})

    def search_company(self, queryset, name, value):
        return queryset.filter(
            Q(name__icontains=value) | Q(short_info__icontains=value) | Q(company_tags__name__icontains=value)
        ).distinct()


class SpecialistFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(label=_('Поиск'),
                                       widget=forms.TextInput(attrs={'placeholder': _('Найти специалиста...')}),
                                       method='search_specialist')
    categories = django_filters.ModelMultipleChoiceFilter(
        queryset=categories,
        widget=forms.CheckboxSelectMultiple(attrs={
            'template': 'category_checklist'
        }),
        method='filter_categories',
        label=_('Отрасль'), to_field_name='slug'
    )

    def filter_categories(self, queryset, name, value):
        lookup = '__'.join([name, 'in'])
        if value:
            categories = Category.objects.filter(pk__in=value)
            categories_ids = []
            for category in categories:
                for id in category.get_descendants(include_self=True):
                    categories_ids.append(id)
            return queryset.filter(**{lookup: categories_ids}).distinct()
        else:
            return queryset.filter(**{})

    def search_specialist(self, queryset, name, value):
        return queryset.filter(
            Q(full_name__icontains=value) | Q(short_info__icontains=value) | Q(tags__name__icontains=value)
        ).distinct()


def search(queryset, name, value):
    return queryset.filter(Q(full_name__icontains=value) | Q(phone__icontains=value)).distinct()


class ReservationFilter(django_filters.FilterSet):
    created_at_from = django_filters.DateFilter(label=_('C'), name='created_at', lookup_expr='gte')
    created_at_to = django_filters.DateFilter(label=_('До'), name='created_at', lookup_expr='lte')
    status = django_filters.ChoiceFilter(label=_('Статус'), choices=assembly_status)
    search = django_filters.CharFilter(label=_('Поиск'),
                                       widget=forms.TextInput(attrs={'placeholder': _('Найти')}),
                                       method=search)
