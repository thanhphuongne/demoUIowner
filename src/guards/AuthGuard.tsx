import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import ErrorPage from '../pages/ErrorPage';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Lưu URL hiện tại để redirect lại sau khi đăng nhập
      sessionStorage.setItem('redirectUrl', location.pathname);
    }
  }, [isAuthenticated, loading, location]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang kiểm tra đăng nhập...</div>;
  }

  if (!isAuthenticated) {
    return <ErrorPage errorType="unauthorized" />;
  }

  return <>{children}</>;
};

export default AuthGuard;