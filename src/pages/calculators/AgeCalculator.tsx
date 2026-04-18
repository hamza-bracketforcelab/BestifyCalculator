import React from 'react';
import { intervalToDuration, format, differenceInDays, addYears, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, User, Info, Copy, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = React.useState('2000-01-01');
  const [targetDate, setTargetDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
  const [name, setName] = React.useState('');
  const [result, setResult] = React.useState<any>(null);

  const calculateAge = () => {
    const start = parseISO(birthDate);
    const end = parseISO(targetDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    const duration = intervalToDuration({ start, end });
    const totalDays = differenceInDays(end, start);
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysAfterWeeks = totalDays % 7;

    // Next birthday
    let nextBday = new Date(end.getFullYear(), start.getUTCMonth(), start.getUTCDate());
    if (nextBday < end) {
      nextBday = new Date(end.getFullYear() + 1, start.getUTCMonth(), start.getUTCDate());
    }
    const daysToNextBday = differenceInDays(nextBday, end);

    setResult({
      years: duration.years || 0,
      months: duration.months || 0,
      days: duration.days || 0,
      totalDays,
      totalWeeks,
      remainingDaysAfterWeeks,
      totalMonths: (duration.years || 0) * 12 + (duration.months || 0),
      daysToNextBday,
      nextBirthday: format(nextBday, 'EEEE, d MMMM yyyy')
    });
  };

  React.useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Age Calculator | Exact Age in Years, Months, Days | BestifyCalculator</title>
        <meta name="description" content="Calculate your exact age, next birthday, and life milestones. Simple, accurate age calculator for birth dates and specific time intervals." />
        <meta name="keywords" content="age calculator, birth date calculator, how old am i, chronological age, next birthday" />
        <link rel="canonical" href="https://bestifycalculator.com/age" />
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <User className="text-brand-accent" />
          Chronological Age Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Calculate precisely how long you've been on this planet. Get your age in years, months, weeks, and days.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Date of Birth</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Name (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Age on This Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>

            <button 
              onClick={calculateAge}
              className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Calculate Age
            </button>
          </div>

          <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/20 flex gap-4">
            <Info className="text-blue-500 shrink-0" size={20} />
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              Chronological age is the amount of time that has passed from a person's birth to a given date.
            </p>
          </div>
        </div>

        {/* Result Panel */}
        <div className="md:col-span-2 space-y-6">
          {result && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-brand-card p-8 rounded-[40px] shadow-sm border border-brand-border">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-brand-primary">Your Age</h2>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-brand-bg rounded-lg transition-colors text-brand-text-soft">
                      <Copy size={18} />
                    </button>
                    <button className="p-2 hover:bg-brand-bg rounded-lg transition-colors text-brand-text-soft">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-8 text-center bg-brand-bg rounded-3xl border border-brand-border">
                  <p className="text-brand-text-soft text-sm mb-2">You are precisely</p>
                  <p className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight">
                    {result.years} years, {result.months} months, and {result.days} days old
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  <div className="bg-brand-card p-4 rounded-2xl border border-brand-border text-center">
                    <p className="text-[10px] uppercase tracking-widest text-brand-text-soft font-bold mb-1">Months</p>
                    <p className="text-lg font-bold text-brand-primary">{result.totalMonths}</p>
                  </div>
                  <div className="bg-brand-card p-4 rounded-2xl border border-brand-border text-center">
                    <p className="text-[10px] uppercase tracking-widest text-brand-text-soft font-bold mb-1">Weeks</p>
                    <p className="text-lg font-bold text-brand-primary">{result.totalWeeks}</p>
                  </div>
                  <div className="bg-brand-card p-4 rounded-2xl border border-brand-border text-center">
                    <p className="text-[10px] uppercase tracking-widest text-brand-text-soft font-bold mb-1">Days</p>
                    <p className="text-lg font-bold text-brand-primary">{result.totalDays}</p>
                  </div>
                  <div className="bg-brand-card p-4 rounded-2xl border border-brand-border text-center">
                    <p className="text-[10px] uppercase tracking-widest text-brand-text-soft font-bold mb-1">Hours</p>
                    <p className="text-lg font-bold text-brand-primary">{(result.totalDays * 24).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/20 p-8 rounded-[40px] border border-orange-100 dark:border-orange-900/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-2xl text-orange-600 dark:text-orange-400">
                    <CalendarIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-primary">Next Birthday</h3>
                    <p className="text-sm text-brand-text-soft">How long until your big day?</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <p className="text-4xl font-black text-orange-600 dark:text-orange-400 tracking-tight">{result.daysToNextBday} Days</p>
                    <p className="text-brand-text-soft mt-2">{result.nextBirthday}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-brand-card border-2 border-brand-border flex items-center justify-center text-xs font-bold text-orange-400">
                        🎉
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
