import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CALCULATORS } from '@/src/constants/calculators';
import CalculatorCard from '@/src/components/CalculatorCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCalculators = CALCULATORS.filter(calc => 
    calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <Helmet>
        <title>BestifyCalculator | Professional Health, Finance & Utility Calculators</title>
        <meta name="description" content="Access a comprehensive suite of free, accurate calculators. From BMI and Salary to Real-Time Currency and Unit Conversions, Bestify handles it all." />
        <meta name="keywords" content="calculator, bmi calculator, loan calculator, currency converter, unit converter, salary calculator" />
        <link rel="canonical" href="https://bestifycalculator.com/" />
      </Helmet>
      {/* Hero Section */}
      <section className="text-center py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-brand-primary leading-[0.9] font-display mb-8"
          >
            CALCULATE <br />
            <span className="text-brand-accent bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-indigo-500">PRECISION.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-text-soft max-w-2xl mx-auto leading-relaxed font-medium mb-12"
          >
            Access a suite of professional instruments for health, finance, and engineering. 
            All your vital data in one place.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto relative group"
        >
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-brand-text-soft group-focus-within:text-brand-accent transition-colors z-20">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Search 15+ professional tools..."
            className="block w-full pl-16 pr-6 py-6 glass bg-brand-card/40 rounded-[32px] focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all duration-500 outline-none text-brand-primary text-xl font-bold placeholder:text-brand-text-soft/50 shadow-brand-accent/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="relative z-10">
        <div className="flex items-end justify-between mb-12 px-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-brand-primary font-display uppercase tracking-tight">The Instruments</h2>
            <div className="w-12 h-1.5 bg-brand-accent rounded-full" />
          </div>
          <div className="text-[10px] font-black text-brand-text-soft uppercase tracking-[0.25em] bg-brand-card/50 backdrop-blur-md px-4 py-2 rounded-full border border-brand-border">
            {filteredCalculators.length} ACTIVE TOOLS
          </div>
        </div>

        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCalculators.map((calc, idx) => (
              <CalculatorCard key={calc.id} calc={calc} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-card rounded-3xl border border-dashed border-brand-border">
            <p className="text-brand-text-soft">No calculators found matching your search.</p>
          </div>
        )}
      </section>

      {/* Quick Tips or Featured */}
      <section className="relative glass bg-brand-accent/5 dark:bg-brand-card/40 rounded-[48px] p-10 md:p-16 overflow-hidden border border-brand-accent/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px] -ml-32 -mb-32 rounded-full" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-brand-primary font-display leading-[1.1]">NEED A <br /><span className="text-brand-accent">RAPID</span> CONVERSION?</h2>
              <p className="text-brand-text-soft font-medium leading-relaxed max-w-sm">
                Our comprehensive engine handles complex unit sets from digital storage to thermodynamics. Precision at scale.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['KM → MILES', 'CELSIUS → FAHRENHEIT', 'KG → POUNDS'].map(tag => (
                <span key={tag} className="bg-brand-card/60 backdrop-blur-md border border-brand-border px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-widest text-brand-text-soft shadow-sm hover:border-brand-accent hover:text-brand-accent transition-all cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass bg-brand-card/60 p-10 rounded-[40px] shadow-2xl border-brand-accent/20 flex flex-col items-center text-center relative"
          >
            <div className="w-20 h-20 bg-brand-accent rounded-[24px] flex items-center justify-center text-white mb-8 shadow-xl shadow-brand-accent/30 rotate-3">
              <span className="text-3xl font-black font-display tracking-tighter">CM</span>
            </div>
            <h3 className="text-2xl font-black mb-2 text-brand-primary font-display">INSTANT RELATIVITY</h3>
            <p className="text-brand-text-soft text-sm font-medium mb-8">Enter value to synchronize units instantly</p>
            <div className="w-full space-y-6">
              <input 
                type="number" 
                placeholder="Value in CM"
                className="w-full px-6 py-4 bg-brand-bg/50 border border-brand-border text-brand-primary rounded-2xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all outline-none font-bold text-lg"
              />
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-5 bg-brand-accent text-white rounded-2xl font-black tracking-widest text-sm shadow-xl shadow-brand-accent/20"
              >
                0 INCHES
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
