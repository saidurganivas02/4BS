"""
QuadraBiz Enterprise Platform - Backend Connection & Health Diagnostics Engine
Provides robust backend connection verification, database health diagnostics,
and live latency measurement for frontend linking.
"""

import time
import sys
import django
from django.db import connection
from django.utils import timezone
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .models import (
    User,
    Lead,
    Customer,
    Appointment,
    FollowUp,
    CalculationRecord,
    BlogPost
)


class ConnectionDiagnosticsView(APIView):
    """
    GET /api/connection/
    Full diagnostic report verifying the database connection, table integrity,
    active divisions, and API service configuration.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        start_time = time.time()
        
        # Test Database Connection
        db_status = 'connected'
        db_error = None
        try:
            connection.ensure_connection()
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
                cursor.fetchone()
        except Exception as e:
            db_status = 'error'
            db_error = str(e)

        # Count records across all key business tables
        table_counts = {}
        if db_status == 'connected':
            try:
                table_counts = {
                    'users': User.objects.count(),
                    'leads': Lead.objects.count(),
                    'customers': Customer.objects.count(),
                    'appointments': Appointment.objects.count(),
                    'followups': FollowUp.objects.count(),
                    'calculations': CalculationRecord.objects.count(),
                    'blogs': BlogPost.objects.count(),
                }
            except Exception as e:
                table_counts = {'error': str(e)}

        duration_ms = round((time.time() - start_time) * 1000, 2)

        return Response({
            'status': 'connected',
            'health': 'optimal' if db_status == 'connected' else 'degraded',
            'api_version': '1.0.0',
            'platform': 'QuadraBiz Enterprise Platform',
            'divisions': [
                {'code': 'insurance', 'name': 'Tata AIA Life Insurance', 'icon': 'ShieldCheck'},
                {'code': 'nutrition', 'name': 'Herbalife Nutrition', 'icon': 'Leaf'},
                {'code': 'kangen', 'name': 'Enagic Kangen Water', 'icon': 'Droplets'},
                {'code': 'solar', 'name': 'Solar Rooftop EPC', 'icon': 'SunMedium'},
            ],
            'database': {
                'status': db_status,
                'engine': settings.DATABASES['default']['ENGINE'].split('.')[-1],
                'name': str(settings.DATABASES['default']['NAME']),
                'error': db_error,
                'record_counts': table_counts,
            },
            'server_environment': {
                'python_version': sys.version.split(' ')[0],
                'django_version': django.__version__,
                'debug_mode': settings.DEBUG,
                'time_zone': settings.TIME_ZONE,
                'server_time': timezone.now().isoformat(),
                'cors_allowed_all': getattr(settings, 'CORS_ALLOW_ALL_ORIGINS', False),
            },
            'diagnostics': {
                'database_latency_ms': duration_ms,
                'client_ip': request.META.get('REMOTE_ADDR'),
                'origin': request.META.get('HTTP_ORIGIN', 'direct'),
            }
        }, status=status.HTTP_200_OK)


class PingPongView(APIView):
    """
    GET /api/connection/ping/
    Ultra-lightweight ping/pong endpoint for heartbeat checks (< 5ms).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            'ping': 'pong',
            'timestamp': time.time(),
            'server_time': timezone.now().isoformat(),
            'status': 'alive'
        }, status=status.HTTP_200_OK)


class TestConnectionView(APIView):
    """
    POST /api/connection/test/
    Two-way interactive connection test.
    Accepts payload from frontend, validates round-trip, and returns echo stats.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        client_timestamp = request.data.get('client_timestamp')
        payload = request.data.get('payload', 'test')

        now = time.time()
        client_latency_ms = None
        if client_timestamp:
            try:
                client_latency_ms = round((now - float(client_timestamp)) * 1000, 2)
            except (ValueError, TypeError):
                pass

        return Response({
            'status': 'verified',
            'message': 'Strong bidirectional link established with Django backend',
            'echo_payload': payload,
            'client_latency_ms': client_latency_ms,
            'server_timestamp': now,
            'server_time': timezone.now().isoformat(),
            'authenticated_user': request.user.username if request.user.is_authenticated else None,
        }, status=status.HTTP_200_OK)
