import { Navbar, Nav, Container } from 'react-bootstrap'

export default function Navigation() {
  const loggedIn = window.localStorage.getItem('isLoggedIn')
  
  const logout = () => {
    fetch('/logout', {
      method: "PUT",
      headers: { 'Content-Type': 'application/json'}
    })
    window.localStorage.removeItem('isLoggedIn')
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('userName')
    window.localStorage.removeItem('userEmail')
  }

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
                <Nav.Link href="/profile" id="nav-link">Profile</Nav.Link>
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
