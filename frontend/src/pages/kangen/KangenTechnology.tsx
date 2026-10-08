import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';

export const KangenTechnology: React.FC = () => {
  const waters = [
    {
      ph: 'pH 11.5',
      name: 'Strong Kangen Water',
      badge: 'Chemical-Free Degreaser',
      color: 'bg-purple-100 text-purple-900 border-purple-200',
      tagColor: 'bg-purple-600',
      description: 'Not for drinking. Due to its strong emulsifying effect, it breaks down oil-based pesticides and chemicals from store-bought vegetables, fruits, rice, and meats.',
      uses: [
        'Produce Wash: Removes wax, dirt, and pesticides from apples, tomatoes, grapes, and greens',
        'Kitchen Degreasing: Cleans stovetops, range hoods, and greasy cooking pans without toxic detergents',
        'Stain Removal: Dissolves oil, soy sauce, and coffee stains from clothing fabrics',
      ],
    },
    {
      ph: 'pH 8.5 – 9.5',
      name: 'Kangen Drinking Water',
      badge: 'Antioxidant Alkaline Drinking',
      color: 'bg-blue-100 text-blue-900 border-blue-200',
      tagColor: 'bg-blue-600',
      description: 'Delicious, smooth, micro-clustered drinking water with negative ORP up to -850mV and active molecular hydrogen. Promotes cellular hydration and restores acid-base equilibrium.',
      uses: [
        'Daily Hydration: Unlocks rapid cellular hydration without heavy stomach sloshing',
        'Tea & Coffee: Micro-clusters extract rich polyphenols and aromatic flavors using less coffee/tea leaves',
        'Soups & Cooking: Tenderizes lentils and meats, elevating the natural flavors of traditional cuisine',
      ],
    },
    {
      ph: 'pH 7.0',
      name: 'Clean Filtered Water',
      badge: 'Neutral Purified Water',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      tagColor: 'bg-emerald-600',
      description: 'Free of chlorine, rust, and heavy odors while remaining neutral at pH 7.0. Ideal for sensitive baby physiology and pharmaceutical medication.',
      uses: [
        'Baby Food & Formula: Gentle, non-alkaline neutral water perfectly suited for infants',
        'Prescription Medication: Safe for taking pharmaceutical drugs without affecting drug release kinetics',
      ],
    },
    {
      ph: 'pH 6.0',
      name: 'Beauty Water',
      badge: 'Natural Skin & Hair Astringent',
      color: 'bg-rose-100 text-rose-900 border-rose-200',
      tagColor: 'bg-rose-600',
      description: 'Matches the natural slightly acidic pH of human skin (pH 5.5 - 6.0). Acts as an all-natural astringent toner to tighten pores, restore skin hydration, and add gloss to hair.',
      uses: [
        'Face Wash & Toner: Natural pore toner after facial cleansing or shaving',
        'Hair Rinse: Replaces post-shampoo conditioner, untangling knots and adding brilliant shine',
        'Pet Grooming: Spray on dog/cat coats for soft, radiant fur',
      ],
    },
    {
      ph: 'pH 2.5',
      name: 'Strong Acidic Water',
      badge: 'Eco Sanitizer & Sterilizer',
      color: 'bg-amber-100 text-amber-900 border-amber-200',
      tagColor: 'bg-amber-600',
      description: 'Contains hypochlorous acid (HOCl) produced through electrolysis. Acts as a potent eco-friendly disinfectant with high positive ORP (+1100mV) that destroys bacteria on contact.',
      uses: [
        'Surface Sanitization: Disinfects kitchen cutting boards, knives, and countertops without bleach',
        'Hand Sanitizer: Safe, alcohol-free hand disinfection',
        'Oral Hygiene: Gargle to relieve sore throats and eliminate bad breath bacteria',
      ],
    },
  ];

  return (
    <div>
      <DivisionNav division="kangen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full">
            Full Electrolytic Spectrum
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            The 5 Types of Kangen Water®
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            One single Japanese machine replaces dozens of chemical cleaning agents, beauty toners, and mineral water bottles.
          </p>
        </div>

        <div className="space-y-6">
          {waters.map((w, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-4 flex items-start gap-4">
                <div className={`px-4 py-3 rounded-2xl font-black text-lg sm:text-xl text-white ${w.tagColor} shadow-md shrink-0`}>
                  {w.ph}
                </div>
                <div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${w.color}`}>
                    {w.badge}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">{w.name}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{w.description}</p>
                </div>
              </div>

              <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Daily Household Applications
                </span>
                <ul className="space-y-2">
                  {w.uses.map((use, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-sky-900 to-cyan-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-black">Experience the Tomato Pesticide Test Live!</h3>
            <p className="text-xs sm:text-sm text-cyan-200 mt-1 max-w-xl">
              Watch Strong Kangen Water turn cloudy yellow in seconds as it dissolves oil-based pesticides off cherry tomatoes. We provide free demonstrations across Hyderabad and AP.
            </p>
          </div>

          <Link
            to="/kangen/demo"
            className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition whitespace-nowrap"
          >
            Book Free Demonstration
          </Link>
        </div>
      </div>
    </div>
  );
};
