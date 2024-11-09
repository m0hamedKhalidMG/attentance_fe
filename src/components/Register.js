import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [parentName, setParentName] = useState('');
  const [password, setPassword] = useState(''); // New state for password
  const [children, setChildren] = useState([{ name: '', identifier: '' }]);

  const handleParentNameChange = (e) => {
    setParentName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // New handler for password change
  };

  const handleChildChange = (index, field, value) => {
    const newChildren = [...children];
    newChildren[index][field] = value;
    setChildren(newChildren);
  };

  const addChild = () => {
    setChildren([...children, { name: '', identifier: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      parentName,
      password, // Include password in the request data
      children,
    };
    console.log('Request Data:', requestData);

    try {
      const response = await fetch('https://attentance.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
console.log(response)
      if (response.ok) {
        const data = await response.json();
        alert(`تم تسجيل الأب ${data.parentName} مع ${children.length} ابن(أبناء).`);
        setParentName('');
        setPassword(''); // Clear password after successful registration
        setChildren([{ name: '', identifier: '' }]);
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        alert('حدث خطأ أثناء التسجيل.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء الاتصال بالخادم.');
    }
  };

  return (
    <div className="register-container">
      <h2>تسجيل الأبناء</h2>
      <form onSubmit={handleSubmit}>
        <label>اسم الأب:</label>
        <input
          type="text"
          value={parentName}
          onChange={handleParentNameChange}
          required
        />

        <label>كلمة المرور:</label> {/* New password field */}
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <h3>أبناء</h3>
        {children.map((child, index) => (
          <div key={index} className="child-entry">
            <label>اسم الابن:</label>
            <input
              type="text"
              value={child.name}
              onChange={(e) => handleChildChange(index, 'name', e.target.value)}
              required
            />

            <label>الرقم التعريفي للابن:</label>
            <input
              type="text"
              value={child.identifier}
              onChange={(e) =>
                handleChildChange(index, 'identifier', e.target.value)
              }
              required
            />
          </div>
        ))}

        <button type="button" onClick={addChild}>
          إضافة ابن آخر
        </button>
        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
}

export default Register;
