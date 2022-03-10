import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import logo from '../assets/logo.png'

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
      <Navbar expand="lg" id="navbar">
        <Container id="navbar">
          <Navbar.Brand as={Link} to={'/'} className="nav-logo">
            <img id='logo' src={logo} alt='logo'/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
             {/* <Nav.Link as={Link} to={'/'}>Home</Nav.Link> */}
             <Nav.Link as={Link} to={`/${user.username}`}>My Profile</Nav.Link>
             {/* <Nav.Link as={Link} to={'/games'}>Games</Nav.Link> */}
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