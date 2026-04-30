import React from 'react';
import { Zap, Info, Calculator, RefreshCcw, Settings2, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import RelatedCalculators from '@/src/components/RelatedCalculators';
import { useTranslation } from 'react-i18next';

type Mode = 'DC' | 'AC_SINGLE' | 'AC_THREE';
type InputType = 'CURRENT' | 'RESISTANCE';
type PhaseType = 'LINE_TO_LINE' | 'LINE_TO_NEUTRAL';

export default function VoltsToWatts() {
  const [mode, setMode] = React.useState<Mode>('DC');
  const [inputType, setInputType] = React.useState<InputType>('CURRENT');
  const [phaseType, setPhaseType] = React.useState<PhaseType>('LINE_TO_LINE');
  const { t } = useTranslation();
  
  const [volts, setVolts] = React.useState('230');
  const [current, setCurrent] = React.useState('10');
  const [resistance, setResistance] = React.useState('10');
  const [pf, setPf] = React.useState('1');
  const [result, setResult] = React.useState<number | null>(null);

  const calculate = () => {
    const V = parseFloat(volts);
    const I = parseFloat(current);
    const R = parseFloat(resistance);
    const PF = parseFloat(pf);

    if (isNaN(V)) return;

    let watts = 0;

    if (mode === 'DC') {
      if (inputType === 'CURRENT') {
        watts = V * I;
      } else {
        watts = (V * V) / R;
      }
    } else if (mode === 'AC_SINGLE') {
      watts = V * I * PF;
    } else if (mode === 'AC_THREE') {
      if (phaseType === 'LINE_TO_LINE') {
        watts = Math.sqrt(3) * V * I * PF;
      } else {
        watts = 3 * V * I * PF;
      }
    }

    setResult(isNaN(watts) || !isFinite(watts) ? null : watts);
  };

  const handleReset = () => {
    setVolts('');
    setCurrent('');
    setResistance('');
    setPf('1');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <Helmet>
        <title>Volts to Watts Calculator | Potential to Power Converter | Bestify</title>
        <meta name="description" content="Convert Volts to Watts easily. Supports DC, AC Single Phase, and AC Three Phase calculations. Accurate electrical power conversion tool." />
        <meta name="keywords" content="volts to watts, volts to watts calculator, electrical conversion, calculate watts, power calculator, volts to watts formula" />
        <link rel="canonical" href="https://bestifycalculator.com/volts-to-watts-calculator" />
      </Helmet>

      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-brand-primary font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
          Volts to Watts
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto text-sm md:text-base font-medium">
          Professional electrical instrument for converting potential difference (Volts) to power (Watts) across various circuit configurations.
        </p>
      </div>

      <div className="bg-brand-card p-6 md:p-12 rounded-[40px] border border-brand-border shadow-2xl relative overflow-hidden group">
        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[100px] pointer-events-none" />

        <div className="relative space-y-10">
          {/* Circuit Mode Selector */}
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-brand-bg/50 backdrop-blur-md rounded-[24px] border border-brand-border w-fit mx-auto">
            {[
              { id: 'DC' as const, label: 'DC', icon: '⎓' },
              { id: 'AC_SINGLE' as const, label: 'AC Single Phase', icon: '〜' },
              { id: 'AC_THREE' as const, label: 'AC Three Phase', icon: '≈' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-[20px] text-xs font-bold uppercase tracking-wider transition-all duration-300",
                  mode === m.id 
                    ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20" 
                    : "text-brand-text-soft hover:text-brand-primary hover:bg-brand-bg"
                )}
              >
                <span className="text-lg leading-none">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Input Side */}
            <div className="space-y-8">
              {/* Calculation Basis Option (Only for DC) */}
              <AnimatePresence mode="wait">
                {mode === 'DC' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-4 text-xs font-bold text-brand-text-soft uppercase tracking-widest"
                  >
                    <span className="whitespace-nowrap">Calculate using:</span>
                    <div className="flex bg-brand-bg/80 rounded-xl p-1 border border-brand-border">
                      <button 
                        onClick={() => setInputType('CURRENT')}
                        className={cn("px-4 py-1.5 rounded-lg transition-colors", inputType === 'CURRENT' ? "bg-brand-accent text-white" : "hover:text-brand-primary")}
                      >
                        Current (Amps)
                      </button>
                      <button 
                        onClick={() => setInputType('RESISTANCE')}
                        className={cn("px-4 py-1.5 rounded-lg transition-colors", inputType === 'RESISTANCE' ? "bg-brand-accent text-white" : "hover:text-brand-primary")}
                      >
                        Resistance (Ohms)
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Three Phase Sub-options */}
              <AnimatePresence mode="wait">
                {mode === 'AC_THREE' && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex-1 space-y-2">
                       <label className="text-[10px] font-black text-brand-text-soft uppercase tracking-widest pl-2">Voltage Type</label>
                       <select 
                         value={phaseType}
                         onChange={(e) => setPhaseType(e.target.value as PhaseType)}
                         className="w-full bg-brand-bg/50 border border-brand-border text-brand-primary px-4 py-3 rounded-2xl outline-none focus:border-brand-accent transition-colors appearance-none font-bold"
                       >
                         <option value="LINE_TO_LINE">Line to Line (RMS)</option>
                         <option value="LINE_TO_NEUTRAL">Line to Neutral (RMS)</option>
                       </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center justify-between text-[10px] font-black text-brand-text-soft uppercase tracking-widest pl-2">
                    <span>{t('Voltage')} (Volts)</span>
                    <Activity size={12} className="text-brand-accent" />
                  </label>
                  <div className="relative group">
                    <input 
                      type="number" 
                      value={volts}
                      onChange={(e) => setVolts(e.target.value)}
                      placeholder="Enter voltage..."
                      className="w-full bg-brand-bg/30 border-2 border-brand-border text-brand-primary px-6 py-4 rounded-3xl outline-none focus:border-brand-accent/50 transition-all text-xl font-bold placeholder:text-brand-text-soft/40"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-brand-text-soft/30">V</div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {inputType === 'CURRENT' ? (
                    <motion.div 
                      key="current"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <label className="text-[10px] font-black text-brand-text-soft uppercase tracking-widest pl-2">{t('Current')} (Amps)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={current}
                          onChange={(e) => setCurrent(e.target.value)}
                          placeholder="Enter current..."
                          className="w-full bg-brand-bg/30 border-2 border-brand-border text-brand-primary px-6 py-4 rounded-3xl outline-none focus:border-brand-accent/50 transition-all text-xl font-bold placeholder:text-brand-text-soft/40"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-brand-text-soft/30">A</div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="resistance"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <label className="text-[10px] font-black text-brand-text-soft uppercase tracking-widest pl-2">{t('Resistance')} (Ohms)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={resistance}
                          onChange={(e) => setResistance(e.target.value)}
                          placeholder="Enter resistance..."
                          className="w-full bg-brand-bg/30 border-2 border-brand-border text-brand-primary px-6 py-4 rounded-3xl outline-none focus:border-brand-accent/50 transition-all text-xl font-bold placeholder:text-brand-text-soft/40"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-brand-text-soft/30">Ω</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {mode !== 'DC' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-2">
                       <label className="text-[10px] font-black text-brand-text-soft uppercase tracking-widest">Power Factor</label>
                       <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">{pf} pf</span>
                    </div>
                    <input 
                       type="range" 
                       min="0.1" 
                       max="1" 
                       step="0.01"
                       value={pf}
                       onChange={(e) => setPf(e.target.value)}
                       className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={calculate}
                  className="flex-1 bg-brand-accent text-white font-black py-5 rounded-[24px] shadow-xl shadow-brand-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                >
                  <Calculator size={20} />
                  {t('Calculate')}
                </button>
                <button 
                  onClick={handleReset}
                  className="px-8 bg-brand-bg border border-brand-border text-brand-text-soft font-bold rounded-[24px] hover:text-brand-primary hover:bg-brand-card transition-all flex items-center justify-center"
                >
                  <RefreshCcw size={20} />
                </button>
              </div>
            </div>

            {/* Result Side */}
            <div className="bg-brand-bg/30 rounded-[32px] border border-brand-border p-8 flex flex-col items-center justify-center relative min-h-[300px]">
              <div className="absolute top-4 left-4 p-2 bg-brand-card/50 rounded-xl text-brand-text-soft/50 border border-brand-border">
                <Settings2 size={16} />
              </div>
              
              {result !== null ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-2"
                >
                  <p className="text-[10px] font-black text-brand-text-soft uppercase tracking-[0.3em]">Resulting Power</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-7xl md:text-8xl font-black text-brand-primary font-display tracking-tighter">
                      {result.toFixed(2)}
                    </span>
                    <span className="text-2xl font-black text-brand-accent uppercase tracking-tighter">W</span>
                  </div>
                  <div className="pt-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-xs font-bold uppercase tracking-wider">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {t('Calculated Successfully')}
                      </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center space-y-6 opacity-40">
                  <div className="w-24 h-24 bg-brand-bg rounded-full flex items-center justify-center mx-auto border-4 border-brand-border border-dashed">
                    <Activity size={40} className="text-brand-text-soft" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-text-soft">Waiting for parameters...</p>
                    <p className="text-[10px] text-brand-text-soft/60 uppercase tracking-widest mt-1">Enter values to compute watts</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Instructional Content */}
      <section className="bg-brand-card/50 backdrop-blur-sm p-8 md:p-16 rounded-[50px] border border-brand-border space-y-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="inline-block p-3 bg-brand-accent/10 rounded-2xl text-brand-accent">
               <Info size={32} />
            </div>
            <h2 className="text-4xl font-black text-brand-primary font-display leading-tight">
              UNDERSTANDING <span className="text-brand-accent">ELECTRICAL</span> POWER
            </h2>
            <p className="text-brand-text-soft leading-relaxed text-lg">
              Power, measured in Watts (W), represents the rate at which electrical energy is consumed or produced. 
              Converting <span className="font-bold text-brand-primary">Volts to Watts</span> is essential for determining device electricity consumption, 
              sizing backup systems, and verifying load requirements for electrical panels.
            </p>
            <div className="p-8 bg-brand-bg rounded-[32px] border border-brand-border italic text-brand-text-soft leading-relaxed ring-1 ring-white/5 shadow-inner">
              "Volts represent the electrical pressure, while Watts represent the actual work being done. When you multiply the pressure (Volts) by the flow (Amps), you get the power (Watts)."
            </div>
          </div>

          <div className="space-y-10">
            <h3 className="text-2xl font-black text-brand-primary font-display uppercase tracking-tight flex items-center gap-3">
              <div className="w-8 h-1 bg-brand-accent rounded-full" />
              Visual Engineering Suite
            </h3>
            
            <div className="relative p-1 md:p-8 bg-brand-bg rounded-[48px] border-2 border-brand-border overflow-hidden group shadow-inner">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 blur-3xl opacity-50" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 blur-3xl opacity-50" />
              
              <div className="relative space-y-12">
                {/* Dynamic Logic Diagram */}
                <div className="flex flex-col items-center justify-center pt-4">
                  <p className="text-[9px] font-black text-brand-text-soft uppercase tracking-[0.4em] mb-10">Circuit Logic Flow</p>
                  
                  <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                    {/* Source Node (Voltage) */}
                    <motion.div 
                      layout
                      className="relative group/node"
                    >
                      <div className="w-24 h-24 rounded-[2rem] bg-brand-card border-2 border-brand-accent/30 shadow-xl flex flex-col items-center justify-center group-hover/node:border-brand-accent transition-colors">
                        <Activity className="text-brand-accent mb-1" size={24} />
                        <span className="text-xl font-black text-brand-primary">V</span>
                        <span className="text-[8px] font-bold text-brand-text-soft uppercase">Volts</span>
                      </div>
                      <div className="absolute -inset-2 bg-brand-accent/10 blur-xl opacity-0 group-hover/node:opacity-100 transition-opacity rounded-[2.5rem]" />
                    </motion.div>

                    {/* Central Target (Power) */}
                    <div className="relative">
                      {/* Flow Lines */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:block">
                        <div className="flex justify-between w-[calc(100%+80px)] -ml-10">
                          <svg width="40" height="2" className="text-brand-border">
                            <line x1="0" y1="1" x2="40" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                            <motion.circle 
                              r="3" fill="var(--color-brand-accent)"
                              animate={{ cx: [0, 40] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                          </svg>
                          <svg width="40" height="2" className="text-brand-border rotate-180">
                            <line x1="0" y1="1" x2="40" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                            <motion.circle 
                              r="3" fill="#f97316"
                              animate={{ cx: [0, 40] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                          </svg>
                        </div>
                      </div>

                      <motion.div 
                        initial={false}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="w-36 h-36 rounded-full border-4 border-brand-accent bg-brand-card shadow-[0_0_50px_rgba(var(--color-brand-accent-rgb),0.2)] flex flex-col items-center justify-center z-10"
                      >
                        <span className="text-5xl font-black text-brand-primary font-display tracking-tighter">W</span>
                        <span className="text-[10px] font-bold text-brand-text-soft uppercase tracking-widest mt-1">WATTS</span>
                        
                        {/* Orbiting variable (Three Phase) */}
                        <AnimatePresence>
                          {mode === 'AC_THREE' && (
                            <motion.div 
                              initial={{ opacity: 0, rotate: -180 }}
                              animate={{ opacity: 1, rotate: 0 }}
                              exit={{ opacity: 0, rotate: 180 }}
                              className="absolute -top-4 -left-4 w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg"
                            >
                              <span className="text-lg font-black italic">√3</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Orbiting variable (Power Factor) */}
                        <AnimatePresence>
                          {mode !== 'DC' && (
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="absolute -bottom-2 -right-6 px-3 py-1 bg-brand-accent text-white rounded-lg text-[9px] font-black uppercase shadow-lg"
                            >
                              PF: {pf}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Parameter Node (Current/Amps) */}
                    <div className="relative group/node">
                      <div className="w-24 h-24 rounded-[2rem] bg-brand-card border-2 border-orange-500/30 shadow-xl flex flex-col items-center justify-center group-hover/node:border-orange-500 transition-colors">
                        <RefreshCcw className="text-orange-500 mb-1" size={24} />
                        <span className="text-xl font-black text-brand-primary">{inputType === 'CURRENT' ? 'I' : 'R'}</span>
                        <span className="text-[8px] font-bold text-brand-text-soft uppercase">{inputType === 'CURRENT' ? 'Amps' : 'Ohms'}</span>
                      </div>
                      <div className="absolute -inset-2 bg-orange-500/10 blur-xl opacity-0 group-hover/node:opacity-100 transition-opacity rounded-[2.5rem]" />
                    </div>
                  </div>
                </div>

                {/* Circuit Schematic Diagram */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-8 bg-brand-card/40 rounded-[32px] border border-brand-border flex flex-col items-center gap-6">
                     <p className="text-[9px] font-black text-brand-text-soft uppercase tracking-[0.4em]">Integrated Circuit Overview</p>
                     
                     <div className="w-full max-w-sm h-32 relative">
                        <svg viewBox="0 0 200 100" className="w-full h-full stroke-brand-border fill-none overflow-visible">
                          {/* Wires */}
                          <rect x="30" y="20" width="140" height="60" rx="4" strokeWidth="2" />
                          
                          {/* Source (Volts) */}
                          <circle cx="30" cy="50" r="12" className="fill-brand-bg stroke-brand-accent stroke-2" />
                          <Activity className="text-brand-accent" x="22" y="42" width="16" height="16" />
                          <text x="5" y="52" className="fill-brand-text-soft text-[8px] font-bold tracking-tighter uppercase">Source</text>
                          
                          {/* Load (Resistance) */}
                          <path d="M 170 35 L 170 42 L 164 45 L 176 48 L 164 51 L 176 54 L 164 57 L 176 60 L 170 63 L 170 65" className="stroke-orange-500 stroke-2" />
                          <text x="178" y="52" className="fill-brand-text-soft text-[8px] font-bold tracking-tighter uppercase">Load</text>
                          
                          {/* Ammeter (Flow Calculation) */}
                          <line x1="80" y1="20" x2="80" y2="10" className="stroke-brand-accent/50" />
                          <line x1="120" y1="20" x2="120" y2="10" className="stroke-brand-accent/50" />
                          <circle cx="100" cy="15" r="10" className="fill-brand-card stroke-brand-accent stroke-2" />
                          <text x="96" y="18" className="fill-brand-primary text-[10px] font-black">W</text>

                          {/* Animated Electrons */}
                          <motion.circle r="2" fill="var(--color-brand-accent)"
                            animate={{ 
                              offsetDistance: ["0%", "100%"]
                            }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            style={{ offsetPath: "path('M 30 20 L 170 20 L 170 80 L 30 80 Z')" }}
                          />
                        </svg>
                     </div>
                  </div>

                  <div className="p-8 bg-brand-card/40 rounded-[32px] border border-brand-border flex flex-col items-center gap-6 overflow-hidden">
                     <p className="text-[9px] font-black text-brand-text-soft uppercase tracking-[0.4em]">
                       {mode === 'DC' ? 'Direct Current Path' : 'AC Phasor Analysis'}
                     </p>
                     <div className="w-full max-w-[150px] aspect-square relative">
                        <AnimatePresence mode="wait">
                          {mode === 'DC' ? (
                            <motion.div 
                              key="dc-visual"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="w-full h-full flex items-center justify-center"
                            >
                               <div className="w-full h-1 bg-brand-border relative rounded-full">
                                  <motion.div 
                                    animate={{ left: ['0%', '100%'] }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(var(--color-brand-accent-rgb),0.5)]"
                                  />
                               </div>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="ac-phasor"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="w-full h-full"
                            >
                               <svg viewBox="0 0 100 100" className="w-full h-full">
                                  {/* Coordinate System */}
                                  <line x1="10" y1="50" x2="90" y2="50" className="stroke-brand-border" strokeWidth="1" />
                                  <line x1="50" y1="10" x2="50" y2="90" className="stroke-brand-border" strokeWidth="1" />
                                  
                                  {/* Voltage Phasor (Reference) */}
                                  <line x1="50" y1="50" x2="85" y2="50" className="stroke-brand-accent stroke-2" markerEnd="url(#arrowhead-v)" />
                                  <text x="88" y="55" className="fill-brand-accent text-[8px] font-black">V</text>
                                  
                                  {/* Current Phasor (Lagging based on PF) */}
                                  {(() => {
                                    const angle = Math.acos(parseFloat(pf));
                                    const x = 50 + 30 * Math.cos(angle);
                                    const y = 50 + 30 * Math.sin(angle);
                                    return (
                                      <>
                                        <line x1="50" y1="50" x2={x} y2={y} className="stroke-orange-500 stroke-2" />
                                        <text x={x+2} y={y+5} className="fill-orange-500 text-[8px] font-black">I</text>
                                        
                                        {/* Phase Angle Arc */}
                                        <path 
                                          d={`M 65 50 A 15 15 0 0 1 ${50 + 15 * Math.cos(angle)} ${50 + 15 * Math.sin(angle)}`}
                                          className="stroke-brand-text-soft/30 fill-none"
                                          strokeWidth="1"
                                        />
                                        <text x="60" y="60" className="fill-brand-text-soft/50 text-[6px] font-bold italic">φ</text>
                                      </>
                                    );
                                  })()}
                                  
                                  <defs>
                                    <marker id="arrowhead-v" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                                      <polygon points="0 0, 4 2, 0 4" className="fill-brand-accent" />
                                    </marker>
                                  </defs>
                               </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                     </div>
                     <p className="text-[10px] text-brand-text-soft text-center font-medium opacity-60 px-4">
                        {mode === 'DC' ? 'Linear potential flow through conductor' : 'Phase relationship between potential (V) and flow (I)'}
                     </p>
                  </div>
                </div>

                {/* Mathematical Synthesis */}
                <div className="bg-brand-card/80 backdrop-blur-md px-10 py-8 rounded-[38px] border border-brand-border shadow-soft w-full flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-black text-brand-text-soft uppercase tracking-[0.4em] mb-2">Synthesis Formula</p>
                    <p className="text-3xl md:text-4xl font-black text-brand-primary font-display tracking-tight">
                      P <span className="text-brand-accent">=</span> {
                        mode === 'DC' 
                          ? (inputType === 'CURRENT' ? 'V × I' : 'V² / R')
                          : mode === 'AC_SINGLE' 
                            ? 'V × I × PF'
                            : phaseType === 'LINE_TO_LINE' ? '√3 × V × I × PF' : '3 × V × I × PF'
                      }
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-5 py-2 bg-brand-bg border border-brand-border rounded-xl text-[10px] font-black text-brand-primary uppercase tracking-widest">
                       {mode.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {[
                { title: 'DC (Direct Current)', formula: 'P = V × I', desc: 'Power equals Voltage multiplied by Current.' },
                { title: 'AC Single Phase', formula: 'P = V × I × PF', desc: 'Power calculation including efficiency rating (PF).' },
                { title: 'AC 3-Phase (L-L)', formula: 'P = √3 × V × I × PF', desc: 'Total power for industrial line-to-line systems.' },
                { title: 'AC 3-Phase (L-N)', formula: 'P = 3 × V × I × PF', desc: 'Total power for balanced line-to-neutral systems.' },
              ].map((f, i) => (
                <div key={i} className="group p-6 bg-brand-bg rounded-3xl border border-brand-border hover:border-brand-accent/30 transition-all">
                  <p className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-2">{f.title}</p>
                  <code className="text-2xl font-black text-brand-primary block mb-2">{f.formula}</code>
                  <p className="text-xs text-brand-text-soft font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reference Table */}
        <div className="space-y-8 pt-10 border-t border-brand-border/50">
          <h3 className="text-2xl font-black text-brand-primary text-center">Reference Power Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-bg text-brand-primary">
                  <th className="p-4 text-left font-black uppercase text-xs tracking-widest border border-brand-border">Voltage (V)</th>
                  <th className="p-4 text-left font-black uppercase text-xs tracking-widest border border-brand-border">Amps (A)</th>
                  <th className="p-4 text-left font-black uppercase text-xs tracking-widest border border-brand-border">Watts (W) Result</th>
                  <th className="p-4 text-left font-black uppercase text-xs tracking-widest border border-brand-border">Circuit Type</th>
                </tr>
              </thead>
              <tbody className="text-sm text-brand-text-soft">
                {[
                  { v: 12, a: 5, w: 60, type: 'DC (Automotive)' },
                  { v: 110, a: 10, w: 1100, type: 'AC Single (U.S.)' },
                  { v: 230, a: 16, w: 3680, type: 'AC Single (EU/UK)' },
                  { v: 480, a: 20, w: 16627, type: 'AC 3-Phase (Ind.)' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-brand-card/50 transition-colors">
                    <td className="p-4 border border-brand-border font-bold">{row.v}V</td>
                    <td className="p-4 border border-brand-border font-bold">{row.a}A</td>
                    <td className="p-4 border border-brand-border font-black text-brand-primary">{row.w}W</td>
                    <td className="p-4 border border-brand-border font-medium text-xs uppercase tracking-tight">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <RelatedCalculators currentId="volts-to-watts" />
    </div>
  );
}
