from django.conf import settings
from rest_framework import serializers
from taggit_serializer.serializers import TaggitSerializer, TagListSerializerField

from webapp.models import Company, Specialist, ScheduleSetting, TimeInterval, Reservation
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


class TimeIntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeInterval
        fields = ('time_interval',)


class ScheduleSettingFullSerializer(serializers.ModelSerializer):
    time_interval = TimeIntervalSerializer(many=False)

    class Meta:
        model = ScheduleSetting
        fields = (
            'id', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'lunch',
            'time_interval')


class DateTimeFieldWihTZ(serializers.DateTimeField):
    def to_representation(self, value):
        value = timezone.localtime(value)
        return super(DateTimeFieldWihTZ, self).to_representation(value)


class ReservationFullSerializer(serializers.ModelSerializer):
    date_time_reservation = DateTimeFieldWihTZ(format="%d.%m.%Y %H:%M")

    class Meta:
        model = Reservation
        fields = ('id', 'full_name', 'date_time_reservation', 'status', 'phone')
