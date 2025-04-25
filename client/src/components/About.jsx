import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from '../assets/zoomLogo.png'

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
                    <div className="col-12 col-md-6 col-lg-5 d-flex align-items-start">
                        <div className="w-100 d-flex">
                            <img
                                src={reactLogo}
                                alt="Logo"
                                className="img-fluid"
                                style={{ borderRadius: '1rem', maxHeight: '500px', width: '100%', height: 'auto', objectFit: "contain" }}
                            />
                        </div>
                    </div>

                        
                    {/* Text on the right — restored to original column with padding */}
                    <div className="col-12 col-md-11 col-lg-7 pt-5 ps-lg-4">
                        <div>
                            <p style={{ fontSize: "1.1em" }}>
                                Text section regarding what we do as a group,
                                how we started the idea, yadda yadda yadda
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    
                


            { /* Another text section? */ }
            <div className="container text-white py-1">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-11 mx-auto">
                        <p style={{ fontSize: "1.1em"}}>
                            Another text section regarding what we do as a group,
                            how we started the idea, yadda yadda yadda
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default About;