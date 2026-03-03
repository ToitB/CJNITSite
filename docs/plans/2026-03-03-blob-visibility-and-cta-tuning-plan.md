# Blob Visibility And CTA Tuning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the new site-wide blob background visible but still subtle, and fix the CTA ripple and washed-out button styling.

**Architecture:** The site-wide background is provided by the shared `BackgroundCanvas` component and currently loses visibility through low blob opacity plus extra white veil layers and page-level dimming. CTA behavior is controlled by shared CSS in `app/globals.css` and pointer tracking in `components/LiquidEffects.tsx`, so the correct fix is to strengthen the background at the source and correct the shared ripple/button system rather than patching individual CTAs.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, CSS keyframes, Framer Motion

---

### Task 1: Save plan and create backup checkpoint

**Files:**
- Create: `docs/plans/2026-03-03-blob-visibility-and-cta-tuning-plan.md`

**Step 1: Save this plan**

Write this document to `docs/plans/2026-03-03-blob-visibility-and-cta-tuning-plan.md`.

**Step 2: Create backup commit**

Run:
```bash
git add docs/plans/2026-03-03-blob-visibility-and-cta-tuning-plan.md
git commit -m "backup: before blob visibility and cta ripple tuning"
```

### Task 2: Fix blob visibility at the source

**Files:**
- Modify: `components/BackgroundCanvas.tsx`
- Modify: `components/BlogPageContent.tsx`
- Modify: `components/ResourcesPageContent.tsx`

**Step 1: Strengthen blob density**

Increase blob opacity modestly and reduce the amount of self-whitening overlay so the blobs remain subtle but visible on white.

**Step 2: Remove page-level suppression**

Reduce or remove the extra `opacity-70` and blur wrappers on pages that currently dim the background.

**Step 3: Keep motion restrained**

Do not add interactive hotspot behavior; preserve the slow ambient movement.

### Task 3: Fix CTA ripple targeting and button color balance

**Files:**
- Modify: `components/LiquidEffects.tsx`
- Modify: `app/globals.css`
- Verify: `components/Hero.tsx`

**Step 1: Fix ripple targeting**

Add `.btn-primary`, `.btn-accent`, and `.btn-primary-compact` to the pointer-tracking selector.

**Step 2: Diffuse the ripple**

Replace the spotlight-like radial treatment with a wider, softer orange-to-blue blend.

**Step 3: Increase CTA color density**

Reduce white gloss and strengthen the blue/orange base gradients so the CTAs do not look washed out on a light background.

**Step 4: Avoid stacked hover motion**

Make sure the shared button hover and Framer Motion scaling do not fight each other visually.

### Task 4: Verification

**Files:**
- Verify: `app/globals.css`
- Verify: `components/BackgroundCanvas.tsx`
- Verify: `components/LiquidEffects.tsx`

**Step 1: Run production build**

Run:
```bash
npm run build
```
Expected: successful production build.

**Step 2: Commit implementation**

Run:
```bash
git add app/globals.css components/BackgroundCanvas.tsx components/LiquidEffects.tsx components/BlogPageContent.tsx components/ResourcesPageContent.tsx
git commit -m "fix: improve blob visibility and cta glass feedback"
```
