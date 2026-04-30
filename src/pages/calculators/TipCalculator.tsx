import React from 'react';
import { History, Users, DollarSign, Split } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

import { cn } from '@/src/lib/utils';
import RelatedCalculators from '@/src/components/RelatedCalculators';

export default function TipCalculator() {
  const [bill, setBill] = React.useState('50');
  const [tipPercent, setTipPercent] = React.useState('15');
  const [people, setPeople] = React.useState('1');

  const calculate = () => {
    const b = parseFloat(bill) || 0;
    const t = parseFloat(tipPercent) || 0;
    const p = parseFloat(people) || 1;

    const tipAmount = (b * t) / 100;
    const total = b + tipAmount;
    const perPerson = total / p;

    return {
      tipAmount,
      total,
      perPerson
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Tip Calculator | Bill Splitter & Tip Tool | BestifyCalculator</title>
        <meta name="description" content="Quickly calculate tips and split bills with friends. Perfect for restaurants, cafes, and group outings. Simple and fast tip calculator." />
        <meta name="keywords" content="tip calculator, bill splitter, restaurant tip, gratuity calculator, split bill tool" />
        <link rel="canonical" href="https://bestifycalculator.com/tip-calculator" />
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <History className="text-brand-accent" />
          Tip Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Quickly calculate tips and split the bill among friends. No more complicated math after a meal.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-brand-card p-8 rounded-[40px] border border-brand-border shadow-sm space-y-8">
          <div className="space-y-4">
             <label className="text-sm font-bold text-brand-text-soft uppercase tracking-widest">Bill Amount</label>
             <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-soft font-bold">$</span>
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-4 bg-brand-bg border border-brand-border text-brand-primary rounded-2xl focus:ring-2 focus:ring-brand-accent outline-none text-xl font-bold transition-all"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                />
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-brand-text-soft uppercase tracking-widest">Tip %</label>
                <span className="text-brand-accent font-bold px-3 py-1 bg-brand-accent/10 rounded-lg">{tipPercent}%</span>
             </div>
             <input 
              type="range" 
              min="0" 
              max="100" 
              step="1"
              className="w-full accent-brand-accent"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
             />
             <div className="flex gap-2">
                {[10, 15, 18, 20, 25].map(pct => (
                  <button 
                    key={pct}
                    onClick={() => setTipPercent(pct.toString())}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${tipPercent === pct.toString() ? 'bg-brand-accent text-white' : 'bg-brand-bg text-brand-text-soft border border-brand-border hover:bg-brand-card'}`}
                  >
                    {pct}%
                  </button>
                ))}
             </div>
          </div>

          <div className="space-y-4">
             <label className="text-sm font-bold text-brand-text-soft uppercase tracking-widest">Number of People</label>
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setPeople(Math.max(1, parseInt(people) - 1).toString())}
                  className="w-12 h-12 flex items-center justify-center bg-brand-bg text-brand-primary rounded-xl text-xl font-bold hover:bg-brand-border border border-brand-border transition-colors outline-none"
                >-</button>
                <div className="flex-1 bg-brand-bg py-3 rounded-xl border border-brand-border text-center font-bold text-xl text-brand-primary">{people}</div>
                <button 
                  onClick={() => setPeople((parseInt(people) + 1).toString())}
                  className="w-12 h-12 flex items-center justify-center bg-brand-bg text-brand-primary rounded-xl text-xl font-bold hover:bg-brand-border border border-brand-border transition-colors outline-none"
                >+</button>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-brand-accent p-10 rounded-[40px] text-white shadow-xl shadow-brand-accent/20 text-center">
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2 text-white/90">Total Per Person</p>
              <p className="text-6xl font-black tracking-tighter mb-8">${results.perPerson.toFixed(2)}</p>
              
              <div className="grid grid-cols-2 gap-8 text-left pt-8 border-t border-white/20">
                 <div>
                    <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mb-1">Total Bill</p>
                    <p className="text-xl font-bold">${results.total.toFixed(2)}</p>
                 </div>
                 <div>
                    <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mb-1">Total Tip</p>
                    <p className="text-xl font-bold">${results.tipAmount.toFixed(2)}</p>
                 </div>
              </div>
           </div>

           <div className="bg-gray-900 dark:bg-brand-card p-8 rounded-[40px] text-white border border-transparent dark:border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="bg-gray-800 dark:bg-brand-bg p-3 rounded-2xl text-brand-accent">
                    <Split size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-white dark:text-brand-primary">Split History</h3>
                    <p className="text-xs text-gray-400 dark:text-brand-text-soft">Quickly reuse previous settings</p>
                 </div>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest text-brand-accent hover:underline">View All</button>
           </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="bg-brand-card/50 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-brand-border space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-brand-primary font-display uppercase tracking-tight">TIPPING ETIQUETTE & BILL SPLITTING GUIDE</h2>
          <p className="text-brand-text-soft leading-relaxed">
            Sharing a meal is one of life's greatest pleasures, but calculating the <span className="font-bold text-brand-primary">Bill Split</span> shouldn't be a chore. 
            Our <span className="font-bold text-brand-primary text-brand-accent">TIP CALCULATOR</span> is designed for instant accuracy, ensuring everyone pays their fair share. 
            In 2026, trending dining trends emphasize "Social Tipping" and transparent gratuity across global hospitality sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Global Tipping Standards</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Did you know that <span className="font-bold">Gratuity Percentages</span> vary significantly by country? Trending travel data shows that while 
               15-20% is standard in the US, many European countries include service in the bill. Our <span className="font-bold text-brand-accent">Split Tool</span> 
               allows you to adjust percentages to match the local custom instantly.
             </p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">How to Split Fairly</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Modern diners are moving away from "evenly split" to "itemized billing." While our tool handles <span className="text-brand-accent font-bold">TOTAL SPLITTING</span>, 
               knowing your <span className="font-bold">total per person</span> including tax and tip is the first step in transparent group finances. 
               No more awkward math at the table—Bestify does it for you.
             </p>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border">
          <p className="text-xs text-brand-text-soft italic text-center">
            Keywords: tip calculator, split bill with friends, restaurant gratuity tool, holiday tipping guide 2026, service charge calculator.
          </p>
        </div>
      </section>

      <RelatedCalculators currentId="tip" />
    </div>
  );
}
