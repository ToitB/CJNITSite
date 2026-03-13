# Burst Ripple Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a lingering ripple ring to the globe burst so the endpoint flash decays more gracefully without moving the fixed glint location.

**Architecture:** Keep the existing fixed `starPos`, burst timing, and glint timing. Add one extra shader term that uses the same burst trigger but drives a delayed expanding ring and a soft residual halo around the endpoint.

**Tech Stack:** Next.js, React Three Fiber, GLSL shader material, Node test runner

---

### Task 1: Add a failing shader regression test for the ripple

**Files:**
- Modify: `components/exactGlobePort.test.js`
- Test: `components/exactGlobePort.test.js`

**Step 1: Write the failing test**

Add assertions for dedicated ripple timing and ring terms in `components/exactGlobePort.test.js`.

**Step 2: Run test to verify it fails**

Run: `node --test components/exactGlobePort.test.js`
Expected: FAIL because the ripple terms do not exist yet.

**Step 3: Write minimal implementation**

Add a delayed expanding ripple ring and lingering bloom in `components/GlobeShaderMaterial.ts`.

**Step 4: Run test to verify it passes**

Run: `node --test components/exactGlobePort.test.js`
Expected: PASS

**Step 5: Verify build**

Run: `npm run build`
Expected: PASS
