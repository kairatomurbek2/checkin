from datetime import date
import datetime
from django.contrib.auth.models import User
from django.db.models import Q
from django.utils import timezone
from phonenumbers import PhoneNumber
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.fields import empty
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

from webapp.models import Category, Specialist, SpecialistContact, Company, CompanyContact, Rating, FavoriteSpecialist, \
    Certificate, Reservation, ScheduleSetting, WorkDay


class DateTimeFieldWihTZ(serializers.DateTimeField):
    def to_representation(self, value):
        value = timezone.localtime(value)
        return super(DateTimeFieldWihTZ, self).to_representation(value)


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'icon')


class CategoryMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'icon')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'icon')

    def get_fields(self):
        fields = super(CategorySerializer, self).get_fields()
        fields['children'] = CategorySerializer(many=True)
        return fields


class SpecialistContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialistContact
        fields = ('id', 'phone')


class CompanyByMaster(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ('id', 'name', 'slug', 'logo_url', 'street_address', 'short_info')

    def get_logo_url(self, obj):
        if obj.logo:
            return obj.mobile_logo.url
        else:
            pass


class MasterSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    categories = serializers.StringRelatedField(many=True)
    specialist_contacts = SpecialistContactSerializer(many=True)
    company = CompanyByMaster(many=True)
    review_count = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Specialist
        fields = (
            'id', 'user', 'company', 'photo_url', 'full_name', 'sex', 'slug', 'street_address', 'short_info', 'info',
            'categories', 'tags', 'specialist_contacts', 'rating', 'review_count', 'is_favorite')

    def get_review_count(self, obj):
        review_count = obj.rating_specialist.all().count()
        return review_count

    def get_photo_url(self, obj):
        return obj.mobile_photo.url

    def get_is_favorite(self, specialist):
        request = self.context.get("request")
        user = request.user
        if user.is_authenticated:
            if specialist.specialist_favorites.filter(user=user).exists():
                return True
            else:
                return False
        return False


class RatingSerializer(serializers.ModelSerializer):
    created_at = DateTimeFieldWihTZ(format="%d.%m.%Y %H:%M")

    class Meta:
        model = Rating
        fields = ('id', 'created_at', 'get_user', 'comment', 'count')


class CompanyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyContact
        fields = ('id', 'phone')


class CompaniesSerializer(serializers.ModelSerializer, TaggitSerializer):
    company_tags = TagListSerializerField()
    categories = serializers.StringRelatedField(many=True)
    contacts = CompanyContactSerializer(many=True)
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = (
            'id', 'name', 'slug', 'logo_url', 'company_tags', 'street_address', 'short_info', 'email', 'categories',
            'contacts', 'rating')

    def get_logo_url(self, obj):
        if obj.logo:
            return obj.mobile_logo.url
        else:
            pass


class CompanySerializer(serializers.ModelSerializer, TaggitSerializer):
    company_tags = TagListSerializerField()
    categories = serializers.StringRelatedField(many=True)
    contacts = CompanyContactSerializer(many=True)
    review_count = serializers.SerializerMethodField()
    specialist_count = serializers.SerializerMethodField()
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = (
            'id', 'name', 'slug', 'logo_url', 'company_tags', 'street_address', 'info', 'email', 'latitude',
            'longitude',
            'legal_data', 'rating', 'review_count', 'specialist_count', 'categories', 'contacts')

    def get_review_count(self, obj):
        review_count = obj.rating_company.all().count()
        return review_count

    def get_specialist_count(self, obj):
        specialist_count = obj.company_specialists.all().count()
        return specialist_count

    def get_logo_url(self, obj):
        if obj.logo:
            return obj.mobile_logo.url
        else:
            pass


class RatingCreteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'created_at', 'comment', 'count')


class FavoriteSpecialistSerializer(serializers.ModelSerializer):
    specialist = MasterSerializer(many=False)

    class Meta:
        model = FavoriteSpecialist
        fields = ('id', 'specialist')


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    is_specialist = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'is_specialist')
        read_only_fields = ('email',)

    def get_is_specialist(self, specialist):
        request = self.context.get('request')
        user = request.user
        if user.is_authenticated:
            if user.user_specialists.all().exists():
                return True
            else:
                return False
        return False


class CertificatesSerializer(serializers.ModelSerializer):
    certificate_url = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = ('id', 'certificate_url')

    def get_certificate_url(self, obj):
        if obj.certificate:
            return obj.certificate.url
        else:
            pass


class CustomStringRelatedField(serializers.StringRelatedField):

    def to_internal_value(self, data):
        return data


class CreateMasterSerializer(serializers.ModelSerializer, TaggitSerializer):

    categories = CustomStringRelatedField(many=True)
    photo = serializers.ImageField(required=False)
    specialist_contacts = SpecialistContactSerializer(many=True)
    tags = TagListSerializerField(required=False)

    class Meta:
        model = Specialist
        fields = ('full_name', 'street_address', 'short_info', 'info', 'categories', 'tags', 'photo',
                  'specialist_contacts')

    def create(self, validated_data):
        specialist_contacts = validated_data.pop('specialist_contacts')
        categories = validated_data.pop('categories')

        specialist = Specialist.all_objects.create(**validated_data)

        for sc in specialist_contacts:
            SpecialistContact.objects.create(specialist=specialist, **sc)

        for c_slug in categories:
            try:
                category = Category.objects.get(slug=c_slug)
                specialist.categories.add(category)
            except Category.DoesNotExist:
                raise ValidationError(dict(
                    success='False',
                    message='Категория с slug %s не найдена' % c_slug
                ))

        specialist.save()

        return specialist


