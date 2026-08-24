'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, User } from 'lucide-react';

export default function Topbar() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard';
    return pathname.substring(1).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <header className="h-14 glass-panel border-x-0 border-t-0 rounded-none rounded-b-2xl sticky top-0 z-40 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-text-primary">
          {getPageTitle()}
        </h1>
      </div>
      
      <div className="flex-1 max-w-md mx-6">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3 text-text-secondary" />
          <input
            type="text"
            placeholder="Search layers, properties, zones..."
            className="w-full bg-bg-surface/50 border border-border text-sm rounded-full py-1.5 pl-9 pr-4 text-text-primary focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/50 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent-red rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-bg-surface">
            5
          </span>
        </button>
        
        <div className="flex items-center gap-2 pl-2 border-l border-border cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center border border-accent-purple/50">
            <User size={16} className="text-accent-purple" />
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-text-primary leading-none">UDA Planner</p>
            <p className="text-xs text-text-secondary mt-1">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
