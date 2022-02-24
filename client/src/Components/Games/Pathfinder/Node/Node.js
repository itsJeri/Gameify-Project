import { useState } from 'react';

import './Node.css';

function Node({ id, isStart, isFinish }) {

  // Handle Start & Finish Nodes
  const nodeClass = isFinish ?
    'node-finish' :
    isStart ?
    'node-start' :
    ''

  return (
    <div 
      className={`node ${nodeClass}`}
    >{id}</div>
  )
}

export default Node;