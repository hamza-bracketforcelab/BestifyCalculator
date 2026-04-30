import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CALCULATORS } from '@/src/constants/calculators';
import CalculatorCard from '@/src/components/CalculatorCard';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [inputValue, setInputValue] = React.useState('0');
  const [convType, setConvType] = React.useState<'CM' | 'KM' | 'C' | 'KG'>('CM');
  const { t } = useTranslation();

  const getResult = () => {
    const val = parseFloat(inputValue) || 0;
    switch(convType) {
      case 'CM': return { label: 'INCHES', value: val * 0.393701 };
      case 'KM': return { label: 'MILES', value: val * 0.621371 };
      case 'C': return { label: 'FAHRENHEIT', value: (val * 9/5) + 32 };
      case 'KG': return { label: 'POUNDS', value: val * 2.20462 };
      default: return { label: 'RESULT', value: 0 };
    }
  };

  const result = getResult();

  const filteredCalculators = CALCULATORS.filter(calc => 
    calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <Helmet>
        <title>Bestify Calculator | BMI, Loan, Currency & Health Tools (AD-FREE)</title>
        <meta name="description" content="Bestify Calculator offers 15+ free, professional tools: BMI Calculator, Loan Calculator, Volts to Watts, Watts to Volts, Real-time Currency Converter, and more. Precise results, mobile-friendly design, and full SEO ranking." />
        <meta name="keywords" content="BMI calculator, loan calculator, currency converter, volts to watts, watts to volts, body fat calculator, calories calculator, age calculator, salary calculator, date calculator, mortgage calculator, unit converter, bestify calculator, tip calculator" />
        <link rel="canonical" href="https://bestifycalculator.com/" />
        
        {/* JSON-LD Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Bestify Calculator Professional Tools",
            "description": "Comprehensive suite of health, finance, and utility calculators.",
            "itemListElement": CALCULATORS.map((calc, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": calc.name,
              "url": `https://bestifycalculator.com${calc.path}`
            }))
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center px-4 pb-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-5"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-brand-primary leading-[0.9] font-display mb-8"
          >
            {t('CALCULATE')} <br />
            <span className="text-brand-accent bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-indigo-500">{t('PRECISION.')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-lg md:text-xl text-brand-text-soft max-w-2xl mx-auto leading-relaxed font-medium mb-12"
          >
            {t('hero_description')}
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="max-w-2xl w-full mx-auto relative group mb-12"
        >
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-brand-text-soft group-focus-within:text-brand-accent transition-colors z-20">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder={t('Search 15+ professional tools...')}
            className="block w-full pl-16 pr-6 py-6 glass bg-brand-card/40 rounded-[32px] focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all duration-500 outline-none text-brand-primary text-xl font-bold placeholder:text-brand-text-soft/50 shadow-brand-accent/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Scroll Down Indicator - Positioned Bottom Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-end gap-2"
        >
          <button
            onClick={() => document.getElementById('instruments-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-end gap-2 group cursor-pointer outline-none"
            aria-label="Scroll to Instruments"
          >
            <span className="text-[10px] font-black text-brand-text-soft uppercase tracking-[0.25em] group-hover:text-brand-accent transition-colors">
              {t('Explore Tools')}
            </span>
            <motion.div
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="bg-brand-card/50 backdrop-blur-md p-4 rounded-full border border-brand-border group-hover:border-brand-accent group-hover:text-brand-accent transition-all shadow-xl"
            >
              <ChevronDown size={24} />
            </motion.div>
          </button>
        </motion.div>

        {/* Mobile Centered Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex md:hidden flex-col items-center gap-2"
        >
          <button
            onClick={() => document.getElementById('instruments-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 group cursor-pointer outline-none"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-brand-accent text-white p-3 rounded-full shadow-lg"
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section id="instruments-section" className="relative z-10 pt-12">
        <div className="flex items-end justify-between mb-12 px-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-brand-primary font-display uppercase tracking-tight">{t('The Instruments')}</h2>
            <div className="w-12 h-1.5 bg-brand-accent rounded-full" />
          </div>
          <div className="text-[10px] font-black text-brand-text-soft uppercase tracking-[0.25em] bg-brand-card/50 backdrop-blur-md px-4 py-2 rounded-full border border-brand-border">
            {filteredCalculators.length} {t('ACTIVE TOOLS')}
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
              <h2 className="text-4xl font-black text-brand-primary font-display leading-[1.1]">{t('Unit Converter').toUpperCase()} & <br /><span className="text-brand-accent">{t('RAPID')}</span> CONVERSION</h2>
              <p className="text-brand-text-soft font-medium leading-relaxed max-w-sm">
                Our unit conversion engine handles complex datasets including KM, KG, Celsius, and more. High precision ranking tools for daily tasks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'KM → MILES', type: 'KM' },
                { label: 'CELSIUS → FAHRENHEIT', type: 'C' },
                { label: 'KG → POUNDS', type: 'KG' },
                { label: 'CM → INCHES', type: 'CM' }
              ].map(tag => (
                <button
                  key={tag.type}
                  onClick={() => setConvType(tag.type as any)}
                  className={`backdrop-blur-md border px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-sm ${
                    convType === tag.type 
                      ? 'bg-brand-accent text-white border-brand-accent shadow-brand-accent/20' 
                      : 'bg-brand-card/60 border-brand-border text-brand-text-soft hover:border-brand-accent hover:text-brand-accent'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass bg-brand-card/60 p-10 rounded-[40px] shadow-2xl border-brand-accent/20 flex flex-col items-center text-center relative"
          >
            <div className="w-20 h-20 bg-brand-accent rounded-[24px] flex items-center justify-center text-white mb-8 shadow-xl shadow-brand-accent/30 rotate-3 transition-transform duration-300">
              <span className="text-3xl font-black font-display tracking-tighter">
                {convType === 'CM' ? 'CM' : convType === 'KM' ? 'KM' : convType === 'C' ? '°C' : 'KG'}
              </span>
            </div>
            <h3 className="text-2xl font-black mb-2 text-brand-primary font-display uppercase">
              {convType === 'C' ? t('THERMAL') : convType === 'KM' ? t('DISTANCE') : convType === 'KG' ? t('MASS') : t('LENGTH')} RELATIVITY
            </h3>
            <p className="text-brand-text-soft text-sm font-medium mb-8">Enter value to synchronize units instantly</p>
            <div className="w-full space-y-6">
              <input 
                type="number" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Value in ${convType}...`}
                className="w-full px-6 py-4 bg-brand-bg/50 border border-brand-border text-brand-primary rounded-2xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all outline-none font-bold text-lg"
              />
              <motion.div 
                key={result.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-brand-accent text-white rounded-2xl font-black tracking-widest text-sm shadow-xl shadow-brand-accent/20"
              >
                {result.value.toFixed(2)} {result.label}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Content Section - Dedicated to AdSense Approval & Ranking */}
      <section className="pt-20 pb-10 px-4 border-t border-brand-border/40">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black font-display text-brand-primary tracking-tight">PROFESSIONAL CALCULATOR REPOSITORY</h2>
            <p className="text-brand-text-soft font-medium max-w-2xl mx-auto">
              Our platform is engineered for speed and accuracy. Explore our comprehensive indices for health, finance, and general utilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {CALCULATORS.map(calc => (
              <div key={`seo-${calc.id}`} className="space-y-3 group">
                <h3 className="text-xl font-black font-display text-brand-primary group-hover:text-brand-accent transition-colors">
                  {t(calc.name).toUpperCase()} TOOL
                </h3>
                <p className="text-sm text-brand-text-soft leading-relaxed">
                  <span className="font-bold text-brand-primary uppercase">{t(calc.name)}</span>: {t(`${calc.name}_desc`)} 
                  Bestify provides the most accurate {t(calc.name).toLowerCase()} available online. Whether you are analyzing {t(calc.category).toLowerCase()} data 
                  or seeking instant results, our {t(calc.name).toLowerCase()} is optimized for precision and mobile responsiveness. 
                  Ranked highly for efficiency, this tool is part of our professional-grade suite.
                </p>
                <div className="w-8 h-1 bg-brand-accent/30 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>

          <div className="bg-brand-card p-10 rounded-[40px] border border-brand-border text-center space-y-6">
            <h4 className="text-2xl font-black font-display text-brand-accent">WHY BESTIFY CALCULATOR?</h4>
            <p className="text-brand-text-soft max-w-3xl mx-auto leading-relaxed italic">
              "In a digital world full of ads, Bestify stands out with a clean, SEO-friendly, and high-performance environment. 
              Our BMI Calculator, Loan Calculator, and Currency Converter are built using the latest algorithms to ensure your 
              financial and health planning stays 100% accurate."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
