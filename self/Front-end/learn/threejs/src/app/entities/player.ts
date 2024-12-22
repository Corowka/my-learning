import { Color, Mesh, MeshBasicMaterial, Camera, PerspectiveCamera, Vector3, BoxGeometry } from 'three';

export class Player extends Mesh {

  private color: Color = new Color("#f6f")
  private sizes: Vector3 = new Vector3(100, 100, 200)
  private camera: Camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);

  constructor() {
    super();

    this.camera.position.set(200, 500, 200);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.geometry = new BoxGeometry(...this.sizes);
    this.material = new MeshBasicMaterial({ color: this.color });
  }
}
