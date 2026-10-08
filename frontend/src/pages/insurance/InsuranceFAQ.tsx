import React, { useState } from 'react';
import { DivisionNav } from '../../components/common/DivisionNav';
import { ShieldCheck, ChevronDown, HelpCircle, PhoneCall, ArrowRight, Award, FileText, CheckCircle2 } from 'lucide-react';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

export const InsuranceFAQ: React.FC = () => {
  const { openBookingModal } = useAppointmentModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why should I prioritize Tata AIA Life Insurance over other providers?',
      a: 'Tata AIA combines two of the most trusted names globally and in India: Tata Group (150+ years of trust) and AIA (Asia’s largest independent life insurance group). In FY23-24, Tata AIA achieved an industry-leading Individual Death Claim Settlement Ratio of 99.13%, with an average claim turnaround time of within 4 hours under the Express Claim settlement program for eligible policies.'
    },
    {
      q: 'How is Human Life Value (HLV) calculated, and why is simple rule-of-thumb coverage dangerous?',
      a: 'Rule-of-thumb estimates (like 10x annual income) often ignore outstanding home loans, inflation in children’s international education (averaging 10-12% p.a.), and long-term spousal retirement needs. Our HLV diagnostic calculates your exact capital deficit: [Present Value of Family Living Expenses + Outstanding Debts/Mortgages + Milestone Goals] minus [Existing Liquid Assets & Investments]. This guarantees zero shortfall in unexpected events.'
    },
    {
      q: 'What is the Return of Premium (ROP) feature in Tata AIA Sampoorna Raksha Supreme?',
      a: 'With the Return of Premium (ROP) option, if the life assured survives the entire policy tenure (e.g., until age 60, 70, or 100), 100% of all base premiums paid across the policy tenure are refunded back to the policyholder, making the death protection effectively free of cost.'
    },
    {
      q: 'What riders should I attach to my term insurance policy?',
      a: 'We strongly recommend three essential riders: 1) Comprehensive Protection Rider covering up to 40 Critical Illnesses with lump-sum payouts upon diagnosis; 2) Accidental Death and Dismemberment Rider for 2x payout in case of road accidents; and 3) Waiver of Premium (WOP) Rider, ensuring that if you suffer permanent disability or critical illness, all future premiums are waived while your policy stays fully active.'
    },
    {
      q: 'What are the tax benefits available under Tata AIA Life Insurance policies?',
      a: 'Under Section 80C of the Income Tax Act, 1961, you can claim tax deductions up to ₹1,50,000 per financial year for premiums paid towards life insurance policies. Furthermore, the death benefit or maturity proceeds received are 100% tax-exempt under Section 10(10D), subject to conditions stipulated by prevailing IT regulations.'
    },
    {
      q: 'Can Non-Resident Indians (NRIs) and PIOs purchase Tata AIA policies without visiting India?',
      a: 'Yes, NRIs residing across the UAE, USA, UK, Singapore, Canada, and 80+ countries can complete tele-medical checkups via authorized global clinics, upload KYC documents digitally, and pay premiums via NRE/NRO accounts or international credit cards with full GST rebate privileges.'
    }
  ];

  return (
    <div>
      <DivisionNav division="insurance" />

      <div className="bg-slate-50 text-slate-800 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Tata AIA Advisory Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Life Insurance & Protection FAQs
            </h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Everything you need to know about claim settlement ratios, term sizing, riders, tax benefits, and policy servicing.
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
                      <HelpCircle className="w-4 h-4 text-blue-700 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-700' : ''}`} />
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
          <div className="bg-white border border-blue-200 rounded-2xl p-8 text-center space-y-3 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Have a Specific Policy or Underwriting Question?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Schedule a confidential policy assessment with our certified Tata AIA wealth advisors.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => openBookingModal({ division: 'insurance', service: 'Existing Policy Portfolio Audit & Claims Assistance' })}
                className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <span>Request Free Policy Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
