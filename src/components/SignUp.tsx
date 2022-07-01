import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Builder from './Builder'

export default function SignUp() {
  const [name, setName] = useState(String)
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const [passwordMatch, setPasswordMatch] = useState(String)
  const [signedUp, setSignedUp] = useState(false)

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
  const handlePasswordMatchChange = (event:any) => {
    event.preventDefault()
    setPasswordMatch(event.target.value)
  }
  const handleSubmit = (event:any) => {
    if (password == passwordMatch && password.length > 0) {
      console.log('passwords match')
      event.preventDefault()
      const data = {name, email, password}
      fetch('/signup', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => setSignedUp(true))
    } else {
      event.preventDefault()
      const passwordMatch = document.getElementsByClassName('password-error')[0]
      passwordMatch.innerHTML = 'Passwords do not match'
    }
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

          <Form.Group className="mb-3" controlId="formBasicPasswordMatch" id="password-match">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" onChange={handlePasswordMatchChange}/>
          </Form.Group>

          <p className='password-error'></p>
  
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Sign Me Up!
          </Button>
        </Form>
      </>
    )
  }  
}
