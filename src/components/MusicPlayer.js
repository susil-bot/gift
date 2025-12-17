import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  // Cache busting - use file modification time or version number
  // Update this value when you change the audio file to force browser to reload
  const audioVersion = 'v1';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume
    audio.volume = 0.4;

    // Force reload audio to avoid cache issues
    audio.load();

    // Try to autoplay (may be blocked by browser)
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (error) {
        // Autoplay blocked - user needs to interact first
        console.log('Autoplay blocked, waiting for user interaction');
        setIsPlaying(false);
      }
    };

    // Try autoplay after a short delay to ensure audio is loaded
    const autoplayTimer = setTimeout(() => {
      tryAutoplay();
    }, 500);

    // Handle audio events
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    const handleError = (e) => {
      console.log('Audio file error:', e);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      // Try autoplay when audio is ready (only if not already playing)
      audioRef.current && !audioRef.current.paused && setIsPlaying(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      clearTimeout(autoplayTimer);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying && !isMuted) {
        // If playing and not muted, mute it
        audio.muted = true;
        setIsMuted(true);
      } else if (isPlaying && isMuted) {
        // If playing but muted, unmute it
        audio.muted = false;
        setIsMuted(false);
      } else {
        // If not playing, start playing
        audio.muted = false;
        setIsMuted(false);
        audio.load();
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error toggling music:', error);
    }
  };

  return (
    <div className="music-player-container">
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        volume={0.4}
      >
        <source src={`/audio/christmas-music.mp3?v=${audioVersion}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="music-controls">
        <button
          className={`music-toggle ${isPlaying ? 'playing' : ''}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (isMuted ? '🔇' : '🔊') : '🔇'}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;

