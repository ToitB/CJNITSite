# Glint Depth Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the shockwave effect and make the fixed endpoint glint read more like a realistic light flare using shader-only layering.

**Architecture:** Keep the existing fixed `starPos`, burst timing, and star timing. Delete the shockwave block and replace it with a layered glint made from a hot inner core, softer shell, elongated rays, subtle chromatic fringe, and view-dependent shaping.

**Tech Stack:** Next.js, React Three Fiber, GLSL shader material, Node test runner

---

### Task 1: Replace the shockwave regression with glint-depth assertions

**Files:**
- Modify: `components/exactGlobePort.test.js`
- Modify: `components/GlobeShaderMaterial.ts`

**Step 1: Write the failing test**

Update the shader test to assert that `shockwave` terms are absent and that new glint-depth terms are present.

**Step 2: Run test to verify it fails**

Run: `node --test components/exactGlobePort.test.js`
Expected: FAIL because the shader still contains shockwave logic.

**Step 3: Write minimal implementation**

Remove the shockwave block and add layered glint terms in `components/GlobeShaderMaterial.ts`.

**Step 4: Run test to verify it passes**

Run: `node --test components/exactGlobePort.test.js`
Expected: PASS

**Step 5: Verify build**

Run: `npm run build`
Expected: PASS
