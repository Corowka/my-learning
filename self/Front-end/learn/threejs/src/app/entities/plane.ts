import { PlaneGeometry, Color, Mesh, MeshBasicMaterial } from 'three';

export class Plane extends Mesh {
  constructor(size: number, color: Color) {
    super();
    this.geometry = new PlaneGeometry(size, size);
    this.material = new MeshBasicMaterial({ color });
    this.rotateX(-Math.PI / 2)
  }
}
