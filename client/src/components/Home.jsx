
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {toast} from 'react-toastify';

//Importing the CSS file for the toast notifications
import "react-toastify/dist/ReactToastify.css";

//Configure the toastify
//toast.configure();

const alreadyLoggedInToast = (alreadyLoggedIn) => {
    //Will make a toast and then return it, if already logged in!

    

    // if(alreadyLoggedIn) {
    //     return (toast("User is already logged in"));
    // }

    return(<p>Hello</p>)
};


const Home = (alreadyLoggedIn) => {
    const navigate = useNavigate();
    function handleClick(page){
        navigate(page);
    }
    
    return (
        <div className="container-fluid d-flex flex-column flex-grow-1 justify-content-center align-items-center theme-d5 text-center pb-5">
            {alreadyLoggedInToast(alreadyLoggedIn)}
            Hello World
            <h1 className="border-bottom border-3 d-inline display-2 fw-bold mb-5">
                <FontAwesomeIcon icon="fa-solid fa-car-on"/> Zoom Zoom Type
            </h1>
            <p className='align-items-center fs-2 mb-5'>
                Hone your typing skills solo or compete against others
            </p>
            <div className="row w-100">
                <div className="container-fluid d-flex justify-content-between gap-4 w-25">
                    <button onClick={() => handleClick('GamePage')}className="btn btn-lg custom-accent-btn mb-3 fw-bold">Play Now</button>
                    <button className="btn btn-lg custom-accent-btn mb-3 fw-bold">Modes</button>
                </div>
            </div>
        </div>
    )
}

export default Home;