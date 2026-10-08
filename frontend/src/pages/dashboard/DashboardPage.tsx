import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageMeta } from '../../components/common/PageMeta';
import { DashboardLayout } from './DashboardLayout';
import { 
  OverviewView, 
  LeadsView, 
  CustomersView, 
  AppointmentsView, 
  CalculationsView, 
  BlogsManagementView 
} from './DashboardViews';
import { Lead, Appointment, CalculationRecord, BlogPost, DashboardStats } from '../../types';
import { api } from '../../services/api';

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Role division default mapping
  const getDefaultDivision = () => {
    if (!user) return 'all';
    switch (user.role) {
      case 'insurance_admin': return 'insurance';
      case 'nutrition_admin': return 'nutrition';
      case 'kangen_admin': return 'kangen';
      case 'solar_admin': return 'solar';
      default: return 'all';
    }
  };

  const [activeDivision, setActiveDivision] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<string>('overview');

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [calculations, setCalculations] = useState<CalculationRecord[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (user) {
      setActiveDivision(getDefaultDivision());
    }
  }, [user]);

  const loadData = async () => {
    setDataLoading(true);
    try {
      const [statsData, leadsData, custsData, apptsData, calcsData, blogsData] = await Promise.all([
        api.getDashboardStats(activeDivision),
        api.getLeeds(activeDivision),
        api.getCustomers(activeDivision),
        api.getAppointments(activeDivision),
        api.getCalculations(activeDivision),
        api.getBlogs(activeDivision),
      ]);
      setStats(statsData);
      setLeads(leadsData);
      setCustomers(custsData);
      setAppointments(apptsData);
      setCalculations(calcsData);
      setBlogs(blogsData);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
      showToast('Error syncing with live database', 'error');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [activeDivision, isAuthenticated]);

  const handleUpdateLeadStatus = async (id: string, status: Lead['status']) => {
    const leadObj = leads.find(l => l.id === id);
    // Optimistic UI state update
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));

    try {
      if (status === 'converted') {
        await api.convertLead(id);
        if (leadObj) {
          const newCust = {
            id: 'cust-' + Date.now(),
            division: leadObj.division,
            name: leadObj.name,
            phone: leadObj.phone,
            email: leadObj.email,
            city: leadObj.city || 'Hyderabad',
            total_purchases: leadObj.estimated_value || 0,
            policy_or_system_details: leadObj.service_interest || `Active ${leadObj.division} portfolio`,
            assigned_representative: leadObj.assigned_to_name || 'Senior Specialist',
            services: [leadObj.service_interest || 'Primary Onboarding'],
            notes: `Converted from lead. ${leadObj.notes || ''}`,
            created_at: new Date().toISOString(),
          };
          setCustomers(prev => [newCust, ...prev]);
        }
        showToast(`Lead "${leadObj?.name || 'Client'}" successfully converted to Active Customer!`, 'success');
      } else {
        await api.updateLeadStatus(id, status);
        showToast(`Lead status updated to ${status.replace('_', ' ').toUpperCase()}`, 'info');
      }

      // Refresh live dashboard stats
      const newStats = await api.getDashboardStats(activeDivision);
      setStats(newStats);
    } catch (e) {
      console.error(e);
      showToast('Lead status updated in current session', 'info');
    }
  };

  const handleUpdateApptStatus = async (id: string, status: Appointment['status']) => {
    const apptObj = appointments.find(a => a.id === id);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));

    try {
      await api.updateAppointmentStatus(id, status);
      showToast(`Appointment with ${apptObj?.customer_name || 'Client'} marked as ${status.toUpperCase()}`, 'info');
    } catch (e) {
      console.error(e);
      showToast('Appointment updated in current session', 'info');
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-300">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Enterprise CRM & Business Dashboard" description="QuadraBiz Executive multi-business operations console." />
      <DashboardLayout
        activeDivision={activeDivision}
        setActiveDivision={setActiveDivision}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      >
      {/* Dynamic Section rendering */}
      {activeSection === 'overview' && (
        <OverviewView 
          stats={stats}
          activeDivision={activeDivision}
          onSelectLead={(lead) => setActiveSection('leads')}
          onSelectAppt={(appt) => setActiveSection('appointments')}
        />
      )}

      {activeSection === 'leads' && (
        <LeadsView 
          leads={leads}
          onUpdateStatus={handleUpdateLeadStatus}
          onRefresh={loadData}
        />
      )}

      {activeSection === 'customers' && (
        <CustomersView 
          customers={customers}
          activeDivision={activeDivision}
          onRefresh={loadData}
        />
      )}

      {activeSection === 'appointments' && (
        <AppointmentsView 
          appointments={appointments}
          onUpdateStatus={handleUpdateApptStatus}
          onRefresh={loadData}
        />
      )}

      {activeSection === 'calculations' && (
        <CalculationsView calculations={calculations} />
      )}

      {activeSection === 'blogs' && (
        <BlogsManagementView blogs={blogs} onRefresh={loadData} />
      )}

      {activeSection === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900">Performance Reports & Export</h2>
          <p className="text-xs text-slate-500">Consolidated analytics reports across all business divisions</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-xs font-bold text-blue-900">Total Leads In Pipeline</span>
              <div className="text-3xl font-black text-blue-950 mt-1">{leads.length}</div>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-900">Closed Won Deals</span>
              <div className="text-3xl font-black text-emerald-950 mt-1">
                {leads.filter(l => l.status === 'won').length}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-900">Completed Calculations</span>
              <div className="text-3xl font-black text-amber-950 mt-1">{calculations.length}</div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 max-w-2xl">
          <h2 className="text-xl font-extrabold text-slate-900">Division Settings</h2>
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold block mb-1">Company / Division Name</label>
              <input type="text" readOnly value="Suresh Pepakayala Enterprises" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
            </div>
            <div>
              <label className="font-bold block mb-1">Assigned Administrator Email</label>
              <input type="text" readOnly value={user.email} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
            </div>
            <div>
              <label className="font-bold block mb-1">Active User Role</label>
              <input type="text" readOnly value={user.role} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl uppercase font-bold text-blue-600" />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
    </>
  );
};
