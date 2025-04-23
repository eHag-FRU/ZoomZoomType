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
const SettingsBlock = ({ title, context, buttons }) => (
  <li className="settings-block">
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
            className="btn btn-primary w-100"
            data-bs-toggle="button"
          >
            {button.content}
          </button>
        </li>
      ))}
    </ul>
  </li>
);

const Settings = () => {
  // takes a json as input for the settings
  // title:   Title of the settings segment
  // buttons: Options inside of the segment
  // content: The text presented in the button
  const blockData = [
    {
      title: "Keyboard Layout",
      context: "Changes the keyboard format (only while the game is running)",
      buttons: [
        { content: "QWERTY" },
        { content: "Colemak" },
        { content: "Dvorak" },
        { content: "Workman" },
        { content: "QWERTZ" },
      ],
    },
    {
      title: "Font",
      context: "Style up the play field with a funky font!",
      buttons: [
        { content: "Arial" },
        { content: "Helvetica" },
        { content: "Consolas" },
        { content: "Comic Sans" },
        { content: "Times New Roman" },
      ],
    },
    {
      title: "Theme",
      context: "Changes the theme colors of the website.",
      buttons: [
        { content: "Blue" },
        { content: "Green" },
        { content: "Red" },
        { content: "Yellow" },
      ],
    },
    {
      title: "Sound Effects",
      context: "Adds sound effects whenever the player types a letter.",
      buttons: [
        { content: "No Sound" },
        { content: "OOF" },
        { content: "osu!" },
        { content: "Fart" },
        { content: "Cherry MX Blues" },
        { content: "Vine Boom" },
      ],
    },
  ];

  // Once blockData is established, we create the elements
  // blockData maps the block data into each block
  return (
    <div className="container justify-content-center">
      <div className="header">
        <h1>Settings</h1>
      </div>
      <ul className="list-unstyled">
        {blockData.map((block, index) => (
          <SettingsBlock
            key={index}
            title={block.title}
            context={block.context}
            buttons={block.buttons}
          />
        ))}
      </ul>
    </div>
  );
};

export default Settings;
