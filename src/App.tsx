import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkoutBuilder from './components/WorkoutBuilder'; 
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Nav from "./components/Nav";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const loggedIn = window.localStorage.getItem('isLoggedIn')

  return (
    <Router>
      <Nav 
        loggedIn={loggedIn}
      />
      <div className="App">
        <Routes>
          <Route path="/" element={loggedIn?<WorkoutBuilder />:<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
