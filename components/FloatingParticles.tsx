'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

const PARTICLE_COLORS = [
  '3, 49, 140', // brand blue
  '22, 95, 242', // electric blue
  '59, 141, 191', // brand cyan
  '68, 83, 115', // slate
  '242, 146, 22', // rare orange glint
];

const ORANGE_INDEX = PARTICLE_COLORS.length - 1;

function createParticle(width: number, height: number): Particle {
  const colorIndex = Math.random() < 0.08
    ? ORANGE_INDEX
    : Math.floor(Math.random() * ORANGE_INDEX);

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    // Larger particles allow a much lower count while remaining visible.
    radius: Math.random() * 5.5 + 5.5,
    speedX: Math.random() * 0.11 - 0.055,
    speedY: Math.random() * 0.12 + 0.035,
    opacity: colorIndex === ORANGE_INDEX
      ? Math.random() * 0.07 + 0.08
      : Math.random() * 0.12 + 0.12,
    color: PARTICLE_COLORS[colorIndex],
  };
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    if (prefersReducedMotion || (typeof deviceMemory === 'number' && deviceMemory <= 4)) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    let particles: Particle[] = [];
    let animationFrameId = 0;
    let lastFrameTime = 0;
    let isRunning = true;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      // REVERSAL NOTE: this whole layer can be removed by deleting the
      // <FloatingParticles /> line in BackgroundCanvas.
      const particleCount = Math.min(Math.floor(width / 76), 22);
      particles = Array.from({ length: particleCount }, () => createParticle(width, height));
    };

    const draw = (timestamp: number) => {
      if (!isRunning) return;

      animationFrameId = window.requestAnimationFrame(draw);

      // Cap near 30fps to keep the background decorative rather than costly.
      if (timestamp - lastFrameTime < 32) return;
      lastFrameTime = timestamp;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'source-over';

      for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y -= particle.speedY;

        if (particle.y + particle.radius < 0) {
          particle.y = height + particle.radius;
          particle.x = Math.random() * width;
        }

        if (particle.x - particle.radius > width) particle.x = -particle.radius;
        if (particle.x + particle.radius < 0) particle.x = width + particle.radius;

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 2.35,
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${particle.opacity})`);
        gradient.addColorStop(0.36, `rgba(${particle.color}, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 2.35, 0, Math.PI * 2);
        context.fill();
      }
    };

    const handleVisibilityChange = () => {
      isRunning = document.visibilityState === 'visible';
      if (isRunning) {
        lastFrameTime = performance.now();
        animationFrameId = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(animationFrameId);
      }
    };

    resizeCanvas();
    animationFrameId = window.requestAnimationFrame(draw);

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90 mix-blend-multiply"
    />
  );
}
