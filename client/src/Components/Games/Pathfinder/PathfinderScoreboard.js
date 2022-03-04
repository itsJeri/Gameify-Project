import React from 'react';
import Scoreboard from '../Scoreboard';

import { Button } from 'react-bootstrap';

function PathfinderScoreboard({ setPage, game, userScore, isSubmitting }) {

  if (isSubmitting) return null;

  return (
    <div className='leaderboard'>
      <h3>{game.name} Leaderboard</h3>
      <Scoreboard game={game} userScore={userScore}/>
      <Button onClick={() => setPage('PathfinderGame')}>Play again</Button>
      <Button style={{marginLeft: '.5%'}} onClick={() => setPage('Pathfinder')} >Return to Menu</Button>
    </div>
  )
}

export default PathfinderScoreboard;