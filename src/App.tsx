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
            <Route path="/age" element={<AgeCalculator />} />
            <Route path="/units" element={<UnitConverter />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/salary" element={<SalaryCalculator />} />
            <Route path="/date" element={<DateCalculator />} />
            <Route path="/loan" element={<LoanCalculator />} />
            <Route path="/tip" element={<TipCalculator />} />
            <Route path="/currency" element={<CurrencyConverter />} />
            <Route path="/calories" element={<CaloriesCalculator />} />
            <Route path="/fat" element={<BodyFatCalculator />} />
            <Route path="/mortgage" element={<MortgageCalculator />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}