class EditMasterSerializer(CreateMasterSerializer):

    def update(self, instance, validated_data):
        validated_data.pop('specialist_contacts')
        request_data = self.context['view'].request.data
        categories = validated_data.pop('categories')

        if 'specialist_contacts' in request_data:
            for sc in request_data['specialist_contacts']:
                if 'id' in sc:
                    specialist_contact = SpecialistContact.objects.get(pk=sc['id'])
                    specialist_contact.phone = sc['phone']

                    specialist_contact.save()
                else:
                    SpecialistContact.objects.create(specialist=instance, **sc)

        for c_slug in categories:
            try:
                category = Category.objects.get(slug=c_slug)

                if category in instance.categories.all():
                    instance.categories.remove(category)
                else:
                    instance.categories.add(category)
            except Category.DoesNotExist:
                raise ValidationError(dict(
                    success='False',
                    message='Категория с slug %s не найдена' % c_slug
                ))

        instance.save()
        super(EditMasterSerializer, self).update(instance, validated_data)

        return instance


class ReservationCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ('id', 'full_name', 'date_time_reservation', 'phone')


class WorkDayWithReservationsSerializer(serializers.ModelSerializer):

    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4
    SATURDAY = 5
    SUNDAY = 6

    interval = serializers.SerializerMethodField()

    DAYS = [
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday',
        'saturday', 'sunday'
    ]

    def __init__(self, instance=None, data=empty, day=None, **kwargs):
        super().__init__(instance, data, **kwargs)
        self.day = day

    reservations = serializers.SerializerMethodField()

    class Meta:
        model = WorkDay
        fields = ('time', 'interval', 'live_recording', 'lunch_settings', 'reservations')

    def get_interval(self, obj):
        interval = obj.interval
        interval_parts = interval.split(':')

        if len(interval_parts) == 1:
            return interval

        return str(int(interval_parts[0]) * 60 + int(interval_parts[1]))

    def get_reservations(self, instance):
        user = self.context['request'].user
        specialist = self.context['specialist']
        today = datetime.datetime.today()
        matching_day = None
        reservations = []

        time_parts = instance.time.split('-')

        if len(time_parts) == 2:

            start_time_parts = time_parts[0].split(':')
            end_time_parts = time_parts[1].split(':')

            today = today.replace(hour=int(start_time_parts[0]), minute=int(start_time_parts[1]))

            for i in range(0, 7):
                day_with_delta = today + datetime.timedelta(days=i)

                if day_with_delta.weekday() == self.day:
                    matching_day = day_with_delta
                    break

            for r in Reservation.objects.filter(Q(specialist=specialist) | Q(user=user), Q(date_time_reservation__gte=matching_day) &
                                                      Q(date_time_reservation__lte=matching_day.replace(hour=int(end_time_parts[0]), minute=int(end_time_parts[1])))):

                time = timezone.localtime(r.date_time_reservation).strftime('%H:%M')

                reservations.append(
                    dict(
                        specialist=r.specialist.full_name,
                        full_name=r.full_name,
                        date_time_reservation=timezone.localtime(r.date_time_reservation).strftime('%d.%m.%Y %H:%M'),
                        time=time,
                        status=r.status,
                        phone=str(r.phone),
                        my_reservation=r.user == user,
                        current_specialist=r.specialist == specialist,
                        interval=self.get_interval_for_specialist_work_day(specialist=r.specialist, day=self.day,
                                                                           reservation_time=time)
                    )
                )

        return reservations

    def get_interval_for_specialist_work_day(self, specialist, day, reservation_time):
        work_day_str = self.DAYS[day]

        work_day = None
        found_matching = False

        for schedule_setting in specialist.schedule_setting_specialist.all():
            work_day = getattr(schedule_setting, work_day_str)
            time_range_parts = work_day.time.split('-')
            start_time_parts = time_range_parts[0].split(':')
            end_time_parts = time_range_parts[1].split(':')
            reservation_time_parts = reservation_time.split(':')

            if int(start_time_parts[0]) <= int(reservation_time_parts[0]) <= int(end_time_parts[0]):
                found_matching = True
                break

        return self.get_interval(work_day) if found_matching else "0"


class MobileScheduleSettingFullSerializer(serializers.ModelSerializer):
    monday = WorkDayWithReservationsSerializer(many=False, day=WorkDayWithReservationsSerializer.MONDAY)
    tuesday = WorkDayWithReservationsSerializer(many=False, day=WorkDayWithReservationsSerializer.TUESDAY)
    wednesday = WorkDayWithReservationsSerializer(many=False, day=WorkDayWithReservationsSerializer.WEDNESDAY)
    thursday = WorkDayWithReservationsSerializer(many=False, day=WorkDayWithReservationsSerializer.THURSDAY)
    friday = WorkDayWithReservationsSerializer(many=False, day=WorkDayWithReservationsSerializer.FRIDAY)
    saturday = WorkDayWithReservationsSerializer(many=False, day=WorkDayWithReservationsSerializer.SATURDAY)
    sunday = WorkDayWithReservationsSerializer(many=False, day=WorkDayWithReservationsSerializer.SUNDAY)
    name = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()

    class Meta:
        model = ScheduleSetting
        fields = ('id', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'company',
                  'name', 'address')

    def get_name(self, instance):
        company = instance.company
        specialist = instance.specialist

        if company:
            return company.name
        elif specialist:
            return specialist.full_name

        return None

    def get_address(self, instance):
        company = instance.company
        specialist = instance.specialist

        if company:
            return company.street_address
        elif specialist:
            return specialist.street_address

        return None


class ReservationEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ('status', )