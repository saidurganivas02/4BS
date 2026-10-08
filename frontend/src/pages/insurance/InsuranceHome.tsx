import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Coins, 
  TrendingUp, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  PhoneCall,
  Lock,
  HeartHandshake
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { InsuranceCalculatorsSuite } from '../../components/calculators/InsuranceCalculatorsSuite';
import { PageMeta } from '../../components/common/PageMeta';

export const InsuranceHome: React.FC = () => {
  return (
    <div>
      <PageMeta 
        title="Tata AIA Life Insurance Plans & Wealth Solutions" 
        description="Term Life Insurance, Savings & Guaranteed Income Plans with 99.13% claim settlement ratio." 
      />
      <DivisionNav division="insurance" />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Tata AIA Authorized Life Insurance Advisory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Airtight Financial Protection for Your Family's Future
            </h1>

            <p className="text-base text-slate-600 max-w-xl leading-relaxed">
              Backed by Tata's 150-year legacy of trust and AIA's pan-Asian insurance leadership. Featuring an industry-leading <strong className="text-slate-900">99.13% Claim Settlement Ratio</strong>, comprehensive living benefits, and tax-free guaranteed returns.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/insurance/calculators"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm flex items-center gap-2 transition"
              >
                <Calculator className="w-4 h-4 text-blue-200" />
                <span>Calculate Your HLV Cover</span>
              </Link>
              <Link
                to="/insurance/plans"
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-sm border border-slate-300 transition flex items-center gap-2 shadow-sm"
              >
                <span>View All Insurance Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Individual Claim Settlement Ratio</span>
                <span className="text-3xl font-extrabold text-blue-700">99.13%</span>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
                <Award className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Express Claim Settlement in under 4 hours for eligible policies</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Coverage available up to age 100 with whole-life options</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Tax exemption under Section 80C and Section 10(10D) of Income Tax Act</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Direct advisory by Certified Life Insurance Consultant Ramesh Verma</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact?division=insurance"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Book 1-on-1 Policy Consultation</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Embedded Calculators Suite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Interactive Estimators
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Tata AIA Insurance Calculators Suite
          </h2>
          <p className="text-sm text-slate-500">
            Calculate your Human Life Value, estimate monthly term premiums, or size your retirement corpus instantly.
          </p>
        </div>

        <InsuranceCalculatorsSuite />
      </section>

      {/* Featured Policy Categories */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Product Portfolio
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Popular Tata AIA Protection & Wealth Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 w-max mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Sampoorna Raksha Supreme</h3>
                <p className="text-xs text-slate-500 mt-1">Pure Term Life Protection</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Tailor-made life insurance cover up to ₹5 Crore+ with living benefits against 40 critical illnesses and return of premium options.
                </p>
              </div>
              <Link to="/insurance/plans" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 mt-4">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 w-max mb-4">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Fortune Guarantee Plus</h3>
                <p className="text-xs text-slate-500 mt-1">Guaranteed Savings & Income</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Lock in guaranteed, tax-free annual income or lump sum payouts backed by Tata AIA’s highest AAA financial stability.
                </p>
              </div>
              <Link to="/insurance/plans" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 mt-4">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-rose-50 text-rose-700 w-max mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Child Future Guarantee</h3>
                <p className="text-xs text-slate-500 mt-1">Higher Education & Marriage</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  In-built Waiver of Premium guarantees college degree funds even in the absence of the parent.
                </p>
              </div>
              <Link to="/insurance/plans" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 mt-4">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-700 w-max mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Retirement Annuity Plan</h3>
                <p className="text-xs text-slate-500 mt-1">Lifelong Guaranteed Pension</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Guaranteed monthly income for life with optional spouse continuation and return of purchase price.
                </p>
              </div>
              <Link to="/insurance/plans" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 mt-4">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
