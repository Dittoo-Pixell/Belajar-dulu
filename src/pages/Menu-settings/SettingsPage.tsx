// src/pages/Menu-settings/SettingsPage.tsx

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Bell, LogOut, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    marketing: true,
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      window.location.href = '/login';
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you absolutely sure? This action cannot be undone.')) {
      alert('Account deletion would be processed via API');
    }
  };

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-bg-secondary p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-1">Settings</h1>
        <p className="text-sm text-text-secondary">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-bg-primary border border-border-light rounded-lg overflow-hidden shadow-sm">
            <nav className="flex flex-col">
              {[
                { id: 'general', label: 'General', icon: '⚙️' },
                { id: 'security', label: 'Security', icon: '🔒' },
                { id: 'notifications', label: 'Notifications', icon: '🔔' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-3 text-left text-sm font-medium transition border-l-4 flex items-center gap-3 ${
                    activeTab === item.id
                      ? 'bg-accent-light border-accent-primary text-accent-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full border-4 border-accent-light"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{user?.name}</h2>
                    <p className="text-sm text-text-secondary">{user?.email}</p>
                    <button className="text-accent-primary text-sm font-medium hover:text-accent-secondary transition mt-2">
                      Change Avatar
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Account Details</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Currency Preference</label>
                    <select className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary transition">
                      <option>IDR - Indonesian Rupiah</option>
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                    </select>
                  </div>
                  <button className="w-full bg-accent-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-secondary transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
                  <Lock size={20} className="text-accent-primary" />
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary transition"
                    />
                  </div>
                  <button className="w-full bg-accent-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-secondary transition">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-bg-primary border border-border-light rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
                  <Bell size={20} className="text-accent-primary" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    { id: 'email', name: 'Email Notifications', desc: 'Receive weekly summary and monthly alerts' },
                    { id: 'push', name: 'Push Notifications', desc: 'Instant alerts for large transactions' },
                    { id: 'marketing', name: 'Marketing & Tips', desc: 'Financial insights and platform updates' },
                  ].map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-start justify-between p-4 bg-bg-secondary rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">{notif.name}</h4>
                        <p className="text-sm text-text-secondary mt-1">{notif.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={notificationSettings[notif.id as keyof typeof notificationSettings]}
                          onChange={() => toggleNotification(notif.id as keyof typeof notificationSettings)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-12 bg-bg-primary border border-danger-light rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-danger mb-4 flex items-center gap-2">
          <AlertCircle size={20} />
          Danger Zone
        </h3>
        <p className="text-sm text-text-secondary mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <div className="flex gap-3">
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-danger text-white rounded-lg text-sm font-medium hover:bg-danger-dark transition"
          >
            Delete Account
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-danger text-danger rounded-lg text-sm font-medium hover:bg-danger-light transition flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout Account
          </button>
        </div>
      </div>
    </div>
  );
}