// src/pages/Menu-budgets/BudgetsPage.tsx

import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { budgets } from '../../data/mockData';
import { getCategoryIcon } from '../../utils/formatting';

const budgetStatusColors: Record<string, { label: string; color: string; bg: string }> = {
  'on_track': { label: 'ON TRACK', color: '#10B981', bg: '#D1FAE5' },
  'warning': { label: 'APPROACHING LIMIT', color: '#F59E0B', bg: '#FEF3C7' },
  'over_budget': { label: 'OVER BUDGET', color: '#EF4444', bg: '#FEE2E2' },
  'not_started': { label: 'NOT STARTED', color: '#6B7280', bg: '#F3F4F6' },
};

export default function BudgetsPage() {
  const { openBudgetModal, openDeleteModal } = useModal();

  const monthOverview = {
    month: 'August 2024',
    totalBudgeted: 10000.00,
    totalSpent: 6500.00,
    remainingSpend: 3500.00,
    percentageSpent: 65,
  };

  const handleAddBudget = () => {
    openBudgetModal('add');
  };

  const handleEditBudget = (budget: typeof budgets[0]) => {
    openBudgetModal('edit', budget);
  };

  const handleDeleteBudget = (budget: typeof budgets[0]) => {
    openDeleteModal('budget', budget);
  };

  return (
    <div className="min-h-screen bg-bg-secondary p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">{monthOverview.month}</h1>
          <p className="text-sm text-text-secondary">Monthly Budget Overview</p>
        </div>
        <button
          onClick={handleAddBudget}
          className="bg-accent-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-secondary transition flex items-center gap-2"
        >
          <Plus size={18} />
          New Budget
        </button>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Budgeted */}
        <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
          <p className="text-xs text-text-secondary font-semibold uppercase mb-2">Total Budgeted</p>
          <p className="text-3xl font-bold text-text-primary">
            IDR {monthOverview.totalBudgeted.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Total Spent */}
        <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
          <p className="text-xs text-text-secondary font-semibold uppercase mb-2">Total Spent</p>
          <p className="text-3xl font-bold text-text-primary">
            IDR {monthOverview.totalSpent.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Remaining & Progress */}
        <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-text-secondary font-semibold uppercase mb-2">Remaining to spend</p>
              <p className="text-3xl font-bold text-text-primary">
                IDR {monthOverview.remainingSpend.toLocaleString('id-ID')}
              </p>
            </div>
            {/* Circular Progress */}
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="#EEEFF4" strokeWidth="6" />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="6"
                  strokeDasharray={`${(monthOverview.percentageSpent / 100) * 282.7} 282.7`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-text-primary">{monthOverview.percentageSpent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Budget Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const statusStyle = budgetStatusColors[budget.status];
            const percentage = (budget.spentAmount / budget.allocatedAmount) * 100;

            return (
              <div
                key={budget.id}
                className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getCategoryIcon(budget.category)}</div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{budget.category}</h3>
                      <p className="text-xs text-text-secondary">
                        Spent: <span className="font-medium">IDR {budget.spentAmount.toLocaleString('id-ID')}</span>
                      </p>
                      <p className="text-xs text-text-secondary">
                        Budget: <span className="font-medium">IDR {budget.allocatedAmount.toLocaleString('id-ID')}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBudget(budget)}
                      className="p-1 hover:bg-bg-secondary rounded transition text-text-tertiary hover:text-accent-primary"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteBudget(budget)}
                      className="p-1 hover:bg-bg-secondary rounded transition text-text-tertiary hover:text-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: percentage <= 100 ? '#6366F1' : '#EF4444',
                      }}
                    ></div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                  >
                    {statusStyle.label}
                  </span>
                  <span className="text-xs font-semibold text-text-secondary">
                    {budget.allocatedAmount - budget.spentAmount > 0
                      ? `IDR ${(budget.allocatedAmount - budget.spentAmount).toLocaleString('id-ID')} left`
                      : `IDR ${Math.abs(budget.allocatedAmount - budget.spentAmount).toLocaleString('id-ID')} over`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}