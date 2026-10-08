import React, { useState } from 'react';
import { 
  Flame, 
  Droplet, 
  PieChart, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Info, 
  User, 
  Phone, 
  Mail,
  Activity
} from 'lucide-react';
import { api } from '../../services/api';

interface NutritionCalculatorsProps {
  initialTab?: 'bmi' | 'calorie' | 'water' | 'macro';
}

export const NutritionCalculatorsSuite: React.FC<NutritionCalculatorsProps> = ({ initialTab = 'bmi' }) => {
  const [activeTab, setActiveTab] = useState<'bmi' | 'calorie' | 'water' | 'macro'>(initialTab);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', city: 'Hyderabad' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. BMI State
  const [heightCm, setHeightCm] = useState(168);
  const [weightKg, setWeightKg] = useState(74);
  const [bmiAge, setBmiAge] = useState(30);
  const [gender, setGender] = useState<'male' | 'female'>('female');

  // BMI Math
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (bmi < 25) {
    bmiCategory = 'Normal Weight (Optimal)';
    bmiColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  } else if (bmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else {
    bmiCategory = 'Obese Class';
    bmiColor = 'text-rose-600 bg-rose-50 border-rose-200';
  }
  const minHealthyWeight = Number((18.5 * heightM * heightM).toFixed(1));
  const maxHealthyWeight = Number((24.9 * heightM * heightM).toFixed(1));
  const weightToLose = weightKg > maxHealthyWeight ? Number((weightKg - maxHealthyWeight).toFixed(1)) : 0;
  const weightToGain = weightKg < minHealthyWeight ? Number((minHealthyWeight - weightKg).toFixed(1)) : 0;

  // 2. Calorie / BMR State
  const [activityLevel, setActivityLevel] = useState<number>(1.375); // Lightly active
  const [fitnessGoal, setFitnessGoal] = useState<'loss' | 'maintain' | 'gain'>('loss');

  // Mifflin-St Jeor Formula
  // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
  // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
  const bmr = gender === 'male'
    ? Math.round((10 * weightKg) + (6.25 * heightCm) - (5 * bmiAge) + 5)
    : Math.round((10 * weightKg) + (6.25 * heightCm) - (5 * bmiAge) - 161);

  const tdee = Math.round(bmr * activityLevel);
  const targetCalories = fitnessGoal === 'loss'
    ? Math.round(tdee - 500)
    : fitnessGoal === 'gain'
    ? Math.round(tdee + 400)
    : tdee;

  // 3. Water Intake State
  const [workoutMinutes, setWorkoutMinutes] = useState(45);
  const [climate, setClimate] = useState<'moderate' | 'hot'>('hot');

  // Water calculation: 35ml per kg + 500ml per 45 min workout + 400ml for hot climate
  const baselineWater = (weightKg * 35) / 1000;
  const workoutWater = (workoutMinutes / 45) * 0.5;
  const climateWater = climate === 'hot' ? 0.4 : 0.0;
  const totalWaterLiters = Number((baselineWater + workoutWater + climateWater).toFixed(1));
  const glasses = Math.round(totalWaterLiters * 4); // 250ml glasses

  // 4. Macro Split State (based on target calories)
  const proteinGrams = fitnessGoal === 'loss' 
    ? Math.round((targetCalories * 0.35) / 4)
    : Math.round((targetCalories * 0.30) / 4);
  const carbGrams = fitnessGoal === 'loss'
    ? Math.round((targetCalories * 0.40) / 4)
    : Math.round((targetCalories * 0.50) / 4);
  const fatGrams = Math.round((targetCalories * 0.25) / 9);

  const handleSaveCalculation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let calcName = '';
    let inputData = {};
    let resultData = {};

    if (activeTab === 'bmi') {
      calcName = 'Herbalife BMI & Weight Evaluation';
      inputData = { heightCm, weightKg, bmiAge, gender };
      resultData = { bmi, bmiCategory, minHealthyWeight, maxHealthyWeight, weightToLose, weightToGain };
    } else if (activeTab === 'calorie') {
      calcName = 'BMR & Daily Caloric Target';
      inputData = { bmr, activityLevel, fitnessGoal, heightCm, weightKg };
      resultData = { bmr, tdee, targetCalories };
    } else if (activeTab === 'water') {
      calcName = 'Hydration & Daily Water Requirement';
      inputData = { weightKg, workoutMinutes, climate };
      resultData = { totalWaterLiters, glasses };
    } else {
      calcName = 'Personalized Macro Split Planner';
      inputData = { targetCalories, fitnessGoal };
      resultData = { proteinGrams, carbGrams, fatGrams };
    }

    try {
      await api.recordCalculation({
        division: 'nutrition',
        calculator_name: calcName,
        user_name: leadForm.name,
        user_phone: leadForm.phone,
        user_email: leadForm.email,
        input_data: inputData,
        result_data: resultData,
      });

      await api.createLead({
        division: 'nutrition',
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        city: leadForm.city,
        service_interest: `Herbalife - ${calcName}`,
        estimated_value: 9500,
        calculator_data: { input: inputData, result: resultData },
        notes: `Wellness lead. BMI: ${bmi}, Goal: ${fitnessGoal}`,
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
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header Tabs */}
      <div className="bg-slate-900 p-2 sm:p-3 flex flex-wrap gap-1 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('bmi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'bmi' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-300" />
          <span>BMI & Ideal Weight</span>
        </button>

        <button
          onClick={() => setActiveTab('calorie')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'calorie' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>BMR & Caloric Needs</span>
        </button>

        <button
          onClick={() => setActiveTab('water')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'water' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Droplet className="w-4 h-4 text-cyan-400" />
          <span>Daily Hydration Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('macro')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'macro' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <PieChart className="w-4 h-4 text-lime-400" />
          <span>Macro Split & Protein Goal</span>
        </button>
      </div>

      <div className="p-6 sm:p-10">

        {/* 1. BMI CALCULATOR */}
        {activeTab === 'bmi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-2.5 py-1 rounded-md">
                  Body Composition Evaluation
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Body Mass Index (BMI) & Ideal Weight Range
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Understand your baseline body composition to build a targeted Herbalife wellness meal and shake plan.
                </p>
              </div>

              {/* Gender & Age */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        gender === 'male' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        gender === 'female' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Age</span>
                    <span className="text-emerald-700">{bmiAge} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="16" 
                    max="80" 
                    value={bmiAge} 
                    onChange={(e) => setBmiAge(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Height Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Height</label>
                  <span className="text-emerald-700 font-extrabold text-base">
                    {heightCm} cm ({Math.floor(heightCm / 30.48)}' {Math.round((heightCm % 30.48) / 2.54)}")
                  </span>
                </div>
                <input 
                  type="range" 
                  min="130" 
                  max="210" 
                  value={heightCm} 
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Current Weight</label>
                  <span className="text-emerald-700 font-extrabold text-base">{weightKg} kg</span>
                </div>
                <input 
                  type="range" 
                  min="35" 
                  max="160" 
                  value={weightKg} 
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Legal Disclaimer notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Informational wellness estimate. Herbalife products are dietary supplements and do not diagnose, treat, or prevent medical ailments.
                </span>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  Your BMI Evaluation
                </span>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-white">{bmi}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${bmiColor}`}>
                    {bmiCategory}
                  </span>
                </div>

                <div className="mt-6 space-y-3 border-t border-emerald-900/60 pt-4 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Healthy Weight Range for {heightCm}cm:</span>
                    <strong className="text-white">{minHealthyWeight} kg – {maxHealthyWeight} kg</strong>
                  </div>
                  {weightToLose > 0 && (
                    <div className="flex justify-between">
                      <span>Target Weight to Normalize:</span>
                      <strong className="text-amber-400">~{weightToLose} kg reduction</strong>
                    </div>
                  )}
                  {weightToGain > 0 && (
                    <div className="flex justify-between">
                      <span>Target Weight to Normalize:</span>
                      <strong className="text-cyan-400">~{weightToGain} kg healthy gain</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Recommended Herbalife Program:</span>
                    <strong className="text-emerald-300 font-semibold">
                      {bmi >= 25 ? 'Formula 1 Weight Loss Pack' : 'Cellular Nutrition & Energy Pack'}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-900/60">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Get Free 1-on-1 Wellness Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. CALORIE & BMR CALCULATOR */}
        {activeTab === 'calorie' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-600 tracking-wider uppercase bg-amber-50 px-2.5 py-1 rounded-md">
                  Metabolic Energy Calculation
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  BMR & Daily Caloric Target
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Using the clinically proven Mifflin-St Jeor formula to determine your Total Daily Energy Expenditure (TDEE).
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Physical Activity Routine</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { label: 'Sedentary (Desk Job, little exercise)', val: 1.2 },
                    { label: 'Lightly Active (1-3 days/wk walks)', val: 1.375 },
                    { label: 'Moderately Active (3-5 days gym)', val: 1.55 },
                    { label: 'Very Active (Hard training 6-7 days)', val: 1.725 },
                  ].map((act, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActivityLevel(act.val)}
                      className={`p-3 rounded-xl border text-left transition ${
                        activityLevel === act.val 
                          ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Your Primary Transformation Goal</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'loss', label: 'Fat Loss (-500 kcal)' },
                    { key: 'maintain', label: 'Maintain Energy' },
                    { key: 'gain', label: 'Muscle Gain (+400 kcal)' },
                  ].map((goal) => (
                    <button
                      key={goal.key}
                      type="button"
                      onClick={() => setFitnessGoal(goal.key as any)}
                      className={`py-2.5 text-xs font-bold rounded-xl border text-center transition ${
                        fitnessGoal === goal.key 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Target Daily Intake
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white">
                  {targetCalories} <span className="text-lg font-bold text-amber-300">kcal/day</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Your Basal Metabolic Rate (BMR) is <strong>{bmr} kcal</strong>. TDEE is <strong>{tdee} kcal</strong>.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-amber-800/40 space-y-2 text-xs">
                  <div className="font-bold text-amber-300">Herbalife Shake Meal Substitution:</div>
                  <div className="text-slate-300">
                    Replace breakfast with 1 Herbalife Formula 1 Shake (~220 kcal, 24g protein) to save ~400 clean calories effortless every morning.
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-800/60">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Receive Personalized Shake Diet Chart</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. WATER INTAKE CALCULATOR */}
        {activeTab === 'water' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-600 tracking-wider uppercase bg-cyan-50 px-2.5 py-1 rounded-md">
                  Cellular Hydration Requirements
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Personalized Daily Water Intake
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Water is critical for nutrient transport, fat metabolism, and cellular vitality.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Body Weight</label>
                  <span className="text-cyan-700 font-bold">{weightKg} kg</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="140" 
                  value={weightKg} 
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-700">Daily Exercise / Sweat Time</label>
                  <span className="text-cyan-700 font-bold">{workoutMinutes} minutes</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="120" 
                  step="15"
                  value={workoutMinutes} 
                  onChange={(e) => setWorkoutMinutes(Number(e.target.value))}
                  className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Climate & Ambient Temperature</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setClimate('moderate')}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      climate === 'moderate' ? 'bg-cyan-50 border-cyan-500 text-cyan-900' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    Moderate / Air Conditioned
                  </button>
                  <button
                    type="button"
                    onClick={() => setClimate('hot')}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      climate === 'hot' ? 'bg-cyan-50 border-cyan-500 text-cyan-900' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    Hot & Humid Tropical Climate
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                  Optimal Daily Hydration
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white">
                  {totalWaterLiters} <span className="text-xl font-bold text-cyan-300">Liters</span>
                </div>
                <span className="text-xs text-slate-300 block mt-1">
                  Approximately <strong>{glasses} glasses</strong> (250ml each) spread across the day.
                </span>

                <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-800/40 text-xs space-y-2">
                  <div className="font-bold text-cyan-300">Coach's Hydration Tip:</div>
                  <p className="text-slate-300">
                    Pair your daily hydration with Herbalife Afresh Energy Drink mix for improved metabolic alertness and natural caffeine from tea extracts!
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-cyan-800/60">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Hydration & Wellness Routine</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. MACRO SPLIT */}
        {activeTab === 'macro' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-lime-600 tracking-wider uppercase bg-lime-50 px-2.5 py-1 rounded-md">
                  Optimal Macronutrient Distribution
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Macronutrient Split Planner
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Balanced ratios of high-grade bioavailable protein, complex carbohydrates, and essential healthy fats.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-xs font-bold text-emerald-800 block">Protein Target</span>
                  <span className="text-2xl font-black text-emerald-950 mt-1 block">{proteinGrams}g</span>
                  <span className="text-[11px] text-emerald-700">35% of energy</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <span className="text-xs font-bold text-amber-800 block">Complex Carbs</span>
                  <span className="text-2xl font-black text-amber-950 mt-1 block">{carbGrams}g</span>
                  <span className="text-[11px] text-amber-700">40% of energy</span>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-center">
                  <span className="text-xs font-bold text-cyan-800 block">Healthy Fats</span>
                  <span className="text-2xl font-black text-cyan-950 mt-1 block">{fatGrams}g</span>
                  <span className="text-[11px] text-cyan-700">25% of energy</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-lime-400 uppercase tracking-wider block mb-2">
                  Personalized Protein Benchmark
                </span>
                <div className="text-3xl font-black text-white">
                  {proteinGrams} grams / day
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Required to protect lean muscle mass and accelerate fat burning.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-lime-800/40 text-xs space-y-1.5">
                  <div className="font-bold text-lime-300">How Herbalife Fulfills It:</div>
                  <p className="text-slate-300">
                    2 Scoops of Formula 1 Shake + 1 Scoop of Personalized Protein Powder delivers 24g of 100% bioavailable soy and whey protein per serving.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-900/60">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Custom Herbalife Diet Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* LEAD CAPTURE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => { setShowModal(false); setSubmitted(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Wellness Profile Received!</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you, <strong>{leadForm.name}</strong>. Our certified Herbalife Independent Associate (Sunita Rao) has received your BMI and calorie metrics and will WhatsApp you your personalized meal and shake schedule.
                </p>
                <button
                  onClick={() => { setShowModal(false); setSubmitted(false); }}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveCalculation} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Free Consultation
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    Receive Your Herbalife Wellness Plan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Get your personalized calories and shake guidelines sent to your phone.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Sunita Reddy"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98480 34567"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email (Optional)</label>
                    <input 
                      type="email" 
                      placeholder="sunita@example.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md transition"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Free Diet Evaluation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
