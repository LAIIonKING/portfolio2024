import * as THREE from "three";
import coach2 from "../asset/coauch2.glb";
import { Box, Vec3, Body } from "cannon-es";

export class Pillow {
  constructor(info) {
    this.scene = info.scene;
    this.cannonWorld = info.cannonWorld;
    this.defaultContactMaterial = info.defaultContactMaterial;

    this.index = info.index;

    this.width = info.width || 1;
    this.height = info.height || 1;
    this.depth = info.depth || 1;

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
      // this.modelMesh.name = `${this.index}번 도미노`;
      this.modelMesh.castShadow = true;
      this.modelMesh.position.set(this.x, this.y, this.z);

      this.scene.add(gltf.scene);
      this.setCannonBody();
    });
  }

  setCannonBody() {
    const material = this.defaultContactMaterial;
    const shape = new Box(
      new Vec3(this.width / 2, this.height / 2, this.depth / 2)
    );
    this.cannonBody = new Body({
      mass: 1,
      position: new Vec3(this.x, this.y, this.z),
      shape,
      material,
    });
    this.cannonBody.quaternion.setFromAxisAngle(
      new Vec3(0, 1, 0), // y축
      this.rotationY
    );
    this.modelMesh.cannonBody = this.cannonBody;
    this.cannonWorld.addBody(this.cannonBody);
  }
}
