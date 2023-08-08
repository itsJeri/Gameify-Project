import { useState, useEffect } from 'react';
import Paginate from './Paginate';
import Td from './Table/Td';
import { Link } from 'react-router-dom';
import { LEADERBOARDS_API_ENDPOINT } from '../constants/apiEndpoints';

import { Tabs, Tab, Table } from 'react-bootstrap';

function Leaderboards() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboards, setLeaderboards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scoresPerPage, setScoresPerPage] = useState(10);

  useEffect(() => {
    fetch(LEADERBOARDS_API_ENDPOINT)
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
      <Tab style={{width: '90%', margin: 'auto'}} key={game.id} eventKey={game.name} title={game.name}>
        <Table>
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
                <tr key={score.id} className='table-data'>
                  <td>{ranking}</td>
                  <Td to={`/profile/${user.username}`}>{user.username}</Td>
                  <td>{score.score}</td>
                  <td>{new Date(score.created_at).toLocaleDateString('en-GB')}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Paginate scoresPerPage={scoresPerPage} totalScores={game.scores.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Tab>
    )
  })

  return (
    <>
      <h3>Leaderboards</h3>
      {isLoading ?
        <p>Loading scores...</p> :
        <div className='scoreboard'>
        <Tabs defaultActiveKey='Pathfinder' className='mb-3'>
        {leaderboardTabs}
        </Tabs>
        </div>
      }
    </>
  )
}

export default Leaderboards;