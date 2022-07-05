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
import { useState } from 'react'

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  console.log(loggedIn)

  return (
    <div className="App">
      <Router>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <div>
          <Routes>
            <Route path="/" element={loggedIn?<WorkoutBuilder setLoggedIn={setLoggedIn}/>:<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}></Route>
            <Route path="/sign-up" element={<SignUp setLoggedIn={setLoggedIn}/>}></Route>
            <Route path="/profile" element={<UserProfile setLoggedIn={setLoggedIn}/>}></Route>
            <Route path="/builder" element={<WorkoutBuilder setLoggedIn={setLoggedIn}/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
