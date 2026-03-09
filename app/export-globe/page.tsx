"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import {
  DEFAULT_GLOBE_CONFIG,
  addAnimatedGlobeLights,
  createAnimatedGlobeScene,
} from "@/components/animatedGlobeScene.js";

const PREVIEW_SIZE = 600;

const RESOLUTIONS: Record<string, number> = {
  "1024 x 1024": 1024,
  "2048 x 2048 (2K)": 2048,
  "4096 x 4096 (4K)": 4096,
};

type ExportSceneState = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  globe: {
    update: (time: number) => void;
    dispose: () => void;
  };
  lights: {
    dispose: () => void;
  };
};

export default function ExportGlobePage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ExportSceneState | null>(null);
  const animFrameRef = useRef(0);
  const timeRef = useRef(0);

  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [resolution, setResolution] = useState(2048);
  const [transparentBg, setTransparentBg] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      DEFAULT_GLOBE_CONFIG.cameraFov,
      1,
      0.1,
      100
    );
    camera.position.set(0, 0, DEFAULT_GLOBE_CONFIG.cameraZ);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const lights = addAnimatedGlobeLights(scene);
    const globe = createAnimatedGlobeScene(scene, { shellSegments: 128 });

    renderer.setSize(PREVIEW_SIZE, PREVIEW_SIZE, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();

    sceneRef.current = {
      renderer,
      scene,
      camera,
      globe,
      lights,
    };
    setSceneReady(true);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      setSceneReady(false);
      globe.dispose();
      lights.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      renderer.dispose();
      sceneRef.current = null;
    };
  }, []);

  const renderAtTime = useCallback((nextTime: number) => {
    const currentScene = sceneRef.current;
    if (!currentScene) return;

    currentScene.globe.update(nextTime);
    currentScene.renderer.render(currentScene.scene, currentScene.camera);
  }, []);

  useEffect(() => {
    let lastTimestamp: number | null = null;

    const tick = (timestamp: number) => {
      animFrameRef.current = requestAnimationFrame(tick);

      if (!paused) {
        if (lastTimestamp !== null) {
          const dt = (timestamp - lastTimestamp) / 1000;
          timeRef.current += dt;
          setTime(timeRef.current);
        }
        lastTimestamp = timestamp;
        renderAtTime(timeRef.current);
      } else {
        lastTimestamp = null;
        renderAtTime(timeRef.current);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [paused, renderAtTime]);

  const handleTimeChange = (value: number) => {
    timeRef.current = value;
    setTime(value);
    renderAtTime(value);
  };

  const exportPNG = useCallback(() => {
    const currentScene = sceneRef.current;
    if (!currentScene) return;

    const { renderer, scene, camera, globe } = currentScene;
    const previousSize = renderer.getSize(new THREE.Vector2());

    renderer.setSize(resolution, resolution, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.setClearColor(transparentBg ? 0x000000 : 0xffffff, transparentBg ? 0 : 1);

    globe.update(timeRef.current);
    renderer.render(scene, camera);

    const dataUrl = renderer.domElement.toDataURL("image/png");

    renderer.setSize(previousSize.x, previousSize.y, false);
    renderer.setClearColor(0x000000, 0);
    camera.updateProjectionMatrix();
    renderAtTime(timeRef.current);

    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `cjn-globe-${resolution}px${transparentBg ? "-transparent" : ""}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, [renderAtTime, resolution, transparentBg]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Globe Export &mdash; High-Res PNG
      </h1>

      {!sceneReady && (
        <p className="text-amber-400 text-sm animate-pulse">
          Preparing the shared globe scene&hellip;
        </p>
      )}

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
      />

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
          disabled={!sceneReady}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-wait transition font-semibold text-base"
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
