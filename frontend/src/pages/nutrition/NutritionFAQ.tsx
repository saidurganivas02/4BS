import React, { useState } from 'react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useAppointmentModal } from '../../context/AppointmentModalContext';
import { HerbalifeLogo } from '../../components/common/HerbalifeLogo';

export const NutritionFAQ: React.FC = () => {
  const { openBookingModal } = useAppointmentModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Herbalife Formula 1 Shake and how does it support weight management?',
      a: 'Herbalife Formula 1 is a scientifically formulated meal replacement shake mix that provides high-quality soy protein isolate, 21 essential vitamins and minerals, dietary fiber, and essential micronutrients. When substituted for 1 or 2 meals per day within a calorie-controlled diet and active lifestyle, it creates a sustainable caloric deficit while maintaining lean muscle mass.'
    },
    {
      q: 'Will I regain weight once I achieve my target weight and stop taking shakes?',
      a: 'No, provided you transition through the "Maintenance Phase". Weight regain happens when individuals return to old uncontrolled calorie surpluses. Our wellness coaching focuses on building lifelong metabolic habits, portion awareness, adequate hydration, and protein pacing so your body permanently maintains its new set-point.'
    },
    {
      q: 'How does personal wellness coaching work with our center?',
      a: 'When you begin a program, you are assigned a certified Herbalife Wellness Coach who provides: 1) Initial Body Composition & BMR Evaluation; 2) Personalized daily meal timeline; 3) Daily WhatsApp check-ins for meal photos and hydration; 4) Weekly body measurements; and 5) Community workout challenges.'
    },
    {
      q: 'Are Herbalife products safe for daily consumption?',
      a: 'Yes. Herbalife products are developed by a team of over 300 scientists, physicians, and nutrition PhDs, and are manufactured in ISO 17025 accredited facilities following stringent "Seed to Feed" quality standards. Herbalife products adhere to Food Safety and Standards Authority of India (FSSAI) guidelines.'
    },
    {
      q: 'What is the role of Herbalife Afresh Energy Drink?',
      a: 'Afresh Energy Drink mix is a low-calorie botanical beverage containing natural orange pekoe tea and green tea extracts, along with guarana seeds. It provides natural caffeine to boost metabolic alertness and energy without the heavy sugar load of typical commercial sodas or sweetened coffees.'
    },
    {
      q: 'What is the difference between Herbalife 24 (H24) and standard nutrition products?',
      a: 'Herbalife24 is a specialized sports nutrition line formulated for athletes and fitness enthusiasts. Every batch is certified for sport by Informed-Sport (NSF/LGC), verifying zero banned athletic substances under World Anti-Doping Agency (WADA) protocols.'
    }
  ];

  return (
    <div>
      <DivisionNav division="nutrition" />

      <div className="bg-slate-50 text-slate-800 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <HerbalifeLogo variant="badge" size="md" className="mx-auto shadow-sm" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <HerbalifeLogo variant="icon" size="xs" />
              <span>Herbalife Wellness Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nutrition & Cellular Health FAQs
            </h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Clear answers regarding meal replacement science, coaching support, safe weight loss, athletic fuel, and product safety.
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
                      <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-emerald-700' : ''}`} />
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
          <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center space-y-3 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Ready for a Customized Body Profile?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Book a body composition analysis and diet audit with our certified Herbalife wellness coaches.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => openBookingModal({ division: 'nutrition', service: 'Personalized Body Composition & Wellness Assessment' })}
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <span>Book Free Wellness Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
