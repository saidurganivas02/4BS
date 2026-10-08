import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  ArrowRight, 
  CheckCircle2, 
  Calculator, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { HerbalifeLogo } from '../components/common/HerbalifeLogo';

export const BusinessesPage: React.FC = () => {
  const businesses = [
    {
      id: 'insurance',
      title: 'Tata AIA Life Insurance',
      partner: 'In Strategic Association with Tata AIA Life Insurance Co. Ltd.',
      icon: ShieldCheck,
      color: 'blue',
      badge: 'Financial Fortress',
      tagline: 'Life Cover, Retirement Security & Child Future Guarantee',
      path: '/insurance',
      description: 'As authorized advisors for Tata AIA, we specialize in high-sum-assured term insurance, human life value estimation, tax-free guaranteed retirement pension solutions, and wealth protection.',
      offerings: [
        'Sampoorna Raksha Supreme (Pure Term Life Cover)',
        'Fortune Guarantee Plus (Guaranteed Tax-Free Returns)',
        'Child Higher Education and Marriage Fund with Waiver of Premium',
        'Comprehensive Critical Illness Shield (40 Major Illnesses)',
      ],
      calculators: ['HLV Calculator', 'Term Premium Estimator', 'Retirement Planner', 'Child Education SIP'],
      demoCta: 'Request Free HLV Consultation',
      demoPath: '/contact?division=insurance',
      stat: '99.13% Claim Settlement',
      bgGlow: 'from-blue-700 to-blue-800',
    },
    {
      id: 'nutrition',
      title: 'Herbalife Nutrition & Wellness',
      partner: 'Authorized Herbalife Independent Associate Network',
      icon: null as any,
      color: 'emerald',
      badge: 'Cellular Health',
      tagline: 'Weight Management, Targeted Nutrition & Active Vitality',
      path: '/nutrition',
      description: 'We guide individuals and families toward their ideal body composition through personalized cellular nutrition meal plans, bioavailable protein shakes, and continuous 1-on-1 coaching.',
      offerings: [
        'Formula 1 Nutritional Shake Mix Meal Replacement',
        'Personalized Protein Powder for Lean Muscle Retention',
        'Afresh Energy Drink Mix & Herbal Aloe Concentrate',
        'Targeted Joint, Digestive, Heart & Skin Nutrition Solutions',
      ],
      calculators: ['BMI & Healthy Range', 'BMR & Daily Calories', 'Daily Water Intake', 'Macronutrient Split'],
      demoCta: 'Book Free Wellness Profile Evaluation',
      demoPath: '/contact?division=nutrition',
      stat: '1,500+ Transformations',
      bgGlow: 'from-emerald-700 to-teal-800',
    },
    {
      id: 'kangen',
      title: 'Enagic Kangen Water® Japan',
      partner: 'Authorized Enagic Machine Distributor',
      icon: Droplets,
      color: 'cyan',
      badge: 'Pure Ionization',
      tagline: 'Electrolyzed Hydrogen-Rich Water & Japanese Medical Devices',
      path: '/kangen',
      description: 'Transform ordinary tap water into hydrogen-rich, antioxidant-loaded, micro-clustered alkaline water. Enagic machines produce 5 functional water types for drinking, sanitizing, and chemical-free produce cleaning.',
      offerings: [
        'Leveluk K8 Flagship 8-Plate Platinum Ionizer',
        'Leveluk SD501 Global Bestseller 7-Plate Ionizer',
        'Leveluk Super 501 Heavy Duty Dual-Chamber Ionizer',
        'Anespa DX Mineral Ion Water Spa Shower System',
      ],
      calculators: ['Household Ionizer Sizing', 'Bottled Water vs Kangen 10-Yr Savings'],
      demoCta: 'Schedule Live In-Home Demo & Tasting',
      demoPath: '/kangen/demo',
      stat: 'ISO 13485 Certified',
      bgGlow: 'from-cyan-700 to-sky-800',
    },
    {
      id: 'solar',
      title: 'Solar Panel Installation EPC',
      partner: 'PM Surya Ghar: Muft Bijli Yojana Empaneled EPC Partner',
      icon: SunMedium,
      color: 'amber',
      badge: 'Clean Energy',
      tagline: 'Turnkey Residential & Commercial Rooftop Solar Solutions',
      path: '/solar',
      description: 'We handle the complete solar installation lifecycle: rooftop shadow assessment, structural engineering, DISCOM net-metering synchronization, Tier-1 DCR panel installation, and DBT subsidy processing up to ₹78,000.',
      offerings: [
        '1kW to 10kW On-Grid Residential Rooftop Plants',
        'PM Surya Ghar Direct Bank Transfer (DBT) Subsidy Management',
        'Commercial & Industrial Rooftop Solar (50kW to 500kW+)',
        '25-Year Performance Warranty with Net Metering Setup',
      ],
      calculators: ['Solar Rooftop Savings & Subsidy Calculator'],
      demoCta: 'Request Free Physical Rooftop Survey',
      demoPath: '/solar/quotation',
      stat: '₹78,000 Govt Subsidy',
      bgGlow: 'from-amber-600 to-orange-700',
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Business Portfolios</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Four Specialized Business Divisions
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Explore each of our dedicated business divisions with custom pages, calculators, blogs, and client portals.
        </p>
      </section>

      {/* Business Cards Detailed List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {businesses.map((biz) => {
          const Icon = biz.icon;
          return (
            <div 
              key={biz.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:shadow-xl transition-all"
            >
              {/* Left Division Highlight Column */}
              <div className={`lg:col-span-4 bg-gradient-to-br ${biz.bgGlow} p-8 sm:p-10 text-white flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      {biz.badge}
                    </span>
                    <span className="text-xs font-bold text-amber-300">
                      {biz.stat}
                    </span>
                  </div>

                  <div className="p-3 bg-white/10 rounded-2xl w-max mb-4">
                    {biz.id === 'nutrition' ? (
                      <HerbalifeLogo variant="badge" size="md" />
                    ) : (
                      <Icon className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <h3 className="text-2xl font-black">{biz.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">{biz.partner}</p>
                  <p className="text-xs text-white/90 mt-3 font-semibold">{biz.tagline}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    to={biz.path}
                    className="w-full py-3 bg-white text-slate-900 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition shadow"
                  >
                    <span>Enter Division Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Details Column */}
              <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {biz.description}
                  </p>

                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Key Offerings & Solutions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {biz.offerings.map((off, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{off}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Available Online Calculators
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {biz.calculators.map((calc, i) => (
                      <span key={i} className="text-xs font-medium bg-slate-100 text-slate-800 px-3 py-1 rounded-lg border border-slate-200">
                        {calc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to={biz.demoPath}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
                  >
                    {biz.demoCta}
                  </Link>
                  <Link
                    to={`/blog?division=${biz.id}`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                  >
                    Read {biz.title} Articles →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
