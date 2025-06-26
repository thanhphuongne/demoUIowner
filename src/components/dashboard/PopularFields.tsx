import React from 'react';
import { TrendingUp } from 'lucide-react';

interface PopularField {
  fieldName: string;
  bookings: number;
  revenue: number;
}

interface PopularFieldsProps {
  popularFields: PopularField[];
  formatCurrency: (amount: number) => string;
}

const PopularFields: React.FC<PopularFieldsProps> = ({ popularFields, formatCurrency }) => {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Sân Phổ Biến</h3>
        <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
      </div>
      <div className="space-y-3 lg:space-y-4">
        {popularFields.map((field, index) => (
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
  );
};

export default PopularFields;