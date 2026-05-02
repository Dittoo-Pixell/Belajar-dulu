// src/pages/Dashboard/User-dashboard/components/SummaryCard.tsx

import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  change: number;
  icon: LucideIcon;
}

export default function SummaryCard({ title, amount, change, icon: Icon }: SummaryCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-bg-primary border border-border-light rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-bg-secondary rounded-md">
          <Icon size={20} className="text-accent-primary" strokeWidth={1.5} />
        </div>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp size={16} className="text-success" strokeWidth={2} />
          ) : (
            <TrendingDown size={16} className="text-danger" strokeWidth={2} />
          )}
          <span className={`text-xs font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-2">{title}</p>
      <p className="text-2xl font-bold text-text-primary">
        IDR {amount.toLocaleString('id-ID')}
      </p>
    </div>
  );
}