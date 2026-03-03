# Blob Definition Refinement Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the site-wide blobs read as visible soft color pools by tightening their gradients and reducing blur.

**Architecture:** The shared background already has the right layering and visibility. The remaining issue is shape definition: the blobs fade too far outward and blur too heavily, so they read as haze. The fix is limited to `components/BackgroundCanvas.tsx` and `app/globals.css`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, CSS filters

---

### Task 1: Refine blob definition

**Files:**
- Modify: `components/BackgroundCanvas.tsx`
- Modify: `app/globals.css`

**Step 1: Tighten the radial gradients**
Reduce the fade radius so each blob holds color longer before fading.

**Step 2: Reduce blur**
Lower blob blur to make the forms more legible without becoming harsh.

**Step 3: Verify**
Run `npm run build` and confirm the production build succeeds.
