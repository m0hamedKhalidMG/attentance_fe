// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Messages from './components/Messages';
import ChangePassword from './components/ChangePassword';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute'
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/register"
              element={
                <AdminRoute allowedId="672e5cfaa57f1d7830649217">
                  <Register />
                </AdminRoute>
              }
            />
            <Route path="/messages" element={<ProtectedRoute element={<Messages />} />} />
            <Route path="/change-password" element={<ProtectedRoute element={<ChangePassword />} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
