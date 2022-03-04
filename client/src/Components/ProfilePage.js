import { useState, useEffect } from 'react';

import { Card } from 'react-bootstrap';

function ProfilePage({ userId, games }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/profiles/${userId}`)
      .then(r => r.json())
      .then(user => {
        setUser(user);
        setIsLoading(false);
      })
  }, [userId]);
  
  if (isLoading) return <p>loading...</p>

  const scoreCards = games.map(game => {
    const gameScores = user.scores.filter(score => score.game_id === game.id)
    const averageScore = gameScores.length ? 
      (gameScores.map(scoreObj => scoreObj.score).reduce((prev, curr) => prev + curr, 0) / gameScores.length).toFixed(2) : 
      0;
    const highScore = gameScores.length ? 
      gameScores.reduce((prev, curr) => prev.score > curr.score ? prev : curr).score : 
      0;

    return (
      <Card key={game.id}>
        <Card.Body>
          <Card.Title>{game.name}</Card.Title>
          <Card.Text>
            Average: {averageScore} | High Score: {highScore}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  })

  return (
    <div className='profile-page'>
      <h1>{user.username}</h1>
      {scoreCards}
    </div>
  )
}

export default ProfilePage;