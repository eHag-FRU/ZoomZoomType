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
  - Footer (if we got it)
*/

// SettingsBlock takes a title and however many buttons inside
// Dynamically creates a segment for each section of the settings
const SettingsBlock = ({title, buttons}) => (
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
  // takes a json file as input for the settings
  // title:   Title of the settings segment
  // buttons: Options inside of the segment
  // content: The text presented in the button
  const blockData = [
    {
      title: "Test1",
      buttons: [{content: "button1"}, {content: "button2"}, {content: "button3"}, {content: "button4"}]
    },
    {
      title: "Test2",
      buttons: [{content: "button1"}, {content: "button2"}, {content: "button3"}, {content: "button4"}]
    },
    {
      title: "Test3",
      buttons: [{content: "button1"}, {content: "button2"}, {content: "button3"}, {content: "button4"}]
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
            <SettingsBlock key={index} title={block.title} buttons={block.buttons} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
