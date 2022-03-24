import { useState, useEffect, useContext } from 'react';
import { Context } from '../../../context/Context';

import './NumberMemory.css';
import numberMemoryLight from '../../../assets/number_memory_light.png';
import { Button } from 'react-bootstrap';

import NumberMemoryGame from './NumberMemoryGame';
import NumberMemoryScoreboard from './NumberMemoryScoreboard';

function NumberMemory({ game }) {
  const [page, setPage] = useState('NumberMemory');
  const [userScore, setUserScore] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const {user} = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleScoreSubmit(score) {
    if (!user) setErrors(['Sorry, you need to be signed in to submit a score.'])
    // Waits for POST to GET leaderboard with new score
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
            setPage('NumberMemoryScoreboard');
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
        <img src={numberMemoryLight}></img>
        <h1>Number Memory</h1>
        <h3>How many digits can you remember?</h3>
        <Button onClick={() => setPage('NumberMemoryGame')}>START</Button>
      </div>
    )
  }

  if (page === 'NumberMemoryGame') return <NumberMemoryGame handleScoreSubmit={handleScoreSubmit} errors={errors}/>
  if (page === 'NumberMemoryScoreboard') return <NumberMemoryScoreboard setPage={setPage} game={game} userScore={userScore} isSubmitting={isSubmitting} />
}


export default NumberMemory;