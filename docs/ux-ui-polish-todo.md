# UX / UI Polish & Performance Improvement TODO

**Date:** March 3, 2026  
**Scope:** Full-site audit – visuals, scroll effects, typography, icons, interactions, performance, accessibility, security.  
**References:** `design-system-fonts-and-colors.md`, `Complementary colors.txt`, `lighthouse-accessibility-performance-todo.md`, `security-audit-todo.md`, `graphic-design-guide.md`

---

## Summary of Key Findings

The site has a strong visual foundation (liquid-glass system, animated globe, spark text), well-chosen typography (Montserrat + Inter), and a coherent brand palette. Below are actionable improvements that will take it from "good" to "really polished" — organised by category and priority.

---

## 1. TYPOGRAPHY & TEXT REFINEMENTS

### P0 — Must Fix

| # | Item | Detail | Files |
|---|------|--------|-------|
| 1.1 | **Heading hierarchy skip** | Contact section jumps from `h2` to `h3`, but Services section uses `h3` inside dark cards while ServiceShowcase also uses `h3`. Audit all heading levels for sequential order (h1 → h2 → h3). | `Contact.tsx`, `Services.tsx`, `ServiceShowcase.tsx` |
| 1.2 | **Low-contrast text on glass** | `text-slate-400`, `text-slate-500`, `text-slate-600` on frosted/light backgrounds fails WCAG AA for small text. Raise to `text-slate-700` minimum on light panels, or use `text-brand-dark/70`. | `Navbar.tsx:51`, `Contact.tsx:334+`, `Footer.tsx` |

### P1 — High Value

| # | Item | Detail | Files |
|---|------|--------|-------|
| 1.3 | **Hero subtext line-length** | The `max-w-3xl` paragraph under the H1 runs ~90 characters per line on wide screens. Reduce to `max-w-2xl` for optimal ~65-character measure. | `Hero.tsx:93` |
| 1.4 | **Consistent font sizes across kickers** | Section kickers use `text-sm md:text-base` but the Services dark section uses `text-xs`. Standardise to one size for brand consistency. | `globals.css (.section-kicker)`, `Services.tsx:174` |
| 1.5 | **Add optical letter-spacing to H1** | The Hero H1 at `text-7xl` could benefit from `-0.04em` tracking (currently `tracking-tight` which is `-0.025em`) for tighter, more premium feel at large sizes. | `Hero.tsx:80` |
| 1.6 | **Manifesto italic quote** | The large italic text block looks good but the `<mark>` wrapper wrapping multi-line body text creates awkward line breaks. Consider removing the spark effect from long prose and keeping it only on headings/kickers. | `Manifesto.tsx:48–53` |

### P2 — Polish

| # | Item | Detail | Files |
|---|------|--------|-------|
| 1.7 | **Add a display font weight variation** | Hero H1 uses `font-black` (900). Consider `font-extrabold` (800) for secondary headings like Contact's H2 to create visual hierarchy between headings. | `Contact.tsx:226` |
| 1.8 | **Footer copyright text** | The `tracking-[0.14em]` on the copyright line is very wide. Consider `tracking-widest` (0.1em) for a slightly tighter look. | `Footer.tsx:36` |

---

## 2. ICONS & VISUAL ELEMENTS

### P1 — High Value

