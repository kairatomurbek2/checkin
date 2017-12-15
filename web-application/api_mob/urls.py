from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api_mob.views import CategoryMainListView, CategoryListView, CategoryRetrieveView, MastersListView

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^categories/main/', CategoryMainListView.as_view(), name='main_category'),
    url(r'categories/$', CategoryListView.as_view(), name='categories'),
    url(r'categories/(?P<slug>[-_\w]+)/$', CategoryRetrieveView.as_view(), name='category'),
    url(r'masters/$', MastersListView.as_view(), name='masters_api_v1'),
]
