import React, { useState, useEffect, useRef } from "react";
import { decryptContent } from "../utils/encryption";

// For a real app you would never keep secrets on the client.
// Here we store only a hash so the raw password is not plainly visible.
const PASSWORD_HASH =
  "3802b83cef02da4693a24f527b5164828d3a45824026d658b9205a4f692ffbe0";

// Encrypted content - sorry you cant see untill login || Overthinking effects
const ENCRYPTED_CONTENT = "coZXfGdkU3hnZVZ2XHuAdnBUeYBvUFZDVoNQc3pmRXReYE9abmVfPW9UYnReP0aCZ3pjh3A/eYNvdlGEe0J6XVZ7PYBWe199cVSFeVZ3fHZhP4F1cmCEdGI/RXRgVGOGZ2Bxh1ZVX3xnYE9iblR5gmeGQYJZdlGEe0J2U1Z2hHZvZFN9b3ZWQ3KGV31ve1+Gb4ZWQ1Z4dXlyYE9ucWR1dVZgUYR7QlRZVnaEdnFUY0FxUVJ2XHZXYW+GQYJZdk+GZ2Q+eW9kV3lwdk9AblRjglZSeHRwP1N9Z1BPV1c/XnRnP2M9VlV5g3FgT4dvPz55cVR1fW96cHRmZD51cnp5gmeHRXRjP2OAb1CEdGBgT4FuZHF8cVBPfGZlZ3lWVHGDcVVfeW92T3VWVFd9cVBPd2ZlV4ZuZGN4VlRTQGZleIJWUnmCcEBfeWZkXnRvP2Z0bntjh3FQT3tnZV89bmRCe1ZVeYNxYE89blRTPVZTWz1mZEKAZ2V4dHFVY4FmeoV5cHZPQm9AYnRxP1OCcVRjeFZQdUBuVHl3blBPQm9AYnRxVEY9ZmSFgHJgT3hnZVt5cHtneVlQT3ZyYE89blRidHE/U0JWYHiAVlJ4dGdkQnhnZF50cWVOdGZ7Y31vVF99b3pwdHJkRj5WVV98bmVadHE/dYNvVGJ0cT9jdnA/eT1nYEF0Xj+FdXBAW31mhk+BZ2CEdHB6eXtuVV48Vl1Qc3pWYnZZUFc9Z2V1PVp2VkNWeHh0Zj9TglZUU4BwemN1Z1V4dG5UY3Vwdk9Cb0BiQ1ZThHZjP3V5cHpie3CGT4FyYE9hcVRTgm9UY0Jdhk9lblRjhmdgcYdWVD5CVlR1QmdVV3VxVHmDb3ZPe2ZkPnldPoR2VlJTgmdQT3xvP0J5cEBfgHJhRXRkZEY+V0BXeVZUU3ZwP0aAcWVfeW9VeHRwenl7blVedHFURXRmZVt/VmBPV1ZUgYJvQHCAVlJ4dG4/QoNxhkGCWXZRhHtCdlBWez2AVnpjQXBUhXVvelM9bmRGglZ3fURWe199cVSFeVZ3fHZFVzhcf4ZPVmdlV3lXQFp0Yz91dXFQT09mQF8+ZmSFgHJgT1ZmZU+EZ2RCeWdRfHZZUFc9Z2V1PVpgVkNWeHh0cT9TgnFUY3hWVV+DVlRxfXF6YnRyZEY+VlVbg29kYz1uVHmCZ4ZPPW5UUz1WVGd5b1VedHBAT3lmP3l1b1CEdGR7Y3xmYEF0Yj9GgWdlX3xuZEJ7VlVffGZlXnRmZFs9cWRTgG9VeHRvZGN1b3tedHA/RoFnZV98bmRCe1lQT0JvQGJ0bj9Cg3GHRXRiP0V0bmRCh3FUY3VnUE+DZ3ZPfnFlWz1WVFc+cmR5gmeGT3VWVV8+b2RXgGdlVnRYVXF8bmRbfFZSeHRwQF99b1SEdG9keXtuVV50Z1RFgFZUX4NvdnE9VlVxg3B7V0JWYHiAVlJ4dHFUdYNxZHF8cVBBgll2T0BuVXh0b3pGPVZUW4ZnZFM9Z2BPh28/PnlxVHV9b3pwdHFkQn1wZWN5XYZPYW8/PnlxVHV9b3pwdHFUdXVxUE+HblRGQHCGT1dWVFN3cVVjdW9UhUJWVU8+cVBPPW5URj5nP3U9VlR5gnFURXRuZV6CVnaEdnFUY0FxUVZ2XHZXUGdkW3VxZVt5VlR1eXB6Yntwhk89blRidHFUdX1venN2dFdfQm9AYntwemJ0b3pGPVZUfT5wQF50ZmRCQm8/QnlZdk9nb0Bie3B6YnRke2N8ZmCEdGZkQnhWVXmDcWBPeGdlW3lwe2d5VlQ+g3B6YnRxVHV1b3ZPfnFlWz1WVFJ0cHpje3FkhXVwdk97bmRnPVl2T2Fvhk9XVlVbhGdkQj1WVXF1cmBPPW8/RXRvZWN3blBPPW5kPnlWVFuDZ1R5gmeGTz1uVHmHVlR5gnBAX3lmZF50bz9mdGdURn1venB0cD9GgWdlX3xuZEJ7VlVbeW97W31meoV5WXZPUHFlXnRuVGNCWVBPdXFQT4BnZFOHcVBPfXFQcYdWVF99Z3pneXB6Y4JxUFJ0QX2GfFZ7PYBWe0+Gbz8+fXA/YnZce4B2cVR5PW9UYnZcdlmEe0JYcVZTX3xnYE9icHtjPW5RfHZZUFc9Z2V1PVpgVkNWeV98bmVadHE/dYNvVGJ0cT9jdnA/eT1nYUV0YGVee3CGT3ZmZVt9Zj9TgG9VeHRvZXh0cT9TQlZURnpWVVt1cmR5gmeGT3BWeXmDcWBxhmdgT3VxP2OHbz8+eWVQVnRuZEF0cVR1eVZUPoNwQF50Z2V1PXB6UnRxP1NCVlVPg3BAW31meoV5WXZPV1ZUgYJvQHB0bmVee3CGT4JvQF50ZmBPYXFUU4JvVGNCVlVfPm9kV4BnZVaAVlRXPnFQT1dWVHWDcFRidG5lXnRmZV50b1RjdXBAXnRvZFN/Z2VadHJkRj5WVVuBbmSFeVZgUYR7QUNPVnaEdnFUY0FxUVZ2XHZXXll5WoJWUD10X1RGgldAXnRxP0aGcHt4gFZVX3xnYE9hcVRTgm9UY0JWVV8+b2RXgGdlVnRuZVp0cEBffW9UhHRvP0F0b2V4dG9UeYdxUFJ0Y1R1fXCGT31whk9+cWVbPVZUPnlWVFd5bmRCe1l2QYJWVXF5b1SEgFZUPnlZdk9RcHpjdXFUeT9nYIR0b0BneXB7X3xuZEJ/bmRCe1lQT3Vvel50cFVXg2Z6U3ZvVXh0ZmBPgG5lXz1vVGJ0Znp5PVZVW4Nwe1dCVlRng3B2T4JvQF50bntjh3FQT3ZxZXl9b3pwdHFUdXlWVV8+b2RXgGdlVnRuZEF0cVR1eVZUZ31we1s9VlVPgGZkW3lZdk9QcWVedGZkhYdvhk9/bmRCeFZURnpWVU+Gb0BjeFZURnpWVV98bmVaPFZdUHN6Vnh2c2CEdnBUhXVvdlZDcoZXPW5lX4BnYFZDVoNQc3lEf4OCVkV0YT+BdXJghHRiP0V0YFRjhmdgcYdWVV98Z2BPXm9UU4JZdkGCVlB1XXB2T2FuVEY+b1RedGBgT2FmZXiAVlJ1eXB6Yntwhk9lblRTPVZTY4dxZFOAb1V4dGBUU4RwVGOCcIZ4dEVXOGZ0dlaAVntfeXJVXoVWd3x2Yj9FdHJkY3VuUIR0cFSFdW97WnRmZVd5VlRGP2dlV4ZmZV95Z1BPdW97eUBmZXiAVlVXfWc/dT1dhk9QcWVedG5UY4ZnYHGHVlVxfGZlXnRgYHGBVlVxg296X3lwenmCZzhYTnlUeXpWVXmDcWBxhmdgT3xnZVd5WVBPQG5VeHRmP1OCV0BedHJkRj5WVH2DbmRBdHFlWnRuZEF0YD2APFZSZ3lnZIR0cVR1eVZTW4NxZV98VmBRhHtBhj1WdoR2cVRjQXFRVnZcdldXVlQ+eWZkQYBWVXF5Vz9edG9URj9nYE89b4ZPfGZlZ3lWVXmDcWBPPW5UY4ZnYFJ0YGVee3CGT3tvP3mCZ4ZPPW+GT3ZnYE91b2RTQ25kQntZUE91b3pedG5URoJnZVs9b1V4gFZUeT1WVH0+cEBedHE/RoJXQF50ZnpidHFUdXlWVVt1b2RidHE/eT1uVEY+cVBPQm9AYoJWU1uDWXZBglZVcXxmZV57cIZPf2dkY4RuZEJ7VlV5g3FhRXRFVzhfdFBWgFZ6QoNxVGJ2XHZXXG+GT4RwemOHcEBjhmdghHRvP2Z0Zj9GPnB7W3lWYE9QcWVedHA/Y4ZuZEY+cD+FQllQTz1uVHmCboZPdWZ6Rj5xUE99cVBBdGA9gHRuZVp0Zj9TgG9UeYJnhlJ0RVc4XXmCOEF3OFhwflBXRllQV3dvVEaHbmRCe1Z3fURWe195clVedlx2V2Fvhk9CZ2RTfFlQT1dWVHWDcFRidHFUdX1whk+BZmSBeXCGT0JvQGJ0cD8+fW9UYoBWU30+blRSdVZTeYNxYE94Z2VbeXB7Z3lWVGM/Z2VXQnFUdX1venN2dFdfdW9UhHRxVHV5VlNbPWZkQoBnZXh0cVVjgWZ6hXlwe1qAVlRTgG9QTz1uVGJ0ZkBXeWZlX31xemJ0Zz95enFVWoBWVFOAb1BPg2d2T31xUFJ0RVc4eX1cWHB+UFaAVntbfWc/QnVxVWOGZ2BWQ1aCWE55UE9nb0BjhlZQdXhnZGd9b3p5PWdkhUJWVEY/Z2VXPW5UeYJuP3mCZ4ZPdnFlXnRxP2OAb1A+gWdkU4JuZEJ7WGBPXWd6Z31mP2J0X3tXfWdkQnhWXVBzd3xidnNghHZmP0aCcVRTd3FQVkNyhleAbmRCf2dkX31vdlZDVnp1PXFVT4dcdkWDcUBxQFl6hX1veoF5Z1R5gll6W4NvYEZ9b3ZGh28/V3xmZEJ1WWVbPnA/eYBZhlaAVnp5gnBAX3VnQFd1b2BWQ1Z6dT1xVU+HXHZFg3FAcUBZenmCcEBfdWdAV3VvYEJ3bz89g2ZkU4duVHl3ZUBbPnA/eYBZhldGc15KSg=="; 

