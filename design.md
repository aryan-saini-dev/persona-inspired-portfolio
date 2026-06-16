# Persona 3 Inspired Portfolio Design Document

This document provides a comprehensive breakdown of the design aesthetic, formulas, architectural structure, and component implementation of the **Persona 3 Inspired Portfolio**.

## 1. Core Concept & Aesthetic Formula

The application is heavily inspired by the UI/UX design of **Persona 3 Reload / Persona 3**. The defining characteristics are sharp angles, high-contrast colors, dynamic asymmetrical shapes, and high-energy interactive feedback.

### The Aesthetic Formula
- **Color Palette**: 
  - Dominant colors: Deep Blacks (`#000`, `#111`), Pure White (`#fff`).
  - High-energy accents: Crimson Reds (`#c4001a`, `#e03d31`), Cyan/Ice Blues (`#9cf7ff`, `#53edff`, `#00dff7`), Deep Navy/Indigo (`#0b113d`, `#00184c`).
- **Typography**: Heavily stylized, condensed, and bold sans-serif fonts imported from Google Fonts.
  - `Anton`: Used for heavy, impactful headers and labels.
  - `Bebas Neue`: Used for sub-headers, counts, and hints.
  - `Montserrat`: Used for more readable, secondary body text.
- **Geometry & Shapes**: 
  - Almost no standard rectangles. Elements are heavily stylized using CSS `clip-path: polygon(...)`.
  - Heavy use of CSS `transform: skewX(...) skewY(...)` to create slanted, dynamic energy.
  - Background shapes act as literal drop shadows/highlights by layering identical shapes behind the main element with slight offsets.
- **Multimedia Integration**: 
  - Immersive background videos (`.mp4`) loop behind the UI elements to give a sense of constant motion.
  - Persona character portraits overlap UI containers, breaking out of typical bounding boxes.
- **Audio-Visual Feedback**: 
  - Every interaction is paired with sound effects (`hover`, `select`, `gate`, `link`) globally triggered via `window.playPersonaSound()`.
  - Constant background music tracks from the Persona series with an integrated custom MP3 player widget.

## 2. Technical Stack & Architecture

- **Framework**: React 19 (via Vite)
- **Routing**: `react-router-dom` for handling page navigation.
- **Animation**: 
  - `framer-motion` is strictly used for page-level entry/exit transitions (`PageTransition.jsx`).
  - Pure CSS keyframes and transitions are used for all in-component micro-animations (hovers, pops, reveals).
- **Styling Strategy**: Component-scoped styles injected via `<style>` tags directly within the JSX. This allows dynamic JS variables to be mixed with complex CSS, particularly useful for staggered animation delays and dynamic `clip-path` math.
- **Audio**: HTML5 `<audio>` elements controlled via React refs and a global window object.

## 3. Component Breakdown

### `App.jsx`
The root component that manages the global layout. It wraps the application in `<BackgroundMusic />` to ensure audio persists across routes, and `<AnimatedRoutes />` which leverages `AnimatePresence` from Framer Motion to handle page transitions.

### `PageTransition.jsx`
Handles the iconic "screen wipe" transitions between pages.
- Uses `framer-motion` to animate fixed, absolute divs that cover the screen during route changes.
- **Formulas**: Uses slanted blocks (`rotate(-18deg)`, `clip-path`) and sliding stripes (`skewX(-16deg)`) staggered by varying delays (`0s`, `0.05s`, `0.1s`) to create a fluid, multi-layered color wipe (e.g., Deep Blue → Light Blue → White).

### `BackgroundMusic.jsx`
A robust media controller that provides the auditory soul of the application.
- **BGM**: Plays Persona tracks (`Beneath the Mask`, `Color Your Night`, etc.) with a styled custom widget.
- **SFX Engine**: Instantiates `Audio` objects for UI sounds and exposes them globally via `window.playPersonaSound(type)`.
- **UI**: A floating, glassmorphism-styled popup (`backdrop-filter: blur(20px)`) that lets the user toggle play/pause, volume, and skip tracks.

### `P3Menu.jsx` (Main Menu)
The entry point of the portfolio.
- **Visuals**: A vertical list of large, bold menu items.
- **Formula**:
  - Each item is a compound component containing a base label, a bright colored overlay, a glowing background (`radial-gradient`), and a "shadow triangle" that pops out on hover.
  - Uses specific X/Y offsets and custom `skewX` / `skewY` degrees per item to make the menu look intentionally uneven and dynamic.
- **Interaction**: Fully navigable via Arrow Keys (↑/↓) and Enter, mimicking a console game menu.

### `AboutMe.jsx` & `Socials.jsx`
Both components share a similar structural pattern: the "Expanding Slanted Bar" layout.
- **Visuals**: A list of dark bars on the left side of the screen. When selected, the bar expands, a red underlay peeks out, and a white parallelogram slides over to highlight the active state.
- **Formula**: 
  - `clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)` creates the angled cuts.
  - On select, the bar height increases and a right-side panel is revealed (`sc-reveal-panel` or `sc-info-bar-wrap`).
  - Features character portraits (`char1.png`) that overflow the bar's bounding box using absolute positioning and high z-indexes.
- **Socials Details**: Introduces a dual-focus navigation state (`left` vs `right`). Pressing the Right Arrow shifts focus to sub-links (e.g., specific GitHub repos), sliding them into view with `translateX`.

### `ResumePage.jsx`
Presents the user's professional timeline and skills.
- **Visuals**: Slanted cards on the left act as categories (Education, Skills, Projects, Experience). Selecting a category updates a large, stylized detail panel on the right.
- **Entry Animation**: Uses a circular mask reveal (`clip-path: circle(...)`) that grows from the center of the screen to reveal the background video.
- **Formula**:
  - The detail panel (`resume-detail-panel`) uses a heavy gradient background (`linear-gradient(180deg, rgba(15, 28, 105, 0.96)...)`) combined with inset box shadows and `clip-path` to simulate an extruded, 3D futuristic terminal window.
  - List items inside the panel highlight on hover by shifting slightly right (`translateX(4px)`) and brightening their background color.

## 4. Key Implementation Patterns

1. **Gamepad-Style Keyboard Navigation**
   - Implemented via `useEffect` hooks listening to `keydown`.
   - State variables (`active`, `focus`) track the current selection.
   - Prevents default behaviors and triggers route changes (`navigate`) or local state reveals.
2. **Staggered Mounting Animations**
   - Uses a `mounted` state toggled via `setTimeout` shortly after component mount.
   - Elements conditionally receive a `.mounted` CSS class, triggering `opacity: 1` and `transform` resets.
   - `transitionDelay` is dynamically calculated via map indexes (`index * 80ms`) to create cascading "waterfall" reveals.
3. **The "Underlay Pop" Effect**
   - A common Persona 3 effect where a colored shadow pops out from behind a selected element.
   - Achieved by placing an absolute `div` underneath the main content. On the `.active` state, an `@keyframes` animation scales and translates this underlay in a snappy, bouncy curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`).

## Summary
The codebase is a masterful application of CSS polygons, skewed transforms, and staggered keyframe animations paired with synchronized audio to perfectly replicate the high-octane, stylized aesthetic of Persona 3. The design is tightly coupled with its CSS-in-JS architecture, allowing for pixel-perfect dynamic interactions.
