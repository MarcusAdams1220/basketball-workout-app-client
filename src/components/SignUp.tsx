import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface SignUpProp {
  setLoggedIn: (state:boolean) => void;
  loggedIn: any
}

export default function SignUp({setLoggedIn, loggedIn}:SignUpProp) {
  const [name, setName] = useState(String)
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const [passwordMatch, setPasswordMatch] = useState(String)
  const navigate = useNavigate()

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
    event.preventDefault()
    // Check that input fields are not blank
    if (password == passwordMatch && name.length > 0 && email.length > 0 && password.length > 0) {
      const data = {name, email, password}
      fetch('/signup', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(user => { 
        if (user.error) {
          // User already exists
          const errorMsg = document.getElementsByClassName('error-msg')[0]
          errorMsg.innerHTML = user.error
        } else {
          // Successful sign-up
          setLoggedIn(true)
          window.localStorage.setItem('isLoggedIn', 'true')
          window.localStorage.setItem('userId', user.id)
          window.localStorage.setItem('userName', user.name)
          navigate('/')
        }
      })
      // Customised error messages
    } else if (name.length === 0) {
      // Missing name
      const errorMsg = document.getElementsByClassName('error-msg')[0]
      errorMsg.innerHTML = '???? You must enter your name'
    } else if (email.length === 0) {
      // Missing email
      const errorMsg = document.getElementsByClassName('error-msg')[0]
      errorMsg.innerHTML = '???? You must enter your email address'
    } else if (password.length === 0) {
      // Missing password
      const errorMsg = document.getElementsByClassName('error-msg')[0]
      errorMsg.innerHTML = '???? You must enter a password'
    } else if (password !== passwordMatch) {
      // Passwords do not match
      const errorMsg = document.getElementsByClassName('error-msg')[0]
      errorMsg.innerHTML = '???? Passwords do not match'
    }
  }

return (
    <>
      <Form onSubmit={handleSubmit} id="user-form">
        <h1>Sign Up</h1>
        <p className='error-msg'></p>
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

        <Button variant="primary" type="submit">
          Sign Me Up!
        </Button>

        <p>Already Have An Account? <a href="/">Click Here To Log In</a></p>
      </Form>
    </>
  )  
}
