// src/pages/Dashboard/User-dashboard/UserDashboard.tsx

import { Wallet, TrendingUp, CreditCard, Target } from 'lucide-react';
import { useModal } from '../../../context/ModalContext';
import SummaryCard from './components/SummaryCard';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import SpendingByCategory from './components/SpendingByCategory';
import RecentTransactions from './components/RecentTransactions';
import {
  dashboardSummary,
  recentTransactions,
  spendingByCategory,
  incomeVsExpensesChart,
} from '../../../data/mockData';
import type { Transaction } from '../../../types';

export default function UserDashboard() {
  const { openTransactionModal, openDeleteModal } = useModal();

  const handleAddTransaction = () => {
    openTransactionModal('add');
  };

  const handleEditTransaction = (transaction: Transaction) => {
    openTransactionModal('edit', transaction);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    openDeleteModal('transaction', transaction);
  };

  return (
    <div className="min-h-screen bg-bg-secondary p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Financial Overview</h1>
          <p className="text-sm text-text-secondary">Welcome back, Alex. Your savings rate is up 4% this month.</p>
        </div>
        <button
          onClick={handleAddTransaction}
          className="bg-accent-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-secondary transition flex items-center gap-2"
        >
          <span>+ Add Transaction</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Total Balance" amount={dashboardSummary.totalBalance} change={4.2} icon={Wallet} />
        <SummaryCard
          title="Monthly Income"
          amount={dashboardSummary.monthlyIncome}
          change={2.1}
          icon={TrendingUp}
        />
        <SummaryCard
          title="Monthly Expenses"
          amount={dashboardSummary.monthlyExpenses}
          change={-1.5}
          icon={CreditCard}
        />
        <SummaryCard title="Savings Rate" amount={dashboardSummary.savingsRate} change={4.0} icon={Target} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <IncomeVsExpenseChart data={incomeVsExpensesChart} />
        <SpendingByCategory data={spendingByCategory} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={recentTransactions}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}