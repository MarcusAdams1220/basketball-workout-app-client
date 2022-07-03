import { Navbar, Nav, Container } from 'react-bootstrap'

interface SessionProps {
  // Null, then String after login
  loggedIn: any
}

export default function Navigation({ loggedIn }:SessionProps) {
  const logout = () => {
    window.localStorage.removeItem('isLoggedIn')
  }

  if (loggedIn === 'true') {
    return (
      <>
        <Navbar bg="transparent" variant="dark" expand="lg" id="navbar" sticky='top'>
          <Container>
            <Navbar.Brand href="/">
              <img src="https://i.ibb.co/ftnMXcC/workout-app.png" alt="logo" id="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/" id="nav-link">Build A Workout</Nav.Link>
                <Nav.Link href="/" id="nav-link" onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
  } else {
    return (
      <>
        <Navbar bg="transparent" variant="dark" expand="lg" id="navbar" sticky='top'>
          <Container>
            <Navbar.Brand href="/">
              <img src="https://i.ibb.co/ftnMXcC/workout-app.png" alt="logo" id="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/" id="nav-link">Login</Nav.Link>
                <Nav.Link href="/sign-up" id="nav-link">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
  }
}
