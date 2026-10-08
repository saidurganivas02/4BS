import React from 'react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { KangenCalculatorsSuite } from '../../components/calculators/KangenCalculatorsSuite';

export const KangenCalculators: React.FC = () => {
  return (
    <div>
      <DivisionNav division="kangen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full">
            Financial & Volume Sizing
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Kangen Water Savings & Sizing Calculator
          </h1>
          <p className="text-sm text-slate-600">
            Compare your cumulative spending on 20L plastic jars vs an Enagic Japanese ionizer, calculate thousands of plastic bottles saved, and size the right machine.
          </p>
        </div>

        <KangenCalculatorsSuite />
      </div>
    </div>
  );
};
