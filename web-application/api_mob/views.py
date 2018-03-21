import json

from django.contrib.auth import get_user_model
from django.db import transaction
from django.http import JsonResponse
from rest_framework import filters
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.generics import get_object_or_404, RetrieveUpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from api.views import ReservationListView
from api_mob.filters import MastersListFilterAPI, CompaniesListFilterAPI
from api_mob.permissions import IsReservationBelongsToSpecialist, IsSpecialist
from api_mob.serializers import CategoryMainSerializer, CategorySerializer, MasterSerializer, CompaniesSerializer, \
    RatingSerializer, CompanySerializer, RatingCreteSerializer, FavoriteSpecialistSerializer, \
    CustomUserDetailsSerializer, CertificatesSerializer, CreateMasterSerializer, \
    EditMasterSerializer, ReservationCreateSerializer, MobileScheduleSettingFullSerializer, ReservationEditSerializer
from api_mob.social_auth import SocialAuth
from main.choices import MODERATION
from main.parameters import Messages
from webapp.models import Category, Specialist, Company, Rating, FavoriteSpecialist, Certificate, Reservation, \
    ScheduleSetting, DAYS
from rest_framework import status


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        try:
            return super(CustomTokenAuthentication, self).authenticate(request=request)
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
        level = self.request.GET.get('level', None)
        queryset = Category.objects.all()

        if level == '2':
            high_level_categories_ids = [i.pk for i in Category.objects.filter(parent=None)]
            queryset = queryset.filter(parent_id__in=high_level_categories_ids)

        return queryset


class CategoryRetrieveView(generics.RetrieveAPIView):
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Category.objects.filter(slug=self.kwargs['slug'])


class MastersListView(generics.ListAPIView):
    authentication_classes = (CustomTokenAuthentication,)
    serializer_class = MasterSerializer
    queryset = Specialist.objects.all()
    filter_class = MastersListFilterAPI


class MasterDetailViewApi(generics.RetrieveAPIView):
    authentication_classes = (CustomTokenAuthentication,)
    lookup_field = 'slug'
    queryset = Specialist.objects.all()
    serializer_class = MasterSerializer


class MasterReviewsListViewApi(generics.ListAPIView):
    serializer_class = RatingSerializer
    lookup_field = 'specialist__slug'
    pagination_class = None

    def get_queryset(self):
        return Rating.objects.filter(specialist__slug=self.kwargs['specialist__slug'])


class CompaniesListView(generics.ListAPIView):
    serializer_class = CompaniesSerializer
    filter_class = CompaniesListFilterAPI
    queryset = Company.objects.all()


