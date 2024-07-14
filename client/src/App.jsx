import { useState } from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './Home'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div>
     <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
