import React from 'react';
import { Download } from 'lucide-react';

interface BookingManagementHeaderProps {
  viewMode: 'list' | 'calendar';
  onViewModeChange: (mode: 'list' | 'calendar') => void;
  onExportReport: () => void;
}

const BookingManagementHeader: React.FC<BookingManagementHeaderProps> = ({
  viewMode,
  onViewModeChange,
  onExportReport
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản Lý Đặt Sân</h1>
        <p className="text-gray-600">Theo dõi và quản lý tất cả các đặt sân</p>
      </div>
      <div className="flex space-x-3">
        <button 
          onClick={onExportReport}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Xuất báo cáo</span>
        </button>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            Danh sách
          </button>
          <button
            onClick={() => onViewModeChange('calendar')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            Lịch
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingManagementHeader;