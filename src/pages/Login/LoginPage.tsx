// src/pages/Login/LoginPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import type { User } from '../../types';

// Mock credentials for demo
const mockUsers: Record<string, User> = {
  'user@example.com': {
    id: '1',
    name: 'Alex Johnson',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  'dahlan@example.com': {
    id: '2',
    name: 'Dahlan Usman',
    email: 'dahlan@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dahlan',
  },
  'admin@example.com': {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        setError('Email dan password harus diisi');
        return;
      }

      // Find user by email from mock data
      const user = mockUsers[email.toLowerCase()];
      if (!user) {
        setError('Email atau password salah');
        return;
      }

      // Simple password check (in real app, this would be server-side)
      const passwordValid = password === 'user123' || password === 'dahlan123' || password === 'admin123';
      if (!passwordValid) {
        setError('Email atau password salah');
        return;
      }

      // Login with user object
      login(user);
      navigate('/menu-dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light via-bg-secondary to-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-primary rounded-lg mb-4">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Spendly</h1>
          <p className="text-text-secondary text-sm mt-1">Personal Finance Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-bg-primary border border-border-light rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome Back</h2>
          <p className="text-text-secondary text-sm mb-6">Sign in to your account to continue</p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-danger-light border border-danger rounded-lg">
              <p className="text-danger text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-text-tertiary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-text-tertiary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-text-tertiary hover:text-text-secondary transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-text-secondary">Remember me</span>
              </label>
              <a href="#" className="text-accent-primary hover:text-accent-secondary transition">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-primary text-white py-2 rounded-lg font-medium hover:bg-accent-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-accent-light rounded-lg border border-accent-primary">
            <p className="text-xs font-semibold text-accent-primary mb-2">📝 Demo Credentials:</p>
            <div className="space-y-2 text-xs text-text-secondary">
              <p>
                <strong>User:</strong> user@example.com / user123
              </p>
              <p>
                <strong>User 2:</strong> dahlan@example.com / dahlan123
              </p>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-accent-primary hover:text-accent-secondary transition font-medium">
              Sign up
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-text-tertiary mt-8">
          <p>© 2024 Spendly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}