import React, {useState} from 'react';
 

const GamePage = () => {
  const [mode, setMode] = useState("Solo Quotes");
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [text, setText] = useState("");

  //got this from chatgpt
  function formatTime(time){
    const minutes = Math.floor(time/60);
    const seconds = time%60;
    return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }


  return (
    <div className="container-fluid d-flex flex-column flex-grow-1 align-items-center m-5">
      <div className="row w-75 rounded p-4 theme-l2 fw-bold mb-4">
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Mode: {mode}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Time: {formatTime(time)}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">wpm: {wpm}</div>
      </div>
      <div className="w-75 p-5 fs-5">
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        </p>
      </div>
      <input className="w-50 m-6"/>
      <div className="container mt-5">
        <button className="btn btn-lg custom-btn theme-l2 mb-3 fw-bold">Home</button>
      </div>
    </div>
  )
}

export default GamePage