import React, { useEffect } from 'react';
import './ApologySection.css';

const ApologySection = () => {
  useEffect(() => {
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

    const elements = document.querySelectorAll('.apology-section .scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="apology-section">
      <div className="apology-container">
        <div className="apology-content">
          <div className="scroll-animate apology-header">
            <div className="pill">🙏 A Little Confession 🙏</div>
          </div>

          <h2 className="scroll-animate apology-title">
            Oops! My Bad... 😅
          </h2>

          <div className="scroll-animate apology-main">
            <p className="apology-intro">
              Hey Zuha! 👋
            </p>
            <p className="apology-text">
              So... remember that time I said I&apos;d get you something amazing? 
              Well, I may have gotten a *tiny* bit carried away with this digital 
              gift instead of, you know... an actual Stanley tumbler? 🥤
            </p>
            <p className="apology-text">
              I know, I know—you&apos;re probably thinking: &quot;Where&apos;s my 
              Stanley? Where&apos;s my hydration game?&quot; And honestly? 
              Fair point! 😂
            </p>
          </div>

          <div className="scroll-animate apology-explanation">
            <div className="explanation-box">
              <h3>🎯 The Real Story:</h3>
              <p>
                I wanted to give you something unique and personal, Zuha. 
                So instead of just buying a tumbler (which you totally deserve, 
                by the way!), I decided to code you this entire Christmas 
                experience. Because you&apos;re special, and regular gifts 
                are... well, regular! ✨
              </p>
            </div>
          </div>

          <div className="scroll-animate apology-promise">
            <div className="promise-box">
              <h3>💝 But Here&apos;s the Deal:</h3>
              <p>
                This digital gift is just the <strong>appetizer</strong>! 
                Consider this my way of saying &quot;Sorry for being extra&quot; 
                in the most extra way possible. 🎁
              </p>
              <p className="stanley-note">
                P.S. - The Stanley tumbler? That&apos;s still on my list. 
                This is just me being creative (and maybe a little bit sorry 
                for overthinking gifts). 😉
              </p>
            </div>
          </div>

          <div className="scroll-animate apology-closing">
            <p className="closing-text">
              So... sorry for the delay, but I hope this makes you smile! 
              You deserve all the Stanley tumblers in the world! 🥤✨
            </p>
            <p className="signature">
              — Your (slightly overthinking) Office Friend 🎅
            </p>
          </div>

          <div className="scroll-animate apology-emoji">
            <div className="emoji-rain">
              <span>🥤</span>
              <span>💧</span>
              <span>🎁</span>
              <span>✨</span>
              <span>😊</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApologySection;

