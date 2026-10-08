import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Calendar, 
  PhoneCall,
  ShieldCheck,
  Zap,
  Trash2
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { KangenCalculatorsSuite } from '../../components/calculators/KangenCalculatorsSuite';
import { PageMeta } from '../../components/common/PageMeta';

export const KangenHome: React.FC = () => {
  return (
    <div>
      <PageMeta 
        title="Enagic Kangen Water® • Japanese Hydrogen Water Ionizers" 
        description="Medical device grade Japanese water ionization technology: active molecular hydrogen, negative ORP, and micro-clustered water." 
      />
      <DivisionNav division="kangen" />

      {/* Hero */}
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50/70 via-slate-50/40 to-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-200 text-xs font-semibold">
              <Droplets className="w-4 h-4 text-cyan-700" />
              <span>Enagic® Co., Ltd. Tokyo Japan • Certified Medical Device</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Change Your Water.<br />
              <span className="text-cyan-700">Change Your Life.</span>
            </h1>

            <p className="text-base text-slate-600 max-w-xl leading-relaxed">
              Experience electrolyzed hydrogen-rich alkaline water produced through medical-grade solid platinum-dipped titanium plates. Enjoy potent negative ORP (-850mV) antioxidant power and 5 functional water types for whole-family vitality.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/kangen/demo"
                className="px-6 py-3.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl text-sm shadow-sm flex items-center gap-2 transition"
              >
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span>Book Free In-Home Live Demo</span>
              </Link>
              <Link
                to="/kangen/technology"
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-sm border border-slate-300 transition flex items-center gap-2 shadow-sm"
              >
                <span>Discover 5 Types of Water</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Antioxidant Oxidation Potential</span>
                <span className="text-3xl font-extrabold text-cyan-700">Up to -850 mV</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                <Zap className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span>Certified Medical Device Manufacturer by Japan's MHLW (ISO 13485)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span>Micro-clustered water hexagonal structure for 6x faster cellular absorption</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span>Strong Kangen (pH 11.5) washes oil-based chemical pesticides off produce</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span>Eliminates single-use bottled water, saving ₹3-5 Lakhs over 10 years</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/kangen/calculators"
                className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Water Sizing & Savings</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Embedded Calculators & Demo Suite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
            Savings & Sizing Tools
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Kangen Water Calculators & Demo System
          </h2>
          <p className="text-sm text-slate-500">
            Calculate how many thousands of plastic bottles your household can eliminate, discover 10-year financial savings, or book a live in-home tasting demo.
          </p>
        </div>

        <KangenCalculatorsSuite />
      </section>

      {/* 3 Golden Properties Section */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full">
              The Scientific Distinction
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              The Three Golden Properties of Kangen Water
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-black text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Potent Anti-Oxidation (-ORP)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard tap and bottled water have positive ORP (+200mV to +400mV), accelerating bodily oxidation. Fresh Kangen water carries up to -850mV negative charge, neutralizing free radicals naturally.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-black text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Hexagonal Micro-Clustering</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Electrolysis reduces water molecule clusters from 15-20 molecules down to 5-6 hexagonal clusters. This allows immediate cellular permeability, eliminating stomach bloating after drinking.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-black text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">Active Molecular Hydrogen (H2)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rich in dissolved molecular hydrogen, the smallest element in the universe. H2 crosses the blood-brain barrier to reduce inflammation and support mitochondrial ATP energy synthesis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
