import React from 'react';
import { HandCoins, Calculator, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '@/src/lib/utils';
import RelatedCalculators from '@/src/components/RelatedCalculators';

export default function LoanCalculator() {
  const [amount, setAmount] = React.useState('250000');
  const [interest, setInterest] = React.useState('5.5');
  const [years, setYears] = React.useState('30');
  
  const calculateLoan = () => {
    const p = parseFloat(amount);
    const r = parseFloat(interest) / 100 / 12;
    const n = parseFloat(years) * 12;
    
    if (!p || !r || !n) return null;
    
    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - p;
    
    return {
      monthly: Math.round(monthly),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      interestPercent: Math.round((totalInterest / totalPayment) * 100)
    };
  };

  const results = calculateLoan();
  
  const chartData = results ? [
    { name: 'Principal', value: parseFloat(amount), color: '#3b82f6' },
    { name: 'Total Interest', value: results.totalInterest, color: '#f97316' }
  ] : [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Helmet>
        <title>Loan Calculator | Monthly Payment & Interest Tool | BestifyCalculator</title>
        <meta name="description" content="Calculate your monthly loan payments, total interest, and principal breakdown. Perfect for personal loans, auto loans, and general financing." />
        <meta name="keywords" content="loan calculator, monthly payment, interest calculator, loan payoff, personal loan calc" />
        <link rel="canonical" href="https://bestifycalculator.com/loan" />

        {/* FAQ Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How is monthly loan payment calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The monthly payment is calculated using the amortization formula: P * [r(1+r)^n] / [(1+r)^n – 1], where P is principal, r is monthly interest rate, and n is number of months."
                }
              },
              {
                "@type": "Question",
                "name": "Does this calculator include taxes and insurance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This general loan calculator focus on principal and interest. For taxes and insurance, please use our Mortgage Calculator."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <HandCoins className="text-brand-accent" />
          Loan Payment Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Detailed breakdown of your monthly payments, total interest, and loan payoff structure.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Input panel */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Loan Amount ($)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.1"
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Loan Term (Years)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-brand-accent p-8 rounded-3xl text-white shadow-xl shadow-brand-accent/20">
             <p className="text-sm font-medium opacity-80 mb-2 uppercase tracking-widest">Monthly Payment</p>
             <p className="text-4xl font-black">${results?.monthly.toLocaleString()}</p>
             <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Total Pay</p>
                  <p className="text-sm font-bold">${results?.totalPayment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Payoff Year</p>
                  <p className="text-sm font-bold">{new Date().getFullYear() + parseInt(years)}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Results / Visualization */}
        <div className="md:col-span-2 space-y-6">
          {results && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-brand-card p-8 rounded-[40px] shadow-sm border border-brand-border flex flex-col items-center justify-center">
                <p className="text-sm font-bold text-brand-text-soft uppercase tracking-widest mb-4">Payment Breakdown</p>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--brand-card)', borderColor: 'var(--brand-border)', color: 'var(--brand-primary)' }}
                        itemStyle={{ color: 'var(--brand-primary)' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl text-blue-500">
                      <Calculator size={20} />
                    </div>
                    <h3 className="font-bold text-brand-primary">Principal</h3>
                  </div>
                  <p className="text-2xl font-bold text-brand-primary">${parseFloat(amount).toLocaleString()}</p>
                  <p className="text-xs text-brand-text-soft mt-1">The amount you borrowed</p>
                </div>

                <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-2xl text-orange-500">
                      <PieChartIcon size={20} />
                    </div>
                    <h3 className="font-bold text-brand-primary">Total Interest</h3>
                  </div>
                  <p className="text-2xl font-bold text-brand-primary">${results.totalInterest.toLocaleString()}</p>
                  <p className="text-xs text-orange-500 mt-1 font-semibold">{results.interestPercent}% of total cost is interest</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-brand-card p-8 rounded-[40px] shadow-sm border border-brand-border">
            <h3 className="text-xl font-bold mb-6 text-brand-primary">Amortization Insights</h3>
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-bg p-2 rounded-lg mt-1 text-brand-text-soft"><Calendar size={16} /></div>
                    <div>
                      <p className="font-bold text-sm text-brand-primary">Pay Half, Save Big</p>
                      <p className="text-xs text-brand-text-soft leading-relaxed">Paying just $100 more per month can shave years off your loan and save thousands in interest.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-bg p-2 rounded-lg mt-1 text-brand-text-soft"><Calculator size={16} /></div>
                    <div>
                      <p className="font-bold text-sm text-brand-primary">Refinance Check</p>
                      <p className="text-xs text-brand-text-soft leading-relaxed">If interest rates drop by 1% or more, consider refinancing to lower your monthly obligation.</p>
                    </div>
                  </div>
               </div>
               <div className="bg-brand-bg p-6 rounded-3xl flex flex-col justify-center border border-brand-border">
                  <p className="text-xs font-bold text-brand-text-soft uppercase tracking-widest mb-1">Total Cost of Loan</p>
                  <p className="text-3xl font-black text-brand-primary">${results?.totalPayment.toLocaleString()}</p>
                  <div className="w-full bg-brand-card h-2 rounded-full mt-4 overflow-hidden border border-brand-border">
                    <div className="bg-brand-accent h-full" style={{ width: '100%' }} />
                  </div>
               </div>
            </div>
          </div>

          <section className="bg-brand-card/50 backdrop-blur-sm p-8 rounded-[40px] border border-brand-border space-y-6">
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight">Loan Guide & FAQ</h2>
            <div className="grid gap-6">
              <div className="space-y-2">
                <h3 className="font-bold text-brand-primary">How do interest rates affect my loan?</h3>
                <p className="text-sm text-brand-text-soft leading-relaxed">
                  Higher interest rates significantly increase the total cost of your loan over time. Even a 0.5% difference can save you thousands of dollars in total interest payments.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-brand-primary">What is Principal vs Interest?</h3>
                <p className="text-sm text-brand-text-soft leading-relaxed">
                  The Principal is the actual amount you borrowed. Interest is the fee charged by the lender for using their money. Our calculator helps you see the exact breakdown of both.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <RelatedCalculators currentId="financial" />
    </div>
  );
}
