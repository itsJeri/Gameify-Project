import React from 'react';
import { Line } from 'react-chartjs-2';

function Graph({ recentScores }) {
  const recentDates = recentScores.map(score => new Date(score.created_at).toLocaleDateString('en-GB', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }))
  const recentPlays = recentScores.map(score => score.score)

  return (
    <div>
      <h3>Recent Plays</h3>
      <Line
        data={{
          labels: recentDates,
          datasets: [
            {
              label: 'Score',
              data: recentPlays,
              backgroundColor: 'rgba(132, 206, 235, 0.5)'
            }
          ]
        }}
      />
    </div>
  )
}

export default Graph;