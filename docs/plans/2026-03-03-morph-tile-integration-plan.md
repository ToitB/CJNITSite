# Morph Tile Integration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply an Ein-inspired morph hover effect to the manifesto, resources, and blog tiles without disturbing the rest of the glass system.

**Architecture:** Reuse the existing pointer-tracking infrastructure in `components/LiquidEffects.tsx` and add a dedicated `.morph-card` layer in `app/globals.css`. Only the targeted tile components will opt into the effect via class names, keeping the rest of the UI stable.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, CSS custom properties

---

### Task 1: Add shared morph-card styling
- Modify: `app/globals.css`
- Modify: `components/LiquidEffects.tsx`

### Task 2: Opt the targeted tiles into morph behavior
- Modify: `components/Manifesto.tsx`
- Modify: `components/ResourcesPageContent.tsx`
- Modify: `components/BlogPageContent.tsx`

### Task 3: Verify build
- Run: `npm run build`
Expected: successful production build.
