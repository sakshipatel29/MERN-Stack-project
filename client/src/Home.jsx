import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGrabPhotos = () => {
    navigate('/grab-photos');
  };

  const handleSharePhotos = () => {
    navigate('/share-photos');
  };

  return (
    <div className="container">
      <h2>Photo Management</h2>
      <div className="button-group">
        <button onClick={handleGrabPhotos} className="button">Grab Photos</button>
        <button onClick={handleSharePhotos} className="button">Share Photos</button>
      </div>
    </div>
  );
};

export default Home;
