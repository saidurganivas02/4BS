import React from 'react';
import { Sparkles, Calendar, Droplets, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { KangenCalculatorsSuite } from '../../components/calculators/KangenCalculatorsSuite';
import { useAppointmentModal } from '../../context/AppointmentModalContext';
import { PageMeta } from '../../components/common/PageMeta';

export const KangenDemoBooking: React.FC = () => {
  const { openBookingModal } = useAppointmentModal();

  return (
    <div>
      <PageMeta 
        title="Schedule Free Kangen Water Demo" 
        description="Experience live negative ORP antioxidant testing, pH spectrum demonstration, and micro-clustered water right at your residence." 
      />
      <DivisionNav division="kangen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Certified Enagic Specialist In-Home Session</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Schedule a Free Kangen Water Demo
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Taste freshly ionized hydrogen-rich water and witness real-time experiments: negative ORP test, pH litmus spectrum, and tomato oil pesticide emulsification.
          </p>

          <div className="pt-2">
            <button
              onClick={() => openBookingModal({
                division: 'kangen',
                service: 'Live In-Home Kangen Ionizer Demonstration & Water Test',
                defaultMode: 'in_person'
              })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-cyan-600/20 hover:scale-[1.02] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In-Home Demonstration Now</span>
            </button>
          </div>
        </div>

        {/* Demo Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Antioxidant ORP Meter Test</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We bring clinical digital ORP meters to test your tap water, bottled RO water, and freshly ionized Kangen water for negative charge (-850mV).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Oil Emulsification Test</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Witness 11.5 pH Strong Kangen Water dissolve oil and wash away wax-based petroleum pesticides from groceries in seconds.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Tea Micro-Clustering Test</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Brew green tea instantly with room-temperature Kangen water to see cellular permeability and accelerated absorption.
            </p>
          </div>
        </div>

        {/* Calculators Suite */}
        <div className="pt-6">
          <KangenCalculatorsSuite />
        </div>
      </div>
    </div>
  );
};
