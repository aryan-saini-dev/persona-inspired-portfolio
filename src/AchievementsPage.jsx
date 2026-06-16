import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgVideo from "./assets/main2.mp4";
import bgGif from "./assets/Additions/slide1_persona.gif";

const CARDS = [
  {
    id: "hacknovate",
    numeral: "I",
    arcana: "THE CHAMPION",
    title: "HACKNOVATE 7.0",
    subtitle: "1st Place Winner",
    tag: "WINNER",
    tagColor: "#f6b300",
    date: "2025",
    level: 100,
    accentColor: "#f6b300",
    desc: "First place winner at the flagship AI hackathon Hacknovate 7.0. Built an AI Health Voice Agent with real-time conversational capabilities.",
    details: [
      { key: "EVENT",   val: "Hacknovate 7.0" },
      { key: "PLACE",   val: "1st Place" },
      { key: "BUILT",   val: "AI Voice Agent" },
      { key: "STACK",   val: "Python · Vapi · Gemini" },
    ],
  },
  {
    id: "sih",
    numeral: "II",
    arcana: "THE INNOVATOR",
    title: "SIH 2025",
    subtitle: "Smart India Hackathon",
    tag: "SHORTLISTED",
    tagColor: "#9cf7ff",
    date: "2025",
    level: 95,
    accentColor: "#9cf7ff",
    desc: "Internally shortlisted at Smart India Hackathon 2025 for Floatchat AI — a multi-modal RAG chatbot using LangGraph and OpenAI API.",
    details: [
      { key: "PROJECT",  val: "Floatchat AI" },
      { key: "TECH",     val: "Llama Index · React" },
      { key: "RESULT",   val: "Internally Shortlisted" },
      { key: "ROLE",     val: "Lead Developer" },
    ],
  },
  {
    id: "leetcode_air",
    numeral: "III",
    arcana: "THE EMPEROR",
    title: "LEETCODE AIR 3",
    subtitle: "Python Programming",
    tag: "GLOBAL RANK",
    tagColor: "#ff9900",
    date: "2024",
    level: 98,
    accentColor: "#ff9900",
    desc: "Achieved All India Rank (AIR) 3 globally in Python Programming on LeetCode. Demonstrated mastery over Python syntax, optimization, and advanced algorithms.",
    details: [
      { key: "PLATFORM", val: "LeetCode" },
      { key: "RANKING",  val: "AIR 3 Globally" },
      { key: "DOMAIN",   val: "Python Programming" },
      { key: "FOCUS",    val: "DSA & Optimization" },
    ],
  },
  {
    id: "firellama",
    numeral: "IV",
    arcana: "THE MAGICIAN",
    title: "FIRELLAMA LOR",
    subtitle: "Letter of Endorsement",
    tag: "RECOMMENDED",
    tagColor: "#ff6b6b",
    date: "2026",
    level: 92,
    accentColor: "#ff6b6b",
    desc: "Received a strong Letter of Endorsement and Recommendation from FireLLama Tech after successfully deploying the MobileNetV2 edge ML architecture.",
    details: [
      { key: "COMPANY",  val: "FireLLama Tech" },
      { key: "PROJECT",  val: "Edge ML Vision" },
      { key: "AWARD",    val: "Letter of Endorsement" },
      { key: "IMPACT",   val: "-70% Params, -45ms" },
    ],
  },
  {
    id: "leetcode_dsa",
    numeral: "V",
    arcana: "THE CHARIOT",
    title: "DSA GRIND",
    subtitle: "250+ Problems Solved",
    tag: "CONSISTENCY",
    tagColor: "#a78bfa",
    date: "2024",
    level: 88,
    accentColor: "#a78bfa",
    desc: "Consistent competitive programming grind. Solved over 250 data structures and algorithms problems across various difficulty levels.",
    details: [
      { key: "PLATFORM", val: "LeetCode & Others" },
      { key: "SOLVED",   val: "250+ Problems" },
      { key: "TOPICS",   val: "Graphs · DP · Trees" },
      { key: "STATUS",   val: "Actively Grinding" },
    ],
  },
  {
    id: "nptel",
    numeral: "VI",
    arcana: "THE HIEROPHANT",
    title: "NPTEL ELITE",
    subtitle: "IIT Verified Certs",
    tag: "ELITE",
    tagColor: "#c4001a",
    date: "2024",
    level: 85,
    accentColor: "#c4001a",
    desc: "Multiple NPTEL certifications from IIT professors via the National Programme on Technology Enhanced Learning. Top 5% scores.",
    details: [
      { key: "ISSUER",   val: "IIT via NPTEL" },
      { key: "SUBJECTS", val: "Python · DSA · Networks" },
      { key: "VERIFY",   val: "Govt. Issued" },
      { key: "SCORE",    val: "Elite / Top 5%" },
    ],
  },
];

