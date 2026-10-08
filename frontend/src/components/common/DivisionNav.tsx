import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Droplets, SunMedium, ArrowLeft, ExternalLink } from 'lucide-react';
import { HerbalifeLogo } from './HerbalifeLogo';
import { BusinessDivisionType } from '../../types';

interface DivisionNavProps {
  division: BusinessDivisionType;
}

export const DivisionNav: React.FC<DivisionNavProps> = ({ division }) => {
  const location = useLocation();

  const configs = {
    insurance: {
      name: 'Tata AIA Life Insurance',
      tagline: 'Securing Futures with 99.13% Claim Settlement Ratio',
      icon: ShieldCheck,
      bgColor: 'bg-blue-900',
      badgeBg: 'bg-blue-800 text-blue-200 border-blue-700',
      activeColor: 'bg-white text-blue-900 shadow-sm',
      inactiveColor: 'text-blue-100 hover:bg-blue-800/80',
      ctaBg: 'bg-red-600 hover:bg-red-700 text-white',
      ctaText: 'Free HLV Consultation',
      ctaLink: '/contact?division=insurance',
      links: [
        { label: 'Division Home', path: '/insurance' },
        { label: 'Plans & Coverage', path: '/insurance/plans' },
        { label: 'Calculators (HLV/SIP)', path: '/insurance/calculators' },
        { label: 'Insurance FAQ', path: '/insurance/faq' },
        { label: 'Insurance Blogs', path: '/blog?division=insurance' },
      ],
    },
    nutrition: {
      name: 'Herbalife Nutrition & Wellness',
      tagline: 'Cellular Nutrition, Weight Management & Active Vitality',
      icon: null as any,
      bgColor: 'bg-emerald-800',
      badgeBg: 'bg-emerald-900 text-emerald-200 border-emerald-700',
      activeColor: 'bg-white text-emerald-900 shadow-sm',
      inactiveColor: 'text-emerald-100 hover:bg-emerald-700/80',
      ctaBg: 'bg-lime-500 hover:bg-lime-400 text-slate-900 font-bold',
      ctaText: 'Free Wellness Profile',
      ctaLink: '/contact?division=nutrition',
      links: [
        { label: 'Division Home', path: '/nutrition' },
        { label: 'Nutrition Programs', path: '/nutrition/products' },
        { label: 'BMI & Calorie Calculators', path: '/nutrition/calculators' },
        { label: 'Nutrition FAQ', path: '/nutrition/faq' },
        { label: 'Wellness Blogs', path: '/blog?division=nutrition' },
      ],
    },
    kangen: {
      name: 'Enagic Kangen Water®',
      tagline: 'Change Your Water, Change Your Life • Japanese Medical Ionizers',
      icon: Droplets,
      bgColor: 'bg-sky-900',
      badgeBg: 'bg-sky-950 text-cyan-200 border-sky-700',
      activeColor: 'bg-white text-sky-900 shadow-sm',
      inactiveColor: 'text-cyan-100 hover:bg-sky-800/80',
      ctaBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold',
      ctaText: 'Book Live Demo',
      ctaLink: '/kangen/demo',
      links: [
        { label: 'Division Home', path: '/kangen' },
        { label: '5 Types of Water', path: '/kangen/technology' },
        { label: 'Machine Models', path: '/kangen/machines' },
        { label: 'Water Sizing Calculator', path: '/kangen/calculators' },
        { label: 'Book Live Demo', path: '/kangen/demo' },
        { label: 'Water FAQ', path: '/kangen/faq' },
        { label: 'Water Blogs', path: '/blog?division=kangen' },
      ],
    },
    solar: {
      name: 'Solar Panel Installation EPC',
      tagline: 'PM Surya Ghar ₹78,000 Subsidy • Zero Electricity Bills',
      icon: SunMedium,
      bgColor: 'bg-amber-900',
      badgeBg: 'bg-amber-950 text-amber-200 border-amber-800',
      activeColor: 'bg-white text-amber-950 shadow-sm',
      inactiveColor: 'text-amber-100 hover:bg-amber-800/80',
      ctaBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
      ctaText: 'Get Solar Quote',
      ctaLink: '/solar/quotation',
      links: [
        { label: 'Division Home', path: '/solar' },
        { label: 'Advanced Solar Calculator', path: '/solar/calculator' },
        { label: 'PM Surya Ghar Subsidy Guide', path: '/solar/subsidy' },
        { label: 'Projects Gallery', path: '/solar/projects' },
        { label: 'Solar FAQ', path: '/solar/faq' },
        { label: 'Free Site Survey', path: '/solar/quotation' },
        { label: 'Solar Blogs', path: '/blog?division=solar' },
      ],
    },
    general: {
      name: 'Suresh Pepakayala Enterprises',
      tagline: 'Integrated Multi-Industry Solutions',
      icon: ShieldCheck,
      bgColor: 'bg-slate-900',
      badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
      activeColor: 'bg-white text-slate-900',
      inactiveColor: 'text-slate-300 hover:bg-slate-800',
      ctaBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      ctaText: 'Contact Office',
      ctaLink: '/contact',
      links: [
        { label: 'Overview', path: '/' },
        { label: 'All Businesses', path: '/businesses' },
        { label: 'Services', path: '/services' },
      ]
    }
  };

  const current = configs[division] || configs.general;
  const Icon = current.icon;

  return (
    <div className={`${current.bgColor} text-white shadow-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Left Brand Identity */}
          <div className="flex items-center gap-3">
            <Link 
              to="/businesses" 
              className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition"
              title="Return to Business Hub"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            {division === 'nutrition' ? (
              <HerbalifeLogo variant="badge" size="sm" className="px-2 py-1 bg-white rounded-xl shadow-md border-0" />
            ) : (
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
                <Icon className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base tracking-tight">{current.name}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${current.badgeBg}`}>
                  Division Portal
                </span>
              </div>
              <p className="text-xs text-white/80">{current.tagline}</p>
            </div>
          </div>

          {/* Sub Navigation Links + CTA */}
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {current.links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    isActive ? current.activeColor : current.inactiveColor
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              to={current.ctaLink}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-all ml-auto md:ml-2 ${current.ctaBg}`}
            >
              {current.ctaText}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
