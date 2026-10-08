import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Calculator,
  ChevronRight,
  PhoneCall,
  Zap,
  Star,
  Award,
  Layers,
  Calendar,
  Clock,
  BookOpen,
  ArrowUpRight,
  Building2,
  Users,
  Check
} from 'lucide-react';
import { HerbalifeLogo } from '../components/common/HerbalifeLogo';
import { useAppointmentModal } from '../context/AppointmentModalContext';
import { InsuranceCalculatorsSuite } from '../components/calculators/InsuranceCalculatorsSuite';
import { NutritionCalculatorsSuite } from '../components/calculators/NutritionCalculatorsSuite';
import { KangenCalculatorsSuite } from '../components/calculators/KangenCalculatorsSuite';
import { SolarCalculatorAdvanced } from '../components/calculators/SolarCalculatorAdvanced';

import { PageMeta } from '../components/common/PageMeta';

export const HomePage: React.FC = () => {
  const { openBookingModal } = useAppointmentModal();
  const [activeCalculatorDivision, setActiveCalculatorDivision] = useState<'insurance' | 'nutrition' | 'kangen' | 'solar'>('insurance');

  const divisions = [
    {
      id: 'insurance',
      title: 'Tata AIA Life Insurance',
      category: 'Financial Protection',
      subtitle: 'Life Protection & Wealth Fortresses',
      tagline: 'Securing families with 99.13% Individual Claim Settlement Ratio.',
      icon: ShieldCheck,
      badge: '99.13% Claims',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
      path: '/insurance',
      highlights: [
        'Pure Term Protection up to 100 yrs of age',
        'Human Life Value (HLV) deficit sizing',
        'Guaranteed Child College Degree Fund with WOP',
        'Tax exemption under Section 80C & 10(10D)',
      ],
      heroStat: '₹120+ Crore',
      statLabel: 'Life Coverage Sized',
      btnColor: 'bg-blue-700 hover:bg-blue-800 text-white',
    },
    {
      id: 'nutrition',
      title: 'Herbalife Nutrition',
      category: 'Nutrition & Wellness',
      subtitle: 'Cellular Vitality & Weight Care',
      tagline: 'Science-backed cellular nutrition and personal lifestyle coaching.',
      icon: null as any,
      badge: 'Cellular Care',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      path: '/nutrition',
      highlights: [
        'Personalized Formula 1 Shake meal plans',
        'BMI & Resting Metabolic Rate (BMR) Profiling',
        'H24 Sports Nutrition for active athletes',
        'Digestive wellness & daily accountability',
      ],
      heroStat: '1,500+ Clients',
      statLabel: 'Transformations Guided',
      btnColor: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    },
    {
      id: 'kangen',
      title: 'Enagic Kangen Water®',
      category: 'Water Technology',
      subtitle: 'Japanese Hydrogen Ionization Tech',
      tagline: 'Change Your Water, Change Your Life • Japanese Medical Ionizers.',
      icon: Droplets,
      badge: 'Medical Device ISO 13485',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      iconBg: 'bg-sky-50 text-sky-700 border-sky-200',
      path: '/kangen',
      highlights: [
        'Active Molecular Hydrogen & -850mV Negative ORP',
        'Micro-clustered water for 6x faster hydration',
        '5 Water types from pesticide wash to drinking',
        'Zero plastic bottle waste & lifetime family savings',
      ],
      heroStat: '650+ Ionizers',
      statLabel: 'Japanese Units Commissioned',
      btnColor: 'bg-sky-700 hover:bg-sky-800 text-white',
    },
    {
      id: 'solar',
      title: 'Solar Panel Installation EPC',
      category: 'Renewable Clean Energy',
      subtitle: 'Renewable Rooftop Clean Power',
      tagline: 'Harness the sun with PM Surya Ghar ₹78,000 Direct Central Subsidy.',
      icon: SunMedium,
      badge: '₹78,000 Subsidy',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      path: '/solar',
      highlights: [
        'Turnkey Residential & Commercial Rooftop EPC',
        'Direct DBT Central Subsidy up to ₹78,000',
        'Tier-1 DCR Mono PERC Panels with 25-yr Warranty',
        'On-Grid Net Metering for zero monthly bills',
      ],
      heroStat: '4.2+ Megawatts',
      statLabel: 'Rooftop Solar Installed',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
  ];

  const featuredBlogs = [
    {
      title: 'How to Size Your Term Insurance Using Human Life Value (HLV)',
      category: 'Insurance',
      badgeColor: 'bg-blue-100 text-blue-800',
      readTime: '5 min read',
      author: 'Ramesh V., Tata AIA Senior Specialist',
      slug: 'how-to-size-term-insurance-hlv',
      excerpt: 'Why 10x salary rule leaves dangerous gaps during inflation, and how to protect home loans and children’s degree funds.'
    },
    {
      title: 'Resting Metabolic Rate (BMR): The Key to Permanent Weight Loss',
      category: 'Nutrition',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      readTime: '4 min read',
      author: 'Sunita M., Herbalife Wellness Coach',
      slug: 'bmr-key-to-permanent-weight-loss',
      excerpt: 'Discover why crash diets destroy metabolism and how protein pacing with Formula 1 protects lean muscle tissue.'
    },
    {
      title: 'The Science of Negative ORP: Why Antioxidant Water Matters',
      category: 'Kangen Water',
      badgeColor: 'bg-sky-100 text-sky-800',
      readTime: '6 min read',
      author: 'Vikram R., Ionization Specialist',
      slug: 'science-of-negative-orp-antioxidant-water',
      excerpt: 'Comparing the oxidation reduction potential of tap water (+300mV) against fresh hydrogen-rich Kangen Water (-850mV).'
    },
    {
      title: 'PM Surya Ghar Muft Bijli Yojana: Step-by-Step Subsidy Guide',
      category: 'Solar Energy',
      badgeColor: 'bg-amber-100 text-amber-800',
      readTime: '5 min read',
      author: 'Eng. K. Rao, Solar EPC Director',
      slug: 'pm-surya-ghar-subsidy-guide',
      excerpt: 'Complete guide on claiming ₹78,000 DBT subsidy, DISCOM net metering approvals, and achieving a 3.5-year ROI.'
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 bg-slate-50 text-slate-800">
      <PageMeta 
        title="QuadraBiz • Integrated Business Ecosystem" 
        description="Tata AIA Life Insurance, Herbalife Nutrition, Enagic Kangen Water, and Solar Rooftop EPC — integrated enterprise solutions." 
      />
      
      {/* ==================================================
          1. REAL-WORLD CORPORATE HERO SECTION
          ================================================== */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200 pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header pill badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-blue-700" />
              <span>Multi-Industry Corporate Enterprise</span>
              <span className="text-slate-400">•</span>
              <span className="text-blue-700">Established Advisory</span>
            </div>
          </div>

          {/* Hero Titles - Exact User Headlines */}
          <div className="text-center mt-6 max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              One Vision. Four Businesses.<br />
              <span className="text-blue-700">
                Endless Possibilities.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Trusted solutions across Insurance, Nutrition, Wellness, Water, and Solar Energy.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            <a
              href="#business-overview"
              className="px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm shadow-sm transition flex items-center gap-2"
            >
              <span>Explore Our Businesses</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => openBookingModal()}
              className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-700" />
              <span>Discuss an Opportunity</span>
            </button>
          </div>

          {/* 4 Division Cards (Crisp, High-Trust Corporate Layout) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div) => {
              const Icon = div.icon;
              return (
                <div
                  key={div.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${div.badgeColor}`}>
                        {div.badge}
                      </span>
                      <div className={`p-2 rounded-xl border ${div.iconBg}`}>
                        {div.id === 'nutrition' ? (
                          <HerbalifeLogo variant="icon" size="xs" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {div.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {div.tagline}
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                      {div.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-600 font-bold" />
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="text-base font-black text-slate-900">{div.heroStat}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{div.statLabel}</div>
                      </div>
                    </div>

                    <Link
                      to={div.path}
                      className={`w-full py-2.5 px-3 rounded-xl ${div.btnColor} text-xs font-bold transition flex items-center justify-between shadow-sm`}
                    >
                      <span>Explore Division</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-World Statistics Strip */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-blue-700">99.13%</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Tata AIA Claim Ratio</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">1,500+</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Wellness Clients</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-sky-700">650+</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Kangen Ionizers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-600">₹78,000</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Max PM Surya Ghar Subsidy</div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          2. BUSINESS OVERVIEW SECTION
          ================================================== */}
      <section id="business-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Operational Divisions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Four Core Pillars of Excellence
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Each business division operates with certified personnel, regulatory compliance, and proven industry leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tata AIA */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  Division 1 • Financial Security
                </span>
                <ShieldCheck className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Tata AIA Life Insurance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Comprehensive life insurance protection backed by the trust of the Tata Group and AIA. We specialize in Human Life Value (HLV) term insurance, retirement pension schemes, and guaranteed funds for children’s higher education.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block">Sampoorna Raksha Supreme</strong>
                  <span className="text-slate-500">Pure Term Cover up to 100 yrs</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block">Fortune Guarantee Plus</strong>
                  <span className="text-slate-500">Guaranteed tax-free income</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link to="/insurance" className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1">
                <span>View Plans & Calculators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => openBookingModal({ division: 'insurance' })}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold"
              >
                Book HLV Review
              </button>
            </div>
          </div>

          {/* Herbalife Nutrition */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Division 2 • Wellness & Nutrition
                </span>
                <HerbalifeLogo variant="badge" size="sm" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Herbalife Nutrition
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cellular wellness programs designed for healthy weight management, fitness, and daily vitality. Includes personalized meal planning, Formula 1 protein shakes, and dedicated 1-on-1 lifestyle coaching.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block">Formula 1 Meal Shakes</strong>
                  <span className="text-slate-500">21 Essential vitamins & minerals</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block">H24 Sports Nutrition</strong>
                  <span className="text-slate-500">Certified for sport & athletes</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link to="/nutrition" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
                <span>View Products & Health Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => openBookingModal({ division: 'nutrition' })}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
              >
                Free Body Profile
              </button>
            </div>
          </div>

          {/* Kangen Water */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                  Division 3 • Japanese Water Technology
                </span>
                <Droplets className="w-6 h-6 text-sky-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Enagic Kangen Water®
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Japanese OEM medical water ionizers producing hydrogen-rich, antioxidant drinking water with a negative ORP of up to -850mV. Generates 5 distinct functional water types for cooking, drinking, beauty, and chemical-free sanitization.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block">Leveluk K8 & SD501</strong>
                  <span className="text-slate-500">Solid titanium platinum plates</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block">pH 2.5 to 11.5 Waters</strong>
                  <span className="text-slate-500">Produce wash to medical sanitizer</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link to="/kangen" className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1">
                <span>View Ionizers & Technology</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => openBookingModal({ division: 'kangen' })}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold"
              >
                Book Live Demo
              </button>
            </div>
          </div>

          {/* Solar Rooftop */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Division 4 • Solar Rooftop EPC
                </span>
                <SunMedium className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Solar Panel Installation EPC
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Turnkey residential and commercial rooftop solar installation. We are an empaneled MNRE vendor facilitating direct central subsidies of up to ₹78,000 under the PM Surya Ghar scheme, with on-grid net metering and 25-year panel warranties.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block">PM Surya Ghar Subsidy</strong>
                  <span className="text-slate-500">₹78,000 direct bank transfer</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block">3.5-Year Average Payback</strong>
                  <span className="text-slate-500">25 Years of clean, free power</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link to="/solar" className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1">
                <span>Run Solar Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => openBookingModal({ division: 'solar' })}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
              >
                Free Site Survey
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          3. WHY CHOOSE US
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Trusted by Modern Indian Families
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We provide end-to-end expertise under one roof, saving you from having to deal with multiple unverified agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Institutional Heritage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We represent certified leaders like Tata AIA (India’s top brand), Herbalife (global wellness leader), and Enagic (Japan’s ISO 13485 medical manufacturer).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Objective Mathematical Sizing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We calculate your exact requirements using scientific formulas—HLV for life cover, BMR for nutrition, and terrace sun-hours for solar sizing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Turnkey Service & Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              From paperwork and medical underwriting to solar net-metering approvals and ionizer installation, our team manages everything from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. SERVICES MATRIX
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Services Matrix
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Comprehensive Solutions Across All 4 Divisions
          </h2>
          <p className="text-slate-600 text-sm">
            Select any service to view calculators, plan information, or book an appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Human Life Value (HLV) Diagnostic', div: 'Tata AIA', link: '/insurance/calculators?tab=hlv', color: 'text-blue-700' },
            { title: 'Child College Degree Guarantee', div: 'Tata AIA', link: '/insurance/plans', color: 'text-blue-700' },
            { title: 'Guaranteed Lifetime Pension Setup', div: 'Tata AIA', link: '/insurance/plans', color: 'text-blue-700' },
            { title: 'Policy Portfolio & Claims Audit', div: 'Tata AIA', link: '/insurance/faq', color: 'text-blue-700' },
            { title: 'Personalized BMI & Body Scan', div: 'Herbalife', link: '/nutrition/calculators?tab=bmi', color: 'text-emerald-700' },
            { title: 'Weight & Fat Loss Shake Regimen', div: 'Herbalife', link: '/nutrition/products', color: 'text-emerald-700' },
            { title: 'H24 Athletic Fueling Consultation', div: 'Herbalife', link: '/nutrition/products', color: 'text-emerald-700' },
            { title: 'Daily Water & Hydration Sizing', div: 'Herbalife', link: '/nutrition/calculators?tab=water', color: 'text-emerald-700' },
            { title: 'Live In-Home Water Ionizer Demo', div: 'Kangen Water', link: '/kangen/demo', color: 'text-sky-700' },
            { title: 'Leveluk K8 / SD501 Machine Sizing', div: 'Kangen Water', link: '/kangen/machines', color: 'text-sky-700' },
            { title: 'Bottled Water Cost Savings Audit', div: 'Kangen Water', link: '/kangen/calculators', color: 'text-sky-700' },
            { title: 'Anespa DX Mineral Spa System', div: 'Kangen Water', link: '/kangen/machines', color: 'text-sky-700' },
            { title: 'PM Surya Ghar ₹78k Subsidy Filing', div: 'Solar EPC', link: '/solar/subsidy', color: 'text-amber-700' },
            { title: 'Interactive Solar ROI Calculator', div: 'Solar EPC', link: '/solar/calculator', color: 'text-amber-700' },
            { title: 'Free Drone & Terrace Shade Survey', div: 'Solar EPC', link: '/solar/quotation', color: 'text-amber-700' },
            { title: 'Elevated Super-Structure Engineering', div: 'Solar EPC', link: '/solar/projects', color: 'text-amber-700' },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${item.color}`}>
                  {item.div}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  {item.title}
                </h4>
              </div>
              <div className="mt-3 flex items-center justify-end text-slate-400 text-xs">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================================================
          5. HOW WE WORK
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Process
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            How We Work
          </h2>
          <p className="text-slate-600 text-sm">
            A clear, 4-step process that ensures transparency and guaranteed results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Consultation & Discovery', desc: 'We assess your family’s financial liabilities, dietary habits, or terrace solar feasibility.' },
            { step: '02', title: 'Custom Sizing & Proposal', desc: 'We calculate exact requirements and present clear quotes, subsidies, and expected outcomes.' },
            { step: '03', title: 'Delivery & Commissioning', desc: 'Complete paperwork, DISCOM solar net-metering synchronization, or ionizer setup.' },
            { step: '04', title: 'Ongoing Support', desc: 'Annual insurance reviews, continuous wellness coaching, and long-term solar yield monitoring.' },
          ].map((st, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-blue-700 block">
                {st.step}
              </span>
              <h3 className="font-bold text-slate-900 text-base">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          6. INTERACTIVE CALCULATORS SUITE
          ================================================== */}
      <section id="calculators-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Free Interactive Estimators
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Calculate Your Needs In Seconds
          </h2>
          <p className="text-slate-600 text-sm">
            Choose a division below to calculate your estimated life insurance cover, caloric targets, water savings, or rooftop solar subsidy.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl max-w-full overflow-x-auto gap-1">
            <button
              onClick={() => setActiveCalculatorDivision('insurance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeCalculatorDivision === 'insurance'
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Tata AIA Insurance</span>
            </button>

            <button
              onClick={() => setActiveCalculatorDivision('nutrition')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeCalculatorDivision === 'nutrition'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <HerbalifeLogo variant="icon" size="xs" />
              <span>Herbalife Nutrition</span>
            </button>

            <button
              onClick={() => setActiveCalculatorDivision('kangen')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeCalculatorDivision === 'kangen'
                  ? 'bg-white text-sky-800 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-4 h-4 text-sky-700" />
              <span>Kangen Water</span>
            </button>

            <button
              onClick={() => setActiveCalculatorDivision('solar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeCalculatorDivision === 'solar'
                  ? 'bg-white text-amber-800 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <SunMedium className="w-4 h-4 text-amber-600" />
              <span>Solar Rooftop & Subsidy</span>
            </button>
          </div>
        </div>

        {/* Dynamic Calculator Embed */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
          {activeCalculatorDivision === 'insurance' && <InsuranceCalculatorsSuite />}
          {activeCalculatorDivision === 'nutrition' && <NutritionCalculatorsSuite />}
          {activeCalculatorDivision === 'kangen' && <KangenCalculatorsSuite />}
          {activeCalculatorDivision === 'solar' && <SolarCalculatorAdvanced />}
        </div>
      </section>

      {/* ==================================================
          7. VERIFIED TESTIMONIALS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            What Our Clients Say
          </h2>
          <p className="text-sm text-slate-600">
            Verified feedback from clients across Telangana, Andhra Pradesh, and Pan-India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Tata AIA Insurance
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                "The HLV calculator made me realize my ₹50 Lakh policy was totally inadequate. Ramesh Sir restructured our family cover to ₹2 Crore with accidental disability riders smoothly."
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <strong className="text-xs font-bold text-slate-900 block">Rajeshwari K.</strong>
              <span className="text-[11px] text-slate-500">IT Director, Hyderabad</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Herbalife Nutrition
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                "Sunita Ma'am evaluated my BMI and custom-designed a 90-day breakfast shake plan. I lost 11 kgs in 3 months without fatigue or energy crashes. Life-changing guidance!"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <strong className="text-xs font-bold text-slate-900 block">Pooja Chawla</strong>
              <span className="text-[11px] text-slate-500">Architect, Visakhapatnam</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Kangen Water
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                "Vikram gave a live demo showing the negative ORP and tomato pesticide test. We bought the Leveluk K8 for our parents, and chronic acidity issues subsided remarkably."
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <strong className="text-xs font-bold text-slate-900 block">Dr. K. Srinivas</strong>
              <span className="text-[11px] text-slate-500">Senior Physician, Secunderabad</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Solar Rooftop EPC
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                "Installed a 5kW rooftop system on our villa. The team managed the PM Surya Ghar subsidy application, and ₹78,000 came directly to our bank account. Electricity bill dropped to zero!"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <strong className="text-xs font-bold text-slate-900 block">Chaitanya Kumar</strong>
              <span className="text-[11px] text-slate-500">Villa Owner, Tellapur</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. FEATURED BLOGS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Articles & Guides
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Knowledge Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Educational guides on protection, wellness, ionization science, and solar subsidies.
            </p>
          </div>
          <Link
            to="/blog"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBlogs.map((post, idx) => (
            <Link
              key={idx}
              to={`/blog/${post.slug}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${post.badgeColor}`}>
                    {post.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{post.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate">{post.author}</span>
                <ChevronRight className="w-4 h-4 text-blue-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================================================
          9. CONTACT / OPPORTUNITY CTA
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-blue-900 text-white rounded-2xl p-8 sm:p-12 border border-blue-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block">
              Speak With An Advisor
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Discuss an Opportunity?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Connect directly with our division specialists for insurance reviews, wellness coaching enrollments, live Kangen water tests, or rooftop solar feasibility surveys.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => openBookingModal()}
              className="px-6 py-3.5 bg-white text-blue-900 font-extrabold rounded-xl text-xs hover:bg-blue-50 transition shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-700" />
              <span>Book Priority Consultation</span>
            </button>
            <a
              href="tel:+919848012345"
              className="px-6 py-3.5 bg-blue-800/80 hover:bg-blue-800 text-white font-bold rounded-xl text-xs border border-blue-700 transition flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>+91 98480 12345</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
