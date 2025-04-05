import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Settings = () => {
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

      <div className="settings-section">
        <h1 className="settings-header">Settings</h1>
        <br />

        <h2 className="setting-layout">Keyboard Layout</h2>

        <h2 className="setting-font">Font</h2>

        <h2 className="setting-theme">Color Theme</h2>
      </div>
    </div>
  );
};

export default Settings;
