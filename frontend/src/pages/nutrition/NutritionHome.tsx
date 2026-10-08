import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Droplet, 
  PieChart, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  PhoneCall,
  Activity,
  Heart,
  Sparkles,
  Info
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { NutritionCalculatorsSuite } from '../../components/calculators/NutritionCalculatorsSuite';
import { PageMeta } from '../../components/common/PageMeta';
import { HerbalifeLogo } from '../../components/common/HerbalifeLogo';

export const NutritionHome: React.FC = () => {
  return (
    <div>
      <PageMeta 
        title="Herbalife Nutrition & Cellular Wellness Coaching" 
        description="Personalized Formula 1 meal programs, BMI & BMR body composition profiling, and certified coaching." 
      />
      <DivisionNav division="nutrition" />

      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-slate-50/40 to-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <HerbalifeLogo variant="badge" size="md" className="shadow-sm" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <HerbalifeLogo variant="icon" size="xs" />
                <span>Herbalife Independent Associate & Wellness Coaching</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Fuel Your Cells. Transform Your Health & Lifestyle.
            </h1>

            <p className="text-base text-slate-600 max-w-xl leading-relaxed">
              Experience the power of science-backed cellular nutrition. Combining delicious Formula 1 protein meal shakes, botanical energy teas, and personal 1-on-1 coaching for sustainable weight management and vitality.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/nutrition/calculators"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-sm flex items-center gap-2 transition"
              >
                <Calculator className="w-4 h-4 text-emerald-200" />
                <span>Calculate Your BMI & Calories</span>
              </Link>
              <Link
                to="/nutrition/products"
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-sm border border-slate-300 transition flex items-center gap-2 shadow-sm"
              >
                <span>Explore Nutrition Programs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Client Success Stories</span>
                <span className="text-3xl font-extrabold text-emerald-700">1,500+</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Activity className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>80% Balanced Nutrition + 20% Physical Activity lifestyle philosophy</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Formulated with 21 essential micronutrients and bioavailable protein</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dedicated weekly progress monitoring by Coach Sunita Rao</span>
              </div>
            </div>

            {/* Non-medical disclaimer notice */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Disclaimer: Herbalife products are dietary supplements to support general wellness. They do not diagnose, treat, cure, or prevent any illness or disease.
              </span>
            </div>

            <div className="pt-1">
              <Link
                to="/contact?division=nutrition"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Claim Free 1-on-1 Wellness Evaluation</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Embedded Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Interactive Diagnostics
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Body Composition & Nutrition Calculators
          </h2>
          <p className="text-sm text-slate-500">
            Check your BMI, calculate your Basal Metabolic Rate (BMR), determine your hydration goals, and plan your protein split.
          </p>
        </div>

        <NutritionCalculatorsSuite />
      </section>
    </div>
  );
};
