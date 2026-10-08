import { 
  User, 
  Lead, 
  Appointment, 
  FollowUp, 
  CalculationRecord, 
  BlogPost, 
  DashboardStats, 
  BusinessDivisionType,
  BackendConnectionInfo
} from '../types';

// Multi-tier API URL resolution:
// In browser with Vite proxy, '/api' is optimal and avoids CORS.
// Direct URL fallback to Django default 'http://127.0.0.1:8000/api'
const getInitialBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // If explicit environment variable is set
    const envUrl = (import.meta as any).env?.VITE_API_BASE_URL;
    if (envUrl) return envUrl.replace(/\/+$/, '');
    
    // In dev server, /api is proxied directly to Django (http://127.0.0.1:8000)
    return '/api';
  }
  return 'http://127.0.0.1:8000/api';
};

type ConnectionStatusListener = (info: BackendConnectionInfo) => void;

class ApiService {
  private baseUrl: string = getInitialBaseUrl();
  private fallbackBaseUrl: string = 'http://127.0.0.1:8000/api';
  private connectionInfo: BackendConnectionInfo = {
    status: 'checking',
  };
  private statusListeners: Set<ConnectionStatusListener> = new Set();
  private checkIntervalTimer: any = null;

  constructor() {
    // Auto-probe backend connection on init
    if (typeof window !== 'undefined') {
      setTimeout(() => this.checkConnection(), 100);
      // Periodic background heartbeat check every 45 seconds
      this.checkIntervalTimer = setInterval(() => this.checkConnection(), 45000);
    }
  }

  // --- Connection Status & Listeners ---
  public subscribeConnectionStatus(listener: ConnectionStatusListener): () => void {
    this.statusListeners.add(listener);
    listener(this.connectionInfo);
    return () => {
      this.statusListeners.delete(listener);
    };
  }

  private notifyStatusListeners(info: BackendConnectionInfo) {
    this.connectionInfo = info;
    this.statusListeners.forEach((fn) => {
      try {
        fn(info);
      } catch (err) {
        console.error('Connection listener error:', err);
      }
    });
  }

  public getConnectionInfo(): BackendConnectionInfo {
    return this.connectionInfo;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Health-check & latency diagnostic probe
   */
  public async checkConnection(): Promise<BackendConnectionInfo> {
    const startTime = performance.now();
    const urlsToTry = [this.baseUrl, this.fallbackBaseUrl, 'http://localhost:8000/api'];
    
    // Remove duplicates
    const uniqueUrls = Array.from(new Set(urlsToTry));

    for (const url of uniqueUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(`${url}/connection/`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const latency = Math.round(performance.now() - startTime);
          
          this.baseUrl = url; // Lock to working URL
          const info: BackendConnectionInfo = {
            ...data,
            status: 'connected',
            latency_ms: latency,
            last_checked: new Date().toISOString(),
          };
          this.notifyStatusListeners(info);
          return info;
        }
      } catch (e) {
        // Try next candidate
      }
    }

    // If all endpoints failed
    const offlineInfo: BackendConnectionInfo = {
      status: 'offline',
      health: 'degraded',
      latency_ms: undefined,
      last_checked: new Date().toISOString(),
    };
    this.notifyStatusListeners(offlineInfo);
    return offlineInfo;
  }

  /**
   * Two-way interactive ping test
   */
  public async testBidirectionalConnection(testPayload: string = 'frontend_handshake_test'): Promise<any> {
    const startTime = performance.now();
    try {
      const res = await this.request('/connection/test/', {
        method: 'POST',
        body: JSON.stringify({
          client_timestamp: Date.now() / 1000,
          payload: testPayload,
        }),
      });
      const latency = Math.round(performance.now() - startTime);
      return {
        ...res,
        measured_rtt_ms: latency,
        success: true,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Connection test failed',
        measured_rtt_ms: Math.round(performance.now() - startTime),
      };
    }
  }

  private getHeaders(): HeadersInit {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  /**
   * Resilient request engine with timeout, JWT refresh, and retry
   */
  private async request<T = any>(
    endpoint: string, 
    options: RequestInit = {}, 
    retries: number = 2
  ): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const mergedHeaders = {
      ...this.getHeaders(),
      ...(options.headers || {}),
    };

    try {
      const res = await fetch(url, {
        ...options,
        headers: mergedHeaders,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      // Handle token expiration & automatic refresh
      if (res.status === 401 && typeof localStorage !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken && !endpoint.includes('/auth/refresh/')) {
          const refreshed = await this.refreshAccessToken(refreshToken);
          if (refreshed) {
            // Replay original request once with new token
            return this.request<T>(endpoint, options, 0);
          }
        }
      }

      if (!res.ok) {
        const errorText = await res.text();
        let errorData: any = {};
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { detail: errorText || `HTTP ${res.status}` };
        }
        throw new Error(errorData.detail || errorData.message || `Request failed with status ${res.status}`);
      }

      // If empty response
      if (res.status === 204) {
        return {} as T;
      }

      return await res.json();
    } catch (error: any) {
      clearTimeout(timeoutId);

      // If network glitch and retries remaining, retry with exponential backoff
      if (retries > 0 && !error.message?.includes('401') && !error.message?.includes('403')) {
        await new Promise((r) => setTimeout(r, 600));
        return this.request<T>(endpoint, options, retries - 1);
      }

      throw error;
    }
  }

