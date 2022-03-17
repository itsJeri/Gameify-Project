import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import pathfinderDark from '../assets/pathfinder_dark.png';
import pathfinderLight from '../assets/pathfinder_light.png';

import numberMemoryDark from '../assets/number_memory_light.png';
import numberMemoryLight from '../assets/number_memory_light.png';

function GameCard({ game, urlName }) {
  const [images, setImages] = useState(identifyImages());
  const [image, setImage] = useState(images.light);
  const [showText, setShowText] = useState(false);

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

  function handleMouseEnter() {
    setImage(images.dark);
    setShowText(true);
  }

  function handleMouseLeave() {
    setImage(images.light);
    setShowText(false);
  }

  return (
    <Card key={game.id} as={Link} to={`/game/${urlName}`} className='game-card' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
    <Card.Img src={image} />
    <Card.Body>
      {/* {showText ?  */}
        <div className='game-card-name'>
        <Card.Title style={{fontSize: '3rem'}} >{game.name}</Card.Title>
        </div> 
        {/* :
        <p style={{fontSize: '3rem'}}>&nbsp;</p>
      } */}
    </Card.Body>
    </Card>
  )
}

export default GameCard;