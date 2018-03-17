from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework_swagger.views import get_swagger_view

from api.views import ScheduleSettingAddView, ScheduleSettingUpdateView
from api_mob.views import CategoryMainListView, CategoryListView, CategoryRetrieveView, MastersListView, \
    CompaniesListView, MasterDetailViewApi, MasterReviewsListViewApi, CompaniesDetailViewApi, \
    MasterCompanyListViewApi, CompanyReviewsListApi, FacebookLogin, GoogleLogin, RatingAddSpecialistViewApi, \
    RatingAddCompanyViewApi, FavoriteAddViewApi, ProfileFavoriteListViewApi, UserDetailsViewApi, \
    CertificatesSpecialistListViewApi, CertificatesCompanyListViewApi, CreateMasterViewApi, EditMasterViewApi, \
    MasterScheduleViewApi, ReservationCreateViewApi, MasterReservationsListViewApi, MasterReservationEditViewApi, \
    UserInfoViewApi, MobileScheduleSettingUpdateView

schema_view = get_swagger_view(title='Pastebin API')

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^docs/', schema_view),
    url(r'^categories/main/', CategoryMainListView.as_view(), name='main_category'),
    url(r'^categories/$', CategoryListView.as_view(), name='categories'),
    url(r'^categories/(?P<slug>[-_\w]+)/$', CategoryRetrieveView.as_view(), name='category'),
    url(r'^masters/(?P<slug>[-_\w]+)/$', MasterDetailViewApi.as_view(), name='masters_api_v1_detail'),
    url(r'^masters/(?P<specialist__slug>[-_\w]+)/reviews/$', MasterReviewsListViewApi.as_view(),
        name='masters__reviews_api_v1'),
    url(r'^masters/(?P<specialist__slug>[-_\w]+)/certificates/$', CertificatesSpecialistListViewApi.as_view(),
        name='masters_certificates_api_v1'),
    url(r'^masters/(?P<specialist__slug>[-_\w]+)/schedule/$', MasterScheduleViewApi.as_view(),
        name='masters_schedule_api_v1'),
    url(r'^masters/(?P<specialist__slug>[-_\w]+)/reservation/create$', ReservationCreateViewApi.as_view(),
        name='masters_reservation_create_api_v1'),
    url(r'^masters/(?P<specialist__slug>[-_\w]+)/reservations/$', MasterReservationsListViewApi.as_view(),
        name='masters_reservations_api_v1'),
    url(r'^reservation/(?P<pk>[-_\d]+)/edit/$', MasterReservationEditViewApi.as_view(),
        name='masters_reservation_edit_api_v1'),
    url(r'^masters/$', MastersListView.as_view(), name='masters_api_v1'),
    url(r'^master/create/$', CreateMasterViewApi.as_view(), name='master_create_api'),
    url(r'^master/edit/$', EditMasterViewApi.as_view(), name='master_edit_api'),
    url(r'^master/schedule/edit/$', MobileScheduleSettingUpdateView.as_view(),
        name='schedule_edit_api_v1'),
    url(r'^companies/$', CompaniesListView.as_view(), name='companies_api_v1'),
    url(r'^companies/(?P<slug>[-_\w]+)/$', CompaniesDetailViewApi.as_view(), name='companies_api_v1_detail'),
    url(r'^companies/(?P<company__slug>[-_\w]+)/specialists/$', MasterCompanyListViewApi.as_view(),
        name='masters_company_api_v1'),
    url(r'^companies/(?P<company__slug>[-_\w]+)/certificates/$', CertificatesCompanyListViewApi.as_view(),
        name='company_certificates_api_v1'),
    url(r'^companies/(?P<company_slug>[-_\w]+)/reviews/$', CompanyReviewsListApi.as_view(),
        name='company_reviews_api_v1'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/profile/$', UserDetailsViewApi.as_view(), name='user_detail_api'),
    # url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/google/$', GoogleLogin.as_view(), name='google_login_api'),
    url(r'^masters/(?P<specialist__slug>[-_\w]+)/add-rating/$', RatingAddSpecialistViewApi.as_view(),
        name='add_rating_for_master'),
    url(r'^companies/(?P<company__slug>[-_\w]+)/add-rating/$', RatingAddCompanyViewApi.as_view(),
        name='add_rating_for_company'),
    url(r'^favorite/add/(?P<slug>[-_\w]+)/$', FavoriteAddViewApi.as_view(), name='favorites_api'),
    url(r'^favorite/$', ProfileFavoriteListViewApi.as_view(), name='favorite_list_api'),
    url(r'^user/info$', UserInfoViewApi.as_view(), name='user_info')
]
