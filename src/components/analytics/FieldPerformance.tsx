import React from 'react';
import { PieChart, Star } from 'lucide-react';
import { Field } from '../../types';
import { Analytics } from '../../types';

interface FieldPerformanceProps {
  fields: Field[];
  analytics: Analytics;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const FieldPerformance: React.FC<FieldPerformanceProps> = ({ fields, analytics }) => {
  return (
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
  );
};

export default FieldPerformance;