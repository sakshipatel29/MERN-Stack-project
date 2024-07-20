import React from 'react';
import { useNavigate } from 'react-router-dom';
import createeventPhoto from './assets/createevents.png';
import updateeventPhoto from './assets/updateevents.jpg';
import './App.css'; // Ensure this is the correct path to your CSS file

const SharePhotos = () => {
    const navigate = useNavigate();

    const handleCreateEvent = () => {
        navigate('/home/share-photos/create-event');
    };

    const handleUpdateEvents = () => {
        navigate('/home/share-photos/update-events');
    };

    return (
        <div className="container homecontainer">
            <h2 className="Loginheader2">Create/Update Events</h2>
            <div className="image-group">
                <div className="image-container" onClick={handleCreateEvent}>
                    <img src={createeventPhoto} alt="Create Event" className="image" />
                    <div className="overlay">
                        <div className="hometext">Create Event</div>
                    </div>
                </div>
                <div className="image-container" onClick={handleUpdateEvents}>
                    <img src={updateeventPhoto} alt="Update Events" className="image" />
                    <div className="overlay">
                        <div className="hometext">Update Events</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharePhotos;