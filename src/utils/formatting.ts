// src/utils/formatting.ts

export const formatCurrency = (amount: number, currency: string = 'IDR'): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export const formatMonthYear = (month: string, year: number): string => {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const date = new Date(year, monthIndex);
  return new Intl.DateTimeFormat('id-ID', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Technology': '#6366F1',
    'Food & Dining': '#F59E0B',
    'Transport': '#10B981',
    'Income': '#10B981',
    'Software': '#A855F7',
    'Marketing': '#F59E0B',
    'Office Rent': '#6366F1',
    'Internal': '#06B6D4',
    'Client Income': '#10B981',
    'Basic Needs': '#6366F1',
    'Health': '#F97316',
    'Entertainment': '#EC4899',
    'Groceries': '#06B6D4',
    'Savings': '#8B5CF6',
    'Shopping': '#F59E0B',
    'Utilities': '#8B5CF6',
  };
  return colors[category] || '#999FAD';
};

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Technology': '💻',
    'Food & Dining': '🍔',
    'Transport': '🚗',
    'Income': '💰',
    'Software': '💻',
    'Marketing': '📊',
    'Office Rent': '🏢',
    'Internal': '📝',
    'Client Income': '💼',
    'Basic Needs': '🏠',
    'Health': '❤️',
    'Entertainment': '🎮',
    'Groceries': '🛒',
    'Savings': '🐷',
    'Shopping': '🛍️',
    'Utilities': '⚡',
  };
  return icons[category] || '💳';
};

export const getMonthName = (monthString: string): number => {
  const months: Record<string, number> = {
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11,
  };
  return months[monthString] ?? 0;
};

export const getPercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};