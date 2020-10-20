import React, { useState, useEffect } from 'react';

import './styles/scss/emojis.scss';
import './styles/scss/layout.scss';

import github from './images/github.svg';
import fast from './images/fast.png';
import slow from './images/slow.png';
import play from './images/play.png';
import pause from './images/pause.png';

import alphabet from './alphabet.json';

const App = () => {
  console.log(alphabet);
  console.log(alphabet[0])
  const dictionary = alphabet;
  dictionary.sort();

  const [intervalTime, setIntervalTime] = useState(2000);
  const [paused, setPaused] = useState(false);
  const [intervalObj, setIntervalObj] = useState(null);
  const [index, setIndex] = useState(0);

  const advance = () => {
    setIndex((prev) => {
      if (prev + 1 >= dictionary.length) {
        return 0;
      }
      return prev + 1;
    });
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

  const getChar = (index) => dictionary[index][0];
  const getWord = (index) => dictionary[index];

  return (
    <>
    <div className="App">
      <h1>{getChar(index)}</h1>
      <h2>{getWord(index)}</h2>

      <div id="IconContainer" className={getWord(index)} />

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
