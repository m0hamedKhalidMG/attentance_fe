// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, ...rest }) {
  const parentId = localStorage.getItem('parentId');

  // Check if parentId exists in localStorage
  return parentId ? element : <Navigate to="/" replace />;
}

export default ProtectedRoute;
