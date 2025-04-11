import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from '../assets/react.svg'

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
            <div className="container-fluid text-white py-5 me-5">
                <div className="row justify-content-end me-5">
                    <div className="col-12 col-md-10 col-lg-5 pe-lg-1">
                        <p style={{ fontSize: "1.1em" }}>
                        Text section regarding what we do as a group,
                        how we started the idea, yadda yadda yadda <br />
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


            { /* Another text section? */ }
            <div className="container-fluid text-white py-3 ms-5 ps-5">
                <div className="row justify-content-start">
                    <div className="col-12 col-md-6 col-lg-5 ps-lg-1">
                        { /* Image above paragraph */}
                        <img
                            src={reactLogo}
                            alt="Logo"
                            className="img-fluid mb-3"
                            style={{ borderRadius: '8px'}}
                        />

                        <p style={{ fontSize: "1.1em"}}>
                            Another text section regarding what we do as a group,
                            how we started the idea, yadda yadda yadda <br />
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