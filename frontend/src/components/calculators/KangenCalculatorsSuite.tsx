import React, { useState } from 'react';
import { 
  Droplets, 
  Trash2, 
  TrendingDown, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Mail,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';

export const KangenCalculatorsSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'savings' | 'sizing' | 'demo'>('savings');

  // 1. Savings State
  const [monthlySpend, setMonthlySpend] = useState(4000); // ₹4,000/mo on 20L cans & branded bottles
  const [householdMembers, setHouseholdMembers] = useState(5);
  const [yearsProjected, setYearsProjected] = useState(10);

  // Savings Math
  const annualBottledWaterSpend = monthlySpend * 12;
  const cumulativeBottledSpend = annualBottledWaterSpend * yearsProjected;
  const k8MachineCost = 343000; // Flagship Enagic Leveluk K8
  const tenYearMaintenance = 45000; // Filter replacements & cleaning cartridges
  const totalKangenCost = k8MachineCost + (tenYearMaintenance * (yearsProjected / 10));
  const netSavings = Math.max(0, cumulativeBottledSpend - totalKangenCost);
  const plasticBottlesEliminated = Math.round(householdMembers * 4 * 365 * yearsProjected); // 4 half-liter bottles/person/day

  // 2. Sizing State
  const [dailyDrinkingLiters, setDailyDrinkingLiters] = useState(15);
  const [cookingBakingLiters, setCookingBakingLiters] = useState(10);
  const [sanitizingBeautyLiters, setSanitizingBeautyLiters] = useState(5);

  const totalDailyWater = dailyDrinkingLiters + cookingBakingLiters + sanitizingBeautyLiters;
  let recommendedModel = {
    name: 'Enagic LeveLuk K8',
    plates: '8 Platinum-Dipped Titanium Plates',
    orp: 'Up to -850 mV',
    phRange: 'pH 2.5 - pH 11.5',
    price: '₹3,43,000',
    description: 'Flagship multi-language model with highest antioxidant output and touch screen.',
  };

  if (totalDailyWater < 12) {
    recommendedModel = {
      name: 'Enagic LeveLuk SD501',
      plates: '7 Platinum-Dipped Titanium Plates',
      orp: 'Up to -800 mV',
      phRange: 'pH 2.5 - pH 11.5',
      price: '₹2,77,000',
      description: 'The global standard and workhorse of alkaline ionized water systems.',
    };
  } else if (totalDailyWater > 45) {
    recommendedModel = {
      name: 'Enagic LeveLuk Super 501',
      plates: '12 Platinum-Dipped Titanium Plates',
      orp: 'Up to -850 mV',
      phRange: 'pH 2.5 - pH 11.5',
      price: '₹3,97,000',
      description: 'Heavy duty twin-chamber powerhouse designed for large joint families, spas, and clinics.',
    };
  }

  // Demo Booking Form State
  const [demoForm, setDemoForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    address: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '18:00',
    notes: 'Please bring ORP meter and pH test drops for home demo.',
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Create Appointment
      await api.createAppointment({
        division: 'kangen',
        customer_name: demoForm.name,
        customer_phone: demoForm.phone,
        customer_email: demoForm.email,
        appointment_date: demoForm.date,
        appointment_time: demoForm.time,
        service_type: 'Live Kangen Water Demo & Antioxidant Comparison Test',
        mode: 'in_person',
        location_or_link: `${demoForm.address}, ${demoForm.city}`,
        notes: demoForm.notes,
      });

      // 2. Create Lead
      await api.createLead({
        division: 'kangen',
        name: demoForm.name,
        phone: demoForm.phone,
        email: demoForm.email,
        city: demoForm.city,
        service_interest: `Kangen Demo - ${recommendedModel.name}`,
        estimated_value: 343000,
        notes: `Demo booked for ${demoForm.date} at ${demoForm.time}. Address: ${demoForm.address}`,
      });

      // 3. Record calculation
      await api.recordCalculation({
        division: 'kangen',
        calculator_name: 'Kangen Savings & Sizing',
        user_name: demoForm.name,
        user_phone: demoForm.phone,
        user_email: demoForm.email,
        input_data: { monthlySpend, householdMembers, yearsProjected, totalDailyWater },
        result_data: { cumulativeBottledSpend, totalKangenCost, netSavings, plasticBottlesEliminated, model: recommendedModel.name },
      });

      setDemoSubmitted(true);
    } catch (err) {
      console.error(err);
      setDemoSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header Tabs */}
      <div className="bg-slate-900 p-2 sm:p-3 flex flex-wrap gap-1 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('savings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'savings'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <TrendingDown className="w-4 h-4 text-emerald-300" />
          <span>Bottled Water vs Kangen Savings</span>
        </button>

        <button
          onClick={() => setActiveTab('sizing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'sizing'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Droplets className="w-4 h-4 text-cyan-300" />
          <span>Household Water Sizing</span>
        </button>

        <button
          onClick={() => setActiveTab('demo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'demo'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Book Free Home Demo</span>
        </button>
      </div>

      <div className="p-6 sm:p-10">

        {/* 1. SAVINGS CALCULATOR */}
        {activeTab === 'savings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-600 tracking-wider uppercase bg-cyan-50 px-2.5 py-1 rounded-md">
                  Cost & Environmental Analysis
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Plastic Bottled Water vs Enagic Kangen
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Discover how much your household spends on 20L jars and single-use plastic bottles, and your long-term savings with a medical-grade Enagic device.
                </p>
              </div>

              {/* Monthly Spend */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Monthly Spending on Water Cans / Bottled Water</label>
                  <span className="text-cyan-700 font-extrabold text-base">₹{monthlySpend.toLocaleString('en-IN')} / month</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="15000" 
                  step="500"
                  value={monthlySpend} 
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹1,000/mo</span>
                  <span>₹7,500/mo</span>
                  <span>₹15,000/mo</span>
                </div>
              </div>

              {/* Household Members */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Family Members / Water Drinkers</label>
                  <span className="text-slate-900 font-bold">{householdMembers} People</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="15" 
                  value={householdMembers} 
                  onChange={(e) => setHouseholdMembers(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Projection Period */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Projection Horizon</label>
                  <span className="text-slate-900 font-bold">{yearsProjected} Years (Enagic lifespan is 20-25 yrs)</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 15].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setYearsProjected(yr)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        yearsProjected === yr ? 'bg-cyan-600 text-white border-cyan-600 shadow' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {yr} Years
                    </button>
                  ))}
                </div>
              </div>

              {/* Eco Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-emerald-950 uppercase">Environmental Impact</h5>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Your switch eliminates <strong>~{plasticBottlesEliminated.toLocaleString('en-IN')} single-use plastic bottles</strong> from Indian landfills and oceans!
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                  {yearsProjected}-Year Financial Comparison
                </span>
                
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-800/40 mb-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Spending on Bottled Water:</span>
                    <strong className="text-rose-400 font-bold">₹{cumulativeBottledSpend.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Enagic Machine + Maintenance:</span>
                    <strong className="text-emerald-400 font-bold">₹{totalKangenCost.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="border-t border-slate-700/80 pt-2 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-white">Net Family Savings:</span>
                    <span className="text-2xl font-black text-emerald-300">
                      ₹{netSavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Pure medical-grade ionized water on tap 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>No microplastic contamination from heated bottled plastic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>5 Water types for drinking, pesticide wash & skincare</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveTab('demo')}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free In-Home Live Water Demo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. SIZING CALCULATOR */}
        {activeTab === 'sizing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-600 tracking-wider uppercase bg-cyan-50 px-2.5 py-1 rounded-md">
                  Enagic Device Sizing
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Household Water Requirement & Ionizer Sizing
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Input your daily usage across drinking, cooking, and sanitization to identify the optimal Japanese ionizer unit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Drinking & Hydration (pH 8.5 – 9.5)</label>
                  <span className="text-cyan-700 font-bold">{dailyDrinkingLiters} Liters/day</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  value={dailyDrinkingLiters} 
                  onChange={(e) => setDailyDrinkingLiters(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Cooking, Rice & Tea (pH 9.0 – 9.5)</label>
                  <span className="text-cyan-700 font-bold">{cookingBakingLiters} Liters/day</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={cookingBakingLiters} 
                  onChange={(e) => setCookingBakingLiters(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Vegetable Wash & Beauty Water (pH 11.5 & pH 6.0)</label>
                  <span className="text-cyan-700 font-bold">{sanitizingBeautyLiters} Liters/day</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={sanitizingBeautyLiters} 
                  onChange={(e) => setSanitizingBeautyLiters(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Recommended Model */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Recommended Enagic Model
                </span>
                <h4 className="text-2xl font-black text-white">{recommendedModel.name}</h4>
                <div className="text-2xl font-bold text-cyan-300 mt-1">{recommendedModel.price}</div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{recommendedModel.description}</p>

                <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-800/40 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Electrolysis Plates:</span>
                    <strong className="text-white">{recommendedModel.plates}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Antioxidant ORP:</span>
                    <strong className="text-emerald-400">{recommendedModel.orp}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Full Spectrum:</span>
                    <strong className="text-cyan-300">{recommendedModel.phRange}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Daily Demand:</span>
                    <strong className="text-white">{totalDailyWater} Liters / day</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveTab('demo')}
                  className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Request In-Home Tasting on {recommendedModel.name}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. BOOK LIVE DEMO */}
        {activeTab === 'demo' && (
          <div className="max-w-2xl mx-auto">
            {demoSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Kangen Water Demo Confirmed!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{demoForm.name}</strong>. Our certified Enagic distributor (Vikram Reddy) has reserved your demonstration on <strong>{demoForm.date} at {demoForm.time}</strong> at your address. We will call you on <strong>{demoForm.phone}</strong> beforehand!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => { setDemoSubmitted(false); setActiveTab('savings'); }}
                    className="px-6 py-2.5 bg-cyan-600 text-white font-bold rounded-xl text-sm shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookDemo} className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-cyan-600 tracking-wider uppercase bg-cyan-50 px-2.5 py-1 rounded-md">
                    100% Free • No Obligation
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                    Book a Live Kangen Water Demonstration
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    See live experiments in your own home: The Negative ORP Test, The pH Spectrum Test, and The Tomato Oil Emulsification Test!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Dr. K. Srinivas"
                        value={demoForm.name}
                        onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98480 45678"
                        value={demoForm.phone}
                        onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="email" 
                        placeholder="srinivas@example.com"
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City / Region</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="text" 
                        placeholder="Hyderabad / Vijayawada"
                        value={demoForm.city}
                        onChange={(e) => setDemoForm({ ...demoForm, city: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date *</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="date" 
                        required
                        value={demoForm.date}
                        onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Time *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="time" 
                        required
                        value={demoForm.time}
                        onChange={(e) => setDemoForm({ ...demoForm, time: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Home / Office Address for Demo</label>
                  <textarea 
                    rows={2}
                    placeholder="House/Flat number, Building, Street, Landmark"
                    value={demoForm.address}
                    onChange={(e) => setDemoForm({ ...demoForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-extrabold rounded-2xl text-base shadow-lg shadow-cyan-600/30 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Confirming Demo...' : 'Confirm Free Live Demo Slot'}</span>
                  </button>
                  <p className="text-xs text-slate-400 text-center mt-2">
                    We will bring fresh ionized water for your entire family to sample free of charge.
                  </p>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
