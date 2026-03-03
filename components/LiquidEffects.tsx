'use client';

import { useEffect } from 'react';

const LIQUID_SELECTOR =
  '.liquid-button, .btn-primary, .btn-primary-compact, .btn-accent, .liquid-surface, .glass-dock-item, .glass-card, .glass-card-strong, .glass-card-accent, .morph-card';

const resetLiquidTarget = (target: HTMLElement | null) => {
  if (!target) return;
  target.style.setProperty('--ripple-x', '50%');
  target.style.setProperty('--ripple-y', '50%');
  target.style.setProperty('--morph-rotate-x', '0deg');
  target.style.setProperty('--morph-rotate-y', '0deg');
  target.style.setProperty('--morph-glow', '0');
};

export function LiquidEffects() {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    let pendingEvent: PointerEvent | null = null;

    const applyRipple = () => {
      rafId = 0;
      const event = pendingEvent;
      if (!event) return;
      pendingEvent = null;

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(LIQUID_SELECTOR);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      target.style.setProperty('--ripple-x', `${Math.max(0, Math.min(100, x))}%`);
      target.style.setProperty('--ripple-y', `${Math.max(0, Math.min(100, y))}%`);

      const rotateY = ((x - 50) / 50) * 5.5;
      const rotateX = ((50 - y) / 50) * 5.5;
      const glow = Math.max(0.14, 1 - Math.min(1, Math.abs(50 - x) / 55 + Math.abs(50 - y) / 55));

      target.style.setProperty('--morph-rotate-x', `${rotateX.toFixed(2)}deg`);
      target.style.setProperty('--morph-rotate-y', `${rotateY.toFixed(2)}deg`);
      target.style.setProperty('--morph-glow', glow.toFixed(3));
    };

    const onPointerMove = (event: PointerEvent) => {
      pendingEvent = event;
      if (!rafId) {
        rafId = requestAnimationFrame(applyRipple);
      }
    };

    const onPointerLeave = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(LIQUID_SELECTOR) ?? null;
      resetLiquidTarget(target);
    };

    document.addEventListener('pointermove', onPointerMove, { capture: true, passive: true });
    document.addEventListener('pointerleave', onPointerLeave, true);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('pointermove', onPointerMove, true);
      document.removeEventListener('pointerleave', onPointerLeave, true);
    };
  }, []);

  return null;
}
