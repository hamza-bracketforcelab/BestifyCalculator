import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/src/components/Layout';
import ScrollToTop from '@/src/components/ScrollToTop';
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('@/src/pages/Home'));
const AgeCalculator = lazy(() => import('@/src/pages/calculators/AgeCalculator'));
const UnitConverter = lazy(() => import('@/src/pages/calculators/UnitConverter'));
const BMICalculator = lazy(() => import('@/src/pages/calculators/BMICalculator'));
const LoanCalculator = lazy(() => import('@/src/pages/calculators/LoanCalculator'));
const SalaryCalculator = lazy(() => import('@/src/pages/calculators/SalaryCalculator'));
const DateCalculator = lazy(() => import('@/src/pages/calculators/DateCalculator'));
const TipCalculator = lazy(() => import('@/src/pages/calculators/TipCalculator'));
const CurrencyConverter = lazy(() => import('@/src/pages/calculators/CurrencyConverter'));
const CaloriesCalculator = lazy(() => import('@/src/pages/calculators/CaloriesCalculator'));
const BodyFatCalculator = lazy(() => import('@/src/pages/calculators/BodyFatCalculator'));
const MortgageCalculator = lazy(() => import('@/src/pages/calculators/MortgageCalculator'));
const WattsToVolts = lazy(() => import('@/src/pages/calculators/WattsToVolts'));
const VoltsToWatts = lazy(() => import('@/src/pages/calculators/VoltsToWatts'));

// Placeholder
const Placeholder = ({ title }: { title: string }) => (
  <div className="py-20 text-center">
    <h1 className="text-3xl font-bold bg-gray-50 inline-block px-8 py-4 rounded-3xl border border-gray-100">{title}</h1>
    <p className="mt-6 text-gray-500 max-w-md mx-auto leading-relaxed">
      We're currently perfecting this module to bring you the most accurate results. 
      Stay tuned for the full release!
    </p>
  </div>
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-20">
    <Loader2 className="animate-spin text-brand-accent" size={48} />
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/unit-converter-calculator" element={<UnitConverter />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/salary-calculator" element={<SalaryCalculator />} />
            <Route path="/date-calculator" element={<DateCalculator />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/tip-calculator" element={<TipCalculator />} />
            <Route path="/currency-converter-calculator" element={<CurrencyConverter />} />
            <Route path="/calories-calculator" element={<CaloriesCalculator />} />
            <Route path="/body-fat-calculator" element={<BodyFatCalculator />} />
            <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="/watts-to-volts-calculator" element={<WattsToVolts />} />
            <Route path="/volts-to-watts-calculator" element={<VoltsToWatts />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}
