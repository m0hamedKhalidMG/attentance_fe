import React, { useEffect, useState } from 'react';
import './Messages.css';

function Messages() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const parentId = localStorage.getItem('parentId'); // Retrieve parentId from localStorage

    if (!parentId) {
      console.error('Parent ID not found in localStorage');
      return;
    }

    // Fetch attendance data from the backend using the parentId
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`https://attentance.vercel.app/attendance/${parentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }
        const data = await response.json();

        // Transform the data structure to match the component's state format
        const formattedAttendance = data.children.map((child) => ({
          childName: child.name,
          attendanceRecords: data.attendances.filter(record => record.childId === child._id).map(record => ({
            date: new Date(record.date).toLocaleDateString('ar-EG'),
            status: record.status,
            checkInTime: record.entryTime,
            checkOutTime: record.exitTime,
          })),
        }));

        setAttendance(formattedAttendance);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="messages-container">
      <h2>سجل الحضور والانصراف</h2>
      {attendance.map((child, index) => (
        <div key={index} className="child-attendance">
          <h3>{child.childName}</h3>
          <ul>
            {child.attendanceRecords.map((record, idx) => (
              <li
                key={idx}
                className={record.status === 'حضر' ? 'present' : 'absent'}
              >
                <span>
                  {record.date}: {record.status}
                </span>
                {record.status === 'حضر' && (
                  <span>
                    {' '}| وقت الحضور: {record.checkInTime} | وقت الانصراف:{' '}
                    {record.checkOutTime}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Messages;
