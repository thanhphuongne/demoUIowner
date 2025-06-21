import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Booking } from '../../types';

interface BookingCalendarViewProps {
  currentDate: Date;
  bookings: Booking[];
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onDayClick?: (date: Date) => void;
}

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

const BookingCalendarView: React.FC<BookingCalendarViewProps> = ({
  currentDate,
  bookings,
  onPreviousMonth,
  onNextMonth,
  onDayClick
}) => {
  const today = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());

  const days = [];
  const current = new Date(startDate);
  
  while (current <= endOfMonth || current.getDay() !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const getDayBookings = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button onClick={onPreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={onNextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayBookings = getDayBookings(day);
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = day.toDateString() === today.toDateString();

            return (
              <div 
                key={index} 
                className={`min-h-[100px] p-2 border border-gray-100 cursor-pointer ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                }`}
                onClick={() => onDayClick && onDayClick(day)}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isToday ? 'text-blue-600' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayBookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className={`text-xs p-1 rounded truncate ${getStatusColor(booking.status)}`}>
                      {formatTime(booking.startTime)} {booking.fieldName}
                    </div>
                  ))}
                  {dayBookings.length > 3 && (
                    <div className="text-xs text-gray-500">+{dayBookings.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendarView;