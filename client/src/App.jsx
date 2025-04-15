import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';
import FaQ from './components/FaQ.jsx';
import About from './components/About.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import GamePage from './components/GamePage.jsx';


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
  const [avgWPM, setAvgWPM] = useState(0);

  //Adding in the cookie to handle user login state
  const [cookie, setCookies] = useCookies(['usr']);


  return (
    <div className='app-container min-vh-100 d-flex flex-column theme-d5'>
      <NavBar wpm={avgWPM}></NavBar>
      <div className='d-flex flex-grow-1'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/FaQ' element={<FaQ/>}/>
          <Route path='/ProfilePage' element={<ProfilePage/>}/>
          <Route path='/GamePage' element={<GamePage/>}/>
          <Route path='/login' element={<LogInPage updateAvgWPM={setAvgWPM} cookie={cookie} setLoginCookie={setCookies}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
