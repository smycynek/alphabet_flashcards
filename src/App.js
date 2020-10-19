import React, { useState, useEffect, useReducer, useDebugValue } from 'react';

import './App.css';
import github from './images/github.svg';
import fast from './images/fast.png';
import slow from './images/slow.png';
import play from './images/play.png';
import pause from './images/pause.png';

import alphabet from './alphabet.json';

const App = () => {
  const dictionary = alphabet;

  const [intervalTime, setIntervalTime] = useState(2000);
  const [paused, setPaused] = useState(false);
  const [intervalObj, setIntervalObj] = useState(null);
  const getWordCount = (theIndex) => {
    console.log(theIndex);
    return Object.values(dictionary[theIndex])[0].length;
  };

  const incrementReducer = (charWordPosition, { type, payload }) => {
    switch (type) {
      case 'increment':
        // eslint-disable-next-line no-case-declarations
        const charIndex = charWordPosition.char;
        const wordIndex = charWordPosition.word;
        let nextWordIndex = 0;
        let nextCharIndex = charIndex;
        const currentWordCount = getWordCount(charIndex);
        if (wordIndex +1 >= currentWordCount) {
          nextWordIndex = 0;
        }
        else {
          nextWordIndex = wordIndex + 1;
        }

        if (nextWordIndex === 0) {
          if (charIndex +1 >= dictionary.length) {
            nextCharIndex = 0;
          } else {
            nextCharIndex = nextCharIndex + 1;
          }
        }

        return {
          char: nextCharIndex,
          word: nextWordIndex,
        };
      case 'reset':
        return {char: 0, word: 0};
      default:
        throw new Error();
    }
  };

  const [charWordPosition, dispatch] = useReducer(incrementReducer, {char:0, word:0});
  const advance = () => {
    dispatch({ type: 'increment' });
  };

  useEffect(() => {
    const intObj = setInterval(() => {
      advance();
    }, intervalTime);
    setIntervalObj(intObj);
    return () => clearInterval(intObj);
  }, []);


  const pauseToggle = () => {
    if (paused === true) {
      setPaused(false);
      setIntervalObj(setInterval(
        () => advance(),
        intervalTime,
      ));
    } else {
      setPaused(true);
      clearInterval(intervalObj);
    }
  
  };

  const getLabel = () => {
    if (paused === true) {
      return play;
    }
    return pause;
  };

  const resetTimer = () => {
    clearInterval(intervalObj);
    setIntervalObj(setInterval(
      () => advance(),
      intervalTime,
    ));
  };
  
  const speedUp = () => {
    setPaused(false);
    setIntervalTime(intervalTime <= 2000 ? 1000 : intervalTime - 1000);
    resetTimer();
  };

  const slowDown = () => {
    setPaused(false);
    setIntervalTime(intervalTime >= 30000 ? 30000 : intervalTime + 1000);
    resetTimer();
  };

  const getChar = (acharIndex) => Object.keys(dictionary[acharIndex])[0];

  const getWord = (acharIndex, awordIndex) => Object.values(dictionary[acharIndex])[0][awordIndex];

  return (
    <>
    <div className="App">
      <h1>{getChar(charWordPosition.char)}</h1>
      <h2>{getWord(charWordPosition.char, charWordPosition.word)}</h2>
      <div id="IconContainer" className={getWord(charWordPosition.char, charWordPosition.word)} />

      <footer className="Footer">
        <button className="Subtle-button" onClick={slowDown}><img alt="slow down" src={slow} /></button>
        <button className="Subtle-button" onClick={pauseToggle}><img alt="pause/play" src={getLabel()} /></button>
        <button className="Subtle-button" onClick={speedUp}><img alt="speed up" src={fast} /></button>

      </footer>

    </div>

        <div className="Info-Row">
        <a href="https://github.com/smycynek/alphabet_flashcards">
          <img className="Info-icon" alt="source code" src={github} />
        </a>
      </div>
      </>
  );
};

export default App;
