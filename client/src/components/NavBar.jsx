import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"



const NavBar = () => {


    return (
        <div className="theme-d5 text-white px-3 py-2">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">

                <div className="d-flex flex-wrap align-items-center gap-2">
                    <a className='nav-logo' href='/'><FontAwesomeIcon icon="fa-solid fa-car-on"/></a>
                    <h5 className="mb-0 me-2">Zoom Zoom Type</h5>
                    <a className='nav-anchor-visited nav-anchor-hover' href='/games'><FontAwesomeIcon icon="fa-solid fa-keyboard"/></a>
                    <a className='nav-anchor-visited nav-anchor-hover' href='/leaderBoard'><FontAwesomeIcon icon="fas fa-crown"/></a>
                    <a className='nav-anchor-visited nav-anchor-hover' href='/about'><FontAwesomeIcon icon="fas fa-info-circle"/></a>
                    <span className="ms-2">Average WPM: <strong><p id="highestUserWPM">55</p></strong></span>
                </div>

                {/* Gap is here */}

                <div className="d-flex align-items-center gap-3 ms-md-3 mt-2 mt-md-0">
                <i className="fas fa-cog"></i>
                <a href='/login'><i className="fas fa-user"></i></a>
                </div>

            </div>
        </div>
    );
};

export default NavBar;