"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import GlobeCanvas from "@/components/GlobeCanvas";

const PREVIEW_SIZE = 600;

const RESOLUTIONS: Record<string, number> = {
  "1024 x 1024": 1024,
  "2048 x 2048 (2K)": 2048,
  "4096 x 4096 (4K)": 4096,
};

const RECORDING_DURATIONS: Record<string, number> = {
  "5 seconds": 5,
  "10 seconds": 10,
  "15 seconds": 15,
  "30 seconds": 30,
};

const waitForNextFrame = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });

/* ------------------------------------------------------------------ */
/*  Minimal tar builder – packages PNG blobs into a .tar archive      */
/* ------------------------------------------------------------------ */
function buildTar(files: { name: string; data: Uint8Array }[]): Blob {
  const BLOCK = 512;
  const enc = new TextEncoder();
  const chunks: Uint8Array[] = [];

  for (const file of files) {
    // header
    const header = new Uint8Array(BLOCK);
    enc.encodeInto(file.name.slice(0, 99), header); // name
    enc.encodeInto("0000644\0", header.subarray(100)); // mode
    enc.encodeInto("0001750\0", header.subarray(108)); // uid
    enc.encodeInto("0001750\0", header.subarray(116)); // gid
    const sizeOctal = file.data.byteLength.toString(8).padStart(11, "0") + "\0";
    enc.encodeInto(sizeOctal, header.subarray(124)); // size
    const mtime = Math.floor(Date.now() / 1000).toString(8).padStart(11, "0") + "\0";
    enc.encodeInto(mtime, header.subarray(136)); // mtime
    header[156] = 48; // typeflag '0'
    // checksum placeholder
    enc.encodeInto("        ", header.subarray(148)); // 8 spaces
    let chksum = 0;
    for (let i = 0; i < BLOCK; i++) chksum += header[i];
    const chkOctal = chksum.toString(8).padStart(6, "0") + "\0 ";
    enc.encodeInto(chkOctal, header.subarray(148));
    chunks.push(header);

    // file data + padding to 512-byte boundary
    chunks.push(file.data);
    const remainder = file.data.byteLength % BLOCK;
    if (remainder > 0) chunks.push(new Uint8Array(BLOCK - remainder));
  }

  // two empty blocks = end of archive
  chunks.push(new Uint8Array(BLOCK * 2));
  return new Blob(chunks as BlobPart[], { type: "application/x-tar" });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ExportGlobePage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);

  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [resolution, setResolution] = useState(2048);
  const [transparentBg, setTransparentBg] = useState(true);

  // Recording state
  const [recording, setRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState("");
  const [recordDuration, setRecordDuration] = useState(10);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

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

  /* ---- PNG export ---- */
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

  /* ---- WebM recording via native MediaRecorder ---- */
  const startWebMRecording = useCallback(() => {
    const canvas = mountRef.current?.querySelector("canvas");
    if (!canvas) return;

    // Ensure animation is playing
    setPaused(false);

    const stream = canvas.captureStream(30); // 30 fps
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      downloadBlob(blob, `cjn-globe-${PREVIEW_SIZE}px-${recordDuration}s.webm`);
      setRecording(false);
      setRecordingProgress("");
    };

    recorderRef.current = recorder;
    recorder.start(1000); // collect chunks every second
    setRecording(true);

    // Countdown
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed++;
      setRecordingProgress(`Recording… ${elapsed}/${recordDuration}s`);
      if (elapsed >= recordDuration) {
        clearInterval(interval);
        recorder.stop();
      }
    }, 1000);
    setRecordingProgress(`Recording… 0/${recordDuration}s`);
  }, [recordDuration]);

  const stopWebMRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
  }, []);

  /* ---- Tar frame export (captures PNG frames into a .tar archive) ---- */
  const exportTar = useCallback(async () => {
    const canvas = mountRef.current?.querySelector("canvas");
    if (!canvas) return;

    setPaused(false);
    setRecording(true);

    const fps = 30;
    const totalFrames = recordDuration * fps;
    const files: { name: string; data: Uint8Array }[] = [];

    for (let i = 0; i < totalFrames; i++) {
      setRecordingProgress(`Capturing frame ${i + 1}/${totalFrames}…`);
      await waitForNextFrame();

      const dataUrl = canvas.toDataURL("image/png");
      const resp = await fetch(dataUrl);
      const buf = await resp.arrayBuffer();
      const padded = String(i).padStart(5, "0");
      files.push({ name: `frame-${padded}.png`, data: new Uint8Array(buf) });
    }

    setRecordingProgress("Building tar archive…");
    await waitForNextFrame();

    const tarBlob = buildTar(files);
    downloadBlob(tarBlob, `cjn-globe-frames-${recordDuration}s-${fps}fps.tar`);

    setRecording(false);
    setRecordingProgress("");
  }, [recordDuration]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Globe Export &mdash; PNG / WebM / Tar
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
        {/* Playback controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPaused((current) => !current)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium text-sm"
            disabled={recording}
          >
            {paused ? "\u25b6 Play" : "\u23f8 Pause"}
          </button>
          <span className="text-sm text-white/50 font-mono">
            t = {time.toFixed(2)}s
          </span>
          {recordingProgress && (
            <span className="text-sm text-red-400 font-mono animate-pulse">
              {recordingProgress}
            </span>
          )}
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
            disabled={recording}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-white/70">
          Export resolution (PNG only)
          <select
            value={resolution}
            onChange={(event) => setResolution(Number(event.target.value))}
            className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm"
            disabled={recording}
          >
            {Object.entries(RESOLUTIONS).map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-white/70">
          Recording duration (WebM &amp; Tar)
          <select
            value={recordDuration}
            onChange={(event) => setRecordDuration(Number(event.target.value))}
            className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm"
            disabled={recording}
          >
            {Object.entries(RECORDING_DURATIONS).map(([label, value]) => (
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
            disabled={recording}
          />
          Transparent background (PNG alpha)
        </label>

        {/* Export buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={exportPNG}
            disabled={recording}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-base"
          >
            Download PNG ({resolution} &times; {resolution})
          </button>

          {!recording ? (
            <button
              onClick={startWebMRecording}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition font-semibold text-base"
            >
              Record WebM ({recordDuration}s @ 30fps)
            </button>
          ) : recorderRef.current ? (
            <button
              onClick={stopWebMRecording}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold text-base animate-pulse"
            >
              Stop Recording
            </button>
          ) : null}

          <button
            onClick={exportTar}
            disabled={recording}
            className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-base"
          >
            Export Tar (PNG frames &mdash; {recordDuration}s @ 30fps)
          </button>
        </div>

        <p className="text-xs text-white/40 leading-relaxed">
          <strong>PNG:</strong> Pause, scrub to the exact frame you like, then
          export. Transparent background is ideal for stationery.
          <br />
          <strong>WebM:</strong> Records the live canvas at 30fps for the
          selected duration. Plays in any modern browser or video player.
          <br />
          <strong>Tar:</strong> Captures individual PNG frames into a .tar
          archive. Useful for post-processing in video editors.
        </p>
      </div>
    </div>
  );
}
