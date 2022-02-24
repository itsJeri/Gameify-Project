import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function GamesPage({ games, regex }) {

  const gameCards = games.map(({id, name, description}) => {
    const urlName = regex(name);
    return (
      <Card key={id} as={Link} to={`/games/${urlName}`} style={{ width: '18rem', borderRadius: '3rem', backgroundColor: 'lightblue', margin: 'auto', textDecoration: 'none' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
    )
  })

  return (
    <div id='game-cards-container'>
      {gameCards}
    </div>
  )
}

export default GamesPage;