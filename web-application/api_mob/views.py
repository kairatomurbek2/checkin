from rest_framework import filters
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import SAFE_METHODS

from api.permissions import MasterOwnerOrReadOnly
from api_mob.serializers import CategoryMainSerializer, CategorySerializer, MasterSerializer, CompaniesSerializer, \
    RatingSerializer, CompanySerializer
from webapp.models import Category, Specialist, Company, Rating


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


class Pagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100


class MastersListView(generics.ListAPIView):
    serializer_class = MasterSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('name', 'info', 'tags__name')
    filter_fields = ('categories',)
    ordering_fields = ('created_at',)
    pagination_class = Pagination
    queryset = Specialist.objects.all()


class MasterRetrieveUpdateViewApi(generics.RetrieveUpdateAPIView):
    permission_classes = [MasterOwnerOrReadOnly]
    lookup_field = 'slug'

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), slug=self.kwargs["slug"])
        self.check_object_permissions(self.request, obj)
        return obj

    def get_serializer(self, *args, **kwargs):
        instance = self.get_object()
        if self.request.method in SAFE_METHODS and self.request.user.is_authenticated:
            return MasterSerializer(instance)
        elif self.request.method not in SAFE_METHODS:
            serializer_class = MasterSerializer
            return serializer_class(*args, **kwargs)
        else:
            return MasterSerializer(instance)

    def get_queryset(self):
        return Specialist.objects.filter(slug=self.kwargs['slug'])


class MasterReviewsListViewApi(generics.ListAPIView):
    serializer_class = RatingSerializer
    lookup_field = 'specialist__slug'

    def get_queryset(self):
        return Rating.objects.filter(specialist__slug=self.kwargs['specialist__slug'])


class CompaniesListView(generics.ListAPIView):
    serializer_class = CompaniesSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('name', 'short_info', 'tags__name')
    filter_fields = ('categories',)
    ordering_fields = ('created_at',)
    pagination_class = Pagination
    queryset = Company.objects.all()


class CompaniesDetailViewApi(generics.RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class MasterCompanyListViewApi(generics.ListAPIView):
    lookup_field = 'company__slug'
    serializer_class = MasterSerializer
    pagination_class = Pagination

    def get_queryset(self):
        return Specialist.objects.filter(company__slug=self.kwargs['company__slug'])


class CompanyReviewsListApi(generics.ListAPIView):
    serializer_class = RatingSerializer
    lookup_field = 'company__slug'

    def get_queryset(self):
        return Rating.objects.filter(company__slug=self.kwargs['company_slug'])
