// src/types/index.ts

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  currency?: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  status: 'completed' | 'pending';
  notes?: string;
}

export interface Budget {
  id: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  month: string;
  year: number;
  status: 'on_track' | 'warning' | 'over_budget';
  notes?: string;
}

export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export interface ChartDataPoint {
  month?: string;
  week?: string;
  income: number;
  expense: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

// Dashboard Summary interface
export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

// Chart data interface (compatible with ChartDataPoint)
export interface ChartData {
  month: string;
  income: number;
  expense: number;
}

// Category spending for charts
export interface CategorySpending {
  name: string;
  value: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  status: 'on_track' | 'approaching_limit' | 'over_budget' | 'not_started';
}