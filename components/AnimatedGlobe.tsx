"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import {
  DEFAULT_GLOBE_CONFIG,
  addAnimatedGlobeLights,
  createAnimatedGlobeScene,
} from "./animatedGlobeScene.js";

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
  const mountRef = useRef<HTMLDivElement>(null);

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
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const lights = addAnimatedGlobeLights(scene);
    const globe = createAnimatedGlobeScene(scene);
    const clock = new THREE.Clock();
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

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      globe.update(clock.getElapsedTime());
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      globe.dispose();
      lights.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`shrink-0 flex items-center justify-center leading-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden={ariaLabel ? undefined : "true"}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    />
  );
}
