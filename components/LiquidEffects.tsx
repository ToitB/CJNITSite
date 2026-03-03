'use client';

import { useEffect } from 'react';

const LIQUID_SELECTOR = '.liquid-button, .liquid-surface, .glass-dock-item';

const resetLiquidTarget = (target: HTMLElement | null) => {
  if (!target) return;
  target.style.setProperty('--ripple-x', '50%');
  target.style.setProperty('--ripple-y', '50%');
};

export function LiquidEffects() {
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(LIQUID_SELECTOR);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      target.style.setProperty('--ripple-x', `${Math.max(0, Math.min(100, x))}%`);
      target.style.setProperty('--ripple-y', `${Math.max(0, Math.min(100, y))}%`);
    };

    const onPointerLeave = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(LIQUID_SELECTOR) ?? null;
      resetLiquidTarget(target);
    };

    document.addEventListener('pointermove', onPointerMove, true);
    document.addEventListener('pointerleave', onPointerLeave, true);

    return () => {
      document.removeEventListener('pointermove', onPointerMove, true);
      document.removeEventListener('pointerleave', onPointerLeave, true);
    };
  }, []);

  return null;
}
