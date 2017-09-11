from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api.views import CompanyListView, SpecialistListView

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'companies', CompanyListView.as_view(), name='companies'),
    url(r'masters', SpecialistListView.as_view(), name='masters')
]
