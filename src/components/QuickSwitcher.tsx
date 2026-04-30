import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { CALCULATORS } from '@/src/constants/calculators';
import { ChevronRight, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function QuickSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const currentCalc = CALCULATORS.find(c => c.path === location.pathname);

  return (
    <div className="mt-16 pt-12 border-t border-brand-border max-w-2xl mx-auto">
      <div className="glass bg-brand-card/50 rounded-[32px] p-6 md:p-10 shadow-lg border border-brand-border flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-bold text-brand-primary">{t('Need another tool?')}</h4>
          <p className="text-sm text-brand-text-soft">{t('Switch between 10+ professional calculators instantly.')}</p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <select 
            onChange={(e) => navigate(e.target.value)}
            value={location.pathname}
            className="w-full md:w-64 appearance-none bg-brand-bg border border-brand-border text-brand-primary rounded-2xl px-6 py-4 font-bold text-sm cursor-pointer hover:bg-brand-border transition-colors outline-none focus:ring-2 focus:ring-brand-accent pr-12"
          >
            <option disabled>{t('Select a calculator...')}</option>
            {CALCULATORS.map(calc => (
              <option key={calc.id} value={calc.path} className="bg-brand-card text-brand-primary">
                {t(calc.name)}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-soft">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
