import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/*
  The settings page (according to the mockup) has the following approach
  - Header
    - Settings header
    - Settings blocks (keyboard layout, font, theme)
      - Block header
      - Block buttons
        - Buttons
          - Button content
  - Footer (if we got it)
*/

// SettingsBlock takes a title and however many buttons inside
// Dynamically creates a segment for each section of the settings
const SettingsBlock = ({ title, context, buttons, theme, onButtonClick }) => (
  <li className="settings-block my-3">
    <div className="d-grid py-3">
      <div className="block-header">
        <h2>{title}</h2>
      </div>
      <div className="block-context align-text-bottom">
        <p>{context}</p>
      </div>
    </div>
    <ul className="row g-2">
      {buttons.map((button, index) => (
        <li className="col-3 list-unstyled">
          <button
            key={index}
            type="button"
            className={`btn btn-outline-light w-100 btn-${theme}`}
            onClick={() => onButtonClick(title, button.content)}
          >
            {button.content}
          </button>
        </li>
      ))}
    </ul>
  </li>
);

const Settings = ({ font, setFont, theme, setTheme }) => {
  // so... i think I need to get the thing to (on click) get the Title info (setting block), and then the button content.
  // I can do that with a function I think
  const handleButtonClick = (blockID, buttonID) => {
    switch (blockID) {
      case "Keyboard Layout":
        // i dont have anything for this right now.
        break;
      case "Font":
        setFont(buttonID);
        break;
      case "Theme":
        setTheme(buttonID);
        break;
      default:
        break;
    }
  };

  // JSON format used to create setting blocks
  // title:   Title of the settings segment
  // context: Small description of the segment
  // buttons: Options inside of the segment
  // content: The text presented in the button
  const blockData = [
    {
      title: "Keyboard Layout",
      context: "Changes the keyboard format (only while the game is running)",
      buttons: [{ content: "QWERTY" }, { content: "Colemak" }, { content: "Dvorak" }, { content: "Workman" }, { content: "QWERTZ" }],
    },
    {
      title: "Font",
      context: "Style up the play field with a funky font!",
      buttons: [
        { content: "Arial" },
        { content: "Consolas" },
        { content: "Comic Sans MS" },
        { content: "Times New Roman" },
        { content: "Special Gothic Expanded One" },
        { content: "Coral Pixels" },
        { content: "Space Grotesk" },
        { content: "Style Script" },
        { content: "Galindo" },
        { content: "Poiret One" },
      ],
    },
    {
      title: "Theme",
      context: "Changes the theme colors of the website.",
      buttons: [
        { content: "theme-blue" },
        { content: "theme-green" },
        { content: "theme-red" },
        { content: "theme-yellow" },
        /*{ content: "theme-d5" },
        { content: "theme-d4" },
        { content: "theme-d3" },
        { content: "theme-d2" },
        { content: "theme-d1" },
        { content: "theme-l5" },
        { content: "theme-l4" },
        { content: "theme-l3" },
        { content: "theme-l2" },
        { content: "theme-l1" },*/
      ],
    },
  ];

  // Once blockData is established, we create the elements
  // blockData maps the block data into each block
  return (
    <div className="container justify-content-center">
      <div className="header pt-5">
        <h1 className="fw-bold">Settings</h1>
      </div>
      <ul className="list-unstyled">
        {blockData.map((block, index) => (
          <SettingsBlock
            key={index}
            title={block.title}
            context={block.context}
            buttons={block.buttons}
            theme={theme}
            onButtonClick={handleButtonClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Settings;
