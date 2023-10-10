import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import coach from "../asset/coauch.glb";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // GLTFLoader 추가
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pillow } from "./Pillow";

export default function LoadGlb({ canvasParentRef }) {
  const canvasRef = useRef();
  console.log(canvasParentRef);
  useEffect(() => {
    const canvas = canvasRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    // renderer.setSize(window.innerWidth - 66, window.innerHeight - 151);
    renderer.setSize(
      canvasParentRef.current.offsetWidth - 2,
      canvasParentRef.current.offsetHeight - 1
    );
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // Scene
    const scene = new THREE.Scene();
    // scene.fog = new THREE.Fog("silver", 3, 7);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 1;
    camera.position.z = 0.5;
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight("white", 1);
    scene.add(ambientLight);

    const redlight = new THREE.DirectionalLight("white", 0.3);
    // light.position.x = -3;
    redlight.position.set(0, 4, 8);
    scene.add(redlight);

    const light = new THREE.DirectionalLight("white", 0.3);
    // light.position.x = -3;
    light.position.set(3, 1, 6);
    scene.add(light);

    const toplight = new THREE.DirectionalLight("white", 1);
    // light.position.x = -3;
    toplight.position.set(0, 6, 0);
    scene.add(toplight);

    const lightHelper = new THREE.DirectionalLightHelper(toplight);
    scene.add(lightHelper);

    //control
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    const loader = new GLTFLoader();

    const pillows = [];
    let pillow;
    for (let i = 0; i < 5; i++) {
      pillow = new Pillow({
        index: i,
        scene,
        // cannonWorld,
        loader,
        z: -i * 0.8,
      });
      pillows.push(pillow);
    }

    //floor
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: "white" })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

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

    // gsap animation
    // gsap.to(mesh.position, {
    //   duration: 1,
    //   y: 2,
    //   z: 3,
    // });

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        canvasParentRef.current.offsetWidth - 2,
        canvasParentRef.current.offsetHeight - 1
      );
      renderer.render(scene, camera);
    }

    // Event listeners
    window.addEventListener("resize", setSize);

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
