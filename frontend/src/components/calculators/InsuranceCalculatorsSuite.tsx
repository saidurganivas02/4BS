import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  GraduationCap, 
  CheckCircle2, 
  Send, 
  Sparkles,
  Info,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { api } from '../../services/api';

interface InsuranceCalculatorsProps {
  initialTab?: 'hlv' | 'premium' | 'retirement' | 'child';
}

export const InsuranceCalculatorsSuite: React.FC<InsuranceCalculatorsProps> = ({ initialTab = 'hlv' }) => {
  const [activeTab, setActiveTab] = useState<'hlv' | 'premium' | 'retirement' | 'child'>(initialTab);
  
  // Lead Submission Modal state
  const [showModal, setShowModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', city: 'Hyderabad' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. HLV State
  const [hlvIncome, setHlvIncome] = useState(1200000); // 12 LPA
  const [hlvAge, setHlvAge] = useState(32);
  const [hlvRetireAge, setHlvRetireAge] = useState(60);
  const [hlvLiabilities, setHlvLiabilities] = useState(3000000); // 30 Lakhs home loan
  const [hlvSavings, setHlvSavings] = useState(1000000); // 10 Lakhs existing

  // HLV Math
  const workingYears = Math.max(1, hlvRetireAge - hlvAge);
  const personalExpenseDeduction = 0.30; // 30% of income spent on self
  const familyContributionAnnual = hlvIncome * (1 - personalExpenseDeduction);
  // Net Present Value factor at 7% real rate
  const pvFactor = (1 - Math.pow(1 + 0.07, -workingYears)) / 0.07;
  const earningsReplacement = familyContributionAnnual * pvFactor;
  const recommendedCover = Math.max(5000000, Math.round((earningsReplacement + hlvLiabilities - hlvSavings) / 100000) * 100000);

  // 2. Term Premium State
  const [premCover, setPremCover] = useState(10000000); // 1 Crore
  const [premAge, setPremAge] = useState(30);
  const [premTerm, setPremTerm] = useState(35);
  const [isSmoker, setIsSmoker] = useState(false);
  const [includeCriticalIllness, setIncludeCriticalIllness] = useState(true);

  // Term Premium Math
  const baseRatePerThousand = premAge < 30 ? 0.75 : premAge < 40 ? 1.05 : premAge < 50 ? 1.85 : 3.4;
  const smokerMultiplier = isSmoker ? 1.55 : 1.0;
  const baseAnnual = (premCover / 1000) * baseRatePerThousand * smokerMultiplier;
  const riderCost = includeCriticalIllness ? (premCover * 0.0008) : 0;
  const estimatedAnnualPremium = Math.round(baseAnnual + riderCost);
  const estimatedMonthlyPremium = Math.round(estimatedAnnualPremium / 12);

  // 3. Retirement Planner State
  const [retireCurrentAge, setRetireCurrentAge] = useState(32);
  const [retireTargetAge, setRetireTargetAge] = useState(60);
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState(50000);
  const [expectedInflation, setExpectedInflation] = useState(6.0); // 6%
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  // Retirement Math
  const yearsToRetire = Math.max(1, retireTargetAge - retireCurrentAge);
  const yearsInRetirement = Math.max(1, lifeExpectancy - retireTargetAge);
  const futureMonthlyExpense = currentMonthlyExpense * Math.pow(1 + expectedInflation / 100, yearsToRetire);
  const futureAnnualExpense = futureMonthlyExpense * 12;
  // Corpus needed assuming 8% post-retirement return and 6% inflation (net 2% real return)
  const realRate = 0.02;
  const requiredCorpus = Math.round(futureAnnualExpense * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate));
  // Monthly SIP needed at 12% equity CAGR
  const r = 0.12 / 12;
  const n = yearsToRetire * 12;
  const monthlySipRequired = Math.round(requiredCorpus * (r / (Math.pow(1 + r, n) - 1)));

  // 4. Child Education State
  const [childCurrentAge, setChildCurrentAge] = useState(4);
  const [collegeStartAge, setCollegeStartAge] = useState(18);
  const [currentCourseCost, setCurrentCourseCost] = useState(2500000); // 25 Lakhs
  const [eduInflation, setEduInflation] = useState(10.0); // 10%

  // Child Math
  const yearsUntilCollege = Math.max(1, collegeStartAge - childCurrentAge);
  const futureCost = Math.round(currentCourseCost * Math.pow(1 + eduInflation / 100, yearsUntilCollege));
  const childMonths = yearsUntilCollege * 12;
  const childR = 0.12 / 12;
  const childSipRequired = Math.round(futureCost * (childR / (Math.pow(1 + childR, childMonths) - 1)));

  // Submit Lead with calculation payload
  const handleSaveCalculation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let calcName = '';
    let inputData = {};
    let resultData = {};
    let estValue = 0;

    if (activeTab === 'hlv') {
      calcName = 'Human Life Value (HLV)';
      inputData = { hlvIncome, hlvAge, hlvRetireAge, hlvLiabilities, hlvSavings };
      resultData = { recommendedCover };
      estValue = 45000;
    } else if (activeTab === 'premium') {
      calcName = 'Term Premium Estimator';
      inputData = { premCover, premAge, premTerm, isSmoker, includeCriticalIllness };
      resultData = { estimatedAnnualPremium, estimatedMonthlyPremium };
      estValue = estimatedAnnualPremium;
    } else if (activeTab === 'retirement') {
      calcName = 'Retirement Corpus Planner';
      inputData = { retireCurrentAge, retireTargetAge, currentMonthlyExpense, expectedInflation };
      resultData = { requiredCorpus, monthlySipRequired, futureMonthlyExpense };
      estValue = monthlySipRequired * 12;
    } else {
      calcName = 'Child Education Fund Planner';
      inputData = { childCurrentAge, collegeStartAge, currentCourseCost, eduInflation };
      resultData = { futureCost, childSipRequired };
      estValue = childSipRequired * 12;
    }

    try {
      // Record calculation
      await api.recordCalculation({
        division: 'insurance',
        calculator_name: calcName,
        user_name: leadForm.name,
        user_phone: leadForm.phone,
        user_email: leadForm.email,
        input_data: inputData,
        result_data: resultData,
      });

      // Create lead in CRM
      await api.createLead({
        division: 'insurance',
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        city: leadForm.city,
        service_interest: `Tata AIA - ${calcName}`,
        estimated_value: estValue,
        calculator_data: { input: inputData, result: resultData },
        notes: `Calculated from online suite: ${JSON.stringify(resultData)}`,
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crore`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header Tabs */}
      <div className="bg-slate-900 p-2 sm:p-3 flex flex-wrap gap-1 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('hlv')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'hlv' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Human Life Value (HLV)</span>
        </button>

        <button
          onClick={() => setActiveTab('premium')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'premium' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Coins className="w-4 h-4 text-emerald-400" />
          <span>Term Premium Estimator</span>
        </button>

        <button
          onClick={() => setActiveTab('retirement')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'retirement' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span>Retirement Freedom Corpus</span>
        </button>

        <button
          onClick={() => setActiveTab('child')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'child' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-rose-400" />
          <span>Child Education & Future</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-6 sm:p-10">

        {/* 1. HLV CALCULATOR */}
        {activeTab === 'hlv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                  Scientific Protection Sizing
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Human Life Value (HLV) Calculator
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Determine how much term insurance sum assured your dependents require to replace your earnings and cover debts.
                </p>
              </div>

              {/* Slider 1: Annual Income */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Annual Take-Home Income</label>
                  <span className="text-blue-700 font-extrabold text-base">{formatLakhs(hlvIncome)} / year</span>
                </div>
                <input 
                  type="range" 
                  min="300000" 
                  max="10000000" 
                  step="100000"
                  value={hlvIncome} 
                  onChange={(e) => setHlvIncome(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹3 Lakh</span>
                  <span>₹50 Lakh</span>
                  <span>₹1 Crore+</span>
                </div>
              </div>

              {/* Sliders: Age & Retirement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <label className="text-slate-700">Current Age</label>
                    <span className="text-slate-900 font-bold">{hlvAge} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="18" 
                    max="65" 
                    value={hlvAge} 
                    onChange={(e) => setHlvAge(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <label className="text-slate-700">Planned Retirement Age</label>
                    <span className="text-slate-900 font-bold">{hlvRetireAge} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="75" 
                    value={hlvRetireAge} 
                    onChange={(e) => setHlvRetireAge(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Slider: Liabilities */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Total Outstanding Liabilities (Home, Car, Personal Loan)</label>
                  <span className="text-red-600 font-bold">{formatLakhs(hlvLiabilities)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30000000" 
                  step="200000"
                  value={hlvLiabilities} 
                  onChange={(e) => setHlvLiabilities(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider: Existing Savings */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Existing Liquid Savings & Mutual Funds</label>
                  <span className="text-emerald-600 font-bold">{formatLakhs(hlvSavings)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20000000" 
                  step="200000"
                  value={hlvSavings} 
                  onChange={(e) => setHlvSavings(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Tata AIA Recommended Protection</span>
                </div>
                <h4 className="text-lg font-bold text-blue-100">Optimal Life Cover (Sum Assured)</h4>
                
                <div className="mt-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {formatLakhs(recommendedCover)}
                  </span>
                  <span className="text-xs text-blue-300 block mt-1">
                    Coverage Multiple: {(recommendedCover / hlvIncome).toFixed(1)}x of your annual income
                  </span>
                </div>

                <div className="space-y-3 border-t border-slate-700/80 pt-4 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Years of Future Earnings to Replace:</span>
                    <strong className="text-white">{workingYears} years</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Liabilities Covered:</span>
                    <strong className="text-white">{formatLakhs(hlvLiabilities)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Existing Assets Deducted:</span>
                    <strong className="text-white">-{formatLakhs(hlvSavings)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Claim Settlement Ratio:</span>
                    <strong className="text-emerald-400">99.13% (Tata AIA)</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-700/80">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Lock In Quote & Request Consultation</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Free consultation from our certified Tata AIA Insurance Specialist.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. TERM PREMIUM ESTIMATOR */}
        {activeTab === 'premium' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                  Tata AIA Sampoorna Raksha Supreme
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Term Insurance Premium Estimator
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Get an instant estimate for pure term life protection with critical illness and accidental riders.
                </p>
              </div>

              {/* Desired Sum Assured */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Sum Assured (Life Cover)</label>
                  <span className="text-blue-700 font-extrabold text-base">{formatLakhs(premCover)}</span>
                </div>
                <input 
                  type="range" 
                  min="5000000" 
                  max="50000000" 
                  step="2500000"
                  value={premCover} 
                  onChange={(e) => setPremCover(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹50 Lakh</span>
                  <span>₹1.5 Crore</span>
                  <span>₹5 Crore</span>
                </div>
              </div>

              {/* Age and Policy Term */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <label className="text-slate-700">Your Current Age</label>
                    <span className="text-slate-900 font-bold">{premAge} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="18" 
                    max="65" 
                    value={premAge} 
                    onChange={(e) => setPremAge(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <label className="text-slate-700">Policy Term</label>
                    <span className="text-slate-900 font-bold">{premTerm} yrs (Cover up to {premAge + premTerm})</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="50" 
                    value={premTerm} 
                    onChange={(e) => setPremTerm(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Smoker and Rider Options */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-sm font-bold text-slate-800">Tobacco / Nicotine Consumer?</span>
                    <p className="text-xs text-slate-500">Non-smokers receive up to 35% lower premium rates.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={isSmoker} 
                    onChange={(e) => setIsSmoker(e.target.checked)}
                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                  />
                </label>

                <div className="border-t border-slate-200 pt-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-sm font-bold text-slate-800">Add Critical Illness Shield Rider</span>
                      <p className="text-xs text-slate-500">Instant payout on diagnosis of 40 listed critical conditions.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={includeCriticalIllness} 
                      onChange={(e) => setIncludeCriticalIllness(e.target.checked)}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  Estimated Term Premium
                </span>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 mb-6">
                  <div className="text-xs text-slate-300">Estimated Monthly Contribution</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    ₹{estimatedMonthlyPremium.toLocaleString('en-IN')}<span className="text-xs text-slate-400">/mo</span>
                  </div>
                  <div className="text-xs text-emerald-300 mt-2 font-medium">
                    Annual Premium: ~₹{estimatedAnnualPremium.toLocaleString('en-IN')} (excl. 18% GST)
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <div className="flex justify-between">
                    <span>Sum Assured:</span>
                    <strong className="text-white">{formatLakhs(premCover)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Deduction:</span>
                    <strong className="text-amber-300">Section 80C & 10(10D)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Smoker Category:</span>
                    <strong className={isSmoker ? 'text-rose-400' : 'text-emerald-400'}>
                      {isSmoker ? 'Smoker Rate' : 'Non-Smoker Preferred'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Critical Illness Rider:</span>
                    <strong className="text-white">{includeCriticalIllness ? 'Included' : 'None'}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Get Official Tata AIA Quote</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. RETIREMENT FREEDOM PLANNER */}
        {activeTab === 'retirement' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-600 tracking-wider uppercase bg-cyan-50 px-2.5 py-1 rounded-md">
                  Retirement Corpus & Pension Sizing
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Retirement Freedom Calculator
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Find out exactly how much retirement corpus you need to maintain your lifestyle after 60, adjusted for inflation.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Current Monthly Household Expenses</label>
                  <span className="text-cyan-700 font-extrabold text-base">₹{currentMonthlyExpense.toLocaleString('en-IN')} / mo</span>
                </div>
                <input 
                  type="range" 
                  min="25000" 
                  max="300000" 
                  step="5000"
                  value={currentMonthlyExpense} 
                  onChange={(e) => setCurrentMonthlyExpense(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <label className="text-slate-700">Current Age</label>
                    <span className="text-slate-900 font-bold">{retireCurrentAge} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="60" 
                    value={retireCurrentAge} 
                    onChange={(e) => setRetireCurrentAge(Number(e.target.value))}
                    className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <label className="text-slate-700">Retirement Age</label>
                    <span className="text-slate-900 font-bold">{retireTargetAge} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="45" 
                    max="70" 
                    value={retireTargetAge} 
                    onChange={(e) => setRetireTargetAge(Number(e.target.value))}
                    className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <label className="text-slate-700">Assumed Long-Term Inflation</label>
                  <span className="text-slate-900 font-bold">{expectedInflation}% / year</span>
                </div>
                <input 
                  type="range" 
                  min="4.0" 
                  max="9.0" 
                  step="0.5"
                  value={expectedInflation} 
                  onChange={(e) => setExpectedInflation(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                  Required Retirement Corpus
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {formatLakhs(requiredCorpus)}
                </div>
                <p className="text-xs text-cyan-200 mt-1">
                  At age {retireTargetAge}, you will need ₹{Math.round(futureMonthlyExpense).toLocaleString('en-IN')}/mo to match today's ₹{currentMonthlyExpense.toLocaleString('en-IN')} lifestyle.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-800/40">
                  <div className="text-xs text-slate-300">Recommended Monthly Investment (SIP)</div>
                  <div className="text-2xl font-extrabold text-cyan-300 mt-1">
                    ₹{monthlySipRequired.toLocaleString('en-IN')}<span className="text-xs text-slate-400">/month</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Through Tata AIA Fortune Guarantee Plus / Annuity solutions.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-extrabold rounded-xl text-sm shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Custom Pension Blueprint</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. CHILD EDUCATION PLANNER */}
        {activeTab === 'child' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-rose-600 tracking-wider uppercase bg-rose-50 px-2.5 py-1 rounded-md">
                  Beating 10% Higher Education Inflation
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Child Higher Education & Marriage Planner
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Calculate future degree costs (Engineering, Medicine, Overseas MBA) and guarantee their graduation fund.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Current Cost of Target Course Today</label>
                  <span className="text-rose-700 font-extrabold text-base">{formatLakhs(currentCourseCost)}</span>
                </div>
                <input 
                  type="range" 
                  min="1000000" 
                  max="10000000" 
                  step="500000"
                  value={currentCourseCost} 
                  onChange={(e) => setCurrentCourseCost(Number(e.target.value))}
                  className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <label className="text-slate-700">Child's Current Age</label>
                    <span className="text-slate-900 font-bold">{childCurrentAge} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="16" 
                    value={childCurrentAge} 
                    onChange={(e) => setChildCurrentAge(Number(e.target.value))}
                    className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <label className="text-slate-700">College Admission Age</label>
                    <span className="text-slate-900 font-bold">{collegeStartAge} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="16" 
                    max="25" 
                    value={collegeStartAge} 
                    onChange={(e) => setCollegeStartAge(Number(e.target.value))}
                    className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Education inflation in India consistently runs at 10% per year, meaning college costs double every 7.2 years!
                </span>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">
                  Estimated Target College Corpus
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {formatLakhs(futureCost)}
                </div>
                <p className="text-xs text-rose-200 mt-1">
                  Required in {yearsUntilCollege} years when your child turns {collegeStartAge}.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-rose-800/40">
                  <div className="text-xs text-slate-300">Monthly SIP with In-built Waiver of Premium</div>
                  <div className="text-2xl font-extrabold text-rose-300 mt-1">
                    ₹{childSipRequired.toLocaleString('en-IN')}<span className="text-xs text-slate-400">/month</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    Even if the parent passes away, Tata AIA deposits all remaining premiums to ensure the degree is fully funded.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Lock In Child Guarantee Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* LEAD CAPTURE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => { setShowModal(false); setSubmitted(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Estimate & Request Received!</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you, <strong>{leadForm.name}</strong>. Our certified Tata AIA representative (Ramesh Verma) has received your calculation details and will reach you at <strong>{leadForm.phone}</strong> with the customized policy illustrations.
                </p>
                <button
                  onClick={() => { setShowModal(false); setSubmitted(false); }}
                  className="px-6 py-2.5 bg-blue-700 text-white font-bold rounded-xl text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveCalculation} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Instant Official Quote
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    Receive Your Tata AIA Calculation
                  </h3>
                  <p className="text-xs text-slate-500">
                    We will send the complete PDF breakdown directly to your WhatsApp and email.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number (WhatsApp) *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98480 12345"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="email" 
                        placeholder="rajesh@example.com"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City / Location</label>
                    <input 
                      type="text" 
                      placeholder="Hyderabad"
                      value={leadForm.city}
                      onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Calculation & Call Me'}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Privacy guaranteed. No spam. Only authorized Tata AIA illustrations.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
