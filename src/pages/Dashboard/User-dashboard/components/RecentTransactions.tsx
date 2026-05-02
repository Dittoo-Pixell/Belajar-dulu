// src/pages/Dashboard/User-dashboard/components/RecentTransactions.tsx

import { MoreVertical } from 'lucide-react';
import type { Transaction } from '../../../../types';
import { getCategoryColor, getCategoryIcon } from '../../../../utils/formatting';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll?: () => void;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

export default function RecentTransactions({
  transactions,
  onViewAll,
  onEdit,
  onDelete,
}: RecentTransactionsProps) {
  return (
    <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Transactions</h3>
        <button
          onClick={onViewAll}
          className="text-accent-primary text-sm font-medium hover:text-accent-secondary transition"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Category Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                style={{ backgroundColor: getCategoryColor(tx.category) + '20' }}
              >
                {getCategoryIcon(tx.category)}
              </div>

              {/* Description */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-primary truncate">{tx.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-xs px-2 py-1 rounded-full text-white font-medium"
                    style={{ backgroundColor: getCategoryColor(tx.category) }}
                  >
                    {tx.category}
                  </span>
                  <span className="text-xs text-text-tertiary">{tx.date}</span>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right ml-4 flex-shrink-0">
              <p className={`font-semibold text-sm ${tx.amount > 0 ? 'text-success' : 'text-danger'}`}>
                {tx.amount > 0 ? '+' : ''}IDR {Math.abs(tx.amount).toLocaleString('id-ID')}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded mt-1 inline-block font-medium ${
                  tx.status === 'completed'
                    ? 'text-success bg-success-light'
                    : 'text-warning bg-warning-light'
                }`}
              >
                {tx.status === 'completed' ? 'Completed' : 'Pending'}
              </span>
            </div>

            {/* More Menu */}
            <div className="ml-4 flex-shrink-0 relative group">
              <button className="p-1 hover:bg-bg-tertiary rounded transition">
                <MoreVertical size={16} className="text-text-tertiary" />
              </button>
              <div className="absolute right-0 mt-1 w-32 bg-bg-primary border border-border-light rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-10">
                <button
                  onClick={() => onEdit?.(tx)}
                  className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(tx)}
                  className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger-light"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination info */}
      <p className="text-text-tertiary text-xs mt-6">Showing 5 of {transactions.length} transactions</p>
    </div>
  );
}