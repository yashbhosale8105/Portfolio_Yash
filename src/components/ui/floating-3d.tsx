"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

const AnimatedObject = ({ position, color, size, speed }: any) => {
    return (
        <Float
            position={position}
            speed={speed}
            rotationIntensity={0.5}
            floatIntensity={1}
        >
            <mesh>
                <sphereGeometry args={[size, 64, 64]} />
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

export const Floating3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80 dark:opacity-60">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#4F46E5" />
                <AnimatedObject position={[-5, 3, 0]} color="#4F46E5" size={2} speed={1} />
                <AnimatedObject position={[6, -2, 0]} color="#06B6D4" size={1.5} speed={1.5} />
                <AnimatedObject position={[2, 4, -5]} color="#6366F1" size={1} speed={2} />
            </Canvas>
        </div>
    );
};
