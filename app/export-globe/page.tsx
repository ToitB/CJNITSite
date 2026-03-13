"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import GlobeCanvas from "@/components/GlobeCanvas";

const PREVIEW_SIZE = 600;

const RESOLUTIONS: Record<string, number> = {
  "1024 x 1024": 1024,
  "2048 x 2048 (2K)": 2048,
  "4096 x 4096 (4K)": 4096,
};

const waitForNextFrame = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });

export default function ExportGlobePage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);

  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [resolution, setResolution] = useState(2048);
  const [transparentBg, setTransparentBg] = useState(true);

  useEffect(() => {
    let animationFrameId = 0;
    let lastTimestamp: number | null = null;

    const tick = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(tick);

      if (paused) {
        lastTimestamp = null;
        return;
      }

      if (lastTimestamp !== null) {
        const dt = (timestamp - lastTimestamp) / 1000;
        timeRef.current += dt;
        setTime(timeRef.current);
      }

      lastTimestamp = timestamp;
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [paused]);

  const handleTimeChange = (value: number) => {
    timeRef.current = value;
    setTime(value);
  };

  const exportPNG = useCallback(async () => {
    const canvas = mountRef.current?.querySelector("canvas");
    if (!canvas) return;

    await waitForNextFrame();

    const dataUrl = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `cjn-globe-${resolution}px${transparentBg ? "-transparent" : ""}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, [resolution, transparentBg]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Globe Export &mdash; High-Res PNG
      </h1>

      <div
        ref={mountRef}
        className="rounded-2xl border border-white/10 overflow-hidden"
        style={{
          width: PREVIEW_SIZE,
          height: PREVIEW_SIZE,
          background: transparentBg
            ? "repeating-conic-gradient(#222 0% 25%, #333 0% 50%) 0 0 / 20px 20px"
            : "#ffffff",
        }}
      >
        <GlobeCanvas
          preserveDrawingBuffer
          showControls
          transparentBackground={transparentBg}
          time={time}
          cameraZ={5.8}
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[600px]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPaused((current) => !current)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium text-sm"
          >
            {paused ? "\u25b6 Play" : "\u23f8 Pause"}
          </button>
          <span className="text-sm text-white/50 font-mono">
            t = {time.toFixed(2)}s
          </span>
        </div>

        <label className="flex flex-col gap-1 text-sm text-white/70">
          Scrub time (pause first for precision)
          <input
            type="range"
            min={0}
            max={60}
            step={0.01}
            value={time}
            onChange={(event) => handleTimeChange(Number.parseFloat(event.target.value))}
            className="w-full accent-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-white/70">
          Export resolution
          <select
            value={resolution}
            onChange={(event) => setResolution(Number(event.target.value))}
            className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm"
          >
            {Object.entries(RESOLUTIONS).map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
          <input
            type="checkbox"
            checked={transparentBg}
            onChange={(event) => setTransparentBg(event.target.checked)}
            className="accent-blue-500"
          />
          Transparent background (PNG alpha)
        </label>

        <button
          onClick={exportPNG}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold text-base"
        >
          Download PNG ({resolution} &times; {resolution})
        </button>

        <p className="text-xs text-white/40 leading-relaxed">
          Tip: Pause the animation, scrub to the exact frame you like, then
          export. Transparent background is ideal for placing the globe on
          letterheads, business cards, and other stationery.
        </p>
      </div>
    </div>
  );
}
