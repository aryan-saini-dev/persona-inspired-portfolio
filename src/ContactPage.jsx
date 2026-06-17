import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgVideo from "./assets/main1.mp4";
import rainVideo from "./assets/Additions/chill_in_the_rain.mp4";
import aboutVideo from "./assets/Additions/About_me.mp4";

const CONTACTS = [
  {
    id: "email",
    badge: "I",
    label: "EMAIL",
    handle: "aryansaini2004feb@gmail.com",
    href: "mailto:aryansaini2004feb@gmail.com?subject=Hi%20Aryan,%20found%20you%20from%20your%20visiting%20page",
    icon: "✉",
    statusTag: "DIRECT",
    tagColor: "#c4001a",
    tagBg: "#1a0004",
    desc: "Fastest way to reach me. Available for freelance projects, collaborations, and full-time opportunities.",
    terminal: [
      { prompt: "FROM",   value: "aryan-saini-dev" },
      { prompt: "TO",     value: "you@domain.com" },
      { prompt: "SUBJ",   value: "Let's Build Something" },
      { prompt: "STATUS", value: "INBOX OPEN · REPLY <24H" },
    ],
  },
  {
    id: "linkedin",
    badge: "II",
    label: "LINKEDIN",
    handle: "aryan-saini-o9000",
    href: "https://linkedin.com/",
    icon: "🔗",
    statusTag: "500+ CON",
    tagColor: "#00a0dc",
    tagBg: "#00172a",
    desc: "Professional network. 500+ connections. Open to internships, collaborations, and tech discussions.",
    terminal: [
      { prompt: "NETWORK", value: "500+ Connections" },
      { prompt: "ROLE",    value: "Open to Opportunities" },
      { prompt: "EXP",     value: "Fullstack & AI" },
      { prompt: "STATUS",  value: "ACTIVELY SEEKING" },
    ],
  },
  {
    id: "phone",
    badge: "III",
    label: "PHONE / WA",
    handle: "+91 79824 04800",
    href: "https://wa.me/917982404800?text=Hi%20Aryan,%20found%20you%20from%20your%20visiting%20page",
    icon: "📡",
    statusTag: "WHATSAPP",
    tagColor: "#4ecdc4",
    tagBg: "#001a19",
    desc: "Direct call or WhatsApp. Best for urgent project discussions or collaboration pitches.",
    terminal: [
      { prompt: "DIAL",   value: "+91 79824 04800" },
      { prompt: "ZONE",   value: "IST · UTC+5:30" },
      { prompt: "HOURS",  value: "10:00 — 22:00" },
      { prompt: "STATUS", value: "AVAILABLE" },
    ],
  },
  {
    id: "github",
    badge: "IV",
    label: "GITHUB",
    handle: "aryan-saini-dev",
    href: "https://github.com/aryan-saini-dev",
    icon: "💻",
    statusTag: "DEV",
    tagColor: "#9cf7ff",
    tagBg: "#0b113d",
    desc: "Code repository. View my open-source contributions, AI experiments, and full-stack projects.",
    terminal: [
      { prompt: "PROFILE", value: "aryan-saini-dev" },
      { prompt: "FOCUS",   value: "AI · Web3 · React" },
      { prompt: "COMMITS", value: "High Activity" },
      { prompt: "STATUS",  value: "BUILDING" },
    ],
  },
  {
    id: "instagram",
    badge: "V",
    label: "INSTAGRAM",
    handle: "yaminokirito",
    href: "https://www.instagram.com/yaminokirito/",
    icon: "📸",
    statusTag: "25K+",
    tagColor: "#f6b300",
    tagBg: "#1a1200",
    desc: "Content creation and community building. Mentoring a community of 25,000+ followers.",
    terminal: [
      { prompt: "USER",    value: "@yaminokirito" },
      { prompt: "FOLLOW",  value: "25K+ Community" },
      { prompt: "CONTENT", value: "Tech · Dev · Mentorship" },
      { prompt: "STATUS",  value: "CREATING" },
    ],
  },
  {
    id: "leetcode",
    badge: "VI",
    label: "LEETCODE",
    handle: "aryan-saini-dev",
    href: "https://leetcode.com/u/aryan-saini-dev/",
    icon: "🧠",
    statusTag: "AIR 3",
    tagColor: "#ff9900",
    tagBg: "#1a0f00",
    desc: "Competitive programming and algorithm challenges. AIR 3 in Python Programming, 250+ problems solved.",
    terminal: [
      { prompt: "USER",    value: "aryan-saini-dev" },
      { prompt: "RANK",    value: "AIR 3 (Python)" },
      { prompt: "SOLVED",  value: "250+ Problems" },
      { prompt: "STATUS",  value: "GRINDING" },
    ],
  },
];

export default function ContactPage() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [blink, setBlink]     = useState(true);
  const navigate              = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setBlink(b => !b), 560);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   { setActive(i => Math.max(0, i - 1)); window.playPersonaSound?.('hover'); }
      if (e.key === "ArrowDown") { setActive(i => Math.min(CONTACTS.length - 1, i + 1)); window.playPersonaSound?.('hover'); }
      if (e.key === "Enter")     { window.open(CONTACTS[active].href, "_blank"); window.playPersonaSound?.('link'); }
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  const contact = CONTACTS[active];

  return (
    <div id="menu-screen">
      {/* Background video */}
      <LoopingVideo src={bgVideo} />

      {/* Atmospheric rain overlay */}
      <div style={{
        position: "absolute", left: 0, bottom: 0,
        height: "30vh", width: "100%",
        opacity: 0.15, zIndex: 1, pointerEvents: "none",
      }}>
        <LoopingVideo src={rainVideo} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

        /* ── Entry left-wipe ── */
        @keyframes cntct-wipe {
          0%   { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
        .cntct-entry {
          position: absolute; inset: 0; z-index: 9;
          background: transparent;
          animation: cntct-wipe 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
          pointer-events: none;
        }

        /* ── Scanlines ── */
        .cntct-scanlines {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px
          );
        }

        /* ── Stripes ── */
        .cntct-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:30; }
        .cntct-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(196,0,26,0.22); z-index:30; }

        /* ── Two-column layout ── */
        .cntct-layout {
          position: absolute; inset: 0; z-index: 10;
          display: flex;
          pointer-events: auto;
        }

        /* ── LEFT COLUMN ── */
        .cntct-left {
          flex: 0 0 50%;
          min-width: 0;
          display: flex; flex-direction: column;
          padding: 28px 0 28px 40px;
          gap: 0;
          justify-content: flex-end;
          position: relative;
          z-index: 50; /* Ensure left column is ALWAYS above right column */
        }

        .cntct-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(48px, 6vw, 76px);
          color: #fff; letter-spacing: 2px; line-height: 0.88;
          margin-bottom: 4px;
          opacity: 0; transform: translateX(-28px);
          transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
        }
        .cntct-title.mounted { opacity: 1; transform: translateX(0); }
        .cntct-title-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px; letter-spacing: 5px; color: #c4001a;
          margin-bottom: 20px;
          opacity: 0; transition: opacity 0.4s ease 0.38s;
        }
        .cntct-title-sub.mounted { opacity: 1; }

        /* Bars */
        .cntct-bars {
          display: flex; flex-direction: column; gap: 10px;
          pointer-events: all;
          position: relative;
          z-index: 60;
        }

        .cntct-bar-outer {
          position: relative; flex-shrink: 0;
          transform: translateX(-110%);
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
        }
        .cntct-bar-outer.mounted { transform: translateX(0); }
        .cntct-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .cntct-bar-outer:nth-child(2) { transition-delay: 60ms; }
        .cntct-bar-outer:nth-child(3) { transition-delay: 120ms; }
        .cntct-bar-outer:nth-child(4) { transition-delay: 180ms; }
        .cntct-bar-outer:nth-child(5) { transition-delay: 240ms; }
        .cntct-bar-outer:nth-child(6) { transition-delay: 300ms; }

        .cntct-bar-red {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 60px; background: #c4001a;
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          transform: translateY(4px) translateX(-4px); opacity: 0;
          transition: opacity 0.2s ease, height 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.2s ease;
          z-index: 0; pointer-events: none;
        }
        .cntct-bar-outer.active .cntct-bar-red { opacity: 1; height: 76px; transform: translateY(6px) translateX(-6px); }

        .cntct-bar {
          position: relative; width: 100%; height: 60px;
          background: rgba(5,10,35,0.92);
          border-left: 3px solid #9cf7ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 15px) 100%, 15px 100%);
          box-shadow: 0 6px 22px rgba(0,0,0,0.6);
          transition: height 0.28s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, transform 0.3s ease;
          z-index: 1; overflow: hidden;
        }
        .cntct-bar-outer:hover:not(.active) .cntct-bar { transform: translateX(8px); background: rgba(10,20,60,0.95); }
        .cntct-bar-outer.active .cntct-bar { 
          height: 76px; background: #fff; border-left-color: #c4001a;
          clip-path: polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%);
          transform: translateX(12px);
        }

        .cntct-bar-content {
          position: relative; z-index: 2; height: 100%;
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center; padding: 0 20px; gap: 0;
        }

        .cntct-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px; line-height: 1;
          color: #9cf7ff; transform: rotate(-15deg);
          user-select: none; transition: all 0.2s ease;
          justify-self: center;
        }
        .cntct-bar-outer.active .cntct-badge { color: #c4001a; font-size: 38px; transform: rotate(0deg); }

        .cntct-bar-mid {
          display: flex; flex-direction: column;
          justify-content: center; gap: 2px;
          padding-left: 14px; overflow: hidden;
        }
        .cntct-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; letter-spacing: 3px; line-height: 1;
          color: #fff;
          transition: all 0.2s ease; user-select: none;
        }
        .cntct-bar-outer.active .cntct-label { color: #000 !important; font-size: 28px; }
        .cntct-handle {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 1px;
          color: rgba(156,247,255,0.6);
          transition: all 0.2s ease;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cntct-bar-outer.active .cntct-handle { color: rgba(0,0,0,0.6) !important; font-size: 13px; }

        .cntct-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px; letter-spacing: 2px;
          padding: 4px 10px; border: 1px solid;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          flex-shrink: 0; user-select: none; margin-left: 12px;
          white-space: nowrap; transition: transform 0.2s ease;
        }
        .cntct-bar-outer.active .cntct-tag { transform: scale(1.1) rotate(2deg); }

        /* ── RIGHT COLUMN — detail panel ── */
        .cntct-right {
          flex: 1;
          min-width: 0;
          display: flex; align-items: flex-end;
          padding: 28px 52px 28px 18px;
          position: relative;
          z-index: 10;
        }

        @keyframes cntct-term-in {
          0%   { opacity: 0; transform: translateY(36px); }
          60%  { opacity: 1; transform: translateY(-3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .cntct-terminal {
          width: 100%; max-width: 100%; overflow: hidden;
          background: linear-gradient(180deg, rgba(6,12,54,0.98) 0%, rgba(2,8,36,0.99) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133,244,255,0.14),
            0 0 50px rgba(156,247,255,0.05),
            14px 14px 0 rgba(0,2,20,0.7);
          animation: cntct-term-in 0.44s cubic-bezier(0.22,1,0.36,1) both;
          position: relative; pointer-events: all;
        }
        .cntct-terminal::before {
          content: ''; position: absolute; inset: 0; z-index: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 22px,
            rgba(156,247,255,0.022) 22px, rgba(156,247,255,0.022) 23px
          );
          pointer-events: none;
        }

        /* Top bar (mac dots) */
        .cntct-topbar {
          position: relative; z-index: 1;
          display: flex; align-items: center;
          padding: 0 16px; height: 38px;
          background: rgba(156,247,255,0.07);
          border-bottom: 1px solid rgba(156,247,255,0.1);
          gap: 7px;
        }
        .cntct-dot { width: 8px; height: 8px; border-radius: 50%; }
        .cntct-dot-r { background: #c4001a; }
        .cntct-dot-c { background: #9cf7ff; opacity: 0.45; }
        .cntct-dot-w { background: rgba(255,255,255,0.2); }
        .cntct-topbar-title {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 2px;
          color: rgba(156,247,255,0.45); margin-left: 7px;
        }

        /* Greeting */
        .cntct-greeting {
          display: none; /* Hide huge HELLO WORLD */
        }
        /* Prompt rows */
        .cntct-body {
          position: relative; z-index: 1;
          padding: 12px 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
        }
        .cntct-prompt-row {
          display: grid; grid-template-columns: 72px 1fr;
          gap: 10px; align-items: center;
        }
        .cntct-prompt-key {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 2px;
          color: rgba(156,247,255,0.38); text-align: right;
        }
        .cntct-prompt-val {
          font-family: 'Share Tech Mono', monospace;
          font-size: 16px; color: #9cf7ff; letter-spacing: 1px;
          border-left: 2px solid rgba(156,247,255,0.18);
          padding-left: 10px; display: flex; align-items: center; gap: 4px;
        }
        .cntct-cursor {
          display: inline-block; width: 9px; height: 16px;
          background: #9cf7ff; flex-shrink: 0;
          opacity: 0;
        }
        .cntct-cursor.on { opacity: 1; }

        /* Divider */
        .cntct-divider {
          position: relative; z-index: 1;
          margin: 0 20px; height: 1px;
          background: rgba(156,247,255,0.08);
        }

        .cntct-desc {
          position: relative; z-index: 1;
          padding: 10px 20px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; line-height: 1.5;
          color: rgba(200,240,255,0.6);
        }
        .cntct-desc::before {
          content: '// '; color: rgba(196,0,26,0.6);
        }

        /* CTA */
        .cntct-cta {
          position: relative; z-index: 1;
          margin: 0 20px 14px;
          padding: 10px 16px;
          background: rgba(196,0,26,0.12);
          border: 1px solid rgba(196,0,26,0.34);
          clip-path: polygon(0 0, 100% 0, calc(100% - 11px) 100%, 0 100%);
          display: flex; align-items: center; justify-content: space-between;
          cursor: pointer; transition: background 0.18s ease;
        }
        .cntct-cta:hover { background: rgba(196,0,26,0.23); }
        .cntct-cta-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px; letter-spacing: 3px; color: #fff;
        }
        .cntct-cta-arrow {
          font-size: 16px; color: #c4001a;
          animation: cntct-arrow 0.8s ease-in-out infinite;
        }
        @keyframes cntct-arrow {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.35; }
        }

        /* Footer */
        .cntct-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 30; opacity: 0; transition: opacity 0.4s ease 0.55s;
        }
        .cntct-footer.mounted { opacity: 1; }
        .cntct-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .cntct-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 5px; font-size: 10px;
        }

        /* ── RESPONSIVE STYLES ── */
        @media (max-width: 900px) {
          .cntct-layout {
            flex-direction: column;
            overflow-y: auto;
            pointer-events: auto;
            padding-bottom: 80px;
          }
          .cntct-left {
            flex: 0 0 auto;
            width: 100%;
            padding: 10px 10px 10px 10px;
          }
          .cntct-right {
            flex: 0 0 auto;
            width: 100%;
            padding: 5px 10px 10px 10px;
          }
          .cntct-title {
            font-size: clamp(22px, 8vw, 32px);
          }
          .cntct-title-sub {
            font-size: 10px; margin-bottom: 8px;
          }
          .cntct-bar-outer {
            transform: translateX(0); /* static on mobile */
          }
          .cntct-bar-red {
            height: 44px;
          }
          .cntct-bar-idx { font-size: 14px; top: -12px; }
          .cntct-bar-label { font-size: 14px; }
          
          .cntct-panel {
            animation: none; /* simple display on mobile */
            padding: 12px;
          }
          .cntct-header { min-height: 40px; padding: 0 10px; margin-bottom: 8px; }
          .cntct-header-title { font-size: 16px; }
          .cntct-header-sub { font-size: 10px; }
          .cntct-body {
            grid-template-columns: 1fr; /* single column for contact links on mobile */
            padding: 8px; gap: 8px;
          }
          .cntct-prompt-key { font-size: 10px; }
          .cntct-prompt-val { font-size: 12px; padding-left: 6px; }
          .cntct-desc { font-size: 12px; padding: 5px 10px; line-height: 1.4; }
          .cntct-cta { margin: 0 10px 10px; padding: 10px 14px; }
          .cntct-cta-label { font-size: 14px; }

          /* Fix Selection Effect on Mobile */
          .cntct-bar-outer.active .cntct-bar-fill {
            clip-path: polygon(20% 0, 100% 0, 100% 100%, 15% 100%);
          }

          .cntct-footer {
            display: none; /* Hide keyboard hints entirely on mobile */
          }
          .cntct-stripe, .cntct-stripe2 {
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
        onClick={() => { window.playPersonaSound?.('cancel'); navigate(-1); }}
      >
        ◄ BACK
      </div>

      <div className="cntct-entry" aria-hidden="true" />
      <div className="cntct-scanlines" />
      <div className="cntct-stripe" />
      <div className="cntct-stripe2" />

      <div className="cntct-layout">
        {/* ── LEFT ── */}
        <div className="cntct-left">
          <div className={`cntct-title${mounted ? " mounted" : ""}`}>
            TRANSMISSION<br />OPEN
          </div>
          <div className={`cntct-title-sub${mounted ? " mounted" : ""}`}>
            — ESTABLISH CONNECTION —
          </div>

          <div className="cntct-bars">
            {CONTACTS.map((c, i) => (
              <div
                key={c.id}
                className={`cntct-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
                onMouseEnter={() => { if (active !== i) window.playPersonaSound?.('hover'); setActive(i); }}
                onClick={() => { window.playPersonaSound?.('select'); setActive(i); }}
              >
                <div className="cntct-bar-red" />
                <div className="cntct-bar">
                  <div className="cntct-bar-content">
                    <div className="cntct-badge">{c.badge}</div>
                    <div className="cntct-bar-mid">
                      <div className="cntct-label">{c.label}</div>
                      <div className="cntct-handle">{c.handle}</div>
                    </div>
                    <div
                      className="cntct-tag"
                      style={{ color: c.tagColor, borderColor: c.tagColor, background: c.tagBg }}
                    >
                      {c.statusTag}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="cntct-right">
          <div className="cntct-terminal" key={active}>
            <div className="cntct-topbar">
              <div className="cntct-dot cntct-dot-r" />
              <div className="cntct-dot cntct-dot-c" />
              <div className="cntct-dot cntct-dot-w" />
              <div className="cntct-topbar-title">
                SYSTEM_TERMINAL v3.0 // {contact.label}
              </div>
            </div>

            <div className="cntct-greeting">
              <div className="cntct-greeting-text">
                HELLO, <span>WORLD</span>
              </div>
              <div className="cntct-greeting-sub">
                {contact.icon}  {contact.label} · {contact.handle}
              </div>
            </div>

            <div className="cntct-body">
              {contact.terminal.map((row, idx) => (
                <div className="cntct-prompt-row" key={idx}>
                  <div className="cntct-prompt-key">{row.prompt}</div>
                  <div className="cntct-prompt-val">
                    {row.value}
                    {idx === contact.terminal.length - 1 && (
                      <span className={`cntct-cursor${blink ? " on" : ""}`} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="cntct-divider" />

            <div className="cntct-desc">{contact.desc}
            {contact.href && (
              <a
                className="cntct-cta"
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => window.playPersonaSound?.('hover')}
                onClick={() => { window.playPersonaSound?.('link'); }}
                style={{ textDecoration: 'none' }}
              >
                <div className="cntct-cta-label">OPEN LINK</div>
                <div className="cntct-cta-arrow">►</div>
              </a>
            )}</div>
          </div>
        </div>
      </div>

      <div className={`cntct-footer${mounted ? " mounted" : ""}`}>
        <div className="cntct-footer-row"><span className="cntct-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="cntct-footer-row"><span className="cntct-footer-key">↵</span><span>OPEN</span></div>
        <div className="cntct-footer-row"><span className="cntct-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
