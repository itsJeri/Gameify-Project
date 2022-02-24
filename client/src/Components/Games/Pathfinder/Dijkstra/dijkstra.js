// To start, every node except for the starting node will have a distance value of infinity as they can never possibly be reached. The only node with a distance value of 0 will be the starting node. Dijkstra's algorithm works by always picking the closest node to visit next, so if all other nodes are infinity, the algorithm will begin at the starting node with a distance value of 0. We then grab the starting node's direct neighbors (North, South, East, West - no diagonals) and updates each node with its current distance value (0) + 1. It then eliminates all visited nodes from its next iteration. The pattern continues with each unvisited neighboring node until the finish node is reached, where it then backtracks on distance values to the starting node to find the most efficient path.

// Returns nodes from Pathfinder's original grid
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}


function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
}

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesOrdered = [];

}