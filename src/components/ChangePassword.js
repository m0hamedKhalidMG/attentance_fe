import React, { useState } from 'react';
import './ChangePassword.css';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage('كلمات المرور غير متطابقة');
      return;
    }

    try {
      const parentId = localStorage.getItem('parentId'); // Retrieve parentId from localStorage

      if (!parentId) {
        setMessage('لم يتم العثور على معرف المستخدم');
        return;
      }

      const response = await fetch(`https://attentance.vercel.app/parent/${parentId}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setMessage('تم تغيير كلمة المرور بنجاح');
      } else {
        const errorData = await response.json();
        setMessage(`فشل في تغيير كلمة المرور: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('حدث خطأ أثناء تغيير كلمة المرور');
    }
  };

  return (
    <div className="change-password-container">
      <h2>تغيير كلمة المرور</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>كلمة المرور الجديدة</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label>تأكيد كلمة المرور</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">تحديث</button>
      </form>
    </div>
  );
}

export default ChangePassword;
