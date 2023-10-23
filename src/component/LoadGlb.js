import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import coach from '../asset/coauch.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // GLTFLoader 추가
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pillow } from './Pillow';
import * as CANNON from 'cannon-es';

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
    camera.position.set(0, 0.5, 2);
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight('white', 1);
    scene.add(ambientLight);

    const redlight = new THREE.DirectionalLight('white', 0.3);
    // light.position.x = -3;
    redlight.position.set(0, 4, 8);
    scene.add(redlight);

    const light = new THREE.DirectionalLight('white', 0.3);
    // light.position.x = -3;
    light.position.set(3, 1, 6);
    scene.add(light);

    const toplight = new THREE.DirectionalLight('white', 1);
    // light.position.x = -3;
    toplight.position.set(0, 6, 0);
    scene.add(toplight);

    const lightHelper = new THREE.DirectionalLightHelper(toplight);
    scene.add(lightHelper);

    //control
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    // Cannon(물리 엔진)
    const cannonWorld = new CANNON.World();
    cannonWorld.gravity.set(0, -10, 0);

    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 0, 0),
      shape: floorShape,
    });
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI / 2
    );
    cannonWorld.addBody(floorBody);

    const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    const boxBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: boxShape,
    });
    cannonWorld.addBody(boxBody);

    // 성능을 위한 세팅
    // cannonWorld.allowSleep = true;
    cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld);
    // Contact Material
    const defaultMaterial = new CANNON.Material('default');
    const defaultContactMaterial = new CANNON.ContactMaterial(
      defaultMaterial,
      defaultMaterial,
      {
        friction: 0.01,
        restitution: 0.9,
      }
    );
    cannonWorld.defaultContactMaterial = defaultContactMaterial;
    cannonWorld.addContactMaterial(defaultContactMaterial);

    const loader = new GLTFLoader();

    const pillows = [];
    let pillow;
    for (let i = 0; i < 5; i++) {
      pillow = new Pillow({
        index: i,
        scene,
        loader,
        y: 3,
        z: -i * 0.8,
        cannonWorld,
        defaultContactMaterial,
      });
      pillows.push(pillow);
    }

    //floor
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 'white' })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    //box
    // const boxMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(5, 5, 3),
    //   new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide })
    // );
    // boxMesh.receiveShadow = true;
    // scene.add(boxMesh);

    // Animation
    let time = Date.now();

    function draw() {
      const newTime = Date.now();
      const deltaTime = newTime - time;
      time = newTime;
      cannonWorld.step(1 / 60, deltaTime, 3);
      floorMesh.position.copy(floorBody.position);
      // boxMesh.position.copy(boxBody.position);

      pillows.forEach((el) => {
        if (el.cannonBody) {
          return el.modelMesh.position.copy(el.cannonBody.position);
        }
      });

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
    window.addEventListener('resize', setSize);

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
