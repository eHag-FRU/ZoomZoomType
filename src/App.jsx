import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';

function App() {

  return (
    <div className='app-container'>
      <NavBar></NavBar>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/FaQ' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
