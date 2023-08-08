import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import SignupForm from './Login/SignupForm';
import MainPage from './MainPage';
import ProfilePage from './ProfilePage';
import Pathfinder from './Games/Pathfinder/Pathfinder';
import NumberMemory from './Games/NumberMemory/NumberMemory';
import LeaderboardsPage from './LeaderboardsPage';
import Spinner from 'react-bootstrap/Spinner';
import { USERS_API_ENDPOINT, GAMES_API_ENDPOINT } from '../constants/apiEndpoints';

function Gameify() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const {games, setGames, users, setUsers} = useContext(Context);

  useEffect(() => {
    fetch(USERS_API_ENDPOINT)
      .then(r => {
        if (r.ok) {
          r.json()
          .then(users => setUsers(users))
        } else {
          setIsTimedOut(true);
        }
      })
      
    fetch(GAMES_API_ENDPOINT)
      .then(r => {
        if (r.ok) {
          r.json()
          .then(games => {
            setGames(games)
            setIsLoading(false);
          })
        } else {
          setIsTimedOut(true);
        }
      })
  }, []);

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
        path={`/game/${urlName}`}
        element={<GameComponent game={game} />}
      />
    )
  })

  const userProfileRoutes = users.map(user => {
    return (
      <Route
        key={user.id}
        path={`/profile/${user.username}`}
        element={<ProfilePage userId={user.id} />}
      />
    )
  })

  if (isLoading) {
    return (
    <div className='text-center' style={{ marginTop: '2rem' }}>
      {
        isTimedOut 
        ? <div>
            <p>It appears the server might be having some issues.</p>
            <p>Please try refreshing the page.</p>
          </div>
        : <div>
            <Spinner animation="border" />
            <p>Initializing Heroku Postgres...</p>
          </div>
      }
      <div style={{ marginTop: '2rem' }}>
        {isTimedOut ? null : <p>Running into issues?</p>}
        <a href='https://www.linkedin.com/in/jerry-tong/' target='_blank' rel='noopener noreferrer'>
          Contact me
        </a>
      </div>
    </div>
  )
}

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
    </Routes>
  )
}

export default Gameify;