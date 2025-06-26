import React from 'react';
import { Activity as ActivityIcon } from 'lucide-react';
import { DollarSign, Calendar, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  status: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  formatTime: (timestamp: string) => string;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities, formatTime }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'payment': return DollarSign;
      case 'cancellation': return AlertCircle;
      default: return ActivityIcon;
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
    <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Hoạt Động Gần Đây</h3>
        <ActivityIcon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
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
  );
};

export default RecentActivities;