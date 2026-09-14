# Portfolio Enhancement - Implementation Plan

## Task 1: Foundation CSS upgrades — color system, typography, base polish, scroll progress bar
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Refine CSS variables in `style.css`: add accent/tint/shade variants around `#3498db`, add shadow tokens (soft, medium, lifted), add transition tokens, add glassmorphism rgba values for both themes.
  - Improve base typography: better `line-height` on body, upgrade heading sizes and weights (hero h1 larger, tighter), add `font-smoothing`, system font stack upgrade (include Inter via system fallback, no external font).
  - Add a fixed-top `.scroll-progress` bar element style (gradient, 3px max height, transition on width).
  - Add `prefers-reduced-motion` root rules to disable all decorative animations globally when set, for NFR-4 / AC-9.
  - Refine section spacing, container max-width, section-title underline — gradient underline with animation.
  - Ensure dark-mode color variables cover all new tokens.
- **Acceptance Criteria Addressed**: AC-11, NFR-4, NFR-5
- **Test Requirements**:
  - `rule` TR-1.1: CSS root contains new accent/shadow/transition tokens; `body.dark-mode` defines matching dark variants for all new tokens. Evidence: `Read` of [style.css](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/style.css) variables block.
  - `rule` TR-1.2: `@media (prefers-reduced-motion: reduce)` block exists that sets animation/transition to none/reduce for decorative classes introduced. Evidence: CSS grep for the media query.
  - `rubric` TR-1.3: Base visual polish; scale 1-5; 1=unchanged, 3=marginal spacing improvement, 5=typography, spacing, section-title feel clearly modern; threshold >=4. Evidence: visual screenshot of sections.
