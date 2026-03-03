"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

type AnimatedGlobeProps = {
  size?: number;
  className?: string;
  ariaLabel?: string;
};

const HDRI_URL = "/studio_small_09_1k.hdr";

const CORE_PALETTE = [
  "#3A72C4",
  "#0D4280",
  "#091E3A",
  "#0D4280",
];

export default function AnimatedGlobe({ size = 44, className = "", ariaLabel }: AnimatedGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

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
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    // Initialise RectAreaLight support
    RectAreaLightUniformsLib.init();

    // Top-left window reflection — soft sky-blue rectangle
    const windowLightTL = new THREE.RectAreaLight(0xc8e0ff, 4.5, 2.8, 2.2);
    windowLightTL.position.set(-4, 5, 5);
    windowLightTL.lookAt(0, 0, 0);
    scene.add(windowLightTL);

    // Bottom-right window reflection — warm ice-blue rectangle
    const windowLightBR = new THREE.RectAreaLight(0x7ab8e0, 3.8, 2.4, 1.8);
    windowLightBR.position.set(5, -4, 4);
    windowLightBR.lookAt(0, 0, 0);
    scene.add(windowLightBR);

    // Subtle fill — hint of blue
    scene.add(new THREE.AmbientLight(0xdce8f5, 0.65));

    // Rotate the environment map to shift HDRI reflections away from "eye" positions
    scene.environmentRotation = new THREE.Euler(0.3, Math.PI * 0.65, 0.15);

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

    const coreGeometry = new THREE.SphereGeometry(1.2, 64, 64);
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
    const coreMesh = new THREE.Mesh(coreGeometry, liquidMaterial);
    scene.add(coreMesh);

    const glassGeometry = new THREE.SphereGeometry(1.5, 64, 64);
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

    let envTexture: THREE.DataTexture | null = null;
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      HDRI_URL,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        envTexture = texture;
      },
      undefined,
      () => {
        envTexture = null;
      }
    );

    const clock = new THREE.Clock();
    const palette = CORE_PALETTE.map((hex) => new THREE.Color(hex));
    const deepColor = new THREE.Color(palette[0]);
    const highlightColor = new THREE.Color(palette[1]);
    const fresnelColor = new THREE.Color(palette[2]);
    let animationFrameId = 0;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();

    const observer = new ResizeObserver(() => resize());
    observer.observe(mount);

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      glassMesh.rotation.x = time * 0.12;
      glassMesh.rotation.y = time * 0.22;

      const tColor = time * 0.18;
      const colorIndex = Math.floor(tColor) % palette.length;
      const nextColorIndex = (colorIndex + 1) % palette.length;
      const nextNextColorIndex = (nextColorIndex + 1) % palette.length;
      const nextNextNextColorIndex = (nextNextColorIndex + 1) % palette.length;
      const alpha = tColor % 1;
      const easedAlpha = 0.5 - 0.5 * Math.cos(Math.PI * alpha);

      deepColor.copy(palette[colorIndex]).lerp(palette[nextColorIndex], easedAlpha);
      highlightColor
        .copy(palette[nextColorIndex])
        .lerp(palette[nextNextColorIndex], easedAlpha);
      fresnelColor
        .copy(palette[nextNextColorIndex])
        .lerp(palette[nextNextNextColorIndex], easedAlpha);

      liquidMaterial.uniforms.uTime.value = time;
      liquidMaterial.uniforms.uGlowStrength.value = 0.8 + Math.sin(time * 1.8) * 0.3;
      liquidMaterial.uniforms.uDeepColor.value.copy(deepColor);
      liquidMaterial.uniforms.uHighlightColor.value.copy(highlightColor);
      liquidMaterial.uniforms.uFresnelColor.value.copy(fresnelColor);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      coreGeometry.dispose();
      liquidMaterial.dispose();
      glassGeometry.dispose();
      glassMaterial.dispose();
      envTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`shrink-0 flex items-center justify-center leading-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden={ariaLabel ? undefined : 'true'}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
    />
  );
}
