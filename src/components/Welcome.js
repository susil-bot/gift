import React, { useEffect } from 'react';
import './Welcome.css';

const Welcome = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.welcome-section .scroll-animate');
      const windowHeight = window.innerHeight;
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Trigger when element is 80% into viewport
        const triggerPoint = windowHeight * 0.8;
        
        if (rect.top < triggerPoint && rect.bottom > 0 && !el.classList.contains('visible')) {
          el.classList.add('visible');
        }
      });
    };

    // Use Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all scroll-animate elements
    const elements = document.querySelectorAll('.welcome-section .scroll-animate');
    elements.forEach((el) => observer.observe(el));

    // Fallback scroll handler
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="welcome-section" data-section="welcome" id="welcome">
      <div className="welcome-container">
        <div className="content">
          <div className="text-section">
            <div className="scroll-animate welcome-pill">
              <div className="pill">🎄 A Special Gift For You 🎄</div>
            </div>
            
            <h2 className="scroll-animate welcome-title">
              Hey Zuha! 🎄 Merry Christmas! 🎄
            </h2>
            
            <p className="scroll-animate welcome-subtitle">
              So... I may have gone a *little* overboard with your Christmas gift this year 😅
            </p>
            
            <p className="scroll-animate welcome-quote">
              "Instead of buying something normal, I decided to code you an entire website. Because why not, right? 😂"
            </p>
            
            <div className="scroll-animate welcome-description">
              <p>
                Look, I know you&apos;re probably thinking &quot;where&apos;s my Stanley tumbler?&quot; 
                (don&apos;t worry, we&apos;ll get to that 😉). But first, let me show you what I&apos;ve been 
                working on instead of doing actual work at the office!
              </p>
            </div>
            
            <ul className="list scroll-animate welcome-list">
              <li>Some random Santa facts I found on Google (because why not?)</li>
              <li>Christmas traditions from around the world (educational AND festive!)</li>
              <li>Activities you can do (or just read about and never actually do)</li>
              <li>Finally, you can order your Stanley! (Just swipe to the end 😉)</li>
            </ul>
            
            <div className="scroll-animate welcome-cta">
              <p className="cta-text">
                🎅 Swipe right to see what I&apos;ve been up to! 🎁
              </p>
              <div className="scroll-indicator">
                <div className="scroll-arrow">→</div>
              </div>
            </div>
          </div>
          
          <div className="image-section scroll-animate">
            <div className="image-placeholder">
              <div className="snowflake">❄</div>
              <div className="snowflake">❄</div>
              <div className="snowflake">❄</div>
              <div className="christmas-icon">🎄</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

