// src/components/Navbar.tsx

import { Bell, Settings, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-bg-primary border-b border-border-light px-8 py-4 flex justify-between items-center shadow-sm">
      {/* Left Section - Breadcrumb/Title */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary">Dashboard</h2>
        <p className="text-text-secondary text-sm">Welcome back, {user?.name}</p>
      </div>

      {/* Right Section - Icons & User */}
      <div className="flex items-center gap-6">
        {/* Search Bar (Optional) */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search analytics..."
            className="px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition w-64"
          />
        </div>

        {/* Notification Bell */}
        <button className="p-2 hover:bg-bg-secondary rounded-lg transition relative">
          <Bell size={20} className="text-text-secondary" strokeWidth={1.5} />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full"></span>
        </button>

        {/* Settings Button */}
        <button
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-bg-secondary rounded-lg transition"
        >
          <Settings size={20} className="text-text-secondary" strokeWidth={1.5} />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-2 hover:bg-bg-secondary rounded-lg transition"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-accent-primary"
              />
            ) : (
              <UserIcon size={20} className="text-text-secondary" strokeWidth={1.5} />
            )}
            <span className="hidden sm:inline text-sm font-medium text-text-primary">{user?.name}</span>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-bg-primary border border-border-light rounded-lg shadow-lg overflow-hidden z-50">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-border-light bg-bg-secondary">
                <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                <p className="text-xs text-text-tertiary">{user?.email}</p>
              </div>

              {/* Menu Items */}
              <button
                onClick={() => {
                  navigate('/settings');
                  setIsProfileOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition flex items-center gap-2"
              >
                <Settings size={16} />
                Settings
              </button>

              {/* Divider */}
              <div className="h-px bg-border-light"></div>

              {/* Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsProfileOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger-light transition flex items-center gap-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}