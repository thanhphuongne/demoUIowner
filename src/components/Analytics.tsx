import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Clock,
  Star,
  Download,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Analytics as AnalyticsType, Field } from '../types';

interface AnalyticsProps {
  analytics: AnalyticsType;
  fields: Field[];
}

const Analytics: React.FC<AnalyticsProps> = ({ analytics, fields }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thống Kê & Phân Tích</h1>
          <p className="text-gray-600">Theo dõi hiệu suất kinh doanh và xu hướng khách hàng</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Tổng Doanh Thu</p>
              <p className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+15.2% so với tháng trước</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Doanh Thu Tháng</p>
              <p className="text-2xl font-bold">{formatCurrency(analytics.monthlyRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+8.7% so với tháng trước</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Tổng Đặt Sân</p>
              <p className="text-2xl font-bold">{analytics.totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+12.3% so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.averageBookingValue)}</p>
            <p className="text-sm text-gray-600">Giá trị trung bình</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatPercentage(analytics.customerRetention)}</p>
            <p className="text-sm text-gray-600">Tỷ lệ giữ chân KH</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatPercentage(analytics.cancellationRate)}</p>
            <p className="text-sm text-gray-600">Tỷ lệ hủy sân</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {(fields.reduce((sum, field) => sum + field.rating, 0) / fields.length).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Điểm đánh giá TB</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Fields */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sân Phổ Biến Nhất</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.popularFields.map((field, index) => {
              const percentage = (field.revenue / analytics.totalRevenue) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{field.fieldName}</p>
                        <p className="text-sm text-gray-500">{field.bookings} lượt đặt</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(field.revenue)}</p>
                      <p className="text-sm text-gray-500">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Giờ Cao Điểm</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.peakHours.map((hour, index) => {
              const maxBookings = Math.max(...analytics.peakHours.map(h => h.bookings));
              const percentage = (hour.bookings / maxBookings) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {hour.hour.slice(0, 2)}
                      </div>
                      <p className="font-medium text-gray-900">{hour.hour}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{hour.bookings} đặt sân</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Xu Hướng Doanh Thu</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg">7 ngày</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">30 ngày</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">90 ngày</button>
          </div>
        </div>
        <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600 mb-2">Biểu Đồ Doanh Thu</p>
            <p className="text-sm text-gray-500">Tích hợp với thư viện biểu đồ như Chart.js hoặc Recharts</p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(analytics.dailyRevenue)}</p>
                <p className="text-sm text-gray-500">Hôm nay</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(analytics.monthlyRevenue)}</p>
                <p className="text-sm text-gray-500">Tháng này</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(analytics.totalRevenue)}</p>
                <p className="text-sm text-gray-500">Tổng cộng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Field Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Hiệu Suất Từng Sân</h3>
          <PieChart className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên Sân</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng Đặt</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doanh Thu</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đánh Giá</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fields.map((field) => {
                const fieldAnalytics = analytics.popularFields.find(f => f.fieldName === field.name);
                return (
                  <tr key={field.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {field.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{field.name}</p>
                          <p className="text-sm text-gray-500">{field.sport}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">{field.totalBookings}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(fieldAnalytics?.revenue || 0)}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{field.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        field.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {field.isActive ? 'Hoạt động' : 'Tạm dừng'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;