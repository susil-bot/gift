import React, { useState, useEffect } from 'react';
import './Snackbar.css';

const Snackbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show snackbar immediately on mount
    setIsVisible(true);
    
    // Auto-dismiss after 5 seconds
    const initialDismiss = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Set interval to show snackbar every 30 seconds (30000ms)
    const interval = setInterval(() => {
      setIsVisible(true);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(initialDismiss);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="snackbar-container">
      <div className="snackbar">
        <div className="snackbar-content">
          <span className="snackbar-emoji">💝</span>
          <span className="snackbar-message">
            I know this looks more crush but just for fun like that we need to intimate 😊
          </span>
        </div>
        <button className="snackbar-close" onClick={handleClose} aria-label="Close">
          ×
        </button>
      </div>
    </div>
  );
};

export default Snackbar;

