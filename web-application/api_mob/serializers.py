from rest_framework import serializers

from webapp.models import Category


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
