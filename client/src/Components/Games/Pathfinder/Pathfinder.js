import { useState, useEffect } from 'react';

import PathfinderGame from './PathfinderGame';
import PathfinderSandbox from './PathfinderSandbox';

function Pathfinder() {
  const [page, setPage] = useState('PathfinderGame');

  if (page === 'PathfinderGame') return <PathfinderGame setPage={setPage}/>
  if (page === 'PathfinderSandbox') return <PathfinderSandbox setPage={setPage}/>
}

export default Pathfinder;