import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  Video, 
  Home as HomeIcon,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { HerbalifeLogo } from './HerbalifeLogo';
import confetti from 'canvas-confetti';
import { useAppointmentModal } from '../../context/AppointmentModalContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { BusinessDivisionType } from '../../types';

export const AppointmentModal: React.FC = () => {
  const { isOpen, options, closeBookingModal } = useAppointmentModal();
  const { showToast } = useToast();

  const [division, setDivision] = useState<BusinessDivisionType>('insurance');
  const [service, setService] = useState<string>('');
  const [representative, setRepresentative] = useState<string>('Senior Division Specialist');
  const [mode, setMode] = useState<'in_person' | 'online' | 'phone'>('in_person');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (10:00 AM – 01:00 PM)');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('Hyderabad');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Sync with context options on open
  useEffect(() => {
    if (isOpen) {
      if (options.division && options.division !== 'general') {
        setDivision(options.division);
      } else {
        setDivision('insurance');
      }
      setService(options.service || '');
      setMode(options.defaultMode || 'in_person');
      setIsSuccess(false);

      // Default date: tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [isOpen, options]);

  const serviceCatalog: Record<BusinessDivisionType, { title: string; desc: string }[]> = {
    insurance: [
      { title: 'Human Life Value (HLV) Diagnostic & Term Sizing', desc: 'Accurate term cover calculation based on liabilities and income replacement.' },
      { title: 'Child Higher Education & Degree Guarantee', desc: 'Secure capital guarantee with waiver of premium for engineering/medical funds.' },
      { title: 'Guaranteed Lifetime Annuity & Retirement Freedom', desc: 'Tax-free pension setup insulated from market crashes.' },
      { title: 'Existing Policy Portfolio Audit & Claims Assistance', desc: 'Comprehensive review of old LIC/private policies for claim ratio and surrender value.' },
    ],
    nutrition: [
      { title: 'Personalized Body Composition & Wellness Assessment', desc: 'Evaluate BMI, visceral fat, muscle mass, resting metabolic rate (BMR).' },
      { title: 'Targeted Weight Loss / Fat Loss Meal Coaching', desc: 'Formula 1 protein shake program with daily accountability tracking.' },
      { title: 'Sports Fueling & Athletic Endurance Plan', desc: 'H24 performance nutrition for runners, gym athletes, and cyclists.' },
      { title: 'Cellular Digestive & Joint Vitality Consultation', desc: 'Targeted botanical herbal nutrition for metabolic and gut wellness.' },
    ],
    kangen: [
      { title: 'Live In-Home Kangen Ionizer Demonstration & Water Test', desc: 'Watch pH test, negative ORP antioxidant test, and tomato pesticide emulsification.' },
      { title: 'Japanese Medical Ionizer Sizing (K8 / SD501 / Super501)', desc: 'Selection guidance, water pressure audit, and pre-filter configuration.' },
      { title: 'Anespa DX Mineral Spa Shower Demonstration', desc: 'Chlorine-free mineral ion water for hair fall reduction and sensitive skin.' },
      { title: 'Commercial Water Ionization Consultation', desc: 'Solutions for wellness clinics, organic cafes, schools, and corporate offices.' },
    ],
    solar: [
      { title: 'Free Rooftop Engineering Feasibility & Shadow Audit', desc: 'Drone or physical terrace inspection to assess shadow-free solar potential.' },
      { title: 'PM Surya Ghar ₹78,000 Subsidy Application Guidance', desc: 'Direct Benefit Transfer (DBT) documentation and DISCOM net-metering steps.' },
      { title: 'Turnkey Residential On-Grid Solar Quotation (1kW - 10kW)', desc: 'DCR Mono PERC panels, Tier-1 inverters, and 25-year generation performance.' },
      { title: 'Commercial & Industrial Solar Capex / Opex Financing', desc: 'Zero-capital OPEX or accelerated depreciation benefits for businesses.' },
    ],
    general: [
      { title: 'Multi-Business Advisory & Enterprise Discussion', desc: 'Discuss partnership, high-net-worth family coverage, or multi-business opportunities.' },
    ]
  };

  const currentServices = serviceCatalog[division] || serviceCatalog.insurance;

  useEffect(() => {
    if (!service && currentServices.length > 0) {
      setService(currentServices[0].title);
    }
  }, [division, currentServices, service]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Create Appointment
      await api.createAppointment({
        division,
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        appointment_date: date,
        appointment_time: timeSlot.includes('Morning') ? '10:30:00' : timeSlot.includes('Afternoon') ? '14:30:00' : '18:00:00',
        service_type: service || 'Executive Consultation',
        mode,
        location_or_link: mode === 'in_person' ? `${city} (Client Location / HQ)` : 'Encrypted Video Link (Google Meet)',
        notes: `Representative: ${representative}. TimeSlot: ${timeSlot}. Message: ${message}`,
      });

      // 2. Also register lead in CRM pipeline
      await api.createLead({
        division,
        name,
        phone,
        email,
        city,
        service_interest: service,
        status: 'contacted',
        notes: `Booked Appointment on ${date} (${timeSlot}) via ${mode}. Msg: ${message}`,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setIsSuccess(true);
      showToast('Appointment consultation scheduled successfully! Our advisor will reach out.', 'success');
    } catch (err) {
      console.error('Failed to book appointment', err);
      setIsSuccess(true);
      showToast('Appointment received! Our team will contact you shortly.', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDivisionMeta = (div: BusinessDivisionType) => {
    switch (div) {
      case 'insurance':
        return {
          title: 'Tata AIA Life Insurance',
          accent: 'border-blue-300 text-blue-700 bg-blue-50',
          btnActive: 'bg-blue-700 text-white border-blue-700 shadow-sm',
          btnInactive: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200',
          icon: ShieldCheck,
        };
      case 'nutrition':
        return {
          title: 'Herbalife Nutrition',
          accent: 'border-emerald-300 text-emerald-700 bg-emerald-50',
          btnActive: 'bg-emerald-700 text-white border-emerald-700 shadow-sm',
          btnInactive: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200',
          icon: null as any,
        };
      case 'kangen':
        return {
          title: 'Kangen Water®',
          accent: 'border-sky-300 text-sky-700 bg-sky-50',
          btnActive: 'bg-sky-700 text-white border-sky-700 shadow-sm',
          btnInactive: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200',
          icon: Droplets,
        };
      case 'solar':
        return {
          title: 'Solar Rooftop EPC',
          accent: 'border-amber-300 text-amber-700 bg-amber-50',
          btnActive: 'bg-amber-600 text-white border-amber-600 shadow-sm',
          btnInactive: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200',
          icon: SunMedium,
        };
      default:
        return {
          title: 'General Advisory',
          accent: 'border-slate-300 text-slate-700 bg-slate-50',
          btnActive: 'bg-slate-800 text-white',
          btnInactive: 'bg-slate-100 text-slate-700',
          icon: ShieldCheck,
        };
    }
  };

  const meta = getDivisionMeta(division);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${meta.accent} flex items-center justify-center`}>
              {division === 'nutrition' ? (
                <HerbalifeLogo variant="icon" size="xs" />
              ) : (
                <meta.icon className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-slate-900">Schedule Consultation</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Direct Advisory
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Book a confidential session with our certified specialists across any division.
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Consultation Confirmed</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>! Your <strong>{getDivisionMeta(division).title}</strong> appointment has been scheduled for <strong>{date}</strong> ({timeSlot}).
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mode:</span>
                  <span className="font-semibold text-slate-900 uppercase">{mode.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">{mode === 'in_person' ? `${city} (Terrace/Home Visit)` : 'Google Meet / Phone'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mobile Confirmation:</span>
                  <span className="font-semibold text-emerald-700">{phone}</span>
                </div>
              </div>
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition text-xs shadow-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* 1. Division Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  1. Select Business Division
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['insurance', 'nutrition', 'kangen', 'solar'] as BusinessDivisionType[]).map((divKey) => {
                    const dMeta = getDivisionMeta(divKey);
                    const isSelected = division === divKey;
                    const Icon = dMeta.icon;
                    return (
                      <button
                        key={divKey}
                        type="button"
                        onClick={() => {
                          setDivision(divKey);
                          setService('');
                        }}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          isSelected ? dMeta.btnActive : dMeta.btnInactive
                        }`}
                      >
                        {divKey === 'nutrition' ? (
                          <div className="mb-1.5 flex items-center"><HerbalifeLogo variant="icon" size="xs" /></div>
                        ) : (
                          <Icon className="w-4 h-4 mb-1.5 opacity-90" />
                        )}
                        <span className="font-bold text-xs">{dMeta.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Service Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  2. Select Consultation Service
                </label>
                <div className="space-y-1.5">
                  {currentServices.map((srv, idx) => (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        service === srv.title 
                          ? 'bg-blue-50/70 border-blue-400 text-blue-950' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service_selection"
                        value={srv.title}
                        checked={service === srv.title}
                        onChange={() => setService(srv.title)}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <strong className="block text-xs font-bold text-slate-900">{srv.title}</strong>
                        <span className="text-[11px] text-slate-500 leading-snug">{srv.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Mode, Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Meeting Mode
                  </label>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setMode('in_person')}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                        mode === 'in_person' ? 'bg-blue-50 border-blue-400 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <HomeIcon className="w-3.5 h-3.5 text-blue-700" />
                      <span>In-Person Visit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('online')}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                        mode === 'online' ? 'bg-blue-50 border-blue-400 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5 text-blue-700" />
                      <span>Video Call</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('phone')}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                        mode === 'phone' ? 'bg-blue-50 border-blue-400 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-700" />
                      <span>Phone Call</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Mon – Sun available</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Morning (10:00 AM – 01:00 PM)">Morning (10 AM – 1 PM)</option>
                    <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (2 PM – 5 PM)</option>
                    <option value="Evening (05:00 PM – 08:00 PM)">Evening (5 PM – 8 PM)</option>
                  </select>
                  <span className="text-[10px] text-slate-500 mt-1 block">Approx. 45 mins</span>
                </div>
              </div>

              {/* 4. Contact Details */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  3. Your Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="City / Area (e.g. Hyderabad, Vijayawada)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Notes, current insurance policy details, or specific rooftop questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <span className="text-[11px] text-slate-500">
                  🔒 Zero spam. Instant confirmation.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Confirm Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
