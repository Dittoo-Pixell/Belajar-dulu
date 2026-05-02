// src/data/mockData.ts

import type { Transaction, Budget, DashboardSummary, ChartData, CategorySpending } from '../types';

export const dashboardSummary: DashboardSummary = {
  totalBalance: 124592.00,
  monthlyIncome: 12400.00,
  monthlyExpenses: 4281.50,
  savingsRate: 34.5,
};

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 2499.00,
    category: 'Technology',
    description: 'Apple Store - MacBook Pro',
    date: '2024-10-24',
    status: 'completed',
  },
  {
    id: '2',
    type: 'expense',
    amount: 64.20,
    category: 'Food & Dining',
    description: 'Aldis Burger',
    date: '2024-10-24',
    status: 'completed',
  },
  {
    id: '3',
    type: 'income',
    amount: 8200.00,
    category: 'Income',
    description: 'Monthly Salary - TechCo',
    date: '2024-10-23',
    status: 'completed',
  },
  {
    id: '4',
    type: 'expense',
    amount: 52.99,
    category: 'Software',
    description: 'Subscription Adobe Premiere',
    date: '2024-10-22',
    status: 'pending',
  },
  {
    id: '5',
    type: 'expense',
    amount: 24.50,
    category: 'Transport',
    description: 'Uber ride',
    date: '2024-10-21',
    status: 'completed',
  },
];

export const incomeVsExpensesChart: ChartData[] = [
  { month: 'Jan', income: 8000, expense: 3500 },
  { month: 'Feb', income: 8500, expense: 3800 },
  { month: 'Mar', income: 8200, expense: 4000 },
  { month: 'Apr', income: 9000, expense: 3900 },
  { month: 'May', income: 8800, expense: 4100 },
  { month: 'Jun', income: 12400, expense: 4281 },
];

export const spendingByCategory: CategorySpending[] = [
  { name: 'Housing', value: 40 },
  { name: 'Food & Drinks', value: 25 },
  { name: 'Transport', value: 20 },
  { name: 'Other', value: 15 },
];

export const allTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 1240.00,
    category: 'Software',
    description: 'Monthly AWS subscription',
    date: '2024-10-24',
    status: 'completed',
  },
  {
    id: '2',
    type: 'income',
    amount: 8500.00,
    category: 'Client Income',
    description: 'Project Delta Phase I',
    date: '2024-10-22',
    status: 'completed',
  },
  {
    id: '3',
    type: 'expense',
    amount: 2100.00,
    category: 'Marketing',
    description: 'Google Ads Campaign',
    date: '2024-10-20',
    status: 'completed',
  },
  {
    id: '4',
    type: 'expense',
    amount: 15000.00,
    category: 'Office Rent',
    description: 'Headquarters Rent Q4',
    date: '2024-10-19',
    status: 'completed',
  },
  {
    id: '5',
    type: 'expense',
    amount: 5000.00,
    category: 'Internal',
    description: 'Savings Transfer',
    date: '2024-10-18',
    status: 'completed',
  },
];

export const budgets: Budget[] = [
  {
    id: '1',
    category: 'Basic Needs',
    allocatedAmount: 4000,
    spentAmount: 2800,
    month: 'August',
    year: 2024,
    status: 'on_track',
  },
  {
    id: '2',
    category: 'Transport',
    allocatedAmount: 800,
    spentAmount: 640,
    month: 'August',
    year: 2024,
    status: 'warning',
  },
  {
    id: '3',
    category: 'Health',
    allocatedAmount: 1000,
    spentAmount: 1150,
    month: 'August',
    year: 2024,
    status: 'over_budget',
  },
  {
    id: '4',
    category: 'Entertainment',
    allocatedAmount: 1200,
    spentAmount: 420,
    month: 'August',
    year: 2024,
    status: 'on_track',
  },
  {
    id: '5',
    category: 'Groceries',
    allocatedAmount: 1800,
    spentAmount: 1400,
    month: 'August',
    year: 2024,
    status: 'on_track',
  },
  {
    id: '6',
    category: 'Savings',
    allocatedAmount: 1200,
    spentAmount: 0,
    month: 'August',
    year: 2024,
    status: 'on_track',
  },
];

export const weeklyFlowChart: ChartData[] = [
  { month: 'Week 1', income: 2500, expense: 1500 },
  { month: 'Week 2', income: 3000, expense: 1800 },
  { month: 'Week 3', income: 3200, expense: 2000 },
  { month: 'Week 4', income: 3750, expense: 2910 },
];

export const expenseSplitChart: CategorySpending[] = [
  { name: 'Housing', value: 48 },
  { name: 'Food', value: 25 },
  { name: 'Others', value: 27 },
];

export const categoryBreakdown = [
  {
    category: 'Housing',
    amountSpent: 3694.70,
    percentage: 45,
    budgetStatus: 'UNDER_BUDGET',
  },
  {
    category: 'Food',
    amountSpent: 2052.61,
    percentage: 60,
    budgetStatus: 'WARNING',
  },
  {
    category: 'Entertainment',
    amountSpent: 1231.57,
    percentage: 18,
    budgetStatus: 'UNDER_BUDGET',
  },
  {
    category: 'Shopping',
    amountSpent: 1231.57,
    percentage: 100,
    budgetStatus: 'OVER_BUDGET',
  },
];

export const categoryOptions = [
  'Basic Needs',
  'Transport',
  'Health',
  'Entertainment',
  'Groceries',
  'Savings',
  'Software',
  'Marketing',
  'Office Rent',
  'Shopping',
  'Utilities',
  'Food & Dining',
  'Other',
];