'use client';

import { formatRelativeTime } from '@/lib/utils';
import { MapPin } from 'lucide-react';

export default function AlertItem({ alert, onClick }) {
  const { severity, location, message, timestamp } = alert;
  
  const severityConfig = {
    critical: { bg: 'bg-red-500/20', text: 'text-red-500', dot: 'bg-red-500 animate-pulse' },
    high: { bg: 'bg-orange-500/20', text: 'text-orange-500', dot: 'bg-orange-500' },
    medium: { bg: 'bg-amber-500/20', text: 'text-amber-500', dot: 'bg-amber-500' },
    low: { bg: 'bg-cyan-500/20', text: 'text-cyan-500', dot: 'bg-cyan-500' }
  };

  const config = severityConfig[severity] || severityConfig.medium;

  return (
    <div 
      onClick={() => onClick?.(alert)}
      className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer hover:scale-[1.02] border border-transparent hover:border-white/5"
    >
      <div className={`mt-1 flex-shrink-0 px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1.5 ${config.bg} ${config.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
        {severity}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 font-semibold text-gray-200 truncate">
          <MapPin size={14} className="text-gray-400" />
          {location}
        </div>
        <div className="text-sm text-gray-400 mt-1 line-clamp-2">
          {message}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
        {formatRelativeTime ? formatRelativeTime(timestamp) : new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}