export default function AchievementsPage() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [powerReady, setPowerReady] = useState(false);
  const navigate = useNavigate();

  const COLS = 2;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Trigger power bar animation when panel changes
  useEffect(() => {
    setPowerReady(false);
    const t = setTimeout(() => setPowerReady(true), 80);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        const n = active - 1;
        if (n >= 0) { setActive(n); window.playPersonaSound?.('hover'); }
        else navigate(-1);
      }
      if (e.key === "ArrowRight") {
        const n = active + 1;
        if (n < CARDS.length) { setActive(n); window.playPersonaSound?.('hover'); }
      }
      if (e.key === "ArrowUp") {
        const n = active - COLS;
        if (n >= 0) { setActive(n); window.playPersonaSound?.('hover'); }
      }
      if (e.key === "ArrowDown") {
        const n = active + COLS;
        if (n < CARDS.length) { setActive(n); window.playPersonaSound?.('hover'); }
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  const card = CARDS[active];

  return (
    <div id="menu-screen">
      <LoopingVideo src={bgVideo}  />

      {/* Slide1 GIF as right-side atmosphere */}
      <img
        src={bgGif} alt="" aria-hidden="true"
        style={{
          position: "absolute", right: 0, top: 0,
          height: "100vh", width: "auto",
          opacity: 0.07, zIndex: 1, pointerEvents: "none",
          objectFit: "cover", objectPosition: "top right",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300&display=swap');

        /* ── Circle reveal ── */
        .ach-entry {
          position: absolute; inset: 0; z-index: 9; overflow: hidden;
          background: transparent;
          clip-path: circle(0 at 50% 50%);
          animation: ach-reveal 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        @keyframes ach-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }

        /* ── Scanlines ── */
        .ach-scanlines {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }

        /* ── Stripes ── */
        .ach-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:30; }
        .ach-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(196,0,26,0.22); z-index:30; }

        /* ── Two-column layout ── */
        .ach-layout {
          position: absolute; inset: 0; z-index: 10;
          display: flex; pointer-events: none;
        }

        /* ── LEFT ── */
        .ach-left {
          flex: 0 0 55%;
          display: flex; flex-direction: column;
          padding: 24px 0 24px 36px;
        }

        .ach-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(48px, 6.5vw, 80px);
          color: #fff; letter-spacing: 2px; line-height: 0.88;
          margin-bottom: 3px;
          opacity: 0; transform: translateX(-28px);
          transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
        }
        .ach-title.mounted { opacity: 1; transform: translateX(0); }
        .ach-title-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px; letter-spacing: 5px; color: #c4001a;
          margin-bottom: 18px;
          opacity: 0; transition: opacity 0.4s ease 0.38s;
        }
        .ach-title-sub.mounted { opacity: 1; }

        /* Card grid */
        .ach-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px; flex: 1;
          align-content: start;
          pointer-events: all;
        }

        /* Arcana card */
        @keyframes ach-card-mount {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ach-card {
          position: relative; height: 110px; cursor: pointer;
          background: rgba(8,14,56,0.92);
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%);
          box-shadow: 0 5px 18px rgba(0,0,0,0.5),
                      inset 0 0 0 1px rgba(156,247,255,0.07);
          transition:
            transform 0.22s cubic-bezier(0.22,1,0.36,1),
            background 0.2s ease,
            box-shadow 0.2s ease;
          opacity: 0;
          overflow: hidden;
        }
        .ach-card.mounted {
          animation: ach-card-mount 0.42s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .ach-card.active {
          background: #fff;
          box-shadow: 7px 7px 0 #c4001a, inset 0 0 0 1px rgba(0,0,0,0.06);
          transform: translateY(-3px) translateX(2px);
        }
        .ach-card:hover:not(.active) {
          transform: translateY(-2px);
          box-shadow: 0 9px 24px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(156,247,255,0.16);
        }

        .ach-card-stripe {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
        }

        .ach-card-body {
          position: absolute; inset: 0;
          padding: 16px 14px 10px;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .ach-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .ach-card-numeral {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px; letter-spacing: 2px;
          color: rgba(156,247,255,0.3);
          transition: color 0.18s ease;
        }
        .ach-card.active .ach-card-numeral { color: rgba(0,0,0,0.28); }
        .ach-card-date {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px; letter-spacing: 1px;
          color: rgba(255,255,255,0.2);
          transition: color 0.18s ease;
        }
        .ach-card.active .ach-card-date { color: rgba(0,0,0,0.25); }

        .ach-card-title {
          font-family: 'Anton', sans-serif;
          font-size: 26px; letter-spacing: 1px; line-height: 0.9;
          color: #fff; transition: color 0.18s ease;
        }
        .ach-card.active .ach-card-title { color: #111; }
        .ach-card-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px; letter-spacing: 2px;
          color: rgba(255,255,255,0.35);
          transition: color 0.18s ease;
        }
        .ach-card.active .ach-card-subtitle { color: rgba(0,0,0,0.45); }

        .ach-card-bottom { display: flex; align-items: center; justify-content: space-between; }
        .ach-card-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 10px; letter-spacing: 2px;
          padding: 2px 7px; border: 1px solid;
          clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
          user-select: none;
        }

        /* Power bar at card bottom */
        .ach-card-power {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .ach-card-power-fill {
          height: 100%;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .ach-card.active .ach-card-power-fill { transform: scaleX(1); }

        /* ── RIGHT — detail panel ── */
        .ach-right {
          flex: 1;
          display: flex; align-items: center;
          padding: 24px 50px 24px 14px;
        }

        @keyframes ach-panel-in {
          0%   { opacity: 0; transform: translateX(32px); }
          60%  { opacity: 1; transform: translateX(-3px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .ach-panel {
          width: 100%;
          background: linear-gradient(180deg, rgba(15,28,105,0.4) 0%, rgba(8,16,68,0.45) 100%);
          backdrop-filter: blur(8px);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133,244,255,0.16), 14px 14px 0 rgba(0,6,30,0.55);
          padding: 20px;
          animation: ach-panel-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
          overflow: hidden; position: relative;
          pointer-events: all;
        }
        .ach-panel::before {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(135deg, rgba(133,244,255,0.07) 0 14%, transparent 14% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.04), transparent 22%);
          pointer-events: none;
        }

        /* Arcana label */
        .ach-panel-arcana {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px; letter-spacing: 5px;
          color: rgba(156,247,255,0.4); margin-bottom: 3px;
          position: relative; z-index: 1;
        }

        /* Panel header */
        .ach-panel-header {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 48px 1fr auto;
          align-items: center; gap: 12px;
          min-height: 70px; padding: 0 14px; margin-bottom: 12px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 13px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 8px 0 0 rgba(196,0,26,0.9);
        }
        .ach-panel-header-num {
          font-family: 'Anton', sans-serif; font-size: 32px; line-height: 1;
        }
        .ach-panel-header-title {
          font-family: 'Anton', sans-serif; font-size: 26px;
          line-height: 0.9; letter-spacing: 1px;
        }
        .ach-panel-header-year {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px; letter-spacing: 2px; line-height: 1;
        }

        /* Power bar */
        .ach-panel-power {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 12px;
        }
        .ach-panel-power-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 3px; color: #9cf7ff; flex-shrink: 0;
        }
        .ach-panel-power-track {
          flex: 1; height: 7px;
          background: rgba(156,247,255,0.1);
          clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
          overflow: hidden;
        }
        .ach-panel-power-fill {
          height: 100%; transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s;
        }
        .ach-panel-power-fill.ready { transform: scaleX(1); }
        .ach-panel-power-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 1px; color: #9cf7ff; flex-shrink: 0;
        }

        /* Detail rows */
        .ach-panel-rows {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; gap: 7px; margin-bottom: 12px;
        }
        .ach-panel-row {
          display: grid; grid-template-columns: 76px 1fr;
          gap: 10px; align-items: center; min-height: 40px; padding: 0 12px;
          background: rgba(8,18,72,0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 11px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140,239,255,0.09);
          transition: transform 0.13s ease;
        }
        .ach-panel-row:hover { transform: translateX(3px); }
        .ach-panel-row-key {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px; letter-spacing: 2px; color: rgba(156,247,255,0.38);
        }
        .ach-panel-row-val {
          font-family: 'Anton', sans-serif;
          font-size: 17px; line-height: 1; color: #edfaff;
        }

        /* Description */
        .ach-panel-desc {
          position: relative; z-index: 1;
          padding: 12px;
          background: rgba(5,13,57,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 13px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145,239,255,0.09);
          font-family: 'Montserrat', sans-serif;
          font-weight: 300; font-size: 12px; line-height: 1.6;
          color: rgba(200,240,255,0.72);
        }

        /* Footer */
        .ach-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 30; opacity: 0; transition: opacity 0.4s ease 0.55s;
        }
        .ach-footer.mounted { opacity: 1; }
        .ach-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .ach-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 5px; font-size: 10px;
        }
      `}</style>

      <div className="ach-entry" aria-hidden="true" />
      <div className="ach-scanlines" />
      <div className="ach-stripe" />
      <div className="ach-stripe2" />

      <div className="ach-layout">
        {/* ── LEFT ── */}
        <div className="ach-left">
          <div className={`ach-title${mounted ? " mounted" : ""}`}>
            ACHIEVE<br />MENTS
          </div>
          <div className={`ach-title-sub${mounted ? " mounted" : ""}`}>
            — COMPENDIUM · ←→↑↓ NAVIGATE —
          </div>

          <div className="ach-grid">
            {CARDS.map((c, i) => (
              <div
                key={c.id}
                className={`ach-card${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
                style={{ animationDelay: mounted ? `${i * 48}ms` : "0ms" }}
                onMouseEnter={() => { if (active !== i) window.playPersonaSound?.('hover'); setActive(i); }}
                onClick={() => { window.playPersonaSound?.('select'); setActive(i); }}
              >
                <div className="ach-card-stripe" style={{ background: c.accentColor }} />
                <div className="ach-card-body">
                  <div className="ach-card-top">
                    <div className="ach-card-numeral">ARCANA {c.numeral}</div>
                    <div className="ach-card-date">{c.date}</div>
                  </div>
                  <div>
                    <div className="ach-card-title">{c.title}</div>
                    <div className="ach-card-subtitle">{c.subtitle}</div>
                  </div>
                  <div className="ach-card-bottom">
                    <div
                      className="ach-card-tag"
                      style={{ color: c.tagColor, borderColor: c.tagColor }}
                    >
                      {c.tag}
                    </div>
                  </div>
                </div>
                <div className="ach-card-power">
                  <div
                    className="ach-card-power-fill"
                    style={{ background: c.accentColor, width: `${c.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="ach-right">
          <div className="ach-panel" key={active}>
            <div className="ach-panel-arcana">ARCANA · {card.arcana}</div>

            <div className="ach-panel-header">
              <div className="ach-panel-header-num">{card.numeral}</div>
              <div className="ach-panel-header-title">{card.title}</div>
              <div className="ach-panel-header-year">{card.date}</div>
            </div>

            <div className="ach-panel-power">
              <div className="ach-panel-power-label">POWER</div>
              <div className="ach-panel-power-track">
                <div
                  className={`ach-panel-power-fill${powerReady ? " ready" : ""}`}
                  style={{
                    background: `linear-gradient(90deg, ${card.accentColor} 0%, rgba(255,255,255,0.4) 100%)`,
                    width: `${card.level}%`,
                  }}
                />
              </div>
              <div className="ach-panel-power-num">{card.level}</div>
            </div>

            <div className="ach-panel-rows">
              {card.details.map(d => (
                <div className="ach-panel-row" key={d.key}>
                  <div className="ach-panel-row-key">{d.key}</div>
                  <div className="ach-panel-row-val">{d.val}</div>
                </div>
              ))}
            </div>

            <div className="ach-panel-desc">{card.desc}</div>
          </div>
        </div>
      </div>

      <div className={`ach-footer${mounted ? " mounted" : ""}`}>
        <div className="ach-footer-row"><span className="ach-footer-key">←→↑↓</span><span>NAVIGATE</span></div>
        <div className="ach-footer-row"><span className="ach-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
