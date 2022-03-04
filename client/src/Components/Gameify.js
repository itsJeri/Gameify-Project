import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from './MainPage';
import ProfilePage from './ProfilePage';
import GamesPage from './GamesPage';
import Pathfinder from './Games/Pathfinder/Pathfinder';
import NumberMemory from './Games/NumberMemory/NumberMemory';

function Gameify({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/users')
      .then(r => r.json())
      .then(users => setUsers(users))
      
    fetch('/games')
      .then(r => r.json())
      .then(games => {
        setGames(games)
        setIsLoading(false);
      })
  }, []);

  if (isLoading) return <p>Loading...</p>

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
        element={<GameComponent game={game} user={currentUser}/>}
      />
    )
  })

  const userProfileRoutes = users.map(user => {
    return (
      <Route
        key={user.id}
        path={`/${user.username}`}
        element={<ProfilePage userId={user.id} games={games} />}
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
      {userProfileRoutes}
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