import React, { useState, useEffect } from 'react';
import Node from './Node/Node';

import './Pathfinder.css';

function Pathfinder() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const nodesArr = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45
        };
        currentRow.push(currentNode);
      }
      nodesArr.push(currentRow);
    }
    setNodes(nodesArr);
  }, []);

  return (
    <div className='grid'>
      {nodes.map((row, rowId) => {
        return (
          <div key={rowId}>
            {row.map((node, nodeId) => {
              const {isStart, isFinish} = node;
              return (
                <Node 
                  key={nodeId} 
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