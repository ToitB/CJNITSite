# Lighthouse Accessibility + Performance Audit TODO

Date: 2026-02-17  
Source report: `C:\Users\Toit.CJN\Downloads\NextJSSite.pdf` (captured Feb 17, 2026, 12:56 PM GMT+2, Lighthouse 13.0.1, mobile emulation/Slow 4G).

## Baseline from Lighthouse

1. Performance: `58`
2. Accessibility: `89`
3. Best Practices: `100`
4. SEO: `100`
5. FCP: `0.8s`
6. LCP: `3.0s`
7. TBT: `4180ms`
8. Speed Index: `6.5s`
9. CLS: `0`

Top Lighthouse flags:

1. Reduce JavaScript execution time (`9.0s`)
2. Minimize main-thread work (`14.4s`)
3. Reduce unused JavaScript (est. `113 KiB`)
4. Avoid enormous network payloads (`3,629 KiB`)
5. Buttons do not have an accessible name
6. Insufficient color contrast
7. Heading order not sequential

## Code-level audit mapping

## Accessibility

1. Icon-only menu buttons need explicit names:
   - `components/Navbar.tsx:76` (open menu button)
   - `components/Navbar.tsx:115` (close button)

2. Heading hierarchy skip in contact section:
   - Section headline is effectively `h2`, then contact blocks use `h4` directly (`components/Contact.tsx:236`, `components/Contact.tsx:249`, `components/Contact.tsx:259`, `components/Contact.tsx:269`, `components/Contact.tsx:286`, `components/Contact.tsx:303`).

3. Low-contrast small text on frosted backgrounds:
   - Multiple `text-slate-400/500` usages in navbar/contact/footer labels (`components/Navbar.tsx:51`, `components/Contact.tsx:334`, `components/Contact.tsx:347`, `components/Contact.tsx:360`, `components/Contact.tsx:425`).

## Performance

1. Background particle network is expensive every frame:
   - Point count dynamically ranges ~`760-1400` (`components/BackgroundCanvas.tsx:88`)
   - Per-frame loops over all points + edges (`components/BackgroundCanvas.tsx:287`, `components/BackgroundCanvas.tsx:301`)
   - Continuous `requestAnimationFrame` render loop (`components/BackgroundCanvas.tsx:282`)

2. Spark text effect adds runtime cost:
   - Dynamic imports of GSAP + ScrollTrigger (`components/useSparkHighlights.ts:13`)
   - Splits each highlighted string into per-character spans and animates each char (`components/useSparkHighlights.ts:21`, `components/useSparkHighlights.ts:50`, `components/useSparkHighlights.ts:82`)

3. Service cards use large remote images and plain `<img>`:
   - Several 2000px remote URLs (`components/ServiceShowcase.tsx:13`, `components/ServiceShowcase.tsx:21`, `components/ServiceShowcase.tsx:29`, `components/ServiceShowcase.tsx:37`, `components/ServiceShowcase.tsx:45`)
   - Unoptimized image element (`components/ServiceShowcase.tsx:88`)

## Prioritized TODO

## P0 (do first)

1. Add accessible names to all icon-only buttons:
   - Add `aria-label` for menu open/close in navbar.

2. Fix heading sequence:
   - Change contact block titles from `h4` to `h3` (or make them non-heading labels if they are not structural headings).

3. Raise text contrast for UI labels:
   - Replace critical `text-slate-400/500` small text with darker values on frosted panels.
   - Verify WCAG AA contrast for text under 18px.

4. Reduce main-thread animation load:
   - Lower `BackgroundCanvas` point and edge density (especially mobile).
   - Add performance mode fallback for low-power devices and `prefers-reduced-motion`.

5. Reduce image payload on landing:
   - Replace 2000px service images with optimized WebP/AVIF assets sized to card display.
   - Keep lazy loading and set explicit dimensions.

## P1 (high value)

1. Defer non-critical animation libraries:
   - Initialize spark highlights only when section is near viewport.
   - Cap per-character animation count for long text blocks.

2. Progressive enhancement for visual effects:
   - Disable heavy background animation on mobile/low-end hardware.
   - Provide static fallback background layer.

3. Improve caching strategy:
   - Self-host critical hero/service images where possible.
   - Set strong cache headers for static assets at Hostinger.

4. Add route-level performance checks:
   - Run Lighthouse on `/`, `/resources`, `/blog`, `/privacy`, `/terms`.

## P2 (validation + guardrails)

1. Add automated accessibility checks in CI:
   - Use axe/pa11y on key routes.

2. Add performance budget checks:
   - Track JS bundle size and total payload deltas per PR.

3. Add manual accessibility QA pass:
   - Keyboard navigation, focus visibility, screen-reader labels, heading map.

## Acceptance targets for next audit

1. Accessibility score: `>=95`
2. Performance score: `>=80` on mobile profile
3. TBT: `<800ms`
4. LCP: `<2.5s`
5. No “buttons without accessible name”
6. No heading-order warning
7. No contrast failure for core UI copy
