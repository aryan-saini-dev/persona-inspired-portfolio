import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "./LoopingVideo";
import bgVideo from "./assets/Additions/ann_in_rain.mp4";
import bgGif from "./assets/Additions/slide1_persona.gif";

const PROJECTS = [
  {
    id: "healthvoice",
    badge: "I",
    label: "AI HEALTH VOICE AGENT",
    subtitle: "Python · Vapi · Gemini",
    status: "WINNER",
    statusColor: "#f6b300",
    statusBg: "#1a1200",
    rank: "S+",
    github: "https://github.com/aryan-saini-dev",
    tech: ["Python", "Vapi", "Gemini AI", "WebSockets"],
    detail: [
      { index: "01", title: "Hacknovate 7.0 Hackathon", status: "WINNER" },
      { index: "02", title: "AI-powered Voice Agent", status: "DEPLOYED" },
      { index: "03", title: "Health Applications", status: "ACTIVE" },
      { index: "04", title: "Real-time Voice Synthesis", status: "LIVE" },
    ],
    images: [
      "/Project/Vitals/GNEC Vitals.png",
      "/Project/Vitals/GNEC Vitals (1).png",
      "/Project/Vitals/GNEC Vitals (2).png",
      "/Project/Vitals/GNEC Vitals (3).png",
    ],
    desc: "Winner of AI Flagship Hackathon Hacknovate 7.0. An AI-powered voice agent for health applications built with Python, Vapi, and Gemini for real-time conversational intelligence.",
  },
  {
    id: "floatchat",
    badge: "II",
    label: "FLOATCHAT AI",
    subtitle: "Llama Index · MERN Stack",
    status: "SHORTLISTED",
    statusColor: "#9cf7ff",
    statusBg: "#0b113d",
    rank: "S",
    github: "https://github.com/aryan-saini-dev/Floatchat-AI",
    tech: ["Llama Index", "React", "Node.js", "MongoDB", "OpenAI"],
    detail: [
      { index: "01", title: "Smart India Hackathon 2025", status: "SHORTLISTED" },
      { index: "02", title: "RAG Pipeline with Llama Index", status: "ADVANCED" },
      { index: "03", title: "Floating Interface Chatbot", status: "BUILT" },
      { index: "04", title: "MERN Stack Integration", status: "LIVE" },
    ],
    images: [
      "/Project/FloatChat/1.png",
      "/Project/FloatChat/2.png",
      "/Project/FloatChat/3.png",
      "/Project/FloatChat/6.png",
    ],
    desc: "Internally shortlisted at Smart India Hackathon 2025. A multi-modal RAG chatbot featuring a floating interface capability, built on the MERN stack with Llama Index for orchestration.",
  },
  {
    id: "verichain",
    badge: "III",
    label: "VERICHAIN",
    subtitle: "Solidity · LangGraph · Blockchain",
    status: "FINALIST",
    statusColor: "#ff6b6b",
    statusBg: "#1a0404",
    rank: "A+",
    github: "https://github.com/aryan-saini-dev/Verichain",
    tech: ["Solidity", "LangGraph", "ethers.js", "React", "IPFS"],
    detail: [
      { index: "01", title: "Code-A-Thon Hackathon", status: "FINALIST" },
      { index: "02", title: "Blockchain Verification", status: "AUDITED" },
      { index: "03", title: "AI-Augmented Workflows", status: "HYBRID" },
      { index: "04", title: "On-Chain Records", status: "WEB3" },
    ],
    images: [
      "/Project/Verichain/1.png",
      "/Project/Verichain/2.png",
      "/Project/Verichain/5.png",
    ],
    desc: "Finalist at Code-A-Thon. A blockchain verification and property transfer system combining immutable Solidity smart contracts with LangGraph AI orchestration.",
  },
  {
    id: "mobilevision",
    badge: "IV",
    label: "MOBILE VISION",
    subtitle: "TensorFlow · Edge ML · Python",
    status: "INTERNSHIP",
    statusColor: "#4ecdc4",
    statusBg: "#041a18",
    rank: "A",
    github: "https://github.com/aryan-saini-dev",
    tech: ["TensorFlow", "Python", "MobileNetV2", "Edge AI"],
    detail: [
      { index: "01", title: "FireLLama Tech Project", status: "COMPLETED" },
      { index: "02", title: "Edge Machine Learning", status: "DEPLOYED" },
      { index: "03", title: "MobileNetV2 Architecture", status: "-70% PARAMS" },
      { index: "04", title: "Inference Latency", status: "-45MS" },
    ],
    images: [
      "/Project/Mobile Vision/Blog-Banner-Computer-Vision.jpg",
    ],
    desc: "FireLLama Intern Project. Real-time MobileNetV2 image classification system for edge devices. Optimized architecture using depthwise convolutions, reducing parameters by 70% while keeping 90%+ accuracy.",
  },
  {
    id: "selfhealing",
    badge: "V",
    label: "SELF HEALING RAG",
    subtitle: "LangChain · VectorDB · AI",
    status: "RESEARCH",
    statusColor: "#c4001a",
    statusBg: "#1a0004",
    rank: "S",
    github: "https://github.com/aryan-saini-dev",
    tech: ["Python", "LangChain", "VectorDB", "OpenAI API"],
    detail: [
      { index: "01", title: "AI Research Project", status: "ONGOING" },
      { index: "02", title: "Self-correcting Pipeline", status: "ACTIVE" },
      { index: "03", title: "Vector Search Integration", status: "SCALED" },
      { index: "04", title: "Advanced Generation", status: "PROD" },
    ],
    images: [
      "/Project/Self Healing RAG/RAG-Thumbnail.jpg",
      "/Project/Self Healing RAG/rag system architecture.jpg",
    ],
    desc: "AI Research Project focusing on a self-correcting retrieval-augmented generation system. Uses LangChain and VectorDB to validate and automatically correct AI hallucinations before serving responses.",
  },
];

