import { useState } from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './Home'
import GrabPhotos from './GrabPhotos';
import SharePhotos from './SharePhotos';
import UpdateEvents from './UpdateEvents';
import CreateEvent from './CreateEvent';

function App() {
  const [count, setCount] = useState(0)


  return (
    <div>
     <BrowserRouter>
    <Routes>
      <Route path='/Register' element={<Signup />}></Route>
      <Route path='/Login' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path="home/grab-photos" element={<GrabPhotos />} />
      <Route path="home/share-photos" element={<SharePhotos />} />
      <Route path="/update-events" element={<UpdateEvents />} />
      <Route path="/create-event" element={<CreateEvent />} />
      {/* <Route path="/uploads" element={<UpdateEvents />} /> */}
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
