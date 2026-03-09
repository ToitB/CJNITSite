# New Globe Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the old animated globe everywhere on the site and in the export page with a shared implementation based on `NewGlobeDes`, recolored to the CJN palette.

**Architecture:** Build one shared plain-Three globe scene helper, then use it from both the live `AnimatedGlobe` component and the export page. Keep the public component API stable so existing call sites do not need structural changes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Three.js, Node built-in test runner

---

### Task 1: Shared scene contract

**Files:**
- Create: `components/animatedGlobeScene.js`
- Create: `components/animatedGlobeScene.test.js`

**Step 1: Write the failing test**

Create a Node test that imports the new helper and asserts:
- the exported palette uses CJN brand-aligned colors
- the helper returns the scene parts needed by both live rendering and export rendering
- the helper exposes deterministic sizing/default options

**Step 2: Run test to verify it fails**

Run: `node --test components/animatedGlobeScene.test.js`
Expected: FAIL because the helper does not exist yet.

**Step 3: Write minimal implementation**

Create the shared helper with:
- brand palette constants
- scene construction for the shell, halo, arc, diamond marker, and bubbles
- helpers to update animation state and dispose resources

**Step 4: Run test to verify it passes**

Run: `node --test components/animatedGlobeScene.test.js`
Expected: PASS

**Step 5: Commit**

Run after the full feature is complete, not after this isolated task.

### Task 2: Replace live globe component

**Files:**
- Modify: `components/AnimatedGlobe.tsx`
- Use: `components/animatedGlobeScene.js`

**Step 1: Write the failing test**

Use the existing shared-helper contract test as the gate. Confirm the live component still depends on the old scene implementation until the helper is wired in.

**Step 2: Run test/build to verify current mismatch**

Run:
- `node --test components/animatedGlobeScene.test.js`
- `npm run build`

Expected:
- test passes for helper contract only after Task 1
- build is still green before the component swap

**Step 3: Write minimal implementation**

Refactor `AnimatedGlobe.tsx` to:
- initialize renderer/camera/scene
- call the shared scene builder
- animate via the shared update helper
- preserve current props and accessibility behavior

**Step 4: Run verification**

Run:
- `node --test components/animatedGlobeScene.test.js`
- `npm run build`

Expected: PASS

**Step 5: Commit**

Include in final feature commit.

### Task 3: Replace export page renderer

**Files:**
- Modify: `app/export-globe/page.tsx`
- Use: `components/animatedGlobeScene.js`

**Step 1: Write the failing test**

Extend the shared-helper test to assert the export page dependencies needed by the helper remain available, if a contract gap appears during refactor.

**Step 2: Run test/build to verify it catches the gap**

Run:
- `node --test components/animatedGlobeScene.test.js`

Expected: FAIL if helper contract does not yet support export page needs.

**Step 3: Write minimal implementation**

Refactor the export page to:
- build the same globe scene through the shared helper
- keep preview, time scrubbing, transparent background, and PNG export behavior
- reuse the helper's animation update logic

**Step 4: Run verification**

Run:
- `node --test components/animatedGlobeScene.test.js`
- `npm run build`

Expected: PASS

**Step 5: Commit**

Use a single final feature commit for all relevant files.

### Task 4: Final review and commit

**Files:**
- Review: `components/AnimatedGlobe.tsx`
- Review: `components/animatedGlobeScene.js`
- Review: `components/animatedGlobeScene.test.js`
- Review: `app/export-globe/page.tsx`
- Review: `docs/plans/2026-03-09-new-globe-design.md`
- Review: `docs/plans/2026-03-09-new-globe-integration-plan.md`

**Step 1: Review diff**

Run: `git diff -- components/AnimatedGlobe.tsx components/animatedGlobeScene.js components/animatedGlobeScene.test.js app/export-globe/page.tsx docs/plans/2026-03-09-new-globe-design.md docs/plans/2026-03-09-new-globe-integration-plan.md`

**Step 2: Run final verification**

Run:
- `node --test components/animatedGlobeScene.test.js`
- `npm run build`

Expected: PASS

**Step 3: Commit**

Run:
`git add components/AnimatedGlobe.tsx components/animatedGlobeScene.js components/animatedGlobeScene.test.js app/export-globe/page.tsx docs/plans/2026-03-09-new-globe-design.md docs/plans/2026-03-09-new-globe-integration-plan.md`

`git commit -m "feat: replace globe with new shared design"`
