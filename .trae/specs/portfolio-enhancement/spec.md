# Portfolio Enhancement - Product Requirements Document

## Overview
- **Summary**: Enhance the existing Anurag Sharma Portfolio website with improved visual design, smooth animations, and a more professional aesthetic while preserving the existing blue theme, all content, section structure, and navigation.
- **Purpose**: Elevate the portfolio from a basic static site to a modern, visually engaging, professionally polished personal branding website that stands out to recruiters and clients.
- **Target Users**: Recruiters, hiring managers, potential clients, and professional contacts evaluating Anurag's skills as a Data Analyst & MERN Stack Developer.

## Goals
- Modernize visual aesthetics with refined typography, spacing, depth, and micro-interactions
- Add meaningful scroll-triggered and entry animations throughout all sections
- Enhance the hero section with dynamic effects (typing animation, particle/gradient background)
- Upgrade project cards with hover depth effects, icons, and visual indicators
- Improve the about section with a skills display (tech stack with icons, skill bars)
- Add professional polish: glassmorphism nav, smooth form interactions, scroll progress indicator
- Add dark/light mode toggle (CSS variables already exist; add UI toggle)
- Preserve 100% of existing content, links, sections, and functional behavior
- Maintain full responsiveness across mobile, tablet, and desktop

## Non-Goals
- Do not change the section structure (Home / About / Projects / Contact)
- Do not add new sections or remove existing sections
- Do not modify any text content, project descriptions, or user data
- Do not change the blue primary color theme (#3498db family)
- Do not replace Font Awesome or add new external dependencies
- Do not implement any backend or server-side changes
- Do not alter the form submission logic or Netlify integration

## Background & Context
The portfolio is a static HTML/CSS/JS site. Current state:
- Files: [index.html](file:///C:/Users/aanur/Desktop/My%20Portfolio/index.html), [style.css](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/style.css), [script.js](file:///C:/Users/aanur/Desktop/My%20Portfolio/Scripts/script.js), [projects.html](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/projects.html)
- Color palette: primary `#3498db` blue, secondary `#2c3e50` slate, bg `#f4f4f4` light gray
- CSS dark-mode variables already defined in `:root` / `body.dark-mode` but no toggle UI exists
- Sections: Hero (with name + role), About (paragraph only), Projects (3 card grid + View All), Contact (form + socials)
- All links and navigation must remain functionally identical

## Functional Requirements
- **FR-1**: All existing in-page anchor links, nav toggle (hamburger), smooth scroll, form submit handler, and image modal must continue to work exactly as before.
- **FR-2**: A theme toggle button (sun/moon icon) must be added to the navbar, toggling `body.dark-mode` class and persisting preference in `localStorage`.
- **FR-3**: Hero section must include (a) animated gradient / subtle particle-free moving background, (b) a typing-rotating effect on the role text cycling through "Data Analyst" and "MERN Stack Developer" (or similar strings from existing content), (c) fade-up entry animation for hero elements.
- **FR-4**: Scroll-triggered reveal animations (fade / slide-up) on section titles, about text, each project card, and form elements using IntersectionObserver.
- **FR-5**: Project cards must have an elevated hover: scale + deeper shadow + subtle inner glow / border highlight, with an icon representing each project type (data chart, database, code, etc.) and a tech-stack badge row beneath the description.
- **FR-6**: About section must include a "Skills" area with tech-stack icon badges (Python, SQL, Power BI, JavaScript, React, Node.js, MongoDB, Express — matching Anurag's stated profile) and optional animated skill bars.
- **FR-7**: Navbar must gain (a) a glassmorphism/blur backdrop style when scrolled, (b) an active-link indicator showing current section as user scrolls, (c) a thin scroll-progress bar at the very top of the viewport.
- **FR-8**: Form inputs must have animated floating labels or focus glow effects, submit button must show a loading spinner when submitting, and success/error messages must animate in.
- **FR-9**: Footer social links must have hover scale + color pop; all buttons must have a subtle press/ripple or lift animation on click.
- **FR-10**: [projects.html](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/projects.html) (All Projects page) must receive the same styling, animations, navbar, theme toggle, and card upgrades as the main page; it already links to `style.css` and `script.js`.

## Non-Functional Requirements
- **NFR-1**: No layout shift or content reflow caused by animations (all transforms/opacity only where possible).
- **NFR-2**: Full responsiveness — all new UI elements (theme toggle, skill badges, badges on cards, scroll bar) must behave correctly from 320px up.
- **NFR-3**: Performance — no heavy JS libraries; animations must be CSS-driven + IntersectionObserver only; no JS-driven animation loops painting every frame.
- **NFR-4**: Accessibility — sufficient contrast in both light/dark themes, focus states visible on all interactive elements, theme toggle keyboard-accessible, reduced-motion preference respected via `prefers-reduced-motion` media query (disable decorative animations).
- **NFR-5**: Visual theme preservation — the color temperature, blue primary identity, and "professional data/dev portfolio" mood must remain clearly the same site, not rebranded.

## Constraints
- **Technical**: Pure HTML/CSS/vanilla JS only. No new npm packages, no build step. Font Awesome 6 CDN already available, use it for all icons.
- **Business**: All existing external links (GitHub, LinkedIn, email, resume.pdf, project URLs, projects.html) must remain unchanged.
- **Dependencies**: None beyond existing CDN (Font Awesome 6).

## Assumptions
- The "Images/logo.jpeg" avatar is sufficient and does not need replacement.
- Project links ("#") intentionally unlinked; leaving them as-is.
- The user's stated skills: Python, SQL, Power BI (data) + MERN (MongoDB, Express, React, Node.js) are the correct skill set to display.

## Acceptance Criteria

### AC-1: All original functionality preserved
- **Type**: `rule`
- **Given**: The site after enhancement
- **When**: A user performs any original action (click nav, hamburger, hero buttons, project buttons, contact form submit, click logo avatar, open projects.html)
- **Then**: Behavior is identical to the original site (same targets, same smooth scroll, same form handler, same modal, no broken links)
- **Pass Condition**: Manual click-through of every original interactive element succeeds with no regressions
- **Evidence**: Browser manual test checklist

### AC-2: Theme toggle works and persists
- **Type**: `rule`
- **Given**: The navbar has a visible sun/moon toggle button
- **When**: User clicks the toggle repeatedly and refreshes the page
- **Then**: `body` toggles `.dark-mode`, color variables update visually, the toggle icon swaps (sun ↔ moon), and after refresh the last chosen theme is restored from localStorage
- **Pass Condition**: Toggle behavior + persistence + projects.html also inherits the same theme state
- **Evidence**: DevTools class toggling + localStorage inspection + page reload test

### AC-3: Hero section animated and visually striking
- **Type**: `rubric`
- **Dimension**: Hero visual quality & animation
- **Scale**: 1-5
- **Anchors**: 1 = unchanged plain hero; 3 = basic gradient background + simple fade-in; 5 = rich animated gradient, typed role text cycling cleanly (non-janky), staggered fade-up on title/subtitle/buttons, no flicker
- **Pass Threshold**: >= 4
- **Evidence**: Screenshot/video of hero on load

### AC-4: Scroll reveal animations present and smooth
- **Type**: `rubric`
- **Dimension**: Scroll-triggered animation quality
- **Scale**: 1-5
- **Anchors**: 1 = no scroll animations; 3 = basic fade on some sections with occasional jank; 5 = every section title, about content, each project card, form fields have staggered, smooth reveal via IntersectionObserver; animation plays once and does not fire repeatedly while hovering
- **Pass Threshold**: >= 4
- **Evidence**: Screen recording of full scroll from top to bottom on both index.html and projects.html

### AC-5: Project cards professionally upgraded
- **Type**: `rubric`
- **Dimension**: Project card design & interaction
- **Scale**: 1-5
- **Anchors**: 1 = original plain cards; 3 = added hover lift only; 5 = cards have meaningful icon per project, gradient border or accent, tech-badge row under description, hover gives satisfying scale+shadow+glow, card corners and spacing feel modern
- **Pass Threshold**: >= 4
- **Evidence**: Visual inspection of project cards (home grid + all-projects grid)

### AC-6: About section enriched with skills
- **Type**: `rule`
- **Given**: The About section
- **When**: Viewed on desktop and mobile
- **Then**: Below the original "About Me" paragraph, a Skills area is visible containing icon badges (Font Awesome icons + labels) for Python, SQL, Power BI, JavaScript, React, Node.js, Express, MongoDB; layout wraps cleanly on mobile; original paragraph text is unchanged
- **Pass Condition**: Skill badges present, 8 correct items, responsive wrap, paragraph text untouched
- **Evidence**: DOM inspection + responsive view

### AC-7: Navbar glassmorphism + scroll progress + active link
- **Type**: `rule`
- **Given**: Scrolled page
- **When**: User scrolls past ~50px and navigates through sections
- **Then**: Navbar gains a blurred semi-transparent (glass) background; a thin colored progress bar grows from 0→100% at viewport top; the nav link for the currently visible section is visually highlighted (underline or color change)
- **Pass Condition**: All three behaviors observed: glass style on scroll, progress bar animating, active link highlighting
- **Evidence**: DevTools computed styles at various scrollY + visual check

### AC-8: Form interactions upgraded
- **Type**: `rule`
- **Given**: Contact form
- **When**: User focuses an input, types, and clicks Send
- **Then**: Input has focus glow / animated underline; submit button shows a spinner while "Sending..." state is active; success/error message slides/fades in instead of snapping
- **Pass Condition**: Focus effect visible on all 3 inputs, spinner present during submit, message animates in
- **Evidence**: Manual submit test with DevTools network throttled

### AC-9: Professional polish (buttons, socials, reduced-motion)
- **Type**: `rule`
- **Given**: The whole site
- **When**: Hovering buttons / social icons; enabling OS-level reduced motion
- **Then**: Buttons have satisfying hover lift + transition; social icons scale+color on hover; with `prefers-reduced-motion: reduce` all decorative entry/typing/gradient animations are disabled (but hover/focus interactions remain functional)
- **Pass Condition**: Hover states clearly improved; Chrome DevTools rendering-emulation reduced-motion test disables decorative animations
- **Evidence**: Reduced-motion emulation screenshot + hover state screenshots

### AC-10: Responsive on common breakpoints
- **Type**: `rule`
- **Given**: Site at 360px (mobile), 768px (tablet), 1280px (desktop)
- **When**: Layout inspected at each width
- **Then**: No horizontal scroll; skill badges wrap; hamburger appears ≤768px; hero text fits; project grid collapses to 1 column on mobile; theme toggle is reachable on all sizes
- **Pass Condition**: Chrome DevTools device-mode check at 360/768/1280 with no overflow
- **Evidence**: Screenshots or live device-mode check

### AC-11: Theme preservation — "still the same portfolio"
- **Type**: `rubric`
- **Dimension**: Continuity of identity (blue theme / content)
- **Scale**: 1-5
- **Anchors**: 1 = feels like a different site (colors rebranded); 3 = same content but theme barely recognizable; 5 = immediately recognizable as Anurag's blue portfolio, same sections, same copy, same links, same mood — just visibly more polished
- **Pass Threshold**: >= 4
- **Evidence**: Side-by-side screenshot comparison before/after

## Open Questions
- [ ] None at this time. Assumptions above govern; can be adjusted in Plan if needed.
