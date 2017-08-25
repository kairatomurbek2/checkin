from __future__ import unicode_literals

from django import forms
from django.db.models import Q
from django.utils.translation import ugettext_lazy as _

import django_filters


class CompanyFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(label=_('Поиск'),
                                       widget=forms.TextInput(attrs={'placeholder': _('Найти учреждение...')}),
                                       method='search_company')

    def search_company(self, queryset, name, value):
        return queryset.filter(
            Q(name__icontains=value) | Q(short_info__icontains=value)
        ).distinct()
