import React from 'react';
import { Calculator, House, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import RelatedCalculators from '@/src/components/RelatedCalculators';

export default function MortgageCalculator() {
  const [price, setPrice] = React.useState('350000');
  const [downPayment, setDownPayment] = React.useState('70000');
  const [interest, setInterest] = React.useState('6.5');
  const [years, setYears] = React.useState('30');
  const [tax, setTax] = React.useState('4200'); // Annual
  const [insurance, setInsurance] = React.useState('1200'); // Annual

  const calculate = () => {
    const p = parseFloat(price);
    const dp = parseFloat(downPayment);
    const r = parseFloat(interest) / 100 / 12;
    const n = parseFloat(years) * 12;
    const t = parseFloat(tax) / 12;
    const i = parseFloat(insurance) / 12;

    const loanAmount = p - dp;
    if (loanAmount <= 0) return null;

    const monthlyPrincipalInterest = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalMonthly = monthlyPrincipalInterest + t + i;

    return {
      loanAmount,
      principalInterest: Math.round(monthlyPrincipalInterest),
      tax: Math.round(t),
      insurance: Math.round(i),
      total: Math.round(totalMonthly),
      totalPayable: Math.round(totalMonthly * n)
    };
  };

  const results = calculate();

  const chartData = results ? [
    { name: 'Principal & Interest', value: results.principalInterest, color: '#3b82f6' },
    { name: 'Property Tax', value: results.tax, color: '#f97316' },
    { name: 'Insurance', value: results.insurance, color: '#10b981' }
  ] : [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Helmet>
        <title>Mortgage Calculator | Monthly Payments & PITI | BestifyCalculator</title>
        <meta name="description" content="Calculate your mortgage payments including property tax and insurance. Plan your home purchase with our accurate PITI breakdown." />
        <link rel="canonical" href="https://bestifycalculator.com/mortgage-calculator" />
      </Helmet>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <House className="text-brand-accent" />
          Mortgage Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Go beyond simple loan math. Estimate your full monthly home payment (PITI).
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-text-soft uppercase tracking-widest">Home Price</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-text-soft uppercase tracking-widest">Down Payment</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-text-soft uppercase tracking-widest">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-text-soft uppercase tracking-widest">Loan Term (Years)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
            <div className="pt-4 border-t border-brand-border grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-brand-text-soft uppercase tracking-widest">Annual Tax</label>
                 <input 
                   type="number" 
                   className="w-full px-3 py-2 bg-brand-bg border border-brand-border text-brand-primary rounded-lg text-xs transition-all"
                   value={tax}
                   onChange={(e) => setTax(e.target.value)}
                 />
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-brand-text-soft uppercase tracking-widest">Annual Ins.</label>
                 <input 
                   type="number" 
                   className="w-full px-3 py-2 bg-brand-bg border border-brand-border text-brand-primary rounded-lg text-xs transition-all"
                   value={insurance}
                   onChange={(e) => setInsurance(e.target.value)}
                 />
               </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-brand-accent p-10 rounded-[40px] text-white shadow-xl shadow-brand-accent/20 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="text-center md:text-left">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2 text-white/90">Total Monthly Payment</p>
                    <p className="text-6xl font-black tracking-tighter">${results.total.toLocaleString()}</p>
                 </div>
                 <div className="flex flex-col gap-2 w-full md:w-auto">
                    <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/20">
                       <p className="text-[10px] uppercase font-bold opacity-60">Principal & Interest</p>
                       <p className="text-lg font-bold">${results.principalInterest.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/20">
                       <p className="text-[10px] uppercase font-bold opacity-60">Taxes & Insurance</p>
                       <p className="text-lg font-bold">${(results.tax + results.insurance).toLocaleString()}</p>
                    </div>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-brand-card p-8 rounded-[40px] border border-brand-border shadow-sm">
                    <h3 className="text-sm font-bold text-brand-text-soft uppercase tracking-widest mb-6 text-center">Payment Breakdown</h3>
                    <div className="h-48">
                       <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                           <Pie data={chartData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                             {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                           </Pie>
                           <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--brand-card)', borderColor: 'var(--brand-border)', color: 'var(--brand-primary)' }}
                            itemStyle={{ color: 'var(--brand-primary)' }}
                           />
                         </PieChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                       {chartData.map(item => (
                         <div key={item.name} className="flex items-center justify-between text-xs">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-brand-text-soft font-medium">{item.name}</span>
                           </div>
                           <span className="font-bold text-brand-primary">${item.value}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm flex items-center gap-6">
                       <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl text-blue-500"><Wallet size={24} /></div>
                       <div>
                          <p className="text-[10px] font-bold text-brand-text-soft uppercase tracking-widest">Loan Amount</p>
                          <p className="text-xl font-bold text-brand-primary">${results.loanAmount.toLocaleString()}</p>
                       </div>
                    </div>
                    <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm flex items-center gap-6">
                       <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-green-500"><TrendingDown size={24} /></div>
                       <div>
                          <p className="text-[10px] font-bold text-brand-text-soft uppercase tracking-widest">Total Payoff</p>
                          <p className="text-xl font-bold text-brand-primary">${results.totalPayable.toLocaleString()}</p>
                       </div>
                    </div>
                    <div className="bg-brand-primary p-6 rounded-3xl text-brand-bg">
                       <p className="text-xs opacity-70 leading-relaxed italic">
                         Includes Principal, Interest, Property Tax (Monthly), and Homeowners Insurance (Monthly). This is an estimate; actual escrow values may vary based on location and provider.
                       </p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="bg-brand-card/50 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-brand-border space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-brand-primary font-display uppercase tracking-tight">MORTGAGE PLANNING & REAL ESTATE TRENDS</h2>
          <p className="text-brand-text-soft leading-relaxed">
            Securing a <span className="font-bold text-brand-primary">Home Loan</span> is one of the most critical financial decisions in 2026. Our <span className="font-bold text-brand-primary text-brand-accent">MORTGAGE CALCULATOR</span> 
            goes beyond just principal and interest, allowing you to factor in <span className="font-bold">Property Taxes</span> and <span className="font-bold">Homeowners Insurance</span> (PITI). 
            In a volatile housing market, understanding your debt-to-income ratio is the key to sustainable homeownership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Understanding Amortization</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Trending mortgage discussions often focus on "how to shorten the loan term." By using our <span className="font-bold">Mortgage Tool</span>, 
               you can see how a 15-year vs 30-year term affects your long-term wealth. Small changes in interest rates can lead 
               to massive savings over the life of the <span className="font-bold">real estate loan</span>.
             </p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Escrow & Hidden Costs</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Most buyers only consider the monthly principal, but <span className="text-brand-accent font-bold">ESCROW FEES</span>, 
               maintenance, and insurance can add 20-30% to your monthly obligation. Bestify's <span className="font-bold">housing payment calculator</span> 
               is designed to provide a realistic view of your total monthly expenditures.
             </p>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border">
          <p className="text-xs text-brand-text-soft italic text-center">
            Keywords: mortgage calculator 2026, home loan payment, PITI calculator, real estate investment, property tax estimator.
          </p>
        </div>
      </section>

      <RelatedCalculators currentId="mortgage" />
    </div>
  );
}
