import React from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '@/src/constants/calculators';
import { ArrowRight } from 'lucide-react';

interface RelatedCalculatorsProps {
  currentId: string;
}

export default function RelatedCalculators({ currentId }: RelatedCalculatorsProps) {
  const currentCalc = CALCULATORS.find(c => c.id === currentId);
  const related = CALCULATORS
    .filter(c => c.id !== currentId && c.category === currentCalc?.category)
    .slice(0, 3);

  if (related.length === 0) {
    related.push(...CALCULATORS.filter(c => c.id !== currentId).slice(0, 3));
  }

  return (
    <section className="mt-12 pt-12 border-t border-brand-border">
      <h3 className="text-xl font-bold text-brand-primary mb-6">Explore Related Tools</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map(calc => (
          <Link 
            key={calc.id} 
            to={calc.path}
            className="p-6 bg-brand-card rounded-3xl border border-brand-border hover:border-brand-accent transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <calc.icon className="text-brand-accent group-hover:scale-110 transition-transform" size={20} />
              <ArrowRight size={14} className="text-brand-text-soft opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-bold text-brand-primary text-sm">{calc.name}</p>
            <p className="text-[10px] text-brand-text-soft line-clamp-1 mt-1">{calc.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
