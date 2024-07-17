// // SharePhotos.js
// import React from 'react';

// const SharePhotos = () => {
//   return (
//     <div>
//       <h2>Share Photos Page</h2>
//       {/* Add your share photos functionality here */}
//     </div>
//   );
// };

// export default SharePhotos;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const SharePhotos = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleUpdateEvents = () => {
    navigate('/update-events');
  };

  return (
    <div className="container">
      <h2>Photo Management</h2>
      <div className="button-group">
        <button onClick={handleCreateEvent} className="button">Create events</button>
        <button onClick={handleUpdateEvents} className="button">Update events</button>
      </div>
    </div>
  );
};

export default SharePhotos;