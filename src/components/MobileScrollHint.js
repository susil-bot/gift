import React, { useState, useEffect } from 'react';
import './MobileScrollHint.css';

const MobileScrollHint = () => {
  const [showHint, setShowHint] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    
    if (isMobile) {
      setShowHint(true);
      
      // Hide hint after user scrolls
      const handleScroll = () => {
        if (!hasScrolled) {
          setHasScrolled(true);
          setTimeout(() => setShowHint(false), 500);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('touchstart', handleScroll, { passive: true });
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowHint(false);
      }, 5000);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('touchstart', handleScroll);
        clearTimeout(timer);
      };
    }
  }, [hasScrolled]);

  if (!showHint) return null;

  return (
    <div className="mobile-scroll-hint">
      <div className="hint-content">
        <span className="hint-icon">👆</span>
        <span className="hint-text">Swipe right to continue</span>
        <span className="hint-arrow">→</span>
      </div>
    </div>
  );
};

export default MobileScrollHint;

