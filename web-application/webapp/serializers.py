from django.shortcuts import get_object_or_404
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
            company = validated_data.pop('company')

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

            request = self.context.get('request')
            user = request.user
            if user.is_authenticated:
                specialist = Specialist.objects.get(user=user)
                schedule.specialist = specialist
            schedule.company = company
            schedule.save()
            return schedule


class WorkDayUpdateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = WorkDay
        fields = ('id', 'time', 'interval', 'live_recording', 'lunch_settings')


class ScheduleSettingUpdateSerializer(serializers.ModelSerializer):
    monday = WorkDayUpdateSerializer()
    tuesday = WorkDayUpdateSerializer()
    wednesday = WorkDayUpdateSerializer()
    thursday = WorkDayUpdateSerializer()
    friday = WorkDayUpdateSerializer()
    saturday = WorkDayUpdateSerializer()
    sunday = WorkDayUpdateSerializer()

    class Meta:
        model = ScheduleSetting
        fields = ('id', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'company')

    def update(self, instance, validated_data):
        company = validated_data['company']
        monday_id = validated_data['monday'].pop('id')
        tuesday_id = validated_data['tuesday'].pop('id')
        wednesday_id = validated_data['wednesday'].pop('id')
        thursday_id = validated_data['thursday'].pop('id')
        friday_id = validated_data['friday'].pop('id')
        saturday_id = validated_data['saturday'].pop('id')
        sunday_id = validated_data['sunday'].pop('id')

        monday_obj = get_object_or_404(WorkDay, id=monday_id)
        tuesday_obj = get_object_or_404(WorkDay, id=tuesday_id)
        wednesday_obj = get_object_or_404(WorkDay, id=wednesday_id)
        thursday_obj = get_object_or_404(WorkDay, id=thursday_id)
        friday_obj = get_object_or_404(WorkDay, id=friday_id)
        saturday_obj = get_object_or_404(WorkDay, id=saturday_id)
        sunday_obj = get_object_or_404(WorkDay, id=sunday_id)

        ser_monday = WorkDayUpdateSerializer(monday_obj, data=validated_data['monday'])
        ser_tuesday = WorkDayUpdateSerializer(tuesday_obj, data=validated_data['tuesday'])
        ser_wednesday = WorkDayUpdateSerializer(wednesday_obj, data=validated_data['wednesday'])
        ser_thursday = WorkDayUpdateSerializer(thursday_obj, data=validated_data['thursday'])
        ser_friday = WorkDayUpdateSerializer(friday_obj, data=validated_data['friday'])
        ser_saturday = WorkDayUpdateSerializer(saturday_obj, data=validated_data['saturday'])
        ser_sunday = WorkDayUpdateSerializer(sunday_obj, data=validated_data['sunday'])

        if ser_monday.is_valid():
            ser_monday.save()
        if ser_tuesday.is_valid():
            ser_tuesday.save()
        if ser_wednesday.is_valid():
            ser_wednesday.save()
        if ser_thursday.is_valid():
            ser_thursday.save()
        if ser_friday.is_valid():
            ser_friday.save()
        if ser_saturday.is_valid():
            ser_saturday.save()
        if ser_sunday.is_valid():
            ser_sunday.save()
        instance.monday = monday_obj
        instance.tuesday = tuesday_obj
        instance.wednesday = wednesday_obj
        instance.thursday = thursday_obj
        instance.friday = friday_obj
        instance.saturday = saturday_obj
        instance.sunday = sunday_obj
        instance.company = company
        instance.save()
        return instance


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
