import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import waveText from '../../asset/waveText.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // GLTFLoader 추가
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Skills() {
  const canvasParentRef = useRef();
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(
      canvasParentRef.current.offsetWidth,
      canvasParentRef.current.offsetHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setClearColor(0x000000, 0); //배경 투명

    // Scene
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xffffff);
    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const hFOV =
      (2 *
        Math.atan(Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.aspect) *
        180) /
      Math.PI; // degrees
    camera.fov = hFOV;
    camera.position.set(0, 0, 6);
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight('white', 1);
    scene.add(ambientLight);

    const redlight = new THREE.DirectionalLight('white', 1);
    redlight.position.set(0, 6, 12);
    scene.add(redlight);

    const light = new THREE.DirectionalLight('white', 1);
    light.position.set(3, 1, 6);
    scene.add(light);

    const toplight = new THREE.DirectionalLight('white', 1);
    toplight.position.set(0, 6, 0);
    scene.add(toplight);

    const lightHelper = new THREE.DirectionalLightHelper(redlight);
    scene.add(lightHelper);

    //control
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    const loader = new GLTFLoader();

    loader.load(waveText, (gltf) => {
      const model = gltf.scene;
      model.position.set(250, 0, -50);
      model.scale.set(0.3, 0.3, 0.3);
      scene.add(model);

      // change child material
      model.traverse((child) => {
        if (child.isCamera) {
          camera.position.copy(child.position);
          camera.rotation.copy(child.rotation);
          camera.position.z *= 0.1;
        }
        if (child.isMesh) {
          // 01. search text material and bind to mats
          // 01-a. Array method : push()
        }
      });

      // render();
    });

    // Animation
    let time = Date.now();

    function draw() {
      const newTime = Date.now();
      const deltaTime = newTime - time;
      time = newTime;

      renderer.render(scene, camera);

      // window.requestAnimationFrame(draw);
      renderer.setAnimationLoop(draw);
    }

    function setSize() {
      const fov = 50;
      const planeAspectRatio = 16 / 9;

      camera.aspect = window.innerWidth / window.innerHeight;

      if (camera.aspect > planeAspectRatio) {
        // window too large
        const cameraHeight = Math.tan(THREE.MathUtils.degToRad(fov / 2));
        const ratio = camera.aspect / planeAspectRatio;
        const newCameraHeight = cameraHeight / ratio;
        camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
      } else {
        // window too narrow
        camera.fov = fov;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(
        canvasParentRef.current.offsetWidth - 2,
        canvasParentRef.current.offsetHeight - 1
      );
      renderer.render(scene, camera);
    }

    // Event listeners
    window.addEventListener('resize', setSize);

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <div style={{ height: '100vh' }} ref={canvasParentRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}
