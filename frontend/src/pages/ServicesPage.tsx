import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  Activity,
  Layers,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { useAppointmentModal } from '../context/AppointmentModalContext';
import { PageMeta } from '../components/common/PageMeta';
import { HerbalifeLogo } from '../components/common/HerbalifeLogo';
import { BusinessDivisionType } from '../types';

type CoreDivision = 'insurance' | 'nutrition' | 'kangen' | 'solar';

interface ServiceItem {
  id: string;
  division: CoreDivision;
  divisionLabel: string;
  divisionBadge: string;
  title: string;
  category: string;
  idealFor: string;
  summary: string;
  detailedMatter: string;
  keyDeliverables: string[];
  metricBadge: { label: string; value: string };
  calculatorLink: string;
  calculatorLabel: string;
  workflowSteps: string[];
}

export const ServicesPage: React.FC = () => {
  const { openBookingModal } = useAppointmentModal();
  const [activeTab, setActiveTab] = useState<'all' | CoreDivision>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard(prev => prev === id ? null : id);
  };

  const divisionMeta: Record<CoreDivision, {
    name: string;
    tagline: string;
    description: string;
    accent: string;
    badge: string;
    themeBorder: string;
    icon: any;
    iconColor: string;
    stat: string;
    portalLink: string;
  }> = {
    insurance: {
      name: 'Tata AIA Life Insurance',
      tagline: 'Airtight Life Protection, Wealth Fortresses & Child Future Guarantee',
      description: 'Authorized insurance advisory backed by 150 years of Tata trust and AIA pan-Asian leadership. Sizing pure term protection, inflation-proof child degrees, and tax-free retirement pensions.',
      accent: 'border-blue-200 bg-blue-50/70 text-blue-900',
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      themeBorder: 'hover:border-blue-300',
      icon: ShieldCheck,
      iconColor: 'text-blue-600',
      stat: '99.13% Claim Settlement Ratio',
      portalLink: '/insurance',
    },
    nutrition: {
      name: 'Herbalife Nutrition & Cellular Wellness',
      tagline: 'Cellular Vitality, Visceral Fat Reduction & Active Sports Nutrition',
      description: 'Personalized cellular nutrition protocols pairing bioavailable Formula 1 meal replacement shakes and targeted protein pacing with continuous 1-on-1 coaching accountability.',
      accent: 'border-emerald-200 bg-emerald-50/70 text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      themeBorder: 'hover:border-emerald-300',
      icon: null as any,
      iconColor: 'text-emerald-600',
      stat: '1,500+ Transformations Guided',
      portalLink: '/nutrition',
    },
    kangen: {
      name: 'Enagic Kangen Water® Japan',
      tagline: 'Japanese Medical Grade Ionizers, Active Molecular Hydrogen & -850mV ORP',
      description: 'Transform ordinary municipal tap water into active hydrogen-rich, antioxidant micro-clustered water. Continuous medical electrolysis producing 5 distinct functional waters for drinking, sanitizing, and chemical-free produce cleaning.',
      accent: 'border-cyan-200 bg-cyan-50/70 text-cyan-900',
      badge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      themeBorder: 'hover:border-cyan-300',
      icon: Droplets,
      iconColor: 'text-cyan-600',
      stat: 'ISO 13485 Japanese Medical Device',
      portalLink: '/kangen',
    },
    solar: {
      name: 'Solar Rooftop EPC & PM Surya Ghar',
      tagline: 'Turnkey Residential & Commercial Rooftop Solar with ₹78,000 Govt Subsidy',
      description: 'End-to-end solar engineering: on-site shadow analysis, hot-dip galvanized terrace structures, Tier-1 DCR mono PERC modules, DISCOM net-metering approvals, and direct bank transfer (DBT) subsidy management.',
      accent: 'border-amber-200 bg-amber-50/70 text-amber-900',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      themeBorder: 'hover:border-amber-300',
      icon: SunMedium,
      iconColor: 'text-amber-600',
      stat: 'Up to 90% Power Bill Reduction',
      portalLink: '/solar',
    },
  };

  const servicesData: ServiceItem[] = [
    // ==========================================
    // 1. TATA AIA LIFE INSURANCE
    // ==========================================
    {
      id: 'ins-hlv',
      division: 'insurance',
      divisionLabel: 'Tata AIA Life Insurance',
      divisionBadge: 'Financial Protection',
      title: 'Human Life Value (HLV) Diagnostic & Pure Term Cover',
      category: 'Pure Term Protection',
      idealFor: 'Salaried & business breadwinners with home loans, growing families, or dependent parents',
      summary: 'Scientific calculation of your family’s real income replacement deficit to size an airtight term insurance policy with coverage up to 100 years of age.',
      detailedMatter: 'Never rely on arbitrary 10x salary thumb-rules that leave dangerous gaps during inflation. Our HLV audit rigorously calculates active liabilities (home loans, business credit), inflation-adjusted household burn rates for 25+ years, and milestone funds. Backed by Tata AIA’s industry-leading 99.13% claim settlement ratio, non-smoker discounts, and accelerated terminal illness riders.',
      keyDeliverables: [
        'Personalized HLV Capital Deficit Audit Report',
        'Term cover sizing from ₹1.0 Crore to ₹20+ Crore',
        'Accidental Death & Total Permanent Disability rider integration',
        '100% Tax deduction under Section 80C & Section 10(10D)',
      ],
      metricBadge: { label: 'Claim Ratio', value: '99.13% Settled' },
      calculatorLink: '/insurance/calculators?tab=hlv',
      calculatorLabel: 'HLV Deficit Calculator',
      workflowSteps: [
        'Step 1: Family financial & debt profile audit',
        'Step 2: Actuarial Human Life Value deficit sizing',
        'Step 3: Custom policy tenure & rider fortification',
        'Step 4: Paperless digital tele-medical & fast policy issuance',
      ],
    },
    {
      id: 'ins-child',
      division: 'insurance',
      divisionLabel: 'Tata AIA Life Insurance',
      divisionBadge: 'Child Future Security',
      title: 'Child Higher Education & Degree Capital Guarantee Fund',
      category: 'Child Education & Marriage',
      idealFor: 'Parents with children aged 0–12 planning for engineering, medical, MBA, or global university education',
      summary: 'Inflation-proof college degree capital fund designed to disburse guaranteed lump-sums at college entrance, featuring an in-built Waiver of Premium (WOP) safeguard.',
      detailedMatter: 'Education tuition fees in India and overseas inflate at 10–12% annually. This specialized plan locks in guaranteed college fund milestones. The cornerstone is the Waiver of Premium safeguard: in the unfortunate event of the parent’s premature demise, all remaining deposits are automatically funded by Tata AIA, and the promised payout is disbursed on schedule so the child’s academic dreams never halt.',
      keyDeliverables: [
        'Guaranteed capital maturity payout scheduled at child’s age 18–22',
        'Built-in Waiver of Premium (WOP) safeguarding against parent’s demise',
        'Immunity against stock market volatility and economic crashes',
        'Completely tax-free maturity payouts under Section 10(10D)',
      ],
      metricBadge: { label: 'Capital Safety', value: '100% Guaranteed' },
      calculatorLink: '/insurance/calculators?tab=child',
      calculatorLabel: 'Child College SIP Estimator',
      workflowSteps: [
        'Step 1: Target college degree tuition inflation modeling',
        'Step 2: Annual deposit & milestone disbursement alignment',
        'Step 3: Waiver of Premium shield integration',
        'Step 4: Automated ECS setup & annual fund tracking',
      ],
    },
    {
      id: 'ins-retirement',
      division: 'insurance',
      divisionLabel: 'Tata AIA Life Insurance',
      divisionBadge: 'Retirement Freedom',
      title: 'Guaranteed Lifetime Annuity & Tax-Free Pension',
      category: 'Wealth & Pension',
      idealFor: 'Professionals aged 40–60 planning early retirement or seeking permanent monthly cash flows',
      summary: 'Lock in guaranteed lifelong monthly pension checks insulated from stock market fluctuations, falling bank FD interest rates, and inflation.',
      detailedMatter: 'Bank FD rates steadily decline over decades. Securing a comfortable retirement requires fixed lifelong cash flows. Tata AIA Fortune Guarantee Annuity locks in interest rates for your entire lifespan. You can select joint-life options to continue seamless payments to your spouse, with 100% return of the initial purchase price to your children.',
      keyDeliverables: [
        'Fixed monthly/annual payout guaranteed for life with zero market risk',
        'Joint Life option continuing lifetime income to surviving spouse',
        '100% Return of Purchase Price (ROP) transferred to legal heirs',
        'Optimized tax-efficient annuity cash flow structuring',
      ],
      metricBadge: { label: 'Pension Tenure', value: 'Lifelong Guaranteed' },
      calculatorLink: '/insurance/calculators?tab=retirement',
      calculatorLabel: 'Retirement Freedom Planner',
      workflowSteps: [
        'Step 1: Post-retirement monthly budget & lifestyle mapping',
        'Step 2: Annuity yield locking against declining interest rates',
        'Step 3: Joint-spouse succession selection',
        'Step 4: Direct bank account ECS credit automation',
      ],
    },
    {
      id: 'ins-critical',
      division: 'insurance',
      divisionLabel: 'Tata AIA Life Insurance',
      divisionBadge: 'Living Benefits',
      title: '40-Condition Comprehensive Critical Illness Fortification',
      category: 'Health Fortification',
      idealFor: 'High-stress corporate executives and business founders wanting living medical benefits',
      summary: 'Lump-sum cash disbursement upon first diagnosis of 40 critical illnesses (cancer, heart attack, stroke, organ failure) independent of health insurance.',
      detailedMatter: 'Standard Mediclaim only reimburses actual in-hospital bills. Critical illness living benefits pay your full sum assured in cash directly to your bank account upon initial diagnosis. This provides the financial freedom to cover loss of active income, experimental treatments abroad, and mortgage payments during long convalescence periods.',
      keyDeliverables: [
        'Direct lump-sum cash payment upon certified diagnosis',
        'Coverage across 40 major critical illnesses and cardiac surgeries',
        'Minor illness early claim support without policy cancellation',
        'Zero deductible, zero copay, and no network hospital restrictions',
      ],
      metricBadge: { label: 'Illness Coverage', value: '40 Conditions' },
      calculatorLink: '/insurance/calculators?tab=term',
      calculatorLabel: 'Critical Illness Rider Sizer',
      workflowSteps: [
        'Step 1: Family medical history & lifestyle risk evaluation',
        'Step 2: Sum assured sizing based on 2-year living expenses',
        'Step 3: Immediate rider attachment to pure term base',
        'Step 4: 24/7 dedicated claim concierge onboarding',
      ],
    },

    // ==========================================
    // 2. HERBALIFE NUTRITION
    // ==========================================
    {
      id: 'nut-weight',
      division: 'nutrition',
      divisionLabel: 'Herbalife Nutrition',
      divisionBadge: 'Cellular Weight Care',
      title: '90-Day Cellular Body Transformation & Fat Loss Plan',
      category: 'Weight Management',
      idealFor: 'Men and women targeting permanent reduction of 5kg to 25kg visceral and abdominal fat',
      summary: 'Personalized cellular nutrition protocol replacing high-calorie empty breakfasts with low-GI Formula 1 Shakes, botanical energy teas, and 1-on-1 coaching.',
      detailedMatter: 'Unlike restrictive crash diets that burn muscle tissue and permanently slow metabolism, our 90-day program relies on cellular protein pacing. We replace 1–2 meals daily with nutrient-dense Formula 1 Nutritional Shake Mix (packed with 21 essential micronutrients) and Personalized Protein Powder, paired with daily food logs, weekly bio-impedance checkups, and continuous coaching.',
      keyDeliverables: [
        '90-Day Customized Meal & Shake Schedule tailored to your lifestyle',
        'Formula 1 Nutritional Shake Mix + Personalized Protein Powder protocol',
        'Weekly Body Composition & Visceral Fat Checkups',
        'Dedicated 1-on-1 WhatsApp Coaching & Habit Accountability',
      ],
      metricBadge: { label: 'Success Record', value: '1,500+ Clients' },
      calculatorLink: '/nutrition/calculators?tab=bmi',
      calculatorLabel: 'BMI & Ideal Weight Sizer',
      workflowSteps: [
        'Step 1: Full digital Body Composition & Visceral Fat scan',
        'Step 2: Custom shake flavor & daily caloric deficit target setting',
        'Step 3: Delivery of genuine fresh product starter kit',
        'Step 4: Daily meal logging & weekly milestone reviews',
      ],
    },
    {
      id: 'nut-bmr',
      division: 'nutrition',
      divisionLabel: 'Herbalife Nutrition',
      divisionBadge: 'Metabolic Diagnostic',
      title: 'Resting Metabolic Rate (BMR) & Body Composition Profiling',
      category: 'Metabolic Health',
      idealFor: 'Anyone struggling with stubborn weight plateaus, slow metabolism, or thyroid-related fat accumulation',
      summary: 'Comprehensive scientific evaluation of your Visceral Fat Score, Skeletal Muscle Mass, Hydration Level, and exact daily Resting Caloric Burn.',
      detailedMatter: 'Discover why standard generic diets cause rapid weight regain. We measure your exact Resting Metabolic Rate (BMR)—the calories your organs burn at total rest—and calculate your optimal macronutrient split (Protein, Carbohydrates, Healthy Fats) to safely maintain a 500-calorie deficit without fatigue or hunger.',
      keyDeliverables: [
        'Digital Body Composition & Visceral Fat score breakdown',
        'Accurate BMR & Daily Maintenance Calorie Calculation',
        'Personalized Macronutrient (Protein / Carb / Fat) gram targets',
        'Digestive wellness optimization guidance with Herbal Aloe Concentrate',
      ],
      metricBadge: { label: 'Assessment', value: 'Complete Profile' },
      calculatorLink: '/nutrition/calculators?tab=calorie',
      calculatorLabel: 'BMR & Caloric Burn Tool',
      workflowSteps: [
        'Step 1: Bio-impedance scale scan (visceral fat, muscle %, water %)',
        'Step 2: Daily physical activity & resting expenditure analysis',
        'Step 3: Macronutrient breakdown & protein pacing roadmap',
        'Step 4: Implementation guidance with certified wellness coach',
      ],
    },
    {
      id: 'nut-sports',
      division: 'nutrition',
      divisionLabel: 'Herbalife Nutrition',
      divisionBadge: 'Sports Nutrition',
      title: 'H24 Sports Performance, Endurance & Recovery Protocol',
      category: 'Athletic Conditioning',
      idealFor: 'Marathon runners, cyclists, crossfit athletes, badminton players, and gym enthusiasts',
      summary: 'NSF-certified athletic sports nutrition engineered for rapid intra-workout cellular hydration and post-workout muscle glycogen synthesis.',
      detailedMatter: 'Developed in collaboration with international sports icons including Cristiano Ronaldo, Herbalife24 products are certified by NSF International for Sport and tested for 270+ banned substances. The suite includes CR7 Drive for hypotonic cellular hydration during intense exertion, and H24 Rebuild Strength with a tri-core protein blend for immediate amino acid delivery.',
      keyDeliverables: [
        'CR7 Drive bio-hydration & electrolyte replenishment formula',
        'H24 Rebuild Strength whey/casein muscle recovery protocol',
        'Pre-workout nitric oxide and stamina optimization',
        '100% Certified Clean Sport formulation free from prohibited substances',
      ],
      metricBadge: { label: 'Certification', value: 'NSF Sport Tested' },
      calculatorLink: '/nutrition/calculators?tab=macro',
      calculatorLabel: 'Athletic Macro Calculator',
      workflowSteps: [
        'Step 1: Sport exertion & heart rate training zone evaluation',
        'Step 2: Pre-workout, intra-workout, and post-workout timing plan',
        'Step 3: Electrolyte balance & hydration tracking',
        'Step 4: Muscle recovery velocity and athletic performance log',
      ],
    },
    {
      id: 'nut-gut',
      division: 'nutrition',
      divisionLabel: 'Herbalife Nutrition',
      divisionBadge: 'Digestive Health',
      title: 'Digestive Gut Reset & Cellular Vitality Coaching',
      category: 'Gut Wellness & Detox',
      idealFor: 'Individuals experiencing morning sluggishness, bloating, acidity, or poor nutrient absorption',
      summary: 'Organic Herbal Aloe Concentrate and Afresh botanical energy tea program to soothe intestinal villi and boost natural cellular alertness.',
      detailedMatter: 'Over 70% of immune defenses and 90% of serotonin are regulated in your gut. Our digestive protocol utilizes premium purified organic aloe vera to soothe the microvilli in the small intestine, dramatically improving nutrient bioavailability while replacing sugary coffee with pure green tea antioxidant extracts.',
      keyDeliverables: [
        'Herbal Aloe Concentrate soothing digestive microvilli regimen',
        'Afresh botanical green tea extract natural metabolism energizer',
        'Active fiber complex promoting healthy gut microbiome flora',
        'Elimination of heavy morning lethargy and digestive distress',
      ],
      metricBadge: { label: 'Clean Botanical', value: 'Zero Added Sugar' },
      calculatorLink: '/nutrition/calculators?tab=water',
      calculatorLabel: 'Hydration & Water Estimator',
      workflowSteps: [
        'Step 1: Digestive symptom & daily food trigger review',
        'Step 2: Morning Aloe & botanical tea replacement routine',
        'Step 3: Soluble fiber integration for bowel motility',
        'Step 4: 14-Day digestive reboot and energy level tracking',
      ],
    },

    // ==========================================
    // 3. ENAGIC KANGEN WATER
    // ==========================================
    {
      id: 'kan-k8',
      division: 'kangen',
      divisionLabel: 'Enagic Kangen Water',
      divisionBadge: 'Japanese Medical Device',
      title: 'LeveLuk K8 Flagship 8-Plate Medical Grade Ionizer',
      category: 'Medical Grade Electrolysis',
      idealFor: 'Families, health-conscious doctors, and athletes seeking maximum dissolved hydrogen and -850mV ORP',
      summary: 'Enagic’s most advanced 8-electrode Japanese ionizer featuring platinum-dipped medical titanium plates and full multi-lingual touchscreen.',
      detailedMatter: 'Handcrafted in Osaka, Japan under rigorous ISO 13485 medical device certification. The K8 splits municipal tap water into 5 functional waters using continuous electrolysis. It enriches drinking water with active dissolved molecular hydrogen (H2), delivering a negative Oxidation-Reduction Potential (-850mV) that neutralizes destructive hydroxyl free radicals.',
      keyDeliverables: [
        '8 Solid Platinum-Dipped Titanium Electrolysis Electrodes',
        'Dissolved Molecular Hydrogen saturation up to 1.5 ppm (-850mV ORP)',
        'Full color touchscreen display with automated voice guidance',
        'Complete 5-Year Global Warranty with lifetime Osaka factory support',
      ],
      metricBadge: { label: 'Antioxidant ORP', value: 'Up to -850mV' },
      calculatorLink: '/kangen/calculators',
      calculatorLabel: 'Ionizer Household Sizer',
      workflowSteps: [
        'Step 1: Kitchen water pressure, TDS & plumbing audit',
        'Step 2: Professional certified installation & pre-filter calibration',
        'Step 3: Machine pH calibration and digital ORP meter testing',
        'Step 4: Full family training on 5 water types & E-cleaning',
      ],
    },
    {
      id: 'kan-demo',
      division: 'kangen',
      divisionLabel: 'Enagic Kangen Water',
      divisionBadge: 'In-Home Experience',
      title: 'Live In-Home Kitchen Demonstration: ORP, pH & Pesticide Cleanse',
      category: 'Interactive Kitchen Demo',
      idealFor: 'Families wanting to see verifiable scientific proof in their own home before deciding',
      summary: 'A 45-minute interactive kitchen experiment testing your own tap water, bottled RO water, and Kangen water with digital meters and organic tomatoes.',
      detailedMatter: 'We come directly to your kitchen with laboratory instruments. You will witness three scientific experiments: 1. Digital ORP Meter Test (comparing positive oxidizing bottled water vs negative antioxidant Kangen water). 2. Universal pH Litmus Test (revealing acidic soft drinks and RO water). 3. Tomato Pesticide Wash (using Strong Kangen 11.5 pH to dissolve petroleum wax pesticides that tap water cannot wash off).',
      keyDeliverables: [
        'Live digital ORP antioxidant test of your current drinking water',
        'Full universal pH chemical spectrum litmus test',
        'Chemical pesticide extraction demonstration with fresh cherry tomatoes',
        'Fresh hydrogen-rich water sample pack for your whole family',
      ],
      metricBadge: { label: 'Cost to You', value: '100% Free Demo' },
      calculatorLink: '/kangen/calculators',
      calculatorLabel: '10-Yr Cost vs Bottled Water',
      workflowSteps: [
        'Step 1: Book preferred appointment date & kitchen address',
        'Step 2: Certified Enagic specialist arrives with portable kit',
        'Step 3: Live 45-minute interactive tests with family members',
        'Step 4: Fresh hydrogen water sampling and Q&A session',
      ],
    },
    {
      id: 'kan-sd501',
      division: 'kangen',
      divisionLabel: 'Enagic Kangen Water',
      divisionBadge: 'Global Bestseller',
      title: 'LeveLuk SD501 Global Gold Standard 7-Plate Ionization Unit',
      category: 'Household Electrolysis',
      idealFor: 'Medium to large households (4–8 members) seeking durable, time-tested Japanese engineering',
      summary: 'The worldwide benchmark 7-plate ionizer with heavy-duty electrolysis chamber, capable of generating 4.5 to 7.5 liters of ionized water per minute.',
      detailedMatter: 'Operating in homes across 150 countries for over two decades, the SD501 is the global gold standard of alkaline ionization. Features large surface area solid titanium plates double-coated with medical-grade platinum, producing drinking water (pH 8.5–9.5), Clean Water (pH 7.0 for infant formula), Beauty Water (pH 6.0 toner), Strong Acidic Water (pH 2.5 disinfectant), and Strong Kangen (pH 11.5 degreaser).',
      keyDeliverables: [
        '7 High-Surface Area Platinum-Dipped Titanium Electrodes',
        'Flow rate capacity up to 7.6 Liters per minute',
        'Electrolysis enhancer chamber for hospital-grade pH 2.5 sanitizer',
        'Automated cleaning system with complete E-cleaning maintenance pack',
      ],
      metricBadge: { label: 'Global Proven', value: '1M+ Units Sold' },
      calculatorLink: '/kangen/calculators',
      calculatorLabel: 'Bottled Water Savings Tool',
      workflowSteps: [
        'Step 1: Water quality assessment (hardness, TDS, sediment)',
        'Step 2: Direct kitchen faucet diverter attachment',
        'Step 3: Flow rate calibration for maximum molecular hydrogen',
        'Step 4: 5-Year comprehensive manufacturer warranty registration',
      ],
    },
    {
      id: 'kan-anespa',
      division: 'kangen',
      divisionLabel: 'Enagic Kangen Water',
      divisionBadge: 'Mineral Spa Technology',
      title: 'Anespa DX Mineral Ion Hot Spring Spa Shower System',
      category: 'Dermatological Spa Care',
      idealFor: 'Families experiencing hair fall, dry eczema, sensitive skin, or scalp irritation from chlorinated tap water',
      summary: 'Japanese thermal spa shower filtration removing 100% of residual chlorine and infusing Futamata Radium thermal spring minerals into your bath.',
      detailedMatter: 'Your skin absorbs municipal chlorine 6 times faster during a warm bath than through drinking water. Anespa DX uses activated carbon ceramic balls and natural mineral stones sourced from Hokkaido’s famous Futamata Radium Hot Spring to remove chlorine, rust, and heavy metals, transforming harsh hard tap water into soothing, silky mineral ion water that reduces hair breakage.',
      keyDeliverables: [
        '100% Elimination of residual chlorine and bath tap sediments',
        'Futamata Radium Spring mineral stone cartridge infusion',
        'Prevention of scalp dryness, hair fall, and dermal irritation',
        'Universal bathroom shower head or bathtub connector',
      ],
      metricBadge: { label: 'Chlorine Removal', value: '100% Filtered' },
      calculatorLink: '/kangen/calculators',
      calculatorLabel: 'Spa System ROI Estimator',
      workflowSteps: [
        'Step 1: Bathroom plumbing & water heater compatibility check',
        'Step 2: Quick 15-minute tool-free installation to shower pipe',
        'Step 3: Immediate chlorine chemical dropper test',
        'Step 4: Annual ceramic cartridge replacement schedule setup',
      ],
    },

    // ==========================================
    // 4. SOLAR ROOFTOP EPC
    // ==========================================
    {
      id: 'sol-res',
      division: 'solar',
      divisionLabel: 'Solar Energy',
      divisionBadge: 'Residential Solar EPC',
      title: 'Turnkey Residential Rooftop Solar EPC (3kW – 10kW On-Grid)',
      category: 'Residential Rooftop',
      idealFor: 'Individual villas, duplexes, and independent homeowners with monthly power bills from ₹3,000 to ₹18,000',
      summary: 'Complete engineering, shadow-free structural mounting, Tier-1 DCR mono PERC modules, and TSSPDCL net-metering synchronization to cut bills up to 90%.',
      detailedMatter: 'Sized to generate 12 to 45 units of clean solar electricity daily. We engineer hot-dip galvanized elevated structures that preserve 100% of your terrace usage, install high-efficiency 550W+ bi-facial panels, and connect cloud-monitored smart inverters so you can track real-time power generation on your smartphone.',
      keyDeliverables: [
        '3kW to 10kW Custom Rooftop Solar Engineering Design',
        'Tier-1 DCR Mono PERC Half-Cut Panels with 25-Year Warranty',
        'Hot-Dip Galvanized Elevated Structure (Rust-proof for 30 years)',
        'Cloud WiFi Smart Inverter with Smartphone Generation App',
      ],
      metricBadge: { label: 'Bill Savings', value: 'Up to 90% Less' },
      calculatorLink: '/solar/calculator',
      calculatorLabel: 'Solar Savings & Subsidy Sizer',
      workflowSteps: [
        'Step 1: Physical terrace shadow audit & structural feasibility',
        'Step 2: 3D CAD terrace layout & DISCOM net-metering application',
        'Step 3: Fast 2-day on-site fabrication & electrical commissioning',
        'Step 4: Bi-directional net-meter sync & mobile app tracking setup',
      ],
    },
    {
      id: 'sol-subsidy',
      division: 'solar',
      divisionLabel: 'Solar Energy',
      divisionBadge: 'PM Surya Ghar',
      title: 'PM Surya Ghar: Muft Bijli Yojana ₹78,000 Central DBT Subsidy Processing',
      category: 'Government Subsidy Management',
      idealFor: 'Domestic residential consumers wanting hassle-free direct government subsidy credited to their bank accounts',
      summary: 'Complete paperwork, national portal registration, DISCOM load sanctioning, and Direct Benefit Transfer (DBT) disbursement management handled 100% by us.',
      detailedMatter: 'Under the landmark PM Surya Ghar initiative, the Government of India provides up to ₹78,000 direct cash subsidy for rooftop systems up to 3kW. Navigating vendor empanelment, domestic content requirement (DCR) cell certification, and DISCOM inspection can be daunting. QuadraBiz manages 100% of the portal paperwork from initial application to final subsidy transfer into your Aadhaar-linked bank account.',
      keyDeliverables: [
        'National Portal application filing and consumer number linking',
        'DISCOM feasibility approval & technical load enhancement',
        'DCR Certified Module compliance certificate issuance',
        'Guarantee of ₹78,000 direct bank transfer (DBT) credit',
      ],
      metricBadge: { label: 'Govt Subsidy', value: '₹78,000 Direct' },
      calculatorLink: '/solar/subsidy',
      calculatorLabel: 'Subsidy Eligibility Guide',
      workflowSteps: [
        'Step 1: Electricity bill & Aadhaar consumer verification',
        'Step 2: PM Surya Ghar National Portal registration & sanction',
        'Step 3: Joint plant inspection with DISCOM assistant engineer',
        'Step 4: Direct subsidy deposit into consumer bank account',
      ],
    },
    {
      id: 'sol-comm',
      division: 'solar',
      divisionLabel: 'Solar Energy',
      divisionBadge: 'Commercial & Industrial',
      title: 'Commercial & Industrial Solar EPC (25kW to 500kW+)',
      category: 'Commercial High-Tension EPC',
      idealFor: 'Factories, educational institutions, cold storages, hospitals, hotels, and office commercial parks',
      summary: 'High-capacity commercial solar engineering designed for industrial power tariffs (₹8–₹11/kWh) with accelerated tax depreciation benefits.',
      detailedMatter: 'Commercial consumers pay the highest electricity tariffs. Our industrial solar EPC reduces operational expenditures by 70% and offers an exceptional ROI payback period of just 2.8 to 3.5 years. Businesses also claim 40% Accelerated Depreciation (AD) under Section 32 of the Income Tax Act in the very first year, creating massive immediate tax savings.',
      keyDeliverables: [
        '25kW to 500kW+ Turnkey Industrial Engineering & High-Tension (HT) Sync',
        '40% Accelerated Depreciation tax benefit financial modeling',
        'Heavy-duty aluminum clamp mounts for industrial metal sheet roofs',
        'Comprehensive 5-Year Operation & Maintenance (O&M) service contract',
      ],
      metricBadge: { label: 'Payback Period', value: '2.8 - 3.5 Years' },
      calculatorLink: '/solar/calculator',
      calculatorLabel: 'Commercial ROI & Capex Tool',
      workflowSteps: [
        'Step 1: Sanctioned HT load audit & load curve profiling',
        'Step 2: Financial IRR, payback & tax depreciation financial modeling',
        'Step 3: Turnkey procurement, civil mounting & grid evacuation',
        'Step 4: Continuous SCADA monitoring & preventive maintenance',
      ],
    },
    {
      id: 'sol-survey',
      division: 'solar',
      divisionLabel: 'Solar Energy',
      divisionBadge: 'Engineering Feasibility',
      title: 'Rooftop Physical Shadow Analysis & DISCOM Net-Metering Feasibility',
      category: 'Engineering Survey',
      idealFor: 'Property owners unsure whether their terrace has adequate shadow-free sunlight, structural strength, or grid capacity',
      summary: 'In-person engineering survey using solar pathfinders to map seasonal shadows from parapet walls, water tanks, and adjacent buildings.',
      detailedMatter: 'Installing panels in partial shade reduces system generation by up to 40%. Our certified engineers conduct a physical terrace survey: measuring structural RCC slab load capacity, checking water tank shadows at winter solstice (December 21), testing AC earthing pits, and auditing transformer sanction capacity at your local DISCOM substation.',
      keyDeliverables: [
        'Physical terrace shadow analysis & 365-day sunpath report',
        'Estimated annual kilowatt-hour (kWh) solar yield simulation',
        'Substation feeder capacity and net-metering feasibility certificate',
        'Itemized Bill of Materials (BOM) with zero hidden costs',
      ],
      metricBadge: { label: 'Site Survey', value: '100% Free' },
      calculatorLink: '/solar/calculator',
      calculatorLabel: 'Terrace Capacity Sizer',
      workflowSteps: [
        'Step 1: Confirm site visit date & property GPS coordinates',
        'Step 2: Structural civil engineer conducts 40-point terrace survey',
        'Step 3: Generation simulation and shadow-free layout generation',
        'Step 4: Transparent commercial proposal presentation',
      ],
    },
  ];

  // Group services by division for "All Services" tab
  const divisionsList: CoreDivision[] = ['insurance', 'nutrition', 'kangen', 'solar'];

  const filteredServices = activeTab === 'all'
    ? servicesData
    : servicesData.filter(s => s.division === activeTab);

  return (
    <div className="space-y-16 py-12">
      <PageMeta 
        title="Comprehensive Service Catalog • 4 Business Divisions" 
        description="Detailed service guides across Tata AIA Insurance, Herbalife Nutrition, Enagic Kangen Water, and Solar Rooftop EPC with transparent specifications and workflow." 
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-tight shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>QuadraBiz Certified Enterprise Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Comprehensive Service Catalog
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Four distinct business divisions under one trusted corporate umbrella. Select a specific domain below to examine detailed specifications, deliverables, and customized calculators.
        </p>

        {/* Division Filter Navigation */}
        <div className="flex justify-center pt-6">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl gap-1 overflow-x-auto max-w-full shadow-inner border border-slate-300/60">
            {[
              { id: 'all', label: 'All 4 Divisions', icon: Compass },
              { id: 'insurance', label: 'Tata AIA Insurance', icon: ShieldCheck, color: 'text-blue-600' },
              { id: 'nutrition', label: 'Herbalife Nutrition', icon: null, color: 'text-emerald-600' },
              { id: 'kangen', label: 'Kangen Water®', icon: Droplets, color: 'text-cyan-600' },
              { id: 'solar', label: 'Solar Energy EPC', icon: SunMedium, color: 'text-amber-600' },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {tab.id === 'nutrition' ? (
                    <HerbalifeLogo variant="icon" size="xs" />
                  ) : TabIcon ? (
                    <TabIcon className={`w-4 h-4 ${activeTab === tab.id ? 'text-amber-400' : (tab.color || 'text-slate-500')}`} />
                  ) : null}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Jump Anchors when in "All" view */}
        {activeTab === 'all' && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-400 font-semibold">Jump directly to:</span>
            <a href="#section-insurance" className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full font-bold transition flex items-center gap-1 border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" /> Tata AIA Insurance
            </a>
            <a href="#section-nutrition" className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-full font-bold transition flex items-center gap-1 border border-emerald-200">
              <HerbalifeLogo variant="icon" size="xs" /> Herbalife Nutrition
            </a>
            <a href="#section-kangen" className="px-3 py-1 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 rounded-full font-bold transition flex items-center gap-1 border border-cyan-200">
              <Droplets className="w-3.5 h-3.5" /> Kangen Water®
            </a>
            <a href="#section-solar" className="px-3 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-full font-bold transition flex items-center gap-1 border border-amber-200">
              <SunMedium className="w-3.5 h-3.5" /> Solar Energy EPC
            </a>
          </div>
        )}
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {activeTab === 'all' ? (
          // ============================================================
          // ALL SERVICES VIEW: GROUPED BY DISTINCT DIVISION SECTIONS
          // ============================================================
          divisionsList.map((divKey) => {
            const meta = divisionMeta[divKey];
            const divServices = servicesData.filter(s => s.division === divKey);
            const Icon = meta.icon;

            return (
              <div 
                key={divKey} 
                id={`section-${divKey}`} 
                className="space-y-6 pt-4 scroll-mt-24"
              >
                {/* Distinct Division Header Banner */}
                <div className={`p-6 sm:p-8 rounded-3xl border ${meta.accent} shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/80 shrink-0 flex items-center justify-center">
                      {divKey === 'nutrition' ? (
                        <HerbalifeLogo variant="full" size="md" />
                      ) : (
                        <Icon className={`w-8 h-8 ${meta.iconColor}`} />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${meta.badge}`}>
                          Division Portfolio
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          • {meta.stat}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {meta.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-2xl leading-relaxed">
                        {meta.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      to={meta.portalLink}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-300 shadow-sm transition"
                    >
                      <span>Explore Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openBookingModal({ division: divKey, defaultMode: 'in_person' })}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>

                {/* Division's Distinct Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {divServices.map((svc) => (
                    <ServiceCard
                      key={svc.id}
                      svc={svc}
                      isExpanded={expandedCard === svc.id}
                      onToggle={() => toggleExpand(svc.id)}
                      onBook={() => openBookingModal({
                        division: svc.division,
                        service: svc.title,
                        defaultMode: 'in_person'
                      })}
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // ============================================================
          // SPECIFIC DIVISION VIEW: DEDICATED SPOTLIGHT
          // ============================================================
          <div className="space-y-8">
            {/* Division Banner Header */}
            {(() => {
              const meta = divisionMeta[activeTab];
              const Icon = meta.icon;
              return (
                <div className={`p-6 sm:p-8 rounded-3xl border ${meta.accent} shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/80 shrink-0 flex items-center justify-center">
                      {activeTab === 'nutrition' ? (
                        <HerbalifeLogo variant="full" size="md" />
                      ) : (
                        <Icon className={`w-8 h-8 ${meta.iconColor}`} />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${meta.badge}`}>
                          Focused Division
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          • {meta.stat}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {meta.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-2xl leading-relaxed">
                        {meta.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      to={meta.portalLink}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-300 shadow-sm transition"
                    >
                      <span>Division Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openBookingModal({ division: activeTab, defaultMode: 'in_person' })}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Grid of 4 Distinct Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  svc={svc}
                  isExpanded={expandedCard === svc.id}
                  onToggle={() => toggleExpand(svc.id)}
                  onBook={() => openBookingModal({
                    division: svc.division,
                    service: svc.title,
                    defaultMode: 'in_person'
                  })}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Central Support Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
              Multi-Business Integration
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Need Multi-Service Consultation for Your Family or Enterprise?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              We frequently coordinate comprehensive packages: combining Life Insurance wealth protection, kitchen Kangen hydration demo, and rooftop solar survey during a single scheduled visit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => openBookingModal({ division: 'general', defaultMode: 'in_person' })}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-lg transition"
            >
              Book In-Person Meeting
            </button>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm border border-white/20 text-center transition"
            >
              Direct Helpdesk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==============================================================
// REUSABLE DISTINCT SERVICE CARD COMPONENT
// ==============================================================
const ServiceCard: React.FC<{
  svc: ServiceItem;
  isExpanded: boolean;
  onToggle: () => void;
  onBook: () => void;
}> = ({ svc, isExpanded, onToggle, onBook }) => {
  const getDivisionTheme = (div: BusinessDivisionType) => {
    switch (div) {
      case 'insurance':
        return {
          pill: 'bg-blue-100 text-blue-800 border-blue-200',
          metricBox: 'bg-blue-50 border-blue-100 text-blue-950',
          calcBtn: 'text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200',
          borderAccent: 'border-slate-200 hover:border-blue-300',
        };
      case 'nutrition':
        return {
          pill: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          metricBox: 'bg-emerald-50 border-emerald-100 text-emerald-950',
          calcBtn: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
          borderAccent: 'border-slate-200 hover:border-emerald-300',
        };
      case 'kangen':
        return {
          pill: 'bg-cyan-100 text-cyan-800 border-cyan-200',
          metricBox: 'bg-cyan-50 border-cyan-100 text-cyan-950',
          calcBtn: 'text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border-cyan-200',
          borderAccent: 'border-slate-200 hover:border-cyan-300',
        };
      case 'solar':
        return {
          pill: 'bg-amber-100 text-amber-800 border-amber-200',
          metricBox: 'bg-amber-50 border-amber-100 text-amber-950',
          calcBtn: 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-200',
          borderAccent: 'border-slate-200 hover:border-amber-300',
        };
      default:
        return {
          pill: 'bg-slate-100 text-slate-800 border-slate-200',
          metricBox: 'bg-slate-50 border-slate-100 text-slate-950',
          calcBtn: 'text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200',
          borderAccent: 'border-slate-200 hover:border-slate-300',
        };
    }
  };

  const theme = getDivisionTheme(svc.division);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-7 border ${theme.borderAccent} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-5`}>
      <div className="space-y-4">
        {/* Top Badges & Division Tag */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${theme.pill}`}>
            {svc.category}
          </span>
          <span className="text-[11px] font-semibold text-slate-400">
            {svc.divisionLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
          {svc.title}
        </h3>

        {/* Who Is This Ideal For Pill */}
        <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
          <span className="font-bold text-slate-800 shrink-0">Ideal For:</span>
          <span className="leading-relaxed">{svc.idealFor}</span>
        </div>

        {/* Clear Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {svc.summary}
        </p>

        {/* Deliverables Checklist */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            What You Receive:
          </span>
          <ul className="space-y-2">
            {svc.keyDeliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable In-Depth Matter & Workflow */}
        {isExpanded && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3.5 text-xs text-slate-700 animate-in fade-in duration-200">
            <div>
              <strong className="block text-slate-900 font-extrabold mb-1">In-Depth Scope & Rationale:</strong>
              <p className="text-slate-600 leading-relaxed">{svc.detailedMatter}</p>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <strong className="block text-slate-900 font-extrabold mb-1.5">How This Service Is Executed:</strong>
              <div className="space-y-1.5 font-medium text-slate-600">
                {svc.workflowSteps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        {/* Metric Pill and Expand Toggle */}
        <div className="flex items-center justify-between text-xs">
          <div className={`px-2.5 py-1 rounded-lg border font-bold text-[11px] ${theme.metricBox}`}>
            <span className="text-slate-500 font-normal mr-1">{svc.metricBadge.label}:</span>
            <span>{svc.metricBadge.value}</span>
          </div>

          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 transition"
          >
            <span>{isExpanded ? 'Hide Specs' : 'View Full Scope & Steps'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Buttons: Calculator Link & Book Consultation */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            to={svc.calculatorLink}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-center font-bold text-xs transition flex items-center justify-center gap-1.5 ${theme.calcBtn}`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="truncate">{svc.calculatorLabel}</span>
          </Link>

          <button
            onClick={onBook}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
