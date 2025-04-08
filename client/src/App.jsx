import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';
import FaQ from './components/FaQ.jsx';
import About from './components/About.jsx';
import ProfilePage from './components/ProfilePage.jsx';


//Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Importing FontAwesome to allow for icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {faCarOn, faCrown, faKeyboard, faCircleInfo, faGear, faCircleUser} from '@fortawesome/free-solid-svg-icons'; 

//Adding in the icons
library.add(faCarOn, faCrown, faKeyboard,faCircleInfo, faGear, faCircleUser);



function App() {

  return (
    <div className='app-container min-vh-100 d-flex flex-column theme-d5'>
      <NavBar></NavBar>
      <div className='d-flex flex-grow-1'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/FaQ' element={<FaQ/>}/>
          <Route path='/ProfilePage' element={<ProfilePage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
