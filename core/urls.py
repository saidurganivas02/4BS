from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({
        'status': 'online',
        'platform': 'QuadraBiz Enterprise API',
        'version': '1.0.0',
        'divisions': ['Tata AIA Insurance', 'Herbalife Nutrition', 'Kangen Water', 'Solar Rooftop EPC']
    })

urlpatterns = [
    path('', health_check, name='api_health_check'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
