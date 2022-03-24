import React from 'react';
import Scoreboard from '../Scoreboard';

import { Button } from 'react-bootstrap';

function TypingTestScoreboard({ setPage, game, userScore, isSubmitting }) {

  if (isSubmitting) return null;

  return (
    <div className='leaderboard'>
      <h3>{game.name} Leaderboard</h3>
      <Scoreboard game={game} userScore={userScore}/>
      <Button style={{marginTop: '1rem'}} onClick={() => setPage('NumberMemory')}>Play again</Button>
    </div>
  )
}

export default TypingTestScoreboard;