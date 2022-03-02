import { useState, useEffect } from 'react';
import Pagination from './Pagination';

import { Tabs, Tab, Table } from 'react-bootstrap';

function Leaderboards() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboards, setLeaderboards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scoresPerPage, setScoresPerPage] = useState(10);

  useEffect(() => {
    fetch('/leaderboards')
      .then(r => r.json())
      .then(games => {
        setLeaderboards(games);
        setIsLoading(false);
      })
  }, []);

  const leaderboardTabs = leaderboards.map(game => {
    // Get current scores
    const indexOfLastScore = currentPage * scoresPerPage;
    const indexOfFirstScore = indexOfLastScore - scoresPerPage;
    const currentScores = game.scores.slice(indexOfFirstScore, indexOfLastScore);

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
            {currentScores.map((score, i) => {
              const ranking = ((currentPage - 1) * scoresPerPage) + i + 1
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
        <Pagination scoresPerPage={scoresPerPage} totalScores={game.scores.length} setCurrentPage={setCurrentPage} />
      </Tab>
    )
  })

  return (
    <>
    <div className='home-container'>
        <h3>Leaderboards</h3>
        {isLoading ?
          <p>Loading scores...</p> :
          <>
          <Tabs defaultActiveKey='Pathfinder' className='mb-3'>
          {leaderboardTabs}
          </Tabs>
          </>
        }
    </div>
    </>
  )
}

export default Leaderboards;