import React from 'react';
import { Weight, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import RelatedCalculators from '@/src/components/RelatedCalculators';

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
        
        {/* FAQ Structured Data for Google Ranking */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a healthy BMI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A healthy BMI (Body Mass Index) for adults typically ranges from 18.5 to 24.9."
                }
              },
              {
                "@type": "Question",
                "name": "Is BMI the same for men and women?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The BMI formula is the same for both men and women, but interpretation may vary based on body composition."
                }
              }
            ]
          })}
        </script>
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

             <div className="mt-8 pt-8 border-t border-brand-border flex flex-col items-center">
                <h3 className="text-sm font-bold text-brand-text-soft uppercase tracking-widest mb-8">Health Speed Meter</h3>
                
                <div className="relative w-full max-w-[300px] aspect-[2/1] overflow-hidden">
                  {/* Gauge SVG */}
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <circle
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeDasharray="141.37"
                      strokeDashoffset="141.37"
                      className="text-brand-bg translate-y-0"
                    />
                    {/* Zones */}
                    <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" strokeWidth="10" stroke="url(#bmiGradient)" />
                    
                    <defs>
                      <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60a5fa" />    {/* Blue */}
                        <stop offset="28%" stopColor="#60a5fa" />
                        <stop offset="28%" stopColor="#4ade80" />   {/* Green */}
                        <stop offset="50%" stopColor="#4ade80" />
                        <stop offset="50%" stopColor="#fb923c" />   {/* Orange */}
                        <stop offset="67%" stopColor="#fb923c" />
                        <stop offset="67%" stopColor="#f87171" />   {/* Red */}
                        <stop offset="100%" stopColor="#f87171" />
                      </linearGradient>
                    </defs>

                    {/* Scale Marks */}
                    {[10, 18.5, 25, 30, 40].map((val) => {
                      const angle = ((val - 10) / 30) * 180;
                      const rad = (angle * Math.PI) / 180;
                      const x1 = 50 - 45 * Math.cos(rad);
                      const y1 = 50 - 45 * Math.sin(rad);
                      const x2 = 50 - 40 * Math.cos(rad);
                      const y2 = 50 - 40 * Math.sin(rad);
                      return <line key={val} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.5" />;
                    })}
                  </svg>

                  {/* Needle */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      rotate: ((Math.min(Math.max(bmi, 10), 40) - 10) / 30) * 180 - 90 
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="absolute bottom-0 left-1/2 w-1.5 h-[90%] bg-brand-primary origin-bottom rounded-full z-20 -translate-x-1/2 shadow-xl"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-accent rounded-full border-4 border-white shadow-lg -mt-2" />
                  </motion.div>
                  
                  {/* Center Hub */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-brand-primary rounded-t-full z-30 border-b-0 border border-brand-border" />
                </div>

                <div className="flex justify-between w-full max-w-[320px] mt-2 px-2 text-[10px] font-black text-brand-text-soft">
                  <span className="flex flex-col items-center"><span>10</span><span className="opacity-50 font-medium lowercase">min</span></span>
                  <span className="flex flex-col items-center"><span>18.5</span><span className="opacity-50 font-medium">normal</span></span>
                  <span className="flex flex-col items-center"><span>25</span><span className="opacity-50 font-medium">over</span></span>
                  <span className="flex flex-col items-center"><span>40</span><span className="opacity-50 font-medium lowercase">max</span></span>
                </div>
             </div>
          </div>

          {/* New SEO FAQ Section */}
          <section className="bg-brand-card/50 backdrop-blur-sm p-8 rounded-[40px] border border-brand-border space-y-6">
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight">BMI Health Guide & Trending FAQs</h2>
            <div className="grid gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-brand-primary">What is a Healthy BMI for Adults in 2026?</h3>
                <p className="text-sm text-brand-text-soft leading-relaxed">
                  According to the latest health standards, a <span className="font-bold">Healthy BMI</span> falls between 18.5 and 24.9. However, 
                  trending wellness research suggests considering body composition (muscle vs. fat) alongside your <span className="font-bold text-brand-accent">BMI SCORE</span>. 
                  Athletes often have a high BMI due to muscle density, which is perfectly healthy.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-brand-primary">How accurate is this BMI Calculator for weight loss?</h3>
                <p className="text-sm text-brand-text-soft leading-relaxed">
                  Our <span className="font-bold">accurate BMI tool</span> uses the official WHO formula (weight in kg / height in meters²). 
                  It is a trending starting point for anyone looking to track <span className="font-bold">weight loss progress</span> or 
                  calculate their <span className="text-brand-accent font-bold">ideal body weight</span> instantly.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-brand-primary">Why is BMI still widely used?</h3>
                <p className="text-sm text-brand-text-soft leading-relaxed">
                  Despite new technologies, <span className="font-bold text-brand-primary">Body Mass Index</span> remains the most 
                  trending search for initial health screenings because it is non-invasive and provides a rapid <span className="font-bold">health index</span> 
                  category (Underweight, Normal, Overweight, or Obese) that correlates strongly with metabolic risk factors.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-border text-center">
              <p className="text-xs text-brand-text-soft italic">
                Keywords: BMI calculator for men, women BMI tool, healthy weight range, body mass index 2026 trends, fitness health index.
              </p>
            </div>
          </section>
        </div>
      </div>
      <RelatedCalculators currentId="bmi" />
    </div>
  );
}
