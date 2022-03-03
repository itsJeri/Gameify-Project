import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavBar({ user, setUser }) {

  function handleLogout() {
    fetch('/logout', { method: 'DELETE' })
      .then(r => {
        if (r.ok) {
          setUser(null);
        }
      });
  }

  return (
    <div>
      <Navbar bg="light" expand="lg" id="navbar">
        <Container id="navbar">
          <Navbar.Brand className="nav-logo" href="#home">
            <p>GAMEIFY</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
             <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
             <Nav.Link as={Link} to={`/${user.username}`}>Dashboard</Nav.Link>
             <Nav.Link as={Link} to={'/games'}>Games</Nav.Link>
          </Nav>
          </Navbar.Collapse>
          <Navbar.Text id="navbar-text">
             Hi, {user.username}
          </Navbar.Text>
          <Button variant="primary" onClick={handleLogout}>
             Logout
          </Button>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar;