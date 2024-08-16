import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { v4 as uuidv4 } from 'uuid';
import './EventForm.css';

const EventForm = ({ selectedEvent, closeModal }) => {
  const { addEvent, editEvent } = useContext(EventContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [date, setDate] = useState(selectedEvent ? selectedEvent.date : '');
  const [time, setTime] = useState(selectedEvent ? selectedEvent.time : '');
  const [category, setCategory] = useState(selectedEvent ? selectedEvent.category : 'Work');
  const [color, setColor] = useState(selectedEvent ? selectedEvent.color : '#007bff');
  const [recurring, setRecurring] = useState(selectedEvent ? selectedEvent.recurring : 'None');
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!title) {
      tempErrors["title"] = "Title is required";
      isValid = false;
    }

    if (new Date(date) < new Date()) {
      tempErrors["date"] = "Date cannot be in the past";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const event = {
        id: selectedEvent ? selectedEvent.id : uuidv4(),
        title,
        date,
        time,
        category,
        color,
        recurring
      };
      selectedEvent ? editEvent(event) : addEvent(event);
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-group">
        <label>Event Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          required
        />
        {errors["title"] && <span className="error">{errors["title"]}</span>}
      </div>
      
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        {errors["date"] && <span className="error">{errors["date"]}</span>}
      </div>

      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div className="form-group">
        <label>Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Recurring</label>
        <select value={recurring} onChange={(e) => setRecurring(e.target.value)}>
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </div>
    </form>
  );
};

export default EventForm;
