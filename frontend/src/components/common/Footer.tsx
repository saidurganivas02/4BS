import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { HerbalifeLogo } from './HerbalifeLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      {/* 4 Division Highlights Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Div 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-900/40 hover:border-blue-700/60 transition group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-950/80 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Tata AIA Life Insurance</h4>
                <p className="text-[11px] text-blue-400">99.13% Claim Settlement Ratio</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comprehensive term life protection, tax-saving investment plans, and retirement security.
            </p>
            <Link to="/insurance" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 mt-3">
              <span>Explore Tata AIA</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Div 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-900/40 hover:border-emerald-700/60 transition group">
            <div className="flex items-center gap-3 mb-2">
              <HerbalifeLogo variant="badge" size="sm" className="px-1.5 py-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Herbalife Nutrition</h4>
                <p className="text-[11px] text-emerald-400">Independent Associate Support</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cellular nutrition shakes, weight management, personalized meal charts, and wellness coaching.
            </p>
            <Link to="/nutrition" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 mt-3">
              <span>Explore Herbalife</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Div 3 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-900/40 hover:border-cyan-700/60 transition group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-cyan-950/80 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Enagic Kangen Water</h4>
                <p className="text-[11px] text-cyan-400">Japanese Medical Device Tech</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Molecular hydrogen-rich ionized alkaline water with negative ORP and 5 multi-purpose pH levels.
            </p>
            <Link to="/kangen" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 mt-3">
              <span>Explore Kangen Water</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Div 4 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-900/40 hover:border-amber-700/60 transition group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-amber-950/80 text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition">
                <SunMedium className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Solar Rooftop EPC</h4>
                <p className="text-[11px] text-amber-400">PM Surya Ghar ₹78k Subsidy</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tier-1 DCR solar panels, net metering, 25-year performance warranty, and zero electricity bills.
            </p>
            <Link to="/solar" className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 mt-3">
              <span>Explore Solar EPC</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <BrandLogo size="md" />
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Suresh <span className="text-blue-500">Pepakayala</span> Enterprises
                </span>
                <p className="text-xs text-slate-400">Holistic Multi-Industry Solutions</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering families and businesses with financial independence, optimal metabolic nutrition, Japanese ionized water wellness, and sustainable solar power generation.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Corporate Office: Road No. 36, Jubilee Hills, Hyderabad, TS, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 98480 12345 / +91 98480 99999</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contact@quadrabiz.com | advisory@quadrabiz.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM – 7:30 PM (Sunday by Appointment)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Main Pages
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Our Founder</Link></li>
              <li><Link to="/businesses" className="hover:text-white transition">Our 4 Divisions</Link></li>
              <li><Link to="/services" className="hover:text-white transition">All Services</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Insights & Blog</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact & Location</Link></li>
              <li><Link to="/login" className="hover:text-amber-400 font-semibold transition">Staff / Admin Login</Link></li>
            </ul>
          </div>

          {/* Calculators Suite */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Interactive Calculators
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/insurance/calculators?tab=hlv" className="hover:text-blue-400 transition">HLV Life Cover Calculator</Link></li>
              <li><Link to="/insurance/calculators?tab=premium" className="hover:text-blue-400 transition">Term Premium Estimator</Link></li>
              <li><Link to="/insurance/calculators?tab=retirement" className="hover:text-blue-400 transition">Retirement Corpus Planner</Link></li>
              <li><Link to="/insurance/calculators?tab=child" className="hover:text-blue-400 transition">Child Education Planner</Link></li>
              <li><Link to="/nutrition/calculators?tab=bmi" className="hover:text-emerald-400 transition">BMI & Ideal Weight</Link></li>
              <li><Link to="/nutrition/calculators?tab=calorie" className="hover:text-emerald-400 transition">BMR & Calorie Calculator</Link></li>
              <li><Link to="/kangen/calculators" className="hover:text-cyan-400 transition">Water Ionizer & Savings</Link></li>
              <li><Link to="/solar/calculator" className="hover:text-amber-400 transition">Solar Rooftop & Subsidy</Link></li>
            </ul>
          </div>

          {/* Direct Consultations */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Schedule Free Demos
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/insurance" className="hover:text-white transition">Tata AIA Policy Consultation</Link></li>
              <li><Link to="/nutrition" className="hover:text-white transition">Free Wellness Profile Evaluation</Link></li>
              <li><Link to="/kangen/demo" className="hover:text-white transition">In-Home Kangen Water Tasting</Link></li>
              <li><Link to="/solar/quotation" className="hover:text-white transition">Free Rooftop Shadow Survey</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Corporate Partnership</Link></li>
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-bold text-amber-400 block mb-1">
                Emergency Policy / Technical Line:
              </span>
              <span className="text-sm font-extrabold text-white">
                +91 98480 12345
              </span>
            </div>
          </div>

        </div>

        {/* Regulatory & Mandatory Disclaimers */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-300">Tata AIA Life Insurance Disclaimer:</strong> Insurance is the subject matter of the solicitation. Tata AIA Life Insurance Company Ltd. (IRDAI Regn. No. 110). Calculators provided on this platform are for illustrative and informational purposes only. Premiums and benefits are subject to underwriting guidelines, age, medical history, and plan rules.
          </p>
          <p>
            <strong className="text-slate-300">Herbalife Nutrition Disclaimer:</strong> These products and nutritional calculators are not intended to diagnose, treat, cure, or prevent any disease. Weight loss and wellness outcomes vary by individual depending on diet, metabolism, and physical activity. Consult your physician before beginning any wellness program.
          </p>
          <p>
            <strong className="text-slate-300">Enagic Kangen Water Disclaimer:</strong> Enagic® is a registered trademark of Enagic Co., Ltd. Japan. Machines are certified medical devices in Japan (Ministry of Health, Labour and Welfare). Testimonials and calculated water savings are indicative.
          </p>
          <p>
            <strong className="text-slate-300">Solar Energy EPC Disclaimer:</strong> Solar rooftop generation estimates and PM Surya Ghar Muft Bijli Yojana subsidies are subject to actual DISCOM feasibility, shadow analysis, and MNRE regulatory guidelines.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Suresh Pepakayala Enterprises. All rights reserved. Built with pride for our four divisions.
          </p>
          <div className="flex items-center space-x-6 text-slate-400">
            <Link to="/faq" className="hover:text-white transition">FAQ Hub</Link>
            <Link to="/contact" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/login" className="hover:text-amber-400 transition">Portal Sign-In</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
