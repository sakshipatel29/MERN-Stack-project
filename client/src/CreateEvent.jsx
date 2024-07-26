import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './AppContext';
import './App.css'; // Ensure this import if styles are not in a global CSS file

const CreateEvent = () => {
    const { email } = useContext(AppContext);
    const [eventName, setEventName] = useState('');
    const [keyValue, setKeyValue] = useState('');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const previewsContainerRef = useRef(null);
    const fileInputRef = useRef(null); // Added ref for file input

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const filteredFiles = newFiles.filter(newFile =>
            !files.some(file => file.name === newFile.name && file.size === newFile.size)
        );

        if (filteredFiles.length !== newFiles.length) {
            alert('Some files were already uploaded and will not be added again.');
        }

        setFiles(prevFiles => [...prevFiles, ...filteredFiles]);

        const newPreviews = filteredFiles.map(file => URL.createObjectURL(file));
        setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    };

    const handleDeleteFile = (index) => {
        setFiles(prevFiles => {
            const newFiles = prevFiles.filter((_, i) => i !== index);
            if (newFiles.length === 0) {
                fileInputRef.current.value = null; // Reset file input field when no files are left
            }
            return newFiles;
        });
        setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    };

    const handleEventNameChange = (e) => {
        setEventName(e.target.value);
    };

    const handleKeyValueChange = (e) => {
        setKeyValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eventName) {
            alert('Event name is required');
            return;
        }
        if (!keyValue) {
            alert('Secret key is required');
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('eventName', eventName);
        formData.append('keyValue', keyValue);

        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('http://localhost:3001/create-event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Event created and files uploaded successfully!');
            // Clear the form data
            setEventName('');
            setKeyValue('');
            setFiles([]);
            setPreviews([]);
            fileInputRef.current.value = null; // Reset file input field
        } catch (error) {
            console.error('Error uploading files', error);
            alert('Failed to create event or upload files');
        }
    };

    const scrollLeft = () => {
        previewsContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    };

    const scrollRight = () => {
        previewsContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    };

    return (
        <div className="container">
            <h2 className="Loginheader2">Create Event</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type='hidden' value={email} />
                <div className="form-group">
                    <label className="label">
                        <span className="icon">📅</span>Event Name
                    </label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={handleEventNameChange}
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">
                        <span className="icon">🔑</span>Enter Key
                    </label>
                    <input
                        type="text"
                        value={keyValue}
                        onChange={handleKeyValueChange}
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">
                        <span className="icon">📂</span>Upload Files
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="input"
                        ref={fileInputRef} // Attach ref to file input
                    />
                </div>
                {previews.length > 0 && (
                    <div className="previews-wrapper">
                        <button type="button" className="scroll-button left" onClick={scrollLeft}>&lt;</button>
                        <div className="previews-container" ref={previewsContainerRef}>
                            <div className="previews">
                                {previews.map((preview, index) => (
                                    <div key={index} className="preview">
                                        <img src={preview} alt={`file preview ${index}`} className="preview-image" />
                                        <button type="button" onClick={() => handleDeleteFile(index)} className="delete-button">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button type="button" className="scroll-button right" onClick={scrollRight}>&gt;</button>
                    </div>
                )}
                <button type="submit" className="button">Submit</button>
                <p className="accountexist">Want to go back?</p>
                <Link to="/home/share-photos" className="button">Share Photos</Link>
            </form>
        </div>
    );
};

export default CreateEvent;
