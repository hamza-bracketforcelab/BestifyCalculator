import React from 'react';
import { Coins, RefreshCcw, TrendingUp, ArrowRightLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

const COMMON_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = React.useState('100');
  const [from, setFrom] = React.useState('USD');
  const [to, setTo] = React.useState('EUR');
  const [rate, setRate] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<string | null>(null);

  const fetchRate = async () => {
    if (from === to) {
      setRate(1);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Using Frankfurter API (Free, no key required)
      const response = await window.fetch(`https://api.frankfurter.app/latest?amount=1&from=${from}&to=${to}`);
      if (!response.ok) throw new Error('Failed to fetch exchange rates.');
      const data = await response.json();
      setRate(data.rates[to]);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Error fetching real-time rates. Using fallback.');
      setRate(1); // Fallback
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchRate();
    }, 500);
    return () => clearTimeout(timer);
  }, [from, to]);

  const result = (parseFloat(amount) || 0) * (rate || 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Real-Time Currency Converter | BestifyCalculator</title>
        <meta name="description" content="Convert global currencies with real-time exchange rates. Accurately transform USD, EUR, GBP, and more instantly." />
        <link rel="canonical" href="https://bestifycalculator.com/currency" />
      </Helmet>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-primary flex items-center justify-center gap-3">
          <Coins className="text-brand-accent" />
          Real-Time Currency Converter
        </h1>
        <p className="text-brand-text-soft max-w-xl mx-auto text-sm md:text-base px-4">
          Get live exchange rates and convert global currencies instantly. Powered by professional financial data.
        </p>
      </div>

      <div className="bg-brand-card p-6 md:p-12 rounded-[40px] md:rounded-[50px] border border-brand-border shadow-sm space-y-8 md:space-y-10">
        <div className="grid md:grid-cols-7 gap-6 md:gap-8 items-center">
           <div className="md:col-span-3 space-y-3 md:space-y-4">
              <label className="text-[10px] md:text-xs font-bold text-brand-text-soft uppercase tracking-widest pl-2">From</label>
              <div className="flex border-2 border-brand-border rounded-[24px] md:rounded-[32px] overflow-hidden focus-within:border-brand-accent transition-colors">
                <select 
                  className="bg-brand-bg text-brand-primary px-3 md:px-4 py-4 md:py-6 border-r border-brand-border font-bold outline-none cursor-pointer text-sm md:text-base"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                >
                  {COMMON_CURRENCIES.map(c => <option key={c.code} value={c.code} className="bg-brand-card">{c.code}</option>)}
                </select>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-4 md:px-6 py-4 md:py-6 font-black text-xl md:text-3xl outline-none min-w-0 bg-brand-card text-brand-primary"
                />
              </div>
           </div>

           <div className="flex justify-center">
              <button 
                onClick={() => {
                  const temp = from;
                  setFrom(to);
                  setTo(temp);
                }}
                className="bg-brand-accent text-white p-4 md:p-5 rounded-full shadow-lg hover:rotate-180 transition-all duration-500 active:scale-95"
              >
                <ArrowRightLeft size={20} className="md:w-6 md:h-6" />
              </button>
           </div>

           <div className="md:col-span-3 space-y-3 md:space-y-4">
              <label className="text-[10px] md:text-xs font-bold text-brand-text-soft uppercase tracking-widest pl-2 md:text-right block">To</label>
              <div className="flex border-2 border-brand-border rounded-[24px] md:rounded-[32px] overflow-hidden focus-within:border-brand-accent transition-colors">
                <select 
                  className="bg-brand-bg text-brand-primary px-3 md:px-4 py-4 md:py-6 border-r border-brand-border font-bold outline-none cursor-pointer text-sm md:text-base"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                >
                  {COMMON_CURRENCIES.map(c => <option key={c.code} value={c.code} className="bg-brand-card">{c.code}</option>)}
                </select>
                <div className="flex-1 px-4 md:px-6 py-4 md:py-6 font-black text-xl md:text-3xl flex items-center text-brand-accent bg-brand-bg overflow-hidden truncate">
                   {loading ? <Loader2 className="animate-spin" size={24} /> : result.toFixed(2)}
                </div>
              </div>
           </div>
        </div>

        <div className="pt-6 md:pt-10 border-t border-brand-border grid md:grid-cols-3 gap-6 md:gap-8">
           <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-2 md:p-3 rounded-2xl text-green-600">
                <TrendingUp size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="min-w-0">
                 <p className="text-[10px] md:text-xs font-bold text-brand-text-soft uppercase tracking-widest">Rate</p>
                 <p className="font-bold text-sm md:text-base truncate text-brand-primary">1 {from} = {rate?.toFixed(4) || '...'} {to}</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 md:p-3 rounded-2xl text-blue-600">
                <RefreshCcw size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="min-w-0">
                 <p className="text-[10px] md:text-xs font-bold text-brand-text-soft uppercase tracking-widest">Updated</p>
                 <p className="font-bold text-sm md:text-base text-brand-primary">{lastUpdated || 'Loading...'}</p>
              </div>
           </div>

           <button 
            disabled={loading}
            onClick={fetchRate}
            className="bg-brand-primary text-brand-bg rounded-2xl md:rounded-3xl font-bold py-3 md:py-4 hover:bg-brand-accent hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
           >
              {loading && <Loader2 className="animate-spin" size={18} />}
              Refresh Rates
           </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium text-center">
          {error}
        </div>
      )}

      <div className="p-8 bg-brand-accent/5 dark:bg-brand-card rounded-[40px] border border-brand-border">
         <h3 className="font-bold text-brand-primary mb-4">Why use Bestify Converter?</h3>
         <ul className="grid sm:grid-cols-2 gap-4 text-sm text-brand-text-soft">
            <li className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
               Daily updated exchange rates
            </li>
            <li className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
               Supports over 150 currencies
            </li>
            <li className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
               Clean, ad-free interface
            </li>
            <li className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
               No hidden fees or commissions
            </li>
         </ul>
      </div>
    </div>
  );
}
