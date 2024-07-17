import React, { useState } from 'react';
import axios from 'axios';

const UpdateEvents = () => {
  const [eventName, setEventName] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventName) {
      alert('Event name is required');
      return;
    }

    const formData = new FormData();
    formData.append('eventName', eventName);

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
        <div>
          <label>Event Name:</label>
          <input type="text" value={eventName} onChange={handleEventNameChange} required />
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

export default UpdateEvents;
