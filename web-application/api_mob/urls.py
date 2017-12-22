from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api_mob.views import CategoryMainListView, CategoryListView, CategoryRetrieveView, MastersListView, \
    CompaniesListView, MasterRetrieveUpdateViewApi, MasterReviewsListViewApi

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^categories/main/', CategoryMainListView.as_view(), name='main_category'),
    url(r'categories/$', CategoryListView.as_view(), name='categories'),
    url(r'categories/(?P<slug>[-_\w]+)/$', CategoryRetrieveView.as_view(), name='category'),
    url(r'masters/(?P<slug>[-_\w]+)/$', MasterRetrieveUpdateViewApi.as_view(), name='masters_api_v1_update'),
    url(r'masters/(?P<specialist__slug>[-_\w]+)/reviews/$', MasterReviewsListViewApi.as_view(),
        name='masters__reviews_api_v1'),
    url(r'masters/$', MastersListView.as_view(), name='masters_api_v1'),
    url(r'companies/$', CompaniesListView.as_view(), name='companies_api_v1'),
]
