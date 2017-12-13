from rest_framework import filters
from rest_framework import generics

from api_mob.serializers import CategoryMainSerializer, CategorySerializer
from webapp.models import Category


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

    def get_queryset(self):
        return Category.objects.filter(pk=self.kwargs['pk'])
