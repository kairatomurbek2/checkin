from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api.views import CompanyListView, SpecialistListView, ScheduleSettingRetrieveView, ReservationListView, \
    ReservationCreateView
from webapp.decorators import login_check

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^companies', CompanyListView.as_view(), name='companies_api'),
    url(r'^masters', SpecialistListView.as_view(), name='masters_api'),
    url(r'^schedule-setting/(?P<specialist__slug>[-_\w]+)/$', ScheduleSettingRetrieveView.as_view(),
        name='schedule_setting_by_master'),
    url(r'^reservation/(?P<specialist__slug>[-_\w]+)/$', ReservationListView.as_view(),
        name='reservation_master_list_api'),
    url(r'^reservation/add/(?P<specialist__slug>[-_\w]+)/$', login_check(ReservationCreateView.as_view()),
        name='reservation_master_create')
]
