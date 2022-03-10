import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from './dijkstra/dijkstra';

import './Pathfinder.css';
import { Button } from 'react-bootstrap';

function PathfinderGame({ setPage, handleScoreSubmit }) {
  const [grid, setGrid] = useState([]);
  const [gridRow, setGridRow] = useState(9);
  const [gridCol, setGridCol] = useState(9);
  const [mousePressed, setMousePressed] = useState(false);
  const [shortestPath, setShortestPath] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [userPath, setUserPath] = useState([]);
  const [atFinish, setAtFinish] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [renderResults, setRenderResults] = useState(false);
  const [level, setLevel] = useState(1);
  const [wallChance, setWallChance] = useState(0.2);

  // Start and Finish nodes placed in relation to grid size
  const START_NODE_ROW = Math.floor(gridRow * .25);
  const START_NODE_COL = Math.floor(gridCol * .2);
  const FINISH_NODE_ROW = Math.floor(gridRow * .75);
  const FINISH_NODE_COL = Math.floor(gridCol * .8);
  

  useEffect(() => {
    const grid = getGrid();
    setGrid(grid)
  }, []);

  // GRIDS
  function getGrid() {
    // Generate a grid of rows and columns
    const grid = [];
    for (let row = 0; row < gridRow; row++) {
      const currentRow = [];
      for (let col = 0; col < gridCol; col++) {
        const isStartNode = row === START_NODE_ROW && col === START_NODE_COL
        const isFinishNode = row === FINISH_NODE_ROW && col === FINISH_NODE_COL
        // set properties of current row/col
        const currentNode = {
          row,
          col,
          distance: Infinity,
          isVisited: false,
          isWall: randomWall(row, col),
          isUser: false,
          previousNode: null,
          previousUserNode: null,
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

  function randomWall(row, col) {
    const isStartNode = row === START_NODE_ROW && col === START_NODE_COL
    const isFinishNode = row === FINISH_NODE_ROW && col === FINISH_NODE_COL
    if (isStartNode || isFinishNode) return false
    else if (Math.random() < wallChance) return true
    else return false
  }

  function getNewGridWithUserToggled(grid, row, col) {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const isSelected = grid[row][col].isUser
    const newNode = {
      ...node,
      isUser: !node.isUser,
      previousUserNode: isSelected ? null : userPath[0]
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

  function getNeighbors(row, col) {
    const neighbors = [];
    // conditionals to check if each neighbor exists and push all current node's neighbors (up, down, left, right) to array
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors
  }

  // HANDLE USER SELECTION LOGIC
  function handleUserSelect(row, col) {
    const node = grid[row][col]
    // return array of neighboring start and user nodes
    const neighbors = getNeighbors(row, col).filter(neighbor => neighbor.isStart || neighbor.isUser);
    // CONDITIONALS
    const nodeIsSelected = node.isUser
    const unselectedNodeTouchesPrevious = JSON.stringify(neighbors).includes(JSON.stringify(userPath[0])) || node.isStart
    const selectedNodeTouchesPrevious = node.previousUserNode === userPath[1]
    const isFinish = userPath[0] === grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const isWall = grid[row][col].isWall
    //SELECT
    if (!nodeIsSelected && unselectedNodeTouchesPrevious && !isWall && !isFinish) {
      const newGrid = getNewGridWithUserToggled(grid, row, col);
      setGrid(newGrid);
      setMousePressed(true);
      setUserPath([newGrid[row][col], ...userPath]);
      // handle atFinish
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
      if (finishNode.isUser) setAtFinish(true);
    }
    // UNSELECT
    else if (nodeIsSelected && selectedNodeTouchesPrevious) {
      const newGrid = getNewGridWithUserToggled(grid, row, col);
      setGrid(newGrid);
      setMousePressed(true);
      // remove first item from array
      setUserPath(userPath.filter((n, i) => i !== 0));
      setAtFinish(false);
    }
  }

  // HANDLE CLICKS
  function handleMouseEnter(row, col) {
    if (!mousePressed || submitted) return;
    handleUserSelect(row, col)
  }

  function handleMouseDown(row, col) {
    if (submitted) return;
    handleUserSelect(row, col)
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
    handleLevelResults();
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
        // Keep start, finish, and user nodes rendered during visualization
        if (node.isUser || node.isStart || node.isFinish) return;
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i);
    }
  }

  function visualizeDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesOrdered = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesOrdered, nodesInShortestPathOrder)
    // display shortest path as number
    setShortestPath(nodesInShortestPathOrder)
  }

  // RESETS
  function resetGrid() {
    setShortestPath([]);
    setUserPath([]);
    setRenderResults(false);
    setSubmitted(false);
    // reset grid and node properties
    setGrid(getGrid())
    // reset node visuals
    getNodes().forEach(node => {
      if (node.isVisited) {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node'
      }
    })
  }

  function clearUserPath() {
    setUserPath([]);
    getNodes().forEach(node => {
      if (node.isUser) {
        node.isUser = false
      }
    })
  }

  // HANDLE SUBMIT
  function handleLevelSubmit() {
    visualizeDijkstra();
    setAtFinish(false);
    setSubmitted(true);
  } 

  function handleLevelResults() {
    setRenderResults(true);
    setUserScore(userScore + 1);
    // Increment grid with a maximum grid size
    if (gridRow < 15) setGridRow(gridRow + 2);
    if (gridCol < 30) setGridCol(gridCol + 2);
  }

  function handleScore() {
    handleScoreSubmit(userScore)
    setPage('PathfinderScoreboard')
  }

  function handleNextLevel() {
    resetGrid();
    setLevel(level + 1);
  }

  function renderGameResult() {
    if (userPath.length === shortestPath.length) {
      return (
        <>
        <h3 style={{margin: 'auto'}}>WIN</h3> 
        <Button  onClick={() => handleNextLevel()}>Next Level</Button>
        </>
      )
    } else {
      return (
        <>
        <h3 style={{margin: 'auto'}}>GAME OVER</h3>
        <Button onClick={() => handleScore()}>Submit Score</Button>
        </>
      )
    }
  }

  return (
    <div className = 'd-grid gap-2'>
      <button onClick={() => setPage('PathfinderSandbox')}>
        To Sandbox Mode
      </button>
      <div className='main'>
        <div className='grid'>
          <div className='d-flex'>
            <Button disabled={submitted} style={{marginRight: '4%'}} onClick={clearUserPath}>Clear</Button>
            {renderResults ? renderGameResult() : null}
          </div>
          {/* Iterate through every row's column and create a node */}
          {grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const {row, col, isStart, isFinish, isWall, isUser} = node;
                  return (
                    <Node 
                      key={nodeId} 
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isUser={isUser}
                      mousePressed={mousePressed}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col, node)}
                      onMouseDown={(row, col) => handleMouseDown(row, col, node)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  )
                })}
              </div>
            )
          })}
          <p>Score: {userScore}</p>
        </div>
        <div className='score'>
          <p>Level {level}</p>
          <p>Shortest Path: {shortestPath.length}</p>
          <p>Your Path: {userPath.length}</p>
          <Button size='md' disabled={!atFinish} onClick={() => handleLevelSubmit()}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PathfinderGame;