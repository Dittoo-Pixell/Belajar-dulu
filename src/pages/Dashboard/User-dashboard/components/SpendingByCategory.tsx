// src/pages/Dashboard/User-dashboard/components/SpendingByCategory.tsx

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import type { CategorySpending } from '../../../../types';

const COLORS = ['#6366F1', '#F59E0B', '#10B981', '#EC4899'];

interface SpendingByCategoryProps {
  data: CategorySpending[];
}

export default function SpendingByCategory({ data }: SpendingByCategoryProps) {
  return (
    <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Category legend dengan percentage */}
      <div className="mt-6 space-y-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm text-text-secondary">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-text-primary">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}