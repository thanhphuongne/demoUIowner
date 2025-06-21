import React from 'react';
import { Clock } from 'lucide-react';
import { Analytics } from '../../types';

interface PeakHoursProps {
  analytics: Analytics;
}

const PeakHours: React.FC<PeakHoursProps> = ({ analytics }) => {
  return (
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
  );
};

export default PeakHours;