import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {

    return (
        <div style={{ backgroundColor: "#002F5C", minHeight: "100vh" }}>
            <div className="">
                <div className="container py-2">
                    <h1 className="text-center" style={{ color: "#ffffff" }}>About Us</h1>
                    <p className="text-center" style={{ color: "#FF9900" }}>ZoomZoomType</p>
                </div>
                <hr style={{ border: "0.15em solid black" }} />


                <div className="container-fluid text-white py-2">
                    <div className="row justify-content-end">
                        <div className="col-12 col-md-4 p-3 me-md-5 me-3">
                            <p style={{ fontSize: "1em" }}>
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


                <div className="container-fluid text-white py-2">
                    <div className="row justify-content-start">
                        <div className="col-12 col-md-4 p-3 ms-md-5 ms-3">
                            { /* Image above paragraph */}
                            <img
                                src="image"
                                alt="image"
                                className="img-fluid mb-3"
                                style={{ borderRadius: '8px'}}
                            />

                            <p style={{ fontSize: "1em"}}>
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
        </div>
    )
}

export default About;