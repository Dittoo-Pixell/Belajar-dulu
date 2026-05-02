// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Pages
import LoginPage from './pages/Login/LoginPage';
import MenuDashboard from './pages/Menu-dashboard/MenuDashboard';
import TransactionPage from './pages/Menu-transaction/TransactionPage';
import BudgetsPage from './pages/Menu-budgets/BudgetsPage';
import ReportsPage from './pages/Menu-reports/ReportsPage';
import SettingsPage from './pages/Menu-settings/SettingsPage';

// Layout Component untuk pages yang memerlukan Sidebar & Navbar
interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-bg-secondary">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Router>
          <Routes>
            {/* ===== PUBLIC ROUTES ===== */}

            {/* Login Page */}
            <Route path="/login" element={<LoginPage />} />

            {/* Redirect root to menu-dashboard */}
            <Route path="/" element={<Navigate to="/menu-dashboard" replace />} />

            {/* ===== PROTECTED ROUTES ===== */}

            {/* Menu Dashboard - Gateway untuk routing berdasarkan role */}
            <Route
              path="/menu-dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <MenuDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Transaction Page */}
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <TransactionPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Reports Page */}
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ReportsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Budgets Page */}
            <Route
              path="/budgets"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <BudgetsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Settings Page */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <SettingsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* ===== 404 NOT FOUND ===== */}
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
                    <p className="text-text-secondary mb-6">Page not found</p>
                    <a
                      href="/menu-dashboard"
                      className="inline-block px-6 py-2 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-secondary transition"
                    >
                      Go to Dashboard
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
}