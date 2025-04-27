import React, {useState, useEffect, useRef, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import {generate, count} from 'random-words';
import axios from 'axios';

const NUMB_OF_WORD = 170;
const SECONDS = 60;
const WORDS_PER_SCREEN = 60


const GamePage = ({cookie}) => {
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
  const[textGenerated, setTextGenerated] = useState(true);
  //iterator for tracking which word user is at in word array
  const [it, setIt] = useState(0);
  //correct characters typed
  const [correctChars, setCorrectChars] = useState(0);
  //defining input ref so when game starts, you can automatically type on keyboard without clicking it
  const inputRef = useRef(null);
  //current word iterator
  const [currIt, setCurrIt] = useState(0);
  //state for words per line so we can have dynamic screen sizes
  const [wordsPerLine, setWordsPerLine] = useState(12);
  //state for how many characters per line can exist for the purposes of resizing screen dynamically
  const [charactersPerLine, setCharactersPerLine] = useState(0);
  //reference for container containing typed words for the purposes of reszizing
  const typingContainerRef = useRef(null);
  //char reference used for calculating character width which is using for the purposes of resizing typing container
  const charRef = useRef(null);
  //state fortracking final wpm, never gets set to zero
  const finalWpmRef = useRef(0);

  //Auxiliary functions to help with game
  function generateWords(){
    //generate list of words
    let tempWords = generate(NUMB_OF_WORD);
    //add a space to every word except for the last one
    for(let i = 0; i < tempWords.length-1; i++){
      tempWords[i] = tempWords[i] + ' ';
    }
    setWords(tempWords);
  }

  //got this from chatgpt
  function formatTime(time){
    const minutes = Math.floor(time/60);
    const seconds = time%60;
    return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }

  const navigate = useNavigate();
  function handleClick(page){
      navigate(page);
  }

  //handles starting the game from the start game button
  function start() {
    setGameStatus(true);
  }

  async function postGameData(finalWpm){
    console.log("posting game data");
    //get user information
    let userData = cookie.usr;
    //store data in object
    const data = {
      "userID": userData.userID,
      "wpm": finalWpm,
      "time": 60,
      "mode": 1,
    }
    //post
    try{
      await axios.post('http://localhost:3000/api/postNewGame', data);
    } catch(e){
      console.log('Error posting game data')
    }
  }

  //checks if typed input matches current word
  function handleTypedInput(event){
    //grab typed input
    let typedPhrase = event.target.value;

    //add character to typed word
    setTypedWord(typedPhrase);
    if(typedPhrase === words[currIt]){
      //if game is running, allow characters to be recorded
      if(gameStatus === true){
        //get correct characters typed so far
        let charsTyped = correctChars;
        //add current typedPhrase length to charsTyped
        charsTyped += typedPhrase.length;
        //set chars typed. This is used to calculate words per minute
        setCorrectChars(charsTyped);
      }
      //increment the word
      setCurrIt(currIt+1);
      //set input word to nothing
      setTypedWord("");

    }
  }



  //calculate words per minute which is characters per second divided by 5
  function calWPM(numChars, time){
    //convert characters to words
    let words_ = numChars/5;
    //calculate wpm if 
    if(SECONDS-time != 0){
      //calculate seconds elapsed
      let secondsElapsed = SECONDS-time;
      //convert secondsElapsed to minutes elapsed
      let minutesElapsed = secondsElapsed/60;
      //return wpm which is words/minutes
      return words_/minutesElapsed;
    }
    //return 0 if no time has passed
    return 0;
  }


  //useEffect hooks for game logic
  //This hook generates initial text when page first loads
  useEffect(() => {
    generateWords();
  }, [])

  //This hook is responsible for generating text when the game starts and resetting it
  useEffect(() => {
    //checks if gameStatus is true and runs the text generation if it is true
    if(gameStatus === true){
      //set text counter to 0
      setIt(0);
      //set currIt counter to 0
      setCurrIt(0);
      //set typed word to nothing
      setTypedWord("");
      //if text is not generated, generate the text
      if(textGenerated===false){
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
  }, [gameStatus])

  
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
        tempTime = tempTime-1;
        //when timer hits zero, game is over
        if(tempTime <= 0){
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
          if(cookie.usr){
            postGameData(finalWpm_).then(() => {
            });
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
    if(tmpWpm != 0){
      finalWpmRef.current = Math.round(tmpWpm);
    }
    setWpm(Math.round(tmpWpm));
    //useeffect function runs when correctChars changes
  }, [correctChars])

  const handleResize = () => {
    if (!typingContainerRef.current || !charRef.current){
      console.log("One or both refs are null");
      return;
    }

    //get container padding
    const containerElement = typingContainerRef.current;
    const containerStyles = window.getComputedStyle(containerElement);
    const containerPadding = parseFloat(containerStyles.paddingLeft) + parseFloat(containerStyles.paddingRight);

    //get the container width
    const containerWidth = typingContainerRef.current.offsetWidth - containerPadding;

    //get the character width
    const characterWidth = charRef.current.offsetWidth;
    //calculate how many characters can fit within container
    const charAmount = Math.floor(containerWidth/characterWidth);
    //set characters per line
    setCharactersPerLine(charAmount);
  };

  //use effect for handling screensize
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  useEffect(() => {
    handleResize(); // Run on initial render
  }, []);
  
  useEffect(() => {
    if (gameStatus) {
      setTimeout(() => {
        handleResize(); // Run after the game starts
      }, 0);
    }
  }, [gameStatus]);


  //function for rendering the text, will be same across all games
  const renderGame = useMemo(() => {
    if (charactersPerLine === 0) {
      return [];
    }
    //used to track indexes of all characters from 0 - n characters
    let charIndex = 0;
    //tracks the starting position of the current word we are typing
    let currWordIndex = 0;
    //set curr word index - must happen only once
    let setCurrWordIndex = false;
    //flag to mark all words typed after incorrect character red
    let incorrectCharFound = false;
    //tracking which word we are on
    let currWord = 0;
    //current line
    let line = [];
    //set of lines
    let lines = [];

    //grab characters per line
    let charsPerLine = charactersPerLine;
    let charsPerLineSoFar = 0;
    let wordsOnCurrentLine = 0;
    let visibleWords = words.slice(it, it+85);
    //unique keys for letters in lines. Coutns number of characters total
    let k = 0;

    //set it forward if needed
    if(currIt >= it + wordsPerLine){
      setIt(currIt);
    }

    //iterate through all words from iterator marker onwards
    let wordIt = 0;
    while(wordIt < visibleWords.length && lines.length < 4){
      if(charsPerLineSoFar + visibleWords[wordIt].length <= charsPerLine){
        //add word length to charsPerLineSoFar
        charsPerLineSoFar += visibleWords[wordIt].length;
        //add every letter to line through rendering logic
        for(let letterIt = 0; letterIt < visibleWords[wordIt].length; letterIt++){
          //rendering logic
          //default rendering styles
          let styling = {};
          let charSpan= <span></span>
          //if word has already been typed
          if(wordIt+it < currIt){
            styling = {color: "white"};
            charSpan=
            <span key={k} style={styling}>
              {visibleWords[wordIt][letterIt]}
            </span>
          } else {
            if(wordIt+it === currIt){
              if(setCurrWordIndex === false){
                currWordIndex = k;
                setCurrWordIndex = true;
              }
            }
            
            //check if character has been typed
            if(k-currWordIndex < typedWord.length){
              //if it has been typed, check if correct, if correct make it white
              if(visibleWords[wordIt][letterIt] === typedWord[letterIt] && incorrectCharFound === false){
                styling = {color: "white", position: 'relative'};
              } else {
                styling = {color: "red", position: 'relative'};
                incorrectCharFound = true;
              }
            } else {
              styling = {color: "grey", position: 'relative'};
            }

            //check whether to print cursor or not
            if(k-currWordIndex === typedWord.length){
              charSpan=
              <span key={k} style={styling}>
                {visibleWords[wordIt][letterIt]}
                <span style={{
                  position: 'absolute',
                  left: -2,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: 'orange',
                  animation: 'blink 1s step-end infinite',
                }} />
              </span>
            } else {
              charSpan=
              <span key={k} style={styling}>
                {visibleWords[wordIt][letterIt]}
              </span>
            }
          }
          line.push(charSpan);
          //increment unique key
          k++;
        }
        //increment wordIt;
        wordIt++;
        //increment words on current line
        wordsOnCurrentLine++;
      } else {
        //push the line of words into lines
        lines.push(<div key={lines.length}>{line}</div>);
        //reset charsperlinesofar and line and wordsOnCurrentline
        if(lines.length == 1){
          setWordsPerLine(wordsOnCurrentLine);
        }
        charsPerLineSoFar = 0;
        line = [];
        wordsOnCurrentLine = 0;
      }
    }

    return lines;
  }, [words, it, typedWord, wordsPerLine, charactersPerLine]);

  return (
    <div className="container-fluid d-flex flex-column flex-grow-1 align-items-center m-5">
      <div className="row w-75 rounded p-4 theme-l2 fw-bold mb-4">
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Mode: {mode}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Time: {formatTime(time)}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">wpm: {wpm}</div>
      </div>
      {/*Conditionally render game is game is running or not*/}
      {gameStatus &&
        <div ref={typingContainerRef} className="w-75 p-5 fs-5 font-monospace">
          <div ref={charRef} style={{visibility: 'hidden', position: 'absolute' }}>
            <span>a</span>
          </div>
          <div>
            {renderGame}
          </div>
        </div>
      }
      {gameStatus&&
        <input
          ref={inputRef} 
          className="w-50 m-6"
          value={typedWord}
          onChange={(event) => handleTypedInput(event)}
        />
      }
      <div className="container mt-5 d-flex flex-row gap-3">
        {gameStatus === false &&
        <button onClick={()=>start()} className="btn btn-lg custom-btn theme-l2 mb-3 fw-bold">Start</button>}
        <button onClick={() => handleClick('/Home')} className="btn btn-lg custom-btn theme-l2 mb-3 fw-bold">Home</button>
      </div>
      {/*Hidden character reference used to calculating width of a character*/}
    </div>
  )
}

export default GamePage