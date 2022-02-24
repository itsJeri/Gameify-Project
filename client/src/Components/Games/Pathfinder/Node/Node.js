import { useState } from 'react';

import './Node.css';

function Node({ id, isStart, isFinish, isVisited }) {

  // Handle Start & Finish Nodes
  const nodeClass = isFinish ?
    'node-finish' :
    isStart ?
    'node-start' :
    isVisited ?
    'node-visited' :
    '';

  return (
    <div 
      className={`node ${nodeClass}`}
    ></div>
  )
}

export default Node;