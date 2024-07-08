import { CHECKER_COLORS, CHECKER_TYPES } from "../../../utils/constants";
import { CHECKER_SCENE } from "../../../utils/scene-constants";
import { getSpriteResizeScale } from "../../helpers/checkers/get-resize-scale";
import { isInsideBoard } from "../../helpers/checkers/is-inside-board";
import { AbstractChecker } from "./abstract-checker";

export class QueenChecker extends AbstractChecker {
  constructor(scene, color, boardX, boardY, x, y, size) {
    super(scene, color, boardX, boardY, x, y, size);
    this.type = CHECKER_TYPES.queen;

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
    this.queenSprite = scene.add
      .image(posX, posY, CHECKER_SCENE.queen)
      .setScale(scale)
      .setDepth(2);
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
    this.queenSprite.destroy();
  }

  getAvailableBeats(boardMatrix) {
    const availableBeats = [];
    const tryDiagonalBeat = (i, j) => {
      let isEnemyMet = false;
      let posX = this.x + i;
      let posY = this.y + j;
      while (isInsideBoard(posX, posY)) {
        if (
          !isEnemyMet &&
          boardMatrix[posX - i][posY - j] === this.enemyColor
        ) {
          isEnemyMet = true;
          posX += i;
          posY += j;
          continue;
        }
        if (isEnemyMet) {
          if (!boardMatrix[posX][posY]) {
            availableBeats.push({ x: posX, y: posY });
          } else {
            return;
          }
        }
        posX += i;
        posY += j;
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
    const tryDiagonalMove = (i, j) => {
      let posX = this.x + i;
      let posY = this.y + j;
      while (isInsideBoard(posX, posY)) {
        if (boardMatrix[posX][posY]) {
          break;
        }
        availableMoves.push({ x: posX, y: posY });
        posX += i;
        posY += j;
      }
    };
    tryDiagonalMove(1, 1);
    tryDiagonalMove(1, -1);
    tryDiagonalMove(-1, 1);
    tryDiagonalMove(-1, -1);
    return availableMoves;
  }
}
