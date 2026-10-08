import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  Calculator, 
  ChevronDown, 
  Menu, 
  X, 
  LayoutDashboard,
  PhoneCall,
  Sparkles,
  Calendar,
  Layers,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppointmentModal } from '../../context/AppointmentModalContext';
import { BrandLogo } from './BrandLogo';
import { HerbalifeLogo } from './HerbalifeLogo';
import { BackendConnectionBadge } from './BackendConnectionBadge';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [bizDropdownOpen, setBizDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { openBookingModal } = useAppointmentModal();
  const navigate = useNavigate();
  const location = useLocation();

  const businessDivisions = [
    {
      id: 'insurance',
      name: 'Insurance',
      fullName: 'Tata AIA Life Insurance',
      subtitle: '99.13% Claim Ratio • HLV & Term Sizing',
      path: '/insurance',
      icon: ShieldCheck,
      color: 'text-blue-700',
      activeBg: 'bg-blue-700 text-white border-blue-700 shadow-sm',
      inactiveBg: 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border-slate-200',
      badge: '99.13% Claims',
    },
    {
      id: 'nutrition',
      name: 'Nutrition',
      fullName: 'Herbalife Nutrition',
      subtitle: 'Cellular Wellness • Weight & Energy',
      path: '/nutrition',
      icon: null as any,
      color: 'text-emerald-700',
      activeBg: 'bg-emerald-700 text-white border-emerald-700 shadow-sm',
      inactiveBg: 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border-slate-200',
      badge: 'Cellular Care',
    },
    {
      id: 'kangen',
      name: 'Kangen Water',
      fullName: 'Enagic Kangen Water®',
      subtitle: '-850mV ORP • 5 Functional Waters',
      path: '/kangen',
      icon: Droplets,
      color: 'text-sky-700',
      activeBg: 'bg-sky-700 text-white border-sky-700 shadow-sm',
      inactiveBg: 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700 border-slate-200',
      badge: 'Japanese Tech',
    },
    {
      id: 'solar',
      name: 'Solar',
      fullName: 'Solar Panel Installation EPC',
      subtitle: 'PM Surya Ghar ₹78k Subsidy • Zero Bills',
      path: '/solar',
      icon: SunMedium,
      color: 'text-amber-700',
      activeBg: 'bg-amber-600 text-white border-amber-600 shadow-sm',
      inactiveBg: 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-700 border-slate-200',
      badge: '₹78k Subsidy',
    },
  ];

  const calculatorsList = [
    { name: 'Human Life Value (HLV) Needs', division: 'Tata AIA', path: '/insurance/calculators?tab=hlv', color: 'text-blue-600' },
    { name: 'Term Insurance Premium Estimator', division: 'Tata AIA', path: '/insurance/calculators?tab=premium', color: 'text-blue-600' },
    { name: 'Retirement Freedom Corpus', division: 'Tata AIA', path: '/insurance/calculators?tab=retirement', color: 'text-blue-600' },
    { name: 'Child College Degree Guarantee', division: 'Tata AIA', path: '/insurance/calculators?tab=child', color: 'text-blue-600' },
    { name: 'BMI & Ideal Weight Target', division: 'Herbalife', path: '/nutrition/calculators?tab=bmi', color: 'text-emerald-600' },
    { name: 'BMR & Caloric Needs Target', division: 'Herbalife', path: '/nutrition/calculators?tab=calorie', color: 'text-emerald-600' },
    { name: 'Daily Water Intake & Hydration', division: 'Herbalife', path: '/nutrition/calculators?tab=water', color: 'text-emerald-600' },
    { name: 'Kangen Bottled Water Savings', division: 'Kangen Water', path: '/kangen/calculators', color: 'text-sky-600' },
    { name: 'PM Surya Ghar Solar Rooftop', division: 'Solar Energy', path: '/solar/calculator', color: 'text-amber-600' },
  ];

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      
      {/* Top Professional Micro Bar */}
      <div className="bg-slate-900 text-slate-300 text-[12px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300 font-medium">
              Suresh Pepakayala Enterprises • Official Corporate Group Portal
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 text-xs">
            <BackendConnectionBadge />
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a href="tel:+919848012345" className="hover:text-white hidden sm:flex items-center gap-1.5 font-semibold text-slate-300 transition">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Helpline: +91 98480 12345</span>
            </a>
            <span className="text-slate-600">|</span>
            {isAuthenticated ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Dashboard</span>
              </button>
            ) : (
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold transition">
                Advisor Portal Login →
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Main Crisp Corporate Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group shrink-0">
              <BrandLogo size="md" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    Suresh <span className="text-blue-700">Pepakayala</span>
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
                    Enterprises
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Insurance • Nutrition • Water • Solar
                </p>
              </div>
            </Link>

            {/* REAL-WORLD BUSINESS SWITCHER (Clean Corporate Tabs) */}
            <div className="hidden xl:flex items-center bg-slate-100/90 p-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Divisions:
              </span>
              <div className="flex items-center space-x-1">
                {businessDivisions.map((biz) => {
                  const isActive = location.pathname.startsWith(biz.path);
                  const Icon = biz.icon;
                  return (
                    <Link
                      key={biz.id}
                      to={biz.path}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-150 ${
                        isActive ? biz.activeBg : biz.inactiveBg
                      }`}
                    >
                      {biz.id === 'nutrition' ? (
                        <HerbalifeLogo variant="icon" size="xs" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                      <span>{biz.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 text-sm font-semibold">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-lg transition ${
                  location.pathname === '/' ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Home
              </Link>

              {/* Businesses Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setBizDropdownOpen(true)}
                onMouseLeave={() => setBizDropdownOpen(false)}
              >
                <button 
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                  <span>Our Businesses</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${bizDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {bizDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in duration-150 text-slate-800">
                    <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                      Explore Division Portals
                    </div>
                    <div className="space-y-1">
                      {businessDivisions.map((biz) => {
                        const Icon = biz.icon;
                        return (
                          <Link
                            key={biz.id}
                            to={biz.path}
                            onClick={() => setBizDropdownOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                          >
                            {biz.id === 'nutrition' ? (
                              <div className="p-1 rounded-lg bg-white border border-slate-200 shadow-sm shrink-0 flex items-center justify-center">
                                <HerbalifeLogo variant="badge" size="sm" className="border-0 shadow-none p-0" />
                              </div>
                            ) : (
                              <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                                <Icon className="w-5 h-5 text-blue-700" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-slate-900">
                                  {biz.fullName}
                                </span>
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                  {biz.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                {biz.subtitle}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                      <div className="pt-2 border-t border-slate-100">
                        <Link 
                          to="/businesses"
                          onClick={() => setBizDropdownOpen(false)}
                          className="block text-center text-xs font-bold text-blue-700 hover:underline py-1"
                        >
                          View All 4 Divisions Matrix →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Calculators Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setCalcDropdownOpen(true)}
                onMouseLeave={() => setCalcDropdownOpen(false)}
              >
                <button 
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                  <Calculator className="w-4 h-4 text-blue-700" />
                  <span>Calculators</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${calcDropdownOpen ? 'rotate-180 text-blue-700' : ''}`} />
                </button>

                {calcDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150 text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Interactive Estimators Suite
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                        Free Tools
                      </span>
                    </div>

                    <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                      {calculatorsList.map((calc, idx) => (
                        <Link
                          key={idx}
                          to={calc.path}
                          onClick={() => setCalcDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs transition"
                        >
                          <span className="font-semibold text-slate-800">{calc.name}</span>
                          <span className={`text-[10px] font-bold ${calc.color}`}>{calc.division}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/services" 
                className={`px-3 py-2 rounded-lg transition ${
                  location.pathname === '/services' ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Services
              </Link>

              <Link 
                to="/blog" 
                className={`px-3 py-2 rounded-lg transition ${
                  location.pathname.startsWith('/blog') ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Articles
              </Link>

              <Link 
                to="/contact" 
                className={`px-3 py-2 rounded-lg transition ${
                  location.pathname === '/contact' ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Universal Appointment CTA Button */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => openBookingModal()}
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Discuss an Opportunity</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => openBookingModal()}
                className="p-2 rounded-lg bg-blue-700 text-white text-xs font-bold sm:hidden"
              >
                <Calendar className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                Select Business Portal
              </span>
              <div className="grid grid-cols-2 gap-2">
                {businessDivisions.map((biz) => {
                  const Icon = biz.icon;
                  const isActive = location.pathname.startsWith(biz.path);
                  return (
                    <Link
                      key={biz.id}
                      to={biz.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-bold ${
                        isActive ? biz.activeBg : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {biz.id === 'nutrition' ? (
                        <HerbalifeLogo variant="icon" size="xs" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                      <span>{biz.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1 text-sm font-semibold">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Home</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-50">About Group</Link>
              <Link to="/businesses" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-50">All 4 Businesses</Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Services</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Articles</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Contact Office</Link>
              <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-50">FAQs</Link>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full py-2.5 rounded-xl bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Discuss an Opportunity</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </header>
  );
};
