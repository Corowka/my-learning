import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, Clock, AxesHelper } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Plane } from './entities/plane';
import { SkyBox } from './environment/skybox';
import { Landscape } from './entities/landscape';

export class App {
  private readonly timer = new Clock();
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  });

  private plane: Plane;
  private landscape: Landscape
  private sky: SkyBox;
  private controls: OrbitControls;

  constructor() {
    this.plane = new Plane(300, new Color("#eee"));
    this.scene.add(this.plane);

    this.landscape = new Landscape();
    this.scene.add(this.landscape);

    this.camera.position.set(200, 500, 200);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color('rgb(0,0,0)'));

    const axesHelper = new AxesHelper(1000)
    this.scene.add(axesHelper)

    this.sky = new SkyBox(1000)
    this.scene.add(this.sky);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.update()

    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    // const delta = this.timer.getDelta();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
    this.adjustCanvasSize();
    // this.brick.rotateY(3 * delta);
  }
}
