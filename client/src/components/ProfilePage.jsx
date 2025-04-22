import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

//Importing what is needed to get the cookie
import { useCookies} from 'react-cookie'; 

const ProfilePage = ({setWPM, deleteCookie}) => {
    //Grab the cookie
    const cookie = (useCookies(['usr'])[0]).usr;

    //Use the useNaivgate, allows for redirection
    const navigate = useNavigate();

    const handleDeleteAccount = async (e) => {
        //TEST function for the delete button back end
        //Seeing if can grab cookies in the express.js backend
        //Have to send the cookie over

        

        //Print the cookie out
        console.log("The cookie grabbed: ", cookie);
        console.log("The cookie ID grabbed: ", cookie.userID);

        let response = null

        try {

            response = await axios.delete("http://localhost:3000/api/deleteaccount", {data: {id: cookie.userID}});
        } catch (e) {
            console.log("FAILED to reach handleDeleteAccount backend: ", e);
        }

        //Now that its handled, set the state of the WPM to 0
        setWPM(0);


        //Delete the cookie
        deleteCookie('usr', {path: '/'});

        //Redirect to the homepage
        navigate('/');
    }

    return (
        <div>
            <button onClick={handleDeleteAccount}>DELETE ACCOUNT TEST</button>
        </div>
    )
}

export default ProfilePage;