import { CHECKER_SCENE } from "../../../utils/scene-constants";
import { getSpriteResizeScale } from "../../helpers/checkers/get-resize-scale";

export class Marker {
  constructor(scene, boardX, boardY, x, y, size) {
    this.scene = scene;
    this.boardX = boardX;
    this.boardY = boardY;
    this.x = x;
    this.y = y;
    this.size = size;

    this.createSprite(scene, boardX, boardY, x, y, size);
  }

  createSprite(scene, boardX, boardY, x, y, size) {
    const scale = getSpriteResizeScale(scene, CHECKER_SCENE.marker, size);
    const posX = boardX + x * size + size / 2;
    const posY = boardY + y * size + size / 2;
    this.markerSprite = scene.add
      .image(posX, posY, CHECKER_SCENE.marker)
      .setScale(scale);
  }

  setPos(x, y) {
    const posX = this.boardX + x * this.size + this.size / 2;
    const posY = this.boardY + y * this.size + this.size / 2;
    this.markerSprite.setPosition(posX, posY);
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  show() {
    this.markerSprite.setVisible(true);
  }

  hide() {
    this.markerSprite.setVisible(false);
  }
}
