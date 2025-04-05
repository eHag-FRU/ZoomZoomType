import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Register = () => {
    return (
        <div className="theme-d5 p-4 flex w-full items-center">
            {/* This will hold the logo and the Title */}
            <div className="flex items-center space-x-6 flex-1">
                <FontAwesomeIcon icon="fa-car-on" className='text-2xl'/>
                <h2 className='mr-6'>Zoom Zoom Type</h2>
            </div>

            <div className="flex items-center space-x-6 flex-1">
                {/* Add the other items to the bar */}
                <FontAwesomeIcon icon="fa-keyboard" className='text-xl'/>
                <FontAwesomeIcon icon="fa-crown" className='mr-4'/>
                <FontAwesomeIcon icon="fa-info-circle" className='mr-4'/>
                <h3 className='flex items-center'>Average WPM: <p id='wpmCounter'></p></h3>
            </div>

            <div className="flex justify-end items-center space-x-6">
                {/* Settings and Profile Icons on the far right */}
                <a><FontAwesomeIcon icon="fa-gear"/></a>
                <FontAwesomeIcon icon="fa-circle-user"/>

            </div>

            <div>
                <form>
                    <h1>Register</h1>

                    <div>
                        <label>Username (will be displayed on leaderboards):</label>
                        <input type="text" placeholder="ex.JDoe" />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="email" placeholder="email@example.com" />
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type="password" placeholder="Confirm Password" />
                    </div>

                    <div>
                        <label>Profile Image:</label>
                        <input type="file" accept="image/*" />
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </div> 
    )
}

export default Register;