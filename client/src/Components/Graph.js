import React from 'react';
import { Line } from 'react-chartjs-2';

// defaults.global.legend.position = 'top'
// defaults.global.defaultFontColor = '#c5c6c7'

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
      {/* <h3>Recent Plays</h3> */}
      <Line
        data={{
          labels: recentDates,
          datasets: [
            {
              datalabels: {
                listeners: {
                  click: function(context) {
                    console.log('label ' + context.dataIndex + ' has been clicked');
                  }
                }
              },
              // legend
              label: 'Score',
              data: recentPlays,
              // Original backgroundColor: 'rgba(132, 206, 235, 0.5)'
              backgroundColor: 'rgba(74, 2, 231, 0.5)',
              borderColor: 'rgba(0, 190, 218, 1)',
              borderWidth: 2
            }
          ]
        }}
        options={{
          legend: {
            // enable or disable legend
            display: false,
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: '#c5c6c7',
                fontFamily: 'VT323',
                fontSize: 18
              },
              gridLines: {
                color: '#84ceeb'
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: '#c5c6c7',
                fontFamily: 'VT323',
                fontSize: 18
              },
              gridLines: {
                color: '#84ceeb'
              }
            }],
          },
          plugins: {
            dataLabels: {
              listeners: {
                enter: function(context) {
                  context.hovered = true;
                  return true;
                },
                leave: function(context) {
                  context.hovered = false;
                  return true;
                }
              },
              color: function(context) {
                return context.hovered ? 'red' : 'gray';
              }
            }
          }
        }}
        // height={200}
        // width={400}
      />
    </div>
  )
}

export default Graph;