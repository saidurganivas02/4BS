import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Zap,
  PhoneCall,
  X,
  Info,
  Layers,
  Award,
  CircleDollarSign,
  HeartHandshake
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { api } from '../../services/api';

export const KangenMachines: React.FC = () => {
  const [selectedWaterType, setSelectedWaterType] = useState<number>(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedMachineName, setSelectedMachineName] = useState<string>('Enagic LeveLuk K8');
  const [demoForm, setDemoForm] = useState({
    name: '',
    phone: '',
    city: 'Hyderabad',
    waterSource: 'Municipal (Manjeera / Krishna) & RO',
    preferredDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const waterTypes = [
    {
      ph: 'pH 11.5',
      name: 'Strong Kangen Water',
      subtitle: 'Pesticide Stripper & Oil Emulsifier',
      color: 'bg-indigo-600 text-white',
      accent: 'border-indigo-500',
      description: 'Super-alkaline water with extraordinary saponification and cleaning ability. Dissolves oil-based waxes and agricultural pesticides that regular tap or RO water cannot remove.',
      benefits: [
        'Removes chemical pesticide coatings and petroleum waxes from fruits & vegetables',
        'Emulsifies sesame and olive oil in cooking and food prep demonstrations',
        'Replaces chemical grease strippers on kitchen counters and stovetops',
        'Tenderizes tough meat cuts and naturally enhances food flavors'
      ],
      practicalTip: 'Soak freshly bought vegetables for 10-15 minutes; watch the yellow/brown pesticide residue emerge into the bowl.'
    },
    {
      ph: 'pH 8.5 - 9.5',
      name: 'Kangen Drinking Water',
      subtitle: 'Antioxidant & Micro-Clustered Hydration',
      color: 'bg-cyan-600 text-white',
      accent: 'border-cyan-500',
      description: 'The world-famous Japanese antioxidant drinking water. Packed with active dissolved molecular hydrogen (H2) and negative ORP to neutralize reactive oxygen species (ROS).',
      benefits: [
        'Negative ORP up to -850 mV provides superior cellular antioxidant defense',
        'Micro-clustered molecular structure promotes rapid gastrointestinal absorption without bloating',
        'Extracts tea and coffee aromas instantly without requiring boiling water',
        'Supports metabolic equilibrium and post-workout recovery'
      ],
      practicalTip: 'Begin with pH 8.5 for the first two weeks, advance to pH 9.0 for two weeks, and maintain at pH 9.5 for continuous vitality.'
    },
    {
      ph: 'pH 7.0',
      name: 'Clean Neutral Water',
      subtitle: 'Pure Water for Infants & Medications',
      color: 'bg-emerald-600 text-white',
      accent: 'border-emerald-500',
      description: 'Neutral, ultra-purified water filtered through high-grade antibacterial carbon block filter. Chlorine, rust, and particulates removed while maintaining balanced pH.',
      benefits: [
        'Ideal for preparing infant milk formulas and baby food',
        'Recommended when taking prescription pharmaceuticals (prevents premature drug dissolution)',
        'Free from chlorine taste, heavy metal odors, and turbidity',
        'Pleasant, refreshing natural spring taste'
      ],
      practicalTip: 'Turn machine to Clean Water 30 minutes before and after taking oral medication.'
    },
    {
      ph: 'pH 6.0',
      name: 'Beauty Water',
      subtitle: 'Natural Astringent Skin & Hair Toner',
      color: 'bg-amber-600 text-white',
      accent: 'border-amber-500',
      description: 'Slightly acidic water matching human skin’s natural pH mantle (pH 5.5 to 6.0). Acts as an organic astringent that tightens pores, soothes skin, and softens hair cuticles.',
      benefits: [
        'Natural facial toner: tightens skin pores and prevents moisture evaporation',
        'Used as a final hair rinse to impart silky shine and prevent tangles',
        'Soothes skin post-shaving without alcohol burn or irritation',
        'Cleans glass, spectacles, and mirrors to a crystal-clear, streak-free polish'
      ],
      practicalTip: 'Fill a mini spray mist bottle with Beauty Water for a refreshing, non-chemical facial hydration mist throughout the workday.'
    },
    {
      ph: 'pH 2.5',
      name: 'Strong Acidic Water',
      subtitle: 'Hospital-Grade Non-Chemical Disinfectant',
      color: 'bg-rose-600 text-white',
      accent: 'border-rose-500',
      description: 'Contains bioavailable Hypochlorous Acid (HOCl) with positive ORP (> +1100 mV). Scientifically proven to sanitize surfaces and destroy 99.9% of bacteria and pathogens on contact.',
      benefits: [
        'Used in Japanese hospitals for sanitizing surgical instruments and treatment tables',
        'Disinfects kitchen cutting boards, knives, and sponges without harmful bleach fumes',
        'Effective natural gargle for oral hygiene, soothing sore throats, and mouth ulcers',
        'Soothes minor cuts, skin abrasions, and topical eczema flare-ups'
      ],
      practicalTip: 'Keep in an opaque dark spray bottle; safe for kids and pets with zero chemical residue.'
    }
  ];

  const models = [
    {
      name: 'Enagic LeveLuk K8 (Kangen 8)',
      category: 'Flagship Multi-Language Model',
      price: '₹3,43,000 (Incl. 18% GST)',
      plates: '8 Solid Platinum-Dipped Titanium Plates',
      orp: 'Up to -850 mV',
      display: 'Full Color Touch Screen with 8 Languages',
      warranty: '5 Years Manufacturer Full Warranty',
      flow: '4.5 - 7.5 Liters / min',
      lifespan: '20 to 25 Years',
      desc: 'Enagic’s most powerful antioxidant machine. Generates higher concentrations of dissolved molecular hydrogen and negative ORP for optimal health-conscious families.',
      idealFor: 'Medium to large families wanting the highest antioxidant output and touch-screen convenience.',
    },
    {
      name: 'Enagic LeveLuk SD501',
      category: 'The Global Gold Standard',
      price: '₹2,77,000 (Incl. 18% GST)',
      plates: '7 Solid Platinum-Dipped Titanium Plates',
      orp: 'Up to -800 mV',
      display: 'LCD Screen with Voice Prompts',
      warranty: '5 Years Manufacturer Full Warranty',
      flow: '4.5 - 7.5 Liters / min',
      lifespan: '20 to 25 Years',
      desc: 'The legendary workhorse of the ionized water industry. Trusted in over 150 countries with unmatched reliability and 20+ year expected operating lifespan.',
      idealFor: 'Households seeking proven Japanese medical-grade longevity at the most popular price point.',
    },
    {
      name: 'Enagic LeveLuk Super 501',
      category: 'Commercial Heavy-Duty Powerhouse',
      price: '₹3,97,000 (Incl. 18% GST)',
      plates: '12 Solid Titanium Plates (Twin Chambers)',
      orp: 'Up to -850 mV',
      display: 'Heavy Duty Industrial Dual System',
      warranty: '3 Years Full Warranty',
      flow: '6.0 - 11.0 Liters / min',
      lifespan: '20 to 25 Years',
      desc: 'Built with dual twin chambers (7 plates for drinking, 5 plates for strong acidic). Delivers continuous high-volume water for large joint families, spas, and clinics.',
      idealFor: 'Large joint families (10+ members), wellness centers, restaurants, and medical clinics.',
    },
    {
      name: 'Enagic Anespa DX',
      category: 'Mineral Ion Water Spa System',
      price: '₹2,00,000 (Incl. 18% GST)',
      plates: 'Futamata Radium & Chikutan Ceramic Cartridge',
      orp: 'Chlorine-Free Soft Mineral Water',
      display: 'Bathroom Luxury Shower Unit',
      warranty: '3 Years Full Warranty',
      flow: '15 Liters / min',
      lifespan: '15 to 20 Years',
      desc: 'Transforms your daily shower into a natural Japanese hot spring spa (Onsen). Removes 100% of residual chlorine and heavy minerals to revitalize dry hair and sensitive skin.',
      idealFor: 'Households dealing with hard water skin irritation, eczema, or hair loss.',
    },
  ];

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.phone) return;

    setIsSubmitting(true);
    try {
      await api.createLead({
        division: 'kangen',
        name: demoForm.name,
        phone: demoForm.phone,
        city: demoForm.city,
        service_interest: `Kangen Demo: ${selectedMachineName}`,
        status: 'new',
        estimated_value: 343000,
        notes: `Water Source: ${demoForm.waterSource}, Date: ${demoForm.preferredDate || 'Earliest available'}`,
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
      <DivisionNav division="kangen" />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-cyan-900 via-sky-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-bold uppercase tracking-wider">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>Enagic Osaka, Japan • Medical Device License #27BZ005410</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Original Japanese Water Ionizers
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Handcrafted in Osaka with 99.97% pure medical-grade solid titanium electrode plates electroplated with platinum. Generates 5 distinct functional waters for health, culinary, and sanitation.
          </p>

          {/* Trust Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-cyan-400">Up to -850 mV</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Antioxidant ORP Charge</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-teal-400">20 - 25 Yrs</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Durable Design Lifespan</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-amber-400">WQA Gold Seal</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Only Ionizer Certified</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-emerald-400">ISO 13485</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Medical Device Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Interactive 5 Waters Explorer */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full">
              Full Spectrum Ionization
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              The 5 Functional Waters of Enagic
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a water type below to explore its chemical properties, culinary applications, and household benefits.
            </p>
          </div>

          {/* pH Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {waterTypes.map((type, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedWaterType(idx)}
                className={`p-3 rounded-2xl text-center transition flex flex-col items-center gap-1 border ${
                  selectedWaterType === idx
                    ? `${type.color} shadow-lg scale-[1.02] border-transparent`
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span className="font-black text-sm">{type.ph}</span>
                <span className="text-[11px] font-semibold opacity-90 line-clamp-1">{type.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Water Details Card */}
          {(() => {
            const current = waterTypes[selectedWaterType];
            return (
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-4">
                  <div>
                    <span className="text-xs font-extrabold text-cyan-700 uppercase tracking-wider">
                      {current.subtitle}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                      {current.ph} — {current.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 text-xs font-bold shadow-sm">
                    <Droplets className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Instant Flow from Top/Bottom Hose</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {current.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                      Practical Everyday Applications
                    </h4>
                    <ul className="space-y-2">
                      {current.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Specialist Demonstration Tip
                      </span>
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        "{current.practicalTip}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Want to see this live?</span>
                      <button
                        onClick={() => {
                          setSelectedMachineName(`Water Demo: ${current.name}`);
                          setSubmitted(false);
                          setDemoModalOpen(true);
                        }}
                        className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1"
                      >
                        <span>Request Demonstration</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Machine Lineup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {models.map((m, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-600" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100">
                    {m.category}
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {m.price}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-cyan-600 transition">
                  {m.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {m.desc}
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Electrode Plates:</span>
                    <strong className="text-slate-900">{m.plates}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Antioxidant ORP:</span>
                    <strong className="text-cyan-700">{m.orp}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Water Output:</span>
                    <strong className="text-slate-900">{m.flow}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Interface & Audio:</span>
                    <strong className="text-slate-900">{m.display}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Warranty:</span>
                    <strong className="text-emerald-700">{m.warranty}</strong>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-4 font-medium">
                  <strong>Recommended For:</strong> {m.idealFor}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/kangen/calculators"
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1"
                >
                  <CircleDollarSign className="w-4 h-4" />
                  <span>ROI vs Packaged Water</span>
                </Link>

                <button
                  onClick={() => {
                    setSelectedMachineName(m.name);
                    setSubmitted(false);
                    setDemoModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow-md shadow-cyan-600/20 transition flex items-center gap-1.5"
                >
                  <span>Book Demo on {m.name.split(' ')[2] || 'Machine'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Machine Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full">
              Engineering Specs
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Enagic Machine Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              All models utilize solid Japanese medical-grade titanium electrodes dipped in double platinum.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="p-4 font-bold text-slate-500 uppercase tracking-wider">Specifications</th>
                  <th className="p-4 font-bold text-cyan-900">LeveLuk K8</th>
                  <th className="p-4 font-bold text-sky-900">LeveLuk SD501</th>
                  <th className="p-4 font-bold text-blue-900">Super 501</th>
                  <th className="p-4 font-bold text-teal-900">Anespa DX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Number of Plates</td>
                  <td className="p-4 font-bold text-cyan-700">8 Solid Plates</td>
                  <td className="p-4 font-semibold">7 Solid Plates</td>
                  <td className="p-4 font-semibold">12 Twin Chambers</td>
                  <td className="p-4 font-semibold">Dual Mineral Core</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Plate Material</td>
                  <td className="p-4">Solid Titanium / Platinum</td>
                  <td className="p-4">Solid Titanium / Platinum</td>
                  <td className="p-4">Solid Titanium / Platinum</td>
                  <td className="p-4">Ceramic & Futamata Radium</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Negative ORP Range</td>
                  <td className="p-4 font-bold text-emerald-700">Up to -850 mV</td>
                  <td className="p-4 font-semibold text-emerald-700">Up to -800 mV</td>
                  <td className="p-4 font-bold text-emerald-700">Up to -850 mV</td>
                  <td className="p-4 text-slate-500">Mineral Softening</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Interface Display</td>
                  <td className="p-4 font-medium text-cyan-700">Color Touchscreen (8 Langs)</td>
                  <td className="p-4">Voice Prompts + LCD</td>
                  <td className="p-4">Industrial Dual Panel</td>
                  <td className="p-4">Shower Bath Control</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">pH Generating Range</td>
                  <td className="p-4 font-bold text-slate-900">pH 2.5 to 11.5</td>
                  <td className="p-4 font-bold text-slate-900">pH 2.5 to 11.5</td>
                  <td className="p-4 font-bold text-slate-900">pH 2.5 to 11.5</td>
                  <td className="p-4 font-medium text-slate-900">Neutral Mineral pH 6.8 - 7.5</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Factory Warranty</td>
                  <td className="p-4 font-bold text-emerald-700">5 Years Full Warranty</td>
                  <td className="p-4 font-bold text-emerald-700">5 Years Full Warranty</td>
                  <td className="p-4 font-semibold text-emerald-700">3 Years Full Warranty</td>
                  <td className="p-4 font-semibold text-emerald-700">3 Years Full Warranty</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/30">Booking Action</td>
                  <td className="p-4">
                    <button
                      onClick={() => { setSelectedMachineName('Enagic LeveLuk K8'); setSubmitted(false); setDemoModalOpen(true); }}
                      className="px-3 py-1.5 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 transition"
                    >
                      Book Demo
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => { setSelectedMachineName('Enagic LeveLuk SD501'); setSubmitted(false); setDemoModalOpen(true); }}
                      className="px-3 py-1.5 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700 transition"
                    >
                      Book Demo
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => { setSelectedMachineName('Enagic LeveLuk Super 501'); setSubmitted(false); setDemoModalOpen(true); }}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                      Book Demo
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => { setSelectedMachineName('Enagic Anespa DX'); setSubmitted(false); setDemoModalOpen(true); }}
                      className="px-3 py-1.5 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition"
                    >
                      Book Demo
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Economic Analysis Card */}
        <div className="bg-gradient-to-r from-cyan-900 via-sky-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider bg-cyan-800/60 px-3 py-1 rounded-full">
              Long-Term Economic Value
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Why Kangen Saves Families ₹3,50,000+ vs Bottled Water
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Buying single-use bottled alkaline water costs ₹150 - ₹200 daily while leeching dangerous microplastics and phthalates. An Enagic ionizer runs reliably for 25 years at an operating cost of under ₹3 per liter, providing limitless medical-grade water for your entire home.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => {
                setSelectedMachineName('Home Water Testing & Demo');
                setSubmitted(false);
                setDemoModalOpen(true);
              }}
              className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl text-xs text-center shadow-lg transition"
            >
              Book Free In-Home Water Test
            </button>
            <Link
              to="/kangen/calculators"
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs text-center shadow-md transition"
            >
              Calculate Your 10-Year Savings
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Booking Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-2.5 py-1 rounded-full">
                Free Live Test
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Book Live In-Home Water Demonstration
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Requested Machine: <strong className="text-cyan-700">{selectedMachineName}</strong>
              </p>
            </div>

            {submitted ? (
              <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-cyan-600 mx-auto" />
                <h4 className="text-lg font-bold text-cyan-950">Demonstration Scheduled!</h4>
                <p className="text-xs text-cyan-800 leading-relaxed">
                  Thank you, <strong>{demoForm.name}</strong>. Our certified Enagic Product Specialist in {demoForm.city} will call you to confirm your address and bring a live ORP, pH, and pesticide demonstration kit to your home.
                </p>
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="px-5 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      placeholder="e.g. 9849123456"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={demoForm.city}
                      onChange={(e) => setDemoForm({ ...demoForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Home Drinking Water Source</label>
                  <select
                    value={demoForm.waterSource}
                    onChange={(e) => setDemoForm({ ...demoForm, waterSource: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                  >
                    <option value="Municipal (Manjeera / Krishna) & RO">Municipal (Manjeera / Krishna) + Home RO</option>
                    <option value="Borewell Water with Softener">Borewell Water with Softener</option>
                    <option value="20-Liter Commercial Water Cans">20-Liter Commercial Water Cans</option>
                    <option value="Packaged Mineral / Alkaline Bottles">Packaged Alkaline / Mineral Bottles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Demo Date</label>
                  <input
                    type="date"
                    value={demoForm.preferredDate}
                    onChange={(e) => setDemoForm({ ...demoForm, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/30 transition disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Scheduling Demo Specialist...' : 'Schedule Live In-Home Demo (No Obligation)'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
