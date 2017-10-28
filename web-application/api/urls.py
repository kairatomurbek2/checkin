from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api.views import CompanyListView, SpecialistListView, ScheduleSettingRetrieveView

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'companies', CompanyListView.as_view(), name='companies_api'),
    url(r'masters', SpecialistListView.as_view(), name='masters_api'),
    url(r'schedule-setting/(?P<specialist__slug>[-_\w]+)/$', ScheduleSettingRetrieveView.as_view(),
        name='schedule_setting_by_master')
]
