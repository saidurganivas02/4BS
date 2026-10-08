import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  Calculator, 
  FileText, 
  BarChart3, 
  Settings, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Download, 
  Filter,
  ShieldCheck,
  Droplets,
  SunMedium,
  Send,
  Eye,
  Trash2,
  Edit2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie 
} from 'recharts';
import { Lead, Appointment, FollowUp, CalculationRecord, BlogPost, DashboardStats, BusinessDivisionType } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

// ----------------------------------------------------
// 1. OVERVIEW & ANALYTICS VIEW
// ----------------------------------------------------
export const OverviewView: React.FC<{
  stats: DashboardStats | null;
  activeDivision: string;
  onSelectLead: (lead: Lead) => void;
  onSelectAppt: (appt: Appointment) => void;
}> = ({ stats, activeDivision, onSelectLead, onSelectAppt }) => {
  const summary = stats?.summary || {
    total_leads: 12,
    won_leads: 3,
    proposals_sent: 4,
    conversion_rate: 25.0,
    total_deal_volume: 450000,
    upcoming_appointments: 4,
    total_calculations: 8,
  };

  const chartData = stats?.division_breakdown || [
    { label: 'Tata AIA', lead_count: 3, pipeline_value: 168000 },
    { label: 'Herbalife', lead_count: 3, pipeline_value: 20500 },
    { label: 'Kangen Water', lead_count: 3, pipeline_value: 740000 },
    { label: 'Solar EPC', lead_count: 3, pipeline_value: 4485000 },
  ];

  const COLORS = ['#0a369d', '#16a34a', '#0284c7', '#ea580c'];

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total Active Leads</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{summary.total_leads}</div>
          <p className="text-[11px] text-emerald-600 font-bold">
            {summary.conversion_rate}% Conversion Rate
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Closed Won Revenue</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            ₹{summary.total_deal_volume.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            From {summary.won_leads} closed business deals
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Upcoming Appointments</span>
            <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{summary.upcoming_appointments}</div>
          <p className="text-[11px] text-cyan-600 font-medium">
            Home visits, demos & video calls
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Calculations Completed</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Calculator className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{summary.total_calculations}</div>
          <p className="text-[11px] text-amber-600 font-medium">
            HLV, BMI, Water & Solar estimates
          </p>
        </div>

      </div>

      {/* Visual Charts & Breakdown */}
      {activeDivision === 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Business Division Lead & Deal Distribution
                </h3>
                <p className="text-xs text-slate-500">Pipeline volume across our 4 divisions</p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="lead_count" name="Leads" radius={[8, 8, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Division Status</h3>
              <p className="text-xs text-slate-500 mb-4">Quick overview of each business pillar</p>

              <div className="space-y-3">
                {stats?.division_breakdown.map((div, i) => (
                  <div key={div.division} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <strong className="block text-slate-900 font-bold">{div.label}</strong>
                      <span className="text-[11px] text-slate-500">{div.lead_count} leads • {div.won_count} won</span>
                    </div>
                    <span className="font-extrabold text-slate-900">
                      ₹{(div.pipeline_value / 100000).toFixed(1)}L
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Leads and Appointments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Leads */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">Recent Inquiries & Leads</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {stats?.recent_leads.map((l) => (
              <div 
                key={l.id} 
                onClick={() => onSelectLead(l)}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition cursor-pointer text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{l.name}</div>
                  <div className="text-slate-500 text-[11px] truncate max-w-xs">{l.service_interest}</div>
                  <span className="text-[10px] text-slate-400 capitalize">{l.division} • {l.phone}</span>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    l.status === 'won' ? 'bg-emerald-100 text-emerald-800' :
                    l.status === 'qualified' ? 'bg-blue-100 text-blue-800' :
                    l.status === 'proposal_sent' ? 'bg-purple-100 text-purple-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {l.status.replace('_', ' ')}
                  </span>
                  {Number(l.estimated_value) > 0 && (
                    <div className="text-[11px] font-bold text-slate-900 mt-1">
                      ₹{Number(l.estimated_value).toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">Scheduled Consultations</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer">Calendar</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {stats?.recent_appointments.map((a) => (
              <div 
                key={a.id} 
                onClick={() => onSelectAppt(a)}
                className="py-3 hover:bg-slate-50 px-2 rounded-xl transition cursor-pointer text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{a.customer_name}</span>
                  <span className="text-[10px] font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">
                    {a.appointment_date} @ {a.appointment_time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{a.service_type}</p>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="capitalize">{a.mode.replace('_', ' ')}</span>
                  <span>{a.customer_phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. LEADS MANAGEMENT VIEW
// ----------------------------------------------------
export const LeadsView: React.FC<{
  leads: Lead[];
  onUpdateStatus: (id: string, status: Lead['status']) => void;
  onRefresh: () => void;
}> = ({ leads, onUpdateStatus, onRefresh }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = leads.filter((l) => {
    const matchStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchSearch = searchTerm === '' || 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.service_interest && l.service_interest.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const exportCsv = () => {
    const headers = ['ID', 'Division', 'Name', 'Phone', 'Email', 'City', 'Interest', 'Status', 'Estimated Value', 'Created At'];
    const rows = filtered.map(l => [
      l.id, l.division, `"${l.name}"`, l.phone, l.email || '', l.city || '', `"${l.service_interest || ''}"`, l.status, l.estimated_value, l.created_at
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Leads & Customer Inquiries</h2>
          <p className="text-xs text-slate-500">Track and advance opportunities across all four divisions</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input 
            type="text" 
            placeholder="Search leads by name, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'new', label: 'New' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'qualified', label: 'Qualified' },
            { id: 'proposal_sent', label: 'Proposal Sent' },
            { id: 'won', label: 'Won' },
            { id: 'lost', label: 'Lost' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                filterStatus === st.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Lead / Client</th>
              <th className="py-3 px-3">Division</th>
              <th className="py-3 px-3">Service Interest</th>
              <th className="py-3 px-3">Value (₹)</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 transition">
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-900">{lead.name}</div>
                  <div className="text-[11px] text-slate-500">{lead.phone} • {lead.city || 'Hyderabad'}</div>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    lead.division === 'insurance' ? 'bg-blue-50 text-blue-700' :
                    lead.division === 'nutrition' ? 'bg-emerald-50 text-emerald-700' :
                    lead.division === 'kangen' ? 'bg-cyan-50 text-cyan-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {lead.division}
                  </span>
                </td>
                <td className="py-3 px-3 max-w-xs truncate text-slate-700">
                  {lead.service_interest || 'General Consultation'}
                </td>
                <td className="py-3 px-3 font-bold text-slate-900">
                  ₹{Number(lead.estimated_value).toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-3">
                  <select
                    value={lead.status}
                    onChange={(e) => onUpdateStatus(lead.id, e.target.value as any)}
                    className="px-2 py-1 border border-slate-200 rounded-lg text-xs font-semibold bg-white cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow_up">Follow-up</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Closed Won</option>
                    <option value="lost">Closed Lost</option>
                  </select>
                </td>
                <td className="py-3 px-3 flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="View Details & Calculations"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onUpdateStatus(lead.id, 'converted')}
                    className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-bold text-[10px] transition"
                    title="Convert to Customer"
                  >
                    Convert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No leads found for this filter.
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Lead Details</span>
                <h3 className="text-lg font-black text-slate-900">{selectedLead.name}</h3>
                <p className="text-xs text-slate-500">{selectedLead.phone} • {selectedLead.email || 'No email'}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div><strong>Division:</strong> {selectedLead.division}</div>
              <div><strong>Service Interest:</strong> {selectedLead.service_interest}</div>
              <div><strong>Estimated Value:</strong> ₹{Number(selectedLead.estimated_value).toLocaleString('en-IN')}</div>
              <div><strong>Notes:</strong> {selectedLead.notes || 'None'}</div>
              {selectedLead.calculator_data && (
                <div className="pt-2 border-t border-slate-200">
                  <strong className="block mb-1">Attached Calculator Data:</strong>
                  <pre className="p-2 bg-slate-900 text-amber-300 rounded text-[10px] overflow-x-auto">
                    {JSON.stringify(selectedLead.calculator_data, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedLead(null)}
              className="w-full py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 3. APPOINTMENTS & DEMOS VIEW
// ----------------------------------------------------
export const AppointmentsView: React.FC<{
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: Appointment['status']) => void;
  onRefresh: () => void;
}> = ({ appointments, onUpdateStatus, onRefresh }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppt, setNewAppt] = useState({
    division: 'insurance' as BusinessDivisionType,
    customer_name: '',
    customer_phone: '',
    appointment_date: new Date().toISOString().split('T')[0],
    appointment_time: '11:00',
    service_type: '',
    mode: 'in_person' as const,
    location_or_link: '',
  });

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAppointment(newAppt);
      setShowAddModal(false);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Appointments & Demos Schedule</h2>
          <p className="text-xs text-slate-500">Manage client meetings, live Kangen tastings, and solar rooftop surveys</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Slot</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appt) => (
          <div key={appt.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-blue-100 text-blue-800">
                  {appt.division}
                </span>
                <select
                  value={appt.status}
                  onChange={(e) => onUpdateStatus(appt.id, e.target.value as any)}
                  className="text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300 bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="rescheduled">Rescheduled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <h4 className="font-extrabold text-slate-900 text-sm mt-2">{appt.customer_name}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{appt.service_type}</p>

              <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{appt.appointment_date} at {appt.appointment_time}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Phone: <strong>{appt.customer_phone}</strong>
                </div>
                {appt.location_or_link && (
                  <div className="text-[11px] text-slate-500 truncate">
                    Venue: {appt.location_or_link}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to book appointment */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Schedule New Appointment</h3>
            <form onSubmit={handleAddAppointment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Division</label>
                <select
                  value={newAppt.division}
                  onChange={(e) => setNewAppt({ ...newAppt, division: e.target.value as any })}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                >
                  <option value="insurance">Tata AIA Insurance</option>
                  <option value="nutrition">Herbalife Nutrition</option>
                  <option value="kangen">Kangen Water Demo</option>
                  <option value="solar">Solar Rooftop Survey</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Client Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ramesh Verma"
                  value={newAppt.customer_name}
                  onChange={(e) => setNewAppt({ ...newAppt, customer_name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Client Phone</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 98480 12345"
                  value={newAppt.customer_phone}
                  onChange={(e) => setNewAppt({ ...newAppt, customer_phone: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={newAppt.appointment_date}
                    onChange={(e) => setNewAppt({ ...newAppt, appointment_date: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Time</label>
                  <input 
                    type="time" 
                    required
                    value={newAppt.appointment_time}
                    onChange={(e) => setNewAppt({ ...newAppt, appointment_time: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Service / Agenda</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. HLV Proposal / Live Ionizer Demo"
                  value={newAppt.service_type}
                  onChange={(e) => setNewAppt({ ...newAppt, service_type: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white font-bold rounded-xl"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 4. CALCULATIONS HISTORY VIEW
// ----------------------------------------------------
export const CalculationsView: React.FC<{
  calculations: CalculationRecord[];
}> = ({ calculations }) => {
  const [selectedCalc, setSelectedCalc] = useState<CalculationRecord | null>(null);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Calculations & Quote History</h2>
        <p className="text-xs text-slate-500">Live submissions recorded from visitors using website estimators</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Division</th>
              <th className="py-3 px-3">Calculator</th>
              <th className="py-3 px-3">Visitor Name</th>
              <th className="py-3 px-3">Phone</th>
              <th className="py-3 px-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {calculations.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-3 px-3 text-slate-400">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-3 capitalize font-bold">{c.division}</td>
                <td className="py-3 px-3 font-semibold text-slate-800">{c.calculator_name}</td>
                <td className="py-3 px-3">{c.user_name || 'Anonymous Visitor'}</td>
                <td className="py-3 px-3 font-mono">{c.user_phone || '—'}</td>
                <td className="py-3 px-3">
                  <button
                    onClick={() => setSelectedCalc(c)}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    View Inputs & Result
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCalc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-slate-900">{selectedCalc.calculator_name} Record</h3>
            <div className="space-y-3 text-xs">
              <div>
                <strong className="block text-slate-600 mb-1">Inputs:</strong>
                <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl text-[11px] overflow-x-auto">
                  {JSON.stringify(selectedCalc.input_data, null, 2)}
                </pre>
              </div>
              <div>
                <strong className="block text-slate-600 mb-1">Calculated Results:</strong>
                <pre className="p-3 bg-slate-900 text-amber-300 rounded-xl text-[11px] overflow-x-auto">
                  {JSON.stringify(selectedCalc.result_data, null, 2)}
                </pre>
              </div>
            </div>
            <button
              onClick={() => setSelectedCalc(null)}
              className="w-full py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 5. BLOG POSTS MANAGEMENT VIEW
// ----------------------------------------------------
export const BlogsManagementView: React.FC<{
  blogs: BlogPost[];
  onRefresh: () => void;
}> = ({ blogs, onRefresh }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    division: 'insurance' as BusinessDivisionType,
    category: 'Insurance',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    read_time: '5 min read',
    tags: '',
  });

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createBlog({
        ...newBlog,
        slug: newBlog.slug || newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        is_published: true,
      });
      setShowCreateModal(false);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Blog Posts & Editorial Management</h2>
          <p className="text-xs text-slate-500">Publish articles across Insurance, Nutrition, Kangen, and Solar</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {blogs.map((b) => (
          <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-slate-100 text-slate-700">
                  {b.division}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400">{b.category}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{b.title}</h4>
              <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">{b.excerpt}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-slate-400">{b.views_count} views</span>
              <a
                href={`/blog/${b.slug}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
              >
                Preview Live
              </a>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900">Create New Division Blog</h3>
            <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Division</label>
                  <select
                    value={newBlog.division}
                    onChange={(e) => {
                      const div = e.target.value as any;
                      const catMap: Record<string, string> = {
                        insurance: 'Insurance',
                        nutrition: 'Nutrition',
                        kangen: 'Kangen Water',
                        solar: 'Solar',
                        general: 'General',
                      };
                      setNewBlog({ ...newBlog, division: div, category: catMap[div] || 'General' });
                    }}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  >
                    <option value="insurance">Tata AIA Insurance</option>
                    <option value="nutrition">Herbalife Nutrition</option>
                    <option value="kangen">Kangen Water</option>
                    <option value="solar">Solar Energy</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Estimated Read Time</label>
                  <input 
                    type="text" 
                    value={newBlog.read_time}
                    onChange={(e) => setNewBlog({ ...newBlog, read_time: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Article Headline *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 5 Mistakes While Buying Term Insurance in India"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Summary / Excerpt *</label>
                <textarea 
                  rows={2}
                  required
                  placeholder="Brief summary for preview cards..."
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Full Article Markdown Content *</label>
                <textarea 
                  rows={6}
                  required
                  placeholder="Full markdown content..."
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 text-white font-bold rounded-xl"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 6. CUSTOMER MANAGEMENT VIEW
// ----------------------------------------------------
export const CustomersView: React.FC<{
  customers: any[];
  activeDivision: string;
  onRefresh: () => void;
}> = ({ customers, activeDivision, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCust, setSelectedCust] = useState<any | null>(null);

  const filtered = customers.filter((c) => {
    const matchDiv = activeDivision === 'all' || c.division === activeDivision;
    const matchSearch = searchTerm === '' ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.policy_or_system_details && c.policy_or_system_details.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchDiv && matchSearch;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Verified Customer Profiles</h2>
          <p className="text-xs text-slate-500">Manage client accounts, active policies, equipment installations, and relationship history</p>
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Active Accounts: <strong>{filtered.length}</strong>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by customer name, phone, policy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Division</th>
              <th className="py-3 px-3">Policy / System Enrolled</th>
              <th className="py-3 px-3">Assigned Advisor</th>
              <th className="py-3 px-3">Lifetime Value</th>
              <th className="py-3 px-3">Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-50 transition">
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-900">{cust.name}</div>
                  <div className="text-[11px] text-slate-500">{cust.phone} • {cust.city || 'Hyderabad'}</div>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    cust.division === 'insurance' ? 'bg-blue-50 text-blue-700' :
                    cust.division === 'nutrition' ? 'bg-emerald-50 text-emerald-700' :
                    cust.division === 'kangen' ? 'bg-cyan-50 text-cyan-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {cust.division}
                  </span>
                </td>
                <td className="py-3 px-3 max-w-xs font-semibold text-slate-800">
                  {cust.policy_or_system_details || 'Active Account'}
                </td>
                <td className="py-3 px-3 text-slate-600">
                  {cust.assigned_representative || 'Senior Specialist'}
                </td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">
                  ₹{Number(cust.total_purchases).toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-3">
                  <button
                    onClick={() => setSelectedCust(cust)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-[11px] transition flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No customer profiles match your search criteria.
          </div>
        )}
      </div>

      {/* Customer Profile Modal */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 text-slate-800">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                  Customer Master Profile
                </span>
                <h3 className="text-xl font-black text-slate-900">{selectedCust.name}</h3>
                <p className="text-xs text-slate-500">{selectedCust.phone} • {selectedCust.email}</p>
              </div>
              <button 
                onClick={() => setSelectedCust(null)} 
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Division</span>
                <strong className="capitalize text-slate-900 block">{selectedCust.division}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Assigned Representative</span>
                <strong className="text-slate-900 block">{selectedCust.assigned_representative}</strong>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">
                Policy / Equipment Record
              </span>
              <p className="font-extrabold text-blue-950 text-sm">{selectedCust.policy_or_system_details}</p>
              <div className="flex justify-between text-xs pt-1 border-t border-blue-200/50">
                <span className="text-blue-800">Lifetime Account Value:</span>
                <strong className="text-blue-950">₹{Number(selectedCust.total_purchases).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {selectedCust.services && (
              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1.5">Enrolled Services & History:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCust.services.map((srv: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold">
                      ✓ {srv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedCust.notes && (
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <strong className="text-slate-700 block text-[11px]">Representative Notes & Next Follow-Up:</strong>
                <p className="text-slate-600 leading-relaxed">{selectedCust.notes}</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCust(null)}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

