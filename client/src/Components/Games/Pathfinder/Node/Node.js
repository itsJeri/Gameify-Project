import { useState } from 'react';

import './Node.css';

function Node({ row, col, isStart, isFinish, isWall, isUser, onMouseDown, onMouseEnter, onMouseUp }) {

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

  return (
    <div 
      id={`node-${row}-${col}`}
      className={`node ${nodeClass} ${nodeUser}`}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  )
}

export default Node;