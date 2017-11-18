from rest_framework import serializers
from taggit_serializer.serializers import TaggitSerializer, TagListSerializerField

from webapp.models import Company, Specialist, ScheduleSetting, Reservation, WorkDay
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


class WorkDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkDay
        fields = ('time', 'interval', 'live_recording', 'lunch_settings')


class ScheduleSettingFullSerializer(serializers.ModelSerializer):
    monday = WorkDaySerializer(many=False)
    tuesday = WorkDaySerializer(many=False)
    wednesday = WorkDaySerializer(many=False)
    thursday = WorkDaySerializer(many=False)
    friday = WorkDaySerializer(many=False)
    saturday = WorkDaySerializer(many=False)
    sunday = WorkDaySerializer(many=False)

    class Meta:
        model = ScheduleSetting
        fields = ('id', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'company')


class ScheduleSettingSerializer(serializers.ModelSerializer):
    monday = WorkDaySerializer()
    tuesday = WorkDaySerializer()
    wednesday = WorkDaySerializer()
    thursday = WorkDaySerializer()
    friday = WorkDaySerializer()
    saturday = WorkDaySerializer()
    sunday = WorkDaySerializer()

    class Meta:
        model = ScheduleSetting
        fields = ('id', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'company')

    def create(self, validated_data, *args, **kwargs):
        if 'monday' in validated_data or 'tuesday' in validated_data or 'wednesday' in validated_data \
                or 'thursday' in validated_data or 'friday' in validated_data or 'saturday' in validated_data \
                or 'sunday' in validated_data:
            monday = validated_data.pop('monday')
            tuesday = validated_data.pop('tuesday')
            wednesday = validated_data.pop('wednesday')
            thursday = validated_data.pop('thursday')
            friday = validated_data.pop('friday')
            saturday = validated_data.pop('saturday')
            sunday = validated_data.pop('sunday')

            mondayObj = WorkDay.objects.create(**monday)
            tuesdayObj = WorkDay.objects.create(**tuesday)
            wednesdayObj = WorkDay.objects.create(**wednesday)
            thursdayObj = WorkDay.objects.create(**thursday)
            fridayObj = WorkDay.objects.create(**friday)
            saturdayObj = WorkDay.objects.create(**saturday)
            sundayObj = WorkDay.objects.create(**sunday)

            schedule = ScheduleSetting.objects.create(monday=mondayObj, tuesday=tuesdayObj, wednesday=wednesdayObj,
                                                      thursday=thursdayObj, friday=fridayObj, saturday=saturdayObj,
                                                      sunday=sundayObj)
            specialist = Specialist.objects.get(slug=self.context['specialist__slug'].slug)
            schedule.specialist = specialist
            schedule.save()
            return schedule


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
        fields = ('id', 'full_name', 'date_time_reservation', 'phone', 'status')


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('status',)
