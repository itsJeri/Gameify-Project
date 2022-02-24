import React, { useState, useEffect } from 'react';
import Node from './Node/Node';

import './Pathfinder.css';

function Pathfinder() {
  const [grid, setGrid] = useState([]);

  const START_NODE_ROW = 10;
  const START_NODE_COL = 15;
  const FINISH_NODE_ROW = 10;
  const FINISH_NODE_COL = 35;

  useEffect(() => {
    getGrid()
  }, []);

  const getGrid = () => {
    // Generate a grid of rows and columns
    const gridArr = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        // set properties of current row/col
        const currentLocation = {
          row,
          col,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
          // only true if conditions are met
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL
        };
        currentRow.push(currentLocation);
      }
      gridArr.push(currentRow);
    }
    setGrid(gridArr)
  }

  return (
    <div className='grid'>
      {/* Iterate through every row and column and create a node */}
      {grid.map((row, rowId) => {
        return (
          <div key={rowId}>
            {row.map((node, nodeId) => {
              const {isStart, isFinish} = node;
              return (
                <Node 
                  key={nodeId} 
                  id={nodeId}
                  isStart={isStart}
                  isFinish={isFinish}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Pathfinder;