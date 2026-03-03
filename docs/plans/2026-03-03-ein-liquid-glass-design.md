# Ein Liquid Glass Design

**Date:** 2026-03-03

## Goal
Apply an Ein-inspired liquid glass treatment to the site without copying the reference components directly, using the complementary palette already added to the repo and keeping the current layout, content hierarchy, and motion patterns intact.

## Constraints
- Respect existing component structure and current copy.
- Keep CTA hierarchy clear: primary blue glass for navigation and core actions, orange accent glass for urgency/support or repository actions.
- Use orange only for ripple/highlight emphasis.
- Preserve readability on all frosted surfaces.
- Do not introduce a new runtime dependency.

## Recommended Approach
1. Keep the current shared CSS-based glass system as the core implementation because it is already integrated globally and is lighter than embedding individual reference components.
2. Group surfaces by role:
   - Informational tiles: blue glass (`glass-card`)
   - Dense/primary windows: stronger blue glass (`glass-card-strong`)
   - Action-heavy or conversion surfaces: orange-accent glass (`glass-card-accent`)
3. Keep dock behavior limited to navigation and compact utility controls to avoid overusing the effect.
4. Normalize the remaining outlier colors in service cards and secondary content cards to the complementary palette.

## Target Areas
- `components/ServiceShowcase.tsx`
- `components/ResourcesPageContent.tsx`
- `components/BlogPageContent.tsx`
- `components/Contact.tsx`
- `app/globals.css`

## Verification
- `next build`
- Manual visual sweep for CTA contrast, card grouping consistency, and ripple visibility.
