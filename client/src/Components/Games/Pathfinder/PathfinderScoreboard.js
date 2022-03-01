import { useState, useEffect } from 'react';

import { Table, Button } from 'react-bootstrap';

function PathfinderScoreboard({ setPage, game, userScore }) {
  const [leaderboard, setLeaderboard] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/leaderboards/${game.id}`)
      .then(r => r.json())
      .then(game => {
        setLeaderboard(game);
        setIsLoading(false);
      })
  }, []);

  return (
    <div className='leaderboard'>
      <h3>{game.name} Leaderboard</h3>
      {isLoading ?
        <p>Loading scores...</p> :
        <>
        <Table style={{maxHeight: '30%'}}striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.scores.map((score, i) => {
              const ranking = i + 1
              const user = score.user
              return (
                <tr key={score.id}>
                  <td>{ranking}</td>
                  <td>{user.username}</td>
                  <td>{score.score}</td>
                  <td>{new Date(score.created_at).toLocaleDateString('en-GB')}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {/* {leaderboard.scores.filter((score, i) => {
              const ranking = i + 1
              const user = score.user
              if (score.id=== userScore.id) {
                return (
                  <Table>
                  <tr>
                    <td>{ranking}</td>
                    <td>{user.user}</td>
                    <td>{score.score}</td>
                    <td>{new Date(score.created_at).toLocaleDateString('en-GB')}</td>
                  </tr>
                  </Table>
                )
              }
            })} */}
        <Button onClick={() => setPage('PathfinderGame')}>Play again</Button>
        </>
      }
    </div>
  )
}

export default PathfinderScoreboard;