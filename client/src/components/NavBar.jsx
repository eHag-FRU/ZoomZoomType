import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarUserDropDownMenu from './NavBarUserDropDownMenu';
import { useCookies } from 'react-cookie';

const NavBar = ({ cookie, deleteCookie }) => {
    const [cookies, setCookie] = useCookies(['avgWPM']);

    const wpm = cookies.avgWPM || 0;

    return (
        <div className="theme-d5 text-white px-3 py-2">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <Link className='d-flex gap-2 me-2 nav-anchor-visited nav-achor-hover' to='/' style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon='fa-solid fa-car-on' style={{ fontSize: '1.5em' }} />
                        <h5 className='mb-0 text-white'>Zoom Zoom Type</h5>
                    </Link>
                    <Link className='nav-anchor-visited nav-anchor-hover text-white' to='/GamePage'><FontAwesomeIcon icon="fa-solid fa-keyboard" style={{ fontSize: '1.5em' }} /></Link>
                    <Link className='nav-anchor-visited nav-anchor-hover text-white' to='/leaderBoard'><FontAwesomeIcon icon="fas fa-crown" style={{ fontSize: '1.5em' }} /></Link>
                    <Link className='nav-anchor-visited nav-anchor-hover' to='/about'><FontAwesomeIcon icon="fas fa-info-circle" style={{ fontSize: '1.5em' }} /></Link>
                    <span className="ms-2 d-flex flex-row">
                        Average WPM:&nbsp;<strong><p id="highestUserWPM">{wpm}</p></strong>
                    </span>
                </div>

                <NavBarUserDropDownMenu
                    isLoggedIn={cookie.usr ? JSON.stringify(cookie.usr) : null}
                    deleteCookie={deleteCookie}
                    wpm={wpm}
                    setWPM={(newWPM) => setCookie('avgWPM', newWPM, { path: '/' })}
                />
            </div>
        </div>
    );
};

export default NavBar;
