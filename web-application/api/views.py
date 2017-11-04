from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework import generics
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from webapp.models import Company, Specialist, ScheduleSetting, Reservation
from webapp.serializers import CompanyShortSerializer, SpecialistShortSerializer, ScheduleSettingFullSerializer, \
    ReservationFullSerializer, ReservationCreteSerializer, ReservationSerializer
from datetime import date, timedelta


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


class ReservationListView(generics.ListAPIView):
    serializer_class = ReservationFullSerializer
    lookup_field = 'specialist__slug'
    pagination_class = Pagination

    def get_queryset(self):
        today = date.today()
        month = today + timedelta(days=30)
        return Reservation.objects.filter(specialist__slug=self.kwargs['specialist__slug'],
                                          date_time_reservation__gte=today,
                                          date_time_reservation__lte=month)


class ReservationCreateView(generics.CreateAPIView):
    serializer_class = ReservationCreteSerializer

    def create(self, request, *args, **kwargs):
        specialist = get_object_or_404(Specialist, slug=self.kwargs['specialist__slug'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(specialist=specialist, user=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ReservationStatusView(generics.UpdateAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        specialist = get_object_or_404(Specialist, slug=self.kwargs['specialist__slug'])
        return Reservation.objects.filter(specialist=specialist, pk=self.kwargs['pk'])
