import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from './MainPage';
import GamesPage from './GamesPage';
import Pathfinder from './Games/Pathfinder/Pathfinder';
import NumberMemory from './Games/NumberMemory';

function Gameify({ user }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('/games')
      .then(r => r.json())
      .then(games => setGames(games))
  }, []);

  // GAME ROUTE HANDLERS

  const regex = (str) => {
    return(
      str.replace(/[^a-z0-9\s-]/ig,'')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()
    )
  }

  const gameComponents = {
    1: Pathfinder,
    2: NumberMemory,
    // Add new game component names here
  }

  const gameRoutes = games.map(game => {
    const urlName = regex(game.name);
    const GameComponent = gameComponents[game.id];
    return (
      <Route
        key={game.id}
        path={`/games/${urlName}`}
        element={<GameComponent game={game} user={user}/>}
      />
    )
  })

  return (
    <Routes>
      <Route
        path='/'
        element={<MainPage games={games} />}
      />
      <Route
        path='/games'
        element={<GamesPage games={games} regex={regex} />}
      />
      {gameRoutes}
      {/* <Route
        path={'/games/pathfinder'}
        element={<Pathfinder />}
      />
      <Route 
        path={'/games/number-memory'}
        element={<NumberMemory />}
      /> */}
    </Routes>
  )
}

export default Gameify;