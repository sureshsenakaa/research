'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

export default function ShapWaterfall({ features }) {
  if (!features || features.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        layout="vertical"
        data={features}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
        <XAxis 
          type="number" 
          tickFormatter={(value) => formatCurrency(value)}
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
          axisLine={{ stroke: '#1e293b' }}
          tickLine={{ stroke: '#1e293b' }}
        />
        <YAxis 
          type="category" 
          dataKey="feature" 
          width={140}
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={{ stroke: '#1e293b' }}
          tickLine={{ stroke: '#1e293b' }}
        />
        <Tooltip
          formatter={(value) => [formatCurrency(value), 'Impact']}
          contentStyle={{ 
            backgroundColor: '#141937', 
            borderColor: '#1e293b', 
            color: '#fff',
            borderRadius: '8px'
          }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
        />
        <Bar dataKey="value" maxBarSize={30}>
          {features.map((entry, index) => {
            const isPositive = entry.direction === 'positive';
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={isPositive ? '#22c55e' : '#ef4444'} 
                radius={isPositive ? [0, 4, 4, 0] : [4, 0, 0, 4]}
              />
            );
          })}
          <LabelList 
            dataKey="value" 
            position="right" 
            formatter={(val) => formatCurrency(val)} 
            fill="#fff"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
