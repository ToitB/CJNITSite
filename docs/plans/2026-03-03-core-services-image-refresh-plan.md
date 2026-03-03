# Core Services Image Refresh Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the core services images with the new local public assets and correct the capability numbering order.

**Architecture:** The service content is driven by the `services` array in `components/ServiceShowcase.tsx`, so the minimal safe fix is to update only that data source. Local image paths from `Public/` will replace the remote URLs, and the capability ids will be normalized sequentially in display order.

**Tech Stack:** Next.js App Router, React 19, TypeScript

---

### Task 1: Update service data
- Modify: `components/ServiceShowcase.tsx`
- Replace remote image URLs with `/managed.jpg`, `/backup.jpg`, `/security.jpg`, `/cloud.jpg`, `/procurement.jpg`
- Normalize capability ids to `01` through `05` in the visible order.

### Task 2: Verify
- Run: `npm run build`
Expected: successful production build.