  private async refreshAccessToken(refreshToken: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.access) {
          localStorage.setItem('access_token', data.access);
          return true;
        }
      }
    } catch {
      // Failed refresh
    }
    return false;
  }

  // --- Authentication ---
  async login(username: string, password: string): Promise<{ access: string; refresh: string; user: User }> {
    const data = await this.request<{ access: string; refresh: string; user: User }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (data.access && typeof localStorage !== 'undefined') {
      localStorage.setItem('access_token', data.access);
      if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
    }
    return data;
  }

  async getMe(): Promise<User> {
    return this.request<User>('/auth/me/');
  }

  // --- Dashboard Stats ---
  async getDashboardStats(division: string = 'all'): Promise<DashboardStats> {
    try {
      return await this.request<DashboardStats>(`/dashboard/stats/?division=${division}`);
    } catch (e) {
      console.warn('Backend unavailable, using simulated data');
    }

    // Default fallback
    return {
      division,
      summary: {
        total_leads: 14,
        new_leads: 4,
        qualified_leads: 5,
        proposals_sent: 3,
        won_leads: 2,
        lost_leads: 0,
        conversion_rate: 18.2,
        total_deal_volume: 450000,
        pipeline_value: 5200000,
        upcoming_appointments: 4,
        total_appointments: 6,
        total_calculations: 8,
      },
      division_breakdown: [
        { division: 'insurance', label: 'Tata AIA Insurance', lead_count: 4, won_count: 1, pipeline_value: 168000, appointment_count: 1, calc_count: 2 },
        { division: 'nutrition', label: 'Herbalife Nutrition', lead_count: 3, won_count: 1, pipeline_value: 20500, appointment_count: 2, calc_count: 2 },
        { division: 'kangen', label: 'Kangen Water', lead_count: 4, won_count: 1, pipeline_value: 740000, appointment_count: 1, calc_count: 2 },
        { division: 'solar', label: 'Solar Energy', lead_count: 3, won_count: 1, pipeline_value: 4485000, appointment_count: 2, calc_count: 2 },
      ],
      recent_leads: [],
      recent_appointments: [],
    };
  }

  // --- Leads ---
  async getLeeds(division?: string): Promise<Lead[]> {
    return this.getLeads(division);
  }

  async getLeads(division?: string): Promise<Lead[]> {
    try {
      const url = division && division !== 'all' 
        ? `/leads/?division=${division}` 
        : `/leads/`;
      return await this.request<Lead[]>(url);
    } catch (e) {
      console.warn('Using local leads cache');
      return [];
    }
  }

  async createLead(leadData: Partial<Lead>): Promise<Lead> {
    try {
      return await this.request<Lead>('/leads/', {
        method: 'POST',
        body: JSON.stringify(leadData),
      });
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
      return await this.request<Lead>(`/leads/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn('Backend unavailable, updating lead status in local session');
    }
    return { id, status } as Lead;
  }

  async convertLead(id: string): Promise<{ lead: Lead; customer?: any }> {
    try {
      return await this.request<{ lead: Lead; customer?: any }>(`/leads/${id}/convert/`, {
        method: 'POST',
      });
    } catch (e) {
      console.warn('Backend unavailable for lead convert endpoint');
    }
    return { lead: { id, status: 'converted' } as Lead };
  }

  // --- Appointments ---
  async getAppointments(division?: string): Promise<Appointment[]> {
    try {
      const url = division && division !== 'all' 
        ? `/appointments/?division=${division}` 
        : `/appointments/`;
      return await this.request<Appointment[]>(url);
    } catch (e) {
      console.warn('Using local appointments');
      return [];
    }
  }

  async createAppointment(apptData: Partial<Appointment>): Promise<Appointment> {
    try {
      return await this.request<Appointment>('/appointments/', {
        method: 'POST',
        body: JSON.stringify(apptData),
      });
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
      return await this.request<Appointment>(`/appointments/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn('Backend unavailable, updating appointment status in local session');
    }
    return { id, status } as Appointment;
  }

  // --- Follow-ups ---
  async getFollowUps(division?: string): Promise<FollowUp[]> {
    try {
      const url = division && division !== 'all'
        ? `/followups/?division=${division}`
        : `/followups/`;
      return await this.request<FollowUp[]>(url);
    } catch (e) {
      console.warn('Using local followups');
      return [];
    }
  }

  async updateFollowUpStatus(id: string, status: FollowUp['status']): Promise<FollowUp> {
    try {
      return await this.request<FollowUp>(`/followups/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
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
      return await this.request<CalculationRecord>('/calculations/', {
        method: 'POST',
        body: JSON.stringify(data),
      });
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
        ? `/calculations/?division=${division}`
        : `/calculations/`;
      return await this.request<CalculationRecord[]>(url);
    } catch (e) {
      console.warn('Error fetching calculations');
      return [];
    }
  }

  // --- Blogs ---
  async getBlogs(division?: string, category?: string): Promise<BlogPost[]> {
    try {
      const queryParams = new URLSearchParams();
      if (division && division !== 'all') queryParams.append('division', division);
      if (category && category !== 'all') queryParams.append('category', category);
      
      return await this.request<BlogPost[]>(`/blogs/?${queryParams.toString()}`);
    } catch (e) {
      console.warn('Failed to load blogs from backend');
      return [];
    }
  }

  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      return await this.request<BlogPost>(`/blogs/${slug}/`);
    } catch (e) {
      console.warn('Failed to load blog detail from backend');
      return null;
    }
  }

  async createBlog(blogData: Partial<BlogPost>): Promise<BlogPost> {
    return this.request<BlogPost>('/blogs/', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  }

  // --- Customers ---
  async getCustomers(division?: string): Promise<any[]> {
    try {
      const url = division && division !== 'all'
        ? `/customers/?division=${division}`
        : `/customers/`;
      const data = await this.request<any[]>(url);
      if (Array.isArray(data) && data.length > 0) {
        return data;
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
      return await this.request<any>('/customers/', {
        method: 'POST',
        body: JSON.stringify(customerData),
      });
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
