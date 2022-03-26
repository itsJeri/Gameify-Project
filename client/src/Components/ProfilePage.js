import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import Graph from './Graph';

import { Accordion } from 'react-bootstrap';

function ProfilePage({ userId }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {games} = useContext(Context);

  useEffect(() => {
    fetch(`/profiles/${userId}`)
      .then(r => r.json())
      .then(user => {
        setUser(user);
        setIsLoading(false);
      })
  }, [userId]);
  
  if (isLoading) return null;

  const scoreCards = games.map(game => {
    const gameScores = user.scores.filter(score => score.game_id === game.id)
    const averageScore = gameScores.length ? 
      (gameScores.map(scoreObj => scoreObj.score).reduce((prev, curr) => prev + curr, 0) / gameScores.length).toFixed(2) : 
      0;
    const highScore = gameScores.length ? 
      gameScores.reduce((prev, curr) => prev.score > curr.score ? prev : curr).score : 
      0;
    const recentScores = gameScores.slice(0, 5).reverse()

    return (
      <div key={game.id} id='graph-container'>
      {/* <Accordion.Item eventKey={game.id} key={game.id}>
        <Accordion.Header> */}
          <div>
           <h3 className='shake'>{game.name}</h3>
           <p>Average: {averageScore} | High Score: {highScore}</p>
          </div>
        {/* </Accordion.Header>
        <Accordion.Body> */}
          <Graph recentScores={recentScores}/>
        {/* </Accordion.Body>
      </Accordion.Item> */}
      </div>
    )
  })

  return (
    <div className='profile-page'>
      <div className='profile-header'>
        <h1 className='shake'>{user.username}</h1>
      </div>
      <Accordion>
        {scoreCards}
      </Accordion>
    </div>
  )
}

export default ProfilePage;