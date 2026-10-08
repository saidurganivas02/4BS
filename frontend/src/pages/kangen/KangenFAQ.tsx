import React, { useState } from 'react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { Droplets, ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

export const KangenFAQ: React.FC = () => {
  const { openBookingModal } = useAppointmentModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Kangen Water® and how is it different from ordinary RO purified water?',
      a: 'Standard Reverse Osmosis (RO) removes impurities but also strips away essential alkaline minerals, producing acidic, "dead" water with an oxidizing positive ORP (+200mV to +400mV). Enagic Kangen Water ionizers use medical-grade solid titanium plates double-coated with platinum to perform water electrolysis. This separates the water into hydrogen-rich, negatively charged (-400mV to -850mV ORP) alkaline drinking water and oxidized acidic water, while retaining essential calcium, potassium, and magnesium ions.'
    },
    {
      q: 'What are the 5 types of water produced by an Enagic machine?',
      a: '1) Strong Kangen Water (pH 11.5): Natural solvent that strips oil-based chemical pesticides from produce; 2) Kangen Drinking Water (pH 8.5 – 9.5): Hydrogen-rich micro-clustered water for optimal hydration and cooking; 3) Clean Neutral Water (pH 7.0): Filtered pure water for taking prescription medications and infant formula; 4) Beauty Water (pH 6.0): Natural astringent toner for glowing skin and soft hair; 5) Strong Acidic Water (pH 2.5): Hypochlorous acid water with potent sanitizing and disinfectant properties.'
    },
    {
      q: 'What does Oxidation Reduction Potential (ORP) mean?',
      a: 'ORP measures the capacity of a liquid to either oxidize (age/corrode) or reduce oxidation (act as an antioxidant). Positive ORP values (soda +400mV, bottled water +200mV) accelerate cellular oxidative stress. A negative ORP value (fresh Kangen Water ranges between -400mV and -850mV) indicates an abundance of dissolved active molecular hydrogen (H2), providing cellular antioxidant benefits.'
    },
    {
      q: 'Why does Enagic hold the ISO 13485 Medical Device Certification?',
      a: 'Enagic is the world’s only water ionizer manufacturer awarded the ISO 13485 certification, the rigorous global standard for medical equipment manufacturing and design. In Japan, Enagic ionizers have been endorsed by the Japanese Association of Preventive Medicine for Adult Diseases, comprising over 6,500 medical doctors.'
    },
    {
      q: 'What maintenance does a Kangen Water machine require?',
      a: 'Enagic machines are engineered in Japan to last 20+ years. Basic routine maintenance includes: 1) E-Cleaning (monthly 30-minute citric acid flush using the included reusable cleaning cartridge); 2) High-grade internal water filter replacement approximately once every 12 to 14 months (6,000 liters); and 3) Annual Deep Cleaning service provided at our certified regional service center.'
    },
    {
      q: 'Can I see a live demonstration before deciding to purchase?',
      a: 'Yes! We provide complimentary, no-obligation live in-home or clinic demonstrations. Our technician tests your existing tap water, bottled water, and RO water using pH drops and digital ORP meters, demonstrating vegetable pesticide stripping in real-time. You can book a free demo online anytime.'
    }
  ];

  return (
    <div>
      <DivisionNav division="kangen" />

      <div className="bg-slate-50 text-slate-800 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold">
              <Droplets className="w-4 h-4 text-sky-700" />
              <span>Enagic Japanese Technology</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kangen Water® Science & FAQs
            </h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Learn about water electrolysis, negative ORP antioxidant properties, 5 functional water types, and Japanese medical certifications.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-sky-700 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-sky-700' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Consultation CTA Card */}
          <div className="bg-white border border-sky-200 rounded-2xl p-8 text-center space-y-3 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Experience the Water in Your Own Home</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Book a live in-home ionization test with complimentary fresh Kangen Water sample bottles for your family.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => openBookingModal({ division: 'kangen', service: 'Live In-Home Kangen Ionizer Demonstration & Water Test' })}
                className="px-6 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <span>Book Live Water Demonstration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