class CompaniesDetailViewApi(generics.RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class MasterCompanyListViewApi(generics.ListAPIView):
    authentication_classes = (CustomTokenAuthentication,)
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


class UserDetailsViewApi(RetrieveUpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserDetailsSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return get_user_model().objects.none()


class CertificatesSpecialistListViewApi(generics.ListAPIView):
    serializer_class = CertificatesSerializer
    pagination_class = None

    def get_queryset(self):
        return Certificate.objects.filter(specialist__slug=self.kwargs['specialist__slug'])


class CertificatesCompanyListViewApi(generics.ListAPIView):
    serializer_class = CertificatesSerializer
    pagination_class = None

    def get_queryset(self):
        return Certificate.objects.filter(company__slug=self.kwargs['company__slug'])


class CreateMasterViewApi(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = CreateMasterSerializer

    def __init__(self):
        super(CreateMasterViewApi, self).__init__()
        self.instance = None

    def perform_create(self, serializer):
        if Specialist.all_objects.filter(user=self.request.user).exists():
            raise ValidationError(dict(
                success=False,
                message=Messages.AddMaster.already_created
            ))

        with transaction.atomic():
            self.instance = serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        super(CreateMasterViewApi, self).create(request, *args, **kwargs)

        return JsonResponse(dict(
            success=True, specialist_status=self.instance.status
        ), status=status.HTTP_201_CREATED)


class EditMasterViewApi(generics.RetrieveUpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = EditMasterSerializer
    # permission_classes = (IsSpecialist, )

    def __init__(self):
        super(EditMasterViewApi, self).__init__()
        self.instance = None

    def get(self, request, *args, **kwargs):
        spec = self.get_object()

        if not spec or spec.status == MODERATION:
            msg = 'Невозможно выполнить операцию до создания специалиста.' if not spec else 'Ваша заявка на создание ' \
                                                                                            'специалиста находится на' \
                                                                                            ' модерации. '

            return JsonResponse(dict(
                success=False,
                message=msg
            ))

        serializer_obj = EditMasterSerializer(instance=spec)
        return JsonResponse(serializer_obj.representation())

    def perform_update(self, serializer):
        with transaction.atomic():
            self.instance = serializer.save()

    def update(self, request, *args, **kwargs):
        super(EditMasterViewApi, self).update(request, *args, **kwargs)

        return JsonResponse(dict(
            success=True, message='Ваш профиль обновлен',
            avatar=self.instance.mobile_photo.url if self.instance.mobile_photo else None
        ))

    def get_object(self):
        return Specialist.all_objects.filter(user=self.request.user).first()


class MasterScheduleViewApi(generics.ListAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = MobileScheduleSettingFullSerializer
    lookup_field = 'specialist__slug'
    pagination_class = None

    def get_queryset(self):
        return ScheduleSetting.public_objects.filter(specialist__slug=self.kwargs['specialist__slug'])

    def get_serializer_context(self):
        context = super(MasterScheduleViewApi, self).get_serializer_context()
        context['specialist'] = Specialist.objects.get(slug=self.kwargs['specialist__slug'])

        return context


class ReservationCreateViewApi(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = ReservationCreateSerializer
    lookup_field = 'specialist__slug'
    queryset = Reservation.objects.all()

    def create(self, request, *args, **kwargs):
        super(ReservationCreateViewApi, self).create(request, *args, **kwargs)

        return JsonResponse({
            'success': True,
            'message': Messages.AddReservation.success
        }, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        specialist = get_object_or_404(Specialist, slug=self.kwargs['specialist__slug'])

        check_reservation = Reservation.objects.filter(
            date_time_reservation=validated_data['date_time_reservation']).first()

        if check_reservation:
            msg = Messages.AddReservation.you_already_reserved if check_reservation.user == self.request.user \
                else Messages.AddReservation.another_already_reserved

            raise ValidationError({
                'success': False,
                'message': msg
            })

        serializer.save(specialist=specialist, user=self.request.user)


class MasterReservationsListViewApi(ReservationListView):
    authentication_classes = (TokenAuthentication,)


class MasterReservationEditViewApi(generics.UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = ReservationEditSerializer
    permission_classes = (IsReservationBelongsToSpecialist,)
    lookup_field = 'pk'
    queryset = Reservation.objects.all()

    def perform_update(self, serializer):
        serializer.save(edited_by=self.request.user)


class UserInfoViewApi(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        specialist = Specialist.objects.filter(user=user).first()
        data = {
            'success': True,
            'is_specialist': specialist is not None,
            'name': specialist.full_name if specialist else user.username,
            'phone': [str(p.phone) for p in specialist.specialist_contacts.all()] if specialist else None,
            'avatar': specialist.mobile_photo.url if specialist and specialist.mobile_photo else None,
            'tags': [str(t) for t in specialist.tags.all()] if specialist else None,
            'slug': specialist.slug if specialist else None
        }

        return JsonResponse(data)


class MobileScheduleSettingUpdateView(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsSpecialist, )

    def get(self, request, *args, **kwargs):
        data = []

        for s in self.get_queryset():
            company = s.company
            times = [
                (getattr(s, d)).to_dict(d, DAYS[d]) for d in DAYS
            ]

            item = {'id': s.pk, 'company_name': company.name if company else '',
                    'times': times}

            data.append(item)

        return JsonResponse(data, safe=False)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            try:
                data = json.loads(request.body.decode('utf-8'))

                for schedule in data:
                    try:
                        schedule_setting = ScheduleSetting.objects.get(pk=schedule['id'])

                        for time in schedule['times']:
                            day = getattr(schedule_setting, time['week_day'], None)

                            if day:
                                day.lunch_settings = time['lunch_settings']
                                day.time = time['time']
                                day.interval = time['interval']
                                day.live_recording = time['live_recording']

                                day.save()

                    except ScheduleSetting.DoesNotExist:
                        return JsonResponse(dict(
                            success=False,
                            message='Расписание с id %s не найдено.' % schedule['id']
                        ), status=400)

                return JsonResponse(dict(
                    success=True,
                    message='Расписание успешно обновлено.'
                ))

            except json.JSONDecodeError:
                return JsonResponse(dict(
                    success=False,
                    message='Ошибка при парсинге json. Убедитесь что отправляете запрос с Content-Type:application/json'
                ), status=400)

    def get_queryset(self):
        return ScheduleSetting.objects.filter(specialist__user=self.request.user)