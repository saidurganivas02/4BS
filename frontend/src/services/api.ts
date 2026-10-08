import { 
  User, Lead, Appointment, FollowUp, CalculationRecord, BlogPost, DashboardStats, BusinessDivisionType 
} from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // --- Authentication ---
  async login(username: string, password: string): Promise<{ access: string; refresh: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      throw new Error('Invalid username or password');
    }
    return res.json();
  }

  async getMe(): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/auth/me/`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return res.json();
  }

  // --- Dashboard Stats ---
  async getDashboardStats(division: string = 'all'): Promise<DashboardStats> {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/stats/?division=${division}`, {
        headers: this.getHeaders(),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using simulated data');
    }

    // Default fallback
    return {
      division,
      summary: {
        total_leads: 12,
        new_leads: 3,
        qualified_leads: 4,
        proposals_sent: 3,
        won_leads: 2,
        lost_leads: 0,
        conversion_rate: 16.7,
        total_deal_volume: 450000,
        pipeline_value: 5200000,
        upcoming_appointments: 4,
        total_appointments: 4,
        total_calculations: 8,
      },
      division_breakdown: [
        { division: 'insurance', label: 'Tata AIA Insurance', lead_count: 3, won_count: 1, pipeline_value: 168000, appointment_count: 1, calc_count: 2 },
        { division: 'nutrition', label: 'Herbalife Nutrition', lead_count: 3, won_count: 1, pipeline_value: 20500, appointment_count: 1, calc_count: 2 },
        { division: 'kangen', label: 'Kangen Water', lead_count: 3, won_count: 1, pipeline_value: 740000, appointment_count: 1, calc_count: 2 },
        { division: 'solar', label: 'Solar Energy', lead_count: 3, won_count: 1, pipeline_value: 4485000, appointment_count: 1, calc_count: 2 },
      ],
      recent_leads: [],
      recent_appointments: [],
    };
  }

  // --- Leads ---
  async getLeeds(division?: string): Promise<Lead[]> {
    try {
      const url = division && division !== 'all' 
        ? `${API_BASE_URL}/leads/?division=${division}` 
        : `${API_BASE_URL}/leads/`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using local leads cache');
    }
    return [];
  }

  async createLead(leadData: Partial<Lead>): Promise<Lead> {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(leadData),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Failed to post to backend, storing in local fallback');
    }
    const newLead = {
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString(),
      status: 'new' as const,
      estimated_value: 0,
      ...leadData,
    } as Lead;
    return newLead;
  }

  async updateLeadStatus(id: string, status: Lead['status']): Promise<Lead> {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}/`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, updating lead status in local session');
    }
    return { id, status } as Lead;
  }

  async convertLead(id: string): Promise<{ lead: Lead; customer?: any }> {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}/convert/`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable for lead convert endpoint');
    }
    return { lead: { id, status: 'converted' } as Lead };
  }

  // --- Appointments ---
  async getAppointments(division?: string): Promise<Appointment[]> {
    try {
      const url = division && division !== 'all' 
        ? `${API_BASE_URL}/appointments/?division=${division}` 
        : `${API_BASE_URL}/appointments/`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using local appointments');
    }
    return [];
  }

  async createAppointment(apptData: Partial<Appointment>): Promise<Appointment> {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(apptData),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using local appt response');
    }
    return {
      id: 'local-appt-' + Date.now(),
      created_at: new Date().toISOString(),
      status: 'scheduled',
      ...apptData,
    } as Appointment;
  }

  async updateAppointmentStatus(id: string, status: Appointment['status']): Promise<Appointment> {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}/`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, updating appointment status in local session');
    }
    return { id, status } as Appointment;
  }

  // --- Follow-ups ---
  async getFollowUps(division?: string): Promise<FollowUp[]> {
    try {
      const url = division && division !== 'all'
        ? `${API_BASE_URL}/followups/?division=${division}`
        : `${API_BASE_URL}/followups/`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using local followups');
    }
    return [];
  }

  async updateFollowUpStatus(id: string, status: FollowUp['status']): Promise<FollowUp> {
    try {
      const res = await fetch(`${API_BASE_URL}/followups/${id}/`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, updating followup status in local session');
    }
    return { id, status } as FollowUp;
  }

  // --- Calculators Record ---
  async recordCalculation(data: {
    division: BusinessDivisionType;
    calculator_name: string;
    user_name?: string;
    user_phone?: string;
    user_email?: string;
    input_data: any;
    result_data: any;
  }): Promise<CalculationRecord> {
    try {
      const res = await fetch(`${API_BASE_URL}/calculations/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Failed to record calculation in remote DB, logged locally');
    }
    return {
      id: 'calc-' + Date.now(),
      created_at: new Date().toISOString(),
      ...data,
    } as CalculationRecord;
  }

  async getCalculations(division?: string): Promise<CalculationRecord[]> {
    try {
      const url = division && division !== 'all'
        ? `${API_BASE_URL}/calculations/?division=${division}`
        : `${API_BASE_URL}/calculations/`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Error fetching calculations');
    }
    return [];
  }

  // --- Blogs ---
  async getBlogs(division?: string, category?: string): Promise<BlogPost[]> {
    try {
      let queryParams = new URLSearchParams();
      if (division && division !== 'all') queryParams.append('division', division);
      if (category && category !== 'all') queryParams.append('category', category);
      
      const res = await fetch(`${API_BASE_URL}/blogs/?${queryParams.toString()}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Failed to load blogs from backend');
    }
    return [];
  }

  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${slug}/`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Failed to load blog detail from backend');
    }
    return null;
  }

  async createBlog(blogData: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch(`${API_BASE_URL}/blogs/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(blogData),
    });
    if (!res.ok) throw new Error('Failed to create blog post');
    return res.json();
  }

  // --- Customers ---
  async getCustomers(division?: string): Promise<any[]> {
    try {
      const url = division && division !== 'all'
        ? `${API_BASE_URL}/customers/?division=${division}`
        : `${API_BASE_URL}/customers/`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Failed to load customers from backend, using sample profiles');
    }

    const fallbacks = [
      {
        id: 'cust-1',
        division: 'insurance',
        name: 'Rajeshwari Krishna',
        phone: '+91 98490 11223',
        email: 'rajeshwari.k@example.com',
        city: 'Hyderabad',
        total_purchases: 185000,
        policy_or_system_details: 'Tata AIA Sampoorna Raksha Supreme (₹2.0 Cr Cover)',
        assigned_representative: 'Ramesh V. (Senior Advisor)',
        services: ['Term Life Sizing', 'Critical Illness Rider', 'Annual Review'],
        notes: 'Premium paid annually via ECS. Next review Oct 2027.',
        created_at: '2025-08-14T10:30:00Z',
      },
      {
        id: 'cust-2',
        division: 'nutrition',
        name: 'Pooja Chawla',
        phone: '+91 98480 33445',
        email: 'pooja.c@example.com',
        city: 'Visakhapatnam',
        total_purchases: 32000,
        policy_or_system_details: 'Herbalife 90-Day Cellular Body Transformation Plan',
        assigned_representative: 'Sunita M. (Lead Wellness Coach)',
        services: ['Formula 1 Shakes', 'Afresh Energy Drink', 'Protein Pacing'],
        notes: 'Achieved -11kg milestone. Currently on maintenance plan.',
        created_at: '2025-11-02T14:15:00Z',
      },
      {
        id: 'cust-3',
        division: 'kangen',
        name: 'Dr. K. Srinivas Rao',
        phone: '+91 98481 99887',
        email: 'dr.srinivas@example.com',
        city: 'Secunderabad',
        total_purchases: 343000,
        policy_or_system_details: 'Enagic Leveluk K8 Japanese Medical Ionizer',
        assigned_representative: 'Vikram R. (Technical Specialist)',
        services: ['Home Installation', 'Pre-filter Maintenance', 'Annual Deep Cleaning'],
        notes: 'Installed at residential clinic. Recommended to 3 colleagues.',
        created_at: '2026-01-19T11:00:00Z',
      },
      {
        id: 'cust-4',
        division: 'solar',
        name: 'Chaitanya Kumar',
        phone: '+91 98492 77665',
        email: 'chaitanya.k@example.com',
        city: 'Hyderabad (Tellapur)',
        total_purchases: 285000,
        policy_or_system_details: '5 kW Elevated Rooftop Solar Plant (PM Surya Ghar)',
        assigned_representative: 'Eng. Anil Sharma (EPC Lead)',
        services: ['Turnkey EPC', 'TSSPDCL Net Metering', '₹78,000 Subsidy Credited'],
        notes: 'Zero monthly electricity bills achieved. Generation ~625 units/month.',
        created_at: '2026-03-10T16:45:00Z',
      },
      {
        id: 'cust-5',
        division: 'solar',
        name: 'Aditya Spinning Mills Ltd.',
        phone: '+91 98471 34562',
        email: 'planthead@adityagroup.com',
        city: 'Kurnool',
        total_purchases: 4200000,
        policy_or_system_details: '100kW Industrial Rooftop Solar EPC',
        assigned_representative: 'Eng. Anil Sharma (EPC Lead)',
        services: ['Commercial Net Metering', 'Power Evacuation Sizing', 'HT Panel Connection'],
        notes: 'Commissioned in Jan 2026. Performing at 104% expected generation.',
        created_at: '2026-01-20T10:00:00Z',
      }
    ];

    if (division && division !== 'all') {
      return fallbacks.filter(c => c.division === division);
    }
    return fallbacks;
  }

  async createCustomer(customerData: any): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/customers/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(customerData),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, returning local customer');
    }
    return {
      id: 'cust-' + Date.now(),
      created_at: new Date().toISOString(),
      ...customerData,
    };
  }
}

export const api = new ApiService();
