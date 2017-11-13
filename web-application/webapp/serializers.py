from rest_framework import serializers
from taggit_serializer.serializers import TaggitSerializer, TagListSerializerField

from webapp.models import Company, Specialist, ScheduleSetting, Reservation
from django.utils import timezone


class CompanyShortSerializer(serializers.ModelSerializer, TaggitSerializer):
    company_tags = TagListSerializerField()

    class Meta:
        model = Company
        fields = ('id', 'name', 'slug', 'company_tags')


class SpecialistShortSerializer(serializers.ModelSerializer, TaggitSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Specialist
        fields = ('id', 'full_name', 'slug', 'tags')


class ScheduleSettingFullSerializer(serializers.ModelSerializer):

    class Meta:
        model = ScheduleSetting
        fields = (
            'id', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')


class DateTimeFieldWihTZ(serializers.DateTimeField):
    def to_representation(self, value):
        value = timezone.localtime(value)
        return super(DateTimeFieldWihTZ, self).to_representation(value)


class ReservationFullSerializer(serializers.ModelSerializer):
    date_time_reservation = DateTimeFieldWihTZ(format="%d.%m.%Y %H:%M")

    class Meta:
        model = Reservation
        fields = ('id', 'full_name', 'date_time_reservation', 'status', 'phone')


class ReservationCreteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('full_name', 'date_time_reservation', 'phone', 'status')


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('status',)
