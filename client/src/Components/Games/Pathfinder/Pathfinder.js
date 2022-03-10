import { useState } from 'react';

import { Button } from 'react-bootstrap';
import pathfinderLight from '../../../assets/pathfinder_light.png';

import PathfinderGame from './PathfinderGame';
import PathfinderSandbox from './PathfinderSandbox';
import PathfinderScoreboard from './PathfinderScoreboard';
import PathfinderVersus from './PathfinderVersus';

function Pathfinder({ game, user }) {
  const [page, setPage] = useState('PathfinderGame');
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
      <div className='pathfinder-main'>
        <img src={pathfinderLight}></img>
        <h1>Welcome to Pathfinder</h1>
        <Button onClick={() => setPage('PathfinderGame')}>Classic</Button>
        {/* <Button onClick={() => setPage('PathfinderVersus')}>Versus AI</Button> */}
        <Button onClick={() => setPage('PathfinderSandbox')}>Sandbox</Button>
      </div>
    )
  }

  if (page === 'PathfinderGame') return <PathfinderGame setPage={setPage} handleScoreSubmit={handleScoreSubmit}/>
  if (page === 'PathfinderVersus') return <PathfinderVersus setPage={setPage} />
  if (page === 'PathfinderSandbox') return <PathfinderSandbox setPage={setPage}/>
  if (page === 'PathfinderScoreboard') return <PathfinderScoreboard setPage={setPage} game={game} userScore={userScore} isSubmitting={isSubmitting}/>
}

export default Pathfinder;