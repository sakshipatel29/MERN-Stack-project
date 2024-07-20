import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const UpdateEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Update Events</h1>
      <div className="events-list">
        {events.map((event) => (
          <div key={event._id} className="event">
            <h2>{event.eventName}</h2>
            <p>Created by: {event.email}</p>
            <p>Secret Key: {event.keyValue}</p>
            <div className="files-list">
              {event.files.map((file, index) => (
                <div key={index} className="file">
                  <a href={`uploads/${file}`} target="_blank" rel="noopener noreferrer">
                    {file}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateEvents;
