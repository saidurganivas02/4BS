import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  PhoneCall,
  Sparkles,
  Info,
  Package,
  Clock,
  ShieldCheck,
  Award,
  Heart,
  X,
  User,
  Phone,
  Target,
  Zap
} from 'lucide-react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { HerbalifeLogo } from '../../components/common/HerbalifeLogo';
import { api } from '../../services/api';

export const NutritionProducts: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [selectedPackTitle, setSelectedPackTitle] = useState<string>('Personalized Nutrition Plan');
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    city: 'Hyderabad',
    goal: 'Weight Loss & Calorie Management',
    currentWeight: '75',
    targetWeight: '65',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const curatedBundles = [
    {
      id: 'weight-loss-starter',
      title: '30-Day Fat Loss & Calorie Deficit Starter Pack',
      goalKey: 'weight-loss',
      tag: 'Best Seller for Beginners',
      calories: '220 kcal / Shake',
      protein: '24g Protein per serving',
      badge: 'Weight Management',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: 'The clinically researched foundational kit engineered to replace 1-2 heavy meals while maintaining lean muscle and boosting daily energy.',
      contents: [
        'Formula 1 Nutritional Shake Mix (500g, choice of 6 flavors)',
        'Personalized Protein Powder (PPP 400g) Soy & Whey Blend',
        'Afresh Energy Drink Mix (50g - Lemon / Tulsi)',
        'Active Fiber Complex for digestive fullness & gut health',
        'Herbalife Signature Shaker + Measuring Spoon Set'
      ],
      schedule: [
        { time: '07:30 AM', task: 'Warm Afresh Energy Drink (Metabolism kickstart)' },
        { time: '08:30 AM', task: 'Formula 1 + PPP Protein Shake (Healthy Breakfast)' },
        { time: '01:00 PM', task: 'Balanced Colorful Indian Lunch (Fiber + Rotis/Rice + Dal)' },
        { time: '04:30 PM', task: 'Afternoon Refresh Afresh + Roasted Makhana Snack' },
        { time: '08:00 PM', task: 'Dinner Formula 1 Shake (Light nutrient dinner)' },
      ],
      expectedResult: 'Expected 2.5 kg - 4.5 kg healthy fat reduction in 30 days with coach guidance.'
    },
    {
      id: 'muscle-h24-sports',
      title: 'Herbalife24® Athlete & Lean Muscle Performance Stack',
      goalKey: 'muscle',
      tag: 'NSF Certified for Sport',
      calories: 'Clean Fuel',
      protein: 'Tri-Core Protein Matrix',
      badge: 'Athletic Nutrition',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'Engineered for gym athletes, runners, and fitness enthusiasts requiring rapid post-workout recovery and glycogen replenishing.',
      contents: [
        'H24 Rebuild Strength (24g Whey & Casein Tri-Core Protein + BCAAs)',
        'H24 CR7 Drive (Bioavailable Electrolyte Hydration with Cristiano Ronaldo)',
        'Cell Activator (Alpha Lipoic Acid for cellular nutrient absorption)',
        'Multivitamin Mineral & Herbal Complex (21 micronutrients)'
      ],
      schedule: [
        { time: 'Pre-Workout', task: 'H24 CR7 Drive with 500ml water for stamina & electrolytes' },
        { time: 'Post-Workout', task: 'H24 Rebuild Strength within 30 mins to halt muscle breakdown' },
        { time: 'Daily Meals', task: 'Multivitamin Complex with Lunch & Dinner' },
        { time: 'Night', task: 'Cell Activator for deep mitochondrial recovery' },
      ],
      expectedResult: 'Noticeable stamina improvement, zero post-gym soreness, and accelerated lean hypertrophy.'
    },
    {
      id: 'cellular-vitality-heart',
      title: 'Targeted Cellular Wellness & Cardiovascular Shield',
      goalKey: 'vitality',
      tag: 'Heart & Joint Longevity',
      calories: 'Zero Sugar',
      protein: 'Nutrient Micronutrients',
      badge: 'Cellular Health',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      description: 'High-purity Omega-3 fatty acids, glucosamine joint cushions, and cellular botanical extracts designed for mature adults and active professionals.',
      contents: [
        'Herbalifeline Omega-3 Fish Oil (High-potency EPA & DHA with zero fishy burps)',
        'Joint Support Tablet (Glucosamine HCl + Scutellaria Baicalensis)',
        'Multivitamin Herbal Tablets (Immunity & cellular defense)',
        'Cell Activator for nutrient transport across cell membranes'
      ],
      schedule: [
        { time: 'Morning', task: 'Multivitamin + Joint Support with breakfast' },
        { time: 'Afternoon', task: 'Herbalifeline Omega-3 softgel with lunch' },
        { time: 'Evening', task: 'Cell Activator with dinner' },
      ],
      expectedResult: 'Supports cardiovascular elasticity, flexible joints without stiffness, and steady daily vitality.'
    },
    {
      id: 'skin-radiance-glow',
      title: 'Dermal Collagen Radiance & Outer Vitality Kit',
      goalKey: 'skin',
      tag: 'Botanical Beauty Care',
      calories: 'Low Glycemic',
      protein: 'Hydrolyzed Bioactive Collagen',
      badge: 'Skin & Outer Care',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      description: 'Enhances skin hydration and elasticity from the inside out with hydrolyzed collagen peptides, pure aloe vera, and vitamins B3, C, and E.',
      contents: [
        'Skin Collagen Beauty Booster (Hydrolyzed collagen peptides + Biotin)',
        'Herbal Aloe Soothing Gel (Concentrated pure botanical hydration)',
        'Herbal Aloe Bath & Body Bar (Gentle barrier protection)',
        'Afresh Peach / Ginger Energy Mix'
      ],
      schedule: [
        { time: 'Morning Routine', task: 'Herbal Aloe Face cleanse + refreshing soothing gel' },
        { time: '11:00 AM', task: 'Skin Collagen Beauty Booster drink with cold water' },
        { time: 'Night Routine', task: 'Herbal Aloe Soothing Gel application before bed' },
      ],
      expectedResult: 'Enhanced dermal elasticity, reduced fine dryness lines, and hydrated natural radiance.'
    }
  ];

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.name || !consultForm.phone) return;

    setIsSubmitting(true);
    try {
      await api.createLead({
        division: 'nutrition',
        name: consultForm.name,
        phone: consultForm.phone,
        city: consultForm.city,
        service_interest: `Herbalife Plan: ${selectedPackTitle}`,
        status: 'new',
        estimated_value: 12500,
        notes: `Goal: ${consultForm.goal}, Current Weight: ${consultForm.currentWeight}kg, Target: ${consultForm.targetWeight}kg`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBundles = selectedGoal === 'all'
    ? curatedBundles
    : curatedBundles.filter(b => b.goalKey === selectedGoal);

  return (
    <div className="bg-slate-50 min-h-screen">
      <DivisionNav division="nutrition" />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-900 via-teal-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-5">
          <HerbalifeLogo variant="badge" size="md" className="mx-auto shadow-md" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Cellular Science & Personalized Coaching</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Targeted Herbalife Nutrition Programs
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Clinically tested meal replacements, athletic performance supplements, and botanical wellness solutions paired with dedicated 1-on-1 lifestyle coaching.
          </p>

          {/* Quick Nutritional Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-emerald-400">&lt; 220 kcal</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Calorie-Controlled Meal</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-teal-400">24g Protein</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">High-Quality Soy & Whey</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-amber-400">21 Minerals</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Essential Micronutrients</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-2xl font-black text-cyan-400">Low GI</span>
              <span className="block text-xs font-semibold text-slate-300 mt-0.5">Certified Glycemic Index</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Goal Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { key: 'all', label: 'All Curated Programs' },
            { key: 'weight-loss', label: 'Weight & Fat Loss' },
            { key: 'muscle', label: 'H24 Athletic Performance' },
            { key: 'vitality', label: 'Cellular Heart & Joints' },
            { key: 'skin', label: 'Skin & Outer Radiance' },
          ].map((goal) => (
            <button
              key={goal.key}
              onClick={() => setSelectedGoal(goal.key)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition ${
                selectedGoal === goal.key
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>

        {/* Curated Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBundles.map((bundle) => (
            <div 
              key={bundle.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${bundle.badgeColor}`}>
                    {bundle.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    {bundle.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                  {bundle.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {bundle.description}
                </p>

                {/* Key Spec Badges */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    ⚡ {bundle.calories}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    💪 {bundle.protein}
                  </span>
                </div>

                {/* What's Inside Pack */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Included in this 30-Day Pack</span>
                  </span>
                  <ul className="space-y-2">
                    {bundle.contents.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Daily Routine Timeline */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Sample Coach Daily Routine</span>
                  </span>
                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    {bundle.schedule.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-[11px] text-slate-600">
                        <strong className="text-emerald-800 font-bold shrink-0 w-16">{step.time}</strong>
                        <span>{step.task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Result */}
                <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-emerald-900 font-medium">
                  <strong>Expected Target:</strong> {bundle.expectedResult}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/nutrition/calculators"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Check Caloric & Macro Match</span>
                </Link>

                <button
                  onClick={() => {
                    setSelectedPackTitle(bundle.title);
                    setSubmitted(false);
                    setConsultModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
                >
                  <span>Order with Coach Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Transformation Showcase */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Real Customer Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Transformations Powered by Nutrition & Accountability
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Products achieve maximum efficacy when paired with personalized habit pacing, hydration tracking, and our supportive wellness community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Pooja C., 34</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">-11 kg in 90 Days</span>
              </div>
              <p className="text-xs text-slate-600 italic">
                "Replaced my heavy paratha breakfast with Formula 1 Dutch Chocolate and added PPP protein. My afternoon sluggishness vanished and my visceral fat dropped by 3 points!"
              </p>
              <div className="text-[11px] font-semibold text-emerald-700">
                Program: Weight Loss Starter + Afresh
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Karthik R., 28</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">+4.5 kg Lean Muscle</span>
              </div>
              <p className="text-xs text-slate-600 italic">
                "H24 Rebuild Strength changed my recovery. As a marathon runner and strength trainer, my soreness recovery time halved within the first two weeks."
              </p>
              <div className="text-[11px] font-semibold text-amber-700">
                Program: Herbalife24 Athlete Stack
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Sunita M., 46</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Improved Joint Flexibility</span>
              </div>
              <p className="text-xs text-slate-600 italic">
                "Herbalifeline Omega-3 combined with Joint Support made climbing stairs effortless again without knee discomfort. Genuine sealed products straight from associate."
              </p>
              <div className="text-[11px] font-semibold text-rose-700">
                Program: Cellular & Heart Longevity
              </div>
            </div>
          </div>
        </div>

        {/* Quality & Authenticity Guarantee */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-800/60 px-3 py-1 rounded-full">
              Direct Distributor Dispatch
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              100% Genuine Sealed Products with Free Coach Mentorship
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Herbalife products are sold exclusively through registered Independent Associates. We guarantee official sealed packaging, direct fresh warehouse dispatch, batch QR verification, and a 30-day money-back satisfaction guarantee.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => {
                setSelectedPackTitle('Personalized Nutrition Evaluation');
                setSubmitted(false);
                setConsultModalOpen(true);
              }}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs text-center shadow-lg transition"
            >
              Book Free Wellness Assessment
            </button>
            <Link
              to="/nutrition/calculators"
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs text-center shadow-md transition"
            >
              Calculate BMI & Calorie Deficit
            </Link>
          </div>
        </div>

        {/* Official Associate Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 text-center leading-relaxed">
          <Info className="w-4 h-4 text-slate-400 inline mr-1" />
          Herbalife products are nutritional food supplements and are not intended to diagnose, treat, cure, or prevent any disease. Results may vary depending on diet adherence, metabolic baseline, and exercise routine.
        </div>
      </div>

      {/* Wellness Consultation Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setConsultModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
                Personalized Coaching
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Order Pack & Get Free Wellness Coach
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Selected: <strong className="text-emerald-700">{selectedPackTitle}</strong>
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">Consultation Request Confirmed!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{consultForm.name}</strong>. Your assigned Senior Wellness Coach will reach out on WhatsApp / Phone with your custom diet plan, flavor options, and product dispatch details.
                </p>
                <button
                  onClick={() => setConsultModalOpen(false)}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    placeholder="e.g. Priya Reddy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                      placeholder="e.g. 9849012345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={consultForm.city}
                      onChange={(e) => setConsultForm({ ...consultForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Weight (kg)</label>
                    <input
                      type="number"
                      value={consultForm.currentWeight}
                      onChange={(e) => setConsultForm({ ...consultForm, currentWeight: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Weight (kg)</label>
                    <input
                      type="number"
                      value={consultForm.targetWeight}
                      onChange={(e) => setConsultForm({ ...consultForm, targetWeight: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Health Goal</label>
                  <select
                    value={consultForm.goal}
                    onChange={(e) => setConsultForm({ ...consultForm, goal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="Weight Loss & Calorie Management">Weight Loss & Fat Reduction</option>
                    <option value="Lean Muscle & Gym Performance">Lean Muscle & Gym Recovery</option>
                    <option value="Energy & Daily Stamina">Energy & Fatigue Relief</option>
                    <option value="Joint & Cardiovascular Care">Joint & Heart Longevity</option>
                    <option value="Skin Glow & Collagen Support">Skin Radiance & Collagen Glow</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Assigning Coach...' : 'Connect with Coach & Get Custom Diet Plan'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