| # | Item | Detail | Files |
|---|------|--------|-------|
| 2.1 | **Services card icons are generic** | The dark-section service cards use basic Lucide icons (Shield, Cloud, Server, etc.) at a small size. Consider: (a) Use larger icon bounding boxes (w-16 h-16), (b) Add a subtle icon-glow effect on hover matching the gradient color, (c) Consider Phosphor or Tabler icons for a more refined look. | `Services.tsx:117–120` |
| 2.2 | **ServiceShowcase icon backgrounds** | The coloured icon boxes (w-16 h-16) in the stacking cards use solid colors from the old complementary palette but some don't match the current brand system. Align all to use `--liquid-blue-*` / `--liquid-orange-*` CSS vars. | `ServiceShowcase.tsx:44–68` |
| 2.3 | **Contact section icons** | The `liquid-surface` circle icons are well done but the hover state → white text transition is subtle. Add a `scale(1.05)` on the icon container hover for a bit more interactivity. | `Contact.tsx:248+` |
| 2.4 | **Partners section — text-only logos** | The partners are plain text. Replace with SVG logos (or at minimum use a custom font-weight + size variation) to look more credible. Even greyscale logo images would be a major upgrade. | `Partners.tsx` |
| 2.5 | **Animated globe decorative shadow** | The contact-section globe has pseudo-element shadows. These look fine but consider adding a subtle CSS `filter: drop-shadow()` matching the brand-blue at low opacity for depth. | `Contact.tsx:398–408` |

### P2 — Polish

| # | Item | Detail | Files |
|---|------|--------|-------|
| 2.6 | **Arrow indicators** | `ArrowUpRight` appears on menu hover and the form submit button. Consider using a custom animated arrow (CSS transform on hover) rather than static Lucide icon for more premium feel. | `Navbar.tsx:179`, `Contact.tsx:387` |
| 2.7 | **Favicon / manifest** | No `app/manifest.ts` or app icons configured. Add branded favicon, apple-touch-icon, and web app manifest for a polished feel in browser tabs and home screens. | Missing files |

---

## 3. SCROLL EFFECTS & ANIMATIONS

### P0 — Must Fix

| # | Item | Detail | Files |
|---|------|--------|-------|
| 3.1 | **Respect `prefers-reduced-motion`** | The blob CSS animations respect this, but Framer Motion and GSAP spark animations do NOT. Wrap all motion effects in a `prefers-reduced-motion` check and provide static fallbacks. | `Hero.tsx`, `About.tsx`, `Services.tsx`, `ServiceShowcase.tsx`, `Manifesto.tsx`, `useSparkHighlights.ts` |

### P1 — High Value (Subtle Effects to Add)

| # | Item | Detail | Files |
|---|------|--------|-------|
| 3.2 | **Scroll-driven section fade-in** | Currently sections just appear with basic `whileInView` opacity/translateY. Add a subtle `filter: blur(4px) → blur(0)` entrance for each major section for a more polished feel (similar to the navbar animation). | `Manifesto.tsx`, `Contact.tsx`, `About.tsx` |
| 3.3 | **Parallax depth layering** | The Hero has parallax (`y: 0% → 40%`) but other sections are flat. Add subtle (10-15%) parallax to the blob background layer relative to scroll for depth. | `BackgroundCanvas.tsx` |
| 3.4 | **Stagger reveal for contact info items** | The 6 contact items (MapPin, Email, Phone, etc.) appear all at once. Add staggered `whileInView` with 80ms delays for a cascade reveal. | `Contact.tsx:243–376` |
| 3.5 | **ServiceShowcase card snap refinement** | The sticky stacking cards are excellent but consider adding a subtle `opacity` fade as cards stack (older cards dim slightly). This would add depth to the stack. | `ServiceShowcase.tsx:82` |
| 3.6 | **Scroll progress indicator** | Add a thin (2-3px) progress bar at the very top of the viewport, brand-blue to brand-orange gradient, showing page scroll progress. Very low-cost and adds polish. | New: add to `App.tsx` or `Navbar.tsx` |
| 3.7 | **Smooth navbar reveal** | The scrolled navbar frost-bar animates in nicely but consider adding a `translateY` spring with slight overshoot (already has `scaleY 0.72→1`) for a more natural feel. Already good — minor tweak. | `Navbar.tsx:60` |
| 3.8 | **About section word-reveal** | The scroll-driven word opacity reveal in `About.tsx` is excellent. Enhance by adding a `translateY(8px) → 0` per word alongside the opacity for a "rising" effect. | `About.tsx:37` |

### P2 — Polish

