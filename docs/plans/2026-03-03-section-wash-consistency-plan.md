# Section Wash Consistency Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the shared site-wide blob background visible by reducing competing homepage section washes and removing the extra local hero background treatment.

**Architecture:** The shared `BackgroundCanvas` is already mounted correctly, but multiple near-opaque section backgrounds on the homepage suppress it. The correct fix is to standardize those section wrappers to a lighter wash and remove the extra hero-specific gradient mesh so the site uses one background language consistently.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, CSS gradients

---

### Task 1: Save the approved plan

**Files:**
- Create: `docs/plans/2026-03-03-section-wash-consistency-plan.md`

**Step 1: Save this document**

Write this plan to `docs/plans/2026-03-03-section-wash-consistency-plan.md`.

### Task 2: Standardize homepage section washes

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Manifesto.tsx`
- Modify: `components/ServiceShowcase.tsx`
- Modify: `components/Contact.tsx`

**Step 1: Reduce full-width section opacity**

Replace the heavier `bg-white/*` and `bg-slate-50/*` section washes with lighter translucent fills so the shared background can show through.

**Step 2: Remove the hero-local background mesh**

Delete the extra blob/mesh div inside `components/Hero.tsx` so there is only one background system.

**Step 3: Preserve content readability**

Keep content cards and dense windows frosted; only lighten the broad section wrappers.

### Task 3: Apply a small background visibility lift and verify

**Files:**
- Modify: `components/BackgroundCanvas.tsx`

**Step 1: Slightly increase shared blob presence**

Make a small blob-strength adjustment only after the section washes are reduced.

**Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: successful production build.
