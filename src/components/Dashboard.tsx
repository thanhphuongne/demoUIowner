import React from 'react';
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Users, 
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';
import { Analytics, Activity as ActivityType, Field } from '../types';

interface DashboardProps {
  analytics: Analytics;
  activities: ActivityType[];
  fields: Field[];
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ analytics, activities, fields, user }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'payment': return DollarSign;
      case 'cancellation': return AlertCircle;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold mb-1 lg:mb-2">Chào mừng trở lại, {user.name}!</h1>
            <p className="text-blue-100 text-sm lg:text-base">Quản lý hiệu quả {user.businessName}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-blue-100">Hôm nay</p>
            <p className="text-lg lg:text-xl font-semibold">{new Date().toLocaleDateString('vi-VN')}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Doanh thu hôm nay</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{formatCurrency(analytics.dailyRevenue)}</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
              <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-3 lg:mt-4 space-x-2">
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-500 flex-shrink-0" />
            <span className="text-xs lg:text-sm text-green-600 font-medium">+12.5%</span>
            <span className="text-xs lg:text-sm text-gray-500 truncate">so với hôm qua</span>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Đặt sân hôm nay</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{analytics.dailyBookings}</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
              <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-3 lg:mt-4 space-x-2">
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-blue-500 flex-shrink-0" />
            <span className="text-xs lg:text-sm text-blue-600 font-medium">+8.2%</span>
            <span className="text-xs lg:text-sm text-gray-500 truncate">so với hôm qua</span>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Tổng số sân</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{fields.length}</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 ml-3">             
              <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-3 lg:mt-4 space-x-2">
            <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-500 flex-shrink-0" />
            <span className="text-xs lg:text-sm text-green-600 font-medium">{fields.filter(f => f.isActive).length} hoạt động</span>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Giá trị trung bình</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{formatCurrency(analytics.averageBookingValue)}</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-3 lg:mt-4 space-x-2">
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 flex-shrink-0" />
            <span className="text-xs lg:text-sm text-yellow-600 font-medium">+5.7%</span>
            <span className="text-xs lg:text-sm text-gray-500 truncate">so với tháng trước</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Popular Fields */}
        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900">Sân Phổ Biến</h3>
            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
          </div>
          <div className="space-y-3 lg:space-y-4">
            {analytics.popularFields.map((field, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs lg:text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{field.fieldName}</p>
                    <p className="text-xs lg:text-sm text-gray-500">{field.bookings} lượt đặt</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">{formatCurrency(field.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900">Hoạt Động Gần Đây</h3>
            <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
          </div>
          <div className="space-y-3 lg:space-y-4">
            {activities.slice(0, 5).map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getStatusColor(activity.status)}`}>
                    <IconComponent className="w-3 h-3 lg:w-4 lg:h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm lg:text-base">{activity.title}</p>
                    <p className="text-xs lg:text-sm text-gray-500 mb-1 line-clamp-2">{activity.description}</p>
                    <p className="text-xs text-gray-400">{formatTime(activity.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 space-y-3 sm:space-y-0">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">Biểu Đồ Doanh Thu</h3>
          <div className="flex space-x-2 overflow-x-auto">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg whitespace-nowrap">7 ngày</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg whitespace-nowrap">30 ngày</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg whitespace-nowrap">90 ngày</button>
          </div>
        </div>
        <div className="h-48 sm:h-56 lg:h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center px-4">
            <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-2 lg:mb-4" />
            <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-600 mb-1 lg:mb-2">Biểu Đồ Doanh Thu</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 lg:mb-4">Tích hợp với thư viện biểu đồ như Chart.js hoặc Recharts</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 text-center">
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{formatCurrency(analytics.dailyRevenue)}</p>
                <p className="text-xs sm:text-sm text-gray-500">Hôm nay</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">{formatCurrency(analytics.monthlyRevenue)}</p>
                <p className="text-xs sm:text-sm text-gray-500">Tháng này</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">{formatCurrency(analytics.totalRevenue)}</p>
                <p className="text-xs sm:text-sm text-gray-500">Tổng cộng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;