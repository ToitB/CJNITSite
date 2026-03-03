# Ein Liquid Glass Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Finish the Ein-inspired liquid glass pass by normalizing grouped card treatments, CTA styling, and accent colors across the remaining surfaces.

**Architecture:** The site uses a shared CSS-driven glass system in `app/globals.css` and a lightweight cursor-driven ripple controller in `components/LiquidEffects.tsx`. The final pass should reuse those primitives and only adjust component-level class usage and palette assignments where the old styling still leaks through.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind v4 utilities, Framer Motion

---

### Task 1: Document and inspect the remaining liquid-glass surface map

**Files:**
- Create: `docs/plans/2026-03-03-ein-liquid-glass-design.md`
- Modify: `docs/plans/2026-03-03-ein-liquid-glass-implementation-plan.md`
- Verify: `components/ServiceShowcase.tsx`
- Verify: `components/ResourcesPageContent.tsx`
- Verify: `components/BlogPageContent.tsx`
- Verify: `components/Contact.tsx`

**Step 1: Confirm the remaining outliers**

Run: `rg -n "glass-card|glass-card-strong|glass-card-accent|btn-primary|btn-accent|backgroundColor:" components app`
Expected: A short list of remaining surfaces and inline colors.

**Step 2: Record the grouping model**

Document:
- `glass-card` for informational tiles
- `glass-card-strong` for dense content windows
- `glass-card-accent` for conversion/action windows

**Step 3: Commit after implementation batch**

Use a focused commit once the surface grouping work is complete.

### Task 2: Normalize service showcase palette and utility controls

**Files:**
- Modify: `components/ServiceShowcase.tsx`

**Step 1: Replace out-of-palette service colors**

Update the `services` array so icon tiles use only the complementary palette:
- Managed IT: `#03318C`
- Backup: `#445373`
- Security: `#165FF2`
- Cloud: `#F29216`
- Hardware: `#022873`

**Step 2: Keep quick-nav controls on the dock treatment**

Verify the up/down utility buttons still use `glass-dock-item` and keep orange ripple feedback through shared CSS.

**Step 3: Verify visual readability**

Ensure icon contrast remains high (`text-white`) and supporting copy remains readable over frosted glass.

### Task 3: Align resource, blog, and contact surfaces by role

**Files:**
- Modify: `components/ResourcesPageContent.tsx`
- Modify: `components/BlogPageContent.tsx`
- Modify: `components/Contact.tsx`

**Step 1: Resource hub grouping**

Apply:
- first two resource tiles as informational blue glass
- repository tile as orange-accent glass

**Step 2: Blog grouping**

Keep article tiles in the informational glass group and ensure the CTA buttons remain blue-glass compact actions.

**Step 3: Contact grouping**

Apply the same grouping to the map/find-us surface and the left-column utility icon chips if needed so the section matches the rest of the site.

### Task 4: Verification

**Files:**
- Verify: `app/globals.css`
- Verify: `components/*.tsx`

**Step 1: Run build verification**

Run: `npm run build`
Expected: Successful production build.

**Step 2: Check git diff**

Run: `git status --short`
Expected: Only intended UI files changed; ignore generated `next-env.d.ts` if it has no meaningful diff.

**Step 3: Commit**

```bash
git add app/globals.css components/ServiceShowcase.tsx components/ResourcesPageContent.tsx components/BlogPageContent.tsx components/Contact.tsx docs/plans/2026-03-03-ein-liquid-glass-design.md docs/plans/2026-03-03-ein-liquid-glass-implementation-plan.md
git commit -m "feat: finish liquid glass card grouping"
```
