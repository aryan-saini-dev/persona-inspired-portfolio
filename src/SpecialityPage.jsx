import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgVideo from "./assets/Additions/ann_in_rain.mp4"; // Using an existing video

import imgPython from "./assets/Speciality/academic_excellence_in_python.jpg";
import imgHackathon from "./assets/Speciality/hackathon_win.jpg";
import imgSih from "./assets/Speciality/sih_2025.jpg";
import imgVoice from "./assets/Speciality/voice_based_agents.jpg";

const SPECIALITIES = [
  {
    id: "python",
    badge: "I",
    title: "PYTHON EXCELLENCE",
    subtitle: "AIR 3 · CBSE BOARDS",
    status: "MASTERED",
    statusColor: "#ff9900",
    statusBg: "#1a0f00",
    image: imgPython,
    desc: "Achieved All India Rank 3 nationally in CBSE Board Exams for Python Programming, alongside solving 250+ problems with a 150+ day streak on LeetCode.",
  },
  {
    id: "hackathon",
    badge: "II",
    title: "HACKATHON CHAMP",
    subtitle: "1ST PLACE WINNER",
    status: "VICTORY",
    statusColor: "#f6b300",
    statusBg: "#1a1200",
    image: imgHackathon,
    desc: "Secured 1st place in the flagship Hacknovate 7.0 hackathon, leading a team to build cutting-edge AI solutions under pressure.",
  },
  {
    id: "sih",
    badge: "III",
    title: "SMART INDIA HACKATHON",
    subtitle: "INTERNALLY SHORTLISTED",
    status: "SELECTED",
    statusColor: "#9cf7ff",
    statusBg: "#0b113d",
    image: imgSih,
    desc: "Shortlisted internally for SIH 2025 with an innovative multi-modal RAG architecture chatbot to solve national-level problem statements.",
  },
  {
    id: "voice",
    badge: "IV",
    title: "VOICE AGENTS",
    subtitle: "REAL-TIME AI CONVERSATION",
    status: "DEPLOYED",
    statusColor: "#ff6b6b",
    statusBg: "#1a0404",
    image: imgVoice,
    desc: "Built and deployed sophisticated AI-powered voice agents utilizing Python, Vapi, and Gemini for sub-second conversational latency.",
  },
];

