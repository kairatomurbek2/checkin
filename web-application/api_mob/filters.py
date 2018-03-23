from __future__ import unicode_literals
from django.db.models import Q
import django_filters
from django.utils.translation import ugettext_lazy as _
from django import forms
from datetime import date

from api_mob.exceptions import ValidationError
from webapp import models
from webapp.models import Specialist, Category, Company, Reservation


def categories(request):
    return models.Category.objects.all()


class MastersListFilterAPI(django_filters.FilterSet):
    search = django_filters.CharFilter(label=_('Поиск'),
                                       widget=forms.TextInput(attrs={'placeholder': _('Найти специалиста...')}),
                                       method='search_specialist')
    categories = django_filters.ModelMultipleChoiceFilter(
        queryset=categories,
        method='filter_categories',
        label=_('Отрасль'), to_field_name='slug'
    )

    class Meta:
        model = Specialist
        fields = ('categories',)

    def search_specialist(self, queryset, name, value):
        return queryset.filter(
            Q(full_name__icontains=value) | Q(short_info__icontains=value) | Q(tags__name__icontains=value)
        ).distinct()

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


class CompaniesListFilterAPI(django_filters.FilterSet):
    search = django_filters.CharFilter(label=_('Поиск'),
                                       widget=forms.TextInput(attrs={'placeholder': _('Найти учреждение...')}),
                                       method='search_company')

    categories = django_filters.ModelMultipleChoiceFilter(
        queryset=categories,
        method='filter_categories',
        label=_('Отрасль'), to_field_name='slug'
    )

    class Meta:
        model = Company
        fields = ('categories',)

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


class MasterReservationsFilter(django_filters.FilterSet):
    date_time_start = django_filters.DateFilter(label=_('Дата от'), method='filter_from_date')
    date_time_end = django_filters.DateFilter(label=_('Дата до'), method='filter_to_date')

    class Meta:
        model = Reservation
        fields = ('status', )

    def filter_from_date(self, queryset, name, value):
        return queryset.filter(date_time_reservation__gte=value)

    def filter_to_date(self, queryset, name, value):
        today = date.today()

        if (value - today).days < 0:
            raise ValidationError('Неверное указана дата.')

        return queryset.filter(date_time_reservation__lte=value)