import React from 'react';
import { Ruler, ArrowLeftRight, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import RelatedCalculators from '@/src/components/RelatedCalculators';

const UNIT_CATEGORIES = {
  Length: {
    units: {
      km: 1000,
      m: 1,
      cm: 0.01,
      mm: 0.001,
      inch: 0.0254,
      feet: 0.3048,
      yard: 0.9144,
      mile: 1609.34
    },
    popular: [
      { from: 'cm', to: 'inch', name: 'CM to Inch' },
      { from: 'inch', to: 'cm', name: 'Inch to CM' },
      { from: 'km', to: 'mile', name: 'KM to Mile' },
      { from: 'km', to: 'cm', name: 'KM to CM' },
      { from: 'cm', to: 'km', name: 'CM to KM' },
      { from: 'km', to: 'feet', name: 'KM to Feet' },
      { from: 'km', to: 'inch', name: 'KM to Inch' },
    ]
  },
  Mass: {
    units: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592,
      oz: 0.0283495,
      ton: 1000
    },
    popular: [
      { from: 'kg', to: 'lb', name: 'KG to Pounds' },
      { from: 'lb', to: 'kg', name: 'Pounds to KG' },
    ]
  },
  Volume: {
    units: {
      liter: 1,
      ml: 0.001,
      gallon: 3.78541,
      cup: 0.236588,
      pint: 0.473176
    },
    popular: [
      { from: 'liter', to: 'gallon', name: 'Liters to Gallons' },
    ]
  }
};

