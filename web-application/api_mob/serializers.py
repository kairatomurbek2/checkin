from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

from webapp.models import Category, Specialist, SpecialistContact, Company, CompanyContact, Rating, FavoriteSpecialist, \
    Certificate


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


class CreateEditMasterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Specialist
        fields = ('full_name', 'sex', 'street_address', 'short_info', 'info',
                  'message_decline', 'rating')