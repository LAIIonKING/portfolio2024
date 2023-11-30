import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Float,
  Lightformer,
  Text,
  Html,
  ContactShadows,
  Environment,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";

import { easing } from "maath";

export default function Glass() {
  // const inter = import("@pmndrs/assets/fonts/inter_regular.woff");

  return (
    <div
      className="border border-white mt-8"
      style={{ height: "calc(100vh - 150px)" }}
    >
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
        eventPrefix="client"
      >
        <color attach="background" args={["#ffffff"]} />
        <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
        />
        <Text
          position={[0, 0, -10]}
          fontSize={14}
          letterSpacing={-0.025}
          // font={suspend(inter).default}
          color="black"
        >
          Glass
          <Html
            style={{
              color: "transparent",
              fontSize: "33.5em",
              position: "relative",
              top: "-30px",
            }}
            transform
          >
            Glass
          </Html>
        </Text>
        <Float floatIntensity={2} rotationIntensity={2}>
          <Torus />
        </Float>
        <ContactShadows
          scale={100}
          position={[0, -7.5, 0]}
          blur={1}
          far={100}
          opacity={0.85}
        />
        <Environment preset="city">
          <Lightformer
            intensity={8}
            position={[10, 5, 0]}
            scale={[10, 50, 1]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        {/* <EffectComposer disableNormalPass>
          <N8AO aoRadius={1} intensity={2} />
          <TiltShift2 blur={0.2} />
        </EffectComposer> */}
        <Rig />
      </Canvas>
    </div>
  );
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        state.pointer.y * 3.5,
        15 + Math.cos(state.pointer.x) * 10,
      ],
      0.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
}

const Torus = (props) => (
  <mesh receiveShadow castShadow {...props}>
    <torusGeometry args={[4, 1.2, 128, 64]} />
    <MeshTransmissionMaterial
      backside
      backsideThickness={5}
      thickness={0}
      chromaticAberration={0.5}
    />
  </mesh>
);
