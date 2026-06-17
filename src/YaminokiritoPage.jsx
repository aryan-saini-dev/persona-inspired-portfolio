import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgVideo from "./assets/main3.mp4";
import charImage from "./assets/mainm2.jpeg";

const INSTA_DATA = [
  {
    category: "WORKED WITH",
    items: [
      {
        title: "FAMOUS CONTENT CREATOR & AUTHOR",
        desc: "I collaborated with popular content creator and author @inspired.author (225K+ followers) on promotional edits for his official works, including the popular Webtoon God Game. My designs helped elevate his brand and engage his audience effectively."
      }
    ]
  },
  {
    category: "ACHIEVEMENTS",
    items: [
      {
        title: "INSTAGRAM CREATOR WITH MILLIONS OF VIEWERS",
        desc: "As @yaminokirito, I am an Instagram creator with millions of viewers, known for delivering engaging and visually impactful content. Through creative designs and consistent storytelling, I've built a growing community of over 25K followers. My work focuses on connecting with audiences and creating visuals that leave a lasting impression."
      },
      {
        title: "MY DESIGNS MERCH HAVE BEEN BOUGHT",
        desc: "My designs have been featured on merchandise such as mousepads, wall art, and posters, purchased and appreciated by fans. This highlights the versatility and impact of my creative work in turning visuals into products people use and enjoy daily."
      }
    ]
  }
];

