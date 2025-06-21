import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainLayout from './pages/MainLayout';
import DashboardPage from './pages/DashboardPage';
import ManageFieldPage from './pages/ManageFieldPage';
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';
import ErrorPage from './pages/ErrorPage';
import BookingManageScreen from './pages/BookingManageScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/error" element={<ErrorPage errorType="forbidden" />} />
        <Route element={
          <AuthGuard>
            <RoleGuard allowedRoles={['admin', 'owner']}>
              <MainLayout />
            </RoleGuard>
          </AuthGuard>
        }>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/fields" element={<ManageFieldPage />} />
          <Route path="/bookings" element={<BookingManageScreen />} />
        </Route>
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;