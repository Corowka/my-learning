import { BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader, BackSide } from 'three';

export class SkyBox extends Mesh {
  constructor(size: number) {
    super();

    const textureLoader = new TextureLoader()
    const materials = [
      textureLoader.load('./src/assets/skybox/sky_px.png'), // Right
      textureLoader.load('./src/assets/skybox/sky_nx.png'), // Left
      textureLoader.load('./src/assets/skybox/sky_py.png'), // Top
      textureLoader.load('./src/assets/skybox/sky_ny.png'), // Bottom
      textureLoader.load('./src/assets/skybox/sky_nz.png'), // Front
      textureLoader.load('./src/assets/skybox/sky_pz.png'), // Back
    ].map(texture => new MeshBasicMaterial({ map: texture, side: BackSide }));

    this.geometry = new BoxGeometry(size, size, size);
    this.material = materials
  }
}
