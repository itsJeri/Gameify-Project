import { useState, useEffect } from 'react';
import Pagination from '../Pagination';

import { Table, Button } from 'react-bootstrap';

function PathfinderScoreboard({ game }) {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scoresPerPage, setScoresPerPage] = useState(10);

  useEffect(() => {
    fetch(`/leaderboards/${game.id}`)
      .then(r => r.json())
      .then(game => {
        setLeaderboard(game);
        setIsLoading(false);
      })
  }, []);

  if (isLoading) return <p>Loading...</p>

  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;
  const currentScores = leaderboard.scores.slice(indexOfFirstScore, indexOfLastScore);

  return (
        <div className='scoreboard'>
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
        <Pagination scoresPerPage={scoresPerPage} totalScores={leaderboard.scores.length} setCurrentPage={setCurrentPage} />
        </div>
  )
}

export default PathfinderScoreboard;