import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SunMedium, 
  Coins, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  FileText, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Zap,
  Info,
  CheckSquare,
  Sparkles,
  X
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { api } from '../../services/api';

export const SolarSubsidyGuide: React.FC = () => {
  const [billAmount, setBillAmount] = useState<number>(3500);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    phone: '',
    city: 'Hyderabad',
    discom: 'TSSPDCL (Telangana Southern)',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic calculations based on monthly bill
  const calculateSystem = (bill: number) => {
    let kw = Math.max(1, Math.round((bill / 800) * 10) / 10);
    if (kw < 1.5) kw = 1;
    else if (kw < 2.5) kw = 2;
    else if (kw < 3.5) kw = 3;
    else if (kw < 5.5) kw = 5;
    else kw = Math.min(10, Math.round(kw));

    // PM Surya Ghar subsidy slabs:
    // 1 kW = ₹30,000
    // 2 kW = ₹60,000
    // 3 kW to 10 kW = ₹78,000 max flat
    let subsidy = 78000;
    if (kw === 1) subsidy = 30000;
    else if (kw === 2) subsidy = 60000;
    else subsidy = 78000;

    const approxGrossCost = kw * 62000;
    const netCost = Math.max(0, approxGrossCost - subsidy);
    const monthlyUnits = kw * 120;
    const annualSavings = Math.round(monthlyUnits * 12 * 7.5);
    const paybackYears = (netCost / annualSavings).toFixed(1);
    const roofSqFt = kw * 90;

    return {
      kw,
      subsidy,
      approxGrossCost,
      netCost,
      monthlyUnits,
      annualSavings,
      paybackYears,
      roofSqFt
    };
  };

  const calculated = calculateSystem(billAmount);

  const steps = [
    {
      step: '01',
      title: 'Site Shadow Analysis & Engineering Sizing',
      desc: 'Our EPC engineers conduct satellite & on-site 3D shadow analysis of your roof to verify RCC slab structure, south-facing orientation, and match system sizing to your DISCOM consumption history.',
    },
    {
      step: '02',
      title: 'National Solar Rooftop Portal Registration',
      desc: 'We assist you in registering on pmsuryaghar.gov.in using your DISCOM consumer electricity service number, linked Aadhaar, and electricity bill copy.',
    },
    {
      step: '03',
      title: 'Turnkey EPC Engineering & Installation',
      desc: 'We install Tier-1 DCR (Domestic Content Requirement) Mono PERC or TopCon panels, hot-dipped galvanised aluminium mounting structures, and on-grid European inverters.',
    },
    {
      step: '04',
      title: 'DISCOM Net Meter Testing & Commissioning',
      desc: 'Local DISCOM electrical inspectors inspect the site and replace your standard meter with a bidirectional smart Net Meter, synchronizing generation with the power grid.',
    },
    {
      step: '05',
      title: 'Direct Bank Transfer (DBT) Subsidy Disbursement',
      desc: 'The commissioning certificate is uploaded to the National Portal. The central government transfers up to ₹78,000 directly into your bank account within 30 days!',
    },
  ];

  const documents = [
    { name: 'Latest Electricity Bill Copy', detail: 'Must have active DISCOM Consumer Service Number (USC / Service No)' },
    { name: 'Aadhaar Card of Consumer', detail: 'Name on Aadhaar must match or correlate with DISCOM service records' },
    { name: 'Bank Account Passbook / Cancelled Cheque', detail: 'Bank account must be Aadhaar-seeded / NPCI active for direct DBT' },
    { name: 'Proof of Roof Ownership', detail: 'Registered sale deed copy or latest property tax receipt' },
  ];

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.name || !modalForm.phone) return;

    setIsSubmitting(true);
    try {
      await api.createLead({
        division: 'solar',
        name: modalForm.name,
        phone: modalForm.phone,
        city: modalForm.city,
        service_interest: `PM Surya Ghar Application: ${calculated.kw}kW (Subsidy ₹${calculated.subsidy.toLocaleString('en-IN')})`,
        status: 'new',
        estimated_value: calculated.netCost,
        notes: `DISCOM: ${modalForm.discom}, Monthly Bill: ₹${billAmount}, Net Cost: ₹${calculated.netCost}`,
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
      <DivisionNav division="solar" />

      {/* Header */}
      <section className="bg-gradient-to-b from-amber-900 via-orange-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <SunMedium className="w-4 h-4 text-amber-400" />
            <span>Ministry of New & Renewable Energy (MNRE) Approved</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            PM Surya Ghar: Muft Bijli Yojana Guide
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Everything you need to know about claiming up to <strong className="text-white">₹78,000 Direct Bank Subsidy (DBT)</strong> for residential rooftop solar with zero paperwork hassle.
          </p>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">1 kW Solar Plant</span>
              <div className="text-3xl font-black text-white">₹30,000</div>
              <p className="text-xs text-slate-300">Central Direct Subsidy</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">2 kW Solar Plant</span>
              <div className="text-3xl font-black text-white">₹60,000</div>
              <p className="text-xs text-slate-300">Central Direct Subsidy</p>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-5 shadow-lg text-center space-y-1 text-white border border-amber-400/30">
              <span className="text-xs font-bold text-amber-100 uppercase tracking-wider">3 kW to 10 kW Plant</span>
              <div className="text-3xl font-black text-white">₹78,000</div>
              <p className="text-xs text-amber-100 font-semibold">Maximum Flat Subsidy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Interactive Subsidy & ROI Estimator Widget */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full">
              Live Subsidy Calculator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Instant PM Surya Ghar Sanction Sizing
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Adjust your average monthly electricity bill below to calculate your exact subsidy amount, recommended kW size, and payback period.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Slider Column */}
            <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700">Average Monthly Electricity Bill</label>
                  <span className="text-xl font-black text-amber-600">₹{billAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={billAmount}
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-semibold">
                  <span>₹1,000 (1kW)</span>
                  <span>₹5,000 (3-5kW)</span>
                  <span>₹15,000+ (10kW)</span>
                </div>
              </div>

              {/* Quick Bill Preset Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Or Select Common Bill</span>
                <div className="flex flex-wrap gap-2">
                  {[1500, 3000, 5000, 8000, 12000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setBillAmount(preset)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                        billAmount === preset
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ₹{preset.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-amber-900 leading-relaxed">
                <Info className="w-4 h-4 text-amber-600 inline mr-1" />
                Under the PM Surya Ghar scheme, central subsidies are credited directly to your bank account via Direct Bank Transfer (DBT) within 30 days of bidirectional net meter commissioning.
              </div>
            </div>

            {/* Calculated Output Card Column */}
            <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Recommended Plant Size</span>
                  <div className="text-3xl font-black text-white">{calculated.kw} kW On-Grid Solar Plant</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Roof Space Required</span>
                  <div className="text-lg font-bold text-slate-200">~{calculated.roofSqFt} sq. ft.</div>
                </div>
              </div>

              {/* Cost & Subsidy Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 block">Gross Plant Cost</span>
                  <div className="text-lg font-bold text-slate-200 mt-1">₹{calculated.approxGrossCost.toLocaleString('en-IN')}</div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center">
                  <span className="text-[11px] font-bold text-emerald-400 block">Government Subsidy (DBT)</span>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">- ₹{calculated.subsidy.toLocaleString('en-IN')}</div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-center">
                  <span className="text-[11px] font-bold text-amber-300 block">Net Investment to You</span>
                  <div className="text-2xl font-black text-white mt-0.5">₹{calculated.netCost.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Annual Savings & Payback */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Estimated Annual Savings:</span>
                  <strong className="text-emerald-400 text-base font-bold">₹{calculated.annualSavings.toLocaleString('en-IN')} / year</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Estimated Payback Period:</span>
                  <strong className="text-yellow-400 text-base font-bold">{calculated.paybackYears} Years Only</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Monthly Free Generation:</span>
                  <strong className="text-cyan-400 text-base font-bold">~{calculated.monthlyUnits} Units / month</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setModalOpen(true);
                }}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>Apply for {calculated.kw}kW with ₹{calculated.subsidy.toLocaleString('en-IN')} Subsidy Guarantee</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 5-Step Execution Workflow */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How Suresh Pepakayala Enterprises Executes Your Subsidy End-to-End
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              We manage all DISCOM inspections, bidirectional net metering, and National Portal subsidy uploads with zero bureaucratic headaches.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-lg shrink-0">
                  {s.step}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Checklist Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full">
              Application Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Documents Required for Subsidy Sanction
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Keep simple digital photos or PDFs of these 4 documents ready. Our liaison team will handle the portal upload.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <CheckSquare className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">{doc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Ready to Claim Your ₹78,000 Subsidy?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              We provide free satellite roof feasibility reports, shadow analysis, and turnkey installation across Hyderabad, Telangana, and Andhra Pradesh.
            </p>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setModalOpen(true);
            }}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition whitespace-nowrap"
          >
            Book Free Feasibility Survey
          </button>
        </div>
      </div>

      {/* Application / Feasibility Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full">
                Subsidy Assistance
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Apply for {calculated.kw} kW Subsidy Sanction
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Estimated Central Subsidy: <strong className="text-emerald-700">₹{calculated.subsidy.toLocaleString('en-IN')}</strong>
              </p>
            </div>

            {submitted ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-amber-600 mx-auto" />
                <h4 className="text-lg font-bold text-amber-950">Application Received!</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Thank you, <strong>{modalForm.name}</strong>. Our Solar Project Coordinator will call you to verify your consumer number and schedule the shadow-free terrace feasibility survey.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                    placeholder="e.g. S. Venkatesh"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={modalForm.phone}
                      onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                      placeholder="e.g. 9849123456"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Town</label>
                    <input
                      type="text"
                      value={modalForm.city}
                      onChange={(e) => setModalForm({ ...modalForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Electricity DISCOM Board</label>
                  <select
                    value={modalForm.discom}
                    onChange={(e) => setModalForm({ ...modalForm, discom: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    <option value="TSSPDCL (Telangana Southern)">TSSPDCL (Telangana Southern - Hyderabad/Rangareddy)</option>
                    <option value="TSNPDCL (Telangana Northern)">TSNPDCL (Telangana Northern - Warangal/Karimnagar)</option>
                    <option value="APCPDCL (Andhra Central)">APCPDCL (Andhra Central - Vijayawada/Guntur)</option>
                    <option value="APEPDCL (Andhra Eastern)">APEPDCL (Andhra Eastern - Visakhapatnam)</option>
                    <option value="APSPDCL (Andhra Southern)">APSPDCL (Andhra Southern - Tirupati/Nellore)</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Selected Plant Capacity:</span>
                    <strong className="text-slate-900">{calculated.kw} kW</strong>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Central Government Subsidy:</span>
                    <strong className="text-emerald-700 font-bold">₹{calculated.subsidy.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-600/30 transition disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit PM Surya Ghar Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
