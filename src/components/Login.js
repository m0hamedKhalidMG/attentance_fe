import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [parentName, setParentName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Import and initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://attentance.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parentName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the token and parent ID to localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('parentId', data.parentId); // Assuming `parentId` is returned from the server
        alert('تسجيل الدخول ناجح');
        // Navigate to the messages page
        navigate('/messages');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('حدث خطأ أثناء الاتصال بالخادم');
    }
  };

  return (
    <div className="login-container">
      <h2>تسجيل الدخول</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>اسم الأب</label>
        <input
          type="text"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          required
        />

        <label>كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">تسجيل الدخول</button>
      </form>
    </div>
  );
}

export default Login;
