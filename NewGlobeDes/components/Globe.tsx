"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GlobeMaterial } from "./GlobeShaderMaterial";

extend({ GlobeMaterial });

const GlobeMesh = () => {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      {/* @ts-ignore */}
      <globeMaterial ref={materialRef} />
    </mesh>
  );
};

export default function Globe() {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <GlobeMesh />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
