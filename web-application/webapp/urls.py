from django.conf.urls import url

from webapp.decorators import user_profile_permission
from webapp.views import landing as landing_views
from webapp.views import company as company_views
from webapp.views import specialist as specialist_views
from webapp.views import profile as profile_views

urlpatterns = [
    url(r'^$', landing_views.HomeView.as_view(), name='home'),
    url(r'^masters/$', specialist_views.MastersList.as_view(), name='masters'),
    url(r'^companies/$', company_views.CompanyList.as_view(), name='company_list'),
    url(r'^categories/(?P<slug>[-_\w]+)/$', company_views.CompanySpecialistList.as_view(),
        name='company_specialist_list'),
    url(r'^profiles/(?P<slug>[-_\w]+)/$', user_profile_permission(profile_views.ProfileEditView.as_view()),
        name='profile_update'),
    url(r'^masters/create/$', specialist_views.MasterCreateView.as_view(), name='new_master'),
    url(r'^companies/create/$', company_views.CompanyCreateView.as_view(), name='new_company'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/$', specialist_views.MasterDetailView.as_view(), name='master_detail'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/$', company_views.CompanyDetail.as_view(), name='company_detail')
]
