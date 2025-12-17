import React, { useEffect, useState } from "react";
import './HolidayTraditions.css';

const HolidayTraditions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 12 Instagram embed URLs - Add your Instagram post/reel URLs here
  const moments = [
    { id: 1, url: 'https://www.instagram.com/reel/DSP-KA-Exmh/' },
    { id: 2, url: 'https://www.instagram.com/reel/DSPz9btj5t6/' },
    { id: 3, url: 'https://www.instagram.com/p/DSPs_fxksYs/' },
    { id: 4, url: '' },
    { id: 5, url: '' },
    { id: 6, url: '' },
    { id: 7, url: '' },
    { id: 8, url: '' },
    { id: 9, url: '' },
    { id: 10, url: '' },
    { id: 11, url: '' },
    { id: 12, url: '' },
  ];

  const filteredMoments = moments.filter(m => m.url);

  useEffect(() => {
    // Load Instagram embed script
    const loadInstagramEmbeds = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = '//www.instagram.com/embed.js';
          script.async = true;
          document.body.appendChild(script);
          
          script.onload = () => {
            if (window.instgrm) {
              window.instgrm.Embeds.process();
            }
          };
        } else {
          // Script exists, just process
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }
      }
    };

    // Process embeds after a short delay to ensure DOM is ready
    const timer = setTimeout(loadInstagramEmbeds, 100);
    
    return () => clearTimeout(timer);
  }, [isModalOpen, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < filteredMoments.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentIndex, filteredMoments.length]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleNext = () => {
    if (currentIndex < filteredMoments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleScroll = (e) => {
    const delta = e.deltaY;
    if (delta > 0) {
      handleNext();
    } else if (delta < 0) {
      handlePrev();
    }
  };

  return (
    <section className="card" data-section="traditions" id="traditions">
      <div className="pill">🎄 How I Spend Christmas 🎄</div>
      <h2>My Christmas Vibes</h2>
      <p>
        Okay, so you&apos;re probably wondering how I actually spend Christmas. 
        Let me be real with you - it&apos;s not as fancy as those Instagram posts make it seem! 😂
      </p>
    
      
      <div className="moments-section">
        <h3 className="moments-heading">Moments 📸</h3>
        <button className="view-moments-btn" onClick={handleOpenModal}>
          View All Moments →
        </button>
      </div>

      {/* Full Screen Modal with Vertical Carousel */}
      {isModalOpen && (
        <div 
          className="moments-modal"
          onClick={handleCloseModal}
          onWheel={handleScroll}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={handleCloseModal}>
              ×
            </button>
            
            <div className="carousel-container">
              {currentIndex > 0 && (
                <button className="carousel-nav-btn prev-btn" onClick={handlePrev}>
                  ↑
                </button>
              )}
              
              <div className="carousel-wrapper">
                <div 
                  className="carousel-track-vertical"
                  style={{ transform: `translateY(-${currentIndex * 100}%)` }}
                >
                  {filteredMoments.map((moment, index) => (
                    <div key={moment.id} className="carousel-slide">
                      <div className="embed-container">
                        <blockquote
                          className="instagram-media"
                          data-instgrm-captioned
                          data-instgrm-permalink={`${moment.url}?utm_source=ig_embed&utm_campaign=loading`}
                          data-instgrm-version="14"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {currentIndex < filteredMoments.length - 1 && (
                <button className="carousel-nav-btn next-btn" onClick={handleNext}>
                  ↓
                </button>
              )}
            </div>

            <div className="carousel-indicator">
              {currentIndex + 1} / {filteredMoments.length}
            </div>
          </div>
        </div>
      )}

      <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#ffd700', textAlign: 'center' }}>
        P.S. - This year I&apos;m adding &quot;making digital gifts for friends&quot; to the list. 
        You&apos;re welcome! 😉
      </p>
    </section>
  );
};

export default HolidayTraditions;

