from rest_framework import serializers
from taggit_serializer.serializers import TagListSerializerField

from webapp.models import Category, Specialist, SpecialistContact


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'icon')


class CategoryMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'icon')


class CategorySerializer(serializers.ModelSerializer):
    children = ChildrenSerializer(many=True, required=False)

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'icon', 'children')


class SpecialistContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialistContact
        fields = ('id', 'phone')


class MasterSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    categories = serializers.StringRelatedField(many=True)
    specialist_contacts = SpecialistContactSerializer(many=True)

    class Meta:
        model = Specialist
        fields = (
            'id', 'user', 'company', 'photo', 'full_name', 'sex', 'slug', 'street_address', 'short_info', 'info',
            'categories', 'tags', 'specialist_contacts')
