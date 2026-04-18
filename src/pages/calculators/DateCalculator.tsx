import React from 'react';
import { Calendar, Info, Clock, ArrowRight } from 'lucide-react';
import { differenceInDays, differenceInMonths, differenceInWeeks, format, addDays, parseISO } from 'date-fns';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function DateCalculator() {
  const [startDate, setStartDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = React.useState(format(addDays(new Date(), 30), 'yyyy-MM-dd'));

  const calculate = () => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const days = differenceInDays(end, start);
    const weeks = differenceInWeeks(end, start);
    const months = differenceInMonths(end, start);

    return {
      days: Math.abs(days),
      weeks: Math.abs(weeks),
      months: Math.abs(months),
      isPast: days < 0
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Date Calculator | Days Between Dates Counter | BestifyCalculator</title>
        <meta name="description" content="Calculate the exact number of days, weeks, and months between any two dates. Perfect for project planning and milestone tracking." />
        <meta name="keywords" content="date calculator, days between dates, week counter, time between dates, project schedule tool" />
        <link rel="canonical" href="https://bestifycalculator.com/date" />
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <Calendar className="text-brand-accent" />
          Date Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Calculate the number of days, weeks, and months between two dates with precision.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Start Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex justify-center text-brand-text-soft">
               <ArrowRight size={20} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">End Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/20 flex gap-4">
            <Info className="text-blue-500 shrink-0" size={18} />
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              This calculator counts the difference starting from the first day up to the last day. 
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-6"
            >
              <div className="bg-brand-card p-10 rounded-[40px] shadow-sm border border-brand-border text-center">
                 <p className="text-brand-text-soft font-bold uppercase tracking-widest text-xs mb-2">Difference in Days</p>
                 <p className="text-7xl font-black text-brand-primary tracking-tighter mb-2">{results.days}</p>
                 <p className="text-brand-text-soft font-medium">{results.isPast ? 'Days ago' : 'Days from now'}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-brand-accent p-8 rounded-[40px] text-white shadow-lg shadow-brand-accent/20">
                    <div className="flex items-center gap-3 opacity-60 mb-2">
                       <Clock size={16} />
                       <span className="text-xs font-bold uppercase tracking-widest">Weeks</span>
                    </div>
                    <p className="text-4xl font-black">{results.weeks}</p>
                 </div>
                 <div className="bg-gray-900 dark:bg-brand-accent p-8 rounded-[40px] text-white shadow-lg transition-colors">
                    <div className="flex items-center gap-3 opacity-60 mb-2">
                       <Clock size={16} />
                       <span className="text-xs font-bold uppercase tracking-widest">Months</span>
                    </div>
                    <p className="text-4xl font-black">{results.months}</p>
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
