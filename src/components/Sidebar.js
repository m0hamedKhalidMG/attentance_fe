import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Get the parentId from localStorage
  const parentId = localStorage.getItem('parentId');
  const allowedId = '672e5cfaa57f1d7830649217';

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('parentId');
    navigate('/');
  };

  return (
    <>
      {/* Button to toggle sidebar */}
      <button onClick={handleToggleSidebar} className="toggle-button">
        ☰
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <img src="/images/profile.jpg" alt="Profile" className="sidebar-image" />
        <h2>نظام الحضور</h2>
        <ul>
          <li><Link to="/">الصفحة الرئيسية</Link></li>
          <li><Link to="/messages">الرسائل</Link></li>
          <li><Link to="/change-password">تغيير كلمة المرور</Link></li>
          {parentId === allowedId && (
            <li><Link to="/register">تسجيل الأبناء</Link></li>
          )}
        </ul>
        <button onClick={handleLogout} className="logout-button">تسجيل الخروج</button>
      </div>
    </>
  );
}

export default Sidebar;