export default function ProjectsPage() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [viewedImageIdx, setViewedImageIdx] = useState(null);
  const navigate              = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (viewedImageIdx !== null) {
        // Lightbox navigation
        if (e.key === "Escape" || e.key === "Backspace") {
          setViewedImageIdx(null);
          window.playPersonaSound?.('cancel');
        }
        if (e.key === "ArrowLeft") {
          setViewedImageIdx(i => Math.max(0, i - 1));
          window.playPersonaSound?.('hover');
        }
        if (e.key === "ArrowRight") {
          setViewedImageIdx(i => Math.min((PROJECTS[active]?.images?.length || 1) - 1, i + 1));
          window.playPersonaSound?.('hover');
        }
        return;
      }
      
      // Main navigation
      if (e.key === "ArrowUp")    { setActive(i => Math.max(0, i - 1)); window.playPersonaSound?.('hover'); }
      if (e.key === "ArrowDown")  { setActive(i => Math.min(PROJECTS.length - 1, i + 1)); window.playPersonaSound?.('hover'); }
      if (e.key === "Enter")      { window.open(PROJECTS[active].github, "_blank"); window.playPersonaSound?.('link'); }
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, viewedImageIdx]);

  const proj = PROJECTS[active];

  return (
    <div id="menu-screen">
      {/* Background video horizontally flipped so Ann is on the left */}
      <LoopingVideo src={bgVideo} style={{ transform: "scaleX(-1)" }} />



      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400&display=swap');

        /* ── Entry circle reveal ── */
        .prj-entry-mask {
          position: absolute; inset: 0; z-index: -1; overflow: hidden;
          background: #c4001a;
          clip-path: circle(0 at 50% 50%);
          animation: prj-entry-reveal 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        @keyframes prj-entry-reveal {
          0% { clip-path: circle(0 at 50% 50%); opacity: 1; }
          70% { clip-path: circle(150vmax at 50% 50%); opacity: 1; }
          100% { clip-path: circle(150vmax at 50% 50%); opacity: 0; }
        }

        /* ── Scanlines ── */
        .prj-scanlines {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }

        /* ── Stripes ── */
        .prj-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:30; }
        .prj-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(196,0,26,0.22); z-index:30; }

        /* ── Two-column layout ── */
        .prj-layout {
          position: absolute; inset: 0; z-index: 10;
          display: flex;
          pointer-events: auto;
        }

        /* ── LEFT COLUMN ── */
        .prj-left {
          flex: 0 0 50%;
          display: flex; flex-direction: column;
          padding: 28px 0 28px 40px;
          gap: 0;
          justify-content: flex-end;
        }

        /* Page title */
        .prj-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(52px, 7vw, 88px);
          color: #fff; letter-spacing: 2px; line-height: 0.88;
          margin-bottom: 4px;
          opacity: 0; transform: translateX(-28px);
          transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
          pointer-events: none;
        }
        .prj-title.mounted { opacity: 1; transform: translateX(0); }
        .prj-title-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px; letter-spacing: 5px; color: #c4001a;
          margin-bottom: 20px;
          opacity: 0; transition: opacity 0.4s ease 0.38s;
        }
        .prj-title-sub.mounted { opacity: 1; }

        /* Bar list */
        .prj-bars {
          display: flex; flex-direction: column; gap: 8px;
          pointer-events: all;
        }

        .prj-bar-outer {
          position: relative; flex-shrink: 0;
          transform: translateX(-110%);
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
        }
        .prj-bar-outer.mounted { transform: translateX(0); }
        .prj-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .prj-bar-outer:nth-child(2) { transition-delay: 60ms; }
        .prj-bar-outer:nth-child(3) { transition-delay: 120ms; }
        .prj-bar-outer:nth-child(4) { transition-delay: 180ms; }
        .prj-bar-outer:nth-child(5) { transition-delay: 240ms; }

        /* Red underlay */
        .prj-bar-red {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-6px);
          opacity: 0; transition: opacity 0.2s ease, height 0.28s cubic-bezier(0.22,1,0.36,1);
          z-index: 0; pointer-events: none;
        }
        .prj-bar-outer.active .prj-bar-red { opacity: 1; height: 80px; }

        /* Main bar */
        .prj-bar {
          position: relative;
          width: 100%; height: 64px;
          background: #111;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          box-shadow: 0 6px 22px rgba(0,0,0,0.6);
          transition: height 0.28s cubic-bezier(0.22,1,0.36,1), background 0.2s ease;
          z-index: 1;
          overflow: hidden;
        }
        .prj-bar-outer.active .prj-bar { height: 80px; }

        /* White fill parallelogram */
        .prj-bar-fill {
          position: absolute; inset: 0;
          background: #fff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 28px) 100%, calc(100% - 28px) 100%);
          transition: clip-path 0.32s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }
        .prj-bar-outer.active .prj-bar-fill {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        /* Shadow strip under bar */
        .prj-bar::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 5px;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%);
          z-index: 10; pointer-events: none;
        }

        /* Content inside bar */
        .prj-bar-content {
          position: relative; z-index: 2; height: 100%;
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center;
          padding: 0 16px 0 16px;
          gap: 0;
        }

        .prj-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px; line-height: 1;
          color: #fff; transform: rotate(-22deg);
          user-select: none;
          transition: color 0.18s ease;
          justify-self: center;
        }
        .prj-bar-outer.active .prj-badge { color: #111 !important; }

        .prj-bar-mid {
          display: flex; flex-direction: column;
          justify-content: center; gap: 1px;
          padding-left: 8px;
          overflow: hidden;
        }
        .prj-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; letter-spacing: 3px; line-height: 1;
          color: rgba(255,255,255,0.9);
          transition: color 0.18s ease;
          user-select: none;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .prj-bar-outer.active .prj-label { color: #111 !important; }
        .prj-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px; letter-spacing: 2px;
          color: rgba(255,255,255,0.35);
          transition: color 0.18s ease;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .prj-bar-outer.active .prj-sub { color: rgba(0,0,0,0.4) !important; }

        .prj-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px; letter-spacing: 2px;
          padding: 3px 9px; border: 1px solid;
          clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
          flex-shrink: 0; user-select: none;
          white-space: nowrap;
          margin-left: 8px;
        }

        /* ── RIGHT COLUMN — detail panel ── */
        .prj-right {
          flex: 1;
          display: flex; align-items: flex-end;
          padding: 28px 52px 28px 18px;
        }

        @keyframes prj-panel-in {
          0%   { opacity: 0; transform: translateX(36px); }
          60%  { opacity: 1; transform: translateX(-3px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .prj-panel {
          width: 100%;
          background: linear-gradient(180deg, rgba(15,28,105,0.4) 0%, rgba(8,16,68,0.45) 100%);
          backdrop-filter: blur(8px);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133,244,255,0.16), 14px 14px 0 rgba(0,6,30,0.55);
          padding: 20px;
          animation: prj-panel-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
          overflow: hidden; position: relative;
          pointer-events: all;
        }
        .prj-panel::before {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(135deg, rgba(133,244,255,0.07) 0 14%, transparent 14% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.04), transparent 22%);
          pointer-events: none;
        }

        /* Panel header */
        .prj-panel-header {
          position: relative;
          display: grid; grid-template-columns: 52px 1fr auto;
          align-items: center; gap: 12px;
          min-height: 76px; padding: 0 16px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 8px 0 0 rgba(196,0,26,0.9);
          margin-bottom: 14px;
        }
        .prj-panel-num {
          font-family: 'Anton', sans-serif; font-size: 36px; line-height: 1;
        }
        .prj-panel-title {
          font-family: 'Anton', sans-serif; font-size: 30px;
          line-height: 0.92; letter-spacing: 1px;
        }
        .prj-panel-rank {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px; letter-spacing: 2px; line-height: 1;
        }

        /* Detail rows */
        .prj-panel-rows {
          display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;
        }
        .prj-panel-row {
          display: grid; grid-template-columns: 40px 1fr auto;
          align-items: center; gap: 10px; min-height: 46px; padding: 0 12px;
          background: rgba(8,18,72,0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140,239,255,0.1);
          transition: transform 0.14s ease, background 0.14s ease;
        }
        .prj-panel-row:hover { transform: translateX(3px); background: rgba(12,26,94,1); }
        .prj-panel-row-idx {
          font-family: 'Bebas Neue', sans-serif; font-size: 21px;
          letter-spacing: 1px; color: #94f4ff;
        }
        .prj-panel-row-title {
          font-family: 'Anton', sans-serif; font-size: 20px; line-height: 1; color: #f2fcff;
        }
        .prj-panel-row-status {
          font-family: 'Bebas Neue', sans-serif; font-size: 16px; line-height: 1;
          letter-spacing: 1px; color: #06133b;
          background: #8df6ff; padding: 5px 9px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 7px) 100%, 0 100%);
          white-space: nowrap;
        }

        /* Tech chips */
        .prj-panel-tech {
          padding: 12px; margin-bottom: 12px;
          background: rgba(5,13,57,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145,239,255,0.1);
        }
        .prj-panel-tech-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 3px; color: rgba(156,247,255,0.5);
          margin-bottom: 8px;
        }
        .prj-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .prj-chip {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px; letter-spacing: 1.5px;
          color: #9cf7ff; background: rgba(156,247,255,0.08);
          border: 1px solid rgba(156,247,255,0.25);
          padding: 3px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
        }

        .prj-panel-images {
          display: flex; gap: 12px; overflow-x: auto;
          margin-bottom: 12px; padding-bottom: 8px;
        }
        .prj-panel-images::-webkit-scrollbar { height: 3px; }
        .prj-panel-images::-webkit-scrollbar-thumb { background: rgba(156,247,255,0.4); border-radius: 2px; }
        .prj-panel-images::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .prj-panel-img {
          height: 85px; width: auto; flex-shrink: 0;
          border: 1px solid rgba(156,247,255,0.15);
          object-fit: cover; border-radius: 2px;
          opacity: 0.65; transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }
        .prj-panel-img:hover {
          opacity: 1; transform: scale(1.05);
          border-color: rgba(156,247,255,0.6);
        }

        /* ── Lightbox ── */
        .prj-lightbox {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(5, 8, 20, 0.92);
          backdrop-filter: blur(12px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          animation: prj-lb-in 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes prj-lb-in { from { opacity: 0; } to { opacity: 1; } }
        
        .prj-lb-img-container {
          position: relative;
          max-width: 85vw; max-height: 75vh;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(156,247,255,0.2);
          padding: 6px; background: rgba(255,255,255,0.03);
          border-radius: 4px;
        }
        .prj-lb-img {
          max-width: 100%; max-height: 70vh;
          object-fit: contain; display: block;
        }

        .prj-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          font-family: 'Bebas Neue', sans-serif; font-size: 40px;
          color: rgba(255,255,255,0.4); cursor: pointer;
          transition: color 0.2s, transform 0.2s;
          padding: 20px; user-select: none;
        }
        .prj-lb-nav:hover { color: #c4001a; transform: translateY(-50%) scale(1.2); }
        .prj-lb-prev { left: -80px; }
        .prj-lb-next { right: -80px; }

        .prj-lb-header {
          position: absolute; top: 30px; left: 40px;
          font-family: 'Anton', sans-serif; font-size: 30px; color: #fff;
          letter-spacing: 2px;
        }
        .prj-lb-counter {
          position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
          font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #9cf7ff;
          letter-spacing: 4px;
        }
        
        .prj-lb-close {
          position: absolute; top: 30px; right: 40px;
          font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #fff;
          cursor: pointer; transition: color 0.2s; letter-spacing: 2px;
          display: flex; align-items: center; gap: 8px;
        }
        .prj-lb-close:hover { color: #c4001a; }
        .prj-lb-key {
          border: 1px solid rgba(255,255,255,0.3); padding: 2px 8px; border-radius: 3px; font-size: 16px;
        }

        /* Desc */
        .prj-panel-desc {
          padding: 12px; margin-bottom: 12px;
          background: rgba(5,13,57,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145,239,255,0.1);
          font-family: 'Montserrat', sans-serif;
          font-weight: 300; font-size: 13px; line-height: 1.6;
          color: rgba(200,240,255,0.8);
        }

        /* GitHub CTA */
        .prj-panel-cta {
          padding: 13px 16px;
          background: rgba(196,0,26,0.14);
          border: 1px solid rgba(196,0,26,0.38);
          clip-path: polygon(0 0, 100% 0, calc(100% - 11px) 100%, 0 100%);
          display: flex; align-items: center; justify-content: space-between;
          cursor: pointer; transition: background 0.18s ease;
        }
        .prj-panel-cta:hover { background: rgba(196,0,26,0.26); }
        .prj-panel-cta-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px; letter-spacing: 3px; color: #fff;
        }
        .prj-panel-cta-arrow {
          font-size: 16px; color: #c4001a;
          animation: prj-arrow-pulse 0.8s ease-in-out infinite;
        }
        @keyframes prj-arrow-pulse {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.35; }
        }

        /* ── Footer ── */
        .prj-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 30; opacity: 0;
          transition: opacity 0.4s ease 0.55s;
        }
        .prj-footer.mounted { opacity: 1; }
        .prj-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .prj-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 5px; font-size: 10px;
        }

        /* ── RESPONSIVE STYLES ── */
        @media (max-width: 900px) {
          .prj-layout {
            flex-direction: column;
            overflow-y: auto;
            pointer-events: auto;
            padding-bottom: 80px;
          }
          .prj-left {
            flex: 0 0 auto;
            width: 100%;
            padding: 60px 10px 10px 10px;
          }
          .prj-right {
            flex: 0 0 auto;
            width: 100%;
            padding: 5px 10px 10px 10px;
          }
          .prj-title {
            font-size: clamp(22px, 8vw, 32px);
          }
          .prj-title-sub {
            font-size: 9px; margin-bottom: 8px;
          }
          .prj-badge {
            font-size: 20px;
          }
          .prj-label {
            font-size: 14px;
          }
          .prj-sub {
            font-size: 9px;
          }
          .prj-bar-outer {
            transform: translateX(0); /* remove off-screen anim on mobile if it bugs out */
          }
          .prj-panel {
            animation: none; /* simplify animation on mobile */
            padding: 12px;
          }
          .prj-panel-header-num { font-size: 18px; }
          .prj-panel-title { font-size: 16px; }
          .prj-panel-rank { font-size: 12px; padding: 2px 6px; }
          .prj-panel-header { min-height: 40px; padding: 0 10px; }
          .prj-panel-img-wrapper { height: 140px; margin-bottom: 10px; }
          .prj-panel-desc { font-size: 12px; padding: 8px; line-height: 1.4; }
          
          /* Fix Selection Effect on Mobile */
          .prj-bar-outer.active .prj-bar-fill {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }

          .prj-footer {
            display: none; /* Hide keyboard hints entirely on mobile */
          }
          .prj-stripe, .prj-stripe2 {
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
      <div className="prj-entry-mask" aria-hidden="true" />

      <div className="prj-scanlines" />
      <div className="prj-stripe" />
      <div className="prj-stripe2" />

      <div className="prj-layout">
        {/* ── LEFT ── */}
        <div className="prj-left">
          <div className={`prj-title${mounted ? " mounted" : ""}`}>
            PROJECT<br />ARCHIVE
          </div>
          <div className={`prj-title-sub${mounted ? " mounted" : ""}`}>
            — FEATURED WORKS · ↵ OPEN REPO —
          </div>

          <div className="prj-bars">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`prj-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
                onMouseEnter={() => { if (active !== i) window.playPersonaSound?.('hover'); setActive(i); }}
                onClick={() => { window.playPersonaSound?.('select'); setActive(i); }}
              >
                <div className="prj-bar-red" />
                <div className="prj-bar">
                  <div className="prj-bar-fill" />
                  <div className="prj-bar-content">
                    <div className="prj-badge">{p.badge}</div>
                    <div className="prj-bar-mid">
                      <div className="prj-label">{p.label}</div>
                      <div className="prj-sub">{p.subtitle}</div>
                    </div>
                    <div
                      className="prj-status"
                      style={{ color: p.statusColor, borderColor: p.statusColor, background: p.statusBg }}
                    >
                      {p.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="prj-right">
          <div className="prj-panel" key={active}>
            <div className="prj-panel-header">
              <div className="prj-panel-num">{proj.badge}</div>
              <div className="prj-panel-title">{proj.label}</div>
              <div className="prj-panel-rank">RANK {proj.rank}</div>
            </div>

            <div className="prj-panel-rows">
              {proj.detail.map(row => (
                <div className="prj-panel-row" key={row.index}>
                  <div className="prj-panel-row-idx">{row.index}</div>
                  <div className="prj-panel-row-title">{row.title}</div>
                  <div className="prj-panel-row-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="prj-panel-tech">
              <div className="prj-panel-tech-label">TECH STACK</div>
              <div className="prj-chips">
                {proj.tech.map(t => (
                  <div className="prj-chip" key={t}>{t}</div>
                ))}
              </div>
            </div>

            {proj.images && proj.images.length > 0 && (
              <div className="prj-panel-images">
                {proj.images.map((img, idx) => (
                  <img 
                    src={img} 
                    key={img} 
                    alt="" 
                    className="prj-panel-img" 
                    onClick={() => {
                      window.playPersonaSound?.('select');
                      setViewedImageIdx(idx);
                    }} 
                    style={{ cursor: 'pointer' }} 
                  />
                ))}
              </div>
            )}

            <div className="prj-panel-desc">{proj.desc}</div>

            <a
              className="prj-panel-cta"
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => window.playPersonaSound?.('hover')}
              onClick={() => { window.playPersonaSound?.('link'); }}
              style={{ textDecoration: 'none' }}
            >
              <div className="prj-panel-cta-label">VIEW REPOSITORY</div>
              <div className="prj-panel-cta-arrow">►</div>
            </a>
          </div>
        </div>
      </div>

      <div className={`prj-footer${mounted ? " mounted" : ""}`}>
        <div className="prj-footer-row"><span className="prj-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="prj-footer-row"><span className="prj-footer-key">↵</span><span>GITHUB</span></div>
        <div className="prj-footer-row"><span className="prj-footer-key">ESC</span><span>BACK</span></div>
      </div>

      {/* ── Lightbox Overlay ── */}
      {viewedImageIdx !== null && proj.images && (
        <div className="prj-lightbox">
          <div className="prj-lb-header">{proj.label}</div>
          
          <div className="prj-lb-close" onClick={() => { setViewedImageIdx(null); window.playPersonaSound?.('cancel'); }}>
            CLOSE ✖
          </div>

          <div className="prj-lb-img-container">
            {viewedImageIdx > 0 && (
              <div className="prj-lb-nav prj-lb-prev" onClick={() => { setViewedImageIdx(i => i - 1); window.playPersonaSound?.('hover'); }}>
                ◄
              </div>
            )}
            <img src={proj.images[viewedImageIdx]} className="prj-lb-img" alt="Enlarged" />
            {viewedImageIdx < proj.images.length - 1 && (
              <div className="prj-lb-nav prj-lb-next" onClick={() => { setViewedImageIdx(i => i + 1); window.playPersonaSound?.('hover'); }}>
                ►
              </div>
            )}
          </div>
          
          <div className="prj-lb-counter">
            {viewedImageIdx + 1} / {proj.images.length}
          </div>
        </div>
      )}
    </div>
  );
}
