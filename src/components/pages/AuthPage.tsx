
'use client';

import React from "react";
import { MapPin, Shield, Users, TrendingUp } from "lucide-react";
import FeatureCard from "../../components/auth/FeatureCard";
import LoginForm from "../../components/auth/LoginForm";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { login, loading, error } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = sessionStorage.getItem('redirectUrl') || '/dashboard';
      sessionStorage.removeItem('redirectUrl');
      router.push(redirectUrl);
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left Side - Features */}
        <div className="hidden lg:block order-2 lg:order-1">
          <div className="text-center mb-6 lg:mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              SportBook Pro
            </h1>
            <p className="text-lg lg:text-xl text-gray-600">
              Hệ thống quản lý sân thể thao chuyên nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:gap-6">
            <FeatureCard
              icon={<Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />}
              title="Bảo Mật Cao"
              description="Hệ thống bảo mật đa lớp với mã hóa SSL và backup tự động"
              gradientFrom="from-green-400"
              gradientTo="to-emerald-500"
            />

            <FeatureCard
              icon={<Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />}
              title="Quản Lý Khách Hàng"
              description="Theo dõi và phân tích hành vi khách hàng một cách chi tiết"
              gradientFrom="from-blue-400"
              gradientTo="to-cyan-500"
            />

            <FeatureCard
              icon={<TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-white" />}
              title="Thống Kê Thông Minh"
              description="Báo cáo doanh thu và phân tích hiệu suất kinh doanh realtime"
              gradientFrom="from-purple-400"
              gradientTo="to-pink-500"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto order-1 lg:order-2">
          <LoginForm onSubmit={login} isLoading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
