import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import main2 from './assets/main2.mp4'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import AboutMe from './AboutMe'
import BackgroundMusic from './BackgroundMusic'
import ProjectsPage from './ProjectsPage'
import ContactPage from './ContactPage'
import AchievementsPage from './AchievementsPage'
import YaminokiritoPage from './YaminokiritoPage'
import ExperiencePage from './ExperiencePage'
import SpecialityPage from './SpecialityPage'
import LoopingVideo from './LoopingVideo'
import IntroLoopVideo from './IntroLoopVideo'
import menuIntro from './assets/Additions/mainn_part1.mp4'
import menuLoop from './assets/Additions/mainn_part2.mp4'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <IntroLoopVideo introSrc={menuIntro} loopSrc={menuLoop} />
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
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/speciality" element={
          <PageTransition><SpecialityPage /></PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition><ProjectsPage /></PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition variant="about"><ContactPage /></PageTransition>
        } />
        <Route path="/achievements" element={
          <PageTransition><AchievementsPage /></PageTransition>
        } />
        <Route path="/yaminokirito" element={<Navigate to="/instagram" replace />} />
        <Route path="/instagram" element={
          <PageTransition><YaminokiritoPage /></PageTransition>
        } />
        <Route path="/experience" element={
          <PageTransition><ExperiencePage /></PageTransition>
        } />
        <Route path="/socials" element={<Navigate to="/contact" replace />} />
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
