import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {FontAwesomeIcoin} from "@fontawesome/react-fontawesome"

const About = () => {

    return (
        <div class="theme-d5">
            <div class="grid auto-cols-auto">
                <div ><FontAwesomeIcon icon="fa-solid fa-car-on" size='4x'/></div>
                    <div><h2>Zoom Zoom Type </h2></div>
                    <div><FontAwesomeIcon icon="fa-solid fa-keyboard" size='2x'/></div>
                    <div><FontAwesomeIcon icon="fa-solid fa-crown" size='2x'/></div>
                    <div><FontAwesomeIcon icon="fa-solid fa-circle-info" size='2x'/></div>
                    <div><h3>Average WPM: <p id='wpmCounter'>55</p></h3></div>
                    <div><a href="#" class="nav-anchor-visited" ><FontAwesomeIcon icon="fa-solid fa-gear" class="nav-anchor-hover nav-anchor-visited"/></a></div>
                    <div><a href="#" class="nav-anchor-visited"><FontAwesomeIcon icon="fa-solid fa-circle-user" size='1x' class='nav-anchor-hover nav-anchor-visited'/></a></div>
            </div>
        </div>
    )
}

export default About;