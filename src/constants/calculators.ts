import { 
  Calculator, 
  User, 
  Weight, 
  Banknote, 
  Ruler, 
  Flame, 
  Calendar, 
  ArrowLeftRight, 
  Coins, 
  HandCoins,
  History,
  TrendingUp,
  Zap
} from 'lucide-react';

export interface CalculatorInfo {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'Health' | 'Finance' | 'Unit' | 'General' | 'Other';
  path: string;
}

export const CALCULATORS: CalculatorInfo[] = [
  {
    id: 'chronological-age',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    icon: User,
    category: 'Health',
    path: '/age-calculator'
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Check your Body Mass Index and health category.',
    icon: Weight,
    category: 'Health',
    path: '/bmi-calculator'
  },
  {
    id: 'salary',
    name: 'Salary Calculator',
    description: 'Convert hourly wage to annual salary and vice-versa.',
    icon: Banknote,
    category: 'Finance',
    path: '/salary-calculator'
  },
  {
    id: 'calories',
    name: 'Calories Calculator',
    description: 'Estimate daily calorie needs based on activity.',
    icon: Flame,
    category: 'Health',
    path: '/calories-calculator'
  },
  {
    id: 'fat',
    name: 'Body Fat Calculator',
    description: 'Estimate body fat percentage using measurements.',
    icon: TrendingUp,
    category: 'Health',
    path: '/body-fat-calculator'
  },
  {
    id: 'date-calc',
    name: 'Date Calculator',
    description: 'Count days between dates or add/subtract time.',
    icon: Calendar,
    category: 'General',
    path: '/date-calculator'
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, mass, volume, and more.',
    icon: Ruler,
    category: 'Unit',
    path: '/unit-converter-calculator'
  },
  {
    id: 'financial',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and total interest.',
    icon: HandCoins,
    category: 'Finance',
    path: '/loan-calculator'
  },
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    description: 'Plan your home purchase with detailed payments.',
    icon: Calculator,
    category: 'Finance',
    path: '/mortgage-calculator'
  },
  {
    id: 'tip',
    name: 'Tip Calculator',
    description: 'Quickly calculate tips and split bills.',
    icon: History,
    category: 'General',
    path: '/tip-calculator'
  },
  {
    id: 'currency',
    name: 'Currency Converter',
    description: 'Real-time exchange rates for global currencies.',
    icon: Coins,
    category: 'Finance',
    path: '/currency-converter-calculator'
  },
  {
    id: 'watts-to-volts',
    name: 'Watts to Volts',
    description: 'Convert Watts to Volts for DC and AC circuits.',
    icon: Zap,
    category: 'Unit',
    path: '/watts-to-volts-calculator'
  },
  {
    id: 'volts-to-watts',
    name: 'Volts to Watts',
    description: 'Convert Volts to Watts for DC and AC circuits.',
    icon: Zap,
    category: 'Unit',
    path: '/volts-to-watts-calculator'
  }
];
