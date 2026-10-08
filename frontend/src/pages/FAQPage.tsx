import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  Sparkles 
} from 'lucide-react';
import { HerbalifeLogo } from '../components/common/HerbalifeLogo';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'insurance' | 'nutrition' | 'kangen' | 'solar'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    // Insurance
    {
      category: 'insurance',
      categoryLabel: 'Tata AIA Life Insurance',
      icon: ShieldCheck,
      color: 'text-blue-600',
      question: 'What is Human Life Value (HLV) and why is it superior to the 10x salary rule?',
      answer: 'The traditional 10x annual income rule does not account for existing debts, inflation, or the number of remaining earning years before retirement. HLV calculates the exact present value of all future earnings your family would lose if you passed away today, plus covers outstanding home loans and ensures funds for your children’s higher education.',
    },
    {
      category: 'insurance',
      categoryLabel: 'Tata AIA Life Insurance',
      icon: ShieldCheck,
      color: 'text-blue-600',
      question: 'What is the Claim Settlement Ratio (CSR) of Tata AIA?',
      answer: 'Tata AIA holds one of the highest Claim Settlement Ratios in the Indian life insurance industry at 99.13%, backed by rapid express claim processing for eligible term policies.',
    },
    {
      category: 'insurance',
      categoryLabel: 'Tata AIA Life Insurance',
      icon: ShieldCheck,
      color: 'text-blue-600',
      question: 'What happens to a Child Future plan if the contributing parent passes away?',
      answer: 'All specialized Tata AIA Child Plans include the Waiver of Premium (WOP) benefit. If the parent passes away prematurely, all future scheduled premium payments are fully waived and paid by the company, and the guaranteed college corpus is disbursed to the child at age 18 as planned.',
    },

    // Nutrition
    {
      category: 'nutrition',
      categoryLabel: 'Herbalife Nutrition',
      icon: null as any,
      color: 'text-emerald-600',
      question: 'How does the Herbalife Formula 1 Shake assist in sustainable weight loss?',
      answer: 'A standard Indian breakfast often contains 500-700 calories with high refined carbohydrates and low protein. Replacing your morning meal with an Herbalife Formula 1 Shake provides 24g of bioavailable protein and 21 essential vitamins and minerals for only ~220 calories, creating a natural and healthy daily caloric deficit without muscle loss or fatigue.',
    },
    {
      category: 'nutrition',
      categoryLabel: 'Herbalife Nutrition',
      icon: null as any,
      color: 'text-emerald-600',
      question: 'Do Herbalife products claim to treat or cure medical conditions?',
      answer: 'No. Herbalife products are dietary supplements and cellular nutrition foods designed solely to support overall wellness, metabolic vitality, and weight management. They do not claim to diagnose, treat, prevent, or cure any disease. Always consult your physician.',
    },
    {
      category: 'nutrition',
      categoryLabel: 'Herbalife Nutrition',
      icon: null as any,
      color: 'text-emerald-600',
      question: 'Is 1-on-1 coaching included with Herbalife nutrition orders?',
      answer: 'Yes! When you order through our authorized associate network, you receive weekly progress tracking, customized meal schedules, hydration targets, and WhatsApp coaching at zero additional fee.',
    },

    // Kangen
    {
      category: 'kangen',
      categoryLabel: 'Kangen Water',
      icon: Droplets,
      color: 'text-cyan-600',
      question: 'What makes Enagic Kangen Water different from standard RO purified water?',
      answer: 'Standard Reverse Osmosis (RO) removes impurities but also strips all beneficial minerals, resulting in demineralized, acidic water with zero antioxidant capacity. Enagic Japanese machines first micro-filter the water, then pass it through solid platinum-dipped titanium plates to electrolyze it—producing dissolved Molecular Hydrogen (H2), negative ORP (-850mV), and micro-clustered alkaline water.',
    },
    {
      category: 'kangen',
      categoryLabel: 'Kangen Water',
      icon: Droplets,
      color: 'text-cyan-600',
      question: 'What are the 5 types of water produced by the LeveLuk K8?',
      answer: '1. Strong Kangen Water (pH 11.5): Emulsifies oil-based chemical pesticides from vegetables and fruits.\n2. Kangen Drinking Water (pH 8.5 – 9.5): Everyday antioxidant alkaline drinking water.\n3. Clean Water (pH 7.0): Filtered neutral water for medication and baby formula.\n4. Beauty Water (pH 6.0): A natural facial toner and hair rinse.\n5. Strong Acidic Water (pH 2.5): Medical-grade eco-disinfectant.',
    },
    {
      category: 'kangen',
      categoryLabel: 'Kangen Water',
      icon: Droplets,
      color: 'text-cyan-600',
      question: 'Is the in-home live demo really free?',
      answer: 'Yes, 100% free with no obligation. Our distributor visits your home with a portable demo unit to perform the live pH drop test, ORP meter test, and oil emulsification test so your whole family can taste the difference.',
    },

    // Solar
    {
      category: 'solar',
      categoryLabel: 'Solar Rooftop EPC',
      icon: SunMedium,
      color: 'text-amber-600',
      question: 'How much subsidy does the central government provide under PM Surya Ghar: Muft Bijli Yojana?',
      answer: 'Under the PM Surya Ghar scheme, residential households receive direct DBT bank subsidies:\n• 1 kW system: ₹30,000\n• 2 kW system: ₹60,000\n• 3 kW to 10 kW systems: ₹78,000 (flat maximum subsidy).\nThe subsidy is deposited directly into your linked bank account within ~30 days of net-meter commissioning.',
    },
    {
      category: 'solar',
      categoryLabel: 'Solar Rooftop EPC',
      icon: SunMedium,
      color: 'text-amber-600',
      question: 'What is Net Metering and how does it reduce my electricity bill to zero?',
      answer: 'With On-Grid Net Metering, a bidirectional electric meter is installed by your state DISCOM. During sunny daylight hours, your solar panels generate electricity. Any surplus power not consumed by your home is automatically exported to the grid, spinning your meter backwards. You only pay for net units consumed at the end of each billing cycle.',
    },
    {
      category: 'solar',
      categoryLabel: 'Solar Rooftop EPC',
      icon: SunMedium,
      color: 'text-amber-600',
      question: 'How much rooftop space is required for a 3kW or 5kW solar plant?',
      answer: 'A general rule of thumb in India is 85 to 100 square feet of shadow-free terrace space per 1 kW capacity. A 3kW system needs ~270-300 sq.ft., while a 5kW system requires ~450-500 sq.ft.',
    },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesQuery = searchQuery === '' || 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions? We Have Answers.</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Clear, transparent explanations for all four of our business divisions.
        </p>

        {/* Search Input */}
        <div className="max-w-xl mx-auto pt-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              placeholder="Search by question, keyword, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center pt-2">
          <div className="inline-flex p-1.5 bg-slate-200 rounded-2xl gap-1 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'insurance', label: 'Tata AIA Insurance' },
              { id: 'nutrition', label: 'Herbalife Nutrition' },
              { id: 'kangen', label: 'Kangen Water' },
              { id: 'solar', label: 'Solar Rooftop EPC' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
                  activeCategory === tab.id 
                    ? 'bg-slate-900 text-white shadow' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-start gap-3">
                    {faq.category === 'nutrition' ? (
                      <div className="shrink-0 mt-0.5"><HerbalifeLogo variant="icon" size="xs" /></div>
                    ) : (
                      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${faq.color}`} />
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        {faq.categoryLabel}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-12 whitespace-pre-line animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-600 font-semibold">No questions matched your search query.</p>
          </div>
        )}

        <div className="mt-12 text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-600">
            Have a question that isn't answered here?{' '}
            <Link to="/contact" className="text-blue-600 font-bold hover:underline">
              Contact our advisory desk directly →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};
