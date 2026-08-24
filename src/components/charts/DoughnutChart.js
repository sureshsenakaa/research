'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function DoughnutChart({ data, showCustomLegend = true }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={68}
              paddingAngle={2.5}
              stroke="#0a0e27"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f1430', 
                borderColor: 'rgba(255,255,255,0.15)', 
                color: '#fff',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
              formatter={(value, name) => [`${value}%`, name]}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {showCustomLegend && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1 w-full text-[11px]">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-300 truncate">{item.name}</span>
              </div>
              <span className="font-semibold text-white ml-1.5">{item.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
