import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  Target, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { HerbalifeLogo } from '../components/common/HerbalifeLogo';
import { BrandLogo } from '../components/common/BrandLogo';

export const AboutUsPage: React.FC = () => {
  const pillars = [
    {
      title: 'Pillar I: Financial Immunity',
      business: 'Tata AIA Life Insurance',
      icon: ShieldCheck,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Protecting families against premature loss of life, critical illnesses, and safeguarding future milestones like child education and dignified retirement with a 99.13% claim settlement ratio.',
      link: '/insurance',
    },
    {
      title: 'Pillar II: Cellular Vitality',
      business: 'Herbalife Nutrition & Wellness',
      icon: null as any,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description: 'Fueling human cells with balanced macro and micronutrients, protein meal shakes, and personalized 1-on-1 lifestyle coaching for sustainable weight management and high vitality.',
      link: '/nutrition',
    },
    {
      title: 'Pillar III: Pure Ionized Hydration',
      business: 'Enagic Kangen Water® Japan',
      icon: Droplets,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      description: 'Bringing Japanese medical-grade platinum-plate electrolysis into Indian kitchens, providing hydrogen-rich antioxidant water with negative ORP and eliminating single-use plastic bottles.',
      link: '/kangen',
    },
    {
      title: 'Pillar IV: Renewable Energy Independence',
      business: 'Solar Panel Installation EPC',
      icon: SunMedium,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description: 'Empowering homeowners and commercial facilities to generate their own clean electricity, pocket up to ₹78,000 in PM Surya Ghar central subsidies, and reduce emissions for 25+ years.',
      link: '/solar',
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          One Vision. Four Life-Changing Divisions.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Founded with the conviction that true prosperity requires financial security, metabolic wellness, pure water, and clean energy.
        </p>
      </section>

      {/* Founder Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between">
            <div>
              <BrandLogo size="xl" className="mb-6" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                The Founder & Managing Director
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1">
                Suresh Pepakayala
              </h2>
              <p className="text-xs text-blue-200 mt-1">
                Senior Financial Planner • Certified Nutrition Associate • Enagic Ionization Specialist • Solar EPC Consultant
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15+ Years in Life Insurance & Family Wealth Preservation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Over 1,500 active health & wellness clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pioneer in Enagic Kangen installations in South India</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Registered PM Surya Ghar Solar Rooftop Partner</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900">
              "Why Run Four Businesses Under One Platform?"
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              When I began my journey in 2011 as a life insurance advisor for Tata AIA, my goal was simple: ensure that no child's dreams are shattered if their breadwinner passes away prematurely. I witnessed families overcome devastating hardships through properly sized life insurance policies.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              However, over the years, I noticed an alarming trend: many clients who had strong financial portfolios were losing their vitality to preventable lifestyle disorders—obesity, diabetes, cardiac issues, and fatty liver disease. That prompted our expansion into <strong>Herbalife Cellular Nutrition</strong>, helping hundreds regain their metabolic health.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Shortly after, we uncovered the severe impact of microplastics from single-use bottled water jars and the benefits of hydrogen-rich ionized alkaline water, leading us to partner with <strong>Enagic Kangen Water Japan</strong>. Finally, to help our families reduce recurring power tariffs and combat air pollution, we launched our <strong>Turnkey Solar EPC Division</strong> under the government's PM Surya Ghar initiative.
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-950">
              "Today, Suresh Pepakayala Enterprises stands as a comprehensive life-enhancement partner for families and institutions across India."
            </div>
          </div>

        </div>
      </section>

      {/* The 4 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Our Business Model
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            The Four Foundations of Our Group
          </h2>
          <p className="text-sm text-slate-500">
            Each division operates with specialized certified professionals while sharing our commitment to integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl ${p.color} flex items-center justify-center`}>
                      {p.link === '/nutrition' ? (
                        <HerbalifeLogo variant="icon" size="sm" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {p.title}
                      </span>
                      <h4 className="text-xl font-extrabold text-slate-900">{p.business}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to={p.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    <span>Visit {p.business} Division Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certifications and Compliance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-6 border border-slate-200 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Accredited, Certified & Regulatory Compliant
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We adhere rigorously to statutory requirements across all 4 operational verticals to protect our clients' trust.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-xs font-semibold text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-blue-700 block font-bold text-sm mb-1">IRDAI Licensed</span>
              <span className="text-slate-600">Tata AIA Authorized Advisory</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-emerald-700 block font-bold text-sm mb-1">FSSAI Compliant</span>
              <span className="text-slate-600">Herbalife Independent Associate</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-cyan-700 block font-bold text-sm mb-1">Enagic Japan</span>
              <span className="text-slate-600">Authorized Machine Distributor</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-amber-700 block font-bold text-sm mb-1">MNRE & DISCOM</span>
              <span className="text-slate-600">PM Surya Ghar Portal Empaneled</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
