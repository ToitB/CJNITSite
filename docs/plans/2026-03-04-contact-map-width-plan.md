# Contact Map Width Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the contact page map section container match the width of the `Start the Conversation` button.

**Architecture:** Reuse the existing contact column layout and remove the local width cap that makes the map narrower than the button. Preserve the current square aspect ratio and alignment behavior.

**Tech Stack:** Next.js, React, Tailwind utility classes

---

### Task 1: Remove the map width cap

**Files:**
- Modify: `components/Contact.tsx`

**Step 1: Identify the width constraint**

Inspect the map wrapper and confirm it currently includes `max-w-[430px]` alongside `w-full`.

**Step 2: Apply the minimal layout change**

Remove `max-w-[430px]` from the map wrapper class list and keep `w-full aspect-square rounded-2xl mx-auto lg:mx-0`.

**Step 3: Verify compilation**

Run: `npm run build`

Expected: Build completes successfully with exit code `0`.

**Step 4: Commit**

Create a commit for the layout change after verification.
