import React from 'react';
import { Weight, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';

export default function BMICalculator() {
  const [weight, setWeight] = React.useState('70');
  const [height, setHeight] = React.useState('175');
  const [unit, setUnit] = React.useState<'metric' | 'imperial'>('metric');
  
  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return 0;
    
    let bmiValue = 0;
    if (unit === 'metric') {
      bmiValue = w / ((h / 100) * (h / 100));
    } else {
      bmiValue = (w / (h * h)) * 703;
    }
    return Math.round(bmiValue * 10) / 10;
  };

  const bmi = calculateBMI();

  const getBMICategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    if (val < 25) return { label: 'Normal weight', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' };
    if (val < 30) return { label: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' };
    return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' };
  };

  const category = getBMICategory(bmi);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>BMI Calculator | Healthy Weight Tool | BestifyCalculator</title>
        <meta name="description" content="Check your Body Mass Index (BMI) instantly. Find your ideal weight range and health category with our accurate BMI tool for adults." />
        <meta name="keywords" content="bmi calculator, body mass index, healthy weight, weight category, fitness tool" />
        <link rel="canonical" href="https://bestifycalculator.com/bmi" />
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <Weight className="text-brand-accent" />
          BMI Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Calculate your Body Mass Index (BMI) to determine if you are at a healthy weight for your height.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm space-y-6">
            <div className="flex p-1 bg-brand-bg rounded-xl border border-brand-border">
              <button 
                onClick={() => setUnit('metric')}
                className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", unit === 'metric' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-soft")}
              >
                METRIC
              </button>
              <button 
                onClick={() => setUnit('imperial')}
                className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", unit === 'imperial' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-soft")}
              >
                IMPERIAL
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30 space-y-4">
             <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
               <Info size={18} />
               <span className="font-bold text-sm">BMI Categories</span>
             </div>
             <div className="space-y-2 text-xs text-blue-800 dark:text-blue-300">
                <div className="flex justify-between"><span>Underweight:</span> <span className="font-bold">&lt; 18.5</span></div>
                <div className="flex justify-between"><span>Normal:</span> <span className="font-bold">18.5 – 24.9</span></div>
                <div className="flex justify-between"><span>Overweight:</span> <span className="font-bold">25 – 29.9</span></div>
                <div className="flex justify-between"><span>Obese:</span> <span className="font-bold">30+</span></div>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-brand-card p-8 rounded-[40px] shadow-sm border border-brand-border">
             <div className="flex flex-col items-center py-10 text-center">
                <p className="text-brand-text-soft font-medium mb-1">Your Body Mass Index is</p>
                <p className="text-7xl font-black text-brand-primary tracking-tighter mb-4">{bmi}</p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={category.label}
                  className={cn("px-6 py-3 rounded-2xl flex items-center gap-3 transition-colors", category.bg)}
                >
                  <div className={cn("p-2 rounded-full bg-white dark:bg-black/20", category.color)}>
                    {bmi >= 18.5 && bmi < 25 ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <span className={cn("text-lg font-bold uppercase tracking-tight", category.color)}>{category.label}</span>
                </motion.div>
             </div>

             <div className="mt-8 pt-8 border-t border-brand-border">
                <h3 className="text-sm font-bold text-brand-text-soft uppercase tracking-widest mb-6">Health Indicator</h3>
                <div className="h-4 w-full bg-brand-bg rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-400" style={{ width: '20%' }} />
                  <div className="h-full bg-green-400" style={{ width: '25%' }} />
                  <div className="h-full bg-orange-400" style={{ width: '25%' }} />
                  <div className="h-full bg-red-400 flex-1" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-brand-text-soft">
                  <span>10</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
