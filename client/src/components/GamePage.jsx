import React, {useState, useEffect, useRef, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import {generate, count} from 'random-words';

const NUMB_OF_WORD = 170;
const SECONDS = 60;
const WORDS_PER_SCREEN = 60


const GamePage = () => {
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
        //reset the game settings and record user wpm in database
        if(tempTime <= 0){
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
  }, [correctChars])

  const handleResize = () => {
    if (!typingContainerRef.curren || !charRef.current) return;
  
    //get the container width
    const containerWidth = typingContainerRef.current.offsetWidth;
    //get the character width
    const characterWidth = charRef.current.offsetWidth;
    //calculate how many characters can fit within container
    const charAmount = Math.floor(containerWidth/characterWidth);
    //set characters per line
    setCharactersPerLine(charAmount);

    const baseWordWidth = 100; // Adjust this if needed
    const minWords = 1;
    const maxWords = 12;
  
    const calculatedWords = Math.max(
      minWords,
      Math.min(maxWords, Math.floor(containerWidth / baseWordWidth))
    );
    console.log(calculatedWords);
    setWordsPerLine(calculatedWords);
  };

  //use effect for handling screensize
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[]);


  //function for rendering the text, will be same across all games
  const renderGame = useMemo(() => {
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


    //TODO: REWRITE RENDERING LOGIC TO DO WORDS BASED OFF CHARACTERS PER LINE
    while(lines.length != 4){
      break;
    }


    if (currIt >= it + wordsPerLine) {
      setIt(currIt);
    }

    let visibleWords = words.slice(it, it+wordsPerLine*4);

    //map all the words to lines
    visibleWords.map((word, i) => {
      //split each word into its character components
      let chars = word.split('');
      //map the characters in each completed work to a <span> class
      let completedWord = chars.map((char, j) => {
        //intial styling for class
        let styling = "";
        //result span which will be appened to complete word
        let charSpan = <span></span>;
        //all previously typed chars are render with white styling
        if(i+it < currIt){
          styling = {color: "white"};
          charSpan=
            <span key={j} style={styling}>
              {char}
            </span>
        }
        //all currently typed or future chars will have variable styling which is handled in this else statement 
        else {
          if(i+it === currIt){
            //set wordIndex if it hasn't already been set
            if(setCurrWordIndex === false){
              currWordIndex = charIndex;
              setCurrWordIndex = true;
            }
          }
          //check if character has been typed
          if(charIndex-currWordIndex < typedWord.length){
            //if it has been typed and is correct, make character white
            if(typedWord[j] === char && incorrectCharFound === false){
              styling = {color: "white", position: 'relative'};
            }
            //if it has been typed but is not correct, make it red
            else {
              styling = {color: "red", position: 'relative'};
              incorrectCharFound = true;
            }
          }
          //if character hasn't been typed yet, make it grey 
          else {
            styling = {color: "grey", position: 'relative'}
          }

          //check whether to print cursor
          if(charIndex-currWordIndex == typedWord.length){
            charSpan=
            <span key={j} style={styling}>
              {char}
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
          }
          //otherwise just print without cursor 
          else {
            charSpan=
            <span key={j} style={styling}>
              {char}
            </span>
          }
        }
        //increment current char index
        charIndex = charIndex+1;
        //return current charspan
        return(
          charSpan
        );
      })
      //increment current word
      currWord = currWord + 1;

      //render the completed word
      line.push(<span key={i}>{completedWord}</span>);
      //check if you need to print a new line
      if ((currWord % wordsPerLine === 0) || i === visibleWords.length - 1){
        lines.push(
          <div>{line}</div>
        );
        line = [];
      } 
    })
    return(lines);
  }, [words, it, typedWord, wordsPerLine]);

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
          {renderGame}
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
      <div ref={charRef} className="d-none fs-5">
          a
      </div>
    </div>
  )
}

export default GamePage