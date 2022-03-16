import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import LoginForm from './Login/LoginForm';
import SignupForm from './Login/SignupForm';
import MainPage from './MainPage';
import ProfilePage from './ProfilePage';
import Pathfinder from './Games/Pathfinder/Pathfinder';
import NumberMemory from './Games/NumberMemory/NumberMemory';
import LeaderboardsPage from './LeaderboardsPage';

function Gameify() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {games, setGames} = useContext(Context);

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

  if (isLoading) return null;

  // GAME ROUTE HANDLERS

  function regex(str) {
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
        element={<GameComponent game={game} />}
      />
    )
  })

  const userProfileRoutes = users.map(user => {
    return (
      <Route
        key={user.id}
        path={`/${user.username}`}
        element={<ProfilePage userId={user.id} />}
      />
    )
  })

  return (
    <Routes>
      <Route
        path='/'
        element={<MainPage />}
      />
      <Route
        path='/login'
        element={<LoginForm />}
      />
      <Route
        path='/signup'
        element={<SignupForm />}
      />
      <Route
        path='/leaderboards'
        element={<LeaderboardsPage />}
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