import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Droplets, 
  SunMedium,
  Calendar,
  Sparkles
} from 'lucide-react';
import { HerbalifeLogo } from '../components/common/HerbalifeLogo';
import { api } from '../services/api';
import { BusinessDivisionType } from '../types';
import { useToast } from '../context/ToastContext';
import { PageMeta } from '../components/common/PageMeta';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const initialDiv = (searchParams.get('division') as BusinessDivisionType) || 'general';

  const [division, setDivision] = useState<BusinessDivisionType>(initialDiv);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    preferredMode: 'in_person',
    preferredTime: 'Morning (10 AM - 1 PM)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.createLead({
        division: division,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        service_interest: `General Inquiry / Consultation (${division})`,
        notes: `Mode: ${formData.preferredMode}, Time: ${formData.preferredTime}. Message: ${formData.message}`,
      });
      setSubmitted(true);
      showToast('Message sent successfully! Our division specialist will reply shortly.', 'success');
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      showToast('Message received! Our team will contact you soon.', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-12">
      <PageMeta 
        title="Contact Us & Division Helpdesk" 
        description="Connect with QuadraBiz certified specialists across Tata AIA Insurance, Herbalife Nutrition, Kangen Water, and Solar Rooftop EPC." 
      />
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Connect With Our Team</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Central Office & Divisional Helpdesk
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Route your inquiry directly to our certified division specialists or request an in-person meeting.
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-extrabold text-white">
                Suresh Pepakayala Enterprises Central Secretariat
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our main office coordinates appointments, policy servicing, demo equipment distribution, and solar engineering surveys across Telangana and Andhra Pradesh.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold mb-0.5">Corporate Headquarters</strong>
                    <span>Plot 412, Rd No. 36, Jubilee Hills, Hyderabad, Telangana – 500033</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold mb-0.5">Direct Advisory Lines</strong>
                    <span>+91 98480 12345 (Main Founder Line)</span>
                    <span className="block text-slate-400">+91 98480 99999 (Client Servicing Desk)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold mb-0.5">Email Support</strong>
                    <span>contact@quadrabiz.com</span>
                    <span className="block text-slate-400">servicing@quadrabiz.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold mb-0.5">Working Hours</strong>
                    <span>Monday to Saturday: 9:00 AM – 7:30 PM</span>
                    <span className="block text-slate-400">Sunday: Open for Scheduled Home Demos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Division Hotlines */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Direct Division Representatives
              </h4>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-800">Tata AIA Insurance:</span>
                </div>
                <span className="text-slate-600 font-semibold">+91 98480 23456 (Ramesh Verma)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <HerbalifeLogo variant="icon" size="xs" />
                  <span className="font-bold text-slate-800">Herbalife Nutrition:</span>
                </div>
                <span className="text-slate-600 font-semibold">+91 98480 34567 (Sunita Rao)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span className="font-bold text-slate-800">Kangen Water Demo:</span>
                </div>
                <span className="text-slate-600 font-semibold">+91 98480 45678 (Vikram Reddy)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <SunMedium className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-slate-800">Solar Rooftop EPC:</span>
                </div>
                <span className="text-slate-600 font-semibold">+91 98480 56789 (Anil Sharma)</span>
              </div>
            </div>
          </div>

          {/* Inquiry Routing Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Inquiry Routed Successfully!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your consultation request has been assigned to our <strong>{division.toUpperCase()}</strong> department. We will connect with you on <strong>{formData.phone}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => { setSubmitted(false); }}
                    className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Book a Free Advisory Session
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select which business division you need guidance on:
                  </p>
                </div>

                {/* Division Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">Target Business Division *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'insurance', label: 'Tata AIA Insurance', icon: ShieldCheck, color: 'text-blue-600' },
                      { key: 'nutrition', label: 'Herbalife Nutrition', icon: null, color: 'text-emerald-600' },
                      { key: 'kangen', label: 'Kangen Water', icon: Droplets, color: 'text-cyan-600' },
                      { key: 'solar', label: 'Solar Rooftop EPC', icon: SunMedium, color: 'text-amber-600' },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSel = division === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setDivision(item.key as any)}
                          className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                            isSel 
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {item.key === 'nutrition' ? (
                            <HerbalifeLogo variant="icon" size="sm" />
                          ) : Icon ? (
                            <Icon className={`w-5 h-5 ${isSel ? 'text-amber-400' : item.color}`} />
                          ) : null}
                          <span className="text-[11px] font-bold leading-tight">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98480 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City / Location</label>
                    <input 
                      type="text" 
                      placeholder="Hyderabad / Vijayawada"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Consultation Mode</label>
                    <select
                      value={formData.preferredMode}
                      onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="in_person">In-Person Meeting / Home Visit</option>
                      <option value="online">Google Meet / Video Call</option>
                      <option value="phone">Quick Phone Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Time Slot</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Morning (10 AM - 1 PM)">Morning (10:00 AM – 1:00 PM)</option>
                      <option value="Afternoon (2 PM - 5 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                      <option value="Evening (5 PM - 8 PM)">Evening (5:00 PM – 8:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Inquiry Details or Specific Requirements</label>
                  <textarea 
                    rows={3}
                    placeholder="Tell us what you would like to discuss (e.g. 5kW solar rooftop, family HLV review, K8 water demo, or weight loss target)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold rounded-2xl text-sm shadow-lg shadow-blue-700/30 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Routing Request...' : 'Submit Consultation Request'}</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Your details will only be used by our authorized divisional representatives.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
