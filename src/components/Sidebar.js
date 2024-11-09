// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  // Get the parentId from localStorage
  const parentId = localStorage.getItem('parentId');
  const allowedId = '672e5cfaa57f1d7830649217';

  const handleLogout = () => {
    // Clear the parentId from localStorage
    localStorage.removeItem('parentId');
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="sidebar">
      <img src="/images/profile.jpg" alt="Profile" className="sidebar-image" />
      <h2>نظام الحضور</h2>
      <ul>
        <li>
          <Link to="/">الصفحة الرئيسية</Link>
        </li>
        <li>
          <Link to="/messages">الرسائل</Link>
        </li>
        <li>
          <Link to="/change-password">تغيير كلمة المرور</Link>
        </li>
        {/* Display the link only if parentId matches allowedId */}
        {parentId === allowedId && (
          <li>
            <Link to="/register">تسجيل الأبناء</Link>
          </li>
        )}
      </ul>
      {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">
        تسجيل الخروج
      </button>
    </div>
  );
}

export default Sidebar;
