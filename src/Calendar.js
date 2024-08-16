import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ events, onEventClick, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const dayEvents = events.filter(event => new Date(event.date).getDate() === i && new Date(event.date).getMonth() === currentDate.getMonth());
      const isToday = new Date().getDate() === i && new Date().getMonth() === currentDate.getMonth();

      days.push(
        <div key={i} className={`day ${isToday ? 'today' : ''}`}>
          <span>{i}</span>
          {dayEvents.map(event => (
            <div key={event.id} className="event" onClick={() => onEventClick(event)}>
              {event.title}
              <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}>X</button>
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysInWeek.map(day => <div key={day} className="day-name">{day}</div>)}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
