"use client";

import GlobeCanvas from "./GlobeCanvas";

type AnimatedGlobeProps = {
  size?: number;
  className?: string;
  ariaLabel?: string;
};

export default function AnimatedGlobe({
  size = 44,
  className = "",
  ariaLabel,
}: AnimatedGlobeProps) {
  if (ariaLabel) {
    return (
      <div
        className={`shrink-0 flex items-center justify-center leading-none ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        role="img"
        aria-label={ariaLabel}
      >
        <GlobeCanvas transparentBackground cameraZ={5.8} />
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 flex items-center justify-center leading-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      <GlobeCanvas transparentBackground cameraZ={5.8} />
    </div>
  );
}
