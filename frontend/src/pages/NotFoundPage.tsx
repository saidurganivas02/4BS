import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  HelpCircle,
  Compass
} from 'lucide-react';
import { HerbalifeLogo } from '../components/common/HerbalifeLogo';
import { PageMeta } from '../components/common/PageMeta';

export const NotFoundPage: React.FC = () => {
  const quickLinks = [
    { title: 'Tata AIA Insurance', path: '/insurance', icon: ShieldCheck, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { title: 'Herbalife Nutrition', path: '/nutrition', icon: null as any, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { title: 'Enagic Kangen Water', path: '/kangen', icon: Droplets, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { title: 'Solar Rooftop EPC', path: '/solar', icon: SunMedium, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  ];

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <PageMeta 
        title="404 Page Not Found" 
        description="The page you are looking for does not exist on QuadraBiz Multi-Business Platform." 
      />
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/60 shadow-sm">
            <HelpCircle className="w-4 h-4" />
            <span>Error 404 • Destination Not Found</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tight">
            4<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">0</span>4
          </h1>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Lost in the QuadraBiz Matrix?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            The page or resource you requested might have been relocated, updated, or does not exist. Explore our certified business divisions below.
          </p>
        </div>

        {/* Quick Division Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left pt-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div className={`p-2.5 rounded-xl border ${link.color} shrink-0 group-hover:scale-105 transition-transform`}>
                  {link.path === '/nutrition' ? (
                    <HerbalifeLogo variant="icon" size="xs" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Compass className="w-3 h-3" /> Explore Services
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-slate-900/10 transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
