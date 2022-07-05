import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkoutBuilder from './components/WorkoutBuilder'; 
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Nav from "./components/Nav";
import UserProfile from "./components/UserProfile";
import './styles/App.css'
import './styles/Nav.css'
import './styles/Forms.css'
import './styles/WorkoutBuilder.css'
import './styles/Workout.css'
import './styles/UserProfile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    fetch('/session')
    .then(user => {
      if (user) {
        setLoggedIn(true)
      }
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Nav 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn}/>
        <div>
          <Routes>
            <Route path="/" element={loggedIn?<WorkoutBuilder setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>:<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}></Route>
            <Route path="/sign-up" element={<SignUp setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}></Route>
            <Route path="/profile" element={<UserProfile setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}></Route>
            <Route path="/builder" element={<WorkoutBuilder setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
