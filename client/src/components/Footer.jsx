import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ theme }) => {
  return (
    <footer className="bg-transparent text-center py-3 mt-auto">
      <a href="https://github.com/eHag-FRU/ZoomZoomType" className={`icon-${theme} footer-anchor-hover`}>
        {" "}
        <FontAwesomeIcon icon="fa-brands fa-github" size="2x" />
      </a>
    </footer>
  );
};

export default Footer;
