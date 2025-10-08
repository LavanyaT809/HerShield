import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import EducatePage from './pages/EducatePage';
import SafeGuard from './components/SafeGuard';
import SafeRoutePage from './pages/SafeRoutePage';
import Analytics from './components/Analytics';
import Report from './components/Report';
import Contacts from './components/Contacts';
import AadhaarDemo from './components/AadhaarDemo';
import { FaShieldAlt } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <div className="logo">
              <FaShieldAlt style={{ marginRight: '10px' }} />
              SheShield
            </div>
            <ul>
              <li><NavLink to="/home">Home</NavLink></li>
              <li><a href="#features">Features</a></li>
              <li><NavLink to="/saferoute">SafeRoute</NavLink></li>
              <li><NavLink to="/educate">Educate</NavLink></li>
              <li><NavLink to="/safeguard">SafeGuard</NavLink></li>
              <li><NavLink to="/contacts">Contacts</NavLink></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<AadhaarDemo />} />
          <Route path="/home" element={<Home />} />
          <Route path="/educate" element={<EducatePage />} />
          <Route path="/safeguard" element={<SafeGuard />} />
          <Route path="/saferoute" element={<SafeRoutePage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/report" element={<Report />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// / import React from 'react';
// import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
// import './App.css';
// import Home from './components/Home';
// import EducatePage from './pages/EducatePage';
// import SafeGuard from './components/SafeGuard';
// import SafeRoutePage from './pages/SafeRoutePage';
// import Analytics from './components/Analytics';
// import Report from './components/Report';
// import Contacts from './components/Contacts';
// import { FaShieldAlt } from 'react-icons/fa';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <nav>
//             <div className="logo">
//               <FaShieldAlt style={{ marginRight: '10px' }} />
//               SheShield
//             </div>
//             <ul>
//               <li><NavLink to="/">Home</NavLink></li>
//               <li><a href="#features">Features</a></li>
//               <li><NavLink to="/saferoute">SafeRoute</NavLink></li>
//               <li><NavLink to="/educate">Educate</NavLink></li>
//               <li><NavLink to="/safeguard">SafeGuard</NavLink></li>
//               <li><NavLink to="/contacts">Contacts</NavLink></li>
//             </ul>
//           </nav>
//         </header>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/educate" element={<EducatePage />} />
//           <Route path="/safeguard" element={<SafeGuard />} />
//           <Route path="/saferoute" element={<SafeRoutePage />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/report" element={<Report />} />
//           <Route path="/contacts" element={<Contacts />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
