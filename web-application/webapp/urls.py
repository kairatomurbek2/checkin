from django.conf.urls import url
from webapp.views import landing as landing_views
from webapp.views import company as company_views
from webapp.views import specialist as specialist_views

urlpatterns = [
    url(r'^$', landing_views.HomeView.as_view(), name='home'),
    url(r'^masters/$', specialist_views.MastersList.as_view(), name='masters'),
    url(r'^companies/$', company_views.CompanyList.as_view(), name='company_list'),
    url(r'^(?P<slug>[-_\w]+)/$', company_views.CompanySpecialistList.as_view(), name='company_specialist_list'),
]
