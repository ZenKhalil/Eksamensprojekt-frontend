import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth();

  if (!auth.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
