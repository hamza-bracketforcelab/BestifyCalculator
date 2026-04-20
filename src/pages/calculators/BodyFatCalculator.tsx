import React from 'react';
import { TrendingUp, Info, Ruler, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import RelatedCalculators from '@/src/components/RelatedCalculators';

export default function BodyFatCalculator() {
  const [gender, setGender] = React.useState<'male' | 'female'>('male');
  const [unit, setUnit] = React.useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = React.useState('75');
  const [height, setHeight] = React.useState('180');
  const [neck, setNeck] = React.useState('38');
  const [waist, setWaist] = React.useState('85');
  const [hip, setHip] = React.useState('95'); // Only for female

  const calculate = () => {
    let h = parseFloat(height);
    let n = parseFloat(neck);
    let w = parseFloat(waist);
    let hi = parseFloat(hip);
    
    if (!h || !n || !w) return null;

    // Convert to CM if Imperial
    if (unit === 'imperial') {
      h = h * 2.54;
      n = n * 2.54;
      w = w * 2.54;
      hi = hi * 2.54;
    }

    let bodyFat = 0;
    if (gender === 'male') {
      // U.S. Navy Method for Men (Measurements in cm)
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      // U.S. Navy Method for Women
      if (!hi) return null;
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }

    return Math.round(bodyFat * 10) / 10;
  };

  const bodyFat = calculate();

  const getCategory = (val: number | null) => {
    if (val === null) return null;
    if (gender === 'male') {
      if (val < 6) return { label: 'Essential Fat', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' };
      if (val < 14) return { label: 'Athletes', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' };
      if (val < 18) return { label: 'Fitness', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' };
      if (val < 25) return { label: 'Average', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' };
      return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' };
    } else {
      if (val < 14) return { label: 'Essential Fat', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' };
      if (val < 21) return { label: 'Athletes', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' };
      if (val < 25) return { label: 'Fitness', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' };
      if (val < 32) return { label: 'Average', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' };
      return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' };
    }
  };

  const category = getCategory(bodyFat);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Body Fat Percentage Calculator | U.S. Navy Method | BestifyCalculator</title>
        <meta name="description" content="Estimate your body fat percentage using the U.S. Navy Method. Enter your measurements for an accurate body composition breakdown." />
      </Helmet>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <TrendingUp className="text-brand-accent" />
          Body Fat Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Get an estimate of your body composition using the U.S. Navy circumference method.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-brand-card p-8 rounded-[40px] border border-brand-border shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="flex p-1 bg-brand-bg rounded-xl border border-brand-border">
              <button 
                onClick={() => setGender('male')}
                className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", gender === 'male' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-soft")}
              >
                MALE
              </button>
              <button 
                onClick={() => setGender('female')}
                className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", gender === 'female' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-soft")}
              >
                FEMALE
              </button>
            </div>

            <div className="flex p-1 bg-brand-bg rounded-xl border border-brand-border">
              <button 
                onClick={() => setUnit('metric')}
                className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", unit === 'metric' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-soft")}
              >
                METRIC (CM)
              </button>
              <button 
                onClick={() => setUnit('imperial')}
                className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", unit === 'imperial' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-soft")}
              >
                IMPERIAL (IN)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Height ({unit === 'metric' ? 'cm' : 'in'})</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Neck ({unit === 'metric' ? 'cm' : 'in'})</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-primary">Waist ({unit === 'metric' ? 'cm' : 'in'})</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
            />
          </div>

          {gender === 'female' && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Hip ({unit === 'metric' ? 'cm' : 'in'})</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
              />
            </div>
          )}

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex gap-3 text-xs text-orange-800 dark:text-orange-300">
             <Info className="shrink-0" size={16} />
             <p>Measure at the widest part of your neck, and at your navel for waist. For women, measure hips at the widest point.</p>
          </div>
        </div>

        <div className="space-y-6">
          {bodyFat !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-brand-card p-10 rounded-[40px] shadow-sm border border-brand-border text-center">
                 <p className="text-brand-text-soft font-bold uppercase tracking-widest text-xs mb-2">Estimated Body Fat</p>
                 <p className="text-7xl font-black text-brand-primary tracking-tighter mb-4">{bodyFat}%</p>
                 
                 {category && (
                    <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold", category.bg, category.color, "dark:bg-opacity-20")}>
                       <div className="w-2 h-2 rounded-full currentColor fill-current" />
                       {category.label}
                    </div>
                 )}
              </div>

              <div className="bg-gray-900 dark:bg-brand-card p-8 rounded-[40px] text-white border border-transparent dark:border-brand-border">
                 <h3 className="font-bold mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-brand-accent" />
                    How it works
                 </h3>
                 <p className="text-xs text-gray-400 dark:text-brand-text-soft leading-relaxed">
                   The U.S. Navy Method uses circumference measurements to estimate body composition. While clinically recognized, it has a margin of error of 3-4%. For highly accurate tracking, consider DEXA scans or hydrostatic weighing.
                 </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="bg-brand-card/50 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-brand-border space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-brand-primary font-display uppercase tracking-tight">BODY COMPOSITION & NAVY METHOD GUIDE</h2>
          <p className="text-brand-text-soft leading-relaxed">
            Understanding your <span className="font-bold text-brand-primary">Body Fat Percentage</span> is far more revealing than just looking at the scale. Our <span className="font-bold text-brand-primary text-brand-accent">BODY FAT CALCULATOR</span> 
            utilizes the trusted <span className="font-bold">U.S. Navy Circumference Method</span> to estimate your lean mass vs adipose tissue. 
            In 2026, trending fitness culture is shifting away from weight and focusing on "Body Recomposition" and metabolic health markers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Essential Fat vs Stored Fat</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Most people aim for "Six Pack ABS," but <span className="font-bold">Essential Body Fat</span> is necessary for hormone regulation and brain function. 
               By using our <span className="font-bold text-brand-accent">Measurement Tool</span>, you can determine if you fall into the Athlete, 
               Fitness, or Average category. Trending health data shows that optimal ranges vary strictly by gender and age.
             </p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">How to Measure Accurately</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               For the best results, use a <span className="text-brand-accent font-bold">FELEXIBLE TAPE MEASURE</span>. 
               Trending searches for "how to lower body fat" always start with establishing a baseline. 
               Whether you use metric or imperial, consistency in measurement location (Neck, Waist, and Hips) 
               is key to tracking your progress on Bestify's <span className="font-bold">composition tracker</span>.
             </p>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border">
          <p className="text-xs text-brand-text-soft italic text-center">
            Keywords: body fat calculator, navy method body fat, how to measure body fat, athlete body fat percentage, 2026 fitness trends.
          </p>
        </div>
      </section>

      <RelatedCalculators currentId="body-fat" />
    </div>
  );
}
