import React, { useState, useEffect } from 'react';
import './EventModal.css';

const EventModal = ({ event, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('Work');
  const [color, setColor] = useState('#007bff');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setTime(event.time || '');
      setCategory(event.category);
      setColor(event.color || '#007bff');
      setDescription(event.description || '');
    }
  }, [event]);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!title) {
      tempErrors["title"] = "Title is required";
      isValid = false;
    }

    if (!date) {
      tempErrors["date"] = "Date is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const newEvent = {
        id: event ? event.id : Date.now(),
        title,
        date,
        time,
        category,
        color,
        description,
      };
      onSave(newEvent);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <label>Description</label>
            <textarea
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
