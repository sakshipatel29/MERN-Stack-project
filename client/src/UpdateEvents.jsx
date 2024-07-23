import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './AppContext';
import './App.css';

const UpdateEvents = () => {
    const { email } = useContext(AppContext);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventImages, setEventImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/events', {
                    params: { email },
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [email]);

    const handleViewImages = async (event) => {
        setSelectedEvent(event);
        setIsEditing(false);
        try {
            const response = await axios.get('http://localhost:3001/event-images', {
                params: { eventName: event.eventName },
            });
            setEventImages(response.data);
        } catch (error) {
            console.error('Error fetching event images:', error);
        }
    };

    const handleEditEvent = async (event) => {
        setSelectedEvent(event);
        setIsEditing(true);
        try {
            const response = await axios.get('http://localhost:3001/event-images', {
                params: { eventName: event.eventName },
            });
            setEventImages(response.data);
        } catch (error) {
            console.error('Error fetching event images:', error);
        }
    };

    const handleFileChange = (e) => {
        setNewImages(e.target.files);
    };

    const handleDeleteImage = async (imageName) => {
        try {
            await axios.delete('http://localhost:3001/delete-image', {
                data: { eventName: selectedEvent.eventName, imageName },
            });
            setEventImages(eventImages.filter(image => image !== imageName));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleUpdateEvent = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('eventName', selectedEvent.eventName);

        Array.from(newImages).forEach(file => {
            formData.append('files', file);
        });

        try {
            await axios.post('http://localhost:3001/update-event', formData);
            setNewImages([]);
            handleViewImages(selectedEvent); // Refresh images
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
        setEventImages([]);
        setNewImages([]);
        setIsEditing(false);
    };

    return (
        <div className="container">
            <h2 className="Loginheader2">Update Events</h2>
            {selectedEvent && (
                <>
                    <div className="u_overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                        <button onClick={handleCloseModal} className="close-button">×</button>
                        <h2 className="modal-header">{selectedEvent.eventName} - {isEditing ? 'Edit' : 'View'} Details</h2>
                        <p className='event-modal'><strong>Event Name:</strong> {selectedEvent.eventName}</p>
                        <p className='event-modal'><strong>Secret Key:</strong> {selectedEvent.keyValue}</p>
                        <div className="images-list">
                            {eventImages.length > 0 ? (
                                eventImages.map((file, index) => (
                                    <div key={index} className="image">
                                        <a href={`http://localhost:3001/uploads/${selectedEvent.eventName}/${file}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`http://localhost:3001/uploads/${selectedEvent.eventName}/${file}`} alt={file} className="event-image" />
                                        </a>
                                        {isEditing && (
                                            <button onClick={() => handleDeleteImage(file)} className="delete-button">Delete</button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No images available for this event.</p>
                            )}
                        </div>
                        {isEditing && (
                            <>
                                <input type="file" multiple onChange={handleFileChange} />
                                <button onClick={handleUpdateEvent} className="update-button">Update</button>
                            </>
                        )}
                    </div>
                </>
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
                                        &nbsp;
                                        <button onClick={() => handleEditEvent(event)} className="button">Edit</button>
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
