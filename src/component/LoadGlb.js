import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import coach from "../asset/coauch.glb";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // GLTFLoader 추가
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    scene.fog = new THREE.Fog("silver", 3, 7);

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

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.x = 3;
    light.position.y = 3;
    light.position.z = 5;
    scene.add(light);

    //control
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    // GLTFLoader를 이용하여 GLB 파일 로드
    const loader = new GLTFLoader();
    // const glbPath = "/src/asset/coauch.glb"; // GLB 파일의 경로로 변경

    loader.load(coach, (gltf) => {
      // GLB 모델 로드 완료 시 호출되는 콜백 함수
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Accessing and modifying the material
          const newMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.2,
            metalness: 1,
          }); // Create a new material
          child.material = newMaterial; // Assign the new material to the mesh
        }
      });
      scene.add(gltf.scene);
    });

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
