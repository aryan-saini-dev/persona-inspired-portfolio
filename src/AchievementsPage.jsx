import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgVideo from "./assets/main2.mp4";

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
    id: "cbse_air",
    numeral: "III",
    arcana: "THE EMPEROR",
    title: "PYTHON AIR 3 CBSE",
    subtitle: "Board Examinations",
    tag: "NATIONAL RANK",
    tagColor: "#ff9900",
    date: "2023",
    level: 98,
    accentColor: "#ff9900",
    desc: "Achieved All India Rank (AIR) 3 nationally in the CBSE Board Exams for Computer Science, demonstrating mastery in Python programming and core concepts.",
    details: [
      { key: "BOARD",    val: "CBSE" },
      { key: "RANKING",  val: "AIR 3 Nationally" },
      { key: "SUBJECT",  val: "Computer Science" },
      { key: "FOCUS",    val: "Python Programming" },
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
  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setActive(i => {
          const next = Math.max(0, i - 1);
          if(next !== i) window.playPersonaSound?.('hover');
          return next;
        });
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setActive(i => {
          const next = Math.min(CARDS.length - 1, i + 1);
          if(next !== i) window.playPersonaSound?.('hover');
          return next;
        });
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        window.playPersonaSound?.('cancel');
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  useEffect(() => {
    // scroll active item into view
    if (listRef.current) {
      const activeEl = listRef.current.children[active];
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [active]);

  const card = CARDS[active];

  return (
    <div id="menu-screen">
      <LoopingVideo src={bgVideo} opacity={0.8} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400;700&family=Share+Tech+Mono&display=swap');

        /* ── Entry left-wipe ── */
        .ach-entry {
          position: absolute; inset: 0; z-index: 9;
          background: transparent;
          animation: ach-wipe 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
          pointer-events: none;
        }
        @keyframes ach-wipe {
          0%   { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }

        .ach-scanlines {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }

        .ach-layout {
          position: absolute; inset: 0; z-index: 10;
          display: flex; padding: 40px 60px;
        }

        /* ── LEFT TIMELINE ── */
        .ach-left {
          flex: 0 0 45%; display: flex; flex-direction: column;
          border-right: 2px solid rgba(255,255,255,0.1);
          padding-right: 40px; position: relative;
        }
        .ach-title-wrap {
          margin-bottom: 30px;
          opacity: 0; transform: translateX(-40px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
        }
        .ach-title-wrap.mounted { opacity: 1; transform: translateX(0); }

        .ach-main-title {
          font-family: 'Anton', sans-serif; font-size: 72px; color: #fff;
          line-height: 0.9; letter-spacing: 2px;
        }
        .ach-sub-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: #c4001a;
          letter-spacing: 5px; margin-top: 5px;
        }

        .ach-list {
          flex: 1; overflow-y: auto; padding-right: 15px;
          display: flex; flex-direction: column; gap: 15px;
          /* hide scrollbar */
          -ms-overflow-style: none; scrollbar-width: none;
          padding-bottom: 40px;
        }
        .ach-list::-webkit-scrollbar { display: none; }

        .ach-item {
          position: relative; padding: 20px; cursor: pointer;
          background: rgba(0,0,0,0.4); border-left: 4px solid transparent;
          transition: all 0.3s ease; opacity: 0; transform: translateX(-20px);
        }
        .ach-item.mounted { opacity: 1; transform: translateX(0); }
        .ach-item.active {
          background: rgba(196, 0, 26, 0.85); border-left: 4px solid #fff;
          transform: scale(1.02) translateX(10px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        .ach-item-date {
          font-family: 'Bebas Neue', sans-serif; font-size: 14px;
          color: rgba(255,255,255,0.6); letter-spacing: 2px;
        }
        .ach-item.active .ach-item-date { color: rgba(255,255,255,0.9); }
        
        .ach-item-title {
          font-family: 'Anton', sans-serif; font-size: 28px;
          color: #fff; line-height: 1.1; letter-spacing: 1px;
        }
        .ach-item-sub {
          font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600;
          color: #9cf7ff; margin-top: 5px;
        }
        .ach-item.active .ach-item-sub { color: #fff; }

        /* ── RIGHT DETAIL ── */
        .ach-right {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding-left: 60px;
        }

        .ach-detail-panel {
          width: 100%; max-width: 600px;
          background: linear-gradient(135deg, rgba(10,20,60,0.95) 0%, rgba(5,10,30,0.95) 100%);
          border-top: 5px solid #fff;
          padding: 40px; position: relative;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
          animation: panel-pop 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes panel-pop {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ach-det-arcana {
          position: absolute; right: 20px; top: 20px;
          font-family: 'Anton', sans-serif; font-size: 80px; color: rgba(255,255,255,0.05);
          line-height: 0.8; user-select: none; pointer-events: none;
        }

        .ach-det-tag {
          display: inline-block; padding: 4px 12px; font-family: 'Bebas Neue', sans-serif;
          font-size: 16px; letter-spacing: 2px; color: #000; margin-bottom: 20px;
          clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
        }

        .ach-det-title {
          font-family: 'Anton', sans-serif; font-size: 48px; color: #fff;
          line-height: 0.9; margin-bottom: 10px; text-transform: uppercase;
        }

        .ach-det-desc {
          font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 300;
          color: #e0e0e0; line-height: 1.6; margin-bottom: 30px;
          border-left: 2px solid rgba(255,255,255,0.2); padding-left: 15px;
        }

        .ach-det-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 15px;
        }
        .ach-det-row {
          background: rgba(0,0,0,0.4); padding: 10px 15px;
          border-bottom: 2px solid rgba(255,255,255,0.1);
        }
        .ach-det-key {
          font-family: 'Bebas Neue', sans-serif; font-size: 12px;
          color: rgba(156,247,255,0.6); letter-spacing: 2px;
        }
        .ach-det-val {
          font-family: 'Anton', sans-serif; font-size: 18px; color: #fff;
          margin-top: 2px;
        }

        .mobile-back-btn {
          display: flex; position: fixed; top: 15px; left: 15px; z-index: 100;
          background: #c4001a; color: white; font-family: 'Bebas Neue', sans-serif;
          font-size: 16px; padding: 6px 12px; border-radius: 4px;
          align-items: center; gap: 4px; box-shadow: 2px 2px 0 rgba(0,0,0,0.5);
          cursor: pointer;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ach-layout {
            flex-direction: column; padding: 70px 15px 40px; overflow-y: auto;
            pointer-events: auto;
          }
          .ach-left {
            flex: 0 0 auto; border-right: none; padding-right: 0; margin-bottom: 20px;
          }
          .ach-main-title { font-size: 42px; }
          .ach-sub-title { font-size: 14px; }
          
          /* Carousel for the list on mobile */
          .ach-list {
            flex-direction: row; overflow-x: auto; gap: 15px;
            scroll-snap-type: x mandatory; padding-bottom: 10px;
            padding-right: 0;
          }
          .ach-item {
            flex: 0 0 80%; scroll-snap-align: center;
            transform: none !important; margin: 0;
            opacity: 0.6;
          }
          .ach-item.active {
            opacity: 1; transform: scale(1.02) !important;
          }
          
          .ach-right {
            flex: 0 0 auto; padding-left: 0;
          }
          .ach-det-title { font-size: 32px; }
          .ach-det-desc { font-size: 13px; }
          .ach-det-grid { grid-template-columns: 1fr; gap: 10px; }
        }
      `}</style>

      <div className="ach-entry" aria-hidden="true" />
      <div className="ach-scanlines" />

      <div className="mobile-back-btn" onClick={() => { window.playPersonaSound?.('cancel'); navigate(-1); }}>
        ◄ BACK
      </div>

      <div className="ach-layout">
        {/* LEFT */}
        <div className="ach-left">
          <div className={`ach-title-wrap ${mounted ? "mounted" : ""}`}>
            <div className="ach-main-title">ACHIEVEMENTS</div>
            <div className="ach-sub-title">QUEST LOG // TIMELINE</div>
          </div>

          <div className="ach-list" ref={listRef}>
            {CARDS.map((c, i) => (
              <div 
                key={c.id} 
                className={`ach-item ${active === i ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{ transitionDelay: mounted ? `${i * 50}ms` : '0ms' }}
                onClick={() => { window.playPersonaSound?.('select'); setActive(i); }}
                onMouseEnter={() => { if(active !== i) window.playPersonaSound?.('hover'); setActive(i); }}
              >
                <div className="ach-item-date">{c.date}</div>
                <div className="ach-item-title">{c.title}</div>
                <div className="ach-item-sub">{c.subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="ach-right">
          <div className="ach-detail-panel" key={card.id}>
            <div className="ach-det-arcana">{card.numeral}</div>
            <div className="ach-det-tag" style={{ background: card.tagColor }}>{card.tag}</div>
            <div className="ach-det-title" style={{ color: card.accentColor }}>{card.title}</div>
            <div className="ach-det-desc">{card.desc}</div>
            
            <div className="ach-det-grid">
              {card.details.map((d, i) => (
                <div className="ach-det-row" key={i}>
                  <div className="ach-det-key">{d.key}</div>
                  <div className="ach-det-val">{d.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
