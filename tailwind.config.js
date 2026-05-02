/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F5F7FA',
        'bg-tertiary': '#EEEFF4',
        'text-primary': '#1A1D29',
        'text-secondary': '#666D7D',
        'text-tertiary': '#999FAD',
        'accent-primary': '#6366F1',
        'accent-secondary': '#8B5CF6',
        'accent-light': '#E0E7FF',
        'success': '#10B981',
        'success-light': '#D1FAE5',
        'warning': '#F59E0B',
        'warning-light': '#FEF3C7',
        'danger': '#EF4444',
        'danger-light': '#FEE2E2',
        'danger-dark': '#DC2626',
        'border-light': '#E5E7EB',
        'border-medium': '#D1D5DB',
      },
    },
  },
  plugins: [],
}