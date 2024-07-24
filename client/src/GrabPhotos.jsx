import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const GrabPhotos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchKeyTerm, setSearchKeyTerm] = useState('');
    const [eventImages, setEventImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyValid, setIsKeyValid] = useState(false);

    const handleSearch = async () => {
        setEventImages([]); // Clear the previous images
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/event-images', {
                params: { eventName: searchTerm, keyValue: searchKeyTerm },
            });
            if (response.data && response.data.length > 0) {
                setIsKeyValid(true);
                setEventImages(response.data);
            } else {
                setIsKeyValid(false);
            }
        } catch (error) {
            console.error('Error fetching event images:', error);
            setIsKeyValid(false);
        }
        setIsLoading(false);
    };

    return (
        <div className="container">
            <h2 className="Loginheader2">Grab Photos</h2>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter event name"
                    className="search-input"
                />
                <button onClick={handleSearch} className="button">Search</button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    value={searchKeyTerm}
                    onChange={(e) => setSearchKeyTerm(e.target.value)}
                    placeholder="Enter secret key"
                    className="search-input"
                    required
                />
                <button onClick={handleSearch} className="button">Enter</button>
            </div>
            {isLoading ? (
                <p>Loading images...</p>
            ) : isKeyValid ? (
                <div className="images-list">
                    {eventImages.length > 0 ? (
                        eventImages.map((file, index) => {
                            const imageUrl = `http://localhost:3001/uploads/${searchTerm}/${file}`;
                            return (
                                <div key={index} className="image">
                                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                        <img src={imageUrl} alt={file} className="event-image" />
                                    </a>
                                </div>
                            );
                        })
                    ) : (
                        <p>No images available for this event.</p>
                    )}
                </div>
            ) : (
                <p>No images available for this event or incorrect key.</p>
            )}
        </div>
    );
};

export default GrabPhotos;
