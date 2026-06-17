import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgVideo from "./assets/main1.mp4";
import mainm from "./assets/mainm.jpeg";

export default function AboutMe() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Backspace") {
        window.playPersonaSound?.('cancel');
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <LoopingVideo src={bgVideo} opacity={0.6} className="profile-video" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400;700&family=Share+Tech+Mono&display=swap');

        /* Atmospheric scanlines over the video */
        .am-scanlines {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }

        /* Diagonal right panel for character */
        .am-right-bg {
          position: absolute; right: 0; top: 0; bottom: 0;
          width: 55vw; background: rgba(0, 15, 60, 0.85);
          clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
          z-index: 2;
          border-left: 4px solid #c4001a;
          backdrop-filter: blur(8px);
          transform: translateX(100%);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .am-right-bg.mounted { transform: translateX(0); }

        .am-portrait-shell {
          position: absolute; right: 2vw; bottom: 0; 
          width: 35vw; height: 95vh;
          z-index: 3; pointer-events: none;
          transform: translateX(50px) skewX(-8deg); opacity: 0;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, opacity 0.7s ease 0.2s;
          overflow: hidden;
          border-left: 8px solid rgba(255,255,255,0.8);
          box-shadow: -10px 0 20px rgba(0,0,0,0.5);
        }
        .am-portrait-shell.mounted { transform: translateX(0) skewX(-8deg); opacity: 1; }

        .am-portrait {
          width: 100%; height: 100%; object-fit: cover;
          transform: skewX(8deg) scale(1.1); /* unskew the image inside */
          object-position: center top;
        }

        /* Left Content Panel */
        .am-left {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 55vw; z-index: 5;
          display: flex; flex-direction: column; justify-content: center;
          padding: 60px 40px 60px 80px;
        }

        /* Title Area */
        .am-header {
          display: flex; align-items: flex-start; gap: 20px; margin-bottom: 40px;
          opacity: 0; transform: translateX(-40px);
          transition: opacity 0.5s ease 0.3s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
        }
        .am-header.mounted { opacity: 1; transform: translateX(0); }

        .am-badge {
          background: #c4001a; color: #fff; font-family: 'Anton', sans-serif;
          font-size: 32px; padding: 10px 15px; line-height: 1;
          clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
          transform: rotate(-3deg); margin-top: 5px;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
        }
        .am-title { display: flex; flex-direction: column; }
        .am-name {
          font-family: 'Anton', sans-serif; font-size: 80px; color: #fff;
          letter-spacing: 2px; line-height: 0.9; text-transform: uppercase;
          text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.8);
        }
        .am-class {
          font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #9cf7ff;
          letter-spacing: 4px; text-shadow: 2px 2px 0 rgba(0,0,0,0.8);
          background: rgba(0,0,0,0.5); padding: 4px 12px; display: inline-block;
          margin-top: 8px; clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
        }

        /* Stats Grid */
        .am-stats-box {
          background: rgba(10, 20, 60, 0.85); padding: 30px;
          border-left: 4px solid #9cf7ff; margin-bottom: 40px;
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
          backdrop-filter: blur(5px);
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease 0.4s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.4s;
        }
        .am-stats-box.mounted { opacity: 1; transform: translateY(0); }

        .am-stat-row {
          display: grid; grid-template-columns: 120px 1fr 40px; gap: 15px;
          align-items: center; margin-bottom: 12px;
        }
        .am-stat-row:last-child { margin-bottom: 0; }
        .am-stat-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: #fff; letter-spacing: 2px;
        }
        .am-stat-bar-bg {
          width: 100%; height: 12px; background: rgba(0,0,0,0.6);
          border: 1px solid rgba(156,247,255,0.2); position: relative;
          clip-path: polygon(0 0, 100% 0, 98% 100%, 0 100%);
        }
        .am-stat-fill {
          height: 100%; background: linear-gradient(90deg, #0088cc 0%, #9cf7ff 100%);
          width: 0; transition: width 1s cubic-bezier(0.22, 1, 0.36, 1) 0.6s;
        }
        .am-stat-val {
          font-family: 'Anton', sans-serif; font-size: 24px; color: #f6b300; text-align: right;
        }

        /* Bio Details */
        .am-bio {
          background: rgba(0, 0, 0, 0.7); padding: 25px 30px;
          border-top: 2px solid #c4001a;
          clip-path: polygon(0 0, 98% 0, 100% 100%, 0 100%);
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease 0.5s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
        }
        .am-bio.mounted { opacity: 1; transform: translateY(0); }
        .am-bio p {
          font-family: 'Montserrat', sans-serif; font-size: 15px; color: #e0e0e0;
          line-height: 1.6; margin-bottom: 15px; font-weight: 400;
        }
        .am-bio p:last-child { margin-bottom: 0; }

        /* Mobile specific styling */
        .mobile-back-btn {
          display: flex; position: fixed; top: 15px; left: 15px; z-index: 100;
          background: #c4001a; color: white; font-family: 'Bebas Neue', sans-serif;
          font-size: 16px; padding: 6px 12px; border-radius: 4px;
          align-items: center; gap: 4px; box-shadow: 2px 2px 0 rgba(0,0,0,0.5);
          cursor: pointer;
        }

        /* ── RESPONSIVE STYLES ── */
        @media (max-width: 900px) {
          .am-right-bg {
            width: 100vw;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            border-left: none;
            border-bottom: 4px solid #c4001a;
            background: linear-gradient(180deg, rgba(0, 15, 60, 0.7) 0%, rgba(0, 15, 60, 0.1) 100%);
          }
          .am-portrait-shell {
            width: 90vw;
            height: 60vh;
            right: -10vw;
            bottom: 0;
            opacity: 0.3 !important; /* fade behind content */
            border-left: none;
            box-shadow: none;
            z-index: 2; /* Put it behind the text panel */
          }
          .am-left {
            width: 100vw;
            padding: 80px 15px 40px 15px;
            justify-content: flex-start;
            overflow-y: auto;
            z-index: 5;
          }
          .am-name {
            font-size: 48px;
          }
          .am-badge {
            font-size: 20px;
            padding: 6px 10px;
          }
          .am-class {
            font-size: 16px;
          }
          .am-header {
            margin-bottom: 25px;
            flex-direction: row;
            align-items: center;
            gap: 15px;
          }
          .am-stats-box {
            padding: 20px 15px;
          }
          .am-stat-row {
            grid-template-columns: 80px 1fr 30px;
            gap: 10px;
          }
          .am-stat-label {
            font-size: 14px;
          }
          .am-stat-val {
            font-size: 18px;
          }
          .am-bio p {
            font-size: 13px;
          }
        }
      `}</style>

      <div 
        className="mobile-back-btn" 
        onClick={() => { window.playPersonaSound?.('cancel'); navigate(-1); }}
      >
        ◄ BACK
      </div>

      <div className="am-scanlines" />

      <div className={`am-right-bg ${mounted ? "mounted" : ""}`} />
      
      <div className={`am-portrait-shell ${mounted ? "mounted" : ""}`}>
        <img
          src={mainm}
          alt="Profile Portrait"
          className="am-portrait"
        />
      </div>

      <div className="am-left">
        <div className={`am-header ${mounted ? "mounted" : ""}`}>
          <div className="am-badge">LVL 20</div>
          <div className="am-title">
            <span className="am-name">ARYAN SAINI</span>
            <span className="am-class">FULL-STACK & AI ARCHITECT</span>
          </div>
        </div>

        <div className={`am-stats-box ${mounted ? "mounted" : ""}`}>
          {[
            { label: 'EXPERIENCE', val: '3+ YRS', w: '80%' },
            { label: 'FOLLOWERS',  val: '25K+',   w: '95%' },
            { label: 'PROJECTS',   val: '10+',    w: '85%' },
            { label: 'AWARDS',     val: '4x',     w: '75%' },
            { label: 'AGE',        val: '20',     w: '35%' }
          ].map((stat, i) => (
            <div className="am-stat-row" key={i}>
              <span className="am-stat-label">{stat.label}</span>
              <div className="am-stat-bar-bg">
                <div 
                  className="am-stat-fill" 
                  style={{ width: mounted ? stat.w : '0%' }}
                />
              </div>
              <span className="am-stat-val">{stat.val}</span>
            </div>
          ))}
        </div>

        <div className={`am-bio ${mounted ? "mounted" : ""}`}>
          <p>
            <strong>B.Tech Computer Science (AI)</strong> @ ABES Institute of Technology (2023-2027) <br/>
            <strong>Freelance Developer</strong> & AI/ML Intern at FireLLama Tech. <br/>
            <em>Python, LangChain, React, Web3 Specialist</em>
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
            <li style={{ color: '#ff6b6b', marginBottom: '4px' }}>✦ AI Health Voice Agent (Hacknovate 7.0 Winner)</li>
            <li style={{ color: '#4ecdc4', marginBottom: '4px' }}>✦ Floatchat AI (SIH 2025 Shortlisted)</li>
            <li style={{ color: '#f6b300' }}>✦ Verichain (Blockchain Property Transfer Finalist)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
