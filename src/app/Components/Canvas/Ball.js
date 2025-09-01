"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Decal, OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader"; 

// Ball component
const BallMesh = ({ imgUrl }) => {
  const decalTexture = useTexture(imgUrl);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[0, 0, 0.5]} />

      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#797575"
        polygonOffset
        polygonOffsetFactor={-5}
        flatShading />
        {decalTexture && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2*Math.PI , 0 , 0]}
            map={decalTexture}
          />
        )}
      </mesh>
    </Float>
  );
};

// Canvas wrapper
const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
        />
        <BallMesh imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
