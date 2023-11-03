import * as THREE from "three";
import coach2 from "../asset/coauch2.glb";
import { Box, Vec3, Body, Material, ContactMaterial } from "cannon-es";

export class Pillow {
  constructor(info) {
    this.scene = info.scene;
    this.cannonWorld = info.cannonWorld;
    this.defaultContactMaterial = info.defaultContactMaterial;

    this.index = info.index;
    this.name = info.name;

    this.width = 0.35;
    this.height = 0.22;
    this.depth = 0.03;

    this.x = info.x || 0;
    this.y = info.y || 0.5;
    this.z = info.z || 0;

    this.rotationY = info.rotationY || 0;

    info.loader.load(coach2, (gltf) => {
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
      this.modelMesh = gltf.scene.children[0];
      this.modelMesh.name = this.name;
      this.modelMesh.castShadow = true;
      this.modelMesh.scale.set(this.width, this.height, this.depth);
      this.modelMesh.position.set(this.x, this.y, this.z);

      this.scene.add(gltf.scene);
      this.setCannonBody();
    });
  }

  setCannonBody() {
    // const material = this.defaultContactMaterial;
    const defaultMaterial = new Material("default");
    const defaultContactMaterial = new ContactMaterial(defaultMaterial, {
      friction: 0.01,
      restitution: 0.8,
    });
    this.cannonWorld.defaultContactMaterial = defaultContactMaterial;
    this.cannonWorld.addContactMaterial(defaultContactMaterial);

    const shape = new Box(new Vec3(this.width, this.height, this.depth));
    this.cannonBody = new Body({
      mass: 1,
      position: new Vec3(this.x, this.y, this.z),
      shape,
      // material,
      defaultContactMaterial,
    });
    this.cannonBody.applyForce(
      new Vec3(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      ),
      new Vec3(0, 0, 0)
    );
    this.modelMesh.cannonBody = this.cannonBody;
    this.cannonWorld.addBody(this.cannonBody);
  }
}
