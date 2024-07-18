import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useContext } from 'react';
import { AppContext } from './Login';

const CreateEvent = () => {
  const { email } = useContext(AppContext);
  console.log('Email from context:', email);
  const [eventName, setEventName] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleKeyValue = (e) => {
    setKeyValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventName) {
      alert('Event name is required');
      return;
    }
    if (!keyValue) {
      alert('secret key is required');
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
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files', error);
      alert('Failed to upload files');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='hidden' value={email} />
        <div>
          <label>Event Name:</label>
          <input type="text" value={eventName} onChange={handleEventNameChange} required />
        </div>
        <div>
          <label>Enter Key:</label>
          <input type="text" value={keyValue} onChange={handleKeyValue} required />
        </div>
        <div>
          <label>Upload Files:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEvent;
