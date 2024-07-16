import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  useGLTF,
  Float,
  Lightformer,
  Text,
  Html,
  ContactShadows,
  Environment,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import spring from '../../asset/main_wave.glb';

import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing';

import { easing } from 'maath';

export default function Figure() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          // 현재 브라우저의 가로, 세로 길이로 셋팅
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // resize 이벤트가 발생할 때 handleResize 함수가 실행되도록 한다.
      window.addEventListener('resize', handleResize);

      // 초기값을 설정할 수 있도록 handleResize 함수를 한 번 실행시킨다.
      handleResize();

      // 이벤트 리스너를 제거하여 이벤트 리스너가 리사이즈될 때마다 계속해서 생겨나지 않도록 처리한다. (clean up)
      window.removeEventListener('resize', handleResize);
    } else {
      window.removeEventListener('resize', () => {});
    }
  }, []); // 컴포넌트가 처음 마운트 될때와 언마운트 될 때 실행

  return (
    <div style={{ height: 'calc(100vh - 150px)' }}>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
        eventPrefix="client"
      >
        {/* 배경 <color attach="background" args={['#ffffff']} /> */}
        <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
        />
        {/* <Text
          position={[0, 0, -10]}
          fontSize={24}
          letterSpacing={-0.025}
          // font={suspend(inter).default}
          color="#FF4003"
        >
          HYUNJI SON
          <Html
            style={{
              color: 'transparent',
              fontSize: '60.5em',
              fontWeight: '800',
              position: 'relative',
              top: '-100px',
            }}
            transform
          >
            HYUNJISON
          </Html>
        </Text> */}
        <Float
          floatIntensity={5}
          speed={5}
          rotationIntensity={2}
          position={[12, 15, -10]}
        >
          <Ice />
        </Float>
        <Float
          floatIntensity={5}
          speed={5}
          rotationIntensity={2}
          position={[25, -10, 0]}
        >
          <Sphere />
        </Float>
        <Float
          floatIntensity={5}
          speed={3}
          rotationIntensity={0.5}
          position={[-15, 0, 0]}
          rotation={[2.5, 5, 4]}
          scale={[0.025, 0.025, 0.025]}
        >
          <Spring />
        </Float>
        <Float
          floatIntensity={5}
          speed={5}
          rotationIntensity={2}
          position={[-25, 15, 0]}
        >
          <Capsule />
        </Float>
        {/* <ContactShadows
          scale={100}
          position={[0, -7.5, 0]}
          blur={1}
          far={100}
          opacity={0.85}
        /> */}
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

const Ice = (props) => (
  <mesh receiveShadow castShadow {...props}>
    <boxGeometry args={[5, 5, 5]} />
    <meshStandardMaterial color="#0479f6" />
  </mesh>
);

const Sphere = (props) => (
  <mesh receiveShadow castShadow {...props}>
    <sphereGeometry args={[5, 32, 16]} />
    <meshStandardMaterial color="#0479f6" />
  </mesh>
);

const Capsule = (props) => (
  <mesh receiveShadow castShadow {...props}>
    <capsuleGeometry args={[2.5, 6, 4, 8]} />
    <meshStandardMaterial color="#0479f6" />
  </mesh>
);

function Spring(props) {
  // const gltf = useLoader(GLTFLoader, spring);
  // return <primitive object={gltf.scene} />;
  const groupRef = useRef();
  const { nodes, materials } = useGLTF(spring);
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Sweep.geometry}>
        {/* <MeshTransmissionMaterial
          backside
          backsideThickness={20}
          thickness={1}
          chromaticAberration={1}
          color={'#95DCFF'}
        /> */}
        <meshStandardMaterial color="#0479f6" />
      </mesh>
    </group>
  );
}
