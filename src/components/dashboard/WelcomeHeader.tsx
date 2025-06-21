import React from 'react';

interface WelcomeHeaderProps {
  userName: string;
  businessName: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ userName, businessName }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold mb-1 lg:mb-2">Chào mừng trở lại, {userName}!</h1>
          <p className="text-blue-100 text-sm lg:text-base">Quản lý hiệu quả {businessName}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-blue-100">Hôm nay</p>
          <p className="text-lg lg:text-xl font-semibold">{new Date().toLocaleDateString('vi-VN')}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;