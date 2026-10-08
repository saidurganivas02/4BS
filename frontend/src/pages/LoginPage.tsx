import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { HerbalifeLogo } from '../components/common/HerbalifeLogo';
import { useAuth } from '../context/AuthContext';
import { UserRoleType } from '../types';
import { BrandLogo } from '../components/common/BrandLogo';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: UserRoleType) => {
    switchDemoRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <BrandLogo size="lg" className="mx-auto" />
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Suresh Pepakayala Enterprises
        </h2>
        <p className="text-xs text-slate-500">
          Executive Role-Based Access • Unified Business Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg space-y-6">
        
        {/* Main Login Card */}
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl border border-slate-200 rounded-3xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Username / Email ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="superadmin, tata_agent, herbal_rep, etc."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-700 hover:bg-blue-600 text-white font-extrabold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* 1-Click Demo Accounts Switcher (Crucial for evaluation) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-black text-slate-900 block">
                Instant 1-Click Demo Access
              </span>
              <span className="text-[11px] text-slate-500">
                Click any role to test dashboard permissions and features immediately:
              </span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              Testing Mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            
            {/* Super Admin */}
            <button
              type="button"
              onClick={() => handleQuickDemo('super_admin')}
              className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-left transition flex items-center gap-2.5 shadow-sm"
            >
              <div className="p-1.5 rounded-xl bg-amber-400/20 text-amber-400">
                👑
              </div>
              <div>
                <strong className="block font-bold">Super Admin</strong>
                <span className="text-[10px] text-slate-400">All 4 Business Dashboards</span>
              </div>
            </button>

            {/* Insurance Admin */}
            <button
              type="button"
              onClick={() => handleQuickDemo('insurance_admin')}
              className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100/80 text-blue-950 border border-blue-200 text-left transition flex items-center gap-2.5"
            >
              <div className="p-1.5 rounded-xl bg-blue-600 text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold">Tata AIA Admin</strong>
                <span className="text-[10px] text-blue-700">Insurance Leads & HLV Quotes</span>
              </div>
            </button>

            {/* Nutrition Admin */}
            <button
              type="button"
              onClick={() => handleQuickDemo('nutrition_admin')}
              className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 border border-emerald-200 text-left transition flex items-center gap-2.5"
            >
              <HerbalifeLogo variant="badge" size="xs" />
              <div>
                <strong className="block font-bold">Herbalife Consultant</strong>
                <span className="text-[10px] text-emerald-700">BMI Profiles & Diet Plans</span>
              </div>
            </button>

            {/* Kangen Admin */}
            <button
              type="button"
              onClick={() => handleQuickDemo('kangen_admin')}
              className="p-3 rounded-2xl bg-cyan-50 hover:bg-cyan-100/80 text-cyan-950 border border-cyan-200 text-left transition flex items-center gap-2.5"
            >
              <div className="p-1.5 rounded-xl bg-cyan-600 text-white">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold">Kangen Water Rep</strong>
                <span className="text-[10px] text-cyan-700">Live Demos & Machine Orders</span>
              </div>
            </button>

            {/* Solar Admin */}
            <button
              type="button"
              onClick={() => handleQuickDemo('solar_admin')}
              className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100/80 text-amber-950 border border-amber-200 text-left transition flex items-center gap-2.5"
            >
              <div className="p-1.5 rounded-xl bg-amber-600 text-white">
                <SunMedium className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold">Solar Specialist</strong>
                <span className="text-[10px] text-amber-700">Site Surveys & PM Surya Subsidy</span>
              </div>
            </button>

            {/* Customer */}
            <button
              type="button"
              onClick={() => handleQuickDemo('customer')}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-left transition flex items-center gap-2.5"
            >
              <div className="p-1.5 rounded-xl bg-slate-700 text-white">
                👤
              </div>
              <div>
                <strong className="block font-bold">Customer Portal</strong>
                <span className="text-[10px] text-slate-500">View Appointments & Calculations</span>
              </div>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
