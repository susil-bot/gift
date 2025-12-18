import React, { useEffect, useLayoutEffect, useRef } from 'react';
import './Welcome.css';

const Welcome = () => {
  const sectionRef = useRef(null);

  // Use useLayoutEffect to add visible class immediately, before paint
  useLayoutEffect(() => {
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.scroll-animate');
      elements.forEach((el) => {
        el.classList.add('visible');
      });
      
      // Ensure scroll position is at top on mobile
      sectionRef.current.scrollTop = 0;
    }
    
    // Ensure window scroll is at top
    window.scrollTo(0, 0);
    document.documentElement.scrollLeft = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollLeft = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    // Ensure page starts at the top on initial load
    window.scrollTo(0, 0);
    window.scrollTo({ left: 0, top: 0, behavior: 'instant' });
    document.documentElement.scrollLeft = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollLeft = 0;
    document.body.scrollTop = 0;
    
    // Also scroll the welcome section itself to top if it has its own scroll
    if (sectionRef.current) {
      sectionRef.current.scrollTop = 0;
    }

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

    // Check if elements are already visible on load - make all welcome section elements visible immediately
    const checkInitialVisibility = () => {
      const welcomeSection = document.querySelector('.welcome-section');
      if (!welcomeSection) return;
      
      const rect = welcomeSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If welcome section is in viewport (or very close to it), make all its scroll-animate elements visible
      // This ensures content is visible when user first loads the page
      if (rect.top < windowHeight + 100 && rect.bottom > -100) {
        const elements = document.querySelectorAll('.welcome-section .scroll-animate');
        elements.forEach((el) => {
          el.classList.add('visible');
        });
      }
    };
    
    // Force make welcome section elements visible on initial load
    const forceInitialVisibility = () => {
      const elements = document.querySelectorAll('.welcome-section .scroll-animate');
      // Check if we're at the welcome section (scroll position is 0 or very close)
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      if (scrollLeft < 50) {
        elements.forEach((el) => {
          el.classList.add('visible');
        });
      }
    };

    // Use Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.2] // Multiple thresholds for better detection
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
    
    // Force visibility immediately for welcome section on initial load
    forceInitialVisibility();
    
    // Immediate check - no delay for initial visibility
    checkInitialVisibility();
    
    // Also check after a very short delay to catch any timing issues
    setTimeout(() => {
      forceInitialVisibility();
      checkInitialVisibility();
      handleScroll();
    }, 50);
    
    // One more check after DOM is fully settled
    setTimeout(() => {
      forceInitialVisibility();
      checkInitialVisibility();
    }, 200);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="welcome-section" data-section="welcome" id="welcome">
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

