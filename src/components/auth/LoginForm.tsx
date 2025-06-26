import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginCredentials } from "../../types";
interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  isLoading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 border border-white/20">
      <div className="text-center mb-6 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
          Đăng Nhập
        </h2>
        <p className="text-gray-600 text-sm lg:text-base">
          Truy cập hệ thống quản lý sân thể thao
        </p>
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
              type={showPassword ? "text" : "password"}
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
              {showPassword ? (
                <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" />
              ) : (
                <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
              )}
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
            Email: admin@sportbook.vn
            <br />
            Mật khẩu: admin123
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg lg:rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>

      <div className="mt-4 lg:mt-6 text-center">
        <p className="text-xs lg:text-sm text-gray-500">
          Bảo mật bởi{" "}
          <span className="font-medium text-blue-600">SportBook Security</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
