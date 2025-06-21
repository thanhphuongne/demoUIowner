import React, { useEffect } from 'react';
import Settings from '../components/Settings';
import { useUserStore } from '../stores/userStore';
import { usePaymentStore } from '../stores/paymentStore';
import { useAuthStore } from '../stores/authStore';

const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  
  const { 
    profile, 
    loading: userLoading, 
    error: userError, 
    fetchProfile, 
    updateProfile,
    uploadAvatar,
    clearError: clearUserError 
  } = useUserStore();
  
  const { 
    settings: paymentSettings, 
    loading: paymentLoading, 
    error: paymentError, 
    fetchPaymentSettings, 
    updatePaymentSettings,
    clearError: clearPaymentError 
  } = usePaymentStore();

  useEffect(() => {
    fetchPaymentSettings();
    if (user?.id) {
        fetchProfile(user.id);
      }
    }, [user, fetchProfile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Settings
        user={profile}
        paymentSettings={paymentSettings}
        userLoading={userLoading}
        userError={userError}
        paymentLoading={paymentLoading}
        paymentError={paymentError}
        onUpdateUser={(updates) => updateProfile(user?.id, updates)}
        onUpdatePaymentSettings={updatePaymentSettings}
        onUploadAvatar={(file) => uploadAvatar(user?.id, file)}
        clearUserError={clearUserError}
        clearPaymentError={clearPaymentError}
      />
    </div>
  );
};

export default SettingsPage;