const LockedSection = () => {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState({ type: "info", message: "" });
  const [checking, setChecking] = useState(false);
  const [decryptedContent, setDecryptedContent] = useState(null);
  const sectionRef = useRef(null);

  const hashString = async (value) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) {
      setStatus({ type: "error", message: "Please enter the festive password." });
      return;
    }

    setChecking(true);
    const hashed = await hashString(input.trim());
    const isValid = hashed === PASSWORD_HASH;

    if (isValid) {
      // Decrypt content only when password is correct
      try {
        const content = decryptContent(ENCRYPTED_CONTENT);
        if (content && typeof content === 'object') {
          setDecryptedContent(content);
          setUnlocked(true);
          setStatus({
            type: "success",
            message: "Unlocked! Enjoy your hidden present. 🎁",
          });
        } else {
          console.error('Decryption failed: Invalid content structure');
          setStatus({
            type: "error",
            message: "Failed to decrypt content. Please refresh and try again.",
          });
        }
      } catch (error) {
        console.error('Decryption error:', error);
        setStatus({
          type: "error",
          message: "Failed to decrypt content. Please refresh and try again.",
        });
      }
    } else {
      setUnlocked(false);
      setStatus({
        type: "error",
        message: "try to be SINGLE LoL 😂",
      });
    }
    setChecking(false);
  };

  // Reset unlocked state when user navigates away from this section
  useEffect(() => {
    if (!sectionRef.current) return;

    const resetLock = () => {
      if (unlocked) {
        setUnlocked(false);
        setDecryptedContent(null);
        setInput("");
        setStatus({ type: "info", message: "" });
      }
    };

    // Use Intersection Observer to detect when section is out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If section is not visible (user scrolled away), reset the unlocked state
          if (!entry.isIntersecting && unlocked) {
            resetLock();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when less than 10% of section is visible
        rootMargin: "-20% 0% -20% 0%", // Only trigger when section is significantly out of view
      }
    );

    observer.observe(sectionRef.current);

    // Also listen to hash changes to reset when navigating away via URL
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash !== 'locked' && unlocked) {
        resetLock();
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [unlocked]);

  return (
    <section ref={sectionRef} className="locked" data-section="locked" id="locked">
      {!unlocked && (
        <>
          <div className="pill">🎁 Your Special Gift Awaits 🎁</div>
          <h2>You Made It to the End, Zuha! 🎄</h2>
          <p className="locked-intro">
            There&apos;s something special waiting just for you...
            <br />
            <span className="mystery-text">What could it be? 🤔</span>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="password"
              placeholder="you are the password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              disabled={checking}
            />
            <button type="submit" disabled={checking}>
              {checking ? "Checking..." : "Unlock"}
            </button>
          </form>

          {status.message ? (
            <div className={`status ${status.type}`}>{status.message}</div>
          ) : (
            <div className="status hint-status">
              💡 Psst... it&apos;s simpler than you think!  Your are the code! 😊
            </div>
          )}
        </>
      )}

      {unlocked && decryptedContent && (
        <div className="hidden-content">
          <div className="apology-header">
            <div className="pill">{decryptedContent.header.pill}</div>
          </div>

          <h3 className="apology-title">{decryptedContent.title}</h3>

          <div className="apology-main">
            <p className="apology-intro">{decryptedContent.main.intro}</p>
            <p className="apology-text">{decryptedContent.main.text1}</p>
            <p className="apology-text">{decryptedContent.main.text2}</p>
          </div>

          <div className="explanation-box">
            <h4>{decryptedContent.explanation.title}</h4>
            <p>{decryptedContent.explanation.text1}</p>
            <p>{decryptedContent.explanation.text2}</p>
          </div>

          <div className="promise-box">
            <h4>{decryptedContent.promise.title}</h4>
            <p>{decryptedContent.promise.text1}</p>
            <p className="stanley-note">{decryptedContent.promise.text2}</p>
          </div>

          <div className="plan-question-box">
            <h4>{decryptedContent.plan.title}</h4>
            <p>{decryptedContent.plan.text1}</p>
            <p>{decryptedContent.plan.text2}</p>
            <p className="plan-note">{decryptedContent.plan.note}</p>
          </div>

          <div className="apology-closing">
            <p className="closing-text">{decryptedContent.closing.text}</p>
            <p className="signature">{decryptedContent.closing.signature}</p>
          </div>

          <div className="contact-info">
            <div className="contact-divider"></div>
            <p className="contact-label">Connect with me:</p>
            <div className="contact-links">
              <a 
                href={decryptedContent.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link linkedin-link"
              >
                <div className="contact-icon-wrapper">
                  <img 
                    src="/assets/in-img.jpeg" 
                    alt="LinkedIn" 
                    className="contact-icon"
                  />
                </div>
                <span className="contact-text">LinkedIn</span>
              </a>
              <a 
                href={decryptedContent.contact.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link instagram-link"
              >
                <div className="contact-icon-wrapper">
                  <img 
                    src="/assets/ig-img.jpeg" 
                    alt="Instagram" 
                    className="contact-icon"
                  />
                </div>
                <span className="contact-text">Instagram</span>
              </a>
            </div>
          </div>

          <div className="emoji-rain">
            <span>🥤</span>
            <span>💧</span>
            <span>🎁</span>
            <span>✨</span>
            <span>😊</span>
            <span>🎄</span>
            <span>💫</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default LockedSection;

