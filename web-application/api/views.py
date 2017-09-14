from rest_framework import filters
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination

from webapp.models import Company, Specialist
from webapp.serializers import CompanyShortSerializer, SpecialistShortSerializer


class Pagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100


class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyShortSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('name',)
    filter_fields = ('company_tags__name',)
    ordering_fields = ('created_at',)
    pagination_class = Pagination


class SpecialistListView(generics.ListAPIView):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistShortSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('full_name',)
    filter_fields = ('tags__name',)
    ordering_fields = ('created_at',)
    pagination_class = Pagination
