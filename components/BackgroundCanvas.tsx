import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type PointMeta = {
  base: THREE.Vector3;
  phase: number;
  drift: number;
};

type Edge = [number, number];

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 3000);
    const cluster = new THREE.Group();
    scene.add(cluster);

    const palette = [
      new THREE.Color('#7ed8ff'),
      new THREE.Color('#61beff'),
      new THREE.Color('#a9e8ff'),
    ];

    let frameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let points: THREE.Points | null = null;
    let lines: THREE.LineSegments | null = null;

    let pointPositions: Float32Array = new Float32Array();
    let pointColors: Float32Array = new Float32Array();
    let pointSizes: Float32Array = new Float32Array();
    let pointPhases: Float32Array = new Float32Array();
    let linePositions: Float32Array = new Float32Array();
    let lineColors: Float32Array = new Float32Array();

    let pointAttr: THREE.BufferAttribute | null = null;
    let lineAttr: THREE.BufferAttribute | null = null;
    let pointMeta: PointMeta[] = [];
    let edges: Edge[] = [];

    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseCurrent = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const clearObjects = () => {
      if (points) {
        cluster.remove(points);
        points.geometry.dispose();
        (points.material as THREE.Material).dispose();
        points = null;
      }
      if (lines) {
        cluster.remove(lines);
        lines.geometry.dispose();
        (lines.material as THREE.Material).dispose();
        lines = null;
      }
    };

    const buildNetwork = () => {
      clearObjects();

      const count = Math.max(540, Math.min(980, Math.floor((width * height) / 2300)));
      const radius = Math.max(width, height) * 0.42;
      const maxLinkDistance = radius * 0.22;
      const maxLinkDistanceSq = maxLinkDistance * maxLinkDistance;

      pointMeta = [];
      edges = [];
      pointPositions = new Float32Array(count * 3);
      pointColors = new Float32Array(count * 3);
      pointSizes = new Float32Array(count);
      pointPhases = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const u = Math.random() * 2 - 1;
        const theta = Math.random() * Math.PI * 2;
        const shell = radius * (0.8 + Math.random() * 0.42);
        const ring = Math.sqrt(1 - u * u);

        const base = new THREE.Vector3(
          ring * Math.cos(theta) * shell,
          u * shell * 0.82,
          ring * Math.sin(theta) * shell
        );

        const phase = Math.random() * Math.PI * 2;
        const drift = 4 + Math.random() * 7;
        pointMeta.push({ base, phase, drift });

        pointPositions[i * 3] = base.x;
        pointPositions[i * 3 + 1] = base.y;
        pointPositions[i * 3 + 2] = base.z;

        const c = palette[Math.floor(Math.random() * palette.length)].clone();
        c.lerp(palette[(Math.floor(Math.random() * palette.length) + 1) % palette.length], Math.random() * 0.55);
        pointColors[i * 3] = c.r;
        pointColors[i * 3 + 1] = c.g;
        pointColors[i * 3 + 2] = c.b;

        pointSizes[i] = 3 + Math.random() * 3.8;
        pointPhases[i] = phase;
      }

      const seenEdges = new Set<string>();
      for (let i = 0; i < count; i++) {
        let linked = 0;
        let attempts = 0;
        while (linked < 3 && attempts < 28) {
          attempts++;
          const j = (i + Math.floor(Math.random() * count)) % count;
          if (i === j) continue;
          const a = Math.min(i, j);
          const b = Math.max(i, j);
          const key = `${a}-${b}`;
          if (seenEdges.has(key)) continue;
          if (pointMeta[a].base.distanceToSquared(pointMeta[b].base) > maxLinkDistanceSq) continue;
          seenEdges.add(key);
          edges.push([a, b]);
          linked++;
        }
      }

      linePositions = new Float32Array(edges.length * 6);
      lineColors = new Float32Array(edges.length * 6);
      for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const ax = pointPositions[a * 3];
        const ay = pointPositions[a * 3 + 1];
        const az = pointPositions[a * 3 + 2];
        const bx = pointPositions[b * 3];
        const by = pointPositions[b * 3 + 1];
        const bz = pointPositions[b * 3 + 2];

        const li = i * 6;
        linePositions[li] = ax;
        linePositions[li + 1] = ay;
        linePositions[li + 2] = az;
        linePositions[li + 3] = bx;
        linePositions[li + 4] = by;
        linePositions[li + 5] = bz;

        lineColors[li] = pointColors[a * 3];
        lineColors[li + 1] = pointColors[a * 3 + 1];
        lineColors[li + 2] = pointColors[a * 3 + 2];
        lineColors[li + 3] = pointColors[b * 3];
        lineColors[li + 4] = pointColors[b * 3 + 1];
        lineColors[li + 5] = pointColors[b * 3 + 2];
      }

      const pointGeometry = new THREE.BufferGeometry();
      pointAttr = new THREE.BufferAttribute(pointPositions, 3);
      pointGeometry.setAttribute('position', pointAttr);
      pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));
      pointGeometry.setAttribute('aSize', new THREE.BufferAttribute(pointSizes, 1));
      pointGeometry.setAttribute('aPhase', new THREE.BufferAttribute(pointPhases, 1));

      const pointMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: `
          attribute float aSize;
          attribute float aPhase;
          uniform float uTime;
          varying vec3 vColor;
          void main() {
            vec3 p = position;
            float pulse = 1.0 + sin(uTime * 0.4 + aPhase) * 0.06;
            p *= pulse;
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = aSize * (320.0 / -mvPosition.z);
            vColor = color;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            float d = length(uv);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(vColor, alpha * 0.55);
          }
        `,
      });

      points = new THREE.Points(pointGeometry, pointMaterial);
      cluster.add(points);

      const lineGeometry = new THREE.BufferGeometry();
      lineAttr = new THREE.BufferAttribute(linePositions, 3);
      lineGeometry.setAttribute('position', lineAttr);
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.13,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      cluster.add(lines);

      camera.position.set(0, 0, Math.max(width, height) * 0.95);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      buildNetwork();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.x = ((e.clientX / width) - 0.5) * 2;
      mouseTarget.y = ((e.clientY / height) - 0.5) * 2;
    };

    const render = () => {
      frameId = requestAnimationFrame(render);
      const t = clock.getElapsedTime();

      mouseCurrent.lerp(mouseTarget, 0.06);

      for (let i = 0; i < pointMeta.length; i++) {
        const meta = pointMeta[i];
        const pulse = 1 + 0.055 * Math.sin(t * 0.36 + meta.phase);

        const x = meta.base.x * pulse + Math.sin(t * 0.62 + meta.phase * 1.4) * meta.drift;
        const y = meta.base.y * (1 + 0.04 * Math.cos(t * 0.41 + meta.phase)) + Math.cos(t * 0.57 + meta.phase * 1.1) * meta.drift * 0.65;
        const z = meta.base.z * (1 + 0.03 * Math.sin(t * 0.48 + meta.phase * 0.7));

        const pi = i * 3;
        pointPositions[pi] = x;
        pointPositions[pi + 1] = y;
        pointPositions[pi + 2] = z;
      }

      for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const li = i * 6;
        const ai = a * 3;
        const bi = b * 3;
        linePositions[li] = pointPositions[ai];
        linePositions[li + 1] = pointPositions[ai + 1];
        linePositions[li + 2] = pointPositions[ai + 2];
        linePositions[li + 3] = pointPositions[bi];
        linePositions[li + 4] = pointPositions[bi + 1];
        linePositions[li + 5] = pointPositions[bi + 2];
      }

      if (pointAttr) pointAttr.needsUpdate = true;
      if (lineAttr) lineAttr.needsUpdate = true;
      if (points) {
        const mat = points.material as THREE.ShaderMaterial;
        mat.uniforms.uTime.value = t;
      }

      cluster.rotation.y += 0.00055;
      cluster.rotation.x = Math.sin(t * 0.22) * 0.05 + mouseCurrent.y * 0.08;
      camera.position.x = mouseCurrent.x * 24;
      camera.position.y = mouseCurrent.y * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    resize();
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      clearObjects();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};