export default function SpecialityPage() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate              = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")    { setActive(i => Math.max(0, i - 1)); window.playPersonaSound?.('hover'); }
      if (e.key === "ArrowDown")  { setActive(i => Math.min(SPECIALITIES.length - 1, i + 1)); window.playPersonaSound?.('hover'); }
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  const spec = SPECIALITIES[active];

  return (
    <div id="menu-screen">
      {/* Background video horizontally flipped for aesthetics */}
      <LoopingVideo src={bgVideo} style={{ transform: "scaleX(-1)" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400&display=swap');

        /* ── Entry circle reveal ── */
        .spec-entry-mask {
          position: absolute; inset: 0; z-index: -1; overflow: hidden;
          background: #c4001a;
          clip-path: circle(0 at 50% 50%);
          animation: spec-entry-reveal 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        @keyframes spec-entry-reveal {
          0% { clip-path: circle(0 at 50% 50%); opacity: 1; }
          70% { clip-path: circle(150vmax at 50% 50%); opacity: 1; }
          100% { clip-path: circle(150vmax at 50% 50%); opacity: 0; }
        }

        /* ── Scanlines ── */
        .spec-scanlines {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }

        /* ── Stripes ── */
        .spec-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:30; }
        .spec-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(196,0,26,0.22); z-index:30; }

        /* ── Two-column layout ── */
        .spec-layout {
          position: absolute; inset: 0; z-index: 10;
          display: flex;
          pointer-events: none;
        }

        /* ── LEFT COLUMN ── */
        .spec-left {
          flex: 0 0 50%;
          display: flex; flex-direction: column;
          padding: 28px 0 28px 40px;
          gap: 0;
          justify-content: flex-end;
        }

        /* Page title */
        .spec-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(52px, 7vw, 88px);
          color: #fff; letter-spacing: 2px; line-height: 0.88;
          margin-bottom: 4px;
          opacity: 0; transform: translateX(-28px);
          transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
          pointer-events: none;
        }
        .spec-title.mounted { opacity: 1; transform: translateX(0); }
        .spec-title-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px; letter-spacing: 5px; color: #c4001a;
          margin-bottom: 20px;
          opacity: 0; transition: opacity 0.4s ease 0.38s;
        }
        .spec-title-sub.mounted { opacity: 1; }

        /* Bar list */
        .spec-bars {
          display: flex; flex-direction: column; gap: 8px;
          pointer-events: all;
        }

        .spec-bar-outer {
          position: relative; flex-shrink: 0;
          transform: translateX(-110%);
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
        }
        .spec-bar-outer.mounted { transform: translateX(0); }
        .spec-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .spec-bar-outer:nth-child(2) { transition-delay: 60ms; }
        .spec-bar-outer:nth-child(3) { transition-delay: 120ms; }
        .spec-bar-outer:nth-child(4) { transition-delay: 180ms; }

        /* Red underlay */
        .spec-bar-red {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-6px);
          opacity: 0; transition: opacity 0.2s ease, height 0.28s cubic-bezier(0.22,1,0.36,1);
          z-index: 0; pointer-events: none;
        }
        .spec-bar-outer.active .spec-bar-red { opacity: 1; height: 80px; }

        /* Main bar */
        .spec-bar {
          position: relative;
          width: 100%; height: 64px;
          background: #111;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          box-shadow: 0 6px 22px rgba(0,0,0,0.6);
          transition: height 0.28s cubic-bezier(0.22,1,0.36,1), background 0.2s ease;
          z-index: 1;
          overflow: hidden;
        }
        .spec-bar-outer.active .spec-bar { height: 80px; }

        /* White fill parallelogram */
        .spec-bar-fill {
          position: absolute; inset: 0;
          background: #fff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 28px) 100%, calc(100% - 28px) 100%);
          transition: clip-path 0.32s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }
        .spec-bar-outer.active .spec-bar-fill {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        /* Content inside bar */
        .spec-bar-content {
          position: relative; z-index: 2; height: 100%;
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center;
          padding: 0 16px 0 16px;
        }

        .spec-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px; line-height: 1;
          color: #fff; transform: rotate(-22deg);
          user-select: none; transition: color 0.18s ease;
          justify-self: center;
        }
        .spec-bar-outer.active .spec-badge { color: #111 !important; }

        .spec-bar-mid {
          display: flex; flex-direction: column;
          justify-content: center; gap: 1px;
          padding-left: 8px; overflow: hidden;
        }
        .spec-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; letter-spacing: 3px; line-height: 1;
          color: rgba(255,255,255,0.9); transition: color 0.18s ease;
          user-select: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .spec-bar-outer.active .spec-label { color: #111 !important; }
        .spec-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px; letter-spacing: 2px;
          color: rgba(255,255,255,0.35); transition: color 0.18s ease;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .spec-bar-outer.active .spec-sub { color: rgba(0,0,0,0.4) !important; }

        .spec-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px; letter-spacing: 2px;
          padding: 3px 9px; border: 1px solid;
          clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
          flex-shrink: 0; user-select: none;
          white-space: nowrap; margin-left: 8px;
        }

        /* ── RIGHT COLUMN — detail panel ── */
        .spec-right {
          flex: 1;
          display: flex; align-items: flex-end;
          padding: 28px 52px 28px 18px;
        }

        @keyframes spec-panel-in {
          0%   { opacity: 0; transform: translateX(36px); }
          60%  { opacity: 1; transform: translateX(-3px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .spec-panel {
          width: 100%;
          background: linear-gradient(180deg, rgba(15,28,105,0.4) 0%, rgba(8,16,68,0.45) 100%);
          backdrop-filter: blur(8px);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133,244,255,0.16), 14px 14px 0 rgba(0,6,30,0.55);
          padding: 20px;
          animation: spec-panel-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
          overflow: hidden; position: relative;
          pointer-events: all;
        }

        .spec-panel-img-wrapper {
          width: 100%;
          height: 350px;
          background: #000;
          margin-bottom: 20px;
          position: relative;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        .spec-panel-img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.9;
          transition: transform 0.4s ease;
        }
        .spec-panel-img-wrapper:hover .spec-panel-img {
          transform: scale(1.05);
          opacity: 1;
        }

        .spec-panel-header {
          display: grid; grid-template-columns: auto 1fr;
          align-items: center; gap: 12px;
          min-height: 50px; padding: 0 16px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 8px 0 0 rgba(196,0,26,0.9);
          margin-bottom: 14px;
        }
        .spec-panel-num {
          font-family: 'Anton', sans-serif; font-size: 26px; line-height: 1;
        }
        .spec-panel-title {
          font-family: 'Anton', sans-serif; font-size: 24px;
          line-height: 0.92; letter-spacing: 1px;
        }

        .spec-panel-desc {
          padding: 16px;
          background: rgba(5,13,57,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145,239,255,0.1);
          font-family: 'Montserrat', sans-serif;
          font-weight: 300; font-size: 15px; line-height: 1.6;
          color: rgba(200,240,255,0.8);
        }

        /* ── Footer ── */
        .spec-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 30; opacity: 0;
          transition: opacity 0.4s ease 0.55s;
        }
        .spec-footer.mounted { opacity: 1; }
        .spec-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .spec-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 5px; font-size: 10px;
        }

        /* ── RESPONSIVE STYLES ── */
        @media (max-width: 900px) {
          .spec-layout {
            flex-direction: column;
            overflow-y: auto;
            pointer-events: auto;
            padding-bottom: 80px;
          }
          .spec-left {
            flex: 0 0 auto;
            width: 100%;
            padding: 60px 10px 10px 10px;
          }
          .spec-right {
            flex: 0 0 auto;
            width: 100%;
            padding: 5px 10px 10px 10px;
          }
          .spec-title {
            font-size: clamp(22px, 8vw, 32px);
          }
          .spec-title-sub {
            font-size: 9px; margin-bottom: 8px;
          }
          .spec-badge {
            font-size: 20px;
          }
          .spec-label {
            font-size: 14px;
          }
          .spec-sub {
            font-size: 9px;
          }
          .spec-bar-outer {
            transform: translateX(0); /* static on mobile */
          }
          .spec-panel {
            animation: none; /* simple display on mobile */
            padding: 12px;
          }
          .spec-panel-num { font-size: 16px; }
          .spec-panel-title { font-size: 14px; line-height: 1.2; }
          .spec-panel-header { min-height: 40px; margin-bottom: 8px; }
          .spec-panel-img-wrapper { height: 140px; margin-bottom: 10px; }
          .spec-panel-desc { font-size: 12px; padding: 8px; line-height: 1.4; }

          /* Fix Selection Effect on Mobile */
          .spec-bar-outer.active .spec-bar-fill {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }

          .spec-footer {
            display: none; /* Hide keyboard hints entirely on mobile */
          }
          .spec-stripe, .spec-stripe2 {
            display: none;
          }
          .mobile-back-btn {
            display: flex;
            position: fixed;
            top: 15px;
            left: 15px; /* Moved to left to avoid music icon */
            z-index: 100;
            background: #c4001a;
            color: white;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 16px;
            padding: 6px 12px;
            border-radius: 4px;
            align-items: center;
            gap: 4px;
            box-shadow: 2px 2px 0 rgba(0,0,0,0.5);
            cursor: pointer;
          }
        }
      `}</style>

      <div 
        className="mobile-back-btn" 
        onClick={() => { window.playPersonaSound?.('cancel'); navigate('/'); }}
      >
        ◄ BACK
      </div>

      {/* Entry circle reveal */}
      <div className="spec-entry-mask" aria-hidden="true" />
      <div className="spec-scanlines" />
      <div className="spec-stripe" />
      <div className="spec-stripe2" />

      <div className="spec-layout">
        {/* ── LEFT ── */}
        <div className="spec-left">
          <div className={`spec-title${mounted ? " mounted" : ""}`}>
            SPECIALITY<br />GALLERY
          </div>
          <div className={`spec-title-sub${mounted ? " mounted" : ""}`}>
            — FEATURED EXPERTISE · ↵ EXPAND —
          </div>

          <div className="spec-bars">
            {SPECIALITIES.map((s, i) => (
              <div
                key={s.id}
                className={`spec-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
                onMouseEnter={() => { if (active !== i) window.playPersonaSound?.('hover'); setActive(i); }}
                onClick={() => { window.playPersonaSound?.('select'); setActive(i); }}
              >
                <div className="spec-bar-red" />
                <div className="spec-bar">
                  <div className="spec-bar-fill" />
                  <div className="spec-bar-content">
                    <div className="spec-badge">{s.badge}</div>
                    <div className="spec-bar-mid">
                      <div className="spec-label">{s.title}</div>
                      <div className="spec-sub">{s.subtitle}</div>
                    </div>
                    <div
                      className="spec-status"
                      style={{ color: s.statusColor, borderColor: s.statusColor, background: s.statusBg }}
                    >
                      {s.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="spec-right">
          <div className="spec-panel" key={active}>
            <div className="spec-panel-img-wrapper">
              <img src={spec.image} alt={spec.title} className="spec-panel-img" />
            </div>

            <div className="spec-panel-header">
              <div className="spec-panel-num">{spec.badge}</div>
              <div className="spec-panel-title">{spec.title}</div>
            </div>

            <div className="spec-panel-desc">{spec.desc}</div>
          </div>
        </div>
      </div>

      <div className={`spec-footer${mounted ? " mounted" : ""}`}>
        <div className="spec-footer-row"><span className="spec-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="spec-footer-row"><span className="spec-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
