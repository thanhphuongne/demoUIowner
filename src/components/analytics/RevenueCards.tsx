import React from 'react';
import { DollarSign, Calendar, Users, TrendingUp } from 'lucide-react';
import { Analytics } from '../../types';

interface RevenueCardsProps {
  analytics: Analytics;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const RevenueCards: React.FC<RevenueCardsProps> = ({ analytics }) => {
  return (
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
  );
};

export default RevenueCards;