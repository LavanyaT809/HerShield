import React from 'react';
import './EducatePage.css';

const EducatePage = () => {
  return (
    <div className="educate-page">
      <div className="educate-hero">
        <h1>Educate Yourself</h1>
        <p>Knowledge is power. Learn about self-defense, legal rights, and how to stay safe.</p>
      </div>
      <div className="educate-content">
        <div className="educate-cards">
          <div className="educate-card">
            <h3>Self-Defense</h3>
            <p>Learn basic self-defense techniques to protect yourself in dangerous situations.</p>
          </div>
          <div className="educate-card">
            <h3>Legal Rights</h3>
            <p>Know your legal rights and the resources available to you if you're a victim of a crime.</p>
          </div>
          <div className="educate-card">
            <h3>Stay Safe Online</h3>
            <p>Learn how to protect yourself from online harassment and cyberbullying.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatePage;
