import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoopingVideo from "./LoopingVideo";
import splashGif from "./assets/Additions/slide1_persona.gif";
import menuBg from "./assets/Additions/About_me.mp4";

// New Game Assets
import playerImg1 from "./assets/Game/main_char_1.png";
import playerImg2 from "./assets/Game/main_char_2.png";
import monsterImg1 from "./assets/Game/monster1.png";
import monsterImg2 from "./assets/Game/monster2.png";
import monsterImg3 from "./assets/Game/monster3.webp";

const PLAYERS = [playerImg1, playerImg2];
const MONSTERS = [monsterImg1, monsterImg2, monsterImg3];

const SHADOW_MAX_HP = 100;
const PLAYER_MAX_HP = 100;

export default function RpsGame() {
  const navigate = useNavigate();
  // States: SPLASH, MENU, SELECT_PLAYER, SELECT_MONSTER, TRANSITION, BATTLE, RESOLVE, WIN, LOSE
  const [gameState, setGameState] = useState("SPLASH"); 
  
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [selectedMonster, setSelectedMonster] = useState(0);

  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [shadowHp, setShadowHp] = useState(SHADOW_MAX_HP);
  
  // Battle visual states
  const [actionLog, setActionLog] = useState("");
  const [showDamage, setShowDamage] = useState(null); 
  const [screenShake, setScreenShake] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  
  // Custom VFX trigger: 'ATTACK', 'GUARD', 'MAGIC', 'CLASH', null
  const [vfxType, setVfxType] = useState(null);
  const [vfxTarget, setVfxTarget] = useState(null); // 'player' or 'shadow' or 'both'

  const [animatingPlayer, setAnimatingPlayer] = useState(false);
  const [animatingShadow, setAnimatingShadow] = useState(false);
  
  // Menu active index
  const [menuIndex, setMenuIndex] = useState(0); // 0: ATTACK, 1: GUARD, 2: MAGIC
  const MOVES = ["ATTACK", "GUARD", "MAGIC"];

  const playSound = (sound) => {
    window.playPersonaSound?.(sound);
  };

  // Keyboard Navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Backspace") {
        if (gameState === "MENU" || gameState === "SPLASH") {
          playSound('cancel');
          navigate(-1);
        } else if (gameState === "SELECT_PLAYER") {
          playSound('cancel');
          setGameState("MENU");
        } else if (gameState === "SELECT_MONSTER") {
          playSound('cancel');
          setGameState("SELECT_PLAYER");
        } else if (gameState === "BATTLE" || gameState === "WIN" || gameState === "LOSE") {
          setGameState("MENU");
          playSound('cancel');
        }
      }
      
      if (gameState === "SPLASH" && e.key === "Enter") {
        playSound('select');
        setGameState("MENU");
      }

      if (gameState === "SELECT_PLAYER") {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          setSelectedPlayer(prev => (prev - 1 + PLAYERS.length) % PLAYERS.length);
          playSound('hover');
        }
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          setSelectedPlayer(prev => (prev + 1) % PLAYERS.length);
          playSound('hover');
        }
        if (e.key === "Enter") {
          playSound('select');
          setGameState("SELECT_MONSTER");
        }
      }

      if (gameState === "SELECT_MONSTER") {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          setSelectedMonster(prev => (prev - 1 + MONSTERS.length) % MONSTERS.length);
          playSound('hover');
        }
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          setSelectedMonster(prev => (prev + 1) % MONSTERS.length);
          playSound('hover');
        }
        if (e.key === "Enter") {
          playSound('select');
          handleStartBattle();
        }
      }

      if (gameState === "BATTLE") {
        if (e.key === "ArrowUp") {
          setMenuIndex(prev => (prev - 1 + MOVES.length) % MOVES.length);
          playSound('hover');
        }
        if (e.key === "ArrowDown") {
          setMenuIndex(prev => (prev + 1) % MOVES.length);
          playSound('hover');
        }
        if (e.key === "Enter") {
          handleCommand(MOVES[menuIndex]);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameState, navigate, menuIndex]);

  const handleStartBattle = () => {
    playSound('select');
    setGameState("TRANSITION");
    
    setTimeout(() => {
      setPlayerHp(PLAYER_MAX_HP);
      setShadowHp(SHADOW_MAX_HP);
      setActionLog("COMMENCE HOSTILITIES.");
      setMenuIndex(0);
      setGameState("BATTLE");
    }, 1200);
  };

  const triggerImpact = (isCritical, target, moveUsed) => {
    setScreenFlash(true);
    setScreenShake(true);
    setVfxType(moveUsed);
    setVfxTarget(target);

    if(target === 'shadow' || target === 'both') setAnimatingShadow(true);
    if(target === 'player' || target === 'both') setAnimatingPlayer(true);
    
    if(isCritical) playSound('select'); 
    else playSound('hover');

    setTimeout(() => {
      setScreenFlash(false);
      setScreenShake(false);
      setAnimatingPlayer(false);
      setAnimatingShadow(false);
      setVfxType(null);
      setVfxTarget(null);
    }, 450);
  };

  const handleCommand = (playerMove) => {
    if (gameState !== "BATTLE" || playerHp <= 0 || shadowHp <= 0) return;
    playSound('select');
    setGameState("RESOLVE");
    
    const shadowMove = MOVES[Math.floor(Math.random() * MOVES.length)];
    
    let result = "";
    let pDamage = 0;
    let sDamage = 0;
    
    setTimeout(() => {
      if (playerMove === shadowMove) {
        result = `CLASH! Both used ${shadowMove}`;
        setActionLog(result);
        triggerImpact(false, 'both', 'CLASH');
      } else if (
        (playerMove === "ATTACK" && shadowMove === "MAGIC") ||
        (playerMove === "GUARD" && shadowMove === "ATTACK") ||
        (playerMove === "MAGIC" && shadowMove === "GUARD")
      ) {
        result = `WEAK! Shadow's ${shadowMove} was crushed.`;
        sDamage = Math.floor(Math.random() * 20) + 25; 
        setActionLog(result);
        setShowDamage({ target: 'shadow', val: sDamage, type: 'CRITICAL' });
        triggerImpact(true, 'shadow', playerMove);
      } else {
        result = `CRITICAL! Shadow's ${shadowMove} broke your defense.`;
        pDamage = Math.floor(Math.random() * 20) + 25; 
        setActionLog(result);
        setShowDamage({ target: 'player', val: pDamage, type: 'WEAK' });
        triggerImpact(true, 'player', shadowMove);
      }

      setTimeout(() => {
        setPlayerHp(prev => {
          const next = Math.max(0, prev - pDamage);
          if (next === 0) setTimeout(() => setGameState("LOSE"), 1500);
          return next;
        });
        setShadowHp(prev => {
          const next = Math.max(0, prev - sDamage);
          if (next === 0) setTimeout(() => setGameState("WIN"), 1500);
          return next;
        });
        
        setShowDamage(null);
        
        setTimeout(() => {
          setGameState(state => (state === "WIN" || state === "LOSE") ? state : "BATTLE");
        }, 800);
      }, 400);

    }, 300);
  };

  return (
    <div id="menu-screen" className={screenShake ? "shake-intense" : ""} style={{ background: "#050505", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400;700;900&family=Share+Tech+Mono&display=swap');
        
        .shake-intense { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-4px, 2px, 0); }
          20%, 80% { transform: translate3d(5px, -5px, 0) scale(1.02); }
          30%, 50%, 70% { transform: translate3d(-8px, 6px, 0); }
          40%, 60% { transform: translate3d(8px, -4px, 0) scale(1.05); }
        }

        .screen-flash {
          position: absolute; inset: 0; background: #fff; z-index: 99;
          animation: flash 0.4s ease forwards; pointer-events: none;
        }
        @keyframes flash { 0% { opacity: 0.8; } 100% { opacity: 0; } }

        .glass-shatter {
          position: absolute; inset: 0; z-index: 100; background: #c4001a;
          clip-path: polygon(50% 50%, 50% 50%, 50% 50%);
          animation: shatterAnim 1.2s cubic-bezier(0.85, 0, 0.15, 1) forwards; pointer-events: none;
        }
        @keyframes shatterAnim {
          0% { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); opacity: 0; }
          20% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
          40% { clip-path: polygon(10% 0, 90% 0, 100% 90%, 0 100%); background: #000; }
          70% { clip-path: polygon(50% -20%, 120% 50%, 50% 120%, -20% 50%); opacity: 1; }
          100% { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); opacity: 0; }
        }

        .rps-splash { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; }
        .rps-splash-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; z-index: -1; }
        .rps-splash-text-wrap {
          position: relative; display: inline-block; transform: skewX(-10deg);
          animation: pulse 1.5s infinite; cursor: pointer;
          margin-top: 100px; /* Push it down a bit to not cover the center entirely */
        }
        .rps-splash-text-bg {
          position: absolute; inset: -15px -40px; background: #000; z-index: -1;
          border: 5px solid #c4001a; box-shadow: 15px 15px 0 rgba(196,0,26,0.5);
        }
        .rps-splash-text {
          font-family: 'Anton', sans-serif; font-size: 100px; color: #fff;
          line-height: 1; letter-spacing: 6px; margin: 0;
          text-shadow: 4px 4px 0 #c4001a, -2px -2px 0 #000;
        }
        .rps-splash-sub {
          font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #9cf7ff;
          letter-spacing: 10px; text-align: center; margin-top: 10px;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1) skewX(-10deg); } 50% { opacity: 0.8; transform: scale(0.96) skewX(-10deg); } }

        .rps-menu { position: absolute; inset: 0; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .rps-menu-title {
          font-family: 'Anton', sans-serif; font-size: 100px; color: #fff; margin-bottom: 40px; text-shadow: 6px 6px 0 #c4001a, -2px -2px 0 #000; transform: rotate(-3deg);
        }
        .rps-btn {
          font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: #fff;
          background: rgba(0, 0, 0, 0.8); padding: 15px 60px; border: 3px solid #c4001a;
          clip-path: polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%);
          cursor: pointer; transition: all 0.2s cubic-bezier(0.22,1,0.36,1); margin: 10px; box-shadow: 10px 10px 0 rgba(196,0,26,0.3);
        }
        .rps-btn:hover { background: #c4001a; color: #fff; border-color: #fff; transform: scale(1.05) translateX(10px); box-shadow: 0px 0px 0 rgba(196,0,26,0); }

        /* ── SELECTION UI ── */
        .rps-selection {
          position: absolute; inset: 0; z-index: 20; background: rgba(0,0,0,0.85);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .sel-title { font-family: 'Anton', sans-serif; font-size: 80px; color: #fff; text-shadow: 4px 4px 0 #c4001a; transform: skewX(-5deg); margin-bottom: 40px; }
        .sel-carousel { display: flex; align-items: center; gap: 40px; }
        .sel-item {
          width: 300px; height: 400px; border: 4px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.5);
          display: flex; justify-content: center; align-items: flex-end; padding: 20px;
          cursor: pointer; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); filter: grayscale(100%);
          clip-path: polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
        }
        .sel-item.active {
          border-color: #c4001a; filter: grayscale(0%); transform: scale(1.1); box-shadow: 0 0 30px rgba(196,0,26,0.6);
        }
        .sel-img { max-width: 100%; max-height: 100%; object-fit: contain; filter: drop-shadow(5px 5px 0 #000); }

        /* ── BATTLE ARENA ── */
        .rps-battle { position: absolute; inset: 0; z-index: 10; background: radial-gradient(circle at center, #111 0%, #000 100%); }
        .rps-battle-bg {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(45deg, rgba(156,247,255,0.03) 0px, rgba(156,247,255,0.03) 2px, transparent 2px, transparent 15px);
          z-index: -1; animation: slideBg 15s linear infinite; opacity: 0.5;
        }
        @keyframes slideBg { from { background-position: 0 0; } to { background-position: -200px 200px; } }
        .rps-bg-slash {
          position: absolute; top: -50%; right: -20%; width: 150%; height: 200%;
          background: linear-gradient(90deg, transparent, rgba(196,0,26,0.1), transparent);
          transform: rotate(35deg); pointer-events: none; z-index: 0;
        }

        .rps-chars { position: absolute; inset: 0; display: flex; justify-content: space-between; align-items: flex-end; padding: 0 10%; z-index: 1; pointer-events: none; }
        .rps-sprite { height: 80vh; max-height: 800px; object-fit: contain; filter: drop-shadow(10px 10px 0 rgba(0,0,0,0.8)); animation: breath 4s ease-in-out infinite; transition: transform 0.1s; }
        .rps-sprite.player { transform-origin: bottom left; }
        .rps-sprite.shadow { transform-origin: bottom right; animation-delay: -2s; filter: drop-shadow(-10px 10px 0 rgba(196,0,26,0.5)); }
        .rps-sprite.hit { filter: brightness(2) drop-shadow(0 0 20px #c4001a) blur(2px); transform: scale(1.1) rotate(-5deg); }
        @keyframes breath { 0%, 100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(-15px) scaleY(1.02); } }

        .rps-hud-top { position: absolute; top: 30px; left: 30px; right: 30px; display: flex; justify-content: space-between; z-index: 5; pointer-events: none; }
        .rps-hud-box { background: rgba(0,0,0,0.85); padding: 15px 25px 25px; border: 3px solid #fff; position: relative; min-width: 300px; box-shadow: 10px 10px 0 rgba(156,247,255,0.2); }
        .rps-hud-box.left { clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%); transform: skewX(-5deg); }
        .rps-hud-box.right { clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%); transform: skewX(5deg); box-shadow: -10px 10px 0 rgba(196,0,26,0.3); }
        .rps-hp-name { font-family: 'Anton', sans-serif; font-size: 28px; color: #fff; margin-bottom: 8px; letter-spacing: 2px; }
        .rps-hp-bar-bg { width: 100%; height: 20px; background: #222; border-bottom: 2px solid rgba(255,255,255,0.3); }
        .rps-hp-bar-fill { height: 100%; transition: width 0.4s cubic-bezier(0.22,1,0.36,1); box-shadow: 0 0 10px currentColor; }
        .fill-blue { background: #9cf7ff; color: #9cf7ff; }
        .fill-red { background: #c4001a; color: #c4001a; }
        .rps-hp-val { font-family: 'Anton', sans-serif; font-size: 32px; color: #fff; position: absolute; bottom: 5px; text-shadow: 2px 2px 0 #000; }

        /* ── VISUAL TACTIC CYCLE SVG ── */
        .rps-cycle-ui {
          position: absolute; top: 180px; left: 30px; z-index: 5;
          width: 200px; height: 200px;
          filter: drop-shadow(5px 5px 0 rgba(0,0,0,0.8));
          pointer-events: none;
        }

        .rps-cine-log { position: absolute; top: 40%; left: 0; width: 100%; text-align: center; z-index: 6; pointer-events: none; }
        .rps-cine-text {
          display: inline-block; background: #000; color: #fff; font-family: 'Anton', sans-serif; font-size: 36px; padding: 10px 40px;
          border: 3px solid #c4001a; transform: skewX(-10deg) rotate(-2deg); box-shadow: 15px 15px 0 rgba(196,0,26,0.5);
          animation: logIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes logIn { from { transform: scale(0.5) skewX(-10deg) rotate(-10deg); opacity: 0; } to { transform: scale(1) skewX(-10deg) rotate(-2deg); opacity: 1; } }

        .rps-dmg-wrap { position: absolute; font-family: 'Anton', sans-serif; z-index: 20; pointer-events: none; animation: dmgFly 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .rps-dmg-num { font-size: 120px; line-height: 0.8; }
        .rps-dmg-type { font-size: 40px; text-transform: uppercase; margin-top: -10px; }
        .dmg-player { color: #fff; text-shadow: 5px 5px 0 #c4001a, -2px -2px 0 #000; left: 25%; top: 30%; transform: rotate(-8deg); }
        .dmg-shadow { color: #9cf7ff; text-shadow: 5px 5px 0 #000; right: 25%; top: 30%; transform: rotate(8deg); }
        @keyframes dmgFly { 0% { transform: scale(0.2) translateY(50px) rotate(0); opacity: 0; } 20% { transform: scale(1.3) translateY(-30px); opacity: 1; } 100% { transform: scale(1) translateY(-60px); opacity: 0; } }

        .rps-menu-wheel { position: absolute; bottom: 40px; right: 40px; z-index: 10; display: flex; flex-direction: column; align-items: flex-end; gap: 15px; }
        .rps-wheel-btn {
          font-family: 'Anton', sans-serif; font-size: 54px; color: rgba(255,255,255,0.4); background: transparent; border: none; cursor: pointer;
          transform-origin: right center; transition: all 0.2s; text-align: right; line-height: 0.9; position: relative; text-shadow: 2px 2px 0 #000;
        }
        .rps-wheel-btn.active { color: #fff; transform: scale(1.2) translateX(-20px); text-shadow: 6px 6px 0 #c4001a, -2px -2px 0 #000; }
        .rps-wheel-btn:hover:not(.active) { color: #9cf7ff; transform: translateX(-10px); }
        .rps-wheel-sub { position: absolute; right: -10px; top: -10px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: #9cf7ff; background: #000; padding: 2px 6px; border: 1px solid #9cf7ff; opacity: 0; transition: opacity 0.2s; transform: rotate(5deg); }
        .rps-wheel-btn.active .rps-wheel-sub { opacity: 1; }

        .rps-result { position: absolute; inset: 0; background: rgba(0,0,0,0.95); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 50; }
        .rps-result-title { font-family: 'Anton', sans-serif; font-size: 180px; line-height: 0.8; color: #fff; margin-bottom: 40px; transform: skewX(-10deg); animation: stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .win-title { text-shadow: 15px 15px 0 #f6b300, -5px -5px 0 #000; }
        .lose-title { text-shadow: 15px 15px 0 #c4001a, -5px -5px 0 #000; }
        @keyframes stamp { 0% { transform: scale(3) skewX(-10deg); opacity: 0; } 100% { transform: scale(1) skewX(-10deg); opacity: 1; } }

        .mobile-back-btn { display: flex; position: absolute; top: 15px; left: 15px; z-index: 100; background: #c4001a; color: white; font-family: 'Bebas Neue', sans-serif; font-size: 16px; padding: 6px 12px; border-radius: 4px; align-items: center; gap: 4px; box-shadow: 2px 2px 0 rgba(0,0,0,0.5); cursor: pointer; }

        @media (max-width: 900px) {
          .rps-menu-title { font-size: 50px; text-align: center; margin-top: -60px; }
          .rps-hud-top { flex-direction: column; gap: 8px; top: 50px; left: 10px; right: 10px; }
          .rps-hud-box { min-width: 0; padding: 6px 12px; }
          .rps-hp-name { font-size: 16px; margin-bottom: 2px; }
          .rps-hp-val { font-size: 20px; position: relative; bottom: 0; float: right; margin-top: 2px; }
          .rps-cycle-ui { transform: scale(0.6); top: -20px; left: -20px; } /* Shrink cycle UI */
          
          .rps-chars { padding: 0; justify-content: center; align-items: center; bottom: 140px; top: auto; height: 35vh; }
          .rps-sprite { position: absolute; height: 35vh; opacity: 0.9; }
          .rps-sprite.player { left: 5%; z-index: 2; }
          .rps-sprite.shadow { right: 5%; z-index: 1; }
          
          /* Horizontal row layout for the action buttons */
          .rps-menu-wheel {
            flex-direction: row; justify-content: space-between; align-items: center;
            bottom: 20px; left: 10px; right: 10px; width: auto; gap: 10px;
          }
          .rps-wheel-btn {
            font-size: 24px; text-align: center; background: rgba(0,0,0,0.85);
            border: 2px solid #fff; padding: 8px 10px; flex: 1;
            clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
            transform: skewX(-5deg); text-shadow: none;
          }
          .rps-wheel-btn.active {
            transform: scale(1.1) skewX(-5deg); background: #c4001a; border-color: #c4001a;
            text-shadow: 2px 2px 0 #000;
          }
          .rps-wheel-sub {
            font-size: 12px; right: 50%; top: -15px; transform: translateX(50%) rotate(0);
          }
          
          .rps-cine-log { top: 30%; }
          .rps-cine-text { font-size: 18px; padding: 6px 16px; }
          .rps-dmg-num { font-size: 60px; }
          .rps-dmg-type { font-size: 24px; margin-top: -5px; }
          .rps-result-title { font-size: 60px; text-align: center; }

          .sel-title { font-size: 50px; }
          .sel-carousel { flex-direction: column; gap: 20px; }
          .sel-item { width: 200px; height: 250px; }
        }
      `}</style>

      {screenFlash && <div className="screen-flash" />}
      {gameState === "TRANSITION" && <div className="glass-shatter" />}

      <div className="mobile-back-btn" onClick={() => { playSound('cancel'); navigate(-1); }}>◄ BACK</div>

      {gameState === "SPLASH" && (
        <div className="rps-splash" onClick={() => { playSound('select'); setGameState("MENU"); }}>
          <img src={splashGif} className="rps-splash-bg" alt="" />
          <div className="rps-splash-text-wrap">
            <div className="rps-splash-text-bg" />
            <div className="rps-splash-text">PRESS ENTER</div>
            <div className="rps-splash-sub">SYSTEM STANDBY</div>
          </div>
        </div>
      )}

      {gameState === "MENU" && (
        <>
          <LoopingVideo src={menuBg} opacity={0.6} />
          <div className="rps-menu">
            <div className="rps-menu-title">TARTARUS ASSAULT</div>
            <button className="rps-btn" onClick={() => setGameState("SELECT_PLAYER")}>INITIATE COMBAT</button>
            <button className="rps-btn" onClick={() => navigate(-1)}>RETREAT</button>
          </div>
        </>
      )}

      {/* CHARACTER SELECT */}
      {gameState === "SELECT_PLAYER" && (
        <div className="rps-selection">
          <div className="sel-title">SELECT OPERATIVE</div>
          <div className="sel-carousel">
            {PLAYERS.map((img, i) => (
              <div key={i} className={`sel-item ${selectedPlayer === i ? 'active' : ''}`}
                   onClick={() => { setSelectedPlayer(i); playSound('select'); setGameState("SELECT_MONSTER"); }}
                   onMouseEnter={() => { if(selectedPlayer !== i) playSound('hover'); setSelectedPlayer(i); }}>
                <img src={img} className="sel-img" alt="" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MONSTER SELECT */}
      {gameState === "SELECT_MONSTER" && (
        <div className="rps-selection">
          <div className="sel-title">SELECT TARGET</div>
          <div className="sel-carousel" style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {MONSTERS.map((img, i) => (
              <div key={i} className={`sel-item ${selectedMonster === i ? 'active' : ''}`}
                   style={{ width: '220px', height: '280px' }}
                   onClick={() => { setSelectedMonster(i); handleStartBattle(); }}
                   onMouseEnter={() => { if(selectedMonster !== i) playSound('hover'); setSelectedMonster(i); }}>
                <img src={img} className="sel-img" alt="" />
              </div>
            ))}
          </div>
        </div>
      )}

      {(gameState === "BATTLE" || gameState === "RESOLVE" || gameState === "WIN" || gameState === "LOSE") && (
        <div className="rps-battle">
          <div className="rps-battle-bg" />
          <div className="rps-bg-slash" />
          
          <div className="rps-hud-top">
            <div className="rps-hud-box left">
              <div className="rps-hp-name">OPERATIVE</div>
              <div className="rps-hp-bar-bg"><div className="rps-hp-bar-fill fill-blue" style={{ width: `${(playerHp/PLAYER_MAX_HP)*100}%` }} /></div>
              <div className="rps-hp-val" style={{ right: 25 }}>{playerHp}</div>
            </div>
            <div className="rps-hud-box right">
              <div className="rps-hp-name" style={{ textAlign: 'right' }}>SHADOW</div>
              <div className="rps-hp-bar-bg"><div className="rps-hp-bar-fill fill-red" style={{ width: `${(shadowHp/SHADOW_MAX_HP)*100}%`, marginLeft: 'auto' }} /></div>
              <div className="rps-hp-val" style={{ left: 25 }}>{shadowHp}</div>
            </div>
          </div>

          {/* Glowing SVG Tactic Cycle */}
          <div className="rps-cycle-ui">
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <defs>
                <filter id="glowCycle"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              {/* Triangle Lines */}
              <polygon points="100,20 180,150 20,150" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
              {/* Directional Arrows */}
              <path d="M 140 85 L 150 100 L 130 100 Z" fill="#c4001a" transform="rotate(30 140 85)" />
              <path d="M 100 150 L 110 140 L 90 140 Z" fill="#9cf7ff" transform="rotate(-90 100 150)" />
              <path d="M 60 85 L 50 100 L 70 100 Z" fill="#f6b300" transform="rotate(-30 60 85)" />
              
              {/* Nodes */}
              <circle cx="100" cy="20" r="18" fill="#111" stroke="#c4001a" strokeWidth="3" filter="url(#glowCycle)" />
              <text x="100" y="25" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Anton">ATK</text>
              
              <circle cx="180" cy="150" r="18" fill="#111" stroke="#9cf7ff" strokeWidth="3" filter="url(#glowCycle)" />
              <text x="180" y="155" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Anton">MAG</text>
              
              <circle cx="20" cy="150" r="18" fill="#111" stroke="#f6b300" strokeWidth="3" filter="url(#glowCycle)" />
              <text x="20" y="155" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Anton">GRD</text>
            </svg>
          </div>

          <div className="rps-chars">
            <img src={PLAYERS[selectedPlayer]} className={`rps-sprite player ${animatingPlayer ? 'hit' : ''}`} alt="" />
            <img src={MONSTERS[selectedMonster]} className={`rps-sprite shadow ${animatingShadow ? 'hit' : ''}`} alt="" />
            
            {/* ADVANCED FRAMER MOTION VFX */}
            <AnimatePresence>
              {vfxType === 'ATTACK' && (
                <motion.div
                  key="vfx-attack"
                  initial={{ scaleX: 0, scaleY: 0, rotate: vfxTarget === 'player' ? -45 : 45, opacity: 0 }}
                  animate={{ scaleX: [0, 5, 2], scaleY: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    position: 'absolute', top: '40%', left: vfxTarget === 'player' ? '20%' : '60%',
                    width: '300px', height: '15px', background: '#fff',
                    boxShadow: '0 0 50px #c4001a, 0 0 20px #fff',
                    transformOrigin: 'center', zIndex: 10, pointerEvents: 'none'
                  }}
                />
              )}
              {vfxType === 'MAGIC' && (
                <motion.div
                  key="vfx-magic"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 3, 4], opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    position: 'absolute', top: '30%', left: vfxTarget === 'player' ? '10%' : '50%',
                    width: '200px', height: '200px', borderRadius: '50%',
                    border: '10px solid #9cf7ff', background: 'radial-gradient(circle, rgba(156,247,255,0.8) 0%, transparent 70%)',
                    boxShadow: '0 0 50px #9cf7ff',
                    transformOrigin: 'center', zIndex: 10, pointerEvents: 'none'
                  }}
                />
              )}
              {vfxType === 'GUARD' && (
                <motion.div
                  key="vfx-guard"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.2, 1.5], opacity: [0, 1, 0], clipPath: ['polygon(0 0, 100% 0, 100% 100%, 0 100%)', 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)'] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    position: 'absolute', top: '30%', left: vfxTarget === 'player' ? '10%' : '50%',
                    width: '150px', height: '250px', background: 'rgba(246,179,0,0.6)',
                    border: '5px solid #f6b300',
                    boxShadow: '0 0 50px #f6b300',
                    transformOrigin: 'center', zIndex: 10, pointerEvents: 'none'
                  }}
                />
              )}
              {vfxType === 'CLASH' && (
                <motion.div
                  key="vfx-clash"
                  initial={{ scale: 0, rotate: 0, opacity: 0 }}
                  animate={{ scale: [0, 2, 0], rotate: 180, opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    position: 'absolute', top: '40%', left: '40%',
                    width: '200px', height: '200px', background: 'url("data:image/svg+xml;utf8,<svg viewBox=\\"0 0 100 100\\" xmlns=\\"http://www.w3.org/2000/svg\\"><polygon points=\\"50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40\\" fill=\\"white\\"/></svg>")',
                    backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
                    filter: 'drop-shadow(0 0 20px #fff)', zIndex: 10, pointerEvents: 'none'
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {actionLog && <div className="rps-cine-log"><div className="rps-cine-text" key={actionLog}>{actionLog}</div></div>}

          {showDamage && (
            <div className={`rps-dmg-wrap ${showDamage.target === 'player' ? 'dmg-player' : 'dmg-shadow'}`} key={showDamage.val}>
              <div className="rps-dmg-num">{showDamage.val}</div>
              <div className="rps-dmg-type">{showDamage.type}</div>
            </div>
          )}

          <div className="rps-menu-wheel">
            {MOVES.map((move, i) => (
              <button 
                key={move} className={`rps-wheel-btn ${menuIndex === i ? 'active' : ''}`}
                onMouseEnter={() => { if(gameState === "BATTLE" && menuIndex !== i) { setMenuIndex(i); playSound('hover'); } }}
                onClick={() => { if(gameState === "BATTLE") handleCommand(move); }}
              >
                {move}
                <div className="rps-wheel-sub">{move === 'ATTACK' ? 'ROCK' : move === 'GUARD' ? 'PAPER' : 'SCISSORS'}</div>
              </button>
            ))}
          </div>

          {gameState === "WIN" && (
            <div className="rps-result" onClick={() => setGameState("MENU")}>
              <div className="rps-result-title win-title">VICTORY</div>
              <button className="rps-btn">RETURN TO MENU</button>
            </div>
          )}
          
          {gameState === "LOSE" && (
            <div className="rps-result" onClick={() => setGameState("MENU")}>
              <div className="rps-result-title lose-title">ANNIHILATED</div>
              <button className="rps-btn">RETRY</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
