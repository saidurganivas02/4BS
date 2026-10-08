import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DivisionNav } from '../../components/common/DivisionNav';
import { NutritionCalculatorsSuite } from '../../components/calculators/NutritionCalculatorsSuite';
import { HerbalifeLogo } from '../../components/common/HerbalifeLogo';

export const NutritionCalculators: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tab = (searchParams.get('tab') as any) || 'bmi';

  return (
    <div>
      <DivisionNav division="nutrition" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <HerbalifeLogo variant="badge" size="md" className="mx-auto shadow-sm" />
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Body Composition & Energy
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Herbalife Nutrition Calculators
          </h1>
          <p className="text-sm text-slate-600">
            Determine your Body Mass Index (BMI), calculate your daily caloric energy requirements via Mifflin-St Jeor formula, evaluate hydration targets, and customize your protein macro split.
          </p>
        </div>

        <NutritionCalculatorsSuite initialTab={tab} />
      </div>
    </div>
  );
};
