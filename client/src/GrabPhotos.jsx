import React, { useState } from 'react';
import axios from 'axios';
import FaceRecognition from './FaceRecognition';
import './App.css';

const GrabPhotos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchKeyTerm, setSearchKeyTerm] = useState('');
    const [eventImages, setEventImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyValid, setIsKeyValid] = useState(false);
    const [showFaceRecognition, setShowFaceRecognition] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [matchingImages, setMatchingImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleSearch = async () => {
        setEventImages([]);
        setIsLoading(true);
        console.log('Search parameters:', searchTerm, searchKeyTerm); // Log the values
        try {
            const response = await axios.get('http://localhost:3001/grab-event-images', {
                params: { eventName: searchTerm, keyValue: searchKeyTerm },
            });
            console.log('Backend response:', response.data); // Log the backend response
            if (response.data && response.data.length > 0) {
                setIsKeyValid(true);
                setEventImages(response.data);
            } else {
                setIsKeyValid(false);
            }
        } catch (error) {
            console.error('Error fetching event images:', error);
            setIsKeyValid(false);
            alert("Enter correct credentials!");
        }
        setIsLoading(false);
    };
    

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('eventName', searchTerm);

        try {
            // Send file to backend for face recognition
            const response = await axios.post('http://localhost:3001/recognize-face', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMatchingImages(response.data); // Set the filtered matching images
        } catch (error) {
            console.error('Error recognizing face:', error);
            alert('Error recognizing face!');
        }
        setIsUploading(false);
    };

    return (
        <div className="container">
            <h2 className="Loginheader2">Grab Photos</h2>

            {/* Event name and key search */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter event name"
                    className="search-input"
                />
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
                <button onClick={handleSearch} className="button">Search</button>
            </div>

            {/* Loading spinner */}
            {isLoading ? (
                <p>Loading images...</p>
            ) : isKeyValid ? (
                <div>
                    {/* Display all event images */}
                    <div className="images-list">
                        {eventImages.length > 0 ? (
                            eventImages.map((file, index) => {
                                const imageUrl = `http://localhost:3001/uploads/${searchTerm}/${file}`;
                                return (
                                    <div key={index} className="image">
                                        {searchTerm && (
                                            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                                <img src={imageUrl} alt={file} className="event-image" />
                                            </a>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <p>No images available for this event.</p>
                        )}
                    </div>

                    {/* Face recognition upload form */}
                    <div className="face-recognition-container">
                        <h3>Upload Your Photo</h3>
                        <form onSubmit={handleFileSubmit} className="upload-form">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                aria-label="Select an image to scan"
                            />
                            <button type="submit">Upload and Scan</button>
                        </form>

                        {isUploading ? (
                            <div className="spinner"></div> // Your spinner here
                        ) : (
                            <div className="matching-images">
                                {matchingImages.length > 0 ? (
                                    matchingImages.map((image, index) => (
                                        <div key={index} className="image">
                                            <img
                                                src={`http://localhost:3001/uploads/${searchTerm}/${image}`}
                                                alt={image}
                                                className="event-image"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No matching images found.</p>
                                )}
                            </div>
                        )}
                    </div>

                    <button onClick={() => setShowFaceRecognition(true)} className="button">Get Your Photos</button>
                    {showFaceRecognition && <FaceRecognition searchTerm={searchTerm} />}
                </div>
            ) : (
                <p>Invalid key. Please try again!</p>
            )}
        </div>
    );
};

export default GrabPhotos;
