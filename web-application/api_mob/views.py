from rest_framework import filters
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination

from api_mob.serializers import CategoryMainSerializer, CategorySerializer, MasterSerializer
from webapp.models import Category, Specialist


class CategoryMainListView(generics.ListAPIView):
    serializer_class = CategoryMainSerializer

    def get_queryset(self):
        queryset = Category.objects.filter(parent=None)
        return queryset


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend,)
    filter_fields = ('parent',)

    def get_queryset(self):
        queryset = Category.objects.all()
        return queryset


class CategoryRetrieveView(generics.RetrieveAPIView):
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Category.objects.filter(slug=self.kwargs['slug'])


class MastersPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 10


class MastersListView(generics.ListAPIView):
    serializer_class = MasterSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('name', 'info', 'tags__name')
    filter_fields = ('categories',)
    ordering_fields = ('created_at',)
    pagination_class = MastersPagination

    def get_queryset(self):
        return Specialist.objects.all()
