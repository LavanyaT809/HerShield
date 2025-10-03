import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaHeart, FaFirstAid, FaClipboardList, FaBook, FaRoute, FaExclamationTriangle } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const cardWidth = 320;
  const gap = 20;

  const originalFeatures = [
    {
      icon: <FaFirstAid />,
      title: 'SOS Alert',
      description: 'You will be able to send an emergency alert to your family or friends with your live location with just a tap.',
      color: '#ff4500',
    },
    {
      icon: <FaClipboardList />,
      title: 'Report Incident',
      description: 'Report incidents such as harassment, unsafe areas, or crimes. Create a stronger safety network.',
      color: '#00bfff',
    },
    {
      icon: <FaExclamationTriangle />,
      title: 'Weapon Detection Alert',
      description: 'If a weapon is detected nearby, an alert will be sent immediately to the nearest police station for prompt action.',
      color: '#dc143c',
    },
    {
      icon: <FaBook />,
      title: 'Educate Page',
      description: 'Access valuable information and resources on women safety and self-defense.',
      color: '#ffa500',
    },
    {
      icon: <FaRoute />,
      title: 'Safe Route Finding',
      description: 'Find the safest routes from start to destination using crime data and safety zones.',
      color: '#32cd32',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'NearBy',
      description: 'You will be able to find nearby police stations and nearby women safety NGOs.',
      color: '#ff69b4',
    },
    {
      icon: <FaHeart />,
      title: 'Live Location',
      description: 'You can share your live location with your family or friends so that they can reach you when there is an emergency.',
      color: '#8a2be2',
    },
  ];

  const features = [...originalFeatures, ...originalFeatures];

  useEffect(() => {
    const next = (currentIndex + 1) % originalFeatures.length;
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(next);
    }, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, originalFeatures.length]);

  return (
    <div id="features" className="features-section educate-page-container">
      <div className="features-header">
        <p>Our Features</p>
        <h2>Worlds Best App for "Women's Safety"</h2>
        <a href="#" className="view-all-services">View all services</a>
      </div>
      <div
        className="features-carousel"
        style={{ width: `${3 * cardWidth + 2 * gap}px`, margin: '0 auto' }}
      >
        <div
          className="features-container"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {features.map((feature, index) => (
            <div className="feature-card info-card" key={index}>
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button>Read More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
