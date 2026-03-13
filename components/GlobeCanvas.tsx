"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { GlobeMaterial } from "./GlobeShaderMaterial";

extend({ GlobeMaterial });

type GlobeMeshProps = {
  time?: number;
};

type GlobeCanvasProps = {
  className?: string;
  showControls?: boolean;
  preserveDrawingBuffer?: boolean;
  transparentBackground?: boolean;
  time?: number;
  cameraZ?: number;
};

const GlobeMesh = ({ time }: GlobeMeshProps) => {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const currentTime = typeof time === "number" ? time : state.clock.elapsedTime;

    if (materialRef.current) {
      materialRef.current.uTime = currentTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = currentTime * 0.2;
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

const GlobeClearColor = ({
  transparentBackground,
}: {
  transparentBackground: boolean;
}) => {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(
      transparentBackground ? new THREE.Color(0x000000) : new THREE.Color(0xffffff),
      transparentBackground ? 0 : 1
    );
  }, [gl, transparentBackground]);

  return null;
};

export default function GlobeCanvas({
  className = "",
  showControls = false,
  preserveDrawingBuffer = false,
  transparentBackground = true,
  time,
  cameraZ = 5,
}: GlobeCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, cameraZ], fov: 45 }}
      >
        <GlobeClearColor transparentBackground={transparentBackground} />
        <ambientLight intensity={0.5} />
        <GlobeMesh time={time} />
        {showControls ? <OrbitControls enableZoom={false} enablePan={false} /> : null}
      </Canvas>
    </div>
  );
}
