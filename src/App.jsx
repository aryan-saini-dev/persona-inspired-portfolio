import React, { Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import main2 from './assets/main2.mp4'

// Initial synchronous imports (Needed immediately on load)
import P3Menu from './P3Menu'
import BackgroundMusic from './BackgroundMusic'
import PageTransition from './PageTransition'
import IntroLoopVideo from './IntroLoopVideo'
import menuIntro from './assets/Additions/mainn_part1.mp4'
import menuLoop from './assets/Additions/mainn_part2.mp4'
import './App.css'

// Lazy-loaded routes (Loaded only when navigated to)
const AboutMe = React.lazy(() => import('./AboutMe'))
const ResumePage = React.lazy(() => import('./ResumePage'))
const ProjectsPage = React.lazy(() => import('./ProjectsPage'))
const ContactPage = React.lazy(() => import('./ContactPage'))
const AchievementsPage = React.lazy(() => import('./AchievementsPage'))
const YaminokiritoPage = React.lazy(() => import('./YaminokiritoPage'))
const ExperiencePage = React.lazy(() => import('./ExperiencePage'))
const SpecialityPage = React.lazy(() => import('./SpecialityPage'))
const RpsGame = React.lazy(() => import('./RpsGame'))

// Fallback loader while lazy chunks are downloading
function PersonaLoader() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        .loading-text { font-family: 'Anton', sans-serif; font-size: 40px; color: #fff; letter-spacing: 4px; animation: pulse 1s infinite; transform: skewX(-10deg); }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
      <div className="loading-text">LOADING...</div>
    </div>
  );
}

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <IntroLoopVideo introSrc={menuIntro} loopSrc={menuLoop} className="main-menu-video" />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about">
            <Suspense fallback={<PersonaLoader />}><AboutMe /></Suspense>
          </PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition>
            <Suspense fallback={<PersonaLoader />}><ResumePage src={main2} /></Suspense>
          </PageTransition>
        } />
        <Route path="/speciality" element={
          <PageTransition>
            <Suspense fallback={<PersonaLoader />}><SpecialityPage /></Suspense>
          </PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition>
            <Suspense fallback={<PersonaLoader />}><ProjectsPage /></Suspense>
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition variant="about">
            <Suspense fallback={<PersonaLoader />}><ContactPage /></Suspense>
          </PageTransition>
        } />
        <Route path="/achievements" element={
          <PageTransition>
            <Suspense fallback={<PersonaLoader />}><AchievementsPage /></Suspense>
          </PageTransition>
        } />
        <Route path="/yaminokirito" element={<Navigate to="/instagram" replace />} />
        <Route path="/instagram" element={
          <PageTransition>
            <Suspense fallback={<PersonaLoader />}><YaminokiritoPage /></Suspense>
          </PageTransition>
        } />
        <Route path="/experience" element={
          <PageTransition>
            <Suspense fallback={<PersonaLoader />}><ExperiencePage /></Suspense>
          </PageTransition>
        } />
        <Route path="/socials" element={<Navigate to="/contact" replace />} />
        <Route path="/game" element={
          <PageTransition>
            <Suspense fallback={<PersonaLoader />}><RpsGame /></Suspense>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <AnimatedRoutes />
      <BackgroundMusic />
    </>
  )
}
