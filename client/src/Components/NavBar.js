import { useContext } from 'react';
import { Context } from '../context/Context';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

import logo from '../assets/logo.png'

function NavBar() {
  const {user, setUser, navigate} = useContext(Context);

  function handleLogout() {
    fetch('/logout', { method: 'DELETE' })
      .then(r => {
        if (r.ok) {
          setUser(null);
          navigate('/login');
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor: '#4a02e7'}}/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            
            {user ? <Nav.Link as={Link} to={`/${user.username}`}>My Profile</Nav.Link> : null}

            <Nav.Link as={Link} to={'/leaderboard'}>Leaderboards</Nav.Link>
          </Nav>

          { user ?
            <>
              <Navbar.Text id="navbar-text">
                Hi, {user.username}
              </Navbar.Text>
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </> :
            <>
              <Navbar.Text id="navbar-text">
               Hey there, stranger!
              </Navbar.Text>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='sign-in-tooltip'>Sign in to submit and track your scores</Tooltip>}
              >
                <Button style={{color: 'white'}} variant="primary" as={Link} to={'/login'}>
                 Sign in
               </Button>
              </OverlayTrigger>
            </>
          }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar;