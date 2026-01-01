import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      fog: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      fog: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
    }
  }
}

const FloatingScreens = () => {
  const meshRef = useRef<THREE.Group>(null);

  const count = 30;
  const range = 20;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * range * 1.5;
      const y = (Math.random() - 0.5) * range;
      const z = (Math.random() - 0.5) * range;
      const scaleX = 1.6 + Math.random();
      const scaleY = 0.9 + Math.random() * 0.5;
      temp.push({ position: [x, y, z], scale: [scaleX, scaleY, 0.05] });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((data, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.5}
          floatIntensity={1}
          position={data.position as [number, number, number]}
        >
          <mesh>
            <boxGeometry args={data.scale as [number, number, number]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#0D9488" : "#1E293B"}
              emissive={i % 3 === 0 ? "#0D9488" : "#000000"}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh>
            <boxGeometry args={[data.scale[0] + 0.1, data.scale[1] + 0.1, 0.04]} />
            <meshBasicMaterial color="#D97706" wireframe opacity={0.1} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const Scene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-40 md:opacity-80">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <fog attach="fog" args={['#0F172A', 5, 30]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#0D9488" />
        <pointLight position={[-10, -10, -5]} intensity={5} color="#D97706" />

        <FloatingScreens />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default Scene;