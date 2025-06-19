import { Field, Booking, Analytics, Activity, PaymentSettings, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Nguyễn Văn An',
  email: 'an.nguyen@example.com',
  businessName: 'Sân Thể Thao Quy Nhơn Pro',
  phone: '+84 123 456 789',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
};

export const mockFields: Field[] = [
  {
    id: '1',
    name: 'Sân Bóng Đá Số 1',
    sport: 'Football',
    description: 'Sân bóng đá cỏ nhân tạo chất lượng cao với hệ thống chiếu sáng LED hiện đại',
    images: [
      'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159698/football-player-ball-footballer-competition-159698.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Parking', 'Lighting', 'Changing Room', 'Shower', 'Water'],
    hourlyRate: 200000,
    peakRate: 300000,
    openTime: '06:00',
    closeTime: '22:00',
    isActive: true,
    location: 'Quận Quy Nhơn, Bình Định',
    capacity: 22,
    rating: 4.8,
    totalBookings: 145
  },
  {
    id: '2',
    name: 'Sân Tennis Court A',
    sport: 'Tennis',
    description: 'Sân tennis tiêu chuẩn quốc tế với mặt sân acrylic chuyên nghiệp',
    images: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Parking', 'Lighting', 'Equipment Rental', 'Water', 'Seating'],
    hourlyRate: 150000,
    peakRate: 200000,
    openTime: '06:00',
    closeTime: '21:00',
    isActive: true,
    location: 'Quận Quy Nhơn, Bình Định',
    capacity: 4,
    rating: 4.6,
    totalBookings: 89
  },
  {
    id: '3',
    name: 'Sân Cầu Lông VIP',
    sport: 'Badminton',
    description: 'Sân cầu lông trong nhà với hệ thống điều hòa và âm thanh hiện đại',
    images: [
      'https://images.pexels.com/photos/163444/sport-tenis-ball-tennis-163444.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Air Conditioning', 'Sound System', 'Parking', 'Changing Room', 'Equipment Rental'],
    hourlyRate: 100000,
    peakRate: 150000,
    openTime: '07:00',
    closeTime: '23:00',
    isActive: true,
    location: 'Quận Quy Nhơn, Bình Định',
    capacity: 4,
    rating: 4.9,
    totalBookings: 203
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    fieldId: '1',
    fieldName: 'Sân Bóng Đá Số 1',
    customerName: 'Trần Văn Bình',
    customerPhone: '+84 987 654 321',
    date: '2025-01-15',
    startTime: '19:00',
    endTime: '21:00',
    duration: 2,
    totalAmount: 600000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2025-01-14T10:30:00Z',
    notes: 'Đặt sân cho trận đấu giao hữu'
  },
  {
    id: '2',
    fieldId: '2',
    fieldName: 'Sân Tennis Court A',
    customerName: 'Lê Thị Cẩm',
    customerPhone: '+84 909 123 456',
    date: '2025-01-16',
    startTime: '08:00',
    endTime: '10:00',
    duration: 2,
    totalAmount: 300000,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2025-01-15T09:15:00Z'
  },
  {
    id: '3',
    fieldId: '3',
    fieldName: 'Sân Cầu Lông VIP',
    customerName: 'Phạm Minh Đức',
    customerPhone: '+84 912 345 678',
    date: '2025-01-15',
    startTime: '20:00',
    endTime: '22:00',
    duration: 2,
    totalAmount: 300000,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2025-01-13T14:20:00Z'
  }
];

export const mockAnalytics: Analytics = {
  totalRevenue: 45600000,
  monthlyRevenue: 12400000,
  dailyRevenue: 1200000,
  totalBookings: 437,
  monthlyBookings: 87,
  dailyBookings: 12,
  averageBookingValue: 280000,
  popularFields: [
    { fieldName: 'Sân Cầu Lông VIP', bookings: 203, revenue: 18500000 },
    { fieldName: 'Sân Bóng Đá Số 1', bookings: 145, revenue: 16800000 },
    { fieldName: 'Sân Tennis Court A', bookings: 89, revenue: 10300000 }
  ],
  peakHours: [
    { hour: '19:00', bookings: 45 },
    { hour: '20:00', bookings: 52 },
    { hour: '18:00', bookings: 38 },
    { hour: '21:00', bookings: 34 }
  ],
  customerRetention: 78.5,
  cancellationRate: 5.2
};

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Đặt sân mới',
    description: 'Trần Văn Bình đã đặt Sân Bóng Đá Số 1 vào 19:00 ngày 15/01',
    timestamp: '2025-01-14T10:30:00Z',
    status: 'success'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Thanh toán thành công',
    description: 'Nhận được thanh toán 600,000 VNĐ từ Trần Văn Bình',
    timestamp: '2025-01-14T10:32:00Z',
    status: 'success'
  },
  {
    id: '3',
    type: 'booking',
    title: 'Đặt sân chờ xác nhận',
    description: 'Lê Thị Cẩm đặt Sân Tennis Court A vào 08:00 ngày 16/01',
    timestamp: '2025-01-15T09:15:00Z',
    status: 'warning'
  }
];

export const mockPaymentSettings: PaymentSettings = {
  acceptedMethods: ['Cash', 'Bank Transfer', 'E-Wallet', 'Credit Card'],
  commission: 5,
  refundPolicy: 'Hoàn tiền 100% nếu hủy trước 24 giờ',
  payoutSchedule: 'Weekly',
  bankDetails: {
    accountName: 'Nguyễn Văn An',
    accountNumber: '1234567890',
    bankName: 'Vietcombank'
  }
};