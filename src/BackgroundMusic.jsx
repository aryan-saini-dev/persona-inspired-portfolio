import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Music2 } from 'lucide-react';
import gateSound from './assets/Click sounds/Gate sound.VAG.wav';
import linkOpenSound from './assets/Click sounds/Link open.VAG.wav';
import selectSound from './assets/Click sounds/Select something,VAG.wav';
import hoverSound from './assets/Click sounds/hover to something new.VAG.wav';
import beneathTheMask from './assets/music/Beneath the Mask.mp3';
import colorYourNight from './assets/music/Color Your Night.mp3';
import fullMoonFullLife from './assets/music/Full Moon Full Life.mp3';
import whenTheMoonsReachingOutStars from './assets/music/When The Moon\'s Reaching Out Stars.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showPopup, setShowPopup] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef(null);
  const location = useLocation();

  // Persona music tracks
  const musicTracks = [
    { name: "Beneath the Mask", url: beneathTheMask },
    { name: "Color Your Night", url: colorYourNight },
    { name: "Full Moon Full Life", url: fullMoonFullLife },
    { name: "When The Moon's Reaching Out Stars", url: whenTheMoonsReachingOutStars },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  // Sound effects refs
  const gateAudioRef = useRef(new Audio(gateSound));
  const linkOpenAudioRef = useRef(new Audio(linkOpenSound));
  const selectAudioRef = useRef(new Audio(selectSound));
  const hoverAudioRef = useRef(new Audio(hoverSound));

  // Initialize sound volumes
  useEffect(() => {
    gateAudioRef.current.volume = 0.5;
    linkOpenAudioRef.current.volume = 0.5;
    selectAudioRef.current.volume = 0.5;
    hoverAudioRef.current.volume = 0.3;
  }, []);

  // Play sound effect
  const playSound = (soundRef) => {
    try {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(err => console.log("Sound play failed:", err));
    } catch (err) {
      console.log("Sound error:", err);
    }
  };

  // Expose playSound to window for other components
  useEffect(() => {
    window.playPersonaSound = (type) => {
      switch(type) {
        case 'gate': playSound(gateAudioRef); break;
        case 'link': playSound(linkOpenAudioRef); break;
        case 'select': playSound(selectAudioRef); break;
        case 'hover': playSound(hoverAudioRef); break;
        default: break;
      }
    };
  }, []);

  // Detect route changes for gate sound
  useEffect(() => {
    if (location.pathname === '/socials') {
      playSound(gateAudioRef);
    }
  }, [location.pathname]);

  // Music prompt on first visit
  useEffect(() => {
    // FOR TESTING: Always show prompt
    setShowPrompt(true);
    // Automatically enable music by default as requested
    setIsPlaying(true);
    const hasVisited = localStorage.getItem('hasVisitedPersonaSite');
    if (!hasVisited) {
      // First time logic if needed
    }
  }, []);

  // Ensure audio plays when isPlaying is set to true by default
  useEffect(() => {
    if (isPlaying && audioRef.current && !showPrompt) {
      audioRef.current.play().catch(err => console.log("Auto-play blocked:", err));
    }
  }, [isPlaying, showPrompt]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = true;
    }
  }, [volume]);

  const toggleMusic = () => {
    playSound(selectAudioRef);
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(err => console.log("Audio play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeTrack = (index) => {
    playSound(hoverAudioRef);
    const audio = audioRef.current;
    if (audio) {
      const newIndex = (index + musicTracks.length) % musicTracks.length;
      setCurrentTrack(newIndex);
      audio.src = musicTracks[newIndex].url;
      if (isPlaying) {
        audio.play().catch(err => console.log("Audio play failed:", err));
      }
    }
  };

  const nextTrack = () => changeTrack(currentTrack + 1);
  const prevTrack = () => changeTrack(currentTrack - 1);

  const handleMusicPrompt = (enable) => {
    playSound(selectAudioRef);
    if (enable) {
      setIsPlaying(true);
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch(err => console.log("Audio play failed:", err));
      }
    }
    setShowPrompt(false);
    // REMOVED localStorage set for testing purposes as requested
    // localStorage.setItem('hasVisitedPersonaSite', 'true');
  };

  const togglePopup = () => {
    playSound(gateAudioRef);
    setShowPopup(!showPopup);
  };

  return (
    <>
      <audio ref={audioRef} src={musicTracks[currentTrack].url} />
      
      <style>{`
        .music-toggle-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 100;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #0066ff, #0044cc);
          border: 2px solid #00aaff;
          border-radius: 50%;
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 102, 255, 0.4);
          font-family: 'Bebas Neue', sans-serif;
        }

        .music-toggle-btn:hover {
          background: linear-gradient(135deg, #0088ff, #0066ff);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 102, 255, 0.6);
        }

        .music-toggle-btn:active {
          transform: scale(0.95);
        }

        .music-toggle-btn.playing {
          animation: pulse 2s infinite;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .equalizer {
          position: absolute;
          bottom: -8px;
          display: flex;
          gap: 2px;
          height: 10px;
          align-items: flex-end;
        }

        .equalizer .bar {
          width: 3px;
          background: #00aaff;
          border-radius: 1px;
        }

        .equalizer .bar:nth-child(1) { height: 4px; animation: eq 0.8s infinite ease-in-out; }
        .equalizer .bar:nth-child(2) { height: 8px; animation: eq 1.2s infinite ease-in-out; }
        .equalizer .bar:nth-child(3) { height: 6px; animation: eq 1s infinite ease-in-out; }

        @keyframes eq {
          0%, 100% { height: 4px; }
          50% { height: 10px; }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(0, 102, 255, 0.4); }
          50% { box-shadow: 0 4px 25px rgba(0, 102, 255, 0.8); }
        }

        .music-popup {
          position: fixed;
          top: 90px;
          right: 30px;
          z-index: 100;
          background: linear-gradient(165deg, rgba(0, 15, 50, 0.98), rgba(0, 45, 120, 0.98));
          border: 3px solid #00aaff;
          border-radius: 20px;
          padding: 24px;
          min-width: 300px;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 15px 50px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(0, 102, 255, 0.3);
          transform-origin: top right;
          animation: popupSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popupSlide {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .music-popup::before {
          content: '';
          position: absolute;
          top: -10px;
          right: 20px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #00aaff;
        }

        .music-title {
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          color: #ffffff;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: 1px;
          text-shadow: 0 2px 4px rgba(0, 102, 255, 0.5);
        }

        .music-controls-main {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .nav-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-btn:hover {
          color: #00aaff;
          transform: scale(1.1);
        }

        .play-pause-btn {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #0066ff, #0044cc);
          border: 2px solid #00aaff;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(0, 102, 255, 0.4);
        }

        .play-pause-btn:hover {
          background: linear-gradient(135deg, #0088ff, #0066ff);
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 102, 255, 0.6);
        }

        .play-pause-btn.active {
          background: linear-gradient(135deg, #00aaff, #0088ff);
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          background: rgba(255,255,255,0.05);
          padding: 10px 15px;
          border-radius: 10px;
        }

        .volume-icon {
          flex-shrink: 0;
        }

        .volume-slider {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          outline: none;
          -webkit-appearance: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #00aaff, #0066ff);
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 102, 255, 0.5);
        }

        .volume-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #00aaff, #0066ff);
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 102, 255, 0.5);
        }

        .track-selector {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .track-option {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          letter-spacing: 0.5px;
        }

        .track-option:hover {
          background: rgba(0, 102, 255, 0.3);
          color: white;
          border-color: rgba(0, 170, 255, 0.5);
        }

        .track-option.active {
          background: linear-gradient(135deg, rgba(0, 102, 255, 0.5), rgba(0, 68, 204, 0.5));
          color: white;
          border-color: #00aaff;
          box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);
        }

        .music-prompt-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .music-prompt {
          background: linear-gradient(135deg, rgba(0, 10, 40, 0.98), rgba(0, 30, 80, 0.98));
          border: 3px solid #00aaff;
          border-radius: 24px;
          padding: 60px;
          max-width: 500px;
          text-align: center;
          box-shadow: 
            0 0 0 1px rgba(0, 170, 255, 0.3),
            0 20px 60px rgba(0, 0, 0, 0.8),
            0 0 100px rgba(0, 102, 255, 0.2);
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .music-prompt::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 170, 255, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95) skewY(2deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1) skewY(0);
          }
        }

        .music-prompt-title {
          font-family: 'Anton', sans-serif;
          font-size: 32px;
          color: #ffffff;
          margin-bottom: 24px;
          text-shadow: 0 4px 8px rgba(0, 102, 255, 0.6);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .music-prompt-text {
          font-family: 'Anton', sans-serif;
          font-size: 84px;
          color: #ffffff;
          margin-bottom: 40px;
          line-height: 1;
          letter-spacing: 4px;
          text-shadow: 
            3px 3px 0 #0044cc,
            6px 6px 0 rgba(0, 0, 0, 0.5);
          font-style: italic;
        }

        .music-prompt-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .music-prompt-btn {
          background: linear-gradient(135deg, #0066ff, #0044cc);
          border: 2px solid #00aaff;
          border-radius: 8px;
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
          text-transform: uppercase;
          min-width: 100px;
        }

        .music-prompt-btn:hover {
          background: linear-gradient(135deg, #0088ff, #0066ff);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 102, 255, 0.5);
        }

        .music-prompt-btn:active {
          transform: translateY(0);
        }

        .music-prompt-btn.decline {
          background: linear-gradient(135deg, #666666, #444444);
          border-color: #888888;
        }

        .music-prompt-btn.decline:hover {
          background: linear-gradient(135deg, #777777, #555555);
        }

        @media (max-width: 768px) {
          .music-toggle-btn {
            top: 15px;
            right: 15px;
            width: 45px;
            height: 45px;
            font-size: 18px;
          }

          .music-popup {
            top: 70px;
            right: 15px;
            min-width: 220px;
            padding: 15px;
          }

          .music-title {
            font-size: 14px;
          }

          .music-btn {
            font-size: 10px;
            padding: 6px 10px;
          }

          .music-prompt {
            margin: 20px;
            padding: 30px 20px;
          }

          .music-prompt-title {
            font-size: 20px;
          }

          .music-prompt-text {
            font-size: 14px;
          }

          .music-prompt-buttons {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>

      {showPrompt && (
        <div className="music-prompt-overlay">
          <div className="music-prompt">
            <div className="music-prompt-title">🎵 Welcome to Aryan's Persona</div>
            <div className="music-prompt-text">
              Music?
            </div>
            <div className="music-prompt-buttons">
              <button 
                className="music-prompt-btn"
                onClick={() => handleMusicPrompt(true)}
                onMouseEnter={() => window.playPersonaSound?.('hover')}
              >
                Enable Music
              </button>
              <button 
                className="music-prompt-btn decline"
                onClick={() => handleMusicPrompt(false)}
                onMouseEnter={() => window.playPersonaSound?.('hover')}
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
        onClick={togglePopup}
        title="Music Controls"
      >
        {isPlaying ? (
          <div className="icon-wrapper">
            <Music2 size={24} color="#ffffff" />
            <div className="equalizer">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        ) : (
          <Music size={24} color="rgba(255,255,255,0.4)" />
        )}
      </button>

      {showPopup && (
        <div className="music-popup">
          <div className="music-title">🎵 PERSONA MUSIC</div>
          
          <div className="music-controls-main">
            <button className="nav-btn" onClick={prevTrack} onMouseEnter={() => window.playPersonaSound?.('hover')}>
              <SkipBack size={20} />
            </button>
            
            <button 
              className={`play-pause-btn ${isPlaying ? 'active' : ''}`}
              onClick={toggleMusic}
              onMouseEnter={() => window.playPersonaSound?.('hover')}
            >
              {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
            </button>

            <button className="nav-btn" onClick={nextTrack} onMouseEnter={() => window.playPersonaSound?.('hover')}>
              <SkipForward size={20} />
            </button>
          </div>

          <div className="volume-control">
            <Volume2 size={16} color="#ffffff" className="volume-icon" />
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>

          <div className="track-selector">
            {musicTracks.map((track, index) => (
              <div
                key={index}
                className={`track-option ${currentTrack === index ? 'active' : ''}`}
                onClick={() => changeTrack(index)}
                onMouseEnter={() => {
                  if (currentTrack !== index) window.playPersonaSound?.('hover');
                }}
              >
                {track.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
