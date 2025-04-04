import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

    

    return (
        <div>
            {alreadyLoggedInToast(alreadyLoggedIn)}
            Hello World
        </div>
    )
}

export default Home;