import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ClassicGame from "./components/ClassicGame.jsx";
import QuoteGame from "./components/QuoteGame.jsx";
import MemorizeGame from "./components/MemorizeGame.jsx";
import LookAheadGame from "./components/LookAheadGame.jsx";
import Settings from "./components/Settings.jsx";
import GameModes from "./components/GameModes.jsx";
import Register from './components/Register.jsx';
import Footer from "./components/Footer.jsx";
import { useCookies } from 'react-cookie';
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';
import FaQ from './components/FaQ.jsx';
import About from './components/About.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import EditProfile from './components/EditProfile.jsx';

//Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Importing FontAwesome to allow for icons

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCarOn, faCrown, faKeyboard, faCircleInfo, faGear, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import LogInPage from "./components/loginPage.jsx";
import Leaderboard from "./components/LeaderBoard.jsx";

//Adding in the icons
library.add(faCarOn, faCrown, faKeyboard, faCircleInfo, faGear, faCircleUser, faGithub);

function App() {
  //Settings States
  const [theme, setTheme] = useState("theme-blue1");
  const [font, setFont] = useState("Arial");

  //Adding the avg WPM state
  const [avgWPM, setAvgWPM] = useState(0);

  //Adding in the cookie to handle user login state
  const [cookie, setCookies, deleteCookie] = useCookies(["usr"]);

  return (
    <div className={`app-container min-vh-100 d-flex flex-column ${theme}`} style={{ fontFamily: font }}>
      <NavBar wpm={avgWPM} setWPM={setAvgWPM} cookie={cookie} deleteCookie={deleteCookie} theme={theme}></NavBar>
      <div className="d-flex flex-grow-1 justify-content-center">
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/Home" element={<Home theme={theme} />} />
          <Route path="/About" element={<About theme={theme} />} />
          <Route path="/FaQ" element={<FaQ theme={theme} />} />
          <Route path="/ProfilePage" element={<ProfilePage theme={theme}/>} />
          <Route path='/EditProfile' element={<EditProfile setWMP={setAvgWPM} deleteCookie={deleteCookie}/>}/>
          <Route path="/leaderBoard" element={<Leaderboard theme={theme} />} />
          <Route path="/ClassicGame" element={<ClassicGame cookie={cookie} theme={theme} />} />
          <Route path="/QuoteGame" element={<QuoteGame cookie={cookie} theme={theme} />} />
          <Route path="/LookAheadGame" element={<LookAheadGame cookie={cookie} theme={theme} />} />
          <Route path="/MemorizeGame" element={<MemorizeGame cookie={cookie} theme={theme} />} />

          <Route path="/Settings" element={<Settings font={font} setFont={setFont} theme={theme} setTheme={setTheme} />} />
          <Route path="/GameModes" element={<GameModes theme={theme} />} />
          <Route path="/login" element={<LogInPage updateAvgWPM={setAvgWPM} cookie={cookie} setLoginCookie={setCookies} theme={theme} />} />
          <Route path="/Register" element={<Register />} />

          
         {/* Put the routes from Main into comments incase something breaks */}
          {/* <Route path='/' element={<Home/>}/> */}
          {/* <Route path='/Home' element={<Home/>}/> */}
          {/* <Route path='/About' element={<About/>}/> */}
          {/* <Route path='/FaQ' element={<FaQ/>}/> */}
          {/* <Route path='/ProfilePage' element={<ProfilePage/>}/> */}

          {/* <Route path='/leaderBoard' element={<Leaderboard/>}/> */}
          {/* <Route path='/GamePage' element={<GamePage/>}/> */}
          {/* <Route path='/login' element={<LogInPage updateAvgWPM={setAvgWPM} cookie={cookie} setLoginCookie={setCookies}/>} /> */}
        </Routes>
      </div>
      <Footer theme={theme}></Footer>
    </div>
  );
}

export default App;
