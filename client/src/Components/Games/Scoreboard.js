import { useState, useEffect } from 'react';
import Paginate from '../Paginate';
import Td from '../Table/Td';
import { Table } from 'react-bootstrap';
import { LEADERBOARDS_API_ENDPOINT } from '../../constants/apiEndpoints';

function PathfinderScoreboard({ game, userScore }) {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scoresPerPage, setScoresPerPage] = useState(10);

  useEffect(() => {
    fetch(`${LEADERBOARDS_API_ENDPOINT}/${game.id}`)
      .then(r => r.json())
      .then(game => {
        setLeaderboard(game);
        setIsLoading(false);
        // show page with user's score upon load
        game.scores.forEach((score, i) => {
          // handle edge case i=0 if score is on first page
          if (i < 10) return;
          if (score.id === userScore.id) {
            setCurrentPage(Math.ceil((i + 1) / 10))
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
    <Table style={{color: '#c5c6c7'}} >
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
              <tr key={score.id} id={isUserScore} className='table-data'>
                <td>{ranking}</td>
                <Td to={`/profile/${user.username}`}>{user.username}</Td>
                <td>{score.score}</td>
                <td>{new Date(score.created_at).toLocaleDateString('en-GB')}</td>
              </tr>
            )
        })}
      </tbody>
    </Table>
    <Paginate scoresPerPage={scoresPerPage} totalScores={leaderboard.scores.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default PathfinderScoreboard;