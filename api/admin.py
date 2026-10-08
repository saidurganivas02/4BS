"""
QuadraBiz Enterprise Administration Configuration
Configures Django admin with customized branding, rich filters, search, and bulk operations.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import (
    User,
    Lead,
    Customer,
    Appointment,
    FollowUp,
    CalculationRecord,
    BlogPost,
    LeadStatus,
    AppointmentStatus,
    FollowUpStatus,
)

# Admin Portal Header Customization
admin.site.site_header = "QuadraBiz Enterprise Administration"
admin.site.site_title = "QuadraBiz Portal Admin"
admin.site.index_title = "Enterprise Operations & Multi-Division Management"


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role_badge', 'business_division_badge', 'is_staff', 'is_active')
    list_filter = ('role', 'business_division', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'phone', 'city')
    ordering = ('username',)

    fieldsets = BaseUserAdmin.fieldsets + (
        ('QuadraBiz Professional Profile', {
            'fields': ('role', 'business_division', 'phone', 'city', 'bio')
        }),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('QuadraBiz Professional Profile', {
            'fields': ('role', 'business_division', 'phone', 'city', 'bio')
        }),
    )

    def role_badge(self, obj):
        colors = {
            'super_admin': '#dc2626',
            'insurance_admin': '#2563eb',
            'insurance_agent': '#3b82f6',
            'nutrition_admin': '#16a34a',
            'nutrition_rep': '#22c55e',
            'kangen_admin': '#0891b2',
            'kangen_rep': '#06b6d4',
            'solar_admin': '#ea580c',
            'solar_sales': '#f59e0b',
            'solar_installer': '#d97706',
            'customer': '#64748b',
        }
        bg = colors.get(obj.role, '#64748b')
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 3px 8px; border-radius: 9999px; font-weight: 600; font-size: 11px;">{}</span>',
            bg,
            obj.get_role_display()
        )
    role_badge.short_description = 'Assigned Role'

    def business_division_badge(self, obj):
        return format_html(
            '<span style="font-weight: 600; color: #1e293b;">{}</span>',
            obj.get_business_division_display()
        )
    business_division_badge.short_description = 'Division'


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'division_badge',
        'phone',
        'email',
        'status_badge',
        'formatted_estimated_value',
        'assigned_to',
        'created_at'
    )
    list_filter = ('division', 'status', 'created_at', 'assigned_to')
    search_fields = ('name', 'phone', 'email', 'city', 'service_interest')
    date_hierarchy = 'created_at'
    actions = ['mark_as_contacted', 'mark_as_qualified', 'mark_as_proposal_sent', 'mark_as_won', 'mark_as_lost']

    def division_badge(self, obj):
        div_colors = {
            'insurance': '#2563eb',
            'nutrition': '#16a34a',
            'kangen': '#0891b2',
            'solar': '#ea580c',
            'general': '#64748b',
        }
        color = div_colors.get(obj.division, '#475569')
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color,
            obj.get_division_display()
        )
    division_badge.short_description = 'Division'

    def status_badge(self, obj):
        status_colors = {
            'new': '#3b82f6',
            'contacted': '#8b5cf6',
            'follow_up': '#f59e0b',
            'qualified': '#06b6d4',
            'proposal_sent': '#6366f1',
            'converted': '#10b981',
            'won': '#16a34a',
            'closed': '#64748b',
            'lost': '#ef4444',
        }
        color = status_colors.get(obj.status, '#64748b')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 600;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'

    def formatted_estimated_value(self, obj):
        return f"₹{obj.estimated_value:,.2f}"
    formatted_estimated_value.short_description = 'Est. Value'

    # Admin actions
    def mark_as_contacted(self, request, queryset):
        queryset.update(status=LeadStatus.CONTACTED)
    mark_as_contacted.short_description = "Mark selected leads as Contacted"

    def mark_as_qualified(self, request, queryset):
        queryset.update(status=LeadStatus.QUALIFIED)
    mark_as_qualified.short_description = "Mark selected leads as Qualified"

    def mark_as_proposal_sent(self, request, queryset):
        queryset.update(status=LeadStatus.PROPOSAL_SENT)
    mark_as_proposal_sent.short_description = "Mark selected leads as Proposal Sent"

    def mark_as_won(self, request, queryset):
        queryset.update(status=LeadStatus.WON)
    mark_as_won.short_description = "Mark selected leads as Closed Won"

    def mark_as_lost(self, request, queryset):
        queryset.update(status=LeadStatus.LOST)
    mark_as_lost.short_description = "Mark selected leads as Closed Lost"


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'division', 'phone', 'email', 'formatted_total_purchases', 'created_at')
    list_filter = ('division', 'created_at')
    search_fields = ('name', 'phone', 'email', 'policy_or_system_details')
    date_hierarchy = 'created_at'

    def formatted_total_purchases(self, obj):
        return f"₹{obj.total_purchases:,.2f}"
    formatted_total_purchases.short_description = 'Total Lifetime Purchases'


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'customer_name',
        'division',
        'appointment_date',
        'appointment_time',
        'mode',
        'status_badge',
        'assigned_to'
    )
    list_filter = ('division', 'status', 'mode', 'appointment_date')
    search_fields = ('customer_name', 'customer_phone', 'customer_email', 'service_type', 'location_or_link')
    date_hierarchy = 'appointment_date'
    actions = ['mark_as_confirmed', 'mark_as_completed', 'mark_as_cancelled']

    def status_badge(self, obj):
        colors = {
            'pending': '#f59e0b',
            'confirmed': '#0284c7',
            'scheduled': '#6366f1',
            'completed': '#16a34a',
            'cancelled': '#dc2626',
            'rescheduled': '#d97706',
        }
        color = colors.get(obj.status, '#64748b')
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 600;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'

    def mark_as_confirmed(self, request, queryset):
        queryset.update(status=AppointmentStatus.CONFIRMED)
    mark_as_confirmed.short_description = "Mark appointments as Confirmed"

    def mark_as_completed(self, request, queryset):
        queryset.update(status=AppointmentStatus.COMPLETED)
    mark_as_completed.short_description = "Mark appointments as Completed"

    def mark_as_cancelled(self, request, queryset):
        queryset.update(status=AppointmentStatus.CANCELLED)
    mark_as_cancelled.short_description = "Mark appointments as Cancelled"


@admin.register(FollowUp)
class FollowUpAdmin(admin.ModelAdmin):
    list_display = ('title', 'division', 'lead', 'due_date', 'priority_badge', 'status_badge')
    list_filter = ('division', 'priority', 'status', 'due_date')
    search_fields = ('title', 'notes', 'lead__name')
    date_hierarchy = 'due_date'
    actions = ['mark_as_done']

    def priority_badge(self, obj):
        colors = {'high': '#dc2626', 'medium': '#ea580c', 'low': '#16a34a'}
        return format_html(
            '<span style="color: {}; font-weight: bold; text-transform: uppercase; font-size: 11px;">{}</span>',
            colors.get(obj.priority, '#64748b'),
            obj.priority
        )
    priority_badge.short_description = 'Priority'

    def status_badge(self, obj):
        colors = {'pending': '#f59e0b', 'done': '#16a34a', 'overdue': '#dc2626'}
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px;">{}</span>',
            colors.get(obj.status, '#64748b'),
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'

    def mark_as_done(self, request, queryset):
        queryset.update(status=FollowUpStatus.DONE)
    mark_as_done.short_description = "Mark selected follow-ups as Done"


@admin.register(CalculationRecord)
class CalculationRecordAdmin(admin.ModelAdmin):
    list_display = ('calculator_name', 'division', 'user_name', 'user_phone', 'created_at')
    list_filter = ('division', 'calculator_name', 'created_at')
    search_fields = ('calculator_name', 'user_name', 'user_phone', 'user_email')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'division', 'category', 'author_name', 'read_time', 'is_published', 'views_count', 'created_at')
    list_filter = ('division', 'category', 'is_published', 'created_at')
    search_fields = ('title', 'excerpt', 'content', 'tags')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    actions = ['publish_posts', 'unpublish_posts']

    def publish_posts(self, request, queryset):
        queryset.update(is_published=True)
    publish_posts.short_description = "Publish selected posts"

    def unpublish_posts(self, request, queryset):
        queryset.update(is_published=False)
    unpublish_posts.short_description = "Unpublish selected posts"
