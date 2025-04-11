import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {generate, count} from 'random-words';

const NUMB_OF_WORD = 200;
const SECONDS = 60;


const GamePage = () => {
  //used placeholder for future gamemodes
  const [mode, setMode] = useState("Solo Quotes");
  //place holder for ability to set time
  const [time, setTime] = useState(60);
  //future calculated wpm
  const [wpm, setWpm] = useState(0);
  //const [targetText, setTargetText] = useState("Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos");
  const [words, setWords] = useState([]);
  //text user types
  const [typedWord, setTypedWord] = useState("");
  //array for user typed words
  const [typedWords, setTypedWords] = useState([]);
  //Game status
  const [status, setStatus] = useState(false);
  //iterator for tracking which word user is at in word array
  const [it, setIt] = useState(0);

  //Implement functionality to grab targetText from 
  useEffect(() => {
    //const Words = targetText.split(' ').filter(word => word.trim() !== '');
    setWords(generate(NUMB_OF_WORD));
  }, [])

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

  function start() {
    let interval = setInterval(() => {
      setTime
    })
  }

  function handleTypedInput(event){
    //grab typed input
    let typedPhrase = event.target.value;

    //add character to typed word
    setTypedWord(typedPhrase);
    console.log(typedPhrase, " ", words[it]);
    if(typedWord === words[it]){
      setIt(it+1);
      setTypedWord("");
    }

  }


  return (

    <div className="container-fluid d-flex flex-column flex-grow-1 align-items-center m-5">
      <div className="row w-75 rounded p-4 theme-l2 fw-bold mb-4">
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Mode: {mode}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">Time: {formatTime(time)}</div>
        <div className="col-12 col-lg-4 text-center mt-2 mb-2 fs-5">wpm: {wpm}</div>
      </div>
      <div className="w-75 p-5 fs-5">
        {words.map((word, i) => {
          //print already typed words as green because they have been successfully completed
          if(i < it){
            return(
              <span key={i} style={{color: "white"}}>
                {word + ' '}
              </span>
            )
          } 
          //if on current word, style character by character
          //TODO: Finish function
          else if(i === it){
            //split current word
            let chars = word.split('');
            console.log(chars);

            //map all the words and store in object
            let completedWord = chars.map((char, j) => {
              let styling = "";
              //if character is less than typedWord.length, it's already been typed, check if correct
              if(j < typedWord.length){
                if(typedWord[j] == char){
                  styling = "white";
                } else {
                  styling = "red";
                }
              } else {
                styling = 'gray';
              }
              //Print the caret
              if(j == typedWord.length){
                return (
                  <span key={j} style={{color: `gray`, position: 'relative', display: 'inline-block'}}>
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
                );
              }
              return(
                <span key={j} style={{color: `${styling}`}}>
                  {char}
                </span>
              )
            })
            return(
              <span key={i}>
                {completedWord}{' '}
              </span>
            )
          }
          //otherwise print word with no styling
          else {
            return (
              <span key={i} style={{color: 'grey'}}>
                {word + ' '}
              </span>
            );
          }
        })}
      </div>
      <input 
        className="w-50 m-6"
        value={typedWord}
        onChange={(event) => handleTypedInput(event)}
      />
      <h2>Debug</h2>
      <p>Current word: {typedWord}</p>
      <p>Target word: {words[it]}</p>
      <div className="container mt-5">
      <button onClick={() => handleClick('/Home')} className="btn btn-lg custom-btn theme-l2 mb-3 fw-bold">Start</button>
        <button onClick={() => handleClick('/Home')} className="btn btn-lg custom-btn theme-l2 mb-3 fw-bold">Home</button>
      </div>
    </div>
  )
}

export default GamePage