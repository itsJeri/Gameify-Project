import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import Countdown from './Countdown';

function NumberMemoryGame({ setPage, handleScoreSubmit }) {
  const [answerPage, setAnswerPage] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctNum, setCorrectNum] = useState(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(10);

  // Random Number place value increases per round
  const randNum = Math.floor(Math.random() * multiplier)

  useEffect(() => {
    setCorrectNum(randNum);
    setScore(0);
  }, [])

  function gamePage() {
    if (gameOver) {
      return (
        <>
          <h1>GAME OVER</h1>
          <h3>Score: {score}</h3>
          <Button onClick={() => handleScoreboard()}>Submit Score</Button>
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
          <h1>{correctNum}</h1>
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
      setCorrectNum(randNum * 10);
      setAnswer('');
    } else {
      setGameOver(true);
    }
  }

  function handleScoreboard() {
    handleScoreSubmit(score);
    setPage('NumberMemoryScoreboard')
  }

  return (
    <div className='number-memory-main'>
      {gamePage()}
    </div>
  )
}

export default NumberMemoryGame;