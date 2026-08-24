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
  ComposedChart,
} from 'recharts';
import { useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';

export default function PropertyValueChart({ data = [], targetYear = 2030 }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map((item) => {
      if (item.isHistorical) {
        return {
          ...item,
          historical: item.totalValue,
          predictedValue: item.year === 2026 ? item.totalValue : null,
        };
      } else {
        return {
          ...item,
          historical: null,
          predictedValue: item.totalValue,
        };
      }
    });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorHistoricalVal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
          </linearGradient>
          <linearGradient id="colorPredictedVal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="year"
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={{ stroke: '#334155' }}
          tickLine={{ stroke: '#334155' }}
        />
        <YAxis
          stroke="#94a3b8"
          tickFormatter={(val) => formatCurrency(val)}
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={{ stroke: '#334155' }}
          tickLine={{ stroke: '#334155' }}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <Tooltip
          formatter={(val) => [formatCurrency(val), 'Market Value']}
          labelFormatter={(label) => `Year: ${label}`}
          contentStyle={{
            backgroundColor: '#0f172a',
            borderColor: '#334155',
            color: '#fff',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
            fontSize: '13px',
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
        <ReferenceLine
          x={2026}
          stroke="#38bdf8"
          strokeDasharray="3 3"
          label={{ position: 'top', value: 'Current (2026)', fill: '#38bdf8', fontSize: 11 }}
        />
        {targetYear && targetYear > 2026 && (
          <ReferenceLine
            x={targetYear}
            stroke="#a855f7"
            strokeDasharray="3 3"
            label={{ position: 'top', value: `Target (${targetYear})`, fill: '#c084fc', fontSize: 11 }}
          />
        )}

        <Area
          type="monotone"
          dataKey="historical"
          stroke="none"
          fillOpacity={1}
          fill="url(#colorHistoricalVal)"
          connectNulls
        />
        <Area
          type="monotone"
          dataKey="predictedValue"
          stroke="none"
          fillOpacity={1}
          fill="url(#colorPredictedVal)"
          connectNulls
        />

        <Line
          type="monotone"
          name="Historical Value"
          dataKey="historical"
          stroke="#06b6d4"
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#0a0e27', stroke: '#06b6d4', strokeWidth: 2 }}
          activeDot={{ r: 5 }}
          connectNulls
        />
        <Line
          type="monotone"
          name="Predicted Value"
          dataKey="predictedValue"
          stroke="#a855f7"
          strokeWidth={2.5}
          strokeDasharray="4 4"
          dot={{ r: 3, fill: '#0a0e27', stroke: '#a855f7', strokeWidth: 2 }}
          activeDot={{ r: 5 }}
          connectNulls
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
