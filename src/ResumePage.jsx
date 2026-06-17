import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgGif from "./assets/Additions/slide1_persona.gif";

const ITEMS = [
  { id: "i",   badge: "I",   title: "EDUCATION",   subtitle: "Academic Record",    rank: "A" },
  { id: "ii",  badge: "II",  title: "SKILLS",       subtitle: "Tech Arsenal",       rank: "S" },
  { id: "iii", badge: "III", title: "PROJECTS",     subtitle: "Featured Work",      rank: "S+" },
  { id: "iv",  badge: "IV",  title: "EXPERIENCE",   subtitle: "Work History",       rank: "A+" },
];

const EDUCATION_ROWS = [
  { index: "01", title: "B.Tech — Computer Science (AI)", status: "2023–2027" },
  { index: "02", title: "ABES Institute of Technology", status: "Ghaziabad" },
  { index: "03", title: "Senior Secondary — CBSE", status: "2023" },
  { index: "04", title: "Cambridge School Indirapuram", status: "Completed" },
];
const EDUCATION_BULLETS = [
  "B.Tech in Computer Science with AI Specialization",
  "AIR 3 Nationally in CBSE Board Exams (Python Programming)",
  "250+ LeetCode problems solved & 150+ day streak",
];

const SKILLS_ROWS = [
  { index: "01", title: "Frontend: React, Next.js, TypeScript", status: "Expert" },
  { index: "02", title: "AI/ML: LangChain, RAG, OpenAI, TF", status: "Advanced" },
  { index: "03", title: "Backend: Node.js, FastAPI, PostgreSQL", status: "Solid" },
  { index: "04", title: "Web3: Solidity, ethers.js, IPFS", status: "Skilled" },
];
const SKILLS_BULLETS = [
  "Also: Python, Docker, Git, Figma, Firebase",
  "Tools: Vite, Framer Motion, LlamaIndex",
  "Design: Tailwind, CSS Polygons, GSAP",
];

const PROJECTS_ROWS = [
  { index: "01", title: "AI Health Voice Agent — Hacknovate 7.0", status: "WINNER" },
  { index: "02", title: "Floatchat AI — Llama Index + MERN", status: "SIH 2025" },
  { index: "03", title: "Verichain — Solidity + LangGraph", status: "FINALIST" },
  { index: "04", title: "Self-Healing RAG — LangChain + VectorDB", status: "SHIPPED" },
];
const PROJECTS_BULLETS = [
  "5+ production-grade projects delivered",
  "Built apps generating millions in client revenue",
  "Full-stack + AI + Web3 expertise across all projects",
];

const EXPERIENCE_ROWS = [
  { index: "01", title: "AI/ML Intern — FireLLama Tech", status: "Dec'25–Mar'26" },
  { index: "02", title: "UI/UX & Frontend Intern — ALINS Group", status: "Oct'24–Jan'25" },
  { index: "03", title: "Freelance Developer — Self-Employed", status: "Mar'24–Now" },
  { index: "04", title: "Content Creator — 25K+ Instagram", status: "Ongoing" },
];
const EXPERIENCE_BULLETS = [
  "FireLLama: MobileNetV2 edge ML, 70% param reduction",
  "ALINS: Wireframes, prototypes, Letter of Endorsement",
  "Freelance: CRAG systems, React/Figma sites for clients",
];

const ALL_ROWS   = [EDUCATION_ROWS, SKILLS_ROWS, PROJECTS_ROWS, EXPERIENCE_ROWS];
const ALL_BULLETS = [EDUCATION_BULLETS, SKILLS_BULLETS, PROJECTS_BULLETS, EXPERIENCE_BULLETS];
const PANEL_HEADERS = [
  { idx: "01", title: "EDUCATION LOG",    prog: "2027" },
  { idx: "02", title: "SKILL MATRIX",     prog: "LVL 99" },
  { idx: "03", title: "PROJECT ARCHIVE",  prog: "10+" },
  { idx: "04", title: "BATTLE HISTORY",   prog: "2+ YRS" },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   { setActive(i => Math.max(0, i - 1)); window.playPersonaSound?.('hover'); }
      if (e.key === "ArrowDown") { setActive(i => Math.min(ITEMS.length - 1, i + 1)); window.playPersonaSound?.('hover'); }
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const rows    = ALL_ROWS[active];
  const bullets = ALL_BULLETS[active];
  const header  = PANEL_HEADERS[active];

  return (
    <div id="menu-screen">
      <LoopingVideo src={src} />

      {/* slide1_persona.gif — subtle full-height right overlay */}
      <img
        src={bgGif} alt="" aria-hidden="true"
        style={{
          position: "absolute", right: 0, top: 0,
          height: "100vh", width: "auto",
          opacity: 0.1, zIndex: 1, pointerEvents: "none",
          objectFit: "cover", objectPosition: "top right",
        }}
      />

      {/* Blue circle entry reveal */}
      <div className="resume-entry-mask" aria-hidden="true">
      {src && (
        <video 
          className="resume-entry-video" 
          src={src} 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ userSelect: "none" }}
          draggable={false}
        />
      )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400&display=swap');

        .resume-entry-mask {
          position: absolute; inset: 0; z-index: 9; overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        .resume-entry-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
        }
        @keyframes resume-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }

        /* Scanlines */
        .resume-scan {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }

        /* Side stripes */
        .resume-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:30; }
        .resume-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(196,0,26,0.22); z-index:30; }

        /* Layout: two columns */
        .resume-layout {
          position: absolute; inset: 0; z-index: 10;
          display: flex; pointer-events: none;
        }

        /* LEFT column */
        .resume-left {
          flex: 0 0 50%;
          display: flex; flex-direction: column;
          padding: 22px 0 22px 36px;
        }

        .resume-page-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(44px, 5.8vw, 72px);
          color: #fff; letter-spacing: 2px; line-height: 0.88;
          margin-bottom: 3px;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
        }
        .resume-page-title.mounted { opacity: 1; transform: translateX(0); }
        .resume-page-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 5px; color: #c4001a;
          margin-bottom: 20px;
          opacity: 0; transition: opacity 0.4s ease 0.35s;
        }
        .resume-page-sub.mounted { opacity: 1; }

        /* Cards */
        .resume-cards {
          display: flex; flex-direction: column; gap: 9px;
          pointer-events: all;
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0; transform: translateX(-48px);
          transition:
            opacity 0.38s ease,
            transform 0.38s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
        }
        .resume-card-wrap.mounted { opacity: 1; transform: translateX(0); }
        .resume-card-wrap:nth-child(1) { transition-delay: 0ms; }
        .resume-card-wrap:nth-child(2) { transition-delay: 55ms; }
        .resume-card-wrap:nth-child(3) { transition-delay: 110ms; }
        .resume-card-wrap:nth-child(4) { transition-delay: 165ms; }

        .resume-card {
          position: relative; min-height: 90px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 6px 0 rgba(5,13,59,0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
          padding-bottom: 36px;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 8px 7px 0 #c4001a;
          transform: translateX(5px);
        }

        .resume-card-inner {
          position: relative;
          padding: 10px 20px 10px 62px;
          display: flex; align-items: flex-start; justify-content: space-between;
        }

        /* Arcana badge (rotated panel left of card) */
        .resume-badge {
          position: absolute; top: 8px; left: -8px;
          width: 52px; height: 64px;
          background: #0b113d; border: 2px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 3px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
          z-index: 5;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px; color: #d2fdff; letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge { background: #000; border-color: #000; }
        .resume-card-wrap.active .resume-badge-text { color: #fff; }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 36px; line-height: 0.9; letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title { color: #000; }

        .resume-rank {
          display: flex; align-items: center; gap: 6px;
          margin-top: 2px; flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px; letter-spacing: 2px; color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 44px; line-height: 0.82; color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number { color: #000; }

        .resume-subtitle-bar {
          position: absolute; left: 60px; right: 12px; bottom: 10px; height: 28px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          display: flex; align-items: center; padding: 0 14px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar { background: #000; }
        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; line-height: 1; letter-spacing: 1px; color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle { color: #fff; }

        /* RIGHT column — detail panel */
        .resume-right {
          flex: 1;
          display: flex; align-items: center;
          padding: 22px 50px 22px 16px;
        }

        @keyframes resume-panel-in {
          0%   { opacity: 0; transform: translateX(32px); }
          60%  { opacity: 1; transform: translateX(-3px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .resume-panel {
          width: 100%;
          background: linear-gradient(180deg, rgba(15,28,105,0.97) 0%, rgba(8,16,68,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133,244,255,0.15), 14px 14px 0 rgba(0,6,30,0.55);
          padding: 18px;
          animation: resume-panel-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
          overflow: hidden; position: relative;
          pointer-events: all;
        }
        .resume-panel::before {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(135deg, rgba(133,244,255,0.07) 0 14%, transparent 14% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.04), transparent 22%);
          pointer-events: none;
        }

        .resume-panel-header {
          position: relative;
          display: grid; grid-template-columns: 52px 1fr auto;
          align-items: center; gap: 12px;
          min-height: 72px; padding: 0 14px; margin-bottom: 14px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 8px 0 0 rgba(255,94,136,0.9);
        }
        .resume-panel-header-idx {
          font-family: 'Anton', sans-serif; font-size: 36px; line-height: 1;
        }
        .resume-panel-header-title {
          font-family: 'Anton', sans-serif; font-size: 28px;
          line-height: 0.92; letter-spacing: 1px;
        }
        .resume-panel-header-prog {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px; letter-spacing: 2px; line-height: 1;
        }

        .resume-panel-rows {
          display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;
        }
        .resume-panel-row {
          display: grid; grid-template-columns: 40px 1fr auto;
          align-items: center; gap: 10px; min-height: 46px; padding: 0 12px;
          background: rgba(8,18,72,0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140,239,255,0.1);
          transition: transform 0.14s ease, background 0.14s ease;
        }
        .resume-panel-row:hover { transform: translateX(3px); background: rgba(12,26,94,1); }
        .resume-panel-row-idx {
          font-family: 'Bebas Neue', sans-serif; font-size: 20px;
          letter-spacing: 1px; color: #94f4ff;
        }
        .resume-panel-row-title {
          font-family: 'Anton', sans-serif; font-size: 18px; line-height: 1; color: #f2fcff;
        }
        .resume-panel-row-status {
          font-family: 'Bebas Neue', sans-serif; font-size: 14px; line-height: 1;
          letter-spacing: 1px; color: #06133b;
          background: #8df6ff; padding: 4px 8px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          white-space: nowrap;
        }

        .resume-panel-bottom {
          padding: 14px;
          background: rgba(5,13,57,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145,239,255,0.1);
        }
        .resume-panel-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 3px; color: rgba(156,247,255,0.5);
          margin-bottom: 10px;
        }
        .resume-panel-bullets {
          display: flex; flex-direction: column; gap: 7px;
        }
        .resume-panel-bullet {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300; font-size: 12px; line-height: 1.5;
          color: rgba(200,240,255,0.8);
        }
        .resume-panel-bullet::before {
          content: '▸ '; color: #c4001a;
        }

        /* Footer */
        .resume-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 30; opacity: 0; transition: opacity 0.4s ease 0.5s;
        }
        .resume-footer.mounted { opacity: 1; }
        .resume-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .resume-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 5px; font-size: 10px;
        }

        /* ── RESPONSIVE STYLES ── */
        @media (max-width: 900px) {
          .resume-layout {
            flex-direction: column;
            overflow-y: auto;
            pointer-events: auto;
            padding-bottom: 80px;
          }
          .resume-left {
            flex: 0 0 auto;
            width: 100%;
            padding: 60px 20px 10px 20px;
          }
          .resume-right {
            flex: 0 0 auto;
            width: 100%;
            padding: 10px 20px 20px 20px;
          }
          .resume-page-title {
            font-size: clamp(22px, 7vw, 32px);
          }
          .resume-card-wrap {
            transform: translateX(0); /* static on mobile */
          }
          .resume-badge-text { font-size: 18px; }
          .resume-title { font-size: 22px; }
          .resume-rank-label { font-size: 12px; }
          .resume-rank-number { font-size: 26px; }
          .resume-subtitle { font-size: 13px; }
          .resume-panel {
            animation: none; /* simple display on mobile */
          }
          .resume-panel-header-idx { font-size: 20px; }
          .resume-panel-header-title { font-size: 16px; }
          .resume-panel-header-prog { font-size: 18px; }
          .resume-panel-row-idx { font-size: 12px; }
          .resume-panel-row-title { font-size: 11px; }
          .resume-panel-row-status { font-size: 8px; }
          .resume-panel-bottom-title { font-size: 8px; }
          .resume-panel-bullet { font-size: 7px; }
          .resume-footer {
            display: none; /* Hide keyboard hints entirely on mobile */
          }
          .resume-stripe, .resume-stripe2 {
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

      <div className="resume-scan" />
      <div className="resume-stripe" />
      <div className="resume-stripe2" />

      <div className="resume-layout">
        {/* LEFT */}
        <div className="resume-left">
          <div className={`resume-page-title${mounted ? " mounted" : ""}`}>
            INTEL<br />FILES
          </div>
          <div className={`resume-page-sub${mounted ? " mounted" : ""}`}>
            — ARYAN SAINI · FULL-STACK + AI —
          </div>

          <div className="resume-cards">
            {ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={`resume-card-wrap${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
                onMouseEnter={() => { if (active !== i) window.playPersonaSound?.('hover'); setActive(i); }}
                onClick={() => { window.playPersonaSound?.('select'); setActive(i); }}
              >
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card">
                  <div className="resume-card-inner">
                    <div className="resume-title">{item.title}</div>
                    <div className="resume-rank">
                      <div className="resume-rank-label">RANK</div>
                      <div className="resume-rank-number">{item.rank}</div>
                    </div>
                  </div>
                  <div className="resume-subtitle-bar">
                    <div className="resume-subtitle">{item.subtitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — detail panel */}
        <div className="resume-right">
          <div className="resume-panel" key={active}>
            <div className="resume-panel-header">
              <div className="resume-panel-header-idx">{header.idx}</div>
              <div className="resume-panel-header-title">{header.title}</div>
              <div className="resume-panel-header-prog">{header.prog}</div>
            </div>

            <div className="resume-panel-rows">
              {rows.map(row => (
                <div className="resume-panel-row" key={row.index}>
                  <div className="resume-panel-row-idx">{row.index}</div>
                  <div className="resume-panel-row-title">{row.title}</div>
                  <div className="resume-panel-row-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-panel-bottom">
              <div className="resume-panel-bottom-title">KEY FACTS</div>
              <div className="resume-panel-bullets">
                {bullets.map((b, i) => (
                  <div className="resume-panel-bullet" key={i}>{b}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`resume-footer${mounted ? " mounted" : ""}`}>
        <div className="resume-footer-row"><span className="resume-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="resume-footer-row"><span className="resume-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
