import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import Countdown from './Countdown';

function NumberMemoryGame({ handleScoreSubmit, errors }) {
  const [answerPage, setAnswerPage] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctNum, setCorrectNum] = useState(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // Random decimal between 1 and 9
  const randNum = (Math.random() * (9 - 1) + 1)

  useEffect(() => {
    setCorrectNum(parseInt(randNum * multiplier));
    setScore(0);
  }, [])

  function gamePage() {
    if (gameOver) {
      return (
        <>
          <h1 className='shake'>GAME OVER</h1>
          <h3>Number: <span id='correct'>{correctNum}</span></h3>
          <h3>Your Answer: <span id='incorrect'>{answer}</span></h3>
          <br></br>
          <h3>Digits Memorized: {score}</h3>
          {errors.map(error => <p className='errors'>{error}</p>)}
          <div id='game-over-buttons'>
            <Button style={{margin: 'auto'}} id='submit-button' onClick={() => handleScoreboard()}>Submit Score</Button>
            <Button style={{margin: 'auto'}} onClick={() => resetGame()} >Try Again</Button>
          </div>
        </>
      )
    } else if (answerPage) {
      return (
        <>
          <h2>Do you remember the number?</h2> 
          <form onSubmit={handleSubmit}>
          <input autoFocus type='number' onChange={(e) => setAnswer(e.target.value)} value={answer}/> 
          <Button type='submit'>Submit</Button>
          </form>
        </>
      )
    } else {
      return (
        <>
          <h2>Memorize:</h2>
          <h1 className='unselectable'>{correctNum}</h1>
          <br></br>
          <Countdown setAnswerPage={setAnswerPage}/>
        </>
      )
    }
  }

  // HANDLERS
  function handleSubmit(e) {
    e.preventDefault();
    if (answer == correctNum) {
      setScore(score + 1);
      setAnswerPage(false);
      setMultiplier(multiplier * 10);
      // multiplier * 10 to handle lifecycle async
      setCorrectNum(parseInt(randNum * (multiplier * 10)));
      setAnswer('');
    } else {
      setGameOver(true);
    }
  }

  function handleScoreboard() {
    handleScoreSubmit(score);
  }

  function resetGame() {
    setGameOver(false);
    setCorrectNum(parseInt(randNum));
    setScore(0);
    setMultiplier(1);
    setAnswerPage(false);
    setAnswer('');
  }

  return (
    <div className='number-memory-main'>
      {gamePage()}
    </div>
  )
}

export default NumberMemoryGame;