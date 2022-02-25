import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from './dijkstra/dijkstra';

import './Pathfinder.css';

function PathfinderSandbox({ setPage }) {
  const [grid, setGrid] = useState([]);
  const [mousePressed, setMousePressed] = useState(false);
  const [shortestPath, setShortestPath] = useState(0);

  const START_NODE_ROW = 5;
  const START_NODE_COL = 5;
  const FINISH_NODE_ROW = 15;
  const FINISH_NODE_COL = 25;

  useEffect(() => {
    const grid = getGrid();
    setGrid(grid)
  }, []);

  // GRIDS
  function getGrid() {
    // Generate a grid of rows and columns
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 30; col++) {
        // set properties of current row/col
        const currentNode = {
          row,
          col,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
          // only true if conditions are met
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL
        };
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }
    return grid;
  }

  function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  function resetGrid() {
    setShortestPath(0);
    // reset grid and node properties
    setGrid(getGrid());
    // get all nodes
      getNodes().forEach(node => {
      if (node.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start'
      } else if (node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish'
      } else {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
      }
    })
  }

  function getNodes() {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  // HANDLE CLICKS
  function handleMouseEnter(row, col) {
    if (!mousePressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  function handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMousePressed(true);
  }

  function handleMouseUp() {
    setMousePressed(false);
  }
  
  // DIJKSTRA VISUALIZATION
  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
  }

  function animateDijkstra(visitedNodesOrdered, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesOrdered.length; i++) {
      if (i === visitedNodesOrdered.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesOrdered[i];
        // Keep start and finish nodes displayed during visualization
        if (node.isStart || node.isFinish) return;
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i);
    }
  }

  function visualizeDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesOrdered = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesOrdered, nodesInShortestPathOrder);
    // display shortest path as number
    setShortestPath(nodesInShortestPathOrder.length)
  }

  return (
    <>
      <button onClick={() => setPage('PathfinderGame')}>
        Return to Game
      </button>
      <button onClick={() => visualizeDijkstra()}>
        Run Dijkstra's Algorithm
      </button>
      <button onClick={() => resetGrid()}>Clear</button>
      <p>Shortest Path: {shortestPath}</p>
      <div className='grid'>
        {/* Iterate through every row and column and create a node */}
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const {row, col, isStart, isFinish, isWall} = node;
                return (
                  <Node 
                    key={nodeId} 
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    mousePressed={mousePressed}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PathfinderSandbox;