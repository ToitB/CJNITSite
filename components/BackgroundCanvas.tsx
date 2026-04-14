import React from 'react';

import FloatingParticles from './FloatingParticles';

const blobs = [
  {
    className: 'blob-one',
    style: {
      width: '44rem',
      height: '44rem',
      top: '-12rem',
      left: '-10rem',
      background:
        'radial-gradient(circle at 40% 40%, rgba(59,141,191,0.34) 0%, rgba(59,141,191,0.22) 22%, rgba(59,141,191,0.12) 38%, rgba(59,141,191,0.05) 54%, transparent 66%)',
    },
  },
  {
    className: 'blob-two',
    style: {
      width: '36rem',
      height: '36rem',
      top: '12%',
      right: '-8rem',
      background:
        'radial-gradient(circle at 45% 42%, rgba(3,49,140,0.30) 0%, rgba(3,49,140,0.18) 24%, rgba(3,49,140,0.10) 40%, rgba(3,49,140,0.04) 56%, transparent 68%)',
    },
  },
  {
    className: 'blob-three',
    style: {
      width: '40rem',
      height: '40rem',
      bottom: '-14rem',
      left: '10%',
      background:
        'radial-gradient(circle at 50% 50%, rgba(22,95,242,0.32) 0%, rgba(22,95,242,0.20) 22%, rgba(22,95,242,0.11) 38%, rgba(22,95,242,0.05) 54%, transparent 66%)',
    },
  },
  {
    className: 'blob-four',
    style: {
      width: '30rem',
      height: '30rem',
      bottom: '6%',
      right: '12%',
      background:
        'radial-gradient(circle at 50% 44%, rgba(68,83,115,0.26) 0%, rgba(68,83,115,0.15) 24%, rgba(68,83,115,0.08) 40%, rgba(68,83,115,0.04) 56%, transparent 68%)',
    },
  },
  {
    className: 'blob-five',
    style: {
      width: '28rem',
      height: '28rem',
      top: '38%',
      left: '38%',
      background:
        'radial-gradient(circle at 50% 50%, rgba(2,40,115,0.24) 0%, rgba(2,40,115,0.13) 24%, rgba(2,40,115,0.07) 40%, rgba(2,40,115,0.03) 56%, transparent 68%)',
    },
  },
];

export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,242,242,0.08),rgba(255,255,255,0.82)_34%,#ffffff_74%)]" />
      <div className="site-blobs absolute inset-0 opacity-70">
        {blobs.map((blob) => (
          <span
            key={blob.className}
            className={`site-blob ${blob.className}`}
            style={blob.style}
            aria-hidden="true"
          />
        ))}
      </div>
      {/* REVERSAL NOTE: remove this line and the import above to disable the particle experiment. */}
      <FloatingParticles />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.08)_100%)]" />
    </div>
  );
};
