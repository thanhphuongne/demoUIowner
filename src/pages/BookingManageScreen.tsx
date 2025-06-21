import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import BookingFilter from '../components/booking/BookingFilter';
import BookingListView from '../components/booking/BookingListView';
import BookingDetailModal from '../components/booking/BookingDetailModal';
import { useBookingStore } from '../stores/bookingStore';
import { Booking } from '../types';

const BookingManageScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  const { bookings, fetchBookings, updateBooking, deleteBooking } = useBookingStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.fieldName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || booking.date === selectedDate;
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  const handleConfirmBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBooking({ ...booking, status: 'confirmed' });
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBooking({ ...booking, status: 'cancelled' });
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    deleteBooking(bookingId);
    if (viewingBooking?.id === bookingId) {
      setViewingBooking(null);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSelectedDate('');
  };

  const handleExportReport = () => {
    console.log('Exporting report...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Đặt Sân</h1>
          <p className="text-gray-600">Theo dõi và quản lý tất cả các đặt sân</p>
        </div>
        <button 
          onClick={handleExportReport}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      <BookingFilter 
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        selectedDate={selectedDate}
        onSearchTermChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onSelectedDateChange={setSelectedDate}
        onClearFilters={handleClearFilters}
      />
      <BookingListView 
        bookings={filteredBookings}
        onViewBooking={setViewingBooking}
        onConfirmBooking={handleConfirmBooking}
        onCancelBooking={handleCancelBooking}
        onDeleteBooking={handleDeleteBooking}
      />

      <BookingDetailModal 
        booking={viewingBooking}
        onClose={() => setViewingBooking(null)}
        onConfirmBooking={handleConfirmBooking}
        onCancelBooking={handleCancelBooking}
        onDeleteBooking={handleDeleteBooking}
      />
    </div>
  );
};

export default BookingManageScreen;