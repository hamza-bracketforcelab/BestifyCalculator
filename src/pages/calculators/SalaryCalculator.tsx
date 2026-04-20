import React from 'react';
import { Banknote, Clock, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import RelatedCalculators from '@/src/components/RelatedCalculators';

export default function SalaryCalculator() {
  const [calculationMode, setCalculationMode] = React.useState<'hourly' | 'monthly'>('hourly');
  const [inputValue, setInputValue] = React.useState('25');
  const [hoursPerWeek, setHoursPerWeek] = React.useState('40');
  const [weeksPerYear, setWeeksPerYear] = React.useState('52');

  const calculate = () => {
    const val = parseFloat(inputValue) || 0;
    const hpw = parseFloat(hoursPerWeek) || 0;
    const wpy = parseFloat(weeksPerYear) || 0;

    let hourly = 0;
    let monthly = 0;

    if (calculationMode === 'hourly') {
      hourly = val;
      const weekly = hourly * hpw;
      monthly = (weekly * wpy) / 12;
    } else {
      monthly = val;
      const weekly = (monthly * 12) / wpy;
      hourly = weekly / hpw;
    }

    const weekly = hourly * hpw;
    const annually = weekly * wpy;

    return {
      hourly,
      daily: hourly * (hpw / 5),
      weekly,
      biweekly: weekly * 2,
      monthly,
      annually
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Salary Calculator | Hourly to Annual Rate Converter | BestifyCalculator</title>
        <meta name="description" content="Convert your hourly wage to daily, weekly, monthly, and annual salary. Accurate results with customizable work hours and vacation weeks." />
        <meta name="keywords" content="salary calculator, hourly to annual, wage converter, budget planning, income calculator" />
        <link rel="canonical" href="https://bestifycalculator.com/salary" />
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <Banknote className="text-brand-accent" />
          Salary Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Convert your rates to monthly and annual salary. Perfect for budget planning and job offer evaluation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm space-y-6">
            <div className="flex p-1 bg-brand-bg rounded-xl border border-brand-border">
              <button 
                onClick={() => {
                  setCalculationMode('hourly');
                  setInputValue('25');
                }}
                className={cn("flex-1 py-2 text-[10px] font-bold rounded-lg transition-all", calculationMode === 'hourly' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-soft")}
              >
                HOURLY RATE
              </button>
              <button 
                onClick={() => {
                  setCalculationMode('monthly');
                  setInputValue('4000');
                }}
                className={cn("flex-1 py-2 text-[10px] font-bold rounded-lg transition-all", calculationMode === 'monthly' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-soft")}
              >
                MONTHLY SALARY
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary capitalize">
                {calculationMode} Rate ({calculationMode === 'hourly' ? '$' : '$'})
              </label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold text-xl text-brand-primary transition-colors"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-text-soft text-brand-primary">Hours per Week</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:ring-2 focus:ring-brand-accent outline-none text-brand-primary transition-colors"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-text-soft text-brand-primary">Weeks per Year</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:ring-2 focus:ring-brand-accent outline-none text-brand-primary transition-colors"
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-brand-accent p-8 rounded-[40px] text-white shadow-xl shadow-brand-accent/20 col-span-1 sm:col-span-2">
               <p className="text-sm font-medium opacity-80 mb-1 uppercase tracking-widest">Annual Salary</p>
               <p className="text-5xl font-black">${results.annually.toLocaleString()}</p>
            </div>

            <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm">
               <div className="flex items-center gap-3 text-brand-text-soft mb-2">
                 <Calendar size={18} />
                 <span className="text-xs font-bold uppercase tracking-wider">
                   {calculationMode === 'monthly' ? 'Hourly Equivalent' : 'Monthly'}
                 </span>
               </div>
               <p className="text-2xl font-bold text-brand-primary">
                 ${calculationMode === 'monthly' ? results.hourly.toFixed(2) : Math.round(results.monthly).toLocaleString()}
               </p>
            </div>

            <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm">
               <div className="flex items-center gap-3 text-brand-text-soft mb-2">
                 <Clock size={18} />
                 <span className="text-xs font-bold uppercase tracking-wider">Weekly</span>
               </div>
               <p className="text-2xl font-bold text-brand-primary">${Math.round(results.weekly).toLocaleString()}</p>
            </div>

             <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm">
               <div className="flex items-center gap-3 text-brand-text-soft mb-2">
                 <TrendingUp size={18} />
                 <span className="text-xs font-bold uppercase tracking-wider">Bi-Weekly</span>
               </div>
               <p className="text-2xl font-bold text-brand-primary">${Math.round(results.biweekly).toLocaleString()}</p>
            </div>

             <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm">
               <div className="flex items-center gap-3 text-brand-text-soft mb-2">
                 <Clock size={18} />
                 <span className="text-xs font-bold uppercase tracking-wider">Daily</span>
               </div>
               <p className="text-2xl font-bold text-brand-primary">${Math.round(results.daily).toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-gray-900 dark:bg-brand-accent p-8 rounded-[40px] text-white transition-colors duration-300">
            <h3 className="text-lg font-bold mb-4">Earnings Breakdown</h3>
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60 font-medium">Monthly Gross</span>
                    <span className="font-bold">${Math.round(results.monthly).toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-accent dark:bg-white w-full opacity-50" />
                  </div>
               </div>
               <p className="text-xs text-white/40 leading-relaxed italic">
                 *Calculations are based on gross pay before taxes and deductions. Standard 40-hour work weeks and 52-week work years are assumed unless changed.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="bg-brand-card/50 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-brand-border space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-brand-primary font-display uppercase tracking-tight">ANNUAL SALARY & HOURLY RATE GUIDE</h2>
          <p className="text-brand-text-soft leading-relaxed">
            Understanding your <span className="font-bold text-brand-primary">Salary Breakdown</span> is crucial for financial stability. Whether you are transitioning from 
            an <span className="font-bold text-brand-primary text-brand-accent">HOURLY WAGE</span> to a full-time contract or negotiating a job offer, knowing your net and gross income 
            helps in defining your lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Why use a Salary Calculator?</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Most job offers discuss annual totals, but bills are paid monthly and hours are worked weekly. Our <span className="font-bold">Income Converter</span> bridges that gap. 
               By calculating your <span className="text-brand-accent font-bold">HOURLY TO SALARY</span> ratio, you can determine if a job offers competitive pay 
               compared to the market average and trending salary benchmarks.
             </p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Gross vs Net Pay</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               The values shown here reflect <span className="font-bold">GROSS SALARY</span>. Trending financial topics often emphasize the importance of 
               calculating taxes (FICA, Federal, and State) to find your take-home pay. Always remember that your "Total Compensation" 
               might include bonuses and benefits not captured in a base rate.
             </p>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border">
          <p className="text-xs text-brand-text-soft italic text-center">
            Keywords: salary converter, hourly to annual pay, wage calculation, 2026 salary trends, income planner, budget estimator.
          </p>
        </div>
      </section>

      <RelatedCalculators currentId="salary" />
    </div>
  );
}
