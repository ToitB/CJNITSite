# Background Particles Notes

This is a reversible visual experiment for the site background.

## Files

- `components/FloatingParticles.tsx` contains the animated canvas layer.
- `components/BackgroundCanvas.tsx` imports and renders `<FloatingParticles />`.

## Reversal

To remove the experiment:

1. Delete the `<FloatingParticles />` line in `components/BackgroundCanvas.tsx`.
2. Delete the `FloatingParticles` import in `components/BackgroundCanvas.tsx`.
3. Delete `components/FloatingParticles.tsx` if no longer needed.

## Performance Guardrails

- Particle count is capped at 7, with roughly 3-7 blooms depending on viewport width.
- Large viewport-scaled blooms are used so fewer particles are needed.
- Animation is capped near 30fps.
- The animation pauses when the page is hidden.
- The layer is disabled for `prefers-reduced-motion: reduce`.
- The layer is disabled on devices reporting 4GB memory or less.

## Visual Tuning

- Palette is based on `docs/complementary colors.txt`.
- Orange is intentionally rare and low opacity.
- Bloom size is intentionally large, matching the red-circle reference from the visual review.
- Existing CSS blobs were reduced to `opacity-70` to make the background less overpowering.
