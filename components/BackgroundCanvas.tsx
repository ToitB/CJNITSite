import React, { useEffect, useRef } from 'react';

interface Wisp {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  hue: number;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const createWisp = (width: number, height: number): Wisp => ({
  x: rand(-width * 0.15, width * 1.15),
  y: rand(-height * 0.15, height * 1.15),
  r: rand(180, 360),
  vx: rand(-0.06, 0.06),
  vy: rand(-0.04, 0.04),
  alpha: rand(0.03, 0.09),
  phase: rand(0, Math.PI * 2),
  hue: rand(198, 212), // blue/cyan band
});

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId = 0;
    let wisps: Wisp[] = [];

    const init = () => {
      const count = Math.max(8, Math.floor((width * height) / 240000));
      wisps = Array.from({ length: count }, () => createWisp(width, height));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    const drawWisp = (w: Wisp, t: number) => {
      const pulse = 0.72 + 0.28 * Math.sin(t * 0.00025 + w.phase);
      const alpha = w.alpha * pulse;
      const radius = w.r * (0.95 + 0.08 * Math.sin(t * 0.0002 + w.phase * 1.7));

      const gradient = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, radius);
      gradient.addColorStop(0, `hsla(${w.hue}, 80%, 62%, ${alpha})`);
      gradient.addColorStop(0.45, `hsla(${w.hue}, 70%, 58%, ${alpha * 0.45})`);
      gradient.addColorStop(1, `hsla(${w.hue}, 60%, 56%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(w.x, w.y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = (timestamp: number) => {
      frameId = requestAnimationFrame(step);
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'source-over';

      for (let i = 0; i < wisps.length; i++) {
        const w = wisps[i];
        w.x += w.vx + Math.sin(timestamp * 0.00022 + w.phase) * 0.025;
        w.y += w.vy + Math.cos(timestamp * 0.00018 + w.phase) * 0.02;

        if (w.x < -w.r * 1.3 || w.x > width + w.r * 1.3 || w.y < -w.r * 1.3 || w.y > height + w.r * 1.3) {
          wisps[i] = createWisp(width, height);
          continue;
        }

        drawWisp(w, timestamp);
      }

      ctx.restore();
    };

    window.addEventListener('resize', resize);
    resize();
    frameId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};
