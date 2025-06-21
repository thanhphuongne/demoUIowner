import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { profile, fetchProfile } = useUserStore();
  
  // Xác định activeTab dựa trên URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/fields')) return 'fields';
    if (path.startsWith('/bookings')) return 'bookings';
    if (path.startsWith('/analytics')) return 'analytics';
    if (path.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        user={profile || user}
        onLogout={logout}
      />
      
      <div className="flex-1 overflow-auto lg:ml-0">
        <Outlet /> {/* Đây là nơi các trang con sẽ được hiển thị */}
      </div>
    </div>
  );
};

export default MainLayout;