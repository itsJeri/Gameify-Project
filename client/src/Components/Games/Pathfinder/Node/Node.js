import { useState } from 'react';

import './Node.css';

function Node({ row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp }) {

  // Handle Start & Finish Nodes
  const nodeClass = isFinish ?
    'node-finish' :
    isStart ?
    'node-start' :
    isWall ?
    'node-wall' :
    '';

  return (
    <div 
      id={`node-${row}-${col}`}
      className={`node ${nodeClass}`}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  )
}

export default Node;