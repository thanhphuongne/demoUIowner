import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  dailyRevenue: number;
  monthlyRevenue: number;
  totalRevenue: number;
  formatCurrency: (amount: number) => string;
}

const generateChartData = (period: 'daily' | 'weekly' | 'monthly') => {
  if (period === 'daily') {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        name: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        revenue: Math.floor(Math.random() * 3000000) + 1000000
      };
    });
  } else if (period === 'weekly') {
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        name: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        revenue: Math.floor(Math.random() * 4000000) + 1500000
      };
    });
  } else {
    return Array.from({ length: 90 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (89 - i));
      return {
        name: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        revenue: Math.floor(Math.random() * 5000000) + 2000000
      };
    });
  }
};

const RevenueChart: React.FC<RevenueChartProps> = ({ 
  dailyRevenue, 
  monthlyRevenue, 
  totalRevenue,
  formatCurrency
}) => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [chartData, setChartData] = useState(generateChartData('daily'));

  const handlePeriodChange = (newPeriod: 'daily' | 'weekly' | 'monthly') => {
    setPeriod(newPeriod);
    setChartData(generateChartData(newPeriod));
  };

  const getXAxisProps = () => {
    if (period === 'daily') {
      return {
        dataKey: "name",
        tick: { fill: '#6b7280', fontSize: 12 }
      };
    } else if (period === 'weekly') {
      return {
        dataKey: "name",
        tick: { fill: '#6b7280', fontSize: 12 },
        interval: 4 
      };
    } else {
      return {
        dataKey: "name",
        tick: { fill: '#6b7280', fontSize: 12 },
        interval: 14 
      };
    }
  };

  return (
    <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Biểu Đồ Doanh Thu</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePeriodChange('daily')}
            className={`px-3 py-1 text-sm rounded-lg whitespace-nowrap ${
              period === 'daily' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            7 ngày
          </button>
          <button
            onClick={() => handlePeriodChange('weekly')}
            className={`px-3 py-1 text-sm rounded-lg whitespace-nowrap ${
              period === 'weekly' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            30 ngày
          </button>
          <button
            onClick={() => handlePeriodChange('monthly')}
            className={`px-3 py-1 text-sm rounded-lg whitespace-nowrap ${
              period === 'monthly' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            90 ngày
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis {...getXAxisProps()} />
            <YAxis 
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(Number(value)), 'Doanh thu']}
              labelStyle={{ color: '#1f2937', fontWeight: 500 }}
              contentStyle={{ 
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="revenue" 
              name="Doanh thu" 
              fill="#4f46e5" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium mb-1">Doanh thu hôm nay</p>
          <p className="text-xl font-bold text-blue-900">{formatCurrency(dailyRevenue)}</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-sm text-indigo-700 font-medium mb-1">Doanh thu tháng này</p>
          <p className="text-xl font-bold text-indigo-900">{formatCurrency(monthlyRevenue)}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-700 font-medium mb-1">Tổng doanh thu</p>
          <p className="text-xl font-bold text-purple-900">{formatCurrency(totalRevenue)}</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;