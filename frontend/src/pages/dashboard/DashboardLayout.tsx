import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CheckSquare, 
  Calculator, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  Bell, 
  Sparkles,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Plus
} from 'lucide-react';
import { HerbalifeLogo } from '../../components/common/HerbalifeLogo';
import { useAuth } from '../../context/AuthContext';
import { BusinessDivisionType, UserRoleType } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeDivision: string;
  setActiveDivision: (div: string) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeDivision,
  setActiveDivision,
  activeSection,
  setActiveSection,
}) => {
  const { user, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isSuperAdmin = user?.role === 'super_admin';

  const divisionsList = [
    { id: 'all', label: 'All 4 Businesses', icon: Sparkles, color: 'text-amber-400' },
    { id: 'insurance', label: 'Tata AIA Insurance', icon: ShieldCheck, color: 'text-blue-400' },
    { id: 'nutrition', label: 'Herbalife Nutrition', icon: null as any, color: 'text-emerald-400' },
    { id: 'kangen', label: 'Kangen Water', icon: Droplets, color: 'text-cyan-400' },
    { id: 'solar', label: 'Solar Energy EPC', icon: SunMedium, color: 'text-amber-400' },
  ];

  const navItems = [
    { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads Pipeline', icon: Users, badge: 'Active' },
    { id: 'customers', label: 'Customer Profiles', icon: Users, badge: 'CRM' },
    { id: 'appointments', label: 'Appointments & Demos', icon: Calendar },
    { id: 'followups', label: 'Follow-up Tasks', icon: CheckSquare },
    { id: 'calculations', label: 'Calculations History', icon: Calculator },
    { id: 'blogs', label: 'Blog Posts Management', icon: FileText },
    { id: 'reports', label: 'Reports & Export', icon: BarChart3 },
    { id: 'settings', label: 'Business Settings', icon: Settings },
  ];

  const getRoleLabel = (role?: UserRoleType) => {
    switch (role) {
      case 'super_admin': return 'Super Admin (All Divisions)';
      case 'insurance_admin': return 'Tata AIA Insurance Admin';
      case 'nutrition_admin': return 'Herbalife Nutrition Admin';
      case 'kangen_admin': return 'Kangen Water Admin';
      case 'solar_admin': return 'Solar Energy Specialist';
      case 'customer': return 'Verified Customer';
      default: return 'User';
    }
  };

  const notifications = [
    { title: 'New Tata AIA Lead', desc: 'Rajeshwari K. requested ₹1.5 Cr HLV term policy quote.', time: '10 mins ago', type: 'insurance' },
    { title: 'Kangen Demo Booked', desc: 'Dr. Srinivas booked live home demo for Leveluk K8.', time: '45 mins ago', type: 'kangen' },
    { title: 'PM Surya Ghar Subsidy Survey', desc: '5kW Rooftop Shadow survey requested at Tellapur.', time: '2 hours ago', type: 'solar' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand + Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg"
            >
              {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-base tracking-tight text-white">
                  Quadra<span className="text-blue-400">Biz</span>
                </span>
                <span className="text-[10px] text-amber-400 font-bold ml-1.5 px-1.5 py-0.5 bg-amber-400/10 rounded">
                  PORTAL
                </span>
              </div>
            </Link>

            <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>

            <Link 
              to="/" 
              target="_blank" 
              className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
              title="View Live Public Website"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Role Switcher & Profile Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl relative transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 text-slate-800">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Recent Notifications</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">3 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map((n, i) => (
                      <div key={i} className="p-3 hover:bg-slate-50 text-xs transition">
                        <div className="font-bold text-slate-900">{n.title}</div>
                        <p className="text-slate-500 text-[11px] mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Pill (Great for demonstration) */}
            <div className="relative">
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="hidden md:inline font-bold text-white">
                  {user?.first_name || user?.username}
                </span>
                <span className="text-slate-400 hidden lg:inline">
                  ({user?.role.replace('_', ' ')})
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 text-slate-800 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Test Persona
                  </div>
                  <div className="space-y-1 pt-1">
                    {[
                      { role: 'super_admin', label: 'Super Admin (All 4 Portals)' },
                      { role: 'insurance_admin', label: 'Tata AIA Insurance Admin' },
                      { role: 'nutrition_admin', label: 'Herbalife Nutrition Admin' },
                      { role: 'kangen_admin', label: 'Kangen Water Rep' },
                      { role: 'solar_admin', label: 'Solar EPC Specialist' },
                      { role: 'customer', label: 'Verified Customer' },
                    ].map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchDemoRole(r.role as UserRoleType);
                          setRoleSwitcherOpen(false);
                          if (r.role === 'super_admin') setActiveDivision('all');
                          else if (r.role === 'insurance_admin') setActiveDivision('insurance');
                          else if (r.role === 'nutrition_admin') setActiveDivision('nutrition');
                          else if (r.role === 'kangen_admin') setActiveDivision('kangen');
                          else if (r.role === 'solar_admin') setActiveDivision('solar');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                          user?.role === r.role ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex max-w-full overflow-hidden">
        
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden lg:flex flex-col justify-between p-4 shrink-0">
          <div className="space-y-6">
            
            {/* Business Division Selector (For Super Admin or displays current division) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Business Scope
              </span>
              <div className="space-y-1">
                {divisionsList.map((div) => {
                  const Icon = div.icon;
                  // If not super admin, only allow their own division
                  if (!isSuperAdmin && div.id !== 'all') {
                    const roleMap: Record<string, string> = {
                      insurance_admin: 'insurance',
                      nutrition_admin: 'nutrition',
                      kangen_admin: 'kangen',
                      solar_admin: 'solar',
                    };
                    if (roleMap[user?.role || ''] !== div.id) return null;
                  } else if (!isSuperAdmin && div.id === 'all') {
                    return null;
                  }

                  const isSelected = activeDivision === div.id;
                  return (
                    <button
                      key={div.id}
                      onClick={() => setActiveDivision(div.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {div.id === 'nutrition' ? (
                          <HerbalifeLogo variant="icon" size="xs" />
                        ) : (
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : div.color}`} />
                        )}
                        <span>{div.label}</span>
                      </div>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Navigation Menu */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Dashboard Modules
              </span>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                        isCurrent 
                          ? 'bg-slate-800 text-white border-l-4 border-amber-400 pl-2' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* User Profile Badge at bottom */}
          <div className="pt-4 border-t border-slate-800">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <span className="text-[10px] text-amber-400 font-bold uppercase block">
                Active Session
              </span>
              <strong className="text-white block font-bold truncate">
                {user?.first_name} {user?.last_name}
              </strong>
              <span className="text-[10px] text-slate-400 block truncate">
                {user?.email}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};
