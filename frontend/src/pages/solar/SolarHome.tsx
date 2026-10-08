import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SunMedium, 
  Zap, 
  Leaf, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Calendar, 
  PhoneCall,
  Coins,
  TrendingDown,
  Building2,
  Home
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { SolarCalculatorAdvanced } from '../../components/calculators/SolarCalculatorAdvanced';
import { PageMeta } from '../../components/common/PageMeta';

export const SolarHome: React.FC = () => {
  return (
    <div>
      <PageMeta 
        title="Rooftop Solar EPC • PM Surya Ghar Muft Bijli Yojana" 
        description="Save up to 90% on electricity bills with Tier-1 solar rooftop installations, DISCOM net metering, and ₹78,000 Govt subsidy." 
      />
      <DivisionNav division="solar" />

      {/* Hero */}
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50/70 via-slate-50/40 to-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold">
              <SunMedium className="w-4 h-4 text-amber-700" />
              <span>PM Surya Ghar: Muft Bijli Yojana Empaneled EPC Partner</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Turn Your Rooftop into a Power Plant.<br />
              <span className="text-amber-700">Zero Out Your Electric Bills.</span>
            </h1>

            <p className="text-base text-slate-600 max-w-xl leading-relaxed">
              Complete turnkey residential & commercial rooftop solar installations with direct <strong className="text-slate-900">₹78,000 Central Government DBT Subsidy</strong>, Tier-1 DCR TopCon panels, 25-year performance warranty, and end-to-end DISCOM net metering.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/solar/calculator"
                className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm shadow-sm flex items-center gap-2 transition"
              >
                <Calculator className="w-4 h-4 text-amber-100" />
                <span>Calculate Your Solar Subsidy</span>
              </Link>
              <Link
                to="/solar/quotation"
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-sm border border-slate-300 transition flex items-center gap-2 shadow-sm"
              >
                <span>Book Free Rooftop Survey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Maximum Central Govt Subsidy</span>
                <span className="text-3xl font-extrabold text-amber-700">₹78,000</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">
                <Coins className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% Turnkey Execution: Feasibility, Approval, Metering & DBT Subsidy</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Tier-1 Domestic Content (DCR) Mono PERC & TopCon Solar Panels</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>25-Year Linear Power Warranty with European-grade On-Grid Inverters</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Average Return on Investment (ROI) in only 2.8 to 3.5 Years</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/solar/quotation"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Free Physical Site Inspection</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Embedded Advanced Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Interactive Rooftop Sizing
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            PM Surya Ghar Solar Rooftop Calculator
          </h2>
          <p className="text-sm text-slate-500">
            Enter your monthly electricity bill to calculate recommended system size, capital cost, government subsidy, and 25-year financial savings.
          </p>
        </div>

        <SolarCalculatorAdvanced />
      </section>
    </div>
  );
};
