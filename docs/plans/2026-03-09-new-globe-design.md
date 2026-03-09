# New Globe Integration Design

**Date:** 2026-03-09

## Goal

Replace the current animated globe everywhere it appears in the site with the newer `NewGlobeDes` visual language while keeping the result aligned with the CJN brand palette and preserving the existing component API.

## Current Context

- The live site uses a shared [`components/AnimatedGlobe.tsx`](/C:/CJN%20IT%20Production%20apps/SiteNewGlobe/components/AnimatedGlobe.tsx) component in the navbar, mobile menu, footer, and contact section.
- [`app/export-globe/page.tsx`](/C:/CJN%20IT%20Production%20apps/SiteNewGlobe/app/export-globe/page.tsx) currently duplicates the old globe renderer for PNG export.
- The `NewGlobeDes` folder contains a separate Vite demo built with `@react-three/fiber` and `@react-three/drei`.
- The main site already ships with `three`, but not the React Three Fiber runtime.

## Chosen Approach

Adapt the `NewGlobeDes` look into the site's existing plain-Three implementation model instead of importing the Vite demo directly.

## Why This Approach

- Preserves the current `AnimatedGlobe` props and usage sites.
- Avoids adding extra renderer dependencies to a Next 16 / React 19 codebase.
- Lets the export page and the live component share one scene definition instead of drifting apart.
- Keeps the integration easy to reason about and easier to maintain.

## Visual Direction

- Keep the new globe's layered shell, halo, arc, and marker language from `NewGlobeDes`.
- Remap its colors to the existing site palette:
  - `--brand-blue`
  - `--brand-cyan`
  - `--brand-dark`
  - restrained use of `--brand-orange` only if it improves depth without overpowering the blue system
- Keep transparent rendering so the component still sits naturally inside the site's existing glass UI.

## Technical Design

- Extract globe palette and scene-building logic into a shared helper.
- Update `AnimatedGlobe` to render the new scene while keeping the current `size`, `className`, and `ariaLabel` props unchanged.
- Update `app/export-globe/page.tsx` to render and export the same shared scene.
- Keep client-only rendering and existing cleanup discipline for WebGL resources.

## Verification

- Add a small automated test around the shared globe configuration so the palette and export/live scene contract is validated before implementation.
- Run the new test.
- Run `npm run build`.

