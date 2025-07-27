import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}
function isUserLoggedIn(): boolean {
  try {
    const tokenData = localStorage.getItem('token');
    if (!tokenData) return false;
    const parsed = JSON.parse(tokenData);
    return !!parsed.isLoggedIn;
  } catch {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = isUserLoggedIn();

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;





