from django.conf.urls import url

from webapp.decorators import user_profile_permission, specialist_owner, company_owner, user_review_count_check, \
    schedule_setting_specialist, user_specialist_create_check, user_company_create_check, login_check_favorite
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
    url(r'^profiles/(?P<slug>[-_\w]+)/favorite/$',
        user_profile_permission(profile_views.ProfileFavoriteListView.as_view()),
        name='favorite_list'),
    url(r'^masters/create/$', user_specialist_create_check(specialist_views.MasterCreateView.as_view()),
        name='new_master'),
    url(r'^companies/create/$', user_company_create_check(company_views.CompanyCreateView.as_view()),
        name='new_company'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/$', specialist_views.MasterDetailView.as_view(), name='master_detail'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/update/$', specialist_owner(specialist_views.MasterEditView.as_view()),
        name='master_edit'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/$', company_views.CompanyDetail.as_view(), name='company_detail'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/update/$', company_owner(company_views.CompanyEditView.as_view()),
        name='company_edit'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/add-administrator/$',
        company_owner(company_views.AddAdministratorView.as_view()), name='add_administrator'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/user-search/$',
        company_owner(company_views.SpecialistSearchView.as_view()),
        name='user_search'),
    url(r'^search/$', landing_views.SearchView.as_view(), name='search'),
    url(r'^invite-accept/$', specialist_views.SpecialistInviteAcceptView.as_view(), name='invite_accept'),
    url(r'^create_review/(?P<master_slug>[-_\w]+)/specialist/$',
        user_review_count_check(specialist_views.CreateReviewForSpecialistView.as_view()),
        name='create_review_specialist'),
    url(r'^review/(?P<company_slug>[-_\w]+)/company/$',
        user_review_count_check(company_views.CreateReviewForCompanyView.as_view()),
        name='create_review_company'),
    url(r'^master/(?P<master_slug>[-_\w]+)/reviews/$', specialist_views.ReviewSpecialistListView.as_view(),
        name='specialist_reviews'),
    url(r'^company/(?P<company_slug>[-_\w]+)/reviews/$', company_views.ReviewCompanyListView.as_view(),
        name='company_reviews'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/add-schedule-setting/$',
        schedule_setting_specialist(specialist_views.CreateScheduleSettingView.as_view()), name='add_schedule_setting'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/update-schedule-setting/$',
        specialist_owner(specialist_views.UpdateScheduleSettingView.as_view()), name='update_schedule_setting'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/reservations/$',
        specialist_owner(specialist_views.ReservationListView.as_view()), name='master_reservation'),
    url(r'^favorite/add/', login_check_favorite(landing_views.FavoriteCreateView.as_view()), name='favorites')
]
