import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from '../assets/logo.png'

const About = () => {

    return (
        <div className="container-fluid" style={{ backgroundColor: "#002F5C", minHeight: "100vh" }}>
            
            { /* About page header*/ }
            <div className="container py-2">
                <h1 className="text-center" style={{ color: "#ffffff" }}>About Us</h1>
                <p className="text-center" style={{ color: "#FF9900" }}>ZoomZoomType</p>
            </div>
            <hr style={{ border: "0.15em solid black" }} />
            

            { /* About our group, how the idea started etc. */ }
            <div className="container text-white">
                <div className="row align-items-stretch">
                    {/* Image on the left */}
                    <div className="col-12 col-md-11 col-lg-4 pt-5 mx-auto">
                        <div className="h-12 objext-contain d-flex mt-2">
                            <img
                                src={reactLogo}
                                alt="Logo"
                                className="img-fluid"
                                style={{ borderRadius: '1rem', maxHeight: '200px', width: '100%', height: 'auto', objectFit: "contain" }}
                            />
                        </div>
                    </div>

                        
                    {/* Text on the right — restored to original column with padding */}
                    <div className="col-12 col-md-11 col-lg-7 pt-5 ps-lg-4">
                        <div>
                            <p style={{ fontSize: "1.1em" }}>
                            ZoomZoomType is an interactive web-based typing game 
                            designed to challenge users to improve their typing 
                            speed and accuracy. Players race against the 
                            clock — or against each other — by typing given 
                            passages as quickly and precisely as possible.

                            Built for both casual users looking to sharpen their 
                            skills and competitive players aiming for the top of 
                            the leaderboard, ZoomZoomType brings a fun, dynamic, 
                            and fast-paced experience to the world of online typing 
                            games. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    
                


            { /* Another text section? */ }
            <div className="container text-white pt-5 mt-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-11 mx-auto">
                        <p style={{ fontSize: "1.1em"}}>
                        The platform tracks detailed performance statistics like words 
                        per minute (WPM) and accuracy, giving players a way to monitor 
                        their progress, climb leaderboards, and sharpen their skills 
                        over time. Built with a focus on fast-paced gameplay and 
                        community-driven competition, ZoomZoomType makes improving your 
                        typing skills both fun and rewarding.
                        </p>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default About;