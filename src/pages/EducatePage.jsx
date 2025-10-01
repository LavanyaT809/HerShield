import React, { useState } from 'react';
import '../styles/EducatePage.css';
import { FaChevronDown, FaChevronUp, FaBook, FaLifeRing, FaPlayCircle } from 'react-icons/fa';

const RightsItem = ({ title, content, isOpen, onClick }) => (
  <div className="right-item">
    <div className="right-header" onClick={onClick}>
      <h3>{title}</h3>
      <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
    </div>
    {isOpen && <div className="right-content">{content}</div>}
  </div>
);

const EducatePage = () => {
  const [openRights, setOpenRights] = useState({});

  const toggleRight = (right) => {
    setOpenRights(prev => ({ ...prev, [right]: !prev[right] }));
  };

  const handleVideoClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fundamentalRights = [
    { title: "Right to Equality (Article 14)", description: "Women have the right to equality before the law and equal protection of the laws. No discrimination is allowed on the basis of gender." },
    { title: "Right Against Discrimination (Article 15)", description: "The State is prohibited from discriminating against women on grounds of sex. It can also make special provisions in favor of women and children." },
    { title: "Right to Equal Opportunity in Public Employment (Article 16)", description: "Women have the right to equal opportunity in matters of public employment and appointment to any office under the State." },
    { title: "Right to Life and Personal Liberty (Article 21)", description: "Every woman has the right to live with dignity, personal freedom, and protection from violence, exploitation, or harassment." },
    { title: "Right to Equal Pay (Article 39(d))", description: "The State shall ensure equal pay for equal work for both men and women." },
    { title: "Right to Maternity Relief (Article 42)", description: "The State shall make provisions for just and humane conditions of work and maternity relief for working women." },
    { title: "Right Against Human Trafficking (Article 23)", description: "Women are protected from trafficking, forced labor, and similar forms of exploitation." },
    { title: "Right to Constitutional Remedies (Article 32)", description: "Women can directly approach the Supreme Court if their fundamental rights are violated." }
  ];

  const keySafetyLaws = [
    { title: "Protection of Women from Domestic Violence Act, 2005", description: "Provides immediate protection orders, residence rights, and relief for women facing physical, emotional, sexual, or economic abuse at home." },
    { title: "Section 354 of IPC (Outraging Modesty of a Woman)", description: "Ensures strict punishment for assault or criminal force intended to outrage a woman’s modesty, including harassment in public spaces." },
    { title: "Section 509 of IPC (Word, Gesture or Act Intended to Insult Modesty)", description: "Protects women from verbal abuse, indecent gestures, or harassment, giving immediate legal recourse." },
    { title: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act)", description: "Provides a complaint mechanism through Internal Complaints Committees (ICC) and ensures immediate workplace protection for women." },
    { title: "Section 498A of IPC (Cruelty by Husband or Relatives)", description: "Protects women from cruelty, harassment, or violence by husband or his relatives, with provisions for immediate legal action." }
  ];
  
  const videoThumbnails = {
    'm2uKwkaa6Vw': 'https://i.ytimg.com/vi/m2uKwkaa6Vw/hqdefault.jpg',
    'M7PZJRFpcYg': 'https://i.ytimg.com/vi/M7PZJRFpcYg/hqdefault.jpg',
  };

  return (
    <div className="educate-page-container">
      <h1><span className="purple-title">Empowerment</span> & Education Hub</h1>
      <div className="educate-content">
        <div className="left-column">
          <div className="info-card">
            <h2><FaBook style={{ marginRight: '15px' }} />Know Your Rights & Safety Laws</h2>
            <div className="rights-list">
              <RightsItem 
                title="1. Fundamental Women's Rights (Constitutional)" 
                content={
                  <div>
                    {fundamentalRights.map((right, index) => (
                      <div key={index} style={{ marginBottom: '15px' }}>
                        <h4 className="right-subtitle">{index + 1}. {right.title}</h4>
                        <p>{right.description}</p>
                      </div>
                    ))}
                  </div>
                }
                isOpen={openRights.fundamental}
                onClick={() => toggleRight('fundamental')}
              />
              <RightsItem 
                title="2. Key Safety Laws (Immediate Protection)" 
                content={
                  <div>
                    {keySafetyLaws.map((law, index) => (
                      <div key={index} style={{ marginBottom: '15px' }}>
                        <h4 className="right-subtitle">{index + 1}. {law.title}</h4>
                        <p>{law.description}</p>
                      </div>
                    ))}
                  </div>
                }
                isOpen={openRights.keySafety}
                onClick={() => toggleRight('keySafety')}
              />
            </div>
          </div>
          
          <div className="info-card">
            <h2>Self-Defense Techniques</h2>
            <p>Practical, quick techniques that can be used to escape dangerous situations.</p>
            <div className="self-defense-videos">
              <div 
                className="video-thumbnail" 
                style={{ backgroundImage: `url(${videoThumbnails['m2uKwkaa6Vw']})` }}
                onClick={() => handleVideoClick('https://www.youtube.com/watch?v=m2uKwkaa6Vw')}
              >
                <FaPlayCircle className="play-icon" />
              </div>
              <div 
                className="video-thumbnail" 
                style={{ backgroundImage: `url(${videoThumbnails['M7PZJRFpcYg']})` }}
                onClick={() => handleVideoClick('https://www.youtube.com/watch?v=M7PZJRFpcYg')}
              >
                <FaPlayCircle className="play-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="info-card emergency-helplines">
            <h2><FaLifeRing className="icon" />Emergency Helplines</h2>
            <p>Use these numbers for immediate, professional assistance.</p>
            <div className="helplines-list">
              <div className="helpline-item">
                <h3>Police Emergency</h3>
                <p>100</p>
              </div>
              <div className="helpline-item">
                <h3>Women's National Helpline</h3>
                <p>1091</p>
              </div>
              <div className="helpline-item">
                <h3>Domestic Abuse Support</h3>
                <p>181</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatePage;
