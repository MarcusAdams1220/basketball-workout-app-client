import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface LoginProp {
  setLoggedIn: (state:boolean) => void;
  loggedIn: Boolean;
}

export default function Login({setLoggedIn, loggedIn}:LoginProp) {
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const navigate = useNavigate()

  const handleEmailChange = (event:any) => {
    event.preventDefault()
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event:any) => {
    event.preventDefault()
    setPassword(event.target.value)
  }
  const handleLogin = (event:any) => {
    event.preventDefault()
    const data = {email, password}
    fetch('/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(user => {
      // Customised error messages
      if (email.length === 0) {
        // Missing email
        const errorMsg = document.getElementsByClassName('error-msg')[0]
        errorMsg.innerHTML = '📧 You must enter your email address'
      } else if (password.length === 0) {
        // Missing password
        const errorMsg = document.getElementsByClassName('error-msg')[0]
        errorMsg.innerHTML = '🔑 You must enter your password'
      } else if (user.error) {
        // Email or password is incorrect
        const errorMsg = document.getElementsByClassName('error-msg')[0]
        errorMsg.innerHTML = user.error
      } else {
        // Succesful login
        setLoggedIn(true)
        window.localStorage.setItem('isLoggedIn', 'true')
        window.localStorage.setItem('userId', user.id)
        window.localStorage.setItem('userName', user.name)
        navigate('/builder')
      }
    })
  }


  return (
    <>
      <Form id="user-form">
        <h1>Log In</h1>
        <p className="error-msg"></p>
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
        
        <p>Don't Have An Account? <a href="/sign-up">Click Here To Sign Up</a></p>
      </Form>
  </>
  )
}
