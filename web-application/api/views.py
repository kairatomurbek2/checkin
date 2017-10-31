from rest_framework import filters
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination

from webapp.models import Company, Specialist, ScheduleSetting, Reservation
from webapp.serializers import CompanyShortSerializer, SpecialistShortSerializer, ScheduleSettingFullSerializer, \
    ReservationFullSerializer


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


class ScheduleSettingRetrieveView(generics.RetrieveAPIView):
    serializer_class = ScheduleSettingFullSerializer
    lookup_field = 'specialist__slug'

    def get_queryset(self):
        return ScheduleSetting.objects.filter(specialist__slug=self.kwargs['specialist__slug'])


class ReservationView(generics.ListAPIView):
    serializer_class = ReservationFullSerializer
    lookup_field = 'specialist__slug'
    pagination_class = Pagination

    def get_queryset(self):
        return Reservation.objects.filter(specialist__slug=self.kwargs['specialist__slug'])
