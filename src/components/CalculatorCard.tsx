import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { CalculatorInfo } from '@/src/constants/calculators';

export default function CalculatorCard({ calc, index }: { calc: CalculatorInfo; index: number; key?: string }) {
  const Icon = calc.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.15 } }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 150, damping: 20 }}
    >
      <Link
        to={calc.path}
        className="group relative glass p-8 rounded-[32px] hover:border-brand-accent/50 hover:bg-brand-card transition-all duration-300 flex flex-col h-full bg-brand-card/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-brand-bg p-4 rounded-2xl text-brand-primary group-hover:bg-brand-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-accent/30 transition-all duration-300"
            >
              <Icon size={26} />
            </motion.div>
            <span className={cn(
              "text-[9px] uppercase tracking-[0.15em] font-black px-3 py-1.5 rounded-xl backdrop-blur-md",
              calc.category === 'Health' && "bg-green-500/10 text-green-500 ring-1 ring-green-500/20",
              calc.category === 'Finance' && "bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20",
              calc.category === 'Unit' && "bg-purple-500/10 text-purple-500 ring-1 ring-purple-500/20",
              calc.category === 'General' && "bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20",
              calc.category === 'Other' && "bg-brand-bg/50 text-brand-text-soft ring-1 ring-brand-border",
            )}>
              {calc.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors font-display">
            {calc.name}
          </h3>
          <p className="mt-3 text-sm text-brand-text-soft leading-relaxed flex-grow opacity-80 group-hover:opacity-100 transition-opacity">
            {calc.description}
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-brand-accent transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
            <span>START CALCULATION</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