export default function YaminokiritoPage() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState("summary"); // 'summary' or 'detailed'
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
      if (e.key === "Enter") {
        window.open("https://www.instagram.com/yaminokirito/", "_blank");
        window.playPersonaSound?.('link');
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <LoopingVideo src={bgVideo} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400;600&family=Share+Tech+Mono&display=swap');

        .yk-entry-mask {
          position: absolute; inset: 0; z-index: 9; overflow: hidden;
          background: transparent;
          clip-path: circle(0 at 50% 50%);
          animation: yk-reveal 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        @keyframes yk-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }

        .yk-scanlines {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }

        .yk-layout {
          position: absolute; inset: 0; z-index: 10;
          display: flex;
          pointer-events: none;
        }

        /* LEFT SIDE - TITLE */
        .yk-left {
          flex: 0 0 45%;
          display: flex; flex-direction: column; justify-content: center;
          padding-left: 60px;
        }
        .yk-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(60px, 8vw, 110px);
          color: #000; letter-spacing: 2px; line-height: 0.88;
          text-transform: uppercase;
          opacity: 0; transform: translateX(-40px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }
        .yk-title.mounted { opacity: 1; transform: translateX(0); }
        .yk-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; letter-spacing: 5px; color: #c4001a;
          margin-top: 10px; margin-bottom: 20px;
          opacity: 0; transition: opacity 0.5s ease 0.4s;
        }
        .yk-sub.mounted { opacity: 1; }

        .yk-stats {
          display: flex; gap: 20px; margin-top: 20px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
        }
        .yk-stats.mounted { opacity: 1; transform: translateY(0); }
        .yk-stat-box {
          background: rgba(0,0,0,0.8);
          border: 1px solid #c4001a;
          padding: 10px 20px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
        }
        .yk-stat-num {
          font-family: 'Anton', sans-serif; font-size: 40px; color: #fff; line-height: 1;
        }
        .yk-stat-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: #c4001a; letter-spacing: 2px;
        }

        .yk-tabs {
          display: flex; gap: 10px; margin-top: 30px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s;
          pointer-events: all;
        }
        .yk-tabs.mounted { opacity: 1; transform: translateY(0); }
        .yk-tab {
          padding: 8px 16px; cursor: pointer;
          font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px;
          background: rgba(0,0,0,0.6); color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.2);
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          transition: all 0.2s ease;
        }
        .yk-tab:hover { background: rgba(196,0,26,0.3); color: #fff; border-color: #c4001a; }
        .yk-tab.active {
          background: #c4001a; color: #fff; border-color: #ffca28;
          transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        
        .yk-main-cta {
          margin-top: 40px;
          padding: 15px 25px;
          width: fit-content;
          background: rgba(196,0,26,0.9);
          border: 2px solid #fff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 15px) 100%, 0 100%);
          display: flex; align-items: center; gap: 15px;
          cursor: pointer; transition: all 0.2s ease;
          opacity: 0; transform: translateY(20px);
          pointer-events: all;
        }
        .yk-main-cta.mounted { opacity: 1; transform: translateY(0); transition-delay: 0.6s; }
        .yk-main-cta:hover { background: #fff; border-color: #c4001a; transform: scale(1.05); }
        .yk-main-cta-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px; letter-spacing: 3px; color: #fff;
          transition: color 0.2s ease;
        }
        .yk-main-cta:hover .yk-main-cta-label { color: #c4001a; }
        .yk-main-cta-icon {
          font-size: 20px; color: #fff; transition: color 0.2s ease;
        }
        .yk-main-cta:hover .yk-main-cta-icon { color: #c4001a; }

        /* RIGHT SIDE - CONTENT LIST */
        .yk-right {
          flex: 1;
          display: flex; flex-direction: column; justify-content: center;
          padding: 40px 60px 40px 40px;
          pointer-events: all;
          overflow-y: auto;
        }
        .yk-right::-webkit-scrollbar { width: 0; }

        /* SUMMARY MODE PANEL */
        .yk-summary-panel {
          width: 100%; max-width: 500px;
          background: linear-gradient(180deg, rgba(15,28,105,0.4) 0%, rgba(8,16,68,0.5) 100%);
          backdrop-filter: blur(8px);
          clip-path: polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133,244,255,0.16), 14px 14px 0 rgba(0,6,30,0.55);
          padding: 30px;
          animation: yk-fade-in 0.4s ease forwards;
        }
        .yk-summary-panel-img {
          width: 100%; height: 200px; object-fit: cover;
          margin-bottom: 20px; border: 1px solid rgba(133,244,255,0.3);
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
        }
        .yk-summary-desc {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300; font-size: 15px; line-height: 1.6;
          color: rgba(200,240,255,0.9);
        }

        /* DETAILED MODE LIST */
        @keyframes yk-fade-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .yk-section {
          margin-bottom: 40px;
          animation: yk-fade-in 0.4s ease forwards;
        }

        .yk-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px; letter-spacing: 4px;
          color: #000;
          margin-bottom: 15px;
          text-shadow: 2px 2px 0 #c4001a, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
          position: relative;
          display: inline-block;
        }
        .yk-section-title::after {
          content: '';
          position: absolute; bottom: -5px; left: 0; width: 60%; height: 3px;
          background: #c4001a;
        }

        .yk-card {
          background: linear-gradient(135deg, rgba(15,28,105,0.7) 0%, rgba(5,10,35,0.9) 100%);
          border: 1px solid rgba(255,215,0,0.6); /* Gold border from user's image */
          clip-path: polygon(0 0, 100% 0, calc(100% - 15px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255,215,0,0.2), 8px 8px 0 rgba(0,0,0,0.5);
          padding: 25px;
          margin-bottom: 20px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .yk-card:hover {
          transform: translateX(-10px);
          border-color: rgba(255,215,0,1);
        }

        .yk-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px; letter-spacing: 2px;
          color: #fff;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        
        .yk-card-desc {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400; font-size: 14px; line-height: 1.6;
          color: rgba(230,245,255,0.85);
        }
        .yk-card-desc strong {
          color: #ffca28; font-weight: 600;
        }

        /* Footer */
        .yk-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 30; opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .yk-footer.mounted { opacity: 1; }
        .yk-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 2px; color: rgba(255,255,255,0.22);
        }
        .yk-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 5px; font-size: 10px;
        }

        /* ── RESPONSIVE STYLES ── */
        @media (max-width: 900px) {
          .yk-layout {
            flex-direction: column;
            overflow-y: auto;
            pointer-events: auto;
            padding-bottom: 80px;
          }
          .yk-left {
            flex: 0 0 auto;
            width: 100%;
            padding: 60px 10px 10px 10px;
            justify-content: flex-start;
          }
          .yk-right {
            flex: 0 0 auto;
            width: 100%;
            padding: 5px 10px 10px 10px;
          }
          .yk-title {
            font-size: clamp(24px, 8vw, 32px);
          }
          .yk-sub {
            font-size: 10px; margin-bottom: 12px; letter-spacing: 2px;
          }
          .yk-stats {
            gap: 12px;
            margin-bottom: 20px;
          }
          .yk-stat-box { padding: 10px 14px; }
          .yk-stat-num { font-size: 16px; }
          .yk-stat-label { font-size: 10px; }
          .yk-tabs { gap: 15px; margin-bottom: 15px; }
          .yk-tab { font-size: 12px; padding-bottom: 4px; }
          .yk-main-cta { margin-top: 20px; padding: 12px 20px; }
          .yk-main-cta-label { font-size: 16px; }

          .yk-summary-panel {
            animation: none; /* simple display on mobile */
            padding: 16px;
          }
          .yk-summary-panel-img { height: 160px; margin-bottom: 12px; }
          .yk-summary-desc { font-size: 11px; line-height: 1.4; }

          .yk-section {
            animation: none;
            margin-bottom: 25px;
          }
          .yk-section-title { font-size: 20px; margin-bottom: 10px; }
          .yk-card { padding: 16px; margin-bottom: 12px; }
          .yk-card-title { font-size: 16px; margin-bottom: 8px; }
          .yk-card-desc { font-size: 11px; line-height: 1.4; }

          .yk-footer {
            display: none; /* Hide keyboard hints entirely on mobile */
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

      <div className="yk-entry-mask" />
      <div className="yk-scanlines" />

      <div className="yk-layout">
        <div className="yk-left">
          <div className={`yk-title${mounted ? " mounted" : ""}`}>
            YAMINO<br />KIRITO
          </div>
          <div className={`yk-sub${mounted ? " mounted" : ""}`}>
            — PERSONAL BRAND · INFLUENCE —
          </div>
          <div className={`yk-stats${mounted ? " mounted" : ""}`}>
            <div className="yk-stat-box">
              <div className="yk-stat-num">25K+</div>
              <div className="yk-stat-label">FOLLOWERS</div>
            </div>
            <div className="yk-stat-box" style={{ borderColor: '#4a8fff' }}>
              <div className="yk-stat-num">AI & DEV</div>
              <div className="yk-stat-label" style={{ color: '#4a8fff' }}>CONTENT FOCUS</div>
            </div>
          </div>
          
          <div className={`yk-tabs${mounted ? " mounted" : ""}`}>
            <div 
              className={`yk-tab ${viewMode === 'summary' ? 'active' : ''}`}
              onClick={() => { window.playPersonaSound?.('select'); setViewMode('summary'); }}
              onMouseEnter={() => { if(viewMode !== 'summary') window.playPersonaSound?.('hover'); }}
            >
              SUMMARY
            </div>
            <div 
              className={`yk-tab ${viewMode === 'detailed' ? 'active' : ''}`}
              onClick={() => { window.playPersonaSound?.('select'); setViewMode('detailed'); }}
              onMouseEnter={() => { if(viewMode !== 'detailed') window.playPersonaSound?.('hover'); }}
            >
              DETAILED
            </div>
          </div>
          
          <div 
            className={`yk-main-cta${mounted ? " mounted" : ""}`}
            onMouseEnter={() => window.playPersonaSound?.('hover')}
            onClick={() => {
              window.playPersonaSound?.('link');
              window.open("https://www.instagram.com/yaminokirito/", "_blank");
            }}
          >
            <div className="yk-main-cta-label">OPEN INSTAGRAM</div>
            <div className="yk-main-cta-icon">►</div>
          </div>
        </div>

        <div className="yk-right">
          {viewMode === "summary" ? (
            <div className="yk-summary-panel">
              <img src={charImage} alt="Yaminokirito" className="yk-summary-panel-img" />
              <div className="yk-summary-desc">
                I run the Instagram page <strong>@yaminokirito</strong>, where I've built a thriving community of over 25,000 developers, tech enthusiasts, and AI builders. 
                <br /><br />
                Through this platform, I mentor aspiring programmers, share cutting-edge AI developments, and document my journey of building real-world applications that deliver impact.
              </div>
            </div>
          ) : (
            INSTA_DATA.map((section, idx) => (
              <div key={idx} className="yk-section" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="yk-section-title">{section.category}</div>
                {section.items.map((item, i) => (
                  <div key={i} className="yk-card" onMouseEnter={() => window.playPersonaSound?.('hover')}>
                    <div className="yk-card-title">{item.title}</div>
                    <div className="yk-card-desc" dangerouslySetInnerHTML={{ __html: item.desc.replace(/@\w+(\.\w+)?/g, '<strong>$&</strong>') }} />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`yk-footer${mounted ? " mounted" : ""}`}>
        <div className="yk-footer-row"><span className="yk-footer-key">↵</span><span>VISIT PAGE</span></div>
        <div className="yk-footer-row"><span className="yk-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
