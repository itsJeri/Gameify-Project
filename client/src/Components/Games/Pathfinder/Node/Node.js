import { useState } from 'react';

import './Node.css';

function Node({ row, col, isStart, isFinish, isWall, isUser, onMouseDown, onMouseEnter, onMouseUp, distance, showDistance }) {

  // Handle Start & Finish Nodes
  const nodeClass = isFinish ?
    'node-finish' :
    isStart ?
    'node-start' :
    isWall ?
    'node-wall' :
    // isUser ?
    // 'node-user' :
    '';

  const nodeUser = isUser ?
    'node-user' :
    '';

  const num = distance > 1000 || isWall ? '-' : distance

  return (
    <div 
      id={`node-${row}-${col}`}
      className={`node ${nodeClass} ${nodeUser}`}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      {showDistance ?
        <p>{num}</p> :
        null
      }
    </div>
  )
}

export default Node;