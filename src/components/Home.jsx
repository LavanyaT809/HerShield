import React from 'react';
import '../App.css';
import Features from './Features';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-hero-section">
        <div className="background"></div>
        <main className="main-content">
          <div className="text-content">
            <h1>
              <span style={{ color: '#9370DB' }}>Your Safety,</span> Reimagined
            </h1>
            <p>Every woman deserves to feel safe, secure, and respected</p>
            <button onClick={() => navigate('/report')}>Report</button>
            <button onClick={() => navigate('/analytics')} style={{ marginLeft: '20px' }}>Analytics</button>
          </div>
          <div className="image-content">
            <img src="https://slic.org.in/uploads/2020/10-October/03-Sat/rape%20image%202.jpg" alt="Crying woman" />
          </div>
        </main>
      </div>
      <Features />
    </>
  );
};

export default Home;
