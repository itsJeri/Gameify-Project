import { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import Td from '../Table/Td';

import { Table, Button } from 'react-bootstrap';

function PathfinderScoreboard({ game, userScore }) {
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
        // show page with user's score upon load
        game.scores.forEach((score, i) => {
          // handle edge case i=0 if score is on first page
          if (i < 10) return;
          if (score.id === userScore.id) {
            setCurrentPage(Math.ceil(i/10))
          }
        })
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
          const ranking = ((currentPage - 1) * scoresPerPage) + i + 1
          // if (score.id === userScore.id) {
          //   setCurrentPage(Math.floor(ranking/10))
          // }
          const user = score.user
          const isUserScore = score.id === userScore.id ? 'user-score' : ''
            return (
              <tr key={score.id} className={isUserScore}>
                <td>{ranking}</td>
                <Td to={`/${user.username}`}>{user.username}</Td>
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