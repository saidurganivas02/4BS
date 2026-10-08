import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DivisionNav } from '../../components/common/DivisionNav';
import { InsuranceCalculatorsSuite } from '../../components/calculators/InsuranceCalculatorsSuite';

export const InsuranceCalculators: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tab = (searchParams.get('tab') as any) || 'hlv';

  return (
    <div>
      <DivisionNav division="insurance" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            Financial Health Diagnostic
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tata AIA Insurance Calculators Suite
          </h1>
          <p className="text-sm text-slate-600">
            Use our four mathematical simulators to calculate Human Life Value (HLV), term life insurance premiums, retirement pension requirements, or child education investments.
          </p>
        </div>

        <InsuranceCalculatorsSuite initialTab={tab} />
      </div>
    </div>
  );
};
