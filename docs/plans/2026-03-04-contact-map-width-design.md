# Contact Map Width Design

**Date:** March 4, 2026

## Goal

Make the contact page map section container match the horizontal width of the `Start the Conversation` button.

## Context

The contact form button already spans the full width of its column. The map section sits below the form in the same column, but the map card itself is capped with `max-w-[430px]`, which makes it visibly narrower than the button.

## Options Considered

### Option 1: Remove the map card max width

- Keep the existing `w-full` sizing.
- Remove `max-w-[430px]` from the map section container.
- Preserve `aspect-square`, `mx-auto`, and `lg:mx-0`.

**Pros**
- Smallest change.
- Keeps the map width tied to the same column as the button.
- Lowest regression risk.

**Cons**
- Depends on the existing column layout staying the same.

### Option 2: Introduce a shared max-width wrapper for both button and map

- Create a common wrapper or utility that both elements share.

**Pros**
- Explicit width coupling.

**Cons**
- More code for no immediate benefit.
- Adds structure that the current layout does not need.

## Approved Approach

Use Option 1. Remove the map card width cap so the whole map section container expands to the same width as the form/button column.

## Affected Files

- Modify: `components/Contact.tsx`

## Verification

- Run a production build to confirm the change does not break compilation.
- If the local dev server is available, visually confirm the map container width now matches the button width.
