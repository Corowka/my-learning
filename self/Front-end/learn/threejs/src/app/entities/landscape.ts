import { Mesh, Group, Object3DEventMap } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export class Landscape extends Mesh {
  private landscape: Group<Object3DEventMap> | null

  constructor() {
    super()

    const loader = new FBXLoader();
    this.landscape = null
    loader.load("./src/assets/landscape.fbx", (object) => {
      this.landscape = object
    }, (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
      console.error(error);
    });
  }
}