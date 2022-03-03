import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from './dijkstra/dijkstra';

import './Pathfinder.css';
import { Button } from 'react-bootstrap';

function PathfinderSandbox({ setPage }) {
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState({
    row: 20,
    col: 30
  });
  const [mousePressed, setMousePressed] = useState(false);
  const [shortestPath, setShortestPath] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [showDistance, setShowDistance] = useState(false);

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
    for (let row = 0; row < gridSize.row; row++) {
      const currentRow = [];
      for (let col = 0; col < gridSize.col; col++) {
        const isStartNode = row === START_NODE_ROW && col === START_NODE_COL
        const isFinishNode = row === FINISH_NODE_ROW && col === FINISH_NODE_COL
        // set properties of current row/col
        const currentNode = {
          row,
          col,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
          // only true if conditions are met
          isStart: isStartNode,
          isFinish: isFinishNode
        };
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }
    return grid;
  }

  function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
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

  // HANDLE WALL LOGIC
  function handleWall(row, col) {
    const node = grid[row][col]
    const nodeIsStartOrFinish = node.isStart || node.isFinish
    if (!nodeIsStartOrFinish) {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMousePressed(true);
    }
  }

  // HANDLE CLICKS
  function handleMouseEnter(row, col) {
    if (!mousePressed || isVisualizing) return;
    handleWall(row, col);
  }

  function handleMouseDown(row, col) {
    if (isVisualizing) return;
    handleWall(row, col);
    clearDijkstra();
    setShowDistance(false);
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
    setIsVisualizing(false);
  }

  function animateDijkstra(visitedNodesOrdered, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesOrdered.length; i++) {
      if (i === visitedNodesOrdered.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, animationSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesOrdered[i];
        // Keep start and finish nodes displayed during visualization
        if (node.isStart || node.isFinish) return;
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, animationSpeed * i);
    }
  }

  // RESETS
  function resetGrid() {
    setShortestPath([]);
    // reset grid and node properties
    setGrid(getGrid());
    // reset node visuals
    getNodes().forEach(node => {
      // start and finish nodes persist
      if (node.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start'
      } else if (node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish'
      } else {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
      }
    })
  }
  
  function clearDijkstra() {
    setShortestPath([]);
    // reset node visuals
    getNodes().forEach(node => {
      // start, finish, and wall nodes persist
      if (node.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start'
      } else if (node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish'
      } else if (node.isWall) {
        return
      } else {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
      }
      // reset node properties
      const newGrid = [...grid];
      const newNode = {
        ...node,
        distance: Infinity,
        isVisited: false,
        previousNode: null
      };
      newGrid[node.row][node.col] = newNode;
      return newGrid;
    })
  }

  function visualizeDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesOrdered = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesOrdered, nodesInShortestPathOrder);
    // display shortest path as number
    setShortestPath(nodesInShortestPathOrder)
  }

  function runVisualization() {
    clearDijkstra();
    visualizeDijkstra();
    setIsVisualizing(true);
  }

  return (
    <div className = 'd-grid gap-2'>
      <button onClick={() => setPage('Pathfinder')}>
        Return to Main Menu
      </button>
      <p style={{textAlign: 'center', marginTop: '3%', marginBottom: '-2%'}}>Click or drag around the grid to create your own walls!</p>
      <div className='main'>
        <div className='grid'>
          <div className='d-flex'>
          <Button disabled={isVisualizing} onClick={resetGrid}>Reset Walls</Button>
          <Button style={{marginLeft: '.5%', marginRight: '-5%'}} onClick={() => setShowDistance(!showDistance)}>Toggle Distance</Button>
          <h3 style={{margin: 'auto'}}>Shortest Path: {shortestPath.length}</h3>
          <Button disabled={isVisualizing} style={{marginLeft: '.5%'}} onClick={runVisualization}>
            Run Dijkstra's Algorithm
          </Button>
          </div>
          {/* Iterate through every row and column and create a node */}
          {grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const {row, col, isStart, isFinish, isWall, distance} = node;
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
                      distance={distance}
                      showDistance={showDistance}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PathfinderSandbox;