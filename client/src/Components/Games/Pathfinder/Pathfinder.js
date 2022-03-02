import { useState, useEffect } from 'react';

import PathfinderGame from './PathfinderGame';
import PathfinderSandbox from './PathfinderSandbox';
import PathfinderScoreboard from './PathfinderScoreboard';
import Scoreboard from '../Scoreboard';

function Pathfinder({ game, user }) {
  const [page, setPage] = useState('PathfinderScoreboard');
  const [userScore, setUserScore] = useState({});
  const [errors, setErrors] = useState([]);

  function handleScoreSubmit(score) {
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
            setErrors([]);
          })
        } else {
          r.json().then(err => {
            setErrors(err.errors);
          })
        }
      })
  }

  if (page === 'PathfinderGame') return <PathfinderGame setPage={setPage} handleScoreSubmit={handleScoreSubmit}/>
  if (page === 'PathfinderSandbox') return <PathfinderSandbox setPage={setPage}/>
  if (page === 'PathfinderScoreboard') return <PathfinderScoreboard setPage={setPage} game={game} userScore={userScore}/>
  if (page === 'Scoreboard') return <Scoreboard setPage={setPage} game={game} userScore={userScore} />
}

export default Pathfinder;