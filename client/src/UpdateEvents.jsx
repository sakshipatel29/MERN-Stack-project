import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const UpdateEvents = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/events');
                console.log('Fetched events:', response.data); // Log the fetched data
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleViewImages = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseImages = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="container">
            <h2 className="Loginheader2">Update Events</h2>
            {selectedEvent && (
                <div className="modal">
                    <button onClick={handleCloseImages} className="close-button">Close</button>
                    <h2 className="modal-header">{selectedEvent.eventName} - Images</h2>
                    <div className="images-list">
                        {selectedEvent.files && selectedEvent.files.length > 0 ? (
                            selectedEvent.files.map((file, index) => (
                                <div key={index} className="image">
                                    <a href={`uploads/${selectedEvent.eventName}/${file}`} target="_blank" rel="noopener noreferrer">
                                        <img src={`uploads/${selectedEvent.eventName}/${file}`} alt={file} className="event-image" />
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>No images available for this event.</p>
                        )}
                    </div>
                </div>
            )}
            <div className="table-container">
                <table className="events-table">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Created By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length > 0 ? (
                            events.map((event) => (
                                <tr key={event._id}>
                                    <td>{event.eventName}</td>
                                    <td>{event.email}</td>
                                    <td>
                                        <button onClick={() => handleViewImages(event)} className="button">View</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="no-events">No events found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpdateEvents;
