import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Builder from './Builder'

export default function Login() {
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const [loggedInUser, setLoggedInUser] = useState(String)

  useEffect(() =>{
    if (loggedInUser === '') {
      console.log('no logged in user')
    } else {
      console.log('logged in user')
    }
  }, [loggedInUser])

  const handleEmailChange = (event:any) => {
    event.preventDefault()
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event:any) => {
    event.preventDefault()
    setPassword(event.target.value)
  }
  const handleLogin = (event:any) => {
    // Check if password is long enough & return error message
    event.preventDefault()
    const data = {email, password}
    fetch('/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(userName => setLoggedInUser(userName))
  }

  if (loggedInUser === '') {
    return (
      <>
        <h1>Log In</h1>
          <Form>  
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Email" onChange={handleEmailChange}/>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
            </Form.Group>
    
            <Button variant="primary" type="submit" onClick={handleLogin}>
              Log In
            </Button>
          </Form>
      </>
    )
  } else {
    return (
      <>
        <Builder />
      </>
    )
  }

  
}
