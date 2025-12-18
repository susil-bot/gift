import React, { useEffect } from "react";
import { HashRouter, useLocation } from "react-router-dom";
import Welcome from "./components/Welcome";
import AboutSanta from "./components/AboutSanta";
import HolidayTraditions from "./components/HolidayTraditions";
import ChristmasActivities from "./components/ChristmasActivities";
import NewYearParty from "./components/NewYearParty";
import LockedSection from "./components/LockedSection";
import MobileScrollHint from "./components/MobileScrollHint";
import ChatbotMenu from "./components/ChatbotMenu";
import MusicPlayer from "./components/MusicPlayer";

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && hash !== 'welcome') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const section = document.querySelector(`[data-section="${hash}"]`);
        if (section) {
          // For horizontal scrolling, scroll the window/body
          const sectionLeft = section.offsetLeft;
          const currentScroll = window.scrollX || document.documentElement.scrollLeft;
          
          // Only scroll if not already at the section
          if (Math.abs(currentScroll - sectionLeft) > 50) {
            window.scrollTo({
              left: sectionLeft,
              behavior: 'smooth'
            });
          }
        }
      }, 150);
    } else {
      // If no hash or hash is 'welcome', scroll to top (welcome section)
      setTimeout(() => {
        const currentScroll = window.scrollX || document.documentElement.scrollLeft;
        if (currentScroll !== 0) {
          window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'instant' // Use instant for initial load to avoid animation
          });
        }
        // Set hash if not already set
        if (!hash) {
          window.history.replaceState(null, '', '#welcome');
        }
      }, 50);
    }
  }, [location]);

  // Update URL hash on scroll for browser back/forward
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    
    // Use Intersection Observer for more accurate detection
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: [0.5, 0.7, 0.9] // Trigger at 50%, 70%, and 90% visibility
    };

    const observerCallback = (entries) => {
      // Find the section with highest intersection ratio
      let maxRatio = 0;
      let activeSection = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeSection = entry.target;
        }
      });

      if (activeSection && maxRatio > 0.5) {
        const sectionId = activeSection.getAttribute('data-section');
        const currentHash = window.location.hash.replace('#', '');
        
        if (currentHash !== sectionId) {
          window.history.replaceState(null, '', `#${sectionId}`);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Fallback: Also listen to scroll events for immediate updates
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const viewportWidth = window.innerWidth;
        
        let activeSection = null;
        let minDistance = Infinity;

        sections.forEach((section) => {
          const sectionLeft = section.offsetLeft;
          const sectionWidth = section.offsetWidth;
          const sectionCenter = sectionLeft + sectionWidth / 2;
          const viewportCenter = scrollLeft + viewportWidth / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          
          // Check if section is mostly visible
          if (sectionLeft <= scrollLeft + viewportWidth * 0.2 && 
              sectionLeft + sectionWidth >= scrollLeft + viewportWidth * 0.8) {
            if (distance < minDistance) {
              minDistance = distance;
              activeSection = section;
            }
          }
        });

        if (activeSection) {
          const sectionId = activeSection.getAttribute('data-section');
          const currentHash = window.location.hash.replace('#', '');
          
          if (currentHash !== sectionId) {
            window.history.replaceState(null, '', `#${sectionId}`);
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen to touch events for swipe detection
    let touchEndTimeout;
    const handleTouchEnd = () => {
      clearTimeout(touchEndTimeout);
      touchEndTimeout = setTimeout(() => {
        // Let scroll-snap complete, then update hash
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const viewportWidth = window.innerWidth;
        
        let activeSection = null;
        let minDistance = Infinity;

        sections.forEach((section) => {
          const sectionLeft = section.offsetLeft;
          const sectionWidth = section.offsetWidth;
          const sectionCenter = sectionLeft + sectionWidth / 2;
          const viewportCenter = scrollLeft + viewportWidth / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          
          if (sectionLeft <= scrollLeft + viewportWidth * 0.15 && 
              sectionLeft + sectionWidth >= scrollLeft + viewportWidth * 0.85) {
            if (distance < minDistance) {
              minDistance = distance;
              activeSection = section;
            }
          }
        });

        if (activeSection) {
          const sectionId = activeSection.getAttribute('data-section');
          window.history.replaceState(null, '', `#${sectionId}`);
        }
      }, 400); // Wait for scroll-snap to complete
    };

    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout);
      clearTimeout(touchEndTimeout);
    };
  }, []);

  return null;
};

const AppContent = () => {
  // Ensure page starts at top on initial load
  useEffect(() => {
    // Scroll to top immediately on mount
    window.scrollTo(0, 0);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    
    // Also set hash to welcome if not already set
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', '#welcome');
    }
  }, []);

  return (
    <>
      <div className="app-container">
        <Welcome />
        <AboutSanta />
        <HolidayTraditions />
        <ChristmasActivities />
        <NewYearParty />
        <LockedSection />
      </div>
      <MobileScrollHint />
      <ChatbotMenu />
      <MusicPlayer />
      <ScrollToSection />
    </>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;

