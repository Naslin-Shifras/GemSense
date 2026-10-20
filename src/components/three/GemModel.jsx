import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Octahedron } from '@react-three/drei';

const GemModel = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group>
      <Octahedron ref={meshRef} args={[2, 1]}>
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#EF4444"
          emissive="#7F1D1D"
          emissiveIntensity={0.4}
          roughness={0.1}
          transmission={1}
          ior={2.4}
        />
      </Octahedron>
      
      {/* Inner crystal for complex reflections */}
      <Octahedron args={[1.5, 0]}>
        <meshPhysicalMaterial 
          color="#DC2626"
          emissive="#991B1B"
          emissiveIntensity={0.6}
          roughness={0.2}
          transmission={0.8}
          thickness={0.5}
        />
      </Octahedron>
    </group>
  );
};

export default GemModel;
