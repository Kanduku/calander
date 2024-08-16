import React, { useState } from 'react';
import Calendar from './Calendar';
import EventModal from './EventModal';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addEvent = (event) => {
    setEvents([...events, event]);
    setShowModal(false);
  };

  const editEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setShowModal(false);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const openModal = (event = null) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <div className="App">
      <h1>Rocky Calendar</h1>
      <button onClick={() => openModal()}>Add Event</button>
      <Calendar events={events} onEventClick={openModal} onDeleteEvent={deleteEvent} />
      {showModal && (
        <EventModal
          event={selectedEvent}
          onSave={selectedEvent ? editEvent : addEvent}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
