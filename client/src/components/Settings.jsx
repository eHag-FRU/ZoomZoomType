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
const SettingsBlock = ({ title, buttons }) => (
  <li className="settings-block">
    <div className="block-header">
      <h2>{title}</h2>
    </div>
    <ul className="block-buttons">
      {buttons.map((button, index) => (
        <li key={index} className="button">
          {button.content}
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
      buttons: [
        { content: "Blue" },
        { content: "Green" },
        { content: "Red" },
        { content: "Yellow" },
      ],
    },
  ];

  // Once blockData is established, we create the elements
  // blockData maps the block data into each block
  return (
    <div className="settings-window">
      <div className="settings-header">
        <h1>Settings</h1>
        <ul className="settings-blocks">
          {blockData.map((block, index) => (
            <SettingsBlock
              key={index}
              title={block.title}
              buttons={block.buttons}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
