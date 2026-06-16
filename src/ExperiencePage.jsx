import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgVideo from "./assets/Additions/chill_in_the_rain.mp4";

const EXPERIENCES = [
  {
    id: "firellama",
    role: "AI/ML Engineering Intern",
    company: "FireLLama Technology Pvt Ltd",
    date: "Dec 2025 – Mar 2026",
    station: "FIRELLAMA",
    lineColor: "#c4001a", // Persona Red
    achievements: [
      "Built real-time MobileNetV2 image classification system for edge devices",
      "Optimized architecture using depthwise convolutions, reducing parameters by 70%",
      "Implemented TensorFlow data pipelines, cutting inference latency by 45ms"
    ]
  },
  {
    id: "alins",
    role: "UI/UX & Frontend Designer Intern",
    company: "ALINS Group (Remote)",
    date: "Oct 2024 – Jan 2025",
    station: "ALINS GRP",
    lineColor: "#9cf7ff", // Cyan
    achievements: [
      "Designed wireframes, logos, and interactive prototypes for web platforms",
      "Received Letter of Endorsement for quality and timely delivery"
    ]
  },
  {
    id: "freelance",
    role: "Freelance Developer",
    company: "Self-Employed",
    date: "Mar 2024 – Present",
    station: "FREELANCE",
    lineColor: "#f6b300", // Yellow
    achievements: [
      "Designed and deployed CRAG (Corrective Retrieval-Augmented Generation) systems",
      "Designed modern, interactive websites using Figma and React"
    ]
  }
];

export default function ExperiencePage() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setActive(i => Math.max(0, i - 1));
        window.playPersonaSound?.('hover');
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setActive(i => Math.min(EXPERIENCES.length - 1, i + 1));
        window.playPersonaSound?.('hover');
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active]);

  const current = EXPERIENCES[active];

  return (
    <div id="menu-screen">
      {/* Background Video */}
      <LoopingVideo src={bgVideo} opacity={0.6} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

        .exp-mask {
          position: absolute; inset: 0; z-index: 10;
          pointer-events: none;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.85) 100%);
        }

        .exp-layout {
          position: absolute; inset: 0; z-index: 20;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 60px;
          pointer-events: none;
        }

        /* Title Top Left */
        .exp-header {
          display: flex; flex-direction: column;
        }
        .exp-title {
          font-family: 'Anton', sans-serif; font-size: 80px; color: #fff;
          letter-spacing: 2px; line-height: 0.85; text-transform: uppercase;
          opacity: 0; transform: translateY(-30px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
        }
        .exp-title.mounted { opacity: 1; transform: translateY(0); }
        .exp-title span { color: #c4001a; }
        
        .exp-subtitle {
          font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: #9cf7ff;
          letter-spacing: 6px; margin-top: 10px;
          opacity: 0; transition: opacity 0.5s ease 0.4s;
        }
        .exp-subtitle.mounted { opacity: 1; }

        /* Middle Transit Map (Timeline) */
        .exp-transit-map {
          display: flex; align-items: center; justify-content: center;
          gap: 60px; margin-top: 40px; pointer-events: all;
          opacity: 0; transform: scale(0.95);
          transition: opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s;
        }
        .exp-transit-map.mounted { opacity: 1; transform: scale(1); }

        .exp-station {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          cursor: pointer; position: relative;
        }
        .exp-station::after {
          content: ''; position: absolute; top: 12px; left: 100%;
          width: 60px; height: 4px; background: rgba(255,255,255,0.2);
          z-index: 1;
        }
        .exp-station:last-child::after { display: none; }
        
        .exp-station.active::after {
          background: ${current.lineColor};
          box-shadow: 0 0 10px ${current.lineColor};
        }

        .exp-node {
          width: 28px; height: 28px; border-radius: 50%;
          background: #111; border: 4px solid rgba(255,255,255,0.4);
          z-index: 2; transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .exp-station.active .exp-node {
          border-color: ${current.lineColor}; background: ${current.lineColor};
          transform: scale(1.4); box-shadow: 0 0 20px ${current.lineColor};
        }

        .exp-station-title {
          font-family: 'Anton', sans-serif; font-size: 40px; color: rgba(255,255,255,0.7);
          transition: color 0.3s ease, transform 0.3s ease; letter-spacing: 2px;
          text-transform: uppercase; white-space: nowrap;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.9);
        }
        .exp-station-role {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: rgba(255,255,255,0.5);
          transition: color 0.3s ease; letter-spacing: 2px; white-space: nowrap;
          margin-top: -12px;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.9);
        }
        .exp-station.active .exp-station-title { color: #fff; transform: scale(1.15); }
        .exp-station.active .exp-station-role { color: #fff; text-shadow: 0 0 10px ${current.lineColor}, 2px 2px 0px rgba(0,0,0,0.9); }

        /* Bottom Details Panel */
        .exp-details-panel {
          align-self: flex-end; width: 100%; max-width: 800px;
          background: rgba(10, 10, 10, 0.85); border-left: 6px solid ${current.lineColor};
          padding: 30px 40px; clip-path: polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
          backdrop-filter: blur(10px);
          animation: exp-panel-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes exp-panel-in {
          0% { opacity: 0; transform: translateX(40px) skewX(-5deg); }
          100% { opacity: 1; transform: translateX(0) skewX(0); }
        }

        .exp-role {
          font-family: 'Anton', sans-serif; font-size: 60px; color: #fff;
          letter-spacing: 1px; line-height: 1; margin-bottom: 8px;
          text-transform: uppercase; text-shadow: 3px 3px 0px rgba(0,0,0,0.9);
        }
        .exp-company {
          font-family: 'Bebas Neue', sans-serif; font-size: 34px; color: ${current.lineColor};
          letter-spacing: 3px; margin-bottom: 24px; text-shadow: 2px 2px 0px rgba(0,0,0,0.9);
        }
        .exp-date-badge {
          display: inline-block; padding: 6px 14px; background: rgba(255,255,255,0.1);
          font-family: 'Share Tech Mono', monospace; font-size: 18px; color: #fff;
          margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.3);
          text-shadow: 1px 1px 0px rgba(0,0,0,0.8);
        }
        
        .exp-achievements {
          display: flex; flex-direction: column; gap: 16px;
        }
        .exp-achieve-item {
          font-family: 'Share Tech Mono', monospace; font-size: 20px; color: rgba(255,255,255,0.95);
          line-height: 1.5; display: flex; align-items: flex-start; gap: 12px;
          text-shadow: 1px 1px 0px rgba(0,0,0,0.8);
        }
        .exp-achieve-item::before {
          content: '>'; color: ${current.lineColor}; font-weight: bold;
        }

        .exp-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column; align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif; z-index: 30;
          opacity: 0; transition: opacity 0.4s ease 0.6s;
        }
        .exp-footer.mounted { opacity: 1; }
        .exp-footer-row { display: flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: 2px; color: rgba(255,255,255,0.3); }
        .exp-footer-key { border: 1px solid rgba(255,255,255,0.2); border-radius: 3px; padding: 1px 5px; font-size: 10px; }
      `}</style>

      <div className="exp-mask" />
      
      <div className="exp-layout">
        <div className="exp-header">
          <div className={`exp-title${mounted ? " mounted" : ""}`}>
            JOURNEY <span>LOG</span>
          </div>
          <div className={`exp-subtitle${mounted ? " mounted" : ""}`}>
            — TRANSIT ROUTE —
          </div>
        </div>

        <div className={`exp-transit-map${mounted ? " mounted" : ""}`}>
          {EXPERIENCES.map((exp, i) => (
            <div 
              key={exp.id} 
              className={`exp-station${active === i ? " active" : ""}`}
              onClick={() => { setActive(i); window.playPersonaSound?.('select'); }}
              onMouseEnter={() => { if(active !== i) window.playPersonaSound?.('hover'); setActive(i); }}
            >
              <div className="exp-station-title">{exp.station}</div>
              <div className="exp-station-role">{exp.role}</div>
              <div className="exp-node" />
            </div>
          ))}
        </div>

        <div className="exp-details-panel" key={active}>
          <div className="exp-role">{current.role}</div>
          <div className="exp-company">{current.company}</div>
          <div className="exp-date-badge">{current.date}</div>
          <div className="exp-achievements">
            {current.achievements.map((ach, idx) => (
              <div key={idx} className="exp-achieve-item">{ach}</div>
            ))}
          </div>
        </div>
      </div>

      <div className={`exp-footer${mounted ? " mounted" : ""}`}>
        <div className="exp-footer-row"><span className="exp-footer-key">←→</span><span>SWITCH LINE</span></div>
        <div className="exp-footer-row"><span className="exp-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
