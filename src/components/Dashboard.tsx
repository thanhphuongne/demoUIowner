import React from "react";
import WelcomeHeader from "./dashboard/WelcomeHeader";
import StatCard from "./dashboard/StatCard";
import PopularFields from "./dashboard/PopularFields";
import RecentActivities from "./dashboard/RecentActivities";
import RevenueChart from "./dashboard/RevenueChart";
import {
  DollarSign,
  Calendar,
  MapPin,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { Analytics, Activity, Field } from "../types";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleString("vi-VN");
};

interface DashboardProps {
  analytics: Analytics;
  activities: Activity[];
  fields: Field[];
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({
  analytics,
  activities,
  fields,
  user,
}) => {
  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
      <WelcomeHeader userName={user.name} businessName={user.businessName} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          title="Doanh thu hôm nay"
          value={formatCurrency(analytics.dailyRevenue)}
          icon={
            <div className="bg-green-100 rounded-lg lg:rounded-xl w-full h-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
          }
          trend={{
            value: "+12.5%",
            label: "so với hôm qua",
            positive: true,
          }}
        />

        <StatCard
          title="Đặt sân hôm nay"
          value={analytics.dailyBookings}
          icon={
            <div className="bg-blue-100 rounded-lg lg:rounded-xl w-full h-full flex items-center justify-center">
              <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
          }
          trend={{
            value: "+8.2%",
            label: "so với hôm qua",
            positive: true,
          }}
        />

        <StatCard
          title="Tổng số sân"
          value={fields.length}
          icon={
            <div className="bg-purple-100 rounded-lg lg:rounded-xl w-full h-full flex items-center justify-center">
              <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
          }
          additionalInfo={
            <span className="text-xs lg:text-sm text-green-600 font-medium">
              {fields.filter((f) => f.isActive).length} hoạt động
            </span>
          }
          useCheckCircle={true}
        />

        <StatCard
          title="Giá trị trung bình"
          value={formatCurrency(analytics.averageBookingValue)}
          icon={
            <div className="bg-yellow-100 rounded-lg lg:rounded-xl w-full h-full flex items-center justify-center">
              <TrendingUpIcon className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
            </div>
          }
          trend={{
            value: "+5.7%",
            label: "so với tháng trước",
            positive: true,
          }}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <PopularFields
          popularFields={analytics.popularFields}
          formatCurrency={formatCurrency}
        />
        <RecentActivities activities={activities} formatTime={formatTime} />
      </div>

      <RevenueChart
        dailyRevenue={analytics.dailyRevenue}
        monthlyRevenue={analytics.monthlyRevenue}
        totalRevenue={analytics.totalRevenue}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default Dashboard;
