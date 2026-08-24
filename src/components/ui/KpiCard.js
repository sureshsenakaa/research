'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function KpiCard({ icon: Icon, label, value, unit, trend, accentColor = '#00d4ff', delay = 0 }) {
  // Parse value to number if it's a string like "1,234"
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/,/g, '')) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-gray-400 font-medium">{label}</div>
        <div 
          className="p-2 rounded-full flex items-center justify-center" 
          style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
        >
          {Icon && <Icon size={20} />}
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold text-white">
          <AnimatedCounter end={numericValue} />
        </div>
        {unit && <div className="text-sm text-gray-400">{unit}</div>}
      </div>
      
      {trend && (
        <div className={`mt-3 text-sm font-medium flex items-center gap-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? '▲' : '▼'}
          <span>{trend === 'up' ? 'Increasing' : 'Decreasing'}</span>
        </div>
      )}
    </motion.div>
  );
}
