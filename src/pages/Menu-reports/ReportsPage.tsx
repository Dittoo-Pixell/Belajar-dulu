// src/pages/Menu-reports/ReportsPage.tsx

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Download } from 'lucide-react';
import { weeklyFlowChart, expenseSplitChart, categoryBreakdown } from '../../data/mockData';

const COLORS = ['#6366F1', '#F59E0B', '#A855F7'];

const budgetStatusStyles: Record<string, { bg: string; text: string; label: string }> = {
  'UNDER_BUDGET': { bg: '#D1FAE5', text: '#059669', label: 'UNDER BUDGET' },
  'WARNING': { bg: '#FEF3C7', text: '#D97706', label: 'WARNING' },
  'OVER_BUDGET': { bg: '#FEE2E2', text: '#DC2626', label: 'OVER BUDGET' },
};

export default function ReportsPage() {
  const reportSummary = {
    month: 'October 2023',
    totalIncome: 12450.00,
    totalExpense: 8210.45,
    netSavings: 4239.55,
  };

  return (
    <div className="min-h-screen bg-bg-secondary p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Financial Performance</h1>
          <p className="text-sm text-text-secondary">Insights and visual analytics for your wealth</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-bg-primary border border-border-light rounded-lg text-sm text-accent-primary font-medium hover:bg-accent-light transition flex items-center gap-2">
            <Calendar size={16} />
            {reportSummary.month}
          </button>
          <button className="px-4 py-2 bg-bg-primary border border-border-light rounded-lg text-sm text-accent-primary font-medium hover:bg-accent-light transition flex items-center gap-2">
            <Download size={16} />
            Export PDF
          </button>
          <button className="px-4 py-2 bg-bg-primary border border-border-light rounded-lg text-sm text-accent-primary font-medium hover:bg-accent-light transition flex items-center gap-2">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm text-text-secondary font-semibold uppercase">Total Income</h3>
            <span className="text-success text-xs font-semibold bg-success-light px-2 py-1 rounded">
              +8.2% last month
            </span>
          </div>
          <p className="text-3xl font-bold text-text-primary">IDR {reportSummary.totalIncome.toLocaleString('id-ID')}</p>
        </div>

        <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm text-text-secondary font-semibold uppercase">Total Expense</h3>
            <span className="text-danger text-xs font-semibold bg-danger-light px-2 py-1 rounded">
              +2.4% last month
            </span>
          </div>
          <p className="text-3xl font-bold text-text-primary">IDR {reportSummary.totalExpense.toLocaleString('id-ID')}</p>
        </div>

        <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm text-text-secondary font-semibold uppercase">Net Savings</h3>
            <span className="text-accent-primary text-xs font-semibold bg-accent-light px-2 py-1 rounded">
              On track for goal
            </span>
          </div>
          <p className="text-3xl font-bold text-text-primary">IDR {reportSummary.netSavings.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Flow */}
        <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Weekly Flow</h3>
          <p className="text-sm text-text-secondary mb-4">Income vs Expenses over the month</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyFlowChart} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" stroke="#999FAD" style={{ fontSize: '13px' }} />
              <YAxis stroke="#999FAD" style={{ fontSize: '13px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="income" fill="#6366F1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" fill="#EF4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Split */}
        <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Expense Split</h3>
          <p className="text-sm text-text-secondary mb-4">Proportional spending by category</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={expenseSplitChart}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseSplitChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-bg-primary border border-border-light rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border-light bg-bg-secondary">
          <h3 className="text-lg font-semibold text-text-primary">Category Breakdown</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light">
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">
                Amount Spent
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">
                Percentage of Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">
                Budget Status
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryBreakdown.map((item) => {
              const statusStyle = budgetStatusStyles[item.budgetStatus];
              return (
                <tr key={item.category} className="border-b border-border-light hover:bg-bg-secondary transition">
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">
                    IDR {item.amountSpent.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-primary rounded-full"
                          style={{ width: `${Math.min(item.percentage, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-text-primary w-12">{item.percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                    >
                      {statusStyle.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* View All Button */}
        <div className="px-6 py-4 border-t border-border-light bg-bg-secondary text-center">
          <button className="text-accent-primary text-sm font-medium hover:text-accent-secondary transition">
            View All Details
          </button>
        </div>
      </div>
    </div>
  );
}