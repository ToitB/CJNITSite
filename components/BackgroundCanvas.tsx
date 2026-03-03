import React from 'react';

const blobs = [
  {
    className: 'blob-one',
    style: {
      width: '44rem',
      height: '44rem',
      top: '-12rem',
      left: '-10rem',
      background:
        'radial-gradient(circle at 40% 40%, rgba(59,141,191,0.14) 0%, rgba(59,141,191,0.08) 26%, rgba(59,141,191,0.03) 48%, transparent 72%)',
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
        'radial-gradient(circle at 45% 42%, rgba(3,49,140,0.12) 0%, rgba(3,49,140,0.07) 28%, rgba(3,49,140,0.03) 50%, transparent 72%)',
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
        'radial-gradient(circle at 50% 50%, rgba(22,95,242,0.11) 0%, rgba(22,95,242,0.06) 25%, rgba(22,95,242,0.025) 48%, transparent 72%)',
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
        'radial-gradient(circle at 50% 44%, rgba(68,83,115,0.10) 0%, rgba(68,83,115,0.05) 28%, rgba(68,83,115,0.02) 50%, transparent 74%)',
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
        'radial-gradient(circle at 50% 50%, rgba(2,40,115,0.08) 0%, rgba(2,40,115,0.04) 28%, rgba(2,40,115,0.015) 48%, transparent 72%)',
    },
  },
];

export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,242,242,0.4),rgba(255,255,255,0.92)_32%,#ffffff_72%)]" />
      <div className="site-blobs absolute inset-0">
        {blobs.map((blob) => (
          <span
            key={blob.className}
            className={`site-blob ${blob.className}`}
            style={blob.style}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.18)_100%)]" />
    </div>
  );
};
