import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SunMedium, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Coins, 
  Calendar,
  Building2,
  Home,
  Factory,
  ShieldCheck,
  Leaf,
  X,
  Phone,
  User,
  Sparkles
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { api } from '../../services/api';

export const SolarProjects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>('Rooftop Solar Survey');
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    city: 'Hyderabad',
    monthlyBill: '4000',
    roofType: 'RCC Flat Concrete Terrace',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const projects = [
    {
      id: 'tellapur-villa',
      title: 'Sri Rama Vilas Residency (Villa #42)',
      category: 'residential',
      location: 'Tellapur, Hyderabad',
      type: 'Residential Luxury Villa',
      capacity: '5.2 kW On-Grid',
      panels: '10x 540W DCR Mono PERC Panels',
      inverter: '5kW European On-Grid Solar Inverter with Wi-Fi Monitoring',
      savings: '₹62,400 / year (Bill reduced to Zero)',
      subsidy: '₹78,000 Credited via PM Surya Ghar DBT',
      payback: '3.1 Years Payback',
      co2Offset: '6.4 Tonnes CO₂ / year',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'aura-heights',
      title: 'Aura Heights Luxury Gated Community',
      category: 'society',
      location: 'Madhapur, Hyderabad',
      type: 'Gated Housing Society Common Areas',
      capacity: '25 kW High-Efficiency On-Grid',
      panels: '46x 550W TopCon Bifacial Panels',
      inverter: '25kW Dual MPPT High-Yield Commercial Inverter',
      savings: '₹3,40,000 / year (Lifts, Water Pumps & Club House)',
      subsidy: 'Institutional Society Incentive Approved',
      payback: '3.4 Years Payback',
      co2Offset: '31 Tonnes CO₂ / year',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'jubilee-hybrid',
      title: 'Dr. K. Somasekhar Independent Bungalow',
      category: 'residential',
      location: 'Jubilee Hills, Hyderabad',
      type: 'Residential Hybrid Solar with Storage',
      capacity: '10 kW Hybrid with 15kWh LiFePO4 Battery',
      panels: '18x 550W Half-Cut Mono PERC Tier-1',
      inverter: '10kW Smart Hybrid Inverter with 0-ms UPS Transfer',
      savings: '₹1,32,000 / year (100% Uninterrupted Power Backup)',
      subsidy: '₹78,000 Central DBT Subsidy Claimed',
      payback: '4.2 Years Payback',
      co2Offset: '12.5 Tonnes CO₂ / year',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'aditya-mills',
      title: 'Aditya Spinning & Textile Mills Ltd.',
      category: 'commercial',
      location: 'Kurnool Industrial Estate, AP',
      type: 'Industrial Rooftop EPC on Metal Shed',
      capacity: '100 kW Industrial Grid-Tied',
      panels: '182x 550W Tier-1 Panels on Tin Shed with Rail Clamps',
      inverter: '100kW Central Utility Inverter with LT Panel Synchronization',
      savings: '₹10,50,000 / year in Peak Power Tariffs',
      subsidy: 'Accelerated Depreciation (40%) Claimed for Tax Relief',
      payback: '2.8 Years Payback',
      co2Offset: '124 Tonnes CO₂ / year',
      image: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'shamshabad-warehouse',
      title: 'AgriFresh Cold Chain Logistics Facility',
      category: 'commercial',
      location: 'Shamshabad, Hyderabad',
      type: 'Commercial Cold Storage Solar Roof',
      capacity: '50 kW Commercial Net-Metered',
      panels: '92x 545W Mono PERC Elevated Aluminium Structure',
      inverter: '50kW High-Efficiency Inverter with Remote Cloud Telemetry',
      savings: '₹5,80,000 / year in Continuous Compressor Cooling',
      subsidy: 'Commercial Energy Efficiency Rebate Approved',
      payback: '3.0 Years Payback',
      co2Offset: '62 Tonnes CO₂ / year',
      image: 'https://images.unsplash.com/photo-1509391111737-9b0ba5232981?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'vijayawada-duplex',
      title: 'Dr. V. Prasad Independent Duplex',
      category: 'residential',
      location: 'Benz Circle, Vijayawada',
      type: 'Residential Rooftop Net Meter',
      capacity: '3.3 kW DCR Solar Plant',
      panels: '6x 550W Mono PERC DCR Panels',
      inverter: '3.3kW Single Phase Inverter with Surge Protection',
      savings: '₹42,000 / year (Net Metered with APSPDCL)',
      subsidy: '₹78,000 Direct Central Subsidy Credited to Bank Account',
      payback: '2.9 Years Payback',
      co2Offset: '4.1 Tonnes CO₂ / year',
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(p => p.category === selectedFilter);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;

    setIsSubmitting(true);
    try {
      await api.createLead({
        division: 'solar',
        name: formState.name,
        phone: formState.phone,
        city: formState.city,
        service_interest: `Solar Survey: ${selectedProjectTitle}`,
        status: 'new',
        estimated_value: 285000,
        notes: `Bill: ₹${formState.monthlyBill}/mo, Roof: ${formState.roofType}`,
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
            <span>Turnkey Solar EPC Portfolio • TSSPDCL & APSPDCL Certified</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Commissioned Solar Rooftop Projects
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Over 4.2 Megawatts of residential, housing society, and commercial rooftop solar installations commissioned with zero paperwork delays and 100% net-meter approval.
          </p>

          {/* Cumulative Track Record */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-amber-400">4.2+ MW</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Capacity Commissioned</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-emerald-400">5,420+ Tons</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">CO₂ Offset Lifetime</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-yellow-400">₹4.85 Cr+</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Customer Power Savings</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-cyan-400">100%</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">DISCOM Net Meter Sync</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { key: 'all', label: 'All Commissioned Plants' },
            { key: 'residential', label: 'Residential Villas & Homes' },
            { key: 'society', label: 'Gated Societies & High-Rise' },
            { key: 'commercial', label: 'Commercial & Industrial EPC' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedFilter(cat.key)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition ${
                selectedFilter === cat.key
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 relative overflow-hidden bg-slate-900">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {proj.capacity}
                  </div>
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {proj.payback}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                      {proj.type}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{proj.location}</span>
                    </div>
                  </div>

                  {/* Specs Pill Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-semibold text-slate-500 shrink-0">Solar Modules:</span>
                      <strong className="text-slate-900 text-right">{proj.panels}</strong>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-semibold text-slate-500 shrink-0">Inverter Tech:</span>
                      <strong className="text-slate-900 text-right">{proj.inverter}</strong>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-semibold text-slate-500 shrink-0">Annual Savings:</span>
                      <strong className="text-emerald-700 font-bold">{proj.savings}</strong>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-semibold text-slate-500 shrink-0">Subsidy / ROI:</span>
                      <strong className="text-amber-700 font-bold">{proj.subsidy}</strong>
                    </div>
                    <div className="flex justify-between items-start gap-2 pt-1 border-t border-slate-200/60">
                      <span className="font-semibold text-slate-500 shrink-0 flex items-center gap-1">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Carbon Offset:</span>
                      </span>
                      <strong className="text-emerald-700">{proj.co2Offset}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedProjectTitle(proj.title);
                    setSubmitted(false);
                    setQuoteModalOpen(true);
                  }}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-amber-600/20"
                >
                  <span>Request Similar Plant for My Property</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subsidy Highlight Banner */}
        <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-800/60 px-3 py-1 rounded-full">
              PM Surya Ghar: Muft Bijli Yojana
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Get Up to ₹78,000 Direct Subsidy Credited to Your Bank
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We handle end-to-end liaisoning with TSSPDCL / APSPDCL: structural design, shadow-free 3D simulation, bidirectional net-meter testing, and direct central DBT subsidy disbursement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/solar/subsidy"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl text-xs text-center shadow-lg transition"
            >
              Calculate My Subsidy & ROI
            </Link>
            <Link
              to="/solar/quotation"
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs text-center shadow-md transition"
            >
              Book Free Roof Survey
            </Link>
          </div>
        </div>
      </div>

      {/* Quote / Survey Request Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full">
                Engineering Survey
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Request Free Solar Feasibility Study
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Reference Project: <strong className="text-amber-700">{selectedProjectTitle}</strong>
              </p>
            </div>

            {submitted ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-amber-600 mx-auto" />
                <h4 className="text-lg font-bold text-amber-950">Survey Request Scheduled!</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Thank you, <strong>{formState.name}</strong>. Our certified Solar EPC Engineering team will contact you to perform shadow-free satellite roof analysis and share your customized 25-year generation estimate with PM Surya Ghar subsidy deduction.
                </p>
                <button
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-5 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="e.g. 9849234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={formState.city}
                      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Avg Monthly Bill (₹)</label>
                    <input
                      type="number"
                      value={formState.monthlyBill}
                      onChange={(e) => setFormState({ ...formState, monthlyBill: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Roof Type</label>
                    <select
                      value={formState.roofType}
                      onChange={(e) => setFormState({ ...formState, roofType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    >
                      <option value="RCC Flat Concrete Terrace">RCC Flat Concrete</option>
                      <option value="Sloped Mangalore Tile Roof">Sloped Tile Roof</option>
                      <option value="Industrial Tin / Metal Shed">Industrial Tin Shed</option>
                      <option value="Elevated Gazebo Structure">Elevated Gazebo Roof</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-600/30 transition disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Free Site Feasibility Survey'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
