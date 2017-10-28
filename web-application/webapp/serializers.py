from rest_framework import serializers
from taggit_serializer.serializers import TaggitSerializer, TagListSerializerField

from webapp.models import Company, Specialist, ScheduleSetting


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
        fields = ('id', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'lunch')
