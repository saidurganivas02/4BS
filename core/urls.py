import os
from pathlib import Path
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse, JsonResponse
from django.views.static import serve

FRONTEND_DIST = settings.BASE_DIR / 'frontend' / 'dist'

def serve_react_app(request):
    """
    Serves the compiled React frontend SPA index.html for all non-API web routes.
    """
    index_file = FRONTEND_DIST / 'index.html'
    if index_file.exists():
        with open(index_file, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    
    # Fallback if frontend has not been compiled yet
    return JsonResponse({
        'status': 'online',
        'platform': 'QuadraBiz Enterprise Platform',
        'version': '1.0.0',
        'notice': 'React frontend build not found. Run npm run build --prefix frontend to build assets.',
        'divisions': ['Tata AIA Insurance', 'Herbalife Nutrition', 'Kangen Water', 'Solar Rooftop EPC']
    })

def serve_react_assets(request, path):
    """
    Serves bundled JS, CSS, and media chunks from frontend/dist/assets/.
    """
    assets_dir = FRONTEND_DIST / 'assets'
    return serve(request, path, document_root=str(assets_dir))

def serve_dist_root_file(request, filename):
    """
    Serves root public assets like favicon.svg, icons.svg, etc. from frontend/dist/.
    """
    file_path = FRONTEND_DIST / filename
    if file_path.exists() and file_path.is_file():
        return serve(request, filename, document_root=str(FRONTEND_DIST))
    return HttpResponse(status=404)

def health_check(request):
    """
    Official API Health Check endpoint moved to /api/health-check/
    """
    return JsonResponse({
        'status': 'online',
        'platform': 'QuadraBiz Enterprise API',
        'version': '1.0.0',
        'divisions': ['Tata AIA Insurance', 'Herbalife Nutrition', 'Kangen Water', 'Solar Rooftop EPC']
    })

urlpatterns = [
    # Django Admin & REST APIs
    path('admin/', admin.site.urls),
    path('api/health-check/', health_check, name='api_health_check'),
    path('api/status/', health_check, name='api_status'),
    path('api/', include('api.urls')),

    # React Static Assets
    re_path(r'^assets/(?P<path>.*)$', serve_react_assets),
    re_path(r'^(?P<filename>[^/]+\.(svg|png|jpg|jpeg|ico|json|txt|webp))$', serve_dist_root_file),

    # Catch-all: Route all frontend client-side paths to React SPA index.html
    re_path(r'^(?!api|admin|static|media|assets).*$', serve_react_app),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
