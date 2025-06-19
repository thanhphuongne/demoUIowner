export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  phone: string;
  avatar?: string;
}

export interface Field {
  id: string;
  name: string;
  sport: string;
  description: string;
  images: string[];
  amenities: string[];
  hourlyRate: number;
  peakRate: number;
  openTime: string;
  closeTime: string;
  isActive: boolean;
  location: string;
  capacity: number;
  rating: number;
  totalBookings: number;
}

export interface Booking {
  id: string;
  fieldId: string;
  fieldName: string;
  customerName: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  notes?: string;
}

export interface Analytics {
  totalRevenue: number;
  monthlyRevenue: number;
  dailyRevenue: number;
  totalBookings: number;
  monthlyBookings: number;
  dailyBookings: number;
  averageBookingValue: number;
  popularFields: { fieldName: string; bookings: number; revenue: number }[];
  peakHours: { hour: string; bookings: number }[];
  customerRetention: number;
  cancellationRate: number;
}

export interface Activity {
  id: string;
  type: 'booking' | 'payment' | 'cancellation' | 'review';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info' | 'error';
}

export interface PaymentSettings {
  acceptedMethods: string[];
  commission: number;
  refundPolicy: string;
  payoutSchedule: string;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}