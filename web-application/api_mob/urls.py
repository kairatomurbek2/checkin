from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api_mob.views import CategoryMainListView, CategoryListView, CategoryRetrieveView, MastersListView, \
    CompaniesListView, MasterRetrieveUpdateViewApi, MasterReviewsListViewApi, CompaniesDetailViewApi, \
    MasterCompanyListViewApi, CompanyReviewsListApi, FacebookLogin, GoogleLogin

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^categories/main/', CategoryMainListView.as_view(), name='main_category'),
    url(r'categories/$', CategoryListView.as_view(), name='categories'),
    url(r'categories/(?P<slug>[-_\w]+)/$', CategoryRetrieveView.as_view(), name='category'),
    url(r'masters/(?P<slug>[-_\w]+)/$', MasterRetrieveUpdateViewApi.as_view(), name='masters_api_v1_detail'),
    url(r'masters/(?P<specialist__slug>[-_\w]+)/reviews/$', MasterReviewsListViewApi.as_view(),
        name='masters__reviews_api_v1'),
    url(r'masters/$', MastersListView.as_view(), name='masters_api_v1'),
    url(r'companies/$', CompaniesListView.as_view(), name='companies_api_v1'),
    url(r'companies/(?P<slug>[-_\w]+)/$', CompaniesDetailViewApi.as_view(), name='companies_api_v1_detail'),
    url(r'companies/(?P<company__slug>[-_\w]+)/specialists/$', MasterCompanyListViewApi.as_view(),
        name='masters_company_api_v1'),
    url(r'companies/(?P<company_slug>[-_\w]+)/reviews/$', CompanyReviewsListApi.as_view(),
        name='company_reviews_api_v1'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/google/$', GoogleLogin.as_view(), name='google_login'),
]
