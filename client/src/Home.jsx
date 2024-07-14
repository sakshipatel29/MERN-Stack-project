import React, { useState } from 'react';

const Home = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the image upload logic here
    console.log('Image uploaded:', image);
  };

  return (
    <div className="container">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input"
            required
          />
        </div>
        {preview && (
          <div className="form-group">
            <img src={preview} alt="Preview" className="image-preview" />
          </div>
        )}
        <button type="submit" className="button">Upload</button>
      </form>
    </div>
  );
};

export default Home;
