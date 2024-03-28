// src/auth/ProtectedRoute.js or src/components/auth/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = localStorage.getItem('token'); // Adjust this to match how you store the token
  return user ? true : false;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
