import { useState } from 'react';

import './Node.css';

function Node({ isStart, isFinish }) {

  const nodeClass = isFinish ?
    'node-finish' :
    isStart ?
    'node-start' :
    ''

  return (
    <div 
      className={`node ${nodeClass}`}
    />
  )
}

export default Node;