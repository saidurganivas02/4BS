from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Count, Sum, Q
from datetime import date

from .models import User, Lead, Customer, Appointment, FollowUp, CalculationRecord, BlogPost, UserRole, LeadStatus
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserSerializer,
    LeadSerializer,
    CustomerSerializer,
    AppointmentSerializer,
    FollowUpSerializer,
    CalculationRecordSerializer,
    BlogPostSerializer,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class DivisionFilterMixin:
    """Helper to scope querysets to the user's assigned business division, unless Super Admin."""
    def get_scoped_queryset(self, model_class):
        user = self.request.user
        qs = model_class.objects.all()
        division_param = self.request.query_params.get('division')

        if division_param and division_param != 'all':
            qs = qs.filter(division=division_param)
        elif not user.is_authenticated or user.role == UserRole.CUSTOMER:
            pass
        elif not user.is_super_admin():
            division_map = {
                UserRole.INSURANCE_ADMIN: 'insurance',
                UserRole.NUTRITION_ADMIN: 'nutrition',
                UserRole.KANGEN_ADMIN: 'kangen',
                UserRole.SOLAR_ADMIN: 'solar',
            }
            user_div = division_map.get(user.role)
            if user_div:
                qs = qs.filter(division=user_div)

        return qs

class LeadViewSet(viewsets.ModelViewSet, DivisionFilterMixin):
    serializer_class = LeadSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return self.get_scoped_queryset(Lead)

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.status in [LeadStatus.CONVERTED, LeadStatus.WON]:
            Customer.objects.get_or_create(
                phone=instance.phone,
                defaults={
                    'division': instance.division,
                    'name': instance.name,
                    'email': instance.email or '',
                    'address': instance.city or '',
                    'total_purchases': instance.estimated_value or 0,
                    'policy_or_system_details': instance.service_interest or f"Converted lead - {instance.division}",
                    'notes': f"Auto-converted from lead status '{instance.status}'. Notes: {instance.notes or ''}",
                }
            )

    @action(detail=True, methods=['post'])
    def convert(self, request, pk=None):
        lead = self.get_object()
        lead.status = LeadStatus.CONVERTED
        lead.save()
        customer, _ = Customer.objects.get_or_create(
            phone=lead.phone,
            defaults={
                'division': lead.division,
                'name': lead.name,
                'email': lead.email or '',
                'address': lead.city or '',
                'total_purchases': lead.estimated_value or 0,
                'policy_or_system_details': lead.service_interest or f"Converted lead - {lead.division}",
                'notes': f"Converted from Lead. Notes: {lead.notes or ''}",
            }
        )
        return Response({
            'status': 'Lead converted successfully',
            'lead': LeadSerializer(lead).data,
            'customer': CustomerSerializer(customer).data,
        })

class CustomerViewSet(viewsets.ModelViewSet, DivisionFilterMixin):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return self.get_scoped_queryset(Customer)

class AppointmentViewSet(viewsets.ModelViewSet, DivisionFilterMixin):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return self.get_scoped_queryset(Appointment)

class FollowUpViewSet(viewsets.ModelViewSet, DivisionFilterMixin):
    serializer_class = FollowUpSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return self.get_scoped_queryset(FollowUp)

class CalculationRecordViewSet(viewsets.ModelViewSet, DivisionFilterMixin):
    serializer_class = CalculationRecordSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return self.get_scoped_queryset(CalculationRecord)

class BlogPostViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        qs = BlogPost.objects.all()
        division = self.request.query_params.get('division')
        category = self.request.query_params.get('category')
        published_only = self.request.query_params.get('published_only', 'true')

        if published_only.lower() == 'true':
            qs = qs.filter(is_published=True)
        if division and division != 'all':
            qs = qs.filter(division=division)
        if category and category != 'all':
            qs = qs.filter(category=category)
        return qs

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()

class DashboardStatsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        user = request.user
        division = request.query_params.get('division', 'all')

        # If user is scoped to a specific business admin role
        if user.is_authenticated and not user.is_super_admin():
            role_div_map = {
                UserRole.INSURANCE_ADMIN: 'insurance',
                UserRole.NUTRITION_ADMIN: 'nutrition',
                UserRole.KANGEN_ADMIN: 'kangen',
                UserRole.SOLAR_ADMIN: 'solar',
            }
            division = role_div_map.get(user.role, division)

        lead_filter = Q()
        appt_filter = Q()
        calc_filter = Q()

        if division != 'all':
            lead_filter &= Q(division=division)
            appt_filter &= Q(division=division)
            calc_filter &= Q(division=division)

        leads_qs = Lead.objects.filter(lead_filter)
        appts_qs = Appointment.objects.filter(appt_filter)
        calcs_qs = CalculationRecord.objects.filter(calc_filter)

        total_leads = leads_qs.count()
        new_leads = leads_qs.filter(status='new').count()
        qualified_leads = leads_qs.filter(status='qualified').count()
        proposals_sent = leads_qs.filter(status='proposal_sent').count()
        won_leads = leads_qs.filter(status='won').count()
        lost_leads = leads_qs.filter(status='lost').count()

        total_deal_volume = leads_qs.filter(status='won').aggregate(total=Sum('estimated_value'))['total'] or 0
        pipeline_value = leads_qs.exclude(status__in=['won', 'lost']).aggregate(total=Sum('estimated_value'))['total'] or 0

        today = date.today()
        upcoming_appointments = appts_qs.filter(appointment_date__gte=today).count()
        total_appointments = appts_qs.count()
        total_calculations = calcs_qs.count()

        # Division breakdown (if all)
        division_breakdown = []
        for div_key, div_label in [
            ('insurance', 'Tata AIA Insurance'),
            ('nutrition', 'Herbalife Nutrition'),
            ('kangen', 'Kangen Water'),
            ('solar', 'Solar Energy')
        ]:
            div_leads = Lead.objects.filter(division=div_key)
            division_breakdown.append({
                'division': div_key,
                'label': div_label,
                'lead_count': div_leads.count(),
                'won_count': div_leads.filter(status='won').count(),
                'pipeline_value': float(div_leads.aggregate(total=Sum('estimated_value'))['total'] or 0),
                'appointment_count': Appointment.objects.filter(division=div_key).count(),
                'calc_count': CalculationRecord.objects.filter(division=div_key).count(),
            })

        recent_leads = LeadSerializer(leads_qs.order_by('-created_at')[:8], many=True).data
        recent_appointments = AppointmentSerializer(appts_qs.order_by('-appointment_date', '-appointment_time')[:6], many=True).data

        return Response({
            'division': division,
            'summary': {
                'total_leads': total_leads,
                'new_leads': new_leads,
                'qualified_leads': qualified_leads,
                'proposals_sent': proposals_sent,
                'won_leads': won_leads,
                'lost_leads': lost_leads,
                'conversion_rate': round((won_leads / total_leads * 100) if total_leads > 0 else 0, 1),
                'total_deal_volume': float(total_deal_volume),
                'pipeline_value': float(pipeline_value),
                'upcoming_appointments': upcoming_appointments,
                'total_appointments': total_appointments,
                'total_calculations': total_calculations,
            },
            'division_breakdown': division_breakdown,
            'recent_leads': recent_leads,
            'recent_appointments': recent_appointments,
        })
