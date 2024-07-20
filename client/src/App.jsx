import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import GrabPhotos from './GrabPhotos';
import SharePhotos from './SharePhotos';
import UpdateEvents from './UpdateEvents';
import CreateEvent from './CreateEvent';
import { AppContext } from './AppContext';

function App() {
  const [email, setEmail] = useState('');

  return (
    <div>
      <AppContext.Provider value={{ email, setEmail }}>
        <BrowserRouter>
          <Routes>
            <Route path='/Register' element={<Signup />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='home/grab-photos' element={<GrabPhotos />} />
            <Route path='home/share-photos' element={<SharePhotos />} />
            <Route path='home/share-photos/update-events' element={<UpdateEvents />} />
            <Route path='home/share-photos/create-event' element={<CreateEvent />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
