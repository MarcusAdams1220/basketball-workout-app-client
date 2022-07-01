import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Builder from './Builder'

export default function SignUp() {
  const [name, setName] = useState(String)
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const [signedUp, setSignedUp] = useState(false)

  useEffect(() => {
    console.log(signedUp)
  }, [signedUp])

  const handleNameChange = (event:any) => {
    event.preventDefault()
    setName(event.target.value)
  }
  const handleEmailChange = (event:any) => {
    event.preventDefault()
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event:any) => {
    event.preventDefault()
    setPassword(event.target.value)
  }
  const handleSubmit = (event:any) => {
    event.preventDefault()
    const data = {name, email, password}
    fetch('/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => setSignedUp(true))
  }

  if (signedUp) {
    return (
      <>
        <Builder />
      </>
    )
  } else {
    return (
      <>
        <h1>Sign Up</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Name" onChange={handleNameChange}/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={handleEmailChange}/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
          </Form.Group>
  
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Sign Me Up!
          </Button>
        </Form>
      </>
    )
  }  
}
