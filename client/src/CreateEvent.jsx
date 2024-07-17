import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('eventName', eventName);
    formData.append('secretKey', secretKey);
    images.forEach((image, i) => {
      formData.append(`images[${i}]`, image);
    });

    try {
      await axios.post('http://localhost:3001/create-event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Event created successfully');
      // Optionally reset form fields
      setEmail('');
      setEventName('');
      setSecretKey('');
      setImages([]);
    } catch (error) {
      console.error('There was an error creating the event!', error);
    }
  };

  return (
    <div>
      <h2>Create Event Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Event Name:</label>
          <input 
            type="text" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Secret Key:</label>
          <input 
            type="text" 
            value={secretKey} 
            onChange={(e) => setSecretKey(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Upload Images:</label>
          <input 
            type="file" 
            multiple 
            onChange={handleImageChange} 
          />
        </div>
        <div>
          {images.length > 0 && (
            <ul>
              {images.map((image, index) => (
                <li key={index}>
                  {image.name} 
                  <button type="button" onClick={() => handleRemoveImage(index)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
