import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';
import FaQ from './components/FaQ.jsx';
import Settings from './components/Settings.jsx'

function App() {

  return (
    <div className='app-container'>
      <NavBar></NavBar>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/FaQ' element={<FaQ/>}/>
        <Route path='/Settings' element={<Settings />}/>
      </Routes>
    </div>
  )
}

export default App
