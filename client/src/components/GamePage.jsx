import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { generate, count } from "random-words";

const NUMB_OF_WORD = 170;
const SECONDS = 60;

const GamePage = ({ theme }) => {
  //used placeholder for future gamemodes
  const [mode, setMode] = useState("Random Lowercase Words");
  //place holder for ability to set time
  const [time, setTime] = useState(60);
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

  //Auxiliary functions to help with game
  function generateWords() {
    //generate list of words
    let tempWords = generate(NUMB_OF_WORD);
    //add a space to every word except for the last one
    for (let i = 0; i < tempWords.length - 1; i++) {
      tempWords[i] = tempWords[i] + " ";
    }
    setWords(tempWords);
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
  }

  //checks if typed input matches current word
  function handleTypedInput(event) {
    //grab typed input
    let typedPhrase = event.target.value;

    //add character to typed word
    setTypedWord(typedPhrase);
    console.log(typedPhrase, " ", words[it]);
    if (typedPhrase === words[it]) {
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
      setIt(it + 1);
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
      //set typed word to nothing
      setTypedWord("");
      //if text is not generated, generate the text
      if (textGenerated === false) {
        generateWords();
        setTextGenerated(true);
      }
    }
    //auto focus on input bar so user doesn't have to manually click it after game starts
    if (gameStatus === true && inputRef.current) {
      inputRef.current.focus();
    }

    //hook runs when game Status updates
  }, [gameStatus]);

  //home responsible for managing the timer --will merge with first hook
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
        //reset the game settings and record user wpm in database
        if (tempTime <= 0) {
          //disable the timer
          clearInterval(timer);
          //set gameStatus to false
          setGameStatus(false);
          //set textGenerated to false so new text can generate
          setTextGenerated(false);
          //TODO:
          /***********************************/
          //Record wpm in database
          /***********************************/
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
    setWpm(Math.round(tmpWpm));
    //useeffect function runs when correctChars changes
  }, [correctChars]);

  return (
    <div className="container-fluid d-flex flex-column flex-grow-1 align-items-center m-5">
      <div className="row w-75 rounded p-4 theme-l2 fw-bold mb-4">
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Mode: {mode}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Time: {formatTime(time)}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">wpm: {wpm}</div>
      </div>
      {/*Conditionally render game is game is running or not*/}
      {gameStatus && (
        <div className="w-75 p-5 fs-5">
          {/*Print the words and their typed state*/}
          {words.map((word, i) => {
            //print already typed words as green because they have been successfully completed
            if (i < it) {
              return (
                <span key={i} style={{ color: "white" }}>
                  {word + " "}
                </span>
              );
            }
            //if on current word, style character by character
            //TODO: Finish function
            else if (i === it) {
              //split current word
              let chars = word.split("");
              console.log(chars);

              //map all the words and store in object
              let completedWord = chars.map((char, j) => {
                let styling = "";
                //if character is less than typedWord.length, it's already been typed, check if correct
                if (j < typedWord.length) {
                  if (typedWord[j] == char) {
                    styling = "white";
                  } else {
                    styling = "red";
                  }
                } else {
                  styling = "gray";
                }
                //Print the caret
                //Ripped straight from chatgpt, will update with my own version once I understand this one
                /*TODO-update with own <version></version>
                /***********************************/
                if (j == typedWord.length) {
                  return (
                    <span key={j} style={{ color: `gray`, position: "relative", display: "inline-block" }}>
                      {char}
                      <span
                        style={{
                          position: "absolute",
                          left: -2,
                          top: 0,
                          bottom: 0,
                          width: "2px",
                          backgroundColor: "orange",
                          animation: "blink 1s step-end infinite",
                        }}
                      />
                    </span>
                  );
                }
                /***********************************/
                return (
                  <span key={j} style={{ color: `${styling}` }}>
                    {char}
                  </span>
                );
              });
              return <span key={i}>{completedWord} </span>;
            }
            //otherwise print word with no styling
            else {
              return (
                <span key={i} style={{ color: "grey" }}>
                  {word + " "}
                </span>
              );
            }
          })}
        </div>
      )}
      {gameStatus && <input ref={inputRef} className="w-50 m-6" value={typedWord} onChange={(event) => handleTypedInput(event)} />}
      <div className="container mt-5 d-flex flex-row gap-3">
        {gameStatus === false && (
          <button onClick={() => start()} className="btn btn-lg custom-btn theme-l2 mb-3 fw-bold">
            Start
          </button>
        )}
        <button onClick={() => handleClick("/Home")} className="btn btn-lg custom-btn theme-l2 mb-3 fw-bold">
          Home
        </button>
      </div>
    </div>
  );
};

export default GamePage;