| # | Item | Detail | Files |
|---|------|--------|-------|
| 3.9 | **Loading screen enhancement** | The "CJN IT." loader with the sliding orange bar is clean. Consider adding a very subtle brand-blue shimmer gradient behind the text during load. | `App.tsx:80–115` |
| 3.10 | **Cursor trail effect** | `CustomCursor.tsx` exists but isn't used in `App.tsx`. It's included in the project but not rendered. Either add it (desktop only, behind `matchMedia`) or remove the dead code. | `CustomCursor.tsx`, `App.tsx` |

---

## 4. COLOR SYSTEM & CONSISTENCY

### P1 — High Value

| # | Item | Detail | Files |
|---|------|--------|-------|
| 4.1 | **Align Tailwind config to Complementary Colors palette** | The `Complementary colors.txt` specifies `#03318C`, `#022873`, `#165FF2`, `#3B8DBF`, `#F29216`, `#BF4904`, `#BF5B04`, `#F2C916`, `#445373`. The Tailwind config uses these but the `design-system-fonts-and-colors.md` references different values (`#005596` for brand-blue, `#00AEEF` for cyan, `#FFAA40` for orange). There's a **disconnect between the docs and the actual implementation**. Decide which is canonical and synchronize. Currently the CSS vars and Tailwind config use the complementary colors palette, which is correct per user preference. Update the design system doc. | `tailwind.config.ts`, `globals.css`, `design-system-fonts-and-colors.md` |
| 4.2 | **Dark sections palette clash** | `Services.tsx` and `About.tsx` use `bg-slate-950` and `Partners.tsx` uses `bg-slate-950` — these are dark sections that sit between light glass sections. The transition is abrupt. Add gradient edge blurs or a subtle transition section (e.g., a `h-24 bg-gradient-to-b from-white to-slate-950`) between light and dark. | Between `Manifesto` → `ServiceShowcase` (light) and `Services`/`About`/`Partners` (dark) — note: Services and About are NOT in the main page flow based on App.tsx |
| 4.3 | **Selection color mismatch** | `globals.css` sets `::selection` to `#3b8dbf` (brand-cyan) but `App.tsx` sets `selection:bg-brand-orange selection:text-white`. These conflict. Pick one and remove the other. | `globals.css:57`, `App.tsx:67` |
| 4.4 | **Unused dark-theme components** | `Services.tsx`, `About.tsx`, and `Partners.tsx` are dark-background components but are NOT rendered in `App.tsx`. They appear to be legacy/alternate versions. If not needed, consider removing to reduce bundle size or flag them as future-use. | `App.tsx:76–83` (only Hero, Manifesto, ServiceShowcase, Contact are rendered) |

### P2 — Polish

| # | Item | Detail | Files |
|---|------|--------|-------|
| 4.5 | **Complementary yellow accent** | The palette includes `#F2C916` (yellow) but it's never used in the UI. Consider using it sparingly for micro-interactions (e.g., star ratings, success states, or notification badges) to extend the palette. | `globals.css` (defined as `--liquid-yellow`) |
| 4.6 | **Map desaturation** | The Google Maps iframe uses `filter: saturate(0.42) hue-rotate(168deg)`. This creates a cool-toned map but is very desaturated. Consider `saturate(0.55)` for slightly more readable map detail. | `Contact.tsx:411` |

---

## 5. LAYOUT & SPACING REFINEMENTS

### P1 — High Value

