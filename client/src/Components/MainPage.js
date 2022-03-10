import { useState, useEffect } from 'react';
import Leaderboards from './Leaderboards';
import GameCard from './GameCard';

import logo from '../assets/logo2.mp4'

function MainPage({ games, regex }) {

  const gameCards = games.map(game => {
    const urlName = regex(game.name);

    return (
      <GameCard game={game} urlName={urlName} />
    )
  })

  return (
    <>
    <video autoPlay muted >
      <source src={logo} type="video/mp4" />
    </video>
    <div id='game-cards-container'>
     {gameCards}
    </div>
    </>
  )
}

export default MainPage;