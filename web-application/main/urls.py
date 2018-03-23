from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static

from webapp.views.landing import TagAutocomplete

urlpatterns = [
                  url(r'^admin/', admin.site.urls),
                  url(r'^i18n/', include('django.conf.urls.i18n')),
                  url(r'^redactor/', include('redactor.urls')),
                  url(r'^ckeditor/', include('ckeditor_uploader.urls')),
                  url(r'^accounts/', include('allauth.urls')),
                  url(r'^autocomplete/$', TagAutocomplete.as_view(), name='autocomplete'),
                  url(r'^', include('webapp.urls')),
                  url(r'^api/', include('api.urls')),
                  url(r'^api/v1/', include('api_mob.urls'), name='api_v1'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_rrot=settings.STATIC_ROOT)


handler404 = 'webapp.views.base_views.handle_404'
handler500 = 'webapp.views.base_views.handle_500'
handler403 = 'webapp.views.base_views.handle_403'
