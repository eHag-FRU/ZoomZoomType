import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, redirect, Navigate, Route } from 'react-router-dom';

const LogInPage = () => {
    //Set up the navigate object
    const navigate = useNavigate();

    //check if user is already logged in, need to check for the cookie and see if it is there, if not show login page
    

    if (true) {
        return (
            <div className='grid h-screen place-items-center'>
                
                <form method="POST" action="http://localhost:3000/api/login">
                    <h1 className='place-items-center'>Login</h1>
                    <div>
                        <label for={".email"}>Email </label>
                        <input type='text' name='email' id='email' style={{backgroundColor: "#ffff"}}></input>
                    </div>
                    
                    <br/>

                    <div>
                        <label for="password">Password </label>
                        <input type='password' name='password' id='password'></input>
                    </div>
                    
                    <br/>

                    <div>
                        <button type='submit'>Login</button>
                        <p>Need an account? <a href="register">Register Here</a></p>
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