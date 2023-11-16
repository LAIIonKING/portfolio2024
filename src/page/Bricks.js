import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import sofa from "../asset/Sofa.glb";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // GLTFLoader 추가
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import baseColorImg from "../asset/brick texture/Rock_034_Base_Color.jpg";
import normalImg from "../asset/brick texture/Rock_034_Normal.jpg";
import heightImg from "../asset/brick texture/Rock_034_Height.png";
import roughImg from "../asset/brick texture/Rock_034_Roughness.jpg";

export default function Bricks() {
  const canvasParentRef = useRef();
  const canvasRef = useRef();
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
    scene.background = new THREE.Color(0xffffff);
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
    camera.position.set(0, 0, 2);
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight("white", 1);
    scene.add(ambientLight);

    const redlight = new THREE.DirectionalLight("white", 1);
    redlight.position.set(0, 6, 12);
    scene.add(redlight);

    const light = new THREE.DirectionalLight("white", 1);
    light.position.set(3, 1, 6);
    scene.add(light);

    const toplight = new THREE.DirectionalLight("white", 1);
    toplight.position.set(0, 6, 0);
    scene.add(toplight);

    const lightHelper = new THREE.DirectionalLightHelper(redlight);
    scene.add(lightHelper);

    //control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    //texture Add
    const textureLoader = new THREE.TextureLoader();
    const textureBaseColor = textureLoader.load(baseColorImg);
    const textureNormalMap = textureLoader.load(normalImg);
    const textureHeightMap = textureLoader.load(heightImg);
    const textureRoughnessMap = textureLoader.load(roughImg);

    //Plane mesh
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshStandardMaterial({
      // color: 0xffff00,
      map: textureBaseColor,
      normalMap: textureNormalMap,
      displacementMap: textureHeightMap,
      displacementScale: 0.8,
      roughnessMap: textureRoughnessMap,
      roughness: 0.5,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.material.normalMap.wrapS = plane.material.normalMap.wrapT =
      THREE.RepeatWrapping;
    plane.material.displacementMap.wrapS =
      plane.material.displacementMap.wrapT = THREE.RepeatWrapping;
    plane.material.roughnessMap.wrapS = plane.material.roughnessMap.wrapT =
      THREE.RepeatWrapping;

    plane.material.map.repeat.set(10, 10);
    plane.material.normalMap.repeat.set(10, 10);
    plane.material.displacementMap.repeat.set(10, 10);
    plane.material.roughnessMap.repeat.set(10, 10);
    plane.position.set(0, 0, 0);
    scene.add(plane);

    // const loader = new GLTFLoader();

    // loader.load(sofa, (gltf) => {
    //   // GLB 모델 로드 완료 시 호출되는 콜백 함수
    //   gltf.scene.traverse((child) => {
    //     if (child.isMesh) {
    //       const newMaterial = new THREE.MeshStandardMaterial({
    //         color: "#A80909",
    //         roughness: 1,
    //         // metalness: 0.9,
    //       }); // Create a new material
    //       child.material = newMaterial;
    //     }
    //   });
    //   let modelMesh = gltf.scene.children[0];
    //   modelMesh.name = "sofa";
    //   modelMesh.castShadow = true;
    //   modelMesh.position.set(100, 0, 0);

    //   scene.add(gltf.scene);
    // });

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
    window.addEventListener("resize", setSize);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function checkIntersects() {
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      for (const item of intersects) {
        if (item.object.name === "pillow") {
          break;
        }
      }
    }
    // canvas.addEventListener("mousemove", (e) => {
    //   mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
    //   mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1.3);

    //   checkIntersects();
    // });

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <div
      className="border border-white mt-8"
      style={{ height: "calc(100vh - 150px)" }}
      ref={canvasParentRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
