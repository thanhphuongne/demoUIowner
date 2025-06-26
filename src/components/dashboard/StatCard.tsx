import React from 'react';
import { TrendingUp, CheckCircle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    label: string;
    positive?: boolean;
  };
  additionalInfo?: React.ReactNode;
  useCheckCircle?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  additionalInfo,
  useCheckCircle = false 
}) => {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{value}</p>
        </div>
        <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center flex-shrink-0 ml-3">
          {icon}
        </div>
      </div>
      
      {(trend || additionalInfo) && (
        <div className="flex items-center mt-3 lg:mt-4 space-x-2">
          {useCheckCircle ? (
            <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-500 flex-shrink-0" />
          ) : (
            trend && (
              <>
                <TrendingUp className={`w-3 h-3 lg:w-4 lg:h-4 ${trend.positive !== false ? 'text-green-500' : 'text-red-500'} flex-shrink-0`} />
                <span className={`text-xs lg:text-sm font-medium ${trend.positive !== false ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.value}
                </span>
              </>
            )
          )}
          
          {trend && !useCheckCircle && (
            <span className="text-xs lg:text-sm text-gray-500 truncate">{trend.label}</span>
          )}
          
          {additionalInfo}
        </div>
      )}
    </div>
  );
};

export default StatCard;