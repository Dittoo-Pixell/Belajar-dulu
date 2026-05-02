// src/pages/Menu-dashboard/MenuDashboard.tsx

import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import UserDashboard from '../Dashboard/User-dashboard/UserDashboard';

export default function MenuDashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-light border-t-accent-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Jika tidak ada user, redirect ke login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logic berdasarkan role
  if (user.role === 'admin') {
    // Nanti buatkan AdminDashboard
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Admin Dashboard</h1>
          <p className="text-text-secondary">Coming soon...</p>
        </div>
      </div>
    );
  }

  // Default untuk user role
  if (user.role === 'user') {
    return <UserDashboard />;
  }

  // Role tidak dikenal
  return <Navigate to="/login" replace />;
}
