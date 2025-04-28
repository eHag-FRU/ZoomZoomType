import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { generate, count } from "random-words";
import axios from "axios";

const NUMB_OF_WORD = 1000;
const SECONDS = 60;

const MemorizeGame = ({ cookie, theme }) => {
  //used placeholder for future gamemodes
  const [mode, setMode] = useState("Memorize");
  //place holder for ability to set time
  const [time, setTime] = useState(SECONDS);
  //future calculated wpm
  const [wpm, setWpm] = useState(0);
  //const [targetText, setTargetText] = useState("Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos");
  const [words, setWords] = useState([]);
  //text user types
  const [typedWord, setTypedWord] = useState("");
  //Game status
  const [gameStatus, setGameStatus] = useState(false);
  //IsTextGenerated?
  const [textGenerated, setTextGenerated] = useState(true);
  //iterator for tracking which word user is at in word array
  const [it, setIt] = useState(0);
  //correct characters typed
  const [correctChars, setCorrectChars] = useState(0);
  //defining input ref so when game starts, you can automatically type on keyboard without clicking it
  const inputRef = useRef(null);
  //current word iterator
  const [currIt, setCurrIt] = useState(0);
  //state for words per line so we can have dynamic screen sizes
  const [wordsPerLine, setWordsPerLine] = useState(10);
  //state for how many characters per line can exist for the purposes of resizing screen dynamically
  const [charactersPerLine, setCharactersPerLine] = useState(0);
  //reference for container containing typed words for the purposes of reszizing
  const typingContainerRef = useRef(null);
  //char reference used for calculating character width which is using for the purposes of resizing typing container
  const charRef = useRef(null);
  //state fortracking final wpm, never gets set to zero
  const finalWpmRef = useRef(0);
  //current line index
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  //future line index
  const [futureLineIndex, setFutureLineIndex] = useState(0);
  //const lines memorized
  const [linesToMemorize, setLinesToMemorize] = useState([]);

  //Auxiliary functions to help with game
  function generateWords() {
    //lines to memorize
    let lines = []
    for(let i = 1; i < 100; i++){
      let tempWords = generate(i);
      let line = tempWords.join(" ");
      lines.push(line);
    }
    setLinesToMemorize(lines);
  }

  //got this from chatgpt
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  const navigate = useNavigate();
  function handleClick(page) {
    navigate(page);
  }

  //handles starting the game from the start game button
  function start() {
    setGameStatus(true);
    //set current line index to 0
    setCurrentLineIndex(0);
    //Clear input
    setTypedWord("");
    //reset correct chars
    setCorrectChars(0);
    //set the time
    setTime(SECONDS);
    setFutureLineIndex(0);
  }

  async function postGameData(finalWpm) {
    console.log("posting game data");
    //get user information
    let userData = cookie.usr;
    //store data in object
    const data = {
      userID: userData.userID,
      wpm: finalWpm,
      time: SECONDS,
      mode: 2,
    };
    //post
    try {
      await axios.post("http://localhost:3000/api/postNewGame", data);
    } catch (e) {
      console.log("Error posting game data");
    }
  }

  //checks if typed input matches current word
  function handleTypedInput(event) {
    //grab typed input
    let typedPhrase = event.target.value;

    //add character to typed word
    setTypedWord(typedPhrase);

    // Show the next line as soon as the user starts typing
    if (typedPhrase.length === 1 && currentLineIndex === futureLineIndex) {
      setFutureLineIndex((prev) => prev+1);
    }

    const currentLine = linesToMemorize[currentLineIndex];
    console.log(linesToMemorize[currentLineIndex])
    if (typedPhrase === currentLine) {
      //if game is running, allow characters to be recorded
      if (gameStatus === true) {
        //get correct characters typed so far
        let charsTyped = correctChars;
        //add current typedPhrase length to charsTyped
        charsTyped += typedPhrase.length;
        //set chars typed. This is used to calculate words per minute
        setCorrectChars(charsTyped);
      }
      //increment the word
      setCurrentLineIndex((prev) => prev + 1);
      //set input word to nothing
      setTypedWord("");
    }
  }

  //calculate words per minute which is characters per second divided by 5
  function calWPM(numChars, time) {
    //convert characters to words
    let words_ = numChars / 5;
    //calculate wpm if
    if (SECONDS - time != 0) {
      //calculate seconds elapsed
      let secondsElapsed = SECONDS - time;
      //convert secondsElapsed to minutes elapsed
      let minutesElapsed = secondsElapsed / 60;
      //return wpm which is words/minutes
      return words_ / minutesElapsed;
    }
    //return 0 if no time has passed
    return 0;
  }

  //useEffect hooks for game logic
  //This hook generates initial text when page first loads
  useEffect(() => {
    generateWords();
  }, []);

  //This hook is responsible for generating text when the game starts and resetting it
  useEffect(() => {
    //checks if gameStatus is true and runs the text generation if it is true
    if (gameStatus === true) {
      //set text counter to 0
      setIt(0);
      //set currIt counter to 0
      setCurrentLineIndex(0);
      //set typed word to nothing
      setTypedWord("");
      //if text is not generated, generate the text
      if (textGenerated === false) {
        generateWords();
        setTextGenerated(true);
      }
      //set wpm
      setWpm(0);
      //set counted characters
      setCorrectChars(0);
    }
    //auto focus on input bar so user doesn't have to manually click it after game starts
    if (gameStatus === true && inputRef.current) {
      inputRef.current.focus();
    }

    //hook runs when game Status updates
  }, [gameStatus]);

  //home responsible for managing the timer --will merge with first hook
  //will also post scores when game ends
  useEffect(() => {
    if (gameStatus === true) {
      //set time for timer to value of global variable SECONDS
      let tempTime = SECONDS;
      //set time to temp time before timer runs
      setTime(tempTime);
      //set timer that updates code roughly every second
      const timer = setInterval(() => {
        //decrement timer
        tempTime = tempTime - 1;
        //when timer hits zero, game is over
        if (tempTime <= 0) {
          //get final wpm
          //disable the timer
          clearInterval(timer);
          //set gameStatus to false
          setGameStatus(false);
          //set textGenerated to false so new text can generate
          setTextGenerated(false);
          //get wpm
          const finalWpm_ = finalWpmRef.current;
          //check if user is logged in
          if (cookie.usr) {
            postGameData(finalWpm_).then(() => {});
          }
        }
        //set time to new time
        setTime(tempTime);
      }, 1000);
    }
  }, [gameStatus]);

  //useEffect loop for updating words per minute
  useEffect(() => {
    let tmpCorrectChars = correctChars;
    let tmpWpm = calWPM(tmpCorrectChars, time);
    if (tmpWpm != 0) {
      finalWpmRef.current = Math.round(tmpWpm);
    }
    setWpm(Math.round(tmpWpm));
    //useeffect function runs when correctChars changes
  }, [correctChars, time]);

  // Render the current line
  const renderGame = useMemo(() => {
    if (currentLineIndex >= linesToMemorize.length) {
      return <div>Game Over! Well done!</div>;
    }
  
    // Show the previous line if no typing has started
    const lineToShow =linesToMemorize[futureLineIndex];
  
    return <div>{lineToShow}</div>;
  }, [currentLineIndex, linesToMemorize, typedWord]);
  return (
    <div className="container-fluid d-flex flex-column flex-grow-1 align-items-center m-5">
      <div className={`row w-75 rounded p-4 accent-${theme} fw-bold mb-4`}>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Mode: {mode}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Time: {formatTime(time)}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">wpm: {wpm}</div>
      </div>
      {/*Conditionally render game is game is running or not*/}
      {gameStatus && (
        <div ref={typingContainerRef} className="w-75 p-5 fs-5 font-monospace">
          <div ref={charRef} style={{ visibility: "hidden", position: "absolute" }}>
            <span>a</span>
          </div>
          <div className="text-center">{renderGame}</div>
        </div>
      )}
      {gameStatus && <input ref={inputRef} className="w-50 m-6" value={typedWord} onChange={(event) => handleTypedInput(event)} />}
      <div className="container mt-5 d-flex flex-row gap-3 justify-content-center">
        {gameStatus === false && (<button onClick={() => start()} className={`btn btn-lg btn-${theme} mb-3 fw-bold`}>Start</button>)}
        <button onClick={() => handleClick("/Home")} className={`btn btn-lg btn-${theme} mb-3 fw-bold`}>Home</button>
      </div>
      {/*Hidden character reference used to calculating width of a character*/}
    </div>
  );
};

export default MemorizeGame;