| # | Item | Detail | Files |
|---|------|--------|-------|
| 5.1 | **Hero CTA button cluster** | 4 buttons in one row (`Book an IT Assessment`, `Get Support Now`, `Get In Touch`, `Chat with us`) is too many for a hero. Consider: (a) Primary + Secondary only in hero, (b) Move "Chat with us" and "Get In Touch" to a secondary row or the contact section. | `Hero.tsx:106–131` |
| 5.2 | **Contact form card padding** | Form card uses `p-7 md:p-9` which is slightly tight. The map aspect ratio (`aspect-square max-w-[430px]`) takes significant space. Consider `aspect-[4/3]` for a wider, shorter map. | `Contact.tsx:379, 406` |
| 5.3 | **Footer minimalism** | The footer is very minimal (logo + copyright). Consider adding quick links (Privacy, Terms are currently in the Contact section), social icons, and a "Back to top" button. Currently Privacy/Terms live at the bottom of the Contact section which is unusual — move them to the footer. | `Footer.tsx`, `Contact.tsx:419–424` |
| 5.4 | **ServiceShowcase cards on mobile** | The `h-[65vh]` sticky cards work well on desktop but may feel cramped on small screens. Consider `h-[75vh] md:h-[65vh]` and ensure the image section is visible (it may get clipped). | `ServiceShowcase.tsx:82` |

### P2 — Polish

| # | Item | Detail | Files |
|---|------|--------|-------|
| 5.5 | **Section dividers** | Most sections use `border-t border-slate-200/70`. Consider replacing hard borders with soft gradient dividers using a full-width `h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent` for a more premium look. | All section boundaries |
| 5.6 | **Consistent section top padding** | Hero: `pt-28`, Manifesto: `py-24`, ServiceShowcase: `pt-24 pb-24`, Contact: `pt-32 pb-12`. Standardise to `pt-28 md:pt-32 pb-24` across all major sections. | All section components |

---

## 6. PERFORMANCE OPTIMIZATIONS

### P0 — Must Fix

| # | Item | Detail | Files |
|---|------|--------|-------|
| 6.1 | **Service images unoptimized** | `ServiceShowcase.tsx` loads 5 remote images (1400px Pexels/Unsplash). Use Next.js `<Image>` with `sizes`, `placeholder="blur"`, and WebP/AVIF format. Or self-host optimized versions. Current Lighthouse TBT is 4180ms. | `ServiceShowcase.tsx:13–45` |
| 6.2 | **GSAP/ScrollTrigger dynamic import weight** | GSAP + ScrollTrigger are dynamically imported per `useSparkHighlights` call but the hook is used 3 times (Hero, ServiceShowcase, Manifesto). Ensure the import is deduplicated (it should be by the bundler, but verify). Consider a single provider. | `useSparkHighlights.ts` |
| 6.3 | **Three.js AnimatedGlobe loaded 4 times** | The globe component is dynamically imported in Navbar (logo), Footer (logo), Contact (large decorative), and menu overlay. Each renders a WebGL context. Multiple active WebGL contexts are expensive. Consider rendering the globe once and reusing via portal, or use a static SVG/image for the logo instances. | `Navbar.tsx:6`, `Footer.tsx:4`, `Contact.tsx:4,395` |

### P1 — High Value

| # | Item | Detail | Files |
|---|------|--------|-------|
| 6.4 | **Blob background `will-change`** | All 5 blob spans have `will-change: transform`, which forces GPU layer promotion. This is ~5 extra compositing layers permanently. Consider removing `will-change` from CSS and letting the browser optimize, or add it only on interaction. | `globals.css:137` |
| 6.5 | **LiquidEffects global listener** | `LiquidEffects.tsx` adds a global `pointermove` listener that queries the DOM on every move event. Add a `requestAnimationFrame` throttle or use passive event listener options. | `LiquidEffects.tsx:20` |
| 6.6 | **ParticleBackground unused but bundled?** | `ParticleBackground.tsx` exists with a full canvas animation loop but is NOT used in `App.tsx`. If not needed, remove to reduce bundle. | `ParticleBackground.tsx` |
| 6.7 | **Bundle size** | `framer-motion` (~110KB gzipped) + `three` (~150KB gzipped) + `gsap` (~25KB) is a significant JS payload. Consider: (a) Replace Framer Motion simple animations (opacity/y) with CSS animations or `@starting-style`, (b) Lazy-load Three.js globe only when visible. | `package.json` |

---

## 7. ACCESSIBILITY

### P0 — Must Fix

