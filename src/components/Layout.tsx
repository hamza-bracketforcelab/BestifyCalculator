import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calculator, LayoutGrid, Search, Menu, X, ChevronDown, Moon, Sun, Languages } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { CALCULATORS } from '@/src/constants/calculators';
import QuickSwitcher from '@/src/components/QuickSwitcher';
import { useTranslation } from 'react-i18next';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const currentCalc = CALCULATORS.find(c => c.path === location.pathname);
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary flex flex-col transition-colors duration-200 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-accent/20 blur-[120px] dark:bg-brand-accent/10" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[100px] dark:bg-indigo-500/10" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -100, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[110px] dark:bg-blue-600/10" 
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-card/70 backdrop-blur-xl border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="bg-brand-accent p-2 rounded-xl text-white shadow-lg shadow-brand-accent/20"
              >
                <Calculator size={24} />
              </motion.div>
              <span className="text-xl font-bold font-display tracking-tight hidden sm:inline-block">
                Bestify<span className="text-brand-accent">Calculator</span>
              </span>
            </Link>

            {/* Unified Calculator Switcher */}
            <div className="relative hidden lg:block">
              <button 
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-bg/50 backdrop-blur-sm border border-brand-border rounded-2xl text-sm font-bold hover:border-brand-accent transition-all text-brand-primary"
              >
                {currentCalc ? currentCalc.name : t('Select Calculator')}
                <ChevronDown size={14} className={cn("transition-transform duration-200", isSwitcherOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isSwitcherOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSwitcherOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 mt-3 w-80 bg-brand-card/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-brand-border overflow-hidden z-20 overflow-y-auto max-h-[70vh] scrollbar-hide"
                    >
                      <div className="p-3 grid gap-2">
                        {CALCULATORS.map((calc, idx) => (
                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            key={calc.id}
                            onClick={() => {
                              navigate(calc.path);
                              setIsSwitcherOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-4 p-3.5 rounded-2xl text-left hover:bg-brand-accent/10 transition-all group",
                              location.pathname === calc.path && "bg-brand-accent/5 ring-1 ring-brand-accent/20"
                            )}
                          >
                            <div className={cn(
                              "p-2.5 rounded-xl bg-brand-bg transition-all text-brand-primary group-hover:scale-110",
                              location.pathname === calc.path && "bg-brand-accent text-white shadow-md shadow-brand-accent/30"
                            )}>
                              <calc.icon size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-brand-primary">{calc.name}</p>
                              <p className="text-[10px] text-brand-text-soft uppercase font-bold tracking-widest">{calc.category}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { label: t('All Tools'), path: '/' },
              { label: t('Units'), path: '/unit-converter-calculator' },
              { label: t('Currency'), path: '/currency-converter-calculator' }
            ].map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={cn(
                  "text-sm font-bold transition-all relative py-1 px-2 hover:text-brand-accent",
                  location.pathname === link.path ? "text-brand-accent" : "text-brand-text-soft"
                )}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="headerNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-accent rounded-full" 
                  />
                )}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2.5 rounded-2xl bg-brand-bg/50 backdrop-blur-sm border border-brand-border text-brand-text-soft hover:text-brand-accent hover:border-brand-accent transition-all flex items-center gap-1"
              >
                <Languages size={20} />
                <span className="text-[10px] font-black uppercase tracking-tighter">{i18n.language}</span>
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-3 w-40 bg-brand-card/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-brand-border overflow-hidden z-20"
                    >
                      <div className="p-2 grid gap-1">
                        {[
                          { code: 'en', name: 'English' },
                          { code: 'es', name: 'Español' },
                          { code: 'hi', name: 'हिंदी' },
                          { code: 'ur', name: 'اردو' },
                          { code: 'ar', name: 'العربية' },
                          { code: 'fr', name: 'Français' },
                          { code: 'zh', name: '中文' }
                        ].map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              i18n.changeLanguage(lang.code);
                              setIsLangOpen(false);
                            }}
                            className={cn(
                              "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all",
                              i18n.language === lang.code ? "bg-brand-accent text-white" : "text-brand-primary hover:bg-brand-accent/10"
                            )}
                          >
                            {lang.name}
                            {i18n.language === lang.code && <div className="w-1 h-1 rounded-full bg-white animate-pulse" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2.5 rounded-2xl bg-brand-bg/50 backdrop-blur-sm border border-brand-border text-brand-text-soft hover:text-brand-accent hover:border-brand-accent transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-brand-text-soft hover:text-brand-accent md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-card border-b border-brand-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="block text-lg font-medium text-brand-primary" 
                onClick={() => setIsMenuOpen(false)}
              >
                {t('All Tools')}
              </Link>
              <Link 
                to="/unit-converter-calculator" 
                className="block text-lg font-medium text-brand-primary" 
                onClick={() => setIsMenuOpen(false)}
              >
                {t('Units')}
              </Link>
              <Link 
                to="/currency-converter-calculator" 
                className="block text-lg font-medium text-brand-primary" 
                onClick={() => setIsMenuOpen(false)}
              >
                {t('Currency')}
              </Link>
              <div className="border-t border-brand-border pt-4 space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-text-soft uppercase tracking-widest">Language</span>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    {[
                      { code: 'en', name: 'English' },
                      { code: 'es', name: 'Español' },
                      { code: 'hi', name: 'हिंदी' },
                      { code: 'ur', name: 'اردو' }
                    ].map(lang => (
                      <button 
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsMenuOpen(false);
                        }}
                        className={cn("px-3 py-2 rounded-lg text-xs font-bold border", i18n.language === lang.code ? "bg-brand-accent text-white border-brand-accent" : "bg-brand-bg text-brand-primary border-brand-border")}
                      >
                        {lang.name}
                      </button>
                    ))}
                 </div>
              </div>
              <button 
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-between text-lg font-medium text-brand-primary border-t border-brand-border pt-4"
              >
                <span>{t('Theme')}</span>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
        {!isHome && <QuickSwitcher />}
      </main>

      {/* Footer */}
      <footer className="bg-brand-card border-t border-brand-border py-12 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 inline-block">
                <div className="bg-brand-accent p-1.5 rounded-lg text-white">
                  <Calculator size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight text-brand-primary">BestifyCalculator</span>
              </Link>
              <p className="mt-4 text-brand-text-soft text-sm max-w-md leading-relaxed">
                Empowering decisions through precision. Your go-to source for health, finance, and utility calculations. 
                Fast, accurate, and accessible everywhere.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider">Top Instruments</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/bmi-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">BMI Calculator</Link></li>
                <li><Link to="/loan-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Loan Calculator</Link></li>
                <li><Link to="/currency-converter-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Currency Converter</Link></li>
                <li><Link to="/salary-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Salary Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider">Engineering Tools</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/watts-to-volts-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Watts to Volts</Link></li>
                <li><Link to="/volts-to-watts-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Volts to Watts</Link></li>
                <li><Link to="/unit-converter-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Unit Converter</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider">Health Indices</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/age-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Age Calculator Tool</Link></li>
                <li><Link to="/calories-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Calories Estimator</Link></li>
                <li><Link to="/body-fat-calculator" className="text-sm text-brand-text-soft hover:text-brand-accent transition-colors">Body Fat Index</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center text-sm text-brand-text-soft">
            <p>© 2026 BestifyCalculator. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Built with precision and care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
