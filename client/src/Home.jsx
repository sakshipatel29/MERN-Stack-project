import React from 'react';
import { useNavigate } from 'react-router-dom';
import grabPhoto from './assets/grabphotos.jpg';
import sharePhoto from './assets/sharephotos.jpg';
import './App.css'; // Ensure this is the correct path to your CSS file

const Home = () => {
    const navigate = useNavigate();

    const handleGrabPhotos = () => {
        navigate('/grab-photos');
    };

    const handleSharePhotos = () => {
        navigate('/share-photos');
    };

    return (
        <div className="container homecontainer">
            <h2 className="Loginheader2">Grab/Share Photos</h2>
            <div className="image-group">
                <div className="image-container" onClick={handleGrabPhotos}>
                    <img src={grabPhoto} alt="Grab Photos" className="image" />
                    <div className="overlay">
                        <div className="hometext">Grab Photos</div>
                    </div>
                </div>
                <div className="image-container" onClick={handleSharePhotos}>
                    <img src={sharePhoto} alt="Share Photos" className="image" />
                    <div className="overlay">
                        <div className="hometext">Share Photos</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
