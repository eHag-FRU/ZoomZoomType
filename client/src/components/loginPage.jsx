import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, redirect, Navigate, Route } from 'react-router-dom';
import axios from 'axios';




const LogInPage = ({ updateAvgWPM, cookie, setLoginCookie }) => {
    //Set up the navigate object
    const navigate = useNavigate();
    
    const [loginError, setLoginError] = useState(false);
    const [formValue, setFormValue] = useState({password: "", email: ""})

    function handleFormEmailChange(e) {
        setFormValue({password: formValue.password, email: e.target.value});
    }

    function handleFormPasswordChange(e) {
        setFormValue({password: e.target.value, email: formValue.email});
    }

    //Component to display the login errors if present
    function LoginErrorMessage({ error }) {
        if (error) {
            return(
                <p className='error-text-theme' id='incorrectLogin'>Either the username or password is incorrect or an account does not exist under the provided email, please try again</p>
            )
        } else {
            return null;
        }
    }
    
    //Handles the login button click
    const handleLogin = async (e) => {
        //Prevent the default action of submission, will do with axios
        e.preventDefault();

        //Clear the error message state since trying to log in again
        setLoginError(false);
        
        console.log("handling the login!!!");
        console.log(`formValue.email: ${formValue.email}`);
        console.log(`formValue.password: ${formValue.password}`);

        //Now take the information and submit it to the backend with axios
        let response = null;
        
        try {
            response = await axios.post("http://localhost:3000/api/login", formValue);
        } catch {
            //Now make response be an {} with status 401
            //Force it to be a fail HTTP status code
            response = {status: 401};
        }
        
        

        //Now check in on the response code
        if (response.status == 200) {
            //Good 
            console.log("Login successful");

            const email = formValue.email;
            console.log(`formvalue.email: ${formValue.email}`);

         
            console.log(response.data.userName);

            //Make the JSON to put into the cookie, so usrID, usrName
            //The login query already sends back all three to use!
            const cookieJSON = {
                "userUsername": response.data.userName,
                "userID": response.data.userID,
                "userEmail": response.data.userEmail,
            };

            console.log(cookieJSON);

            //Grab the avg WPM
            const userAvgWPM = await axios.get("http://localhost:3000/api/getAvgWPM", { params: { email }});

            console.log(userAvgWPM);

            //Set the WPM global state
            updateAvgWPM(userAvgWPM.data.avgWPM);

            console.log(userAvgWPM.data.avgWPM);

            console.log(`userAvgWPM: {userAvgWPM}`);

            //make the cookie
            setLoginCookie('usr', JSON.stringify(cookieJSON), { path: '/' })

            //Redirect to the homepage
            return <Navigate to="/" replace/>;


        } else {
            //clear the fields

            //Make the error message show by modifying the state
            setLoginError(true);
        }
    }

        //
        // Checking if the user is logged in, if so, redirect to profile
        //
        const loginCookie = cookie.usr ? JSON.stringify(cookie.usr) : null;




        if (loginCookie == null) {
            return (
                <div className='container-fluid d-flex flex-column flex-grow-1 justify-content-center align-items-center theme-d5 text-center pb-5'>
                    
                    <form method="POST" onSubmit={handleLogin}>
                        <h1>Welcome to Zoom Zoom Type!</h1>
                        <h2>Please login below</h2>
                        <LoginErrorMessage error={loginError}></LoginErrorMessage>
                        

                        <div>
                            <label htmlFor='email'>Email </label>
                            <input type='text' name='email' id='email' className='ms-2' style={{backgroundColor: "#ffff"}} value={formValue.email} onChange={handleFormEmailChange}></input>
                        </div>
                        
                        <br/>

                        <div>
                            <label htmlFor="password">Password </label>
                            <input type='password' name='password' id='password' className='ms-2' value={formValue.password} onChange={handleFormPasswordChange}></input>
                        </div>
                        
                        <br/>

                        <div>
                            <button type='submit' className='btn btn-lg custom-accent-btn mb-3 fw-bold'>Login</button>
                            <p>Need an account? <a className="theme-d5 mb-3 registerLink-hover" href="register">Register Here</a></p>
                        </div>
                    </form>
                </div>
        )
    } else{
        //User is already logged in, now redirect to the homepage
        return <Navigate to="/" replace/>;
    }
   
}

export default LogInPage;