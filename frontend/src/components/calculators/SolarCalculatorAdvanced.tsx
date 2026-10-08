import React, { useState } from 'react';
import { 
  SunMedium, 
  Zap, 
  TrendingUp, 
  Leaf, 
  ShieldCheck, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Info, 
  Building2, 
  Home, 
  ArrowRight,
  Phone,
  User,
  Mail,
  MapPin
} from 'lucide-react';
import { api } from '../../services/api';

export const SolarCalculatorAdvanced: React.FC = () => {
  // Input State
  const [monthlyBill, setMonthlyBill] = useState(6500); // ₹6,500/month
  const [stateDiscom, setStateDiscom] = useState('Telangana (TSSPDCL / TSNPDCL)');
  const [consumerType, setConsumerType] = useState<'residential' | 'commercial'>('residential');
  const [roofType, setRoofType] = useState('Flat RCC Concrete Terrace');

  // Modal State for Survey Booking
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [surveyForm, setSurveyForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    address: '',
    sanctionedLoad: '5 kW',
    roofArea: '600 sq.ft.',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Solar Math
  // Average residential tariff ~₹7.20 to ₹8.50 per unit across Indian slabs
  const avgTariffPerUnit = consumerType === 'residential' ? 7.5 : 9.5;
  const estimatedUnitsConsumedMonthly = Math.round(monthlyBill / avgTariffPerUnit);
  
  // 1 kW generates approx 125 units (kWh) per month in Indian conditions (4.2 - 4.5 peak sun hours)
  const exactKwNeeded = estimatedUnitsConsumedMonthly / 125;
  // Round to nearest integer (min 1kW, max 50kW)
  const systemSizeKw = Math.max(1, Math.min(50, Math.round(exactKwNeeded)));
  
  // Roof area required: ~90-100 sq ft per kW
  const roofAreaSqFt = systemSizeKw * 95;
  
  // Benchmark Capital Cost: approx ₹57,000 per kW for residential DCR systems
  const grossCapitalCost = systemSizeKw * 57000;

  // PM Surya Ghar Muft Bijli Yojana Central Subsidy
  let govSubsidy = 0;
  if (consumerType === 'residential') {
    if (systemSizeKw === 1) govSubsidy = 30000;
    else if (systemSizeKw === 2) govSubsidy = 60000;
    else if (systemSizeKw >= 3) govSubsidy = 78000; // Flat max subsidy under PM Surya Ghar
  }

  const netInvestmentCost = Math.max(0, grossCapitalCost - govSubsidy);

  // Monthly & Lifetime Generation & Savings
  const monthlyUnitsGenerated = systemSizeKw * 125;
  const annualUnitsGenerated = monthlyUnitsGenerated * 12;
  const estimatedAnnualSavings = Math.round(annualUnitsGenerated * avgTariffPerUnit);
  const estimatedMonthlySavings = Math.round(estimatedAnnualSavings / 12);
  
  // 25-Year Lifetime Savings (with 0.7% annual panel degradation)
  const lifetimeSavings = Math.round(estimatedAnnualSavings * 22.5); // Effective 22.5 multiplier
  
  // Payback period
  const paybackYears = Number((netInvestmentCost / estimatedAnnualSavings).toFixed(1));

  // Environmental Impact
  const co2OffsetTonsPerYear = Number((annualUnitsGenerated * 0.82 / 1000).toFixed(1));
  const treesPlantedEquivalent = Math.round(co2OffsetTonsPerYear * 45);

  const handleBookSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inputData = { monthlyBill, stateDiscom, consumerType, roofType, roofArea: surveyForm.roofArea };
    const resultData = { systemSizeKw, grossCapitalCost, govSubsidy, netInvestmentCost, estimatedAnnualSavings, paybackYears };

    try {
      // 1. Create Lead
      await api.createLead({
        division: 'solar',
        name: surveyForm.name,
        phone: surveyForm.phone,
        email: surveyForm.email,
        city: surveyForm.city,
        service_interest: `${systemSizeKw}kW Rooftop Solar (PM Surya Ghar)`,
        estimated_value: netInvestmentCost,
        calculator_data: { input: inputData, result: resultData },
        notes: `Bill: ₹${monthlyBill}, Roof: ${roofType}, Address: ${surveyForm.address}`,
      });

      // 2. Create Appointment
      const surveyDate = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
      await api.createAppointment({
        division: 'solar',
        customer_name: surveyForm.name,
        customer_phone: surveyForm.phone,
        customer_email: surveyForm.email,
        appointment_date: surveyDate,
        appointment_time: '11:00',
        service_type: `${systemSizeKw}kW Solar Rooftop Physical Shadow Analysis & DISCOM Inspection`,
        mode: 'in_person',
        location_or_link: `${surveyForm.address}, ${surveyForm.city}`,
        notes: `Roof area: ${surveyForm.roofArea}. Consumer load: ${surveyForm.sanctionedLoad}`,
      });

      // 3. Record calculation
      await api.recordCalculation({
        division: 'solar',
        calculator_name: 'PM Surya Ghar Solar Rooftop Calculator',
        user_name: surveyForm.name,
        user_phone: surveyForm.phone,
        user_email: surveyForm.email,
        input_data: inputData,
        result_data: resultData,
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
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200 bg-amber-950/40 px-3 py-1 rounded-full w-max">
              <SunMedium className="w-4 h-4 text-amber-300" />
              <span>National Solar Rooftop Portal Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
              Solar Savings & PM Surya Ghar Subsidy Estimator
            </h2>
            <p className="text-sm text-amber-100 mt-1 max-w-xl">
              Get an instant engineering & financial estimate for your home or commercial rooftop with direct government DBT subsidy up to ₹78,000.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl text-center shrink-0">
            <span className="text-[11px] font-bold text-amber-200 block uppercase">Govt Central Subsidy</span>
            <span className="text-2xl font-black text-white">Up to ₹78,000</span>
            <span className="text-[10px] text-amber-200 block mt-0.5">Direct to Bank Account</span>
          </div>
        </div>
      </div>

      {/* Main Form & Calculation Grid */}
      <div className="p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Monthly Bill Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-800">Average Monthly Electricity Bill</label>
                <span className="text-amber-600 font-extrabold text-xl">
                  ₹{monthlyBill.toLocaleString('en-IN')} <span className="text-xs text-slate-500 font-normal">/ month</span>
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="500"
                value={monthlyBill} 
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₹1,000/mo</span>
                <span>₹25,000/mo</span>
                <span>₹50,000/mo</span>
              </div>
              <p className="text-xs text-slate-500">
                Estimated consumption: <strong>~{estimatedUnitsConsumedMonthly} units (kWh)</strong> per month.
              </p>
            </div>

            {/* State / DISCOM Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">State & Electricity Distribution Company (DISCOM)</label>
              <select
                value={stateDiscom}
                onChange={(e) => setStateDiscom(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="Telangana (TSSPDCL / TSNPDCL)">Telangana (TSSPDCL / TSNPDCL)</option>
                <option value="Andhra Pradesh (APEPDCL / APSPDCL / APCPDCL)">Andhra Pradesh (APEPDCL / APSPDCL / APCPDCL)</option>
                <option value="Maharashtra (MSEDCL / Adani / Tata Power)">Maharashtra (MSEDCL / Adani / Tata Power)</option>
                <option value="Delhi (BSES Rajdhani / Yamuna / TPDDL)">Delhi (BSES Rajdhani / Yamuna / TPDDL)</option>
                <option value="Karnataka (BESCOM / MESCOM / HESCOM)">Karnataka (BESCOM / MESCOM / HESCOM)</option>
                <option value="Tamil Nadu (TANGEDCO)">Tamil Nadu (TANGEDCO)</option>
                <option value="Other States (National Solar Portal)">Other States (National Solar Portal)</option>
              </select>
            </div>

            {/* Consumer Type & Roof Structure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Property Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsumerType('residential')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-bold transition ${
                      consumerType === 'residential' 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Residential</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsumerType('commercial')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-bold transition ${
                      consumerType === 'commercial' 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Commercial</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Roof Structure</label>
                <select
                  value={roofType}
                  onChange={(e) => setRoofType(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="Flat RCC Concrete Terrace">Flat RCC Concrete Terrace</option>
                  <option value="Elevated Super-Structure (Usable Roof)">Elevated Super-Structure (Usable Roof)</option>
                  <option value="Industrial Tin / Metal Shed">Industrial Tin / Metal Shed</option>
                  <option value="Tiled / Slanted Roof">Tiled / Slanted Roof</option>
                </select>
              </div>
            </div>

            {/* Environmental & Tech Specs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-950 block">Carbon Footprint Saved</span>
                  <span className="text-sm font-extrabold text-emerald-800">
                    {co2OffsetTonsPerYear} Tons CO₂ / yr
                  </span>
                  <span className="text-[10px] text-emerald-700 block">≈ {treesPlantedEquivalent} trees planted</span>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-800 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-950 block">Tier-1 Equipment</span>
                  <span className="text-sm font-extrabold text-blue-800">25-Yr Performance</span>
                  <span className="text-[10px] text-blue-700 block">DCR Mono PERC Panels</span>
                </div>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Recommended System Capacity
                </span>
                <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  On-Grid Net Metering
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white">{systemSizeKw} kW</span>
                <span className="text-xs text-slate-300">Rooftop Solar Plant</span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Requires approximately <strong>~{roofAreaSqFt} sq.ft.</strong> of shadow-free rooftop space.
              </p>

              {/* Cost and Subsidy Breakdown */}
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-amber-800/40 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Gross Capital Cost (Turnkey EPC):</span>
                  <strong className="text-white">₹{grossCapitalCost.toLocaleString('en-IN')}</strong>
                </div>

                {govSubsidy > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>PM Surya Ghar Govt Subsidy:</span>
                    <span>-₹{govSubsidy.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="border-t border-slate-700/80 pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-white">Your Net Investment:</span>
                  <span className="text-2xl font-black text-amber-400">
                    ₹{netInvestmentCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Financial Returns */}
              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Estimated Annual Savings:</span>
                  <strong className="text-emerald-300 font-bold">~₹{estimatedAnnualSavings.toLocaleString('en-IN')} / year</strong>
                </div>
                <div className="flex justify-between">
                  <span>Estimated 25-Year Lifetime Savings:</span>
                  <strong className="text-white font-bold">~₹{lifetimeSavings.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Capital Payback Period:</span>
                  <strong className="text-amber-300 font-bold">{paybackYears} Years</strong>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowSurveyModal(true)}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Rooftop Shadow Survey & Quote</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Our solar engineers will visit your site to verify terrace structure and DISCOM net-metering.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SURVEY REQUEST MODAL */}
      {showSurveyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => { setShowSurveyModal(false); setSubmitted(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Site Survey & Quotation Reserved!</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you, <strong>{surveyForm.name}</strong>. Our senior solar installation engineer (Anil Sharma) will contact you on <strong>{surveyForm.phone}</strong> to confirm your address and schedule the physical rooftop shadow inspection.
                </p>
                <button
                  onClick={() => { setShowSurveyModal(false); setSubmitted(false); }}
                  className="px-6 py-2.5 bg-amber-600 text-white font-bold rounded-xl text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSurvey} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    {systemSizeKw} kW Rooftop Solar EPC
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    Book Free Physical Rooftop Survey
                  </h3>
                  <p className="text-xs text-slate-500">
                    Net Investment: ₹{netInvestmentCost.toLocaleString('en-IN')} (Eligible for ₹{govSubsidy.toLocaleString('en-IN')} PM Surya Ghar Subsidy).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Anil Kumar"
                      value={surveyForm.name}
                      onChange={(e) => setSurveyForm({ ...surveyForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98480 56789"
                      value={surveyForm.phone}
                      onChange={(e) => setSurveyForm({ ...surveyForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="anil@example.com"
                      value={surveyForm.email}
                      onChange={(e) => setSurveyForm({ ...surveyForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City / District</label>
                    <input 
                      type="text" 
                      placeholder="Hyderabad"
                      value={surveyForm.city}
                      onChange={(e) => setSurveyForm({ ...surveyForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Installation Site Address</label>
                  <textarea 
                    rows={2}
                    placeholder="House/Plot No, Colony/Gated Community, Area, Landmark"
                    value={surveyForm.address}
                    onChange={(e) => setSurveyForm({ ...surveyForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-sm shadow-md transition"
                  >
                    {isSubmitting ? 'Confirming Survey...' : 'Confirm Free Site Survey'}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Zero obligation. We assist with PM Surya Ghar portal submission and DISCOM approvals.
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
