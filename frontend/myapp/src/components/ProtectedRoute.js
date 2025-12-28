// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const email = localStorage.getItem('email'); // or get it from state/context if you use that

  if (!email) {
    // Redirect to login page if email is missing
    return <Navigate to="/LoginPage" replace />;
  }

  // If email exists, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
