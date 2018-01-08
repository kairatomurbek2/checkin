from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

from webapp.models import Category, Specialist, SpecialistContact, Company, CompanyContact, Rating


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
    class Meta:
        model = Company
        fields = ('id', 'name', 'slug', 'logo', 'street_address', 'short_info')


class MasterSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    categories = serializers.StringRelatedField(many=True)
    specialist_contacts = SpecialistContactSerializer(many=True)
    company = CompanyByMaster(many=True)
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Specialist
        fields = (
            'id', 'user', 'company', 'photo', 'full_name', 'sex', 'slug', 'street_address', 'short_info', 'info',
            'categories', 'tags', 'specialist_contacts', 'rating', 'review_count')

    def get_review_count(self, obj):
        review_count = obj.rating_specialist.all().count()
        return review_count


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

    class Meta:
        model = Company
        fields = (
            'id', 'name', 'slug', 'logo', 'company_tags', 'street_address', 'short_info', 'email', 'categories',
            'contacts', 'rating')


class CompanySerializer(serializers.ModelSerializer, TaggitSerializer):
    company_tags = TagListSerializerField()
    categories = serializers.StringRelatedField(many=True)
    contacts = CompanyContactSerializer(many=True)
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = (
            'id', 'name', 'slug', 'logo', 'company_tags', 'street_address', 'info', 'email', 'latitude', 'longitude',
            'legal_data', 'rating', 'review_count', 'categories', 'contacts')

    def get_review_count(self, obj):
        review_count = obj.rating_company.all().count()
        return review_count
