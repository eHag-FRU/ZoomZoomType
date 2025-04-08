import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="grid auto-cols-auto">
      {/* This will hold the logo and the Title */}
      <div className="flex items-center space-x-6 flex-1">
        <FontAwesomeIcon icon="fa-car-on" className="text-2xl" />
        <h2 className="mr-6">Zoom Zoom Type</h2>
      </div>

      <div className="flex items-center space-x-6 flex-1">
        {/* Add the other items to the bar */}
        <FontAwesomeIcon icon="fa-keyboard" className="text-xl" />
        <FontAwesomeIcon icon="fa-crown" className="mr-4" />
        <FontAwesomeIcon icon="fa-info-circle" className="mr-4" />
        <h3 className="flex items-center">
          Average WPM: <p id="wpmCounter"></p>
        </h3>
      </div>

      <div className="flex justify-end items-center space-x-6">
        {/* Settings and Profile Icons on the far right */}
        <a>
          <FontAwesomeIcon icon="fa-gear" />
        </a>
        <a href="/login" className="nav-anchor-visited nav-anchor-hover">
          <FontAwesomeIcon icon="fa-circle-user" />
        </a>
      </div>

      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="username">ZoomZoomType</p>
        <hr />

        <div className="top-text-section">
          <p>
            Text section regarding what we do as a group, how we started the
            idea, yadda yadda yadda <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="image-and-text-section">
          <div className="about-image-placeholder">
            Picture detailing service offered
          </div>

          <div className="bottom-text-section">
            <p>
              Another text section regarding what we do as a group, how we
              started the idea, yadda yadda yadda <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
