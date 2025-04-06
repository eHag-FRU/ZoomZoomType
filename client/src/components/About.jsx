import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const About = () => {

    return (       
        <div className="place-items-center">
            <h1 className="text-3xl font-semibold mb-4">About Us</h1>
            <p className="text-lg mb-8">ZoomZoomType</p>
            <hr />


            <div className="top-text-section">
                <p>
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

            <div className="image-and-text-section">
                <div className="about-image-placeholder">
                    Picture detailing service offered
                </div>

                <div className="bottom-text-section">
                    <p>
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

    )
}

export default About;