import React from 'react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { SolarCalculatorAdvanced } from '../../components/calculators/SolarCalculatorAdvanced';

export const SolarCalculatorPage: React.FC = () => {
  return (
    <div>
      <DivisionNav division="solar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full">
            Engineering & Financial Simulators
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Advanced Rooftop Solar & Subsidy Calculator
          </h1>
          <p className="text-sm text-slate-600">
            Accurate estimation of system capacity, roof shadow-free space, capital investment, ₹78,000 PM Surya Ghar DBT subsidy, and 25-year financial payback.
          </p>
        </div>

        <SolarCalculatorAdvanced />
      </div>
    </div>
  );
};
