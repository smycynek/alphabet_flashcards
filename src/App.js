
import React from 'react'

import './App.css'
import bitbucket from './images/bitbucket.png'
import mail from './images/mail.png'
import fast from './images/fast.png'
import slow from './images/slow.png'
import play from './images/play.png'
import pause from './images/pause.png'

import alphabet from './alphabet.json'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.dictionary = alphabet
    this.state = { charIndex: 0, wordIndex: 0, interval: 5000, paused: false }
  }

  componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    )
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  tick () {
    this.advance()
  }

  resetTimer = () => {
    clearInterval(this.timerID)
    this.timerID = setInterval(
      () => this.tick(),
      this.state.interval)
  }

  pauseToggle = () => {
    if (this.state.paused === true) {
      this.setState({paused: false})
      this.timerID = setInterval(
        () => this.tick(),
        this.state.interval)
    } else {
      this.setState({paused: true})
      clearInterval(this.timerID)
    }
  }

  getLabel = () => {
    if (this.state.paused === true) {
      return play
    } else {
      return pause
    }
  }

  speedUp = () => {
    this.setState({
      paused: false,
      interval: this.state.interval <= 2000 ? 1000 : this.state.interval - 1000
    })
    this.resetTimer()
  }

  slowDown = () => {
    this.setState({
      paused: false,
      interval: this.state.interval >= 30000 ? 30000 : this.state.interval + 1000
    })
    this.resetTimer()
  }

  advance () {
    var nextChar = this.state.charIndex
    var nextWord = this.state.wordIndex + 1
    var currentWordLength = Object.values(this.dictionary[nextChar])[0].length
    if (nextWord === currentWordLength) {
      nextWord = 0
      nextChar = nextChar + 1
    }

    if (nextChar === this.dictionary.length) {
      nextChar = 0
      nextWord = 0
    }

    this.setState({
      charIndex: nextChar,
      wordIndex: nextWord
    })
  }

  getChar (charIndex) {
    return Object.keys(this.dictionary[charIndex])[0]
  }
  getWord (charIndex, wordIndex) {
    return Object.values(this.dictionary[charIndex])[0][wordIndex]
  }

  render () {
    return (
      <div className="App">
        <h1>{this.getChar(this.state.charIndex)}</h1>
        <h2>{this.getWord(this.state.charIndex, this.state.wordIndex)}</h2>
        <div id="IconContainer" className={ this.getWord(this.state.charIndex, this.state.wordIndex) } ></div>

        <footer className="Footer">
          <button className="Subtle-button" onClick={this.slowDown}><img alt="slow down" src={slow}/></button>
          <button className="Subtle-button" onClick={this.pauseToggle}><img alt= "pause/play" src={this.getLabel()}/></button>
          <button className="Subtle-button" onClick={this.speedUp}><img alt="speed up" src={fast}/></button>
          <div className="Info-Row">
            <a href="https://bitbucket.org/steventhevictor/alphabet_flashcards">
              <img className="Info-icon" alt="source code" src={bitbucket}/></a>
            <a href="mailto:sv@stevenvictor.net">
              <img className="Info-icon" alt="email" src={mail}/></a>
          </div>
        </footer>
      </div>
    )
  }
}

export default App
