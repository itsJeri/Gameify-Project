import { useContext } from 'react';
import { Context } from '../context/Context';
import GameCard from './GameCard';

import logo from '../assets/logo2.mp4'

function MainPage() {
  const {games, regex} = useContext(Context);

  const gameCards = games.map(game => {
    const urlName = regex(game.name);

    return (
      <GameCard key={game.id} game={game} urlName={urlName} />
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