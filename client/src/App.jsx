import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';
import FaQ from './components/FaQ.jsx';

//Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Importing FontAwesome to allow for icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {faCarOn, faCrown, faKeyboard, faCircleInfo, faGear, faCircleUser} from '@fortawesome/free-solid-svg-icons'; 
import LogInPage from './components/loginPage.jsx';

//Adding in the icons
library.add(faCarOn, faCrown, faKeyboard,faCircleInfo, faGear, faCircleUser);

function App() {
  //Adding the avg WPM state
  const [avgWPM, setAvgWPM] = useState();


  return (
    <div className='app-container'>
      <NavBar wpm={avgWPM}></NavBar>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/FaQ' element={<Home/>}/>
        <Route path='/login' element={<LogInPage updateAvgWPM={setAvgWPM}/>} />
      </Routes>
    </div>
  )
}

export default App
