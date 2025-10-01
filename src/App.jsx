import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import EducatePage from './pages/EducatePage';
import SafeGuard from './components/SafeGuard';
import SafeRoute from './components/SafeRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <div className="logo">SheSecure</div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#features">Features</a></li>
              <li><Link to="/saferoute">SafeRoute</Link></li>
              <li><Link to="/educate">Educate</Link></li>
              <li><Link to="/safeguard">SafeGuard</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/educate" element={<EducatePage />} />
          <Route path="/safeguard" element={<SafeGuard />} />
          <Route path="/saferoute" element={<SafeRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
