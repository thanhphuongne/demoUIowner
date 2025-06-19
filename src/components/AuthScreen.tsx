import React, { useState } from 'react';
import { Eye, EyeOff, MapPin, Shield, Users, TrendingUp } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (email: string, password: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      if (email === 'admin@sportbook.vn' && password === 'admin123') {
        onLogin(email, password);
      } else {
        setError('Email hoặc mật khẩu không chính xác');
      }
      setIsLoading(false);
    }, 1000);
  };

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
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">SportBook Pro</h1>
            <p className="text-lg lg:text-xl text-gray-600">Hệ thống quản lý sân thể thao chuyên nghiệp</p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:gap-6">
            <div className="flex items-start space-x-4 p-4 lg:p-6 bg-white/60 backdrop-blur-sm rounded-xl lg:rounded-2xl">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Bảo Mật Cao</h3>
                <p className="text-gray-600 text-sm lg:text-base">Hệ thống bảo mật đa lớp với mã hóa SSL và backup tự động</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 lg:p-6 bg-white/60 backdrop-blur-sm rounded-xl lg:rounded-2xl">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Quản Lý Khách Hàng</h3>
                <p className="text-gray-600 text-sm lg:text-base">Theo dõi và phân tích hành vi khách hàng một cách chi tiết</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 lg:p-6 bg-white/60 backdrop-blur-sm rounded-xl lg:rounded-2xl">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Thống Kê Thông Minh</h3>
                <p className="text-gray-600 text-sm lg:text-base">Báo cáo doanh thu và phân tích hiệu suất kinh doanh realtime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto order-1 lg:order-2">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 border border-white/20">
            <div className="text-center mb-6 lg:mb-8">
              <div className="flex items-center justify-center mb-4 lg:hidden">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Đăng Nhập</h2>
              <p className="text-gray-600 text-sm lg:text-base">Truy cập hệ thống quản lý sân thể thao</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sportbook.vn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin123"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg lg:rounded-xl">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg lg:rounded-xl p-3 lg:p-4">
                <p className="text-sm text-blue-700 mb-2">
                  <strong>Tài khoản demo:</strong>
                </p>
                <p className="text-sm text-blue-600">
                  Email: admin@sportbook.vn<br />
                  Mật khẩu: admin123
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg lg:rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
              </button>
            </form>

            <div className="mt-4 lg:mt-6 text-center">
              <p className="text-xs lg:text-sm text-gray-500">
                Bảo mật bởi <span className="font-medium text-blue-600">SportBook Security</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;