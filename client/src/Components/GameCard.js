import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import pathfinderDark from '../assets/pathfinder_dark.png';
import pathfinderLight from '../assets/pathfinder_light.png';

import numberMemoryDark from '../assets/number_memory_light.png';
import numberMemoryLight from '../assets/number_memory_light.png';

function GameCard({ game, urlName }) {
  const [images, setImages] = useState(identifyImages())
  const [image, setImage] = useState(images.light);

  function identifyImages() {
    if (game.name === 'Pathfinder') return {
      dark: pathfinderDark,
      light: pathfinderLight
    }
    if (game.name === 'Number Memory') return {
      dark: numberMemoryDark,
      light: numberMemoryLight
    }
  }

  return (
    <Card key={game.id} as={Link} to={`/games/${urlName}`} className='game-card' onMouseEnter={() => setImage(images.dark)} onMouseLeave={() => setImage(images.light)}>
    <Card.Img variant="top" src={image} />
    <Card.Body>
      <div className='pathfinder-card'>
      <Card.Title>{game.name}</Card.Title>
      </div>
      {/* <Card.Text>
      </Card.Text> */}
    </Card.Body>
    </Card>
  )
}

export default GameCard;