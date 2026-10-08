import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppointmentModalProvider } from './context/AppointmentModalContext';
import { ToastProvider } from './context/ToastContext';
import { AppointmentModal } from './components/common/AppointmentModal';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

// Lazy Loaded Main Pages
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const BusinessesPage = lazy(() => import('./pages/BusinessesPage').then(m => ({ default: m.BusinessesPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Tata AIA Insurance
const InsuranceHome = lazy(() => import('./pages/insurance/InsuranceHome').then(m => ({ default: m.InsuranceHome })));
const InsurancePlans = lazy(() => import('./pages/insurance/InsurancePlans').then(m => ({ default: m.InsurancePlans })));
const InsuranceCalculators = lazy(() => import('./pages/insurance/InsuranceCalculators').then(m => ({ default: m.InsuranceCalculators })));
const InsuranceFAQ = lazy(() => import('./pages/insurance/InsuranceFAQ').then(m => ({ default: m.InsuranceFAQ })));

// Herbalife Nutrition
const NutritionHome = lazy(() => import('./pages/nutrition/NutritionHome').then(m => ({ default: m.NutritionHome })));
const NutritionProducts = lazy(() => import('./pages/nutrition/NutritionProducts').then(m => ({ default: m.NutritionProducts })));
const NutritionCalculators = lazy(() => import('./pages/nutrition/NutritionCalculators').then(m => ({ default: m.NutritionCalculators })));
const NutritionFAQ = lazy(() => import('./pages/nutrition/NutritionFAQ').then(m => ({ default: m.NutritionFAQ })));

// Kangen Water
const KangenHome = lazy(() => import('./pages/kangen/KangenHome').then(m => ({ default: m.KangenHome })));
const KangenTechnology = lazy(() => import('./pages/kangen/KangenTechnology').then(m => ({ default: m.KangenTechnology })));
const KangenMachines = lazy(() => import('./pages/kangen/KangenMachines').then(m => ({ default: m.KangenMachines })));
const KangenCalculators = lazy(() => import('./pages/kangen/KangenCalculators').then(m => ({ default: m.KangenCalculators })));
const KangenDemoBooking = lazy(() => import('./pages/kangen/KangenDemoBooking').then(m => ({ default: m.KangenDemoBooking })));
const KangenFAQ = lazy(() => import('./pages/kangen/KangenFAQ').then(m => ({ default: m.KangenFAQ })));

// Solar Rooftop
const SolarHome = lazy(() => import('./pages/solar/SolarHome').then(m => ({ default: m.SolarHome })));
const SolarCalculatorPage = lazy(() => import('./pages/solar/SolarCalculatorPage').then(m => ({ default: m.SolarCalculatorPage })));
const SolarSubsidyGuide = lazy(() => import('./pages/solar/SolarSubsidyGuide').then(m => ({ default: m.SolarSubsidyGuide })));
const SolarProjects = lazy(() => import('./pages/solar/SolarProjects').then(m => ({ default: m.SolarProjects })));
const SolarQuotationRequest = lazy(() => import('./pages/solar/SolarQuotationRequest').then(m => ({ default: m.SolarQuotationRequest })));
const SolarFAQ = lazy(() => import('./pages/solar/SolarFAQ').then(m => ({ default: m.SolarFAQ })));

// Dashboard
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));

// Sleek Loading Spinner
const PageLoader: React.FC = () => (
  <div className="min-h-[55vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-slate-200"></div>
      <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute inset-0"></div>
    </div>
    <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Loading experience...</span>
  </div>
);

// Standard Layout for Public Pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
    <AppointmentModal />
  </div>
);

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppointmentModalProvider>
          <Router>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Main Website Pages */}
                <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><AboutUsPage /></PublicLayout>} />
                <Route path="/businesses" element={<PublicLayout><BusinessesPage /></PublicLayout>} />
                <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
                <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
                <Route path="/blog/:slug" element={<PublicLayout><BlogDetailPage /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
                <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
                <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />

                {/* Business 1: Tata AIA Insurance */}
                <Route path="/insurance" element={<PublicLayout><InsuranceHome /></PublicLayout>} />
                <Route path="/insurance/plans" element={<PublicLayout><InsurancePlans /></PublicLayout>} />
                <Route path="/insurance/calculators" element={<PublicLayout><InsuranceCalculators /></PublicLayout>} />
                <Route path="/insurance/faq" element={<PublicLayout><InsuranceFAQ /></PublicLayout>} />

                {/* Business 2: Herbalife Nutrition */}
                <Route path="/nutrition" element={<PublicLayout><NutritionHome /></PublicLayout>} />
                <Route path="/nutrition/products" element={<PublicLayout><NutritionProducts /></PublicLayout>} />
                <Route path="/nutrition/calculators" element={<PublicLayout><NutritionCalculators /></PublicLayout>} />
                <Route path="/nutrition/faq" element={<PublicLayout><NutritionFAQ /></PublicLayout>} />

                {/* Business 3: Kangen Water */}
                <Route path="/kangen" element={<PublicLayout><KangenHome /></PublicLayout>} />
                <Route path="/kangen/technology" element={<PublicLayout><KangenTechnology /></PublicLayout>} />
                <Route path="/kangen/machines" element={<PublicLayout><KangenMachines /></PublicLayout>} />
                <Route path="/kangen/calculators" element={<PublicLayout><KangenCalculators /></PublicLayout>} />
                <Route path="/kangen/demo" element={<PublicLayout><KangenDemoBooking /></PublicLayout>} />
                <Route path="/kangen/faq" element={<PublicLayout><KangenFAQ /></PublicLayout>} />

                {/* Business 4: Solar Rooftop Installation */}
                <Route path="/solar" element={<PublicLayout><SolarHome /></PublicLayout>} />
                <Route path="/solar/calculator" element={<PublicLayout><SolarCalculatorPage /></PublicLayout>} />
                <Route path="/solar/subsidy" element={<PublicLayout><SolarSubsidyGuide /></PublicLayout>} />
                <Route path="/solar/projects" element={<PublicLayout><SolarProjects /></PublicLayout>} />
                <Route path="/solar/quotation" element={<PublicLayout><SolarQuotationRequest /></PublicLayout>} />
                <Route path="/solar/faq" element={<PublicLayout><SolarFAQ /></PublicLayout>} />

                {/* Admin & Business Dashboards */}
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* 404 Catch-All Route */}
                <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
              </Routes>
            </Suspense>
          </Router>
        </AppointmentModalProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
