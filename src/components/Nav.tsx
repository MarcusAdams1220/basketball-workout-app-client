import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface NavProps {
  setLoggedIn: (state:boolean) => void;
  loggedIn: any;
}

export default function Navigation({loggedIn, setLoggedIn}:NavProps) {

  const logout = () => {
    fetch('/logout', {
      method: "PUT",
      headers: { 'Content-Type': 'application/json'}
    })
    setLoggedIn(false)
  }

  console.log(loggedIn)

  if (loggedIn) {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" id="navbar" sticky='top'>
          <Container>
            <Navbar.Brand href="/">
              <img src="https://i.ibb.co/ftnMXcC/workout-app.png" alt="logo" id="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Link to="/profile" id="nav-link">Profile</Link>
                <Link to="/builder" id="nav-link">Build A Workout</Link>
                <Link to="/" id="nav-link" onClick={logout}>Logout</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
  } else {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" id="navbar" sticky='top'>
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