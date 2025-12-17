import React, { useState } from 'react';
import './ChatbotMenu.css';

const ChatbotMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'welcome', name: 'Hey Zuha! Start Here 🎄', icon: '🎄' },
    { id: 'about', name: 'Random Santa Facts (Because Why Not?) 🎅', icon: '🎅' },
    { id: 'traditions', name: 'My Christmas Vibes 📸', icon: '📸' },
    { id: 'activities', name: 'My Christmas Timeline 🎁', icon: '🎁' },
    { id: 'newyear', name: 'New Year Wishes 🎊', icon: '🎊' },
    { id: 'locked', name: 'Your Gift! 🎁', icon: '🎁' },
  ];

  const handleSectionClick = (sectionId) => {
    window.location.hash = sectionId;
    setIsOpen(false);
    
    // Scroll to section
    setTimeout(() => {
      const section = document.querySelector(`[data-section="${sectionId}"]`);
      if (section) {
        const sectionLeft = section.offsetLeft;
        window.scrollTo({
          left: sectionLeft,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-menu ${isOpen ? 'open' : ''}`}>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`menu-item ${section.id === 'locked' ? 'locked-item' : ''}`}
            onClick={() => handleSectionClick(section.id)}
          >
            <span className="menu-icon">{section.icon}</span>
            <span className="menu-text">
              {section.name}
            </span>
          </button>
        ))}
      </div>
      
      <button
        className="chatbot-icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="gift-box">
          <div className="gift-box-top"></div>
          <div className="gift-box-bottom">
            <div className="ribbon-vertical"></div>
            <div className="ribbon-horizontal"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ChatbotMenu;

