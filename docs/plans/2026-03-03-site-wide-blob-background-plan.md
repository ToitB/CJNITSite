# Site-Wide Blob Background Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current site-wide Three.js network background with a subtle white-based animated blob canvas using the complementary blue and slate palette.

**Architecture:** The current shared `BackgroundCanvas` component is mounted by multiple page shells. Replacing that component in-place with a lightweight React/CSS blob layer keeps integration simple and ensures all existing consumers inherit the new background without page-level refactors. The visual effect should stay low-contrast, highly blurred, and non-interactive so it supports rather than competes with the glass UI.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4, CSS keyframes

---

### Task 1: Capture the approved plan and take a backup commit

**Files:**
- Create: `docs/plans/2026-03-03-site-wide-blob-background-plan.md`
- Verify: `components/BackgroundCanvas.tsx`

**Step 1: Save the implementation plan**

Write this document to `docs/plans/2026-03-03-site-wide-blob-background-plan.md`.

**Step 2: Create the backup commit**

Run:
```bash
git add docs/plans/2026-03-03-site-wide-blob-background-plan.md
git commit -m "backup: before site-wide blob background replacement"
```

Expected: clean checkpoint before visual changes.

### Task 2: Replace the shared background component

**Files:**
- Modify: `components/BackgroundCanvas.tsx`

**Step 1: Remove the Three.js network implementation**

Delete the point cloud, line network, mouse-drift, and render loop logic.

**Step 2: Implement the blob background**

Build a lightweight React component that renders:
- a white base layer
- 4 to 6 softly blurred animated blobs
- palette constrained to `#03318C`, `#022873`, `#165FF2`, `#3B8DBF`, `#445373`
- low opacity and large blur radius
- no pointer-driven hotspot

**Step 3: Keep API compatibility**

Preserve the existing `BackgroundCanvas` export so current imports remain unchanged.

### Task 3: Add shared animation styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Add background blob keyframes**

Create a small set of reusable keyframes for slow drift, scale breathing, and rotational movement.

**Step 2: Add blob utility classes if needed**

Define minimal classes for site-wide blob layers. Avoid introducing a new dependency or overcomplicated utility structure.

### Task 4: Verify site-wide integration and build

**Files:**
- Verify: `components/BlogPageContent.tsx`
- Verify: `components/ResourcesPageContent.tsx`
- Verify: `components/PrivacyPageContent.tsx`
- Verify: `components/TermsPageContent.tsx`

**Step 1: Confirm existing pages still mount the shared component**

Run:
```bash
rg -n "BackgroundCanvas" components app
```
Expected: existing page shells still consume `BackgroundCanvas` without further edits.

**Step 2: Run build verification**

Run:
```bash
npm run build
```
Expected: successful production build.

**Step 3: Commit the implementation**

Run:
```bash
git add app/globals.css components/BackgroundCanvas.tsx
git commit -m "feat: replace network canvas with subtle blob background"
```
Expected: isolated implementation commit after successful build.
