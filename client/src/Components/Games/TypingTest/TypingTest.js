import { useState, useEffect, useContext } from 'react';
import { Context } from '../../../context/Context';
import randomWords from 'random-words';

import './TypingTest.css';

import { TypingTestGame } from './TypingTestGame';
import TypingTestScoreboard from './TypingTestScoreboard';

function TypingTest({ game }) {
  const [page, setPage] = useState('TypingTestGame');
  const [userScore, setUserScore] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const {user} = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleScoreSubmit(score) {
    if (!user) setErrors(['Sorry, you need to be signed in to submit a score.'])
    // Waits for POST to GET leaderboard with new score
    setIsSubmitting(true);
    fetch('/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: score,
        user_id: user.id,
        game_id: game.id
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(newScore => {
            setUserScore(newScore);
            setIsSubmitting(false);
            setErrors([]);
            setPage('TypingTestScoreboard');
          })
        } else {
          r.json().then(err => {
            setIsSubmitting(false);
            setErrors(err.errors);
          })
        }
      })
  }

  if (page === 'TypingTestGame') return <TypingTestGame handleScoreSubmit={handleScoreSubmit} errors={errors} />
  if (page === 'TypingTestScoreboard') return <TypingTestScoreboard setPage={setPage} game={game} userScore = {userScore} isSubmitting={isSubmitting} />
}

export default TypingTest;