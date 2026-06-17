import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menuTrain from "./assets/Additions/Inside-train-chill.gif";
import resumeFile from "../Aryan_Saini_Resume___Jake_s_Template (2)_compressed.pdf";

const MENUS = {
  MAIN: [
    { id: "about",        label: "ABOUT ME",       action: "submenu_about",  fontSize: 64,  offsetX: 0,  offsetY: 0,  skew: -6,  skewY: 10  },
    { id: "portfolio",    label: "PORTFOLIO",      isExternal: "https://aryan-saini-portfolio.vercel.app/", fontSize: 60, offsetX: 10, offsetY: 5, skew: -8, skewY: -5 },
    { id: "resume",       label: "RESUME",         action: "submenu_resume", fontSize: 53,  offsetX: 20, offsetY: 8,  skew: -11, skewY: -10 },
    { id: "contact",      label: "CONTACT ME",     page: "contact",          fontSize: 54,  offsetX: 6,  offsetY: 6,  skew: 0,   skewY: -4  },
    { id: "speciality",   label: "MY SPECIALITY",  page: "speciality",       fontSize: 52,  offsetX: 14, offsetY: 4,  skew: -5,  skewY: 4   },
    { id: "instagram",    label: "INSTAGRAM",      page: "instagram",        fontSize: 59,  offsetX: 16, offsetY: 8,  skew: -3,  skewY: 5   },
    { id: "experience",   label: "EXPERIENCE",     page: "experience",       fontSize: 54,  offsetX: 10, offsetY: 5,  skew: -5,  skewY: -2  },
    { id: "github",       label: "GITHUB",         isExternal: "https://github.com/aryan-saini-dev", fontSize: 64,  offsetX: 5,  offsetY: 2,  skew: 2,   skewY: 3   },
    { id: "game",         label: "PLAY A GAME",      page: "game",             fontSize: 56,  offsetX: 12, offsetY: 4,  skew: -4,  skewY: 6   },
  ],
  ABOUT: [
    { id: "projects",     label: "PROJECTS",       page: "projects",         fontSize: 56,  offsetX: 0,  offsetY: 0,  skew: -4,  skewY: -6  },
    { id: "achievements", label: "ACHIEVEMENTS",   page: "achievements",     fontSize: 50,  offsetX: 14, offsetY: 4,  skew: -5,  skewY: 4   },
    { id: "contact_sub",  label: "CONTACT ME",     page: "contact",          fontSize: 54,  offsetX: 6,  offsetY: 6,  skew: 0,   skewY: -4  },
    { id: "portfolio_sub",label: "PORTFOLIO",      isExternal: "https://aryan-saini-portfolio.vercel.app/", fontSize: 52, offsetX: 15, offsetY: 5, skew: -3, skewY: 5 },
    { id: "profile",      label: "PROFILE",        page: "about",            fontSize: 60,  offsetX: 10, offsetY: 5,  skew: -6,  skewY: 6   },
    { id: "back",         label: "◄ BACK",         action: "back_main",      fontSize: 48,  offsetX: 0,  offsetY: -2, skew: -2,  skewY: -2  },
  ],
  RESUME: [
    { id: "resume_q",     label: "DOWNLOAD RESUME?", action: "none",         fontSize: 56,  offsetX: 0,  offsetY: 0,  skew: -2,  skewY: 2   },
    { id: "resume_yes",   label: "YES",              action: "download_resume", fontSize: 72,  offsetX: 20, offsetY: 5,  skew: -5,  skewY: -5  },
    { id: "resume_no",    label: "NO",               action: "back_main",    fontSize: 72,  offsetX: 10, offsetY: 5,  skew: 0,   skewY: 0   },
  ]
};

const CLIP_SHAPES = [
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
];

export default function P3Menu({ onNavigate }) {
  const [menuState, setMenuState] = useState("MAIN");
  const ITEMS = MENUS[menuState];
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) setScaleFactor(0.40);
      else if (w < 768) setScaleFactor(0.50);
      else if (w < 1024) setScaleFactor(0.70);
      else setScaleFactor(0.85);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAction = (item) => {
    window.playPersonaSound?.('select');
    if (item.action) {
      if (item.action === "submenu_about") { setMenuState("ABOUT"); setActive(0); setAnimKey(k=>k+1); }
      else if (item.action === "submenu_resume") { setMenuState("RESUME"); setActive(1); setAnimKey(k=>k+1); } // Start at YES
      else if (item.action === "back_main") { setMenuState("MAIN"); setActive(0); setAnimKey(k=>k+1); }
      else if (item.action === "download_resume") {
        const a = document.createElement("a");
        a.href = resumeFile;
        a.download = "Aryan_Saini_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setMenuState("MAIN");
        setActive(0);
        setAnimKey(k=>k+1);
      }
    } else if (item.isExternal) {
      window.open(item.isExternal, "_blank");
    } else if (item.page) {
      if (onNavigate) onNavigate(item.page);
      else navigate(`/${item.page}`);
    }
  };

  const activate = (idx) => {
    if (idx !== active) window.playPersonaSound?.('hover');
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter")     handleAction(ITEMS[active]);
      if (e.key === "Escape" || e.key === "Backspace") {
        if (menuState !== "MAIN") {
          setMenuState("MAIN");
          setActive(0);
          setAnimKey(k => k + 1);
          window.playPersonaSound?.('hover');
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <style>{`
        .p3-overlay {
          position: absolute; inset: 0; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .p3-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:10; pointer-events:none; }
        .p3-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(245,122,139,0.22); z-index:10; pointer-events:none; }

        .p3-menu {
          position: relative; z-index: 20; padding: 48px;
          display: flex; flex-direction: column; align-items: center;
          pointer-events: all;
        }

        .p3-row {
          position: relative; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          line-height: 1; text-decoration: none;
          opacity: 0; transform: translateX(36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
          margin-bottom: 20px; /* Increased gap for better mobile touch targets */
        }
        .p3-row.mounted { opacity: 1 !important; transform: translateX(0) !important; }

        .p3-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 120%; height: 200%;
          background: radial-gradient(ellipse at center, rgba(255,100,180,0.35) 0%, transparent 70%);
          filter: blur(18px); z-index: 0; pointer-events: none;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .p3-row.active .p3-glow { opacity: 1; }

        .p3-skew-wrap {
          position: relative; display: flex; align-items: center; isolation: isolate;
        }

        @keyframes p3-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        .p3-shadow-tri {
          position: absolute; top: 50%; transform-origin: left center;
          background: rgba(235, 80, 120, 0.85); z-index: 1; pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .p3-shadow-tri.pop {
          animation: p3-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .p3-highlight {
          position: absolute; top: 50%; transform-origin: left center;
          background: #ffffff; z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1); pointer-events: none;
        }

        .p3-label-wrap { position: relative; z-index: 3; }

        .p3-label-base {
          font-family: 'Anton', sans-serif; font-style: italic;
          letter-spacing: 2px; line-height: 0.85;
          display: block; white-space: nowrap; user-select: none;
        }
        .p3-label-dark { color: #e0f6ff; transition: color 0.12s ease; }
        .p3-row.active .p3-label-dark { color: #6b0010; }
        .p3-row:hover:not(.active) .p3-label-dark { color: #bdeaff; }

        .p3-label-bright {
          color: #ff2a2a; position: absolute; inset: 0; z-index: 1;
          opacity: 0; transition: opacity 0.12s ease;
        }
        .p3-row.active .p3-label-bright { opacity: 1; }

        /* NEW badge */
        .p3-new-badge {
          position: absolute; top: 0; right: -8px;
          font-family: 'Anton', sans-serif; font-style: normal;
          font-size: 11px; letter-spacing: 2px;
          color: #9cf7ff; border: 1px solid rgba(156,247,255,0.4);
          padding: 1px 5px;
          animation: p3-new-pulse 1.4s ease-in-out infinite;
        }
        @keyframes p3-new-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .p3-hint {
          position: absolute; bottom: 45px; right: 28px; z-index: 20;
          display: flex; flex-direction: column; align-items: flex-end; gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0; transition: opacity 0.5s ease 0.9s;
        }
        .p3-hint.mounted { opacity: 1; }
        .p3-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.28);
        }
        .p3-hint-key {
          border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .p3-name-tag {
          position: absolute; top: 18px; left: 70px; z-index: 20;
          font-family: 'Anton', sans-serif; font-style: italic;
          font-size: 108px; line-height: 0.88; letter-spacing: 2px;
          color: rgba(10, 10, 14, 0.64);
          transform: rotate(18deg); transform-origin: left top;
          user-select: none; pointer-events: none;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .p3-name-tag span:first-child { color: rgba(0, 0, 0, 0.86); }

        @media (max-width: 768px) {
          .p3-menu { padding: 16px 8px; }
          .p3-name-tag { font-size: 36px; left: 15px; top: 10px; }
          .p3-name-tag span:first-child { transform: translateY(-5px); }
          .p3-hint { display: none; } /* Hide keyboard hints entirely on mobile */
          .p3-overlay { background: rgba(0, 0, 0, 0.2); } /* Slightly dim the background on mobile */
        }
      `}</style>

      <div className="p3-overlay">
        <div 
          className="p3-name-tag" 
          style={{ pointerEvents: 'all', cursor: 'pointer' }}
          onClick={() => { window.playPersonaSound?.('select'); if(onNavigate) onNavigate('about'); else navigate('/about'); }}
          onMouseEnter={() => window.playPersonaSound?.('hover')}
        >
          <span>Aryan's</span>
          <span>persona</span>
        </div>
        <div className="p3-stripe" />
        <div className="p3-stripe2" />

        {/* Faded right side train GIF */}
        <img
          src={menuTrain}
          alt=""
          aria-hidden="true"
          className={mounted ? "mounted" : ""}
          style={{
            position: "absolute",
            right: "-15%",
            bottom: "0%",
            height: "100%",
            width: "auto",
            opacity: 0.18,
            zIndex: 1,
            pointerEvents: "none",
            objectFit: "cover",
            maskImage: "linear-gradient(to right, transparent 0%, black 60%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 60%)",
            transition: "opacity 1s ease",
          }}
        />

        <nav className="p3-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.45, 1 - dist * 0.18);
            const s = scaleFactor;
            const estW = (item.label.length * item.fontSize * 0.6 + 80) * s;
            const estH = (item.fontSize * 0.94) * s;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];
            const isNew = item.id === "experience";

            return (
              <a
                key={item.id}
                href="#"
                className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  marginRight: item.offsetX * s,
                  marginTop: item.offsetY * s,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                }}
                onClick={(e) => { e.preventDefault(); handleAction(item); }}
                onMouseEnter={() => activate(i)}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="p3-glow" />
                <div
                  className="p3-skew-wrap"
                  style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
                >
                  <div
                    key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                    className={`p3-shadow-tri${isActive ? ' pop' : ''}`}
                    style={{ width: estW, height: estH, clipPath: clipFn(estW, estH) }}
                  />
                  <div
                    className="p3-highlight"
                    style={{
                      width: estW, height: estH, clipPath: clipFn(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />
                  <div className="p3-label-wrap" style={{ opacity }}>
                    <span className="p3-label-base p3-label-dark" style={{ fontSize: item.fontSize * s, opacity: item.action === "none" ? 0.9 : 1 }}>
                      {item.label}
                    </span>
                    <span
                      className="p3-label-base p3-label-bright"
                      style={{ fontSize: item.fontSize * s, clipPath: clipFn(estW, estH) }}
                    >
                      {item.label}
                    </span>
                    {isNew && <span className="p3-new-badge">NEW</span>}
                  </div>
                </div>
              </a>
            );
          })}
        </nav>

        <div className={`p3-hint ${mounted ? "mounted" : ""}`}>
          <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>NAVIGATE</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>CONFIRM</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key">ESC</span><span>BACK</span></div>
        </div>

        {/* Copyright Disclaimer */}
        <div 
          className={`p3-hint ${mounted ? "mounted" : ""}`}
          style={{
            bottom: "10px", right: "28px", alignItems: "flex-end", gap: "2px",
            fontFamily: "'Share Tech Mono', monospace", fontSize: "13px", color: "rgba(255,255,255,0.35)",
            pointerEvents: "all", cursor: "pointer", transition: "color 0.2s"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(156,247,255,0.8)"; window.playPersonaSound?.('hover'); }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
          onClick={() => { 
            window.playPersonaSound?.('link'); 
            alert("COPYRIGHT NOTICE:\nAll rights regarding the Persona aesthetics, game assets, music, and thematic UI belong to Atlus.\n\nThis project is a non-commercial, fun tribute designed by an independent developer to study and recreate the incredible UX/UI design of Persona 3 Reload."); 
          }}
        >
          © NON-COMMERCIAL TRIBUTE. PERSONA UI/SOUNDS BY ATLUS. [TERMS]
        </div>
      </div>
    </>
  );
}
