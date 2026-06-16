import { useState, useRef, useEffect } from "react";

export default function IntroLoopVideo({ introSrc, loopSrc, opacity = 1 }) {
  const [playingIntro, setPlayingIntro] = useState(true);
  const introRef = useRef(null);
  const loopRef = useRef(null);

  useEffect(() => {
    // Force play on mount to handle browser autoplay policies
    if (playingIntro && introRef.current) {
      introRef.current.play().catch(e => console.log("Intro autoplay prevented:", e));
    }
  }, [playingIntro]);

  const handleIntroEnd = () => {
    setPlayingIntro(false);
  };

  useEffect(() => {
    if (!playingIntro && loopRef.current) {
      loopRef.current.play().catch(e => console.log("Loop autoplay prevented:", e));
    }
  }, [playingIntro]);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", opacity }}>
      {playingIntro ? (
        <video
          ref={introRef}
          src={introSrc}
          autoPlay
          muted
          playsInline
          onEnded={handleIntroEnd}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <video
          ref={loopRef}
          src={loopSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
}
