from django.conf.urls import url
from webapp.views import landing as landing_views

urlpatterns = [
    url(r'^$', landing_views.HomeView.as_view(), name='home'),
]
