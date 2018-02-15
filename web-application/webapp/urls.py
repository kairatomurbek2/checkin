from django.conf.urls import url

from webapp.decorators import user_profile_permission, specialist_owner, company_owner, user_review_count_check, \
    user_specialist_create_check, user_company_create_check, login_check_favorite, specialist_status_reservation, \
    administrator, company_owners, specialist_owner_company
from webapp.views import landing as landing_views
from webapp.views import company as company_views
from webapp.views import specialist as specialist_views
from webapp.views import profile as profile_views
from django.contrib.flatpages import views as fl_views

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
    url(r'^profiles/(?P<slug>[-_\w]+)/reservations/$',
        user_profile_permission(profile_views.HistoryReservationUser.as_view()),
        name='reservation_list'),
    url(r'^masters/create/$', user_specialist_create_check(specialist_views.MasterCreateView.as_view()),
        name='new_master'),
    url(r'^companies/create/$', user_company_create_check(company_views.CompanyCreateView.as_view()),
        name='new_company'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/$', specialist_views.MasterDetailView.as_view(), name='master_detail'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/update/$', specialist_owner(specialist_views.MasterEditView.as_view()),
        name='master_edit'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/update/company/$',
        specialist_owner_company(specialist_views.MasterEditView.as_view()),
        name='master_edit_company'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/$', company_views.CompanyDetail.as_view(), name='company_detail'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/update/$', company_owner(company_views.CompanyEditView.as_view()),
        name='company_edit'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/add-administrator/$',
        company_owner(company_views.AddAdministratorView.as_view()), name='add_administrator'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/add-master/$',
        company_owner(company_views.AddMasterCompany.as_view()), name='add_master_company'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/administrators/$',
        company_owner(company_views.EmployeesListView.as_view()), name='administrator_list'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/employees-specialist-list/$',
        company_owner(company_views.EmployeesSpecialistListView.as_view()), name='employees_specialist_list'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/administrators/delete$',
        company_owner(company_views.EmployeesDelete.as_view()), name='administrator_delete'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/specialist/delete$',
        company_owner(company_views.EmployeesSpecialistDelete.as_view()), name='specialist_delete'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/user-search/$',
        company_owner(company_views.SpecialistSearchView.as_view()),
        name='user_search'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/masters/$',
        company_owners(company_views.MastersCompanyListView.as_view()),
        name='master_list_company'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/masters/(?P<master_slug>[-_\w]+)/$',
        company_owners(company_views.MasterCompanyDetailView.as_view()),
        name='master_company'),
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
    url(r'^masters/(?P<master_slug>[-_\w]+)/reservations-table/$',
        specialist_owner(specialist_views.ReservationTableListView.as_view()), name='master_reservation_table'),
    url(r'^masters/(?P<master_slug>[-_\w]+)/reservations/$',
        specialist_owner(specialist_views.ReservationListView.as_view()), name='master_reservation'),
    url(r'^favorite/add/', login_check_favorite(landing_views.FavoriteCreateView.as_view()), name='favorites'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/reservations/$',
        administrator(company_views.ReservationAdministratorListView.as_view()), name='administrator_reservation'),
    url(r'^policies/terms/$', fl_views.flatpage, {'url': '/policies/terms/'}, name='terms'),
]
