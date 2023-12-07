import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Light() {
  return (
    <div
      className="border border-white mt-8"
      style={{ height: "calc(100vh - 150px)" }}
    >
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
        <ambientLight
          position={[1, 1, 1]}
          penumbra={1}
          castShadow
          angle={0.2}
        />
        <Tree position={[0, 0, 0]} />
        <Bulb position={[3, 0, 0]} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

const Bulb = (props) => {
  const [clicked, click] = useState(false);
  const [hovered, hover] = useState(false);
  const ref = useRef();

  // useFrame((state, delta) => (ref.current.material.color.b += delta));
  return (
    <mesh
      ref={ref}
      receiveShadow
      castShadow
      {...props}
      onClick={(event) => {
        click(!clicked);
      }}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[0.2, 0.2, 10]} />
      <meshBasicMaterial
        color={hovered ? [4, 3, 2] : [1, 1, 1]}
        // toneMapped={clicked ? false : true}
        toneMapped={true}
      />
    </mesh>
  );
};

const Tree = (props) => (
  <mesh receiveShadow castShadow {...props}>
    <coneGeometry args={[1.5, 4, 30]} />
    <meshStandardMaterial color={"white"} />
  </mesh>
);