| # | Item | Detail | Files |
|---|------|--------|-------|
| 7.1 | **Focus trap in menu overlay** | When the menu overlay opens, focus should be trapped inside it. Currently ESC close is implemented but no focus trap. Use a focus-trap library or manual `tabindex` management. | `Navbar.tsx:23–37` |
| 7.2 | **Accessible names for all buttons** | Already fixed for menu buttons (aria-label present). Verify the ServiceShowcase quick-nav buttons and the Hero scroll-down arrow also have labels. The arrow doesn't have one. | `Hero.tsx:138`, `ServiceShowcase.tsx` |
| 7.3 | **Form labels not connected** | Contact form `<label>` elements are not programmatically linked to their inputs (no `htmlFor`/`id` pairing). Add matching `id` attributes. | `Contact.tsx:358–386` |

### P1 — High Value

| # | Item | Detail | Files |
|---|------|--------|-------|
| 7.4 | **Skip navigation link** | No skip-to-content link exists. Add a visually-hidden skip link as the first focusable element. | `layout.tsx` or `App.tsx` |
| 7.5 | **Reduced motion support** | As noted in 3.1, add `useReducedMotion()` checks from Framer Motion and disable GSAP animations accordingly. | All animated components |

---

## 8. SECURITY (Cross-reference with `security-audit-todo.md`)

### Status of Existing Items

| Security Item | Status | Notes |
|---|---|---|
| NODE_TLS_REJECT_UNAUTHORIZED=0 | **Still active** — visible in dev server log | Remove from `.env.local` or system env immediately |
| Security headers at Hostinger | **Not yet deployed** | CSP, HSTS, X-Frame-Options, Referrer-Policy needed |
| Contact form anti-abuse | **Not implemented** | No honeypot, no CAPTCHA, no rate limiting |
| Teams widget domain validation | **Env-driven** but no allowlist | Validate script URL against known Microsoft CDN |
| `sitemap.ts`, `robots.ts`, `manifest.ts` | **Missing** | Create all three for SEO/security |
| Google Maps iframe hardening | **Partial** | Add `sandbox="allow-scripts allow-same-origin"` and tighter `allow` attribute |

### New Security Findings

| # | Item | Detail | Files |
|---|------|--------|-------|
| 8.1 | **External link to `898.tv/cjnit`** | The "Get Support Now" hero button links to `http://898.tv/cjnit` — a URL shortener over HTTP (not HTTPS). This is a phishing risk and looks unprofessional. Replace with the actual destination URL over HTTPS. | `Hero.tsx:113` |
| 8.2 | **No CSP meta tag fallback** | Since this is a static export, consider adding a `<meta http-equiv="Content-Security-Policy">` in the `<head>` as a fallback until Hostinger headers are configured. | `layout.tsx` |
| 8.3 | **Google Maps embed without `allow` constraint** | The iframe doesn't specify an `allow` attribute. Add `allow="geolocation"` at minimum (or restrict to empty) and add `loading="lazy"`. | `Contact.tsx:410` |

---

## 9. SUGGESTED SUBTLE EFFECTS (NEW ADDITIONS)

These are specific recommendations for the "really polished" feel:

### Scroll-Linked

1. **Section background color shift** — As user scrolls from Hero → Manifesto → ServiceShowcase, subtly shift the body/background tint via CSS custom properties driven by scroll position (e.g., warmer blue tint near contact section). Low overhead with CSS scroll-driven animations (2026 browser support is good).

2. **Smooth number counters** — In Manifesto's "20+ years" tile, animate the number counting up from 0 on scroll-in using CSS `@property` counter animation. No JS needed.

3. **Text underline draw-in** — For section kicker text, instead of (or in addition to) the spark effect, add a `<span>` with a CSS `scaleX(0) → scaleX(1)` underline animation on scroll-in. Lightweight and eye-catching.

4. **Image reveal clip-path** — ServiceShowcase card images could reveal via `clip-path: inset(100% 0 0 0) → inset(0)` on scroll-in for a "curtain" effect.

### Hover-Linked

