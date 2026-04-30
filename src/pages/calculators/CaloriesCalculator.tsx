import React from 'react';
import { Flame, Info, Utensils, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import RelatedCalculators from '@/src/components/RelatedCalculators';

const ACTIVITY_MULTIPLIERS = {
  sedentary: { label: 'Sedentary', value: 1.2, desc: 'Little or no exercise' },
  light: { label: 'Lightly Active', value: 1.375, desc: 'Exercise 1-3 times/week' },
  moderate: { label: 'Moderately Active', value: 1.55, desc: 'Exercise 4-5 times/week' },
  very: { label: 'Very Active', value: 1.725, desc: 'Intense exercise daily' },
  extra: { label: 'Extra Active', value: 1.9, desc: 'Very intense exercise or physical job' }
};

export default function CaloriesCalculator() {
  const [weight, setWeight] = React.useState('70');
  const [height, setHeight] = React.useState('175');
  const [age, setAge] = React.useState('25');
  const [gender, setGender] = React.useState<'male' | 'female'>('male');
  const [activity, setActivity] = React.useState<keyof typeof ACTIVITY_MULTIPLIERS>('moderate');

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    if (!w || !h || !a) return null;

    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr += (gender === 'male' ? 5 : -161);

    const tdee = bmr * ACTIVITY_MULTIPLIERS[activity].value;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      loss: Math.round(tdee - 500),
      gain: Math.round(tdee + 500)
    };
  };

  const result = calculate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Daily Calorie Calculator | TDEE & BMR | BestifyCalculator</title>
        <meta name="description" content="Calculate your daily calorie needs for weight loss, maintenance, or muscle gain using the Mifflin-St Jeor formula." />
        <link rel="canonical" href="https://bestifycalculator.com/calories-calculator" />
      </Helmet>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <Flame className="text-brand-accent" />
          Calories Calculator
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Understand your daily energy requirements based on your biology and activity level.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-brand-card p-8 rounded-[40px] border border-brand-border shadow-sm space-y-8">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Weight (kg)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-primary">Height (cm)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-primary">Age (years)</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-primary rounded-xl focus:ring-2 focus:ring-brand-accent outline-none font-bold transition-all"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-brand-primary">Activity Level</label>
            <div className="grid gap-2">
              {(Object.keys(ACTIVITY_MULTIPLIERS) as Array<keyof typeof ACTIVITY_MULTIPLIERS>).map(key => (
                <button
                  key={key}
                  onClick={() => setActivity(key)}
                  className={cn(
                    "flex flex-col items-start px-4 py-3 rounded-2xl border transition-all text-left",
                    activity === key 
                      ? "bg-brand-accent border-brand-accent text-white" 
                      : "bg-brand-bg border-brand-border text-brand-text-soft hover:bg-brand-card"
                  )}
                >
                  <span className="font-bold text-sm">{ACTIVITY_MULTIPLIERS[key].label}</span>
                  <span className={cn("text-[10px]", activity === key ? "text-white/70" : "text-brand-text-soft/60")}>
                    {ACTIVITY_MULTIPLIERS[key].desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-brand-accent p-10 rounded-[40px] text-white shadow-xl shadow-brand-accent/20 text-center">
                 <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2 text-white/90">Daily Maintenance Calories</p>
                 <p className="text-6xl font-black tracking-tighter mb-4">{result.tdee}</p>
                 <p className="text-white/60 text-sm">Calories per day</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm">
                    <div className="flex items-center gap-3 text-red-500 mb-2">
                       <Zap size={18} />
                       <span className="text-xs font-bold uppercase tracking-widest text-brand-text-soft">Weight Loss</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-primary transition-colors">{result.loss}</p>
                    <p className="text-[10px] text-brand-text-soft mt-1">-500 kcal deficit</p>
                 </div>
                 <div className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm">
                    <div className="flex items-center gap-3 text-green-500 mb-2">
                       <Utensils size={18} />
                       <span className="text-xs font-bold uppercase tracking-widest text-brand-text-soft">Muscle Gain</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-primary transition-colors">{result.gain}</p>
                    <p className="text-[10px] text-brand-text-soft mt-1">+500 kcal surplus</p>
                 </div>
              </div>

              <div className="bg-gray-900 dark:bg-brand-card p-8 rounded-[40px] text-white border border-transparent dark:border-brand-border">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gray-800 dark:bg-brand-bg p-3 rounded-2xl text-brand-accent">
                       <Info size={24} />
                    </div>
                    <div>
                       <h3 className="font-bold text-white dark:text-brand-primary">Basal Metabolic Rate</h3>
                       <p className="text-xs text-gray-500 dark:text-brand-text-soft uppercase tracking-widest">BMR: {result.bmr} kcal</p>
                    </div>
                 </div>
                 <p className="text-xs text-gray-500 dark:text-brand-text-soft leading-relaxed italic">
                   BMR is the amount of energy expanded while at rest. Your TDEE is your BMR adjusted for your daily movement. Results are estimates based on the Mifflin-St Jeor formula.
                 </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="bg-brand-card/50 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-brand-border space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-brand-primary font-display uppercase tracking-tight">TDEE, BMR & WEIGHT MANAGEMENT DATA</h2>
          <p className="text-brand-text-soft leading-relaxed">
            Your <span className="font-bold text-brand-primary">Daily Calorie Intake</span> is the foundation of any fitness transformation. Our <span className="font-bold text-brand-primary text-brand-accent">CALORIES CALCULATOR</span> 
            uses the clinically-backed <span className="font-bold">Mifflin-St Jeor Equation</span> to estimate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). 
            In 2026, trending nutritional science highlights that calories are not just numbers; they are fuel for your biological engine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">BMR vs TDEE Comparison</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Trending weight loss topics often confuse <span className="font-bold">"BMR"</span> with <span className="font-bold">"Maintenance Calories."</span> 
               By using our <span className="font-bold text-brand-accent">TDEE TOOL</span>, you can see how your lifestyle—from sedentary to extra active—affects 
               your metabolic burn. This is the first step in creating a sustainable <span className="font-bold">calorie deficit</span> or surplus.
             </p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Fat Loss & Muscle Gain Indices</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Looking for trending <span className="text-brand-accent font-bold">CALORIE SURPLUS</span> strategies? Our tool provides specific targets 
               for muscle growth and fat oxidation. Precision in <span className="font-bold">macro planning</span> starts with knowing your maintenance floor, 
               and Bestify delivers that data instantly without the need for complex manual math.
             </p>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border">
          <p className="text-xs text-brand-text-soft italic text-center">
            Keywords: calories calculator, TDEE calculator, BMR estimator, weight loss plan, muscle gain calories, fitness tracker 2026.
          </p>
        </div>
      </section>

      <RelatedCalculators currentId="calories" />
    </div>
  );
}
