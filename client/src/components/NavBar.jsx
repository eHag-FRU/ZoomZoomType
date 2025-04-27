import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarUserDropDownMenu from "./NavBarUserDropDownMenu";

const NavBar = ({ wpm, setWPM, cookie, deleteCookie, theme }) => {
  return (
    <div className={`bg-transparent ${theme} icon-${theme} px-3 py-2`}>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <Link className={`d-flex gap-2 me-2 icon-${theme}`} to="/" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon="fa-solid fa-car-on" style={{ fontSize: "1.5em" }} className={`icon-${theme}`} />
            <h5 className="mb-0">Zoom Zoom Type</h5>
          </Link>
          <Link className="text-white mx-2" to="/GamePage"><FontAwesomeIcon icon="fa-solid fa-keyboard" style={{ fontSize: "1.5em" }} className={`icon-${theme}`} /></Link>
          <Link className="text-white mx-2" to="/leaderBoard"><FontAwesomeIcon icon="fas fa-crown" style={{ fontSize: "1.5em" }} className={`icon-${theme}`} /></Link>
          <Link className="mx-2" to="/about"><FontAwesomeIcon icon="fas fa-info-circle" style={{ fontSize: "1.5em" }} className={`icon-${theme}`} /></Link>
          <span className="ms-2 d-flex flex-row">Average WPM:&nbsp;<strong><p id="highestUserWPM">{wpm}</p></strong>
          </span>
        </div>

        {/* Gap is here */}

        <NavBarUserDropDownMenu isLoggedIn={cookie.usr ? JSON.stringify(cookie.usr) : null} deleteCookie={deleteCookie} setWPM={setWPM} wpm={wpm} theme={theme}></NavBarUserDropDownMenu>
        {/* <div className="d-flex align-items-center gap-3 ms-md-3 mt-2 mt-md-0">
                    <Link className='nav-anchor-visited nav-anchor-hover text-white' to='/settings'><FontAwesomeIcon icon="fas fa-cog" style={{ fontSize: '1.5em' }}/></Link>
                    <Link className='nav-anchor-visited nav-anchor-hover text-white' to='/login'><FontAwesomeIcon icon="fas fa-circle-user" style={{ fontSize: '1.5em' }}/></Link>
                </div> */}
      </div>
    </div>
  );
};

export default NavBar;
