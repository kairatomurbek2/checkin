from __future__ import unicode_literals
from django.db.models import Q
import django_filters
from django.utils.translation import ugettext_lazy as _
from django import forms
from webapp import models
from webapp.models import Specialist, Category


def categories(request):
    return models.Category.objects.all()


class SpecialistFilter1(django_filters.FilterSet):
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
        fields = ('categories', )

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
