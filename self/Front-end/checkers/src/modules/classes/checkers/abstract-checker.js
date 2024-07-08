import { CHECKER_COLORS } from "../../../utils/constants";

export class AbstractChecker {
  constructor(scene, color, boardX, boardY, x, y, size) {
    this.size = size;
    this.boardX = boardX;
    this.boardY = boardY;
    this.scene = scene;
    this.color = color;
    this.enemyColor =
      color === CHECKER_COLORS.lite ? CHECKER_COLORS.dark : CHECKER_COLORS.lite;
    this.directionMove = color === CHECKER_COLORS.lite ? 1 : -1;
    this.x = x;
    this.y = y;
  }

  createSprites(scene, x, y, spriteId) {
    throw new Error("Must override method createSprites");
  }

  getAvailableBeats(boardMatrix) {
    throw new Error("Must override method getAvailableBeats");
  }

  getAvailableMoves(boardMatrix) {
    throw new Error("Must override method getAvailableMoves");
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  getColor() {
    return this.color;
  }

  getEnemyColor() {
    return this.enemyColor;
  }

  select() {
    throw new Error("Must override method select");
  }

  unselect() {
    throw new Error("Must override method unselect");
  }

  destroy() {
    throw new Error("Must override method destroy");
  }
}
