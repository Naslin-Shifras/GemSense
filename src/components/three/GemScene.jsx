import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Preload, ContactShadows, OrbitControls } from '@react-three/drei';
import GemModel from './GemModel';

const GemScene = () => {
  return (
    <div className="w-full h-full relative z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFE4E6" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#EF4444" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#7F1D1D" distance={10} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <GemModel />
          </Float>
          <Environment preset="city" />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#050608" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GemScene;
