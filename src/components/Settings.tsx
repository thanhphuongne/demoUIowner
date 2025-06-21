import React, { useState } from 'react';
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield
} from 'lucide-react';
import { UserProfile, Payment } from '../types';
import ProfileSettings from './settings/ProfileSettings';
import PaymentSettings from './settings/PaymentSettings';
import NotificationSettings from './settings/NotificationSettings';
import SecuritySettings from './settings/SecuritySettings';

interface SettingsProps {
  user: UserProfile | null;
  paymentSettings: Payment | null;
  userLoading: boolean;
  userError: string | null;
  paymentLoading: boolean;
  paymentError: string | null;
  onUpdateUser: (updates: Partial<UserProfile>) => Promise<void>;
  onUpdatePaymentSettings: (settings: Partial<Payment>) => Promise<void>;
  onUploadAvatar: (file: File) => Promise<void>;
  clearUserError: () => void;
  clearPaymentError: () => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  user,
  paymentSettings,
  userLoading,
  userError,
  paymentLoading,
  paymentError,
  onUpdateUser,
  onUpdatePaymentSettings,
  onUploadAvatar,
  clearUserError,
  clearPaymentError
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Hồ Sơ', icon: User },
    { id: 'payment', label: 'Thanh Toán', icon: CreditCard },
    { id: 'notifications', label: 'Thông Báo', icon: Bell },
    { id: 'security', label: 'Bảo Mật', icon: Shield },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cài Đặt</h1>
        <p className="text-gray-600">Quản lý tài khoản và cài đặt hệ thống</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {activeTab === 'profile' && user && (
              <ProfileSettings 
                user={user} 
                loading={userLoading}
                error={userError}
                onUpdateUser={onUpdateUser}
                onUploadAvatar={onUploadAvatar}
                clearError={clearUserError}
              />
            )}
            
            {activeTab === 'payment' && paymentSettings && (
              <PaymentSettings 
                paymentSettings={paymentSettings}
                loading={paymentLoading}
                error={paymentError}
                onUpdatePaymentSettings={onUpdatePaymentSettings}
                clearError={clearPaymentError}
              />
            )}
            
            {activeTab === 'notifications' && (
              <NotificationSettings />
            )}
            
            {activeTab === 'security' && (
              <SecuritySettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;