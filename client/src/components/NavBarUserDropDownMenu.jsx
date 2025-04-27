import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router";

function NavBarUserDropDownMenu({
  isLoggedIn,
  deleteCookie,
  wpm,
  setWPM,
  theme,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const onLogout = () => {
    deleteCookie("usr", { path: "/" });
    setShowDropdown(false);

    //set the WPM to 0 after logout
    setWPM(0);

    //Redirect to homepage
    return <Navigate to="/" replace />;
  };

  return (
    <div className="d-flex align-items-center gap-3 ms-md-3 mt-2 mt-md-0 position-relative">
      <Link
        className={`nav-anchor-visited nav-anchor-hover icon-${theme}`}
        to="/settings"
      >
        <FontAwesomeIcon
          icon="fas fa-cog"
          style={{ fontSize: "1.5em" }}
          className={`icon-${theme}`}
        />
      </Link>

      <div className="position-relative">
        <div
          className={`nav-anchor-visited nav-anchor-hover icon-${theme}`}
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon
            icon="fas fa-circle-user"
            style={{ fontSize: "1.5em" }}
          />
        </div>

        {showDropdown && (
          <div
            className="dropdown-menu show position-absolute mt-2"
            style={{ right: 0 }}
          >
            {isLoggedIn ? (
              <>
                <Link
                  className="dropdown-item text-black"
                  to="/ProfilePage"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-black"
                  to="/settings"
                  onClick={() => setShowDropdown(false)}
                >
                  Settings
                </Link>
                <Link
                  className="dropdown-item text-black"
                  to="/leaderBoard"
                  onClick={() => setShowDropdown(false)}
                >
                  Leader Board
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item text-red" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="dropdown-item text-black"
                to="/login"
                onClick={() => setShowDropdown(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBarUserDropDownMenu;
