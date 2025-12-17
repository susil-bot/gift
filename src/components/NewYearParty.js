import React, { useState, useEffect } from "react";
import './NewYearParty.css';

const NewYearParty = () => {
  const [showContent, setShowContent] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Check if current date is after December 25th night (December 26th onwards)
    const now = new Date();
    const currentYear = now.getFullYear();
    const dec26 = new Date(currentYear, 11, 26, 0, 0, 0); // Dec 26, 00:00
    
    if (now >= dec26) {
      setShowContent(true);
      setShowTimer(true);
    }
  }, []);

  useEffect(() => {
    if (!showTimer) return;

    // Update timer every second
    const updateTimer = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const nextYear = new Date(currentYear + 1, 0, 1, 0, 0, 0); // Jan 1, next year
      
      const difference = nextYear - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Initial update
    updateTimer();

    // Update every second
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [showTimer]);

  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const [showMessage, setShowMessage] = useState(false);

  const myGoals = [
    "Level up my skills and take on exciting new challenges",
    "Explore new places and create amazing memories",
    "Stay healthy and actually use that gym membership"
  ];

  const handleItemClick = (index) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
    
    // Show message when all are checked
    if (newChecked.every(checked => checked)) {
      setShowMessage(true);
    }
  };

  return (
    <section className="card" data-section="newyear" id="newyear">
      <div className="pill">🎊 New Year Wishes 🎊</div>
      <h2>Happy New Year, Zuha!</h2>
      
      {!showContent ? (
        <div className="waiting-section">
          <div className="waiting-icon">⏳</div>
          <h3 className="waiting-heading">Wait for 26th</h3>
          <p className="waiting-text">
            The plan is in progress... 
            <br />
            Come back on December 26th to see what's in store! 🎁
          </p>
          <div className="sparkle">✨</div>
        </div>
      ) : (
        <>
          <p className="intro-text">
            As we celebrate Christmas, we also look forward to the new year ahead. 
            May it bring you joy, success, and wonderful new adventures!
          </p>

          <div className="goals-section">
            <h3 className="goals-heading">My Goals for 2025</h3>
            <ul className="goals-list">
              {myGoals.map((goal, index) => (
                <li 
                  key={index} 
                  className={`goal-item ${checkedItems[index] ? 'checked' : ''}`}
                  onClick={() => handleItemClick(index)}
                >
                  <span className="checkmark">{checkedItems[index] ? '✓' : ''}</span>
                  <span className="goal-text">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {showMessage && (
            <div className="share-prompt">
              <p className="prompt-text">
                Now it's your turn, Zuha! What are your goals for 2025? 
                Share them on LinkedIn and tag me - let's hold each other accountable! 💫
              </p>
              <div className="contact-info">
                <p className="contact-text">Connect with me:</p>
                <p className="contact-details">
                  LinkedIn: <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="contact-link">Your LinkedIn Profile</a>
                </p>
              </div>
            </div>
          )}

          {showTimer && (
            <div className="timer-section">
              <h3 className="timer-heading">⏰ Countdown to New Year 2025</h3>
              <div className="timer-container">
                <div className="timer-box">
                  <div className="timer-value">{timeLeft.days}</div>
                  <div className="timer-label">Days</div>
                </div>
                <div className="timer-separator">:</div>
                <div className="timer-box">
                  <div className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="timer-label">Hours</div>
                </div>
                <div className="timer-separator">:</div>
                <div className="timer-box">
                  <div className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="timer-label">Minutes</div>
                </div>
                <div className="timer-separator">:</div>
                <div className="timer-box">
                  <div className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="timer-label">Seconds</div>
                </div>
              </div>
              <p className="timer-message">Until we welcome 2025! 🎆</p>
            </div>
          )}

          <p className="new-year-wish">
            Wishing you a bright and beautiful new year, Zuha! ✨
          </p>
        </>
      )}
    </section>
  );
};

export default NewYearParty;

