import { CHECKER_COLORS, CHECKER_TYPES } from "../../../utils/constants";
import { CHECKER_SCENE } from "../../../utils/scene-constants";
import { getSpriteResizeScale } from "../../helpers/checkers/get-resize-scale";
import { isInsideBoard } from "../../helpers/checkers/is-inside-board";
import { AbstractChecker } from "./abstract-checker";

export class Checker extends AbstractChecker {
  constructor(scene, color, boardX, boardY, x, y, size) {
    super(scene, color, boardX, boardY, x, y, size);
    this.type = CHECKER_TYPES.checker;

    this.createSprites(scene, color, boardX, boardY, x, y, size);
  }

  createSprites(scene, color, boardX, boardY, x, y, size) {
    const scale = getSpriteResizeScale(scene, CHECKER_SCENE.liteChecker, size);
    const posX = boardX + y * size + size / 2;
    const posY = boardY + x * size + size / 2;
    const spriteId =
      color === CHECKER_COLORS.lite
        ? CHECKER_SCENE.liteChecker
        : CHECKER_SCENE.darkChecker;
    this.checkerSprite = scene.add
      .image(posX, posY, spriteId)
      .setScale(scale)
      .setDepth(1);
    this.checkerOutLineSprite = scene.add
      .image(posX, posY, spriteId)
      .setScale(scale * 1.1)
      .setTint(0x00ff00)
      .setDepth(0)
      .setVisible(false);
  }

  select() {
    this.checkerOutLineSprite.setVisible(true);
  }

  unselect() {
    this.checkerOutLineSprite.setVisible(false);
  }

  destroy() {
    this.checkerSprite.destroy();
    this.checkerOutLineSprite.destroy();
  }

  getAvailableBeats(boardMatrix) {
    const availableBeats = [];
    const tryDiagonalBeat = (i, j) => {
      const posX = this.x + i * 2;
      const posY = this.y + j * 2;
      if (
        isInsideBoard(posX, posY) &&
        !boardMatrix[posX][posY] &&
        boardMatrix[posX - i][posY - j] === this.enemyColor
      ) {
        availableBeats.push({ x: posX, y: posY });
      }
    };
    tryDiagonalBeat(1, 1);
    tryDiagonalBeat(1, -1);
    tryDiagonalBeat(-1, 1);
    tryDiagonalBeat(-1, -1);
    return availableBeats;
  }

  getAvailableMoves(boardMatrix) {
    const availableMoves = [];
    const tryDiagonalMove = (i) => {
      const posX = this.x + this.directionMove;
      const posY = this.y + i;
      if (isInsideBoard(posX, posY) && !boardMatrix[posX][posY]) {
        availableMoves.push({ x: posX, y: posY });
      }
    };
    tryDiagonalMove(1);
    tryDiagonalMove(-1);
    return availableMoves;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
    const posX = this.boardX + y * this.size + this.size / 2;
    const posY = this.boardY + x * this.size + this.size / 2;
    this.checkerSprite.setPosition(posX, posY);
    this.checkerOutLineSprite.setPosition(posX, posY);
  }
}
