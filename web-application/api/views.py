from rest_framework import filters
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination

from webapp.models import Company, Specialist
from webapp.serializers import CompanyShortSerializer, SpecialistShortSerializer


class Pagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100


class CompanyListView(generics.ListAPIView):
    serializer_class = CompanyShortSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('name', 'company_tags__name')
    ordering_fields = ('created_at',)
    pagination_class = Pagination

    def get_queryset(self):
        return Company.objects.all()


class SpecialistListView(generics.ListAPIView):
    serializer_class = SpecialistShortSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('full_name', 'tags__name')
    ordering_fields = ('created_at',)
    pagination_class = Pagination

    def get_queryset(self):
        return Specialist.objects.all()
