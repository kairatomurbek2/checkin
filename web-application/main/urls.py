from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static

from webapp.views.landing import TagAutocomplete

urlpatterns = [
                  url(r'^admin/', admin.site.urls),
                  url(r'^i18n/', include('django.conf.urls.i18n')),
                  url(r'^redactor/', include('redactor.urls')),
                  url(r'^select2/', include('django_select2.urls')),
                  url(r'^accounts/', include('allauth.urls')),
                  url(r'^autocomplete/$', TagAutocomplete.as_view(), name='autocomplete'),
                  url(r'^', include('webapp.urls'))
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
