import * as CANNON from "cannon-es";

export class CannonPlane {
  constructor(info) {
    this.cannonWorld = info.cannonWorld;

    this.index = info.index;
    this.name = info.name;

    this.x = info.x || 0;
    this.y = info.y || 0;
    this.z = info.z || 0;

    this.rotationX = info.rotationX || 0;
    this.rotationY = info.rotationY || 0;
    this.rotationZ = info.rotationZ || 0;

    this.width = info.width || 1;
    this.height = info.height || 1;

    this.pi = info.pi || Math.PI / 2;

    const floorShape = new CANNON.Plane(
      new CANNON.Vec3(this.width, this.height)
    );
    const floorBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(this.x, this.y, this.z),
      shape: floorShape,
    });
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(this.rotationX, this.rotationY, this.rotationZ),
      this.pi
    );
    this.cannonWorld.addBody(floorBody);
  }
}
