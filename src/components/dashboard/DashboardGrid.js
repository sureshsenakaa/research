'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DASHBOARD_KPIS } from '@/data/mockData';
import KpiCard from '@/components/ui/KpiCard';
import { TrendingUp, AlertTriangle, Landmark, Target, Building, Map, Activity, FileText, Shield } from 'lucide-react';

const iconMap = {
  TrendingUp,
  AlertTriangle,
  Landmark,
  Target
};

const colors = ['#00d4ff', '#ef4444', '#22c55e', '#7c3aed'];

export default function DashboardGrid() {
  const quickActions = [
    {
      title: 'Urban Sprawl',
      desc: 'LULC growth analysis',
      href: '/urban-sprawl',
      icon: Activity,
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10'
    },
    {
      title: 'Zoning Analysis',
      desc: 'AI compliance checks',
      href: '/zoning-compliance',
      icon: Building,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    {
      title: 'Property Valuation',
      desc: 'AI-driven market rates',
      href: '/property-valuation',
      icon: Landmark,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      title: 'Infrastructure',
      desc: 'Site optimization',
      href: '/infrastructure',
      icon: Map,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10'
    },
    {
      title: 'Building Authority',
      desc: 'Unauthorized building detection',
      href: '/building-authority',
      icon: Shield,
      color: 'text-red-400',
      bg: 'bg-red-400/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.values(DASHBOARD_KPIS).map((kpi, idx) => {
          const Icon = iconMap[kpi.icon] || TrendingUp;
          return (
            <KpiCard
              key={kpi.label}
              icon={Icon}
              label={kpi.label}
              value={kpi.value}
              unit={kpi.unit}
              trend={kpi.trend}
              accentColor={colors[idx % colors.length]}
              delay={idx * 0.1}
            />
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
            >
              <Link href={action.href} className="block group h-full">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5 h-full hover:bg-white/10 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${action.bg}`}>
                    <action.icon className={action.color} size={20} />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 mb-4">
                    {action.desc}
                  </p>
                  <div className="text-sm font-medium text-cyan-400 flex items-center opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    Explore <span className="ml-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
