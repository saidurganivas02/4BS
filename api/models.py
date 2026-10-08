import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class UserRole(models.TextChoices):
    SUPER_ADMIN = 'super_admin', 'Super Admin'
    INSURANCE_ADMIN = 'insurance_admin', 'Tata AIA Insurance Admin'
    INSURANCE_AGENT = 'insurance_agent', 'Tata AIA Insurance Agent'
    NUTRITION_ADMIN = 'nutrition_admin', 'Herbalife Nutrition Admin'
    NUTRITION_REP = 'nutrition_rep', 'Herbalife Representative'
    KANGEN_ADMIN = 'kangen_admin', 'Kangen Water Admin'
    KANGEN_REP = 'kangen_rep', 'Kangen Water Representative'
    SOLAR_ADMIN = 'solar_admin', 'Solar Energy Admin'
    SOLAR_SALES = 'solar_sales', 'Solar Sales Agent'
    SOLAR_INSTALLER = 'solar_installer', 'Solar Installation Team'
    CUSTOMER = 'customer', 'Customer'

class BusinessDivision(models.TextChoices):
    INSURANCE = 'insurance', 'Tata AIA Life Insurance'
    NUTRITION = 'nutrition', 'Herbalife Nutrition'
    KANGEN = 'kangen', 'Kangen Water'
    SOLAR = 'solar', 'Solar Panel Installation'
    GENERAL = 'general', 'General Enterprise'

class User(AbstractUser):
    role = models.CharField(
        max_length=30,
        choices=UserRole.choices,
        default=UserRole.CUSTOMER
    )
    business_division = models.CharField(
        max_length=30,
        choices=BusinessDivision.choices,
        default=BusinessDivision.GENERAL,
        blank=True,
        null=True
    )
    phone = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def is_super_admin(self):
        return self.role == UserRole.SUPER_ADMIN or self.is_superuser

    def can_access_division(self, division_code):
        if self.is_super_admin():
            return True
        mapping = {
            'insurance': [UserRole.INSURANCE_ADMIN, UserRole.INSURANCE_AGENT],
            'nutrition': [UserRole.NUTRITION_ADMIN, UserRole.NUTRITION_REP],
            'kangen': [UserRole.KANGEN_ADMIN, UserRole.KANGEN_REP],
            'solar': [UserRole.SOLAR_ADMIN, UserRole.SOLAR_SALES, UserRole.SOLAR_INSTALLER],
        }
        allowed = mapping.get(division_code, [])
        return self.role in allowed

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class LeadStatus(models.TextChoices):
    NEW = 'new', 'New Lead'
    CONTACTED = 'contacted', 'Contacted'
    FOLLOW_UP = 'follow_up', 'Follow-up'
    QUALIFIED = 'qualified', 'Qualified'
    PROPOSAL_SENT = 'proposal_sent', 'Proposal / Demo Sent'
    CONVERTED = 'converted', 'Converted'
    WON = 'won', 'Closed Won'
    CLOSED = 'closed', 'Closed'
    LOST = 'lost', 'Closed Lost'

class Lead(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    division = models.CharField(max_length=30, choices=BusinessDivision.choices)
    name = models.CharField(max_length=150)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=25)
    city = models.CharField(max_length=100, blank=True, null=True)
    service_interest = models.CharField(max_length=200, blank=True, null=True)
    status = models.CharField(max_length=30, choices=LeadStatus.choices, default=LeadStatus.NEW)
    estimated_value = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    notes = models.TextField(blank=True, null=True)
    calculator_data = models.JSONField(blank=True, null=True, help_text="Saved calculations associated with this lead")
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_leads')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.division}] {self.name} - {self.phone} ({self.status})"


class Customer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    division = models.CharField(max_length=30, choices=BusinessDivision.choices)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='customer_profiles')
    name = models.CharField(max_length=150)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=25)
    address = models.TextField(blank=True, null=True)
    total_purchases = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    policy_or_system_details = models.TextField(blank=True, null=True, help_text="e.g. Policy #, Machine Serial #, Solar 5kW rooftop")
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.division}"


class AppointmentStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    CONFIRMED = 'confirmed', 'Confirmed'
    SCHEDULED = 'scheduled', 'Scheduled'
    COMPLETED = 'completed', 'Completed'
    CANCELLED = 'cancelled', 'Cancelled'
    RESCHEDULED = 'rescheduled', 'Rescheduled'

class AppointmentMode(models.TextChoices):
    IN_PERSON = 'in_person', 'In-Person / Home Visit'
    ONLINE = 'online', 'Video Conference'
    PHONE = 'phone', 'Phone Consultation'

class Appointment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    division = models.CharField(max_length=30, choices=BusinessDivision.choices)
    customer_name = models.CharField(max_length=150)
    customer_phone = models.CharField(max_length=25)
    customer_email = models.EmailField(blank=True, null=True)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    service_type = models.CharField(max_length=200, help_text="e.g. Tata AIA HLV Consultation, Herbalife Wellness Evaluation, Kangen Live Demo, Solar Rooftop Site Survey")
    mode = models.CharField(max_length=30, choices=AppointmentMode.choices, default=AppointmentMode.IN_PERSON)
    status = models.CharField(max_length=30, choices=AppointmentStatus.choices, default=AppointmentStatus.SCHEDULED)
    location_or_link = models.CharField(max_length=255, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_appointments')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['appointment_date', 'appointment_time']

    def __str__(self):
        return f"[{self.division}] {self.customer_name} on {self.appointment_date} at {self.appointment_time}"


class FollowUpStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    DONE = 'done', 'Done'
    OVERDUE = 'overdue', 'Overdue'

class FollowUp(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    division = models.CharField(max_length=30, choices=BusinessDivision.choices)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, null=True, blank=True, related_name='followups')
    appointment = models.ForeignKey(Appointment, on_delete=models.SET_NULL, null=True, blank=True, related_name='followups')
    title = models.CharField(max_length=200)
    due_date = models.DateField()
    priority = models.CharField(max_length=20, default='medium', choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')])
    status = models.CharField(max_length=20, choices=FollowUpStatus.choices, default=FollowUpStatus.PENDING)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['due_date']

    def __str__(self):
        return f"Follow up: {self.title} ({self.status}) due {self.due_date}"


class CalculationRecord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    division = models.CharField(max_length=30, choices=BusinessDivision.choices)
    calculator_name = models.CharField(max_length=100) # e.g. 'hlv_insurance', 'premium_estimator', 'bmi_nutrition', 'calorie_bmr', 'water_intake', 'kangen_savings', 'solar_savings'
    user_name = models.CharField(max_length=150, blank=True, null=True)
    user_phone = models.CharField(max_length=25, blank=True, null=True)
    user_email = models.EmailField(blank=True, null=True)
    input_data = models.JSONField(default=dict)
    result_data = models.JSONField(default=dict)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.calculator_name} by {self.user_name or 'Visitor'} on {self.created_at.strftime('%Y-%m-%d')}"


class BlogPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    division = models.CharField(max_length=30, choices=BusinessDivision.choices)
    category = models.CharField(max_length=80)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)
    excerpt = models.TextField()
    content = models.TextField()
    cover_image = models.CharField(max_length=500, blank=True, null=True)
    author_name = models.CharField(max_length=100, default='VentureQuad Editorial')
    read_time = models.CharField(max_length=30, default='4 min read')
    is_published = models.BooleanField(default=True)
    views_count = models.PositiveIntegerField(default=0)
    tags = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.division}] {self.title}"
