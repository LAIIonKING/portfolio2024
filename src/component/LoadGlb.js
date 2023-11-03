import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import sofa from "../asset/sofa.glb";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // GLTFLoader 추가
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pillow } from "./Pillow";
import * as CANNON from "cannon-es";
import { CannonPlane } from "./CannonPlane";

export default function LoadGlb({ canvasParentRef }) {
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
    // scene.fog = new THREE.Fog("silver", 3, 7);

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
    camera.position.set(0, 0, 5);
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight("white", 1);
    scene.add(ambientLight);

    const redlight = new THREE.DirectionalLight("white", 0.3);
    redlight.position.set(0, 4, 8);
    scene.add(redlight);

    const light = new THREE.DirectionalLight("white", 0.3);
    light.position.set(3, 1, 6);
    scene.add(light);

    const toplight = new THREE.DirectionalLight("white", 1);
    toplight.position.set(0, 6, 0);
    scene.add(toplight);

    // const lightHelper = new THREE.DirectionalLightHelper(toplight);
    // scene.add(lightHelper);

    //control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Cannon(물리 엔진)
    const cannonWorld = new CANNON.World();
    cannonWorld.gravity.set(0, 0, 0);

    //room Cannon
    new CannonPlane({
      name: "bottom",
      y: -1,
      rotationX: -1,
      cannonWorld,
    });
    new CannonPlane({
      name: "top",
      y: 1,
      rotationX: 1,
      cannonWorld,
    });
    new CannonPlane({
      name: "right",
      x: 2,
      rotationY: -1,
      cannonWorld,
    });
    new CannonPlane({
      name: "left",
      x: -2,
      rotationY: 1,
      cannonWorld,
    });
    new CannonPlane({
      name: "back",
      z: 2,
      cannonWorld,
    });
    new CannonPlane({
      name: "front",
      z: 4,
      cannonWorld,
      rotationX: 1,
      pi: Math.PI,
    });

    // const geometry = new THREE.PlaneGeometry(1, 1);
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0xffff00,
    //   side: THREE.DoubleSide,
    // });
    // const plane = new THREE.Mesh(geometry, material);
    // plane.position.set(0, 0, 4);
    // scene.add(plane);

    // 성능을 위한 세팅
    // cannonWorld.allowSleep = true;
    cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld);

    const loader = new GLTFLoader();

    const pillows = [];
    let pillow;
    for (let i = 0; i < 3; i++) {
      pillow = new Pillow({
        name: "pillow",
        index: i,
        scene,
        loader,
        x: i - 1,
        y: 0,
        // z: -i * 0.8,
        z: 3,
        cannonWorld,
      });
      pillows.push(pillow);
    }

    loader.load(sofa, (gltf) => {
      // GLB 모델 로드 완료 시 호출되는 콜백 함수
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Accessing and modifying the material
          const newMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.3,
            metalness: 0.9,
          }); // Create a new material
          child.material = newMaterial; // Assign the new material to the mesh
        }
      });
      let modelMesh = gltf.scene.children[0];
      modelMesh.name = "sofa";
      modelMesh.castShadow = true;
      modelMesh.position.set(0, 0, 0);

      scene.add(gltf.scene);
      setCannonBody();
    });

    // Animation
    let time = Date.now();

    function draw() {
      const newTime = Date.now();
      const deltaTime = newTime - time;
      time = newTime;
      cannonWorld.step(1 / 75, deltaTime, 3);

      pillows.forEach((el) => {
        if (el.cannonBody) {
          el.modelMesh.position.copy(el.cannonBody.position);
          el.modelMesh.quaternion.copy(el.cannonBody.quaternion);
          return;
        }
      });

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
        if (item.object.cannonBody && item.object.name === "pillow") {
          console.log(item.object.cannonBodym);
          item.object.cannonBody.applyForce(
            new CANNON.Vec3(
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
              Math.random() * 20 - 10
            )
          );
          break;
        }
      }

      // if (intersects[0].object.cannonBody) {
      // 	intersects[0].object.cannonBody.applyForce(
      // 		new CANNON.Vec3(0, 0, -100),
      // 		new CANNON.Vec3(0, 0, 0)
      // 	);
      // }
    }
    canvas.addEventListener("mousemove", (e) => {
      // if (preventDragClick.mouseMoved) return;

      mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1.3);

      checkIntersects();
    });

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
