// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children, allowedId }) {
  const parentId = localStorage.getItem('parentId');
  // Check if the parentId matches the allowedId
  if (parentId === allowedId && parentId !== undefined && parentId !== null) {
    return children;
  } else {
    // Redirect to home if not allowed
    return <Navigate to="/" />;
  }
}

export default AdminRoute;
