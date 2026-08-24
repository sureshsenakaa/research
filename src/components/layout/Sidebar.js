'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, TrendingUp, ShieldAlert, Landmark, Construction, ChevronRight, ChevronLeft, Shield } from 'lucide-react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Urban Sprawl', icon: TrendingUp, href: '/urban-sprawl' },
    { name: 'Zoning Compliance', icon: ShieldAlert, href: '/zoning-compliance' },
    { name: 'Property Valuation', icon: Landmark, href: '/property-valuation' },
    { name: 'Infrastructure', icon: Construction, href: '/infrastructure' },
    { name: 'Building Authority', icon: Shield, href: '/building-authority' },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{ width: isExpanded ? 240 : 64 }}
      className="h-full glass-panel border-y-0 border-l-0 rounded-none rounded-r-2xl flex flex-col z-50 transition-all"
    >
      <div className="flex items-center justify-end p-2 border-b border-border h-14 shrink-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <div className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto overflow-x-hidden px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors min-w-max
                ${isActive 
                  ? 'bg-accent-cyan/10 text-accent-cyan border-l-2 border-accent-cyan' 
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary border-l-2 border-transparent'
                }`}
              title={!isExpanded ? item.name : undefined}
            >
              <item.icon size={20} className={isActive ? 'text-accent-cyan' : ''} />
              <motion.span
                animate={{ opacity: isExpanded ? 1 : 0, display: isExpanded ? 'block' : 'none' }}
                className="font-medium whitespace-nowrap"
              >
                {item.name}
              </motion.span>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-border flex items-center gap-2 overflow-hidden shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center font-bold text-white shrink-0">
          U
        </div>
        <motion.div
          animate={{ opacity: isExpanded ? 1 : 0, display: isExpanded ? 'block' : 'none' }}
          className="font-bold tracking-wider text-sm whitespace-nowrap"
        >
          <span className="text-accent-cyan">Urban</span>scapes<span className="text-accent-purple">-LK</span>
        </motion.div>
      </div>
    </motion.nav>
  );
}
