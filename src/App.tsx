import React, { useState } from 'react';
import Navigation from './components/Navigation';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import FieldManagement from './components/FieldManagement';
import BookingManagement from './components/BookingManagement';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import { 
  mockUser, 
  mockFields, 
  mockBookings, 
  mockAnalytics, 
  mockActivities, 
  mockPaymentSettings 
} from './data/mockData';
import { Field, Booking, User, PaymentSettings } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(mockUser);
  const [fields, setFields] = useState(mockFields);
  const [bookings, setBookings] = useState(mockBookings);
  const [paymentSettings, setPaymentSettings] = useState(mockPaymentSettings);

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const handleUpdateField = (updatedField: Field) => {
    setFields(prev => prev.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
  };

  const handleAddField = (newField: Omit<Field, 'id'>) => {
    const field: Field = {
      ...newField,
      id: Date.now().toString(),
    };
    setFields(prev => [...prev, field]);
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings(prev => prev.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleUpdatePaymentSettings = (updatedSettings: PaymentSettings) => {
    setPaymentSettings(updatedSettings);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 overflow-auto lg:ml-0">
        {activeTab === 'dashboard' && (
          <Dashboard 
            analytics={mockAnalytics}
            activities={mockActivities}
            fields={fields}
            user={user}
          />
        )}
        
        {activeTab === 'fields' && (
          <FieldManagement 
            fields={fields}
            onUpdateField={handleUpdateField}
            onAddField={handleAddField}
          />
        )}
        
        {activeTab === 'bookings' && (
          <BookingManagement 
            bookings={bookings}
            fields={fields}
            onUpdateBooking={handleUpdateBooking}
          />
        )}
        
        {activeTab === 'analytics' && (
          <Analytics 
            analytics={mockAnalytics}
            fields={fields}
          />
        )}
        
        {activeTab === 'settings' && (
          <Settings 
            user={user}
            paymentSettings={paymentSettings}
            onUpdateUser={handleUpdateUser}
            onUpdatePaymentSettings={handleUpdatePaymentSettings}
          />
        )}
      </div>
    </div>
  );
}

export default App;