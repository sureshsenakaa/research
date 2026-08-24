'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts';
import { useMemo } from 'react';

export default function GrowthLineChart({ data }) {
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map(item => {
      // Split the data into two series for styling
      if (item.predicted) {
        return {
          ...item,
          historical: null,
          predictedValue: item.urbanArea
        };
      } else {
        return {
          ...item,
          historical: item.urbanArea,
          predictedValue: null
        };
      }
    });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="year" 
          stroke="#94a3b8" 
          tick={{ fill: '#94a3b8' }}
          axisLine={{ stroke: '#1e293b' }}
          tickLine={{ stroke: '#1e293b' }}
        />
        <YAxis 
          stroke="#94a3b8" 
          tick={{ fill: '#94a3b8' }}
          axisLine={{ stroke: '#1e293b' }}
          tickLine={{ stroke: '#1e293b' }}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#141937', 
            borderColor: '#1e293b', 
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
          itemStyle={{ color: '#fff' }}
          labelStyle={{ color: '#94a3b8' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <ReferenceLine x="2026" stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'top', value: 'Current', fill: '#94a3b8', fontSize: 12 }} />
        
        <Area type="monotone" dataKey="historical" stroke="none" fillOpacity={1} fill="url(#colorHistorical)" connectNulls />
        <Area type="monotone" dataKey="predictedValue" stroke="none" fillOpacity={1} fill="url(#colorPredicted)" connectNulls />
        
        <Line 
          type="monotone" 
          name="Historical"
          dataKey="historical" 
          stroke="#00d4ff" 
          strokeWidth={2} 
          dot={{ r: 4, fill: '#141937', stroke: '#00d4ff', strokeWidth: 2 }}
          activeDot={{ r: 6 }}
          connectNulls
        />
        <Line 
          type="monotone" 
          name="Predicted"
          dataKey="predictedValue" 
          stroke="#7c3aed" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4, fill: '#141937', stroke: '#7c3aed', strokeWidth: 2 }}
          activeDot={{ r: 6 }}
          connectNulls
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
