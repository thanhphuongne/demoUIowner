'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { User, Mail, Phone, Building, Save } from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileSettingsProps {
  user: UserProfile;
  loading: boolean;
  error: string | null;
  onUpdateUser: (updates: Partial<UserProfile>) => Promise<void>;
  onUploadAvatar: (file: File) => Promise<void>;
  clearError: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ 
  user, 
  loading,
  error,
  onUpdateUser,
  onUploadAvatar,
  clearError
}) => {
  const [profileData, setProfileData] = useState<Partial<UserProfile>>(user);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user.avatar);

  // Update khi user thay đổi
  useEffect(() => {
    setProfileData(user);
    setAvatarPreview(user.avatar);
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    await onUpdateUser(profileData);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      onUploadAvatar(file).catch(() => {
        setAvatarPreview(user.avatar);
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <User className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-900">Thông Tin Hồ Sơ</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg relative">
          {error}
          <button 
            onClick={clearError} 
            className="absolute top-2 right-2 text-red-800 font-medium"
          >
            Đóng
          </button>
        </div>
      )}

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 relative">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt={user.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <div>
            <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              Thay đổi ảnh
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            <p className="text-sm text-gray-500 mt-1">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={User}
            label="Họ và tên"
            name="name"
            value={profileData.name || ''}
            onChange={handleChange}
          />
          <InputField
            icon={Mail}
            label="Email"
            name="email"
            type="email"
            value={profileData.email || ''}
            onChange={handleChange}
          />
          <InputField
            icon={Phone}
            label="Số điện thoại"
            name="phone"
            type="tel"
            value={profileData.phone || ''}
            onChange={handleChange}
          />
          <InputField
            icon={Building}
            label="Tên doanh nghiệp"
            name="businessName"
            value={profileData.businessName || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveProfile}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Tách component input để tái sử dụng
interface InputFieldProps {
  icon: React.ElementType;
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  </div>
);

export default ProfileSettings;
