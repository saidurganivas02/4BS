from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    MeView,
    LeadViewSet,
    CustomerViewSet,
    AppointmentViewSet,
    FollowUpViewSet,
    CalculationRecordViewSet,
    BlogPostViewSet,
    UserViewSet,
    DashboardStatsView,
)
from .connection import (
    ConnectionDiagnosticsView,
    PingPongView,
    TestConnectionView,
)

router = DefaultRouter()
router.register(r'leads', LeadViewSet, basename='lead')
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'followups', FollowUpViewSet, basename='followup')
router.register(r'calculations', CalculationRecordViewSet, basename='calculation')
router.register(r'blogs', BlogPostViewSet, basename='blog')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', MeView.as_view(), name='auth_me'),
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard_stats'),
    
    # Backend Connection & Health Endpoints
    path('connection/', ConnectionDiagnosticsView.as_view(), name='connection_diagnostics'),
    path('connection/ping/', PingPongView.as_view(), name='connection_ping'),
    path('connection/test/', TestConnectionView.as_view(), name='connection_test'),
    path('health/', ConnectionDiagnosticsView.as_view(), name='connection_health_alias'),
    
    path('', include(router.urls)),
]
