import { useState, useEffect } from 'react';
import { Tabs, Tab, Table, Pagination } from 'react-bootstrap';

function MainPage({ games }) {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    fetch('/leaderboards')
      .then(r => r.json())
      .then(games => {
        setLeaderboards(games);
        setIsLoading(false);
      })
  }, []);

  const leaderboard = leaderboards.map(game => {
    return (
    <Tab key={game.id} eventKey={game.name} title={game.name}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {game.scores.map((score, i) => {
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
    </Tab>
    )
  })

  return (
    <>
    <div className='home-container'>
        <h3>Leaderboards</h3>
        {isLoading ?
          <p>Loading scores...</p> :
          <Tabs defaultActiveKey='Pathfinder' className='mb-3'>
          {leaderboard}
          </Tabs>
        }
    </div>
    </>
  )
}

export default MainPage;