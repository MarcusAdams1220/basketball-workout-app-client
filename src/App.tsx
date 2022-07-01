import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Builder from './components/Builder'; 
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/builder" element={<Builder />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
