import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Coins, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Send,
  Calculator,
  Award,
  Sparkles,
  Phone,
  User,
  Mail,
  X,
  HeartHandshake
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { api } from '../../services/api';

export const InsurancePlans: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quoteModalPlan, setQuoteModalPlan] = useState<string | null>(null);
  
  // Quote form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    age: '32',
    income: '1500000',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const plans = [
    {
      id: 'sampoorna-raksha',
      title: 'Tata AIA Sampoorna Raksha Supreme',
      category: 'Pure Term Protection',
      categoryKey: 'term',
      cover: 'Up to ₹10 Crore+',
      tenure: 'Up to 100 Years of Age',
      tag: 'Most Popular for Family Security',
      highlights: [
        'Choice of 4 death benefit payout options (Lump sum, monthly income, or combination)',
        'In-built Critical Illness Shield covering 40 critical conditions',
        'Option for Return of Premium (ROP) at maturity',
        'Special premium discount for female lives & non-tobacco users',
      ],
      idealFor: 'Salaried professionals, business founders, and family breadwinners.',
      calcTab: 'premium',
      minEntryAge: '18 Years',
      maxMaturityAge: '100 Years',
      taxBenefit: 'Section 80C & 10(10D)',
    },
    {
      id: 'fortune-guarantee-plus',
      title: 'Tata AIA Fortune Guarantee Plus',
      category: 'Guaranteed Return Savings',
      categoryKey: 'savings',
      cover: '10x to 15x Annual Premium',
      tenure: '5 to 45 Years Payout Horizon',
      tag: '100% Capital & Return Guarantee',
      highlights: [
        '100% Guaranteed Annual or Monthly Income immune to market crashes',
        'Choice between Regular Income or Long Term Income up to 45 years',
        'Complete Return of Premium at the end of income payout period',
        'Full tax-free maturity proceeds under Section 10(10D)',
      ],
      idealFor: 'Conservative savers seeking better guaranteed returns than traditional bank FDs.',
      calcTab: 'retirement',
      minEntryAge: '1 Year',
      maxMaturityAge: '77 Years',
      taxBenefit: 'Section 80C & 10(10D)',
    },
    {
      id: 'child-future-degree',
      title: 'Tata AIA Child Future Degree Guarantee',
      category: 'Child Higher Education & Marriage',
      categoryKey: 'child',
      cover: 'Guaranteed University Fund',
      tenure: 'Matures at Age 18, 21, or 25',
      tag: 'Built-in Waiver of Premium (WOP)',
      highlights: [
        'Waiver of Premium (WOP) ensures deposits continue if parent passes away',
        'Milestone cash bonuses timed with graduation matriculation',
        'Beats 10% annual higher education inflation',
        'Tax deduction on premium under Section 80C',
      ],
      idealFor: 'Parents with young children aged 0 to 14 planning engineering/medical degrees.',
      calcTab: 'child',
      minEntryAge: '0 Years (Child)',
      maxMaturityAge: '25 Years',
      taxBenefit: 'Section 80C & 10(10D)',
    },
    {
      id: 'smart-annuity',
      title: 'Tata AIA Smart Annuity Plan',
      category: 'Retirement & Guaranteed Lifetime Pension',
      categoryKey: 'retirement',
      cover: 'Lifelong Annuity',
      tenure: 'Lifelong for Single or Joint Life',
      tag: 'Guaranteed Rate Locked for Life',
      highlights: [
        'Guaranteed lifelong pension rate fixed at entry date',
        'Option for joint life annuity with 100% pension continuation for spouse',
        'Return of Purchase Price (ROP) returned to legal heirs upon demise',
        'Immediate annuity or deferred annuity up to 10 years',
      ],
      idealFor: 'Individuals aged 45 to 70 desiring guaranteed peaceful retirement cashflow.',
      calcTab: 'retirement',
      minEntryAge: '45 Years',
      maxMaturityAge: 'Whole Life',
      taxBenefit: 'Section 80CCC & 10(10A)',
    },
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? plans 
    : plans.filter(p => p.categoryKey === selectedCategory);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await api.createLead({
        division: 'insurance',
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        city: formData.city,
        service_interest: `Tata AIA Quote: ${quoteModalPlan || 'General Plan'}`,
        status: 'new',
        estimated_value: 2500000,
        notes: `Age: ${formData.age}, Annual Income: ₹${Number(formData.income).toLocaleString('en-IN')}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <DivisionNav division="insurance" />

      {/* Header */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Tata AIA Life Insurance Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Comprehensive Life & Wealth Protection
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Carefully curated pure term protection, guaranteed wealth accumulation, and retirement pension plans backed by an industry-leading <strong className="text-white">99.13% Claim Settlement Ratio</strong>.
          </p>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-blue-400">99.13%</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Individual Claim Ratio</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-emerald-400">&lt; 4 Hours</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Express Settlement SLA</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-amber-400">1.90x</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Solvency Ratio (vs 1.50)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-purple-400">150+ Years</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Tata Group Heritage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* View Mode Toggle & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { key: 'all', label: 'All Insurance Solutions' },
              { key: 'term', label: 'Pure Term Protection' },
              { key: 'savings', label: 'Guaranteed Savings' },
              { key: 'child', label: 'Child Education Plans' },
              { key: 'retirement', label: 'Retirement & Annuity' },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat.key
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick HLV Rule of thumb badge */}
          <div className="hidden lg:flex items-center gap-2 bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs text-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">Recommended Cover: 15x to 20x of Annual Gross Income</span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPlans.map((p) => (
            <div 
              key={p.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {p.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Tenure: {p.tenure}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition">
                  {p.title}
                </h3>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    Cover: {p.cover}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    {p.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-4 font-medium leading-relaxed">
                  <strong className="text-slate-900">Best Suited For:</strong> {p.idealFor}
                </p>

                {/* Plan Highlights */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                    Key Policy Benefits
                  </span>
                  <ul className="space-y-2.5">
                    {p.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications Bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-semibold">Min Entry Age</span>
                    <span className="font-bold text-slate-800">{p.minEntryAge}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Tax Exemption</span>
                    <span className="font-bold text-slate-800">{p.taxBenefit}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to={`/insurance/calculators?tab=${p.calcTab}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Estimate Premium / SIP</span>
                </Link>

                <button
                  onClick={() => {
                    setQuoteModalPlan(p.title);
                    setSubmitted(false);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
                >
                  <span>Request Official Illustration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              Side-by-Side Evaluation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Tata AIA Plan Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Compare primary benefits, risk coverage, and maturity payouts to find the right match for your financial portfolio.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="p-4 font-bold text-slate-500 uppercase tracking-wider">Features & Benefits</th>
                  <th className="p-4 font-bold text-blue-900">Sampoorna Raksha</th>
                  <th className="p-4 font-bold text-indigo-900">Fortune Guarantee</th>
                  <th className="p-4 font-bold text-purple-900">Child Future Degree</th>
                  <th className="p-4 font-bold text-cyan-900">Smart Annuity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Primary Objective</td>
                  <td className="p-4">Pure Family Protection</td>
                  <td className="p-4">Guaranteed Wealth Return</td>
                  <td className="p-4">Higher Education Milestone</td>
                  <td className="p-4">Lifelong Guaranteed Pension</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Life Cover Sizing</td>
                  <td className="p-4 font-semibold text-blue-700">Up to ₹10 Crore+</td>
                  <td className="p-4">10x - 15x Annual Premium</td>
                  <td className="p-4">Targeted Degree Corpus</td>
                  <td className="p-4">Purchase Price Return</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Market Risk</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Zero Risk</span></td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">100% Guaranteed</span></td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Inflation Beat Guarantee</span></td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Fixed Lifetime Rate</span></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Return of Premium (ROP)</td>
                  <td className="p-4 text-emerald-700 font-semibold">Available Optional</td>
                  <td className="p-4 text-emerald-700 font-semibold">Included 100%</td>
                  <td className="p-4 text-emerald-700 font-semibold">Included in Maturity</td>
                  <td className="p-4 text-emerald-700 font-semibold">100% ROP to Nominees</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Critical Illness Rider</td>
                  <td className="p-4 text-blue-600 font-medium">40 Illnesses Covered</td>
                  <td className="p-4 text-blue-600 font-medium">Optional Rider</td>
                  <td className="p-4 text-blue-600 font-medium">Built-in Waiver (WOP)</td>
                  <td className="p-4 text-slate-400">Not Applicable</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Income Tax Benefits</td>
                  <td className="p-4 font-bold text-emerald-700">Sec 80C & 10(10D)</td>
                  <td className="p-4 font-bold text-emerald-700">Sec 80C & 10(10D)</td>
                  <td className="p-4 font-bold text-emerald-700">Sec 80C & 10(10D)</td>
                  <td className="p-4 font-bold text-emerald-700">Sec 80CCC & 10(10A)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Action</td>
                  <td className="p-4">
                    <button
                      onClick={() => { setQuoteModalPlan('Tata AIA Sampoorna Raksha Supreme'); setSubmitted(false); }}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                      Get Quote
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => { setQuoteModalPlan('Tata AIA Fortune Guarantee Plus'); setSubmitted(false); }}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
                    >
                      Get Quote
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => { setQuoteModalPlan('Tata AIA Child Future Degree Guarantee'); setSubmitted(false); }}
                      className="px-3 py-1.5 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
                    >
                      Get Quote
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => { setQuoteModalPlan('Tata AIA Smart Annuity Plan'); setSubmitted(false); }}
                      className="px-3 py-1.5 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 transition"
                    >
                      Get Quote
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Rider & Add-on Shields Section */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-blue-900/40 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider bg-blue-800/40 px-3 py-1 rounded-full">
              Comprehensive Riders
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Elevate Your Policy with Powerful Shield Riders
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Customize your policy to safeguard against medical emergencies, critical diagnoses, and sudden accidents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:bg-white/10 transition">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">CritiCare Plus Rider</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Covers 40 major critical illnesses including cancer, heart attack, kidney failure, and stroke. Receives immediate lump-sum payout upon diagnosis regardless of hospital bill.
              </p>
              <div className="pt-2 text-xs font-bold text-rose-300">
                Lump sum up to ₹1 Crore on diagnosis
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:bg-white/10 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Accidental Death & Disability</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provides double sum assured (2x payout) in case of accidental demise or permanent total disability, providing emergency capital for your family.
              </p>
              <div className="pt-2 text-xs font-bold text-amber-300">
                2x Double Sum Assured Payout
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:bg-white/10 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Waiver of Premium (WOP) Plus</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If the policyholder encounters permanent disability or critical illness, all future premium installments are completely waived by Tata AIA while all policy benefits remain active!
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-300">
                100% Policy Continuation with Zero Deposit
              </div>
            </div>
          </div>
        </div>

        {/* Feature Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider bg-blue-800/60 px-3 py-1 rounded-full">
              Personalized Financial Underwriting
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Not sure which plan matches your Human Life Value?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Book a 1-on-1 confidential session with our Senior Tata AIA Insurance Specialists. We analyze your family liabilities, inflation rates, and retirement goals to prepare a customized advisory report.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/insurance/calculators"
              className="px-6 py-3.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-xs text-center shadow-lg transition"
            >
              Run Human Life Value Calculator
            </Link>
            <Link
              to="/contact?division=insurance"
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs text-center shadow-md transition"
            >
              Speak to Certified Advisor
            </Link>
          </div>
        </div>

      </div>

      {/* Quote / Illustration Modal */}
      {quoteModalPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setQuoteModalPlan(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
                Customized Quote
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Official Benefit Illustration
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Plan: <strong className="text-blue-600">{quoteModalPlan}</strong>
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">Illustration Request Received!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your customized Tata AIA proposal illustration and premium table will be shared with you on WhatsApp / Email shortly.
                </p>
                <button
                  onClick={() => setQuoteModalPlan(null)}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. anand@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Current Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Preparing Proposal...' : 'Get Official Illustration & Premium Quote'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
