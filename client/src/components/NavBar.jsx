import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"



const NavBar = ({wpm}) => {
    return (
        <div className="theme-d5 text-white px-3 py-2">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <Link className='d-flex gap-2 me-2 nav-anchor-visited nav-achor-hover' to='/' style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon='fa-solid fa-car-on' style={{ fontSize: '1.5em' }}/>
                        <h5 className='mb-0'>Zoom Zoom Type</h5>
                    </Link>
                    <Link className='nav-anchor-visited nav-anchor-hover' to='/games'><FontAwesomeIcon icon="fa-solid fa-keyboard" style={{ fontSize: '1.5em' }}/></Link>
                    <Link className='nav-anchor-visited nav-anchor-hover' to='/leaderBoard'><FontAwesomeIcon icon="fas fa-crown" style={{ fontSize: '1.5em' }}/></Link>
                    <Link className='nav-anchor-visited nav-anchor-hover' to='/about'><FontAwesomeIcon icon="fas fa-info-circle" style={{ fontSize: '1.5em' }}/></Link>
                    <span className="ms-2 ">Average WPM: <strong><p id="highestUserWPM"></p></strong></span>
                </div>

                {/* Gap is here */}

                <div className="d-flex align-items-center gap-3 ms-md-3 mt-2 mt-md-0">
                    <Link className='nav-anchor-visited nav-anchor-hover' to='/settings'><FontAwesomeIcon icon="fas fa-cog" style={{ fontSize: '1.5em' }}/></Link>
                    <Link className='nav-anchor-visited nav-anchor-hover' to='/login'><FontAwesomeIcon icon="fas fa-circle-user" style={{ fontSize: '1.5em' }}/></Link>
                </div>

            </div>
        </div>
    );
};

export default NavBar;