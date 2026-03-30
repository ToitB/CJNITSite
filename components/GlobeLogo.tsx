'use client';

/**
 * Lightweight CSS-animated SVG globe for navbar/footer logos.
 * Replaces the full Three.js WebGL AnimatedGlobe at small sizes
 * to eliminate extra WebGL contexts and heavy JS.
 */
type GlobeLogoProps = {
  size?: number;
  className?: string;
  ariaLabel?: string;
};

export default function GlobeLogo({
  size = 40,
  className = '',
  ariaLabel,
}: GlobeLogoProps) {
  return (
    <div
      className={`shrink-0 flex items-center justify-center leading-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden={ariaLabel ? undefined : 'true'}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className="globe-logo-svg"
      >
        <defs>
          <radialGradient id="globe-grad" cx="38%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#5ac8fa" />
            <stop offset="40%" stopColor="#165FF2" />
            <stop offset="80%" stopColor="#03318C" />
            <stop offset="100%" stopColor="#022873" />
          </radialGradient>
          <radialGradient id="globe-sheen" cx="32%" cy="28%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* Main sphere */}
        <circle cx="50" cy="50" r="46" fill="url(#globe-grad)" />

        {/* Rotating meridian lines */}
        <g clipPath="url(#globe-clip)" className="globe-logo-lines">
          {/* Longitude lines that rotate */}
          <ellipse cx="50" cy="50" rx="20" ry="46" fill="none" stroke="rgba(90,200,250,0.25)" strokeWidth="0.8" />
          <ellipse cx="50" cy="50" rx="35" ry="46" fill="none" stroke="rgba(90,200,250,0.2)" strokeWidth="0.8" />
          <ellipse cx="50" cy="50" rx="46" ry="46" fill="none" stroke="rgba(90,200,250,0.15)" strokeWidth="0.8" />
          {/* Latitude lines */}
          <ellipse cx="50" cy="30" rx="42" ry="8" fill="none" stroke="rgba(90,200,250,0.18)" strokeWidth="0.6" />
          <ellipse cx="50" cy="50" rx="46" ry="10" fill="none" stroke="rgba(90,200,250,0.22)" strokeWidth="0.7" />
          <ellipse cx="50" cy="70" rx="42" ry="8" fill="none" stroke="rgba(90,200,250,0.18)" strokeWidth="0.6" />
        </g>

        {/* Glass sheen overlay */}
        <circle cx="50" cy="50" r="46" fill="url(#globe-sheen)" />

        {/* Top highlight dot */}
        <circle cx="36" cy="30" r="3" fill="rgba(255,255,255,0.5)" />
        <circle cx="38" cy="32" r="1.5" fill="rgba(255,255,255,0.7)" />
      </svg>
    </div>
  );
}