5. **Button magnetic effect** — For CTAs, add a subtle "magnetic" pull toward the cursor (similar to Apple-style buttons) using the existing `LiquidEffects.tsx` pointer tracking. Shift button position by 2-3px toward cursor on near-hover.

6. **Glass card hover glow** — The morph-card system already tracks cursor position. Enhance the `::after` ripple to include a brand-blue edge glow (`box-shadow: 0 0 30px var(--liquid-glow)`) that follows the cursor.

7. **Nav link hover underline animation** — Menu links in the glass dock currently just change color. Add a `::after` pseudo-element with `scaleX(0) → scaleX(1)` origin-left underline animation.

### Micro-Interactions

8. **Form input focus glow** — On input focus, add a subtle `box-shadow: 0 0 0 4px rgba(3, 49, 140, 0.08)` expanding ring animation for a premium form feel.

9. **Submit button success state** — After form submit success, briefly show a checkmark icon morphing from the arrow icon (Lottie or CSS keyframe).

10. **Scroll-to-top smooth** — When clicking the ServiceShowcase "up" button, add a smooth easing curve rather than browser default smooth scroll.

---

## 10. RECOMMENDED IMPLEMENTATION ORDER

### Sprint 1 — Quick Wins (1-2 days)
- [ ] 1.2 — Fix low-contrast text (accessibility)
- [ ] 4.3 — Fix selection color conflict
- [ ] 7.2 — Add aria-label to Hero arrow
- [ ] 7.3 — Connect form labels with htmlFor/id
- [ ] 8.1 — Replace HTTP shortener URL
- [ ] 5.1 — Simplify Hero CTA cluster (2 buttons max)
- [ ] 4.4 — Remove unused dark components or tree-shake

### Sprint 2 — Visual Polish (2-3 days)
- [ ] 3.2 — Add blur entrance to sections
- [ ] 3.4 — Stagger contact info items
- [ ] 3.6 — Add scroll progress bar
- [ ] 3.8 — Enhance About word-reveal with translateY
- [ ] 2.4 — Replace partner text with SVG logos
- [ ] 5.5 — Gradient section dividers
- [ ] 9.3 — Kicker underline draw-in effect
- [ ] 9.7 — Nav link hover underline animation

### Sprint 3 — Performance (1-2 days)
- [ ] 6.1 — Optimize service images (Next Image or self-host WebP)
- [ ] 6.3 — Reduce WebGL globe instances (static SVG for logo sizes)
- [ ] 6.5 — Throttle LiquidEffects pointermove
- [ ] 6.6 — Remove ParticleBackground if unused
- [ ] 3.1 — Add prefers-reduced-motion support to all animations

### Sprint 4 — Accessibility + Security (1-2 days)
- [ ] 7.1 — Focus trap in menu overlay
- [ ] 7.4 — Skip navigation link
- [ ] 1.1 — Fix heading hierarchy
- [ ] 8.2 — Add CSP meta tag
- [ ] 8.3 — Harden Google Maps iframe
- [ ] Security items from `security-audit-todo.md` P0 list

### Sprint 5 — Advanced Polish (2-3 days)
- [ ] 9.1 — Scroll-driven background color shift
- [ ] 9.2 — Number counter animation
- [ ] 9.4 — Image reveal clip-path
- [ ] 9.5 — Magnetic button effect
- [ ] 9.8 — Form input focus glow
- [ ] 5.3 — Move Privacy/Terms to footer, enhance footer

---

## Color Palette Reminder (from Complementary colors.txt)

```
Blue shades (dark to light):  #03318C → #022873 → #165FF2 → #3B8DBF → #F2F2F2
Primary orange:               #F29216
Secondary orange:             #BF4904, #BF5B04
Yellow accent:                #F2C916
Slate:                        #445373
```

These are correctly mapped in `globals.css` CSS variables and `tailwind.config.ts`. The separate `design-system-fonts-and-colors.md` doc references a different palette (#005596, #00AEEF, #FFAA40) — that doc needs updating to match the actual implementation.