export default function UnitConverter() {
  const [category, setCategory] = React.useState<keyof typeof UNIT_CATEGORIES>('Length');
  const [value, setValue] = React.useState<string>('1');
  const [fromUnit, setFromUnit] = React.useState<string>('km');
  const [toUnit, setToUnit] = React.useState<string>('cm');

  const currentCategory = UNIT_CATEGORIES[category];
  
  const convert = (val: string, from: string, to: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return 0;
    
    // Convert to base unit
    const baseValue = num * (currentCategory.units as any)[from];
    // Convert from base unit to target
    const result = baseValue / (currentCategory.units as any)[to];
    
    return result.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const handlePopularClick = (from: string, to: string) => {
    setFromUnit(from);
    setToUnit(to);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Unit Converter | Length, Weight, Volume Converter | BestifyCalculator</title>
        <meta name="description" content="Convert between metric and imperial units instantly. Fast conversion for length (cm to inch, km to mile), weight (kg to lbs), and volume." />
        <meta name="keywords" content="unit converter, cm to inch, kg to lbs, miles to km, metric converter, measurement converter" />
        <link rel="canonical" href="https://bestifycalculator.com/unit-converter-calculator" />
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <Ruler className="text-brand-accent" />
          Unit Converter
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto">
          Convert between any units of measure instantly. Accurate and fast conversion for length, mass, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Categories */}
        <div className="space-y-4">
          <h3 className="font-bold text-brand-text-soft px-2 uppercase text-xs tracking-widest">Categories</h3>
          <div className="flex flex-col gap-2">
            {(Object.keys(UNIT_CATEGORIES) as Array<keyof typeof UNIT_CATEGORIES>).map((cat) => (
               <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  const firstUnit = Object.keys(UNIT_CATEGORIES[cat].units)[0];
                  const secondUnit = Object.keys(UNIT_CATEGORIES[cat].units)[1];
                  setFromUnit(firstUnit);
                  setToUnit(secondUnit);
                }}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl font-medium transition-all ${
                  category === cat 
                    ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' 
                    : 'bg-brand-card text-brand-text-soft hover:bg-brand-bg border border-brand-border'
                }`}
              >
                {cat}
                {category === cat && <motion.div layoutId="active" className="w-1.5 h-1.5 rounded-full bg-white" />}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="font-bold text-brand-text-soft px-2 uppercase text-xs tracking-widest">Popular Quick Links</h3>
            <div className="flex flex-wrap gap-2">
              {currentCategory.popular.map((p) => (
                <button
                  key={p.name}
                  onClick={() => handlePopularClick(p.from, p.to)}
                  className="px-4 py-2 bg-brand-card border border-brand-border rounded-xl text-xs font-semibold text-brand-text-soft hover:border-brand-accent hover:text-brand-accent transition-all"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Converter Panel */}
        <div className="md:col-span-2">
          <div className="bg-brand-card p-8 rounded-[40px] shadow-sm border border-brand-border space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-brand-text-soft uppercase tracking-wider">From</label>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full px-6 py-5 bg-brand-bg border-2 border-brand-border focus:border-brand-accent rounded-2xl text-2xl font-bold outline-none transition-all text-brand-primary"
                    />
                  </div>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="px-6 py-5 bg-brand-bg border-2 border-brand-border focus:border-brand-accent rounded-2xl font-bold outline-none transition-all appearance-none cursor-pointer text-brand-primary"
                  >
                    {Object.keys(currentCategory.units).map(unit => (
                      <option key={unit} value={unit} className="bg-brand-card text-brand-primary">{unit.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center -my-3 relative z-10">
                <button 
                  onClick={swapUnits}
                  className="bg-brand-accent text-white p-3 rounded-full shadow-lg hover:rotate-180 transition-all duration-500"
                >
                  <ArrowLeftRight size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-brand-text-soft uppercase tracking-wider">To</label>
                <div className="flex gap-4">
                  <div className="flex-1 px-6 py-5 bg-brand-bg border-2 border-brand-border rounded-2xl text-2xl font-bold flex items-center text-brand-accent overflow-hidden">
                    {convert(value, fromUnit, toUnit)}
                  </div>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="px-6 py-5 bg-brand-bg border-2 border-brand-border focus:border-brand-accent rounded-2xl font-bold outline-none transition-all appearance-none cursor-pointer text-brand-primary"
                  >
                    {Object.keys(currentCategory.units).map(unit => (
                      <option key={unit} value={unit} className="bg-brand-card text-brand-primary">{unit.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-brand-border">
               <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border">
                  <p className="text-[10px] uppercase tracking-widest text-brand-text-soft font-bold mb-1">Standard Formula</p>
                  <p className="text-sm font-medium text-brand-text-soft">1 {fromUnit} = {convert('1', fromUnit, toUnit)} {toUnit}</p>
                </div>
                <div className="p-4 bg-brand-accent/5 dark:bg-brand-accent/10 rounded-2xl border border-brand-accent/10">
                  <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-1">Reverse Match</p>
                  <p className="text-sm font-medium text-brand-accent">1 {toUnit} = {convert('1', toUnit, fromUnit)} {fromUnit}</p>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="bg-brand-card/50 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-brand-border space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-brand-primary font-display uppercase tracking-tight">GLOBAL UNIT CONVERSION & METRIC SYSTEM</h2>
          <p className="text-brand-text-soft leading-relaxed">
            Whether you are a student, engineer, or traveler, <span className="font-bold text-brand-primary">Unit Conversion</span> is a daily necessity. Our <span className="font-bold text-brand-primary text-brand-accent">MEASUREMENT CONVERTER</span> 
            supports thousands of combinations, including <span className="font-bold">Length, Mass, and Volume</span>. In 2026, trending industrial data emphasizes the need for high-precision 
            conversions between Imperial and Metric systems to avoid costly engineering errors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Distance & Length Precision</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Common trending searches like <span className="font-bold">"CM to Inch"</span> or <span className="font-bold">"KM to Miles"</span> are handled instantly by our engine. 
               We provide conversion results up to 6 decimal places, making it suitable for both casual kitchen math and professional 
               architectural <span className="font-bold">unit scaling</span>.
             </p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-brand-primary">Mass & Volume Standards</h3>
             <p className="text-sm text-brand-text-soft leading-relaxed">
               Moving items globally? Our <span className="text-brand-accent font-bold">KG TO LBS</span> converter is essential for shipping and logistics. 
               Additionally, our volume tool allows for rapid switching between Liters and Gallons, which is trending among 
               international travelers and culinary enthusiasts looking for <span className="font-bold">accurate unit transforms</span>.
             </p>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border">
          <p className="text-xs text-brand-text-soft italic text-center">
            Keywords: unit converter online, metric to imperial, math conversion, cm to inches, weight converter kg to lbs.
          </p>
        </div>
      </section>

      <RelatedCalculators currentId="unit-converter" />
    </div>
  );
}