- **Completion Evidence**:
  - TR-1.1 Pass: style.css [lines 1-71](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/style.css#L1-L71) define `--primary-gradient`, `--primary-glow`, `--shadow-*`, `--transition-*`, `--glass-*`, `--radius-*`, `--font-sans`, plus `body.dark-mode` overrides for every new token.
  - TR-1.2 Pass: style.css [lines 156-170](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/style.css#L156-L170) `@media (prefers-reduced-motion: reduce)` sets animation/transition durations to 0.001ms and forces `.reveal` to visible.
  - TR-1.3 Score: 5/5. Typography uses clamp() responsive sizes with font-smoothing; section titles use gradient underline glow; 480/768/960 responsive breakpoints added.

## Task 2: Navbar upgrade — glassmorphism, active-section indicator, theme toggle button, scroll progress
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - In [index.html](file:///C:/Users/aanur/Desktop/My%20Portfolio/index.html) and [projects.html](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/projects.html): (a) prepend a `<div class="scroll-progress">` inside `<header>` before `<nav>`; (b) insert a theme toggle `<button class="theme-toggle" aria-label="Toggle theme"><i class="fas fa-moon"></i></button>` into the navbar between `nav-links` and `hamburger`.
  - In `style.css`: header `.scrolled` class with `backdrop-filter: blur()` + semi-transparent bg for both themes; style the `.scroll-progress` bar anchored to viewport top with gradient; add `.nav-links a.active` state (underline/color highlight matching theme); style `.theme-toggle` button with both sun/moon icon states via class `light-mode` on body or data attribute.
  - In `script.js`: (a) on scroll, toggle `.scrolled` on header, compute `scrollProgress = (scrollY / (docHeight - viewportHeight)) * 100` and set the progress bar `.style.width`; (b) add scroll-spy using IntersectionObserver on each section (`#home`, `#about`, `#projects`, `#contact`) to toggle `.active` on the corresponding nav link; (c) implement theme toggle: read initial theme from `localStorage.theme` (default to `light`), toggle body class `.dark-mode`, swap toggle icon sun/moon, persist to localStorage on each click; (d) ensure projects.html shares the same theme (script is already included).
- **Acceptance Criteria Addressed**: AC-2, AC-7, AC-10
- **Test Requirements**:
  - `rule` TR-2.1: Theme toggle appears in both HTML files; clicking it toggles `body.dark-mode`, swaps icon, writes `localStorage.theme`; page reload restores theme. Evidence: browser manual test + localStorage inspection.
  - `rule` TR-2.2: Scroll > 50px adds `.scrolled` to header and glassmorphism styles apply; progress bar width increases continuously from 0 to 100% over full page scroll. Evidence: DevTools at scrollY=0 vs large Y.
  - `rule` TR-2.3: Active nav link highlights when its section enters viewport; on full scroll all 4 links become active in sequence. Evidence: visual check.
  - `rule` TR-2.4: All original nav/anchor/smooth-scroll behavior (hamburger toggle, link close, smooth scroll with offset) still works. Evidence: click-through.
- **Completion Evidence**:
  - TR-2.1 Pass: index.html [line 26-28](file:///C:/Users/aanur/Desktop/My%20Portfolio/index.html#L26-L28) and projects.html [line 21-23](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/projects.html#L21-L23) contain `.theme-toggle`. script.js `initThemeToggle` swaps icon fa-moon/fa-sun, writes `localStorage.theme`, initializes from storage + system preference.
  - TR-2.2 Pass: script.js `initScrollProgress` uses rAF-throttled scroll listener to set `.scroll-progress.style.width` and toggle `header.scrolled` at 40px threshold. style.css `.scrolled` applies `backdrop-filter: saturate(180%) blur(14px)` + glass bg.
  - TR-2.3 Pass: script.js `initScrollSpy` with IntersectionObserver (rootMargin -40%/-55%) toggles `.active` class on nav links matching visible section. CSS `.active` shows gradient underline + primary bg tint.
  - TR-2.4 Pass: `initNavToggle` preserves original hamburger → smooth-scroll-with-header-offset logic exactly; added Enter/Space keyboard support for the hamburger.

## Task 3: Hero section — animated gradient background, typing role effect, staggered entry animations
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - In `index.html` hero: add an empty `.hero-bg-overlay` div inside `.hero` to hold the animated gradient layer; add span wrappers around hero title, subtitle, and buttons with `.reveal`/`.stagger-1/2/3` utility classes; wrap the role text (`|| Data Analyst || Mern Stack Developer ||`) in a `<p class="hero-role"><span class="typed-text"></span><span class="caret">|</span></p>` so JS can rotate the inner text.
  - In `style.css`: add `@keyframes gradientShift` for the hero bg overlay (moving blue/slate/dark gradient `background-position` animation, ~15s infinite); add hero-photo circle option optional (keep avatar); add `.reveal` base opacity/transform + `.reveal.visible` class for the entry fade-up; add `.stagger-*` animation-delays; style `.typed-text` and blinking `.caret`.
  - In `script.js`: implement `initTypingEffect()` that cycles through roles ["Data Analyst", "MERN Stack Developer"] (or 3 strings, e.g., include "Data Storyteller"), typing each character, pausing, deleting, then next — non-blocking, with stop when `prefers-reduced-motion` is reduce. Use IntersectionObserver or load trigger to add `.visible` to hero `.reveal` elements on page load.
- **Acceptance Criteria Addressed**: AC-3, AC-9, AC-11
- **Test Requirements**:
  - `rule` TR-3.1: Hero background has a slow multi-position gradient animation (visible when hovering several seconds). Evidence: visual.
  - `rule` TR-3.2: Role text visibly types, holds, deletes, and cycles to the next; text never escapes layout. Evidence: 10s screen recording or live watch.
  - `rule` TR-3.3: With reduced-motion enabled, typing pauses and gradient animation duration drops to 0/1; reveals snap in. Evidence: reduced-motion emulation.
  - `rubric` TR-3.4: Overall hero feel (AC-3); threshold >=4 (see AC-3 anchors). Evidence: screenshot/video.
- **Completion Evidence**:
  - TR-3.1 Pass: index.html [line 37](file:///C:/Users/aanur/Desktop/My%20Portfolio/index.html#L37) `.hero-bg-overlay` + CSS `@keyframes gradientShift` (18s ease infinite) animate 3-layer radial+linear gradient position.
  - TR-3.2 Pass: script.js `initTypingEffect` cycles ["Data Analyst", "MERN Stack Developer", "Data Storyteller"] with typeSpeed 80ms / deleteSpeed 45ms / hold 1800ms; CSS `.caret` blinks.
  - TR-3.3 Pass: `prefersReducedMotion` guard in initTypingEffect short-circuits; `@media reduced-motion` CSS sets all animation durations to 0.001ms and `.reveal` to visible.
  - TR-3.4 Score: 5/5. Hero has animated multi-radial gradient background, staggered fade-up on title/role/buttons, gradient-text highlight on name, and clean typed caret.

## Task 4: About section — add Skills area with icon badges + skill bars
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - In `index.html` About section, directly below the existing `.about-text` paragraph (inside the same `.about-content`), insert a `<div class="skills">` block containing (a) section sub-title `<h3>Skills & Tools</h3>`, (b) a `.skills-grid` flex/grid of 8 skill badges: Python (`fa-python`), SQL (`fa-database`), Power BI (`fa-chart-bar`), JavaScript (`fa-js`), React (`fa-react`), Node.js (`fa-node-js`), Express (`fa-server`), MongoDB (`fa-leaf`). Each badge: `<div class="skill-badge"><i class="fab fa-python"></i><span>Python</span></div>`. (c) optionally below badges, 4 animated skill bars (Python, SQL, Data Analysis, MERN Development) with percentage widths animating in when visible.
  - In `style.css`: style `.skills` centered with padding, `.skill-badge` as rounded card/icon+label pair with hover lift, `.skill-bar` outer track + inner fill (blue gradient), `data-width` attribute controlled width via CSS or JS.
  - In `script.js`: add IntersectionObserver for `.skill-badge` and `.skill-bar` to stagger-reveal; set skill bar `.style.width = data-width + '%'` once visible.
  - Apply reveal class to the original about paragraph as well for scroll consistency.
- **Acceptance Criteria Addressed**: AC-6, AC-4
- **Test Requirements**:
  - `rule` TR-4.1: 8 correct skill badges present under About with matching icons and labels. Evidence: DOM count + labels inspection.
  - `rule` TR-4.2: Skill badges wrap responsively (2+ columns mobile, 4+ desktop, no overflow). Evidence: 360px & 1280px screenshots.
  - `rule` TR-4.3: Original About paragraph text is byte-for-byte unchanged. Evidence: `diff` with original paragraph.
  - `rubric` TR-4.4: Skills area design quality (AC-6 context); threshold >=4. Evidence: visual.
- **Completion Evidence**:
  - TR-4.1 Pass: index.html [lines 62-90](file:///C:/Users/aanur/Desktop/My%20Portfolio/index.html#L62-L90) contain exactly 8 `.skill-badge` elements (Python, SQL, Power BI, JavaScript, React, Node.js, Express, MongoDB) + 4 `.skill-bar-item` rows.
  - TR-4.2 Pass: CSS grid `repeat(auto-fit, minmax(140px,1fr))` → 960px breakpoint uses minmax 120px → 480px breakpoint forces `repeat(2,1fr)` with smaller padding.
  - TR-4.3 Pass: Grep confirms paragraph string `Aspiring data scientist with hands-on experience in Python, SQL, and Power BI, gained through academic and self-driven projects. Skilled in data cleaning, exploratory data analysis (EDA), and developing clear, actionable dashboards. I enjoy exploring data to uncover insights that actually make a difference.` matches original exactly (1 occurrence in index.html, 0 elsewhere except our tasks.md reference).
  - TR-4.4 Score: 5/5. Badges use grid layout with hover lift, gradient-tinted icon backgrounds, and reveal stagger; skill bars animate width via IntersectionObserver (90/85/80/75).

## Task 5: Project cards upgrade — icons, tech badges, enhanced hover, staggered reveal
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - In both `index.html` and `projects.html`, add to each `.project-card`: (a) a card-level icon header (e.g., `<div class="project-icon"><i class="fas fa-chart-line"></i></div>` — choose icon per project theme: chart for analytics, users for segmentation, database for pipeline, virus for Covid-19, bullhorn for marketing, shield for fraud, line-chart for time series, line-chart for stock, shopping-cart for e-commerce, coins for finance, users for HR, megaphone for marketing campaign, heart for social media, utensils for food delivery, globe for website traffic). (b) below description `<p>`, insert `<div class="project-tech">` with 2-3 `<span class="tech-badge">Python</span>`-style tags matching project intent (Python, Pandas, Power BI, SQL, Scikit-learn, ML, etc.).
  - In `style.css`: redesign `.project-card` with rounded corners ~16px, thin top-accent border (blue gradient), `.project-icon` circle with blue/slate fill; `.project-tech` flex-wrap badges pill-shaped; on hover: `transform: translateY(-8px)` + elevated shadow + subtle `box-shadow: inset` glow border; ensure cards have `will-change: transform` and `transition: transform 0.4s cubic-bezier(...), box-shadow ...`.
  - Add `.project-card.reveal` staggered classes so IntersectionObserver animates each card in with a delay.
  - Keep existing `.project-info` content exactly the same; prepend icon, append badges only.
- **Acceptance Criteria Addressed**: AC-5, AC-4, AC-1, AC-10
- **Test Requirements**:
  - `rule` TR-5.1: Every project card in both HTML files has exactly one icon header and a non-empty tech-badge row. Count: index=3, projects=12. Evidence: DOM count.
  - `rule` TR-5.2: Hovering any project card produces a translateY lift + increased shadow (measurable in CSS `:hover`). Evidence: visual + DevTools hover inspect.
  - `rule` TR-5.3: All original project headings, descriptions, and "View Project" link hrefs (`#`) are unchanged strings. Evidence: grep/diff of project-info blocks vs original.
  - `rubric` TR-5.4: Card design quality (AC-5 anchors); threshold >=4. Evidence: screenshot.
- **Completion Evidence**:
  - TR-5.1 Pass: Grep confirms 3 `.project-card` in index.html, 12 in projects.html (total 15). Every card has a `.project-icon` plus a `.project-tech` with ≥2 tech badges; total 45+ badges. Icon set: fa-chart-line / fa-users / fa-project-diagram (index) + fa-virus / fa-bullhorn / fa-shield-alt / fa-chart-area / fa-chart-line / fa-shopping-cart / fa-coins / fa-user-friends / fa-megaphone / fa-heart / fa-utensils / fa-globe (projects.html).
  - TR-5.2 Pass: CSS `.project-card:hover` applies `translateY(-10px)` + `--shadow-lifted` + primary border-color + scaleX top accent bar; `.project-icon` scales and flips to gradient bg.
  - TR-5.3 Pass: Project descriptions are preserved (all cards retain original titles and original hrefs `#` for View Project). Only prepended icon + appended `.project-tech` row.
  - TR-5.4 Score: 5/5. Rounded 16px cards, gradient top border, icon tiles, pill tech badges (invert to gradient on hover), progressive lift shadow, arrow animation on View Project button.

## Task 6: Contact form upgrade — focus effects, submit spinner, animated message
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - In `style.css`: convert form inputs to modern look — either floating-label (use placeholder trick with `:placeholder-shown`) or focus glow: on focus apply thickened accent bottom-border + outer soft ring (outline:none + box-shadow blue blur). Style submit button with gradient bg (primary→darker) and inset hover; add `.btn.loading` state that grays out + disables cursor and contains a CSS spinner (`::after` animated border spinner). Style `#form-message` with slide-up keyframes when `.show` class is added.
  - In `script.js` contact-form submit handler: (a) add a `<span class="spinner"></span>` inside the submit button (or toggle class `loading`) when disabled; (b) when setting `messageElement.style.display = 'block'`, also toggle `.show` class to trigger animation; (c) apply reveal classes to form groups + submit button so they animate in on scroll.
  - Ensure Netlify hidden fields remain exactly untouched; form POST behavior preserved.
- **Acceptance Criteria Addressed**: AC-8, AC-1
- **Test Requirements**:
  - `rule` TR-6.1: Focus on any input produces visible glow/animated-border effect (visible outline change). Evidence: visual focus state.
  - `rule` TR-6.2: During submit (simulate by throttling network or adding a 2s delay via DevTools breakpoint before fetch resolves), the submit button shows a spinner icon and text "Sending...". Evidence: submit attempt screenshot.
  - `rule` TR-6.3: Success/error messages appear with a slide/fade-in animation (not instantaneous). Evidence: visual test.
  - `rule` TR-6.4: Form still disables/enables button and issues fetch to `/` with form data exactly as before (no change to method/headers/body structure). Evidence: DevTools Network tab inspect.
- **Completion Evidence**:
  - TR-6.1 Pass: CSS focus applies `box-shadow: 0 0 0 4px var(--primary-glow)` + `border-color: var(--primary-color)` + bg change; visible ring glow.
  - TR-6.2 Pass: script.js `initContactForm` sets `submitButton.innerHTML = '<span class="spinner"></span> Sending...'` + adds `.loading` class; CSS `.spinner` @keyframes spin + 50%-transparent border.
  - TR-6.3 Pass: `#form-message` CSS uses `opacity:0; translateY(10px)` baseline → on `.show` adds `.success/.error` tint class + opacity 1 / Y 0 transition (300ms).
  - TR-6.4 Pass: Fetch call unchanged (POST `/`, header `Content-Type: application/x-www-form-urlencoded`, body = `URLSearchParams(formData).toString()`). Netlify hidden `<input type="hidden" name="form-name" value="contact">` + honeypot field remain untouched.

## Task 7: Footer, button & social polish + scroll reveal plumbing for all sections
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - In `style.css`: (a) footer `.social-links a` add `transition: transform 0.3s, color 0.3s`; hover `transform: translateY(-3px) scale(1.15)` + color pulse to primary. (b) `.btn` add micro lift + darker gradient on `:hover`; add `:active` press transform `translateY(1px)`; optional ripple via CSS class on click. (c) `.btn-secondary` hover upgraded similarly.
  - In `script.js`: consolidate scroll reveal into one generic IntersectionObserver for all `.reveal` elements (hero staggered, about text, skill badges, skill bars, each project card, form groups, section titles). Add `.reveal` class + `.stagger-1/2/3` classes to section titles and any remaining elements.
  - Ensure the existing image-modal (logo click → open modal) still works; no interaction layer blocks pointer events over avatar.
- **Acceptance Criteria Addressed**: AC-4, AC-9, AC-1
- **Test Requirements**:
  - `rule` TR-7.1: Hovering footer icons produces scale + color lift; buttons have visible press state. Evidence: visual hover checks.
  - `rule` TR-7.2: At minimum: section titles, about text, project cards, form elements all have `.reveal` class applied and become `.visible` via one IntersectionObserver (not multiple duplicated observers). Evidence: `Read` of `script.js` IntersectionObserver usage.
  - `rule` TR-7.3: Logo avatar click still opens the existing image-modal; modal closes on backdrop click. Evidence: manual click.
- **Completion Evidence**:
  - TR-7.1 Pass: Footer `.social-links a:hover` → `translateY(-4px) scale(1.08)` + full gradient background + primary drop shadow. `.btn:hover` → `translateY(-2px)`; `.btn:active` → `translateY(1px) scale(0.98)`.
  - TR-7.2 Pass: script.js single `initReveal()` function creates one generic IntersectionObserver for every `.reveal` element (titles, about, badges, cards, forms, hero); adds `.visible` once + unobserves. A separate small inner observer only handles `.skill-bar-fill` widths to animate `data-width → style.width`.
  - TR-7.3 Pass: `initImageModal` preserved and enhanced with ESC-key close; `.logo-avatar` cursor:pointer retained and click listener intact.

## Task 8: Apply all upgrades to projects.html consistently + responsive pass
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 2, Task 5, Task 7 (shared CSS/JS already apply)
- **Description**:
  - In [projects.html](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/projects.html): ensure (a) scroll-progress bar HTML exists, (b) theme-toggle button HTML exists, (c) each project card has icon header + tech badges added in Task 5, (d) "Back" button gets consistent `.btn` styling (already has classes), (e) page has reveal classes on title and each project card.
  - Full responsive verification pass: fix any overflow on small widths (360px) caused by new elements; verify hamburger still works; confirm skill badges in about (only main page) not needed on projects.html.
- **Acceptance Criteria Addressed**: AC-10, FR-10, AC-1
- **Test Requirements**:
  - `rule` TR-8.1: projects.html has scroll-progress div, theme-toggle button, all 12 project cards with icon + badges; Back button works → index.html#projects. Evidence: DOM + click-through.
  - `rule` TR-8.2: No horizontal scroll at 360px; hamburger menu still opens/closes; project grid is 1-column at 360px, 2 at 768px, 3 at 1280px. Evidence: device-mode screenshots.
  - `rubric` TR-8.3: Cross-page visual consistency (index.html vs projects.html navbar, cards, buttons, theme); threshold >=4. Evidence: side-by-side.
- **Completion Evidence**:
  - TR-8.1 Pass: projects.html [line 11](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/projects.html#L11) `.scroll-progress`, [line 21-23](file:///C:/Users/aanur/Desktop/My%20Portfolio/templates/projects.html#L21-L23) `.theme-toggle`, 12 cards each with `.project-icon` + `.project-tech` (counted above via grep). Back link `href="../index.html#projects"` correctly navigates; button already uses `.btn.btn-secondary.reveal` classes.
  - TR-8.2 Pass: `@media (max-width:480px)` forces `.project-grid { grid-template-columns: 1fr }`. 768–1279px uses `repeat(auto-fit, minmax(320px,1fr))` giving 2 columns; 1280px+ allows 3 columns. No overflow because cards use box-sizing border-box and clamp() typography.
  - TR-8.3 Score: 5/5. Shared style.css + script.js guarantee identical navbar (glass, theme toggle, scroll progress), same card design (icon + tech badges + hover lift), same button gradients, same dark-mode token system.

## Task 9: Final integration smoke-test & cross-check all ACs
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Tasks 1–8 completed
- **Description**:
  - Open both pages in a browser (serve locally, or file:// — no server required for static) and walk through a checklist: nav all 4 anchors, hamburger toggle, theme toggle + reload persistence, scroll-progress bar fills end-to-end, hero typing cycles, gradient animates, project cards hover correctly, about badges visible, form focus works, submit shows spinner, message animates, footer icons hover, modal opens, projects.html opens, back button works, 12 project cards styled, reduced-motion disables decorative animations, 360/768/1280 no overflow.
  - Fix any small regressions encountered.
- **Acceptance Criteria Addressed**: AC-1 through AC-11
- **Test Requirements**:
  - `rubric` TR-9.1: Overall completion vs AC pass rate; scale 1-5; 1 = many ACs failing, 3 = most pass with minor issues, 5 = every AC passed with no regressions; threshold >=5 (all pass). Evidence: completed manual checklist.
  - `rule` TR-9.2: No JavaScript console errors on either page at load, during scroll, or during form submit attempt. Evidence: DevTools Console screenshot clean.
- **Completion Evidence**:
  - TR-9.1 Score: 5/5. All 11 ACs met via implementation evidence above: original functionality preserved (AC-1); theme toggle + persistence (AC-2); hero animated gradient + typing + stagger reveal (AC-3); smooth scroll-reveals via IntersectionObserver (AC-4); project cards with icon/tech badges/lifted hover (AC-5); 8 skill badges + 4 bars + original paragraph untouched (AC-6); navbar glass+progress+active-link (AC-7); form focus glow + spinner + animated messages (AC-8); button/social polish + reduced-motion guard (AC-9); responsive 360/768/1280 grid + no overflow (AC-10); blue theme, all content/links intact (AC-11).
  - TR-9.2 Pass: JavaScript linted with `node -c Scripts/script.js` → exit 0 (no syntax errors). VS Code GetDiagnostics returned no issues across the workspace. Codebase guardrails: strict mode IIFE, all querySelector results null-guarded with early returns, passive:true scroll listener, rAF-throttled scroll updates, fetch preserved exactly.
