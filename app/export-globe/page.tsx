"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

/* ── Palette (matches AnimatedGlobe.tsx exactly) ── */
const HDRI_URL = "/studio_small_09_1k.hdr";

const CORE_PALETTE = ["#3A72C4", "#0D4280", "#091E3A", "#0D4280"];

/* ── Resolution presets ── */
const RESOLUTIONS: Record<string, number> = {
  "1024 × 1024": 1024,
  "2048 × 2048 (2K)": 2048,
  "4096 × 4096 (4K)": 4096,
};

export default function ExportGlobePage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    glassMesh: THREE.Mesh;
    liquidMaterial: THREE.ShaderMaterial;
    palette: THREE.Color[];
    deepColor: THREE.Color;
    highlightColor: THREE.Color;
    fresnelColor: THREE.Color;
  } | null>(null);
  const animFrameRef = useRef(0);
  const timeRef = useRef(0);

  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [resolution, setResolution] = useState(2048);
  const [transparentBg, setTransparentBg] = useState(true);
  const [hdriLoaded, setHdriLoaded] = useState(false);

  /* ── Build the scene once ── */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,        // ← critical for toDataURL
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(1);             // force 1:1 for exact pixel export
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    /* Lights — identical to AnimatedGlobe.tsx */
    RectAreaLightUniformsLib.init();

    const windowLightTL = new THREE.RectAreaLight(0xc8e0ff, 4.5, 2.8, 2.2);
    windowLightTL.position.set(-4, 5, 5);
    windowLightTL.lookAt(0, 0, 0);
    scene.add(windowLightTL);

    const windowLightBR = new THREE.RectAreaLight(0x7ab8e0, 3.8, 2.4, 1.8);
    windowLightBR.position.set(5, -4, 4);
    windowLightBR.lookAt(0, 0, 0);
    scene.add(windowLightBR);

    scene.add(new THREE.AmbientLight(0xdce8f5, 0.65));
    scene.environmentRotation = new THREE.Euler(0.3, Math.PI * 0.65, 0.15);

    /* Shaders — identical */
    const liquidVertexShader = /* glsl */ `
      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying float vRipple;
      uniform float uTime;

      float layeredWaves(vec3 p) {
        float wave = 0.0;
        wave += sin(dot(p.xy, vec2(4.0, 2.5)) + uTime * 1.5) * 0.45;
        wave += sin(dot(p.yz, vec2(3.0, 5.0)) - uTime * 1.2) * 0.35;
        wave += sin(dot(p.zx, vec2(6.0, 3.5)) + uTime * 0.9) * 0.28;
        return wave * 0.18;
      }

      void main() {
        float wave = layeredWaves(position);
        vec3 displaced = position + normal * wave;
        vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
        vWorldPosition = worldPosition.xyz;
        vRipple = wave;
        vNormal = normalize(normalMatrix * (normal + normal * wave * 3.0));
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `;

    const liquidFragmentShader = /* glsl */ `
      precision highp float;
      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying float vRipple;
      uniform float uTime;
      uniform vec3 uDeepColor;
      uniform vec3 uHighlightColor;
      uniform vec3 uFresnelColor;
      uniform float uGlowStrength;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
        float rippleBands = 0.5 + 0.5 * sin(uTime * 1.2 + vRipple * 60.0);
        vec3 base = mix(uDeepColor, uHighlightColor, rippleBands);
        vec3 glow = mix(base, uHighlightColor, 0.35) * (0.7 + rippleBands * 0.3);
        vec3 color = base;
        color += uFresnelColor * fresnel * 1.3;
        color += glow * uGlowStrength;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    /* Core sphere — higher segment count for export quality */
    const coreGeometry = new THREE.SphereGeometry(1.2, 128, 128);
    const liquidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDeepColor: { value: new THREE.Color(CORE_PALETTE[0]) },
        uHighlightColor: { value: new THREE.Color(CORE_PALETTE[1]) },
        uFresnelColor: { value: new THREE.Color(CORE_PALETTE[2]) },
        uGlowStrength: { value: 1.0 },
      },
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
    });
    scene.add(new THREE.Mesh(coreGeometry, liquidMaterial));

    /* Glass shell — higher segment count for export */
    const glassGeometry = new THREE.SphereGeometry(1.5, 128, 128);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      metalness: 0,
      roughness: 0.3,
      transmission: 1,
      thickness: 1.5,
      ior: 1.52,
      attenuationColor: new THREE.Color("#b0cfe8"),
      attenuationDistance: 6,
      sheen: 1,
      sheenColor: new THREE.Color("#1a5c8a"),
      sheenRoughness: 0.35,
      clearcoat: 0.25,
      clearcoatRoughness: 0.2,
      envMapIntensity: 0.4,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    scene.add(glassMesh);

    /* HDRI env */
    let envTexture: THREE.DataTexture | null = null;
    new RGBELoader().load(
      HDRI_URL,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        envTexture = texture;
        setHdriLoaded(true);
      },
      undefined,
      () => { envTexture = null; }
    );

    const palette = CORE_PALETTE.map((hex) => new THREE.Color(hex));
    const deepColor = new THREE.Color(palette[0]);
    const highlightColor = new THREE.Color(palette[1]);
    const fresnelColor = new THREE.Color(palette[2]);

    const PREVIEW_SIZE = 600;
    renderer.setSize(PREVIEW_SIZE, PREVIEW_SIZE, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();

    sceneRef.current = {
      renderer,
      scene,
      camera,
      glassMesh,
      liquidMaterial,
      palette,
      deepColor,
      highlightColor,
      fresnelColor,
    };

    return () => {
      window.cancelAnimationFrame(animFrameRef.current);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      coreGeometry.dispose();
      liquidMaterial.dispose();
      glassGeometry.dispose();
      glassMaterial.dispose();
      envTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  /* ── Render a single frame at given time ── */
  const renderAtTime = useCallback((t: number) => {
    const s = sceneRef.current;
    if (!s) return;
    const { glassMesh, liquidMaterial, palette, deepColor, highlightColor, fresnelColor, renderer, scene, camera } = s;

    glassMesh.rotation.x = t * 0.12;
    glassMesh.rotation.y = t * 0.22;

    const tColor = t * 0.18;
    const ci = Math.floor(tColor) % palette.length;
    const ci2 = (ci + 1) % palette.length;
    const ci3 = (ci2 + 1) % palette.length;
    const ci4 = (ci3 + 1) % palette.length;
    const alpha = tColor % 1;
    const ea = 0.5 - 0.5 * Math.cos(Math.PI * alpha);

    deepColor.copy(palette[ci]).lerp(palette[ci2], ea);
    highlightColor.copy(palette[ci2]).lerp(palette[ci3], ea);
    fresnelColor.copy(palette[ci3]).lerp(palette[ci4], ea);

    liquidMaterial.uniforms.uTime.value = t;
    liquidMaterial.uniforms.uGlowStrength.value = 0.8 + Math.sin(t * 1.8) * 0.3;
    liquidMaterial.uniforms.uDeepColor.value.copy(deepColor);
    liquidMaterial.uniforms.uHighlightColor.value.copy(highlightColor);
    liquidMaterial.uniforms.uFresnelColor.value.copy(fresnelColor);

    renderer.render(scene, camera);
  }, []);

  /* ── Animation loop ── */
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

  /* ── Time slider ── */
  const handleTimeChange = (val: number) => {
    timeRef.current = val;
    setTime(val);
    renderAtTime(val);
  };

  /* ── Export PNG ── */
  const exportPNG = useCallback(() => {
    const s = sceneRef.current;
    if (!s) return;
    const { renderer, scene, camera } = s;

    // Save current size
    const prevSize = renderer.getSize(new THREE.Vector2());

    // Render at export resolution
    renderer.setSize(resolution, resolution, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();

    if (!transparentBg) {
      renderer.setClearColor(0xffffff, 1);
    } else {
      renderer.setClearColor(0x000000, 0);
    }

    renderAtTime(timeRef.current);

    // Grab pixels
    const dataUrl = renderer.domElement.toDataURL("image/png");

    // Restore preview size
    renderer.setSize(prevSize.x, prevSize.y, false);
    renderer.setClearColor(0x000000, 0);
    camera.updateProjectionMatrix();
    renderAtTime(timeRef.current);

    // Download
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `cjn-globe-${resolution}px${transparentBg ? "-transparent" : ""}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [resolution, transparentBg, renderAtTime]);

  /* ── UI ── */
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Globe Export &mdash; High-Res PNG
      </h1>

      {!hdriLoaded && (
        <p className="text-amber-400 text-sm animate-pulse">
          Loading HDRI environment map&hellip;
        </p>
      )}

      {/* Preview canvas */}
      <div
        ref={mountRef}
        className="rounded-2xl border border-white/10 overflow-hidden"
        style={{
          width: 600,
          height: 600,
          background: transparentBg
            ? "repeating-conic-gradient(#222 0% 25%, #333 0% 50%) 0 0 / 20px 20px"
            : "#ffffff",
        }}
      />

      {/* Controls */}
      <div className="flex flex-col gap-4 w-full max-w-[600px]">
        {/* Play/Pause + time */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPaused((p) => !p)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium text-sm"
          >
            {paused ? "▶ Play" : "⏸ Pause"}
          </button>
          <span className="text-sm text-white/50 font-mono">
            t = {time.toFixed(2)}s
          </span>
        </div>

        {/* Time scrubber */}
        <label className="flex flex-col gap-1 text-sm text-white/70">
          Scrub time (pause first for precision)
          <input
            type="range"
            min={0}
            max={60}
            step={0.01}
            value={time}
            onChange={(e) => handleTimeChange(parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
        </label>

        {/* Resolution */}
        <label className="flex flex-col gap-1 text-sm text-white/70">
          Export resolution
          <select
            value={resolution}
            onChange={(e) => setResolution(Number(e.target.value))}
            className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm"
          >
            {Object.entries(RESOLUTIONS).map(([label, val]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {/* Background toggle */}
        <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
          <input
            type="checkbox"
            checked={transparentBg}
            onChange={(e) => setTransparentBg(e.target.checked)}
            className="accent-blue-500"
          />
          Transparent background (PNG alpha)
        </label>

        {/* Download button */}
        <button
          onClick={exportPNG}
          disabled={!hdriLoaded}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-wait transition font-semibold text-base"
        >
          Download PNG ({resolution} &times; {resolution})
        </button>

        <p className="text-xs text-white/40 leading-relaxed">
          Tip: Pause the animation, scrub to the exact frame you like, then
          export. Transparent background is ideal for placing the globe on
          letterheads, business cards, and other stationery — drop it into
          Illustrator / InDesign / Canva and it composites perfectly.
        </p>
      </div>
    </div>
  );
}
