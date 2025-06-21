import React from 'react';
import { DollarSign, Users, Calendar, Star } from 'lucide-react';
import { Analytics, Field } from '../../types';

interface KeyMetricsProps {
  analytics: Analytics;
  fields: Field[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

const KeyMetrics: React.FC<KeyMetricsProps> = ({ analytics, fields }) => {
  return (
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
  );
};

export default KeyMetrics;