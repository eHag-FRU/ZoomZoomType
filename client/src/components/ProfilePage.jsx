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

    //Use a state to handle new email update
    const [newEmail, setNewEmail] = useState("");

    const [newUsername, setUsername] = useState("");


    //Handles the email update
    function handleEmailUpdateChange(e) {
        setNewEmail(e.target.value);
    }

    //Handles the username update
    function handleUsernameUpdateChange(e) {
        setUsername(e.target.value);
    }






    const gamePlayedDictExampleFunction = async (e) => {
        //Here is how you use the gamesPlayed endpoint to get overall wpm and games played

        //Make a variable to hold the returning dictionary
        let gamesPlayedDict = null;

        //Put the axios call into an try/catch ==> Axios call needs to be in try catch
        try {
            gamesPlayedDict = await axios.get("http://localhost:3000/api/gamesPlayed", {data: {ID: cookie.userID}})
        } catch (e) {
            console.log(`gamesPlayed API endpoint: ${e}`)
        }

        //Print the values here
        console.log(`gamePlayedDictExampleFunction: gamesPlayed ${gamesPlayedDict.gamesPlayed}`);
        console.log(`gamePlayedDictExampleFunction: wpmTotal ${gamesPlayedDict.wpmTotal}`);

    }

    const handleDeleteAccount = async (e) => {
        //TEST function for the delete button back end
        //Seeing if can grab cookies in the express.js backend
        //Have to send the cookie over

        //THIS IS HOW YOU DELETE AN ACCOUNT, this is tied to an button currently

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


    //Email Update handler example
    const handleEmailUpdate = async (e) => {
        //Prevent the default button behaviour
        e.preventDefault();

        console.log("Handling email update!");

        let response = null;

        try {
            response = await axios.post("http://localhost:3000/api/updateEmail", {id: cookie.userID, email: newEmail});
        } catch (e) {
            console.log(`handleEmailUpdate: POST error: ${e}`);
        }

    }

    //Username update handler example
    const handleUsernameUpdate = async (e) => {
        //Prevent the default
        e.preventDefault();

        console.log("Handling username update!");

        let response = null;

        try {
            response = await axios.post("http://localhost:3000/api/updateUsername", {id: cookie.userID, username: newUsername});
        } catch (e) {
            console.log(`handleEmailUpdate: POST error: ${e}`);
        }
    }

    return (
        <div>
            <button onClick={handleDeleteAccount}>DELETE ACCOUNT TEST</button>

            <div>
                <input placeholder='New Email' onChange={handleEmailUpdateChange}></input>
                <button onClick={handleEmailUpdate}>UPDATE EMAIL TEST</button>
            </div>

            <div>
                <input placeholder='New username' onChange={handleUsernameUpdateChange}></input>
                <button onClick={handleUsernameUpdate}>UPDATE USERNAME TEST</button>
            </div>
        </div>
    )
}

export default ProfilePage;