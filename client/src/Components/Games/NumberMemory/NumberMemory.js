import { useState } from 'react';

import './NumberMemory.css'
import { Button } from 'react-bootstrap';

import NumberMemoryGame from './NumberMemoryGame';
import NumberMemoryScoreboard from './NumberMemoryScoreboard';

function NumberMemory({ game, user }) {
  const [page, setPage] = useState('NumberMemory');
  const [userScore, setUserScore] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleScoreSubmit(score) {
    setIsSubmitting(true);
    fetch('/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: score,
        user_id: user.id,
        game_id: game.id
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(newScore => {
            setUserScore(newScore);
            setIsSubmitting(false);
            setErrors([]);
          })
        } else {
          r.json().then(err => {
            setIsSubmitting(false);
            setErrors(err.errors);
          })
        }
      })
  }

  if (page === 'NumberMemory') {
    return (
      <div className='number-memory-main'>
        <h1>Number Memory</h1>
        <h3>How many digits can you remember?</h3>
        <Button onClick={() => setPage('NumberMemoryGame')}>START</Button>
      </div>
    )
  }

  if (page === 'NumberMemoryGame') return <NumberMemoryGame setPage={setPage} handleScoreSubmit={handleScoreSubmit}/>
  if (page === 'NumberMemoryScoreboard') return <NumberMemoryScoreboard setPage={setPage} game={game} userScore={userScore} isSubmitting={isSubmitting} />
}


export default NumberMemory;