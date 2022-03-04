import { useState, useEffect } from 'react';

import { Button } from 'react-bootstrap';

import PathfinderGame from './PathfinderGame';
import PathfinderSandbox from './PathfinderSandbox';
import PathfinderScoreboard from './PathfinderScoreboard';
import Scoreboard from '../Scoreboard';

function Pathfinder({ game, user }) {
  const [page, setPage] = useState('PathfinderScoreboard');
  const [userScore, setUserScore] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleScoreSubmit(score) {
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
          })
        } else {
          r.json().then(err => {
            setIsSubmitting(false);
            setErrors(err.errors);
          })
        }
      })
  }

  if (page === 'Pathfinder') {
    return (
      <div>
        <h1>Welcome to Pathfinder</h1>
        <Button onClick={() => setPage('PathfinderGame')}>Classic</Button>
        <Button>Versus AI</Button>
        <Button onClick={() => setPage('PathfinderSandbox')}>Sandbox</Button>
      </div>
    )
  }

  if (page === 'PathfinderGame') return <PathfinderGame setPage={setPage} handleScoreSubmit={handleScoreSubmit}/>
  if (page === 'PathfinderSandbox') return <PathfinderSandbox setPage={setPage}/>
  if (page === 'PathfinderScoreboard') return <PathfinderScoreboard setPage={setPage} game={game} userScore={userScore} isSubmitting={isSubmitting}/>
  // if (page === 'Scoreboard') return <Scoreboard setPage={setPage} game={game} userScore={userScore} />
}

export default Pathfinder;