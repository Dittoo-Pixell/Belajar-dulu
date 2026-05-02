// src/pages/Dashboard/User-dashboard/components/IncomeVsExpenseChart.tsx

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartData } from '../../../../types';

interface IncomeVsExpenseChartProps {
  data: ChartData[];
}

export default function IncomeVsExpenseChart({ data }: IncomeVsExpenseChartProps) {
  return (
    <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis dataKey="month" stroke="#999FAD" style={{ fontSize: '13px' }} />
          <YAxis stroke="#999FAD" style={{ fontSize: '13px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              color: '#1A1D29',
            }}
            labelStyle={{ color: '#1A1D29' }}
            formatter={(value) => typeof value === 'number' ? `IDR ${value.toLocaleString('id-ID')}` : value}
          />
          <Legend />
          <Bar dataKey="income" fill="#6366F1" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" fill="#EF4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}