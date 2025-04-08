import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  return (
    <div className="theme-d5 text-white px-3 py-2">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <a className="nav-logo" href="/">
            <FontAwesomeIcon
              icon="fa-solid fa-car-on"
              style={{ fontSize: "1.5em" }}
            />
          </a>
          <h5 className="mb-0 me-2">Zoom Zoom Type</h5>
          <a className="nav-anchor-visited nav-anchor-hover" href="/games">
            <FontAwesomeIcon
              icon="fa-solid fa-keyboard"
              style={{ fontSize: "1.5em" }}
            />
          </a>
          <a
            className="nav-anchor-visited nav-anchor-hover"
            href="/leaderBoard"
          >
            <FontAwesomeIcon
              icon="fas fa-crown"
              style={{ fontSize: "1.5em" }}
            />
          </a>
          <a className="nav-anchor-visited nav-anchor-hover" href="/about">
            <FontAwesomeIcon
              icon="fas fa-info-circle"
              style={{ fontSize: "1.5em" }}
            />
          </a>
          <span className="ms-2">
            Average WPM:{" "}
            <strong>
              <p id="highestUserWPM"></p>
            </strong>
          </span>
        </div>

        {/* Gap is here */}

        <div className="d-flex align-items-center gap-3 ms-md-3 mt-2 mt-md-0">
          <a className="" href="/settings">
            <FontAwesomeIcon icon="fas fa-cog" style={{ fontSize: "1.5em" }} />
          </a>
          <a className="" href="/login">
            <FontAwesomeIcon
              icon="fas fa-circle-user"
              style={{ fontSize: "1.5em" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
