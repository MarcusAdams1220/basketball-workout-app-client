import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'; 
import Nav from "./components/Nav";
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
