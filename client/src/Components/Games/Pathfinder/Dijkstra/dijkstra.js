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
  // conditionals to identify and push all current node's neighbors to array
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // returns neighbors that have their isVisited property as false
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    // increment all neighbor's distance value by current distance + 1
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

// can be replaced with a Min Heap in the future
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// DIJKSTRA
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesOrdered = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // skip if wall
    if (closestNode.isWall) continue;
    // stop if the path is impossible
    if (closestNode.distance === Infinity) {
      return visitedNodesOrdered;
    }
    closestNode.isVisited = true;
    visitedNodesOrdered.push(closestNode);
    if (closestNode === finishNode) {
      return visitedNodesOrdered;
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

// FIND SHORTEST PATH
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    // Backtracks from finish node through previous nodes, adding each node to beginning of array
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}