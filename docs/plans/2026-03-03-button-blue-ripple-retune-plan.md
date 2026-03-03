# Button Blue Ripple Retune Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Retune buttons and CTAs to use a blue interaction highlight while leaving tile/card orange highlights unchanged.

**Architecture:** Buttons and cards share some glass infrastructure, but their interaction layers are separated in `app/globals.css`. The correct fix is to change only the button ripple/focus/hover halo tokens and gradients, leaving card and morph-card highlight styles untouched.

**Tech Stack:** Next.js App Router, React 19, Tailwind v4, CSS custom properties

---

### Task 1: Retune button highlight tokens
- Modify: `app/globals.css`
- Change button-only ripple emphasis from orange-led to blue-led.
- Change button focus/hover ring from orange to blue.

### Task 2: Verify
- Run: `npm run build`
Expected: successful production build.
