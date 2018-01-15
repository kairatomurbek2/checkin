from django.http import JsonResponse
from django.views import View
from rest_framework import filters
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ParseError
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import SAFE_METHODS, AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from api.permissions import MasterOwnerOrReadOnly
from api_mob.serializers import CategoryMainSerializer, CategorySerializer, MasterSerializer, CompaniesSerializer, \
    RatingSerializer, CompanySerializer, RatingCreteSerializer, FavoriteSpecialistSerializer
from api_mob.social_auth import SocialAuth
from main.parameters import Messages
from webapp.models import Category, Specialist, Company, Rating, FavoriteSpecialist
from rest_framework import status


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        try:
            return super(TokenAuthentication1, self).authenticate(request=request)
        except AuthenticationFailed:
            pass


class Pagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100


class FacebookLogin(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        social_auth = SocialAuth(token_key='social_token', provider='facebook')
        return social_auth.login(request)


class GoogleLogin(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        social_auth = SocialAuth(token_key='social_token', provider='google')
        return social_auth.login(request)


class CategoryMainListView(generics.ListAPIView):
    serializer_class = CategoryMainSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Category.objects.filter(parent=None)
        return queryset


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend,)
    filter_fields = ('parent',)
    pagination_class = None

    def get_queryset(self):
        queryset = Category.objects.all()
        return queryset


class CategoryRetrieveView(generics.RetrieveAPIView):
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Category.objects.filter(slug=self.kwargs['slug'])


class MastersListView(generics.ListAPIView):
    authentication_classes = (CustomTokenAuthentication,)

    serializer_class = MasterSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('full_name', 'tags__name')
    filter_fields = ('categories',)
    ordering_fields = ('created_at',)
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
    pagination_class = None

    def get_queryset(self):
        return Rating.objects.filter(specialist__slug=self.kwargs['specialist__slug'])


class CompaniesListView(generics.ListAPIView):
    serializer_class = CompaniesSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ('name', 'company_tags__name')
    filter_fields = ('categories',)
    ordering_fields = ('created_at',)
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
    pagination_class = None

    def get_queryset(self):
        return Rating.objects.filter(company__slug=self.kwargs['company_slug'])


class RatingAddSpecialistViewApi(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = RatingCreteSerializer

    def create(self, request, *args, **kwargs):
        specialist = get_object_or_404(Specialist, slug=self.kwargs['specialist__slug'])
        check_rating = specialist.rating_specialist.filter(user=request.user).exists()
        if check_rating:
            return JsonResponse({
                "status": "forbidden",
                "message": Messages.Rating.forbidden
            })
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(specialist=specialist, user=self.request.user)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RatingAddCompanyViewApi(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = RatingCreteSerializer

    def create(self, request, *args, **kwargs):
        company = get_object_or_404(Company, slug=self.kwargs['company__slug'])
        check_rating = company.rating_company.filter(user=request.user).exists()
        if check_rating:
            return JsonResponse({
                "status": "forbidden",
                "message": Messages.Rating.forbidden
            })
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(company=company, user=self.request.user)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class FavoriteAddViewApi(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request, slug):
        favorite = FavoriteSpecialist.objects.filter(specialist__slug=slug, user=request.user)
        if favorite:
            favorite.first().delete()
            status = "success"
            message = Messages.Favorite.delete_success
        else:
            specialist = get_object_or_404(Specialist, slug=slug)
            favorite = FavoriteSpecialist(specialist=specialist, user=request.user)
            favorite.save()
            status = "success"
            message = Messages.Favorite.add_success
        return JsonResponse({
            "status": status,
            "message": message
        })


class ProfileFavoriteListViewApi(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = FavoriteSpecialistSerializer
    pagination_class = None

    def get_queryset(self):
        return FavoriteSpecialist.objects.filter(user=self.request.user)
