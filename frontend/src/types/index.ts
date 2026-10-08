export type BusinessDivisionType = 'insurance' | 'nutrition' | 'kangen' | 'solar' | 'general';

export type UserRoleType = 
  | 'super_admin' 
  | 'insurance_admin' 
  | 'insurance_agent'
  | 'nutrition_admin' 
  | 'nutrition_rep'
  | 'kangen_admin' 
  | 'kangen_rep'
  | 'solar_admin' 
  | 'solar_sales'
  | 'solar_installer'
  | 'customer';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRoleType;
  business_division: BusinessDivisionType;
  phone?: string;
  city?: string;
  bio?: string;
}

export interface Lead {
  id: string;
  division: BusinessDivisionType;
  name: string;
  email?: string;
  phone: string;
  city?: string;
  service_interest?: string;
  status: 'new' | 'contacted' | 'follow_up' | 'qualified' | 'proposal_sent' | 'converted' | 'won' | 'closed' | 'lost';
  estimated_value: number | string;
  notes?: string;
  calculator_data?: any;
  assigned_to?: number;
  assigned_to_name?: string;
  created_at: string;
  updated_at?: string;
}

export interface Customer {
  id: string;
  division: BusinessDivisionType;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  total_purchases: number | string;
  policy_or_system_details?: string;
  assigned_representative?: string;
  services?: string[];
  notes?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  division: BusinessDivisionType;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  mode: 'in_person' | 'online' | 'phone';
  status: 'pending' | 'confirmed' | 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  location_or_link?: string;
  notes?: string;
  assigned_to?: number;
  assigned_to_name?: string;
  created_at?: string;
}

export interface FollowUp {
  id: string;
  division: BusinessDivisionType;
  lead?: string;
  lead_name?: string;
  appointment?: string;
  title: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'done' | 'overdue';
  notes?: string;
  created_at?: string;
}

export interface CalculationRecord {
  id: string;
  division: BusinessDivisionType;
  calculator_name: string;
  user_name?: string;
  user_phone?: string;
  user_email?: string;
  input_data: any;
  result_data: any;
  created_at: string;
}

export interface BlogPost {
  id: string;
  division: BusinessDivisionType;
  category: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author_name: string;
  read_time: string;
  is_published: boolean;
  views_count: number;
  tags?: string;
  created_at: string;
  updated_at?: string;
}

export interface DashboardStats {
  division: string;
  summary: {
    total_leads: number;
    new_leads: number;
    qualified_leads: number;
    proposals_sent: number;
    won_leads: number;
    lost_leads: number;
    conversion_rate: number;
    total_deal_volume: number;
    pipeline_value: number;
    upcoming_appointments: number;
    total_appointments: number;
    total_calculations: number;
  };
  division_breakdown: Array<{
    division: BusinessDivisionType;
    label: string;
    lead_count: number;
    won_count: number;
    pipeline_value: number;
    appointment_count: number;
    calc_count: number;
  }>;
  recent_leads: Lead[];
  recent_appointments: Appointment[];
}

export interface BackendConnectionInfo {
  status: 'connected' | 'offline' | 'checking';
  health?: 'optimal' | 'degraded';
  api_version?: string;
  platform?: string;
  database?: {
    status: string;
    engine: string;
    name: string;
    record_counts?: Record<string, number>;
  };
  server_environment?: {
    python_version: string;
    django_version: string;
    time_zone: string;
    server_time: string;
  };
  diagnostics?: {
    database_latency_ms: number;
    client_ip?: string;
  };
  latency_ms?: number;
  last_checked?: string;
}
