import React from 'react';
import Scoreboard from '../Scoreboard';

import { Button } from 'react-bootstrap';

function PathfinderScoreboard({ setPage, game, userScore }) {

  return (
    <div className='leaderboard'>
      <h3>{game.name} Leaderboard</h3>
      <Scoreboard game={game} />
      <Button onClick={() => setPage('PathfinderGame')}>Play again</Button>
    </div>
  )
}

export default PathfinderScoreboard;