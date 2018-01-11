from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static

from webapp.views.landing import TagAutocomplete

urlpatterns = [
                  url(r'^admin/', admin.site.urls),
                  url(r'^i18n/', include('django.conf.urls.i18n')),
                  url(r'^redactor/', include('redactor.urls')),
                  url(r'^accounts/', include('allauth.urls')),
                  url(r'^autocomplete/$', TagAutocomplete.as_view(), name='autocomplete'),
                  url(r'^', include('webapp.urls')),
                  url(r'^api/', include('api.urls')),
                  url(r'^api/v1/', include('api_mob.urls'), name='api_v1'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
