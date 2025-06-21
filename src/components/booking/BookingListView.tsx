import React from 'react';
import { Eye, Check, X, Trash2 } from 'lucide-react';
import { Booking } from '../../types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN');
};

const formatTime = (time: string) => time.slice(0, 5);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed': return 'Đã xác nhận';
    case 'pending': return 'Chờ xác nhận';
    case 'cancelled': return 'Đã hủy';
    case 'completed': return 'Hoàn thành';
    default: return status;
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'refunded': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentStatusText = (status: string) => {
  switch (status) {
    case 'paid': return 'Đã thanh toán';
    case 'pending': return 'Chờ thanh toán';
    case 'refunded': return 'Đã hoàn tiền';
    default: return status;
  }
};

interface BookingListViewProps {
  bookings: Booking[];
  onViewBooking: (booking: Booking) => void;
  onConfirmBooking: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onDeleteBooking: (bookingId: string) => void;
}

const BookingListView: React.FC<BookingListViewProps> = ({
  bookings,
  onViewBooking,
  onConfirmBooking,
  onCancelBooking,
  onDeleteBooking
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sân
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thanh toán
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="font-medium text-gray-900">{booking.customerName}</p>
                    <p className="text-sm text-gray-500">{booking.customerPhone}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-medium text-gray-900">{booking.fieldName}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="font-medium text-gray-900">{formatDate(booking.date)}</p>
                    <p className="text-sm text-gray-500">
                      {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-medium text-gray-900">{formatCurrency(booking.totalAmount)}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                    {getPaymentStatusText(booking.paymentStatus)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewBooking(booking)}
                      className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onConfirmBooking(booking.id)}
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Xác nhận"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onCancelBooking(booking.id)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          title="Hủy"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                     <button
                      onClick={() => onDeleteBooking(booking.id)}
                      className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <p className="text-gray-500">Không có đặt sân nào phù hợp với bộ lọc</p>
        </div>
      )}
    </div>
  );
};

export default BookingListView;