import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GameModes = ({theme}) => {
  const navigate = useNavigate();
  function handleClick(page) {
    navigate(page);
  }

  return (
    <div className="content d-grid justify-content-around">
      <h1 className="h1 text-center">Gamemodes</h1>
      <div className="d-flex row py-3 justify-content-center">
        <button type="button" className={`btn btn-lg btn-${theme} mb-3 fw-bold`} onClick={() => handleClick("/ClassicGame")}>Classic Mode</button>
        <p className="col-6 text-center">The original typing experience.</p>
      </div>

      <div className="d-flex row py-3 justify-content-center">
        <button type="button" className={`btn btn-lg btn-${theme} mb-3 fw-bold`} onClick={() => handleClick("/LookAheadGame")}>Look Ahead Mode</button>
        <p className="col-6 text-center">Each word disappears as you begin to type it.</p>
      </div>

      <div className="d-flex row py-3 justify-content-center">
        <button type="button" className={`btn btn-lg btn-${theme} mb-3 fw-bold`} onClick={() => handleClick("/MemorizeGame")}>Memorize Mode</button>
        <p className="col-6 text-center">Memorize a line at a time!</p>
      </div>

      <div className="d-flex row py-3 justify-content-center">
        <button type="button" className={`btn btn-lg btn-${theme} mb-3 fw-bold`} onClick={() => handleClick("/QuoteGame")}>Quote Mode</button>
        <p className="col-6 text-center">Quote Mode: Type famous quotes. </p>
      </div>
    </div>
  );
};

export default GameModes;
