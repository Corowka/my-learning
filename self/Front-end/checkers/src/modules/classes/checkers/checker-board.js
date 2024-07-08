import { ObjectPool } from "../../../utils/classes/object-pool";
import { CHECKER_COLORS, CHECKER_TEAMS } from "../../../utils/constants";
import { CHECKER_SCENE } from "../../../utils/scene-constants";
import { getSpriteResizeScale } from "../../helpers/checkers/get-resize-scale";
import { isInsideBoard } from "../../helpers/checkers/is-inside-board";
import { Checker } from "./checker";
import { Marker } from "./marker";
import { QueenChecker } from "./queen-checker";

const isLiteCell = (x, y) => {
  return (x + y) % 2 === 0;
};

export class CheckerBoard {
  constructor(scene, gameState, x, y, size) {
    const boardX = x - size / 2;
    const boardY = y - size / 2;

    this.createSprites(scene, boardX, boardY, x, y, size);
    this.createCheckers(scene, boardX, boardY, x, y, size);

    this.scene = scene;
    this.boardX = boardX;
    this.boardY = boardY;
    this.size = size;

    this.markerPool = new ObjectPool(
      () => new Marker(scene, this.boardX, this.boardY, 0, 0, size / 8)
    );
    this.markers = [];
    this.gameState = gameState;

    this.prevChecker = null;
    this.hasBeat = false;
  }

  restart() {
    this.createSprites(scene, boardX, boardY, x, y, size);
    this.createCheckers(scene, boardX, boardY, x, y, size);
    this.gameState.reset();
  }

  createCheckers(scene, boardX, boardY, x, y, size) {
    this.checkers = { [CHECKER_TEAMS.lite]: [], [CHECKER_TEAMS.dark]: [] };
    const checkerSize = size / 8;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isLiteCell(i, j) || (j < 5 && j > 2)) continue;
        const color = j <= 2 ? CHECKER_COLORS.lite : CHECKER_COLORS.dark;
        const team = j <= 2 ? CHECKER_TEAMS.lite : CHECKER_TEAMS.dark;
        this.checkers[team].push(
          new Checker(scene, color, boardX, boardY, j, i, checkerSize)
        );
      }
    }
  }

  createSprites(scene, boardX, boardY, x, y, size) {
    const cellSize = size / 8;
    const scale = getSpriteResizeScale(scene, CHECKER_SCENE.liteCell, cellSize);
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const cellSpriteId = isLiteCell(i, j)
          ? CHECKER_SCENE.liteCell
          : CHECKER_SCENE.darkCell;
        const cellSprite = scene.add
          .image(
            boardX + j * cellSize + cellSize / 2,
            boardY + i * cellSize + cellSize / 2,
            cellSpriteId
          )
          .setScale(scale)
          .setInteractive();
        cellSprite.on("pointerdown", () => this.handleCellClick(i, j));
      }
    }
  }

  handleCellClick(x, y) {
    const boardMatrix = this.getBoardMatrix();

    const team = this.gameState.getTeamMoveOrder();
    const teamCheckers = this.checkers[team];

    const checkersWithCells = this.getAllAvailableCheckersAndCells(
      teamCheckers,
      boardMatrix
    );

    const availableCheckers = checkersWithCells.map((item) => item.checker);

    const checker = this.tryGetCheckerOnCell(availableCheckers, x, y);
    const availableCellPoses = checkersWithCells.find(
      (item) => item.checker === checker
    )?.cellPoses;

    this.tryMarkAvailableCells(availableCellPoses);
    this.tryMoveChecker(x, y, boardMatrix, team);

    this.prevChecker = checker;
  }

  tryGetCheckerOnCell(checkers, x, y) {
    this.clearAllSelections(checkers);
    const prevCheckerPos = this.prevChecker?.getPos();
    if (prevCheckerPos?.x === x && prevCheckerPos?.y === y) {
      return null;
    }
    for (let i = 0; i < checkers.length; i++) {
      const pos = checkers[i].getPos();
      if (pos.x === x && pos.y === y && this.prevChecker !== checkers[i]) {
        checkers[i].select();
        return checkers[i];
      }
    }
    return null;
  }

  tryMarkAvailableCells(availableCellPoses) {
    this.clearAllMarkers();
    availableCellPoses &&
      availableCellPoses.forEach((pos) => this.markCell(pos.x, pos.y));
  }

  tryTurnIntoQueenChecker(checker, team) {
    if (!checker) return checker;
    if (checker instanceof QueenChecker) return checker;
    const color = checker.getColor();
    const pos = checker.getPos();
    const queenLine = color === CHECKER_COLORS.lite ? 7 : 0;
    if (pos.x === queenLine) {
      this.checkers[team] = this.checkers[team].filter(
        (item) => item !== checker
      );
      const queen = new QueenChecker(
        this.scene,
        color,
        this.boardX,
        this.boardY,
        pos.x,
        pos.y,
        this.size / 8
      );
      this.checkers[team].push(queen);
      return queen;
    }
    return checker;
  }

  tryMoveChecker(x, y, boardMatrix, team) {
    if (!this.prevChecker) return;
    const availableMoves = this.prevChecker.getAvailableMoves(boardMatrix);
    const availableBeats = this.prevChecker.getAvailableBeats(boardMatrix);
    const availableCellPoses = !availableBeats.length
      ? availableMoves
      : availableBeats;
    if (availableCellPoses.some((pos) => pos.x === x && pos.y === y)) {
      const pos = this.prevChecker.getPos();
      this.prevChecker.setPos(x, y);
      this.prevChecker = this.tryTurnIntoQueenChecker(this.prevChecker, team);
      const beatenChecker = this.tryGetBeatenChecker(pos.x, pos.y, x, y, team);
      if (beatenChecker) {
        const availableBeats = this.prevChecker.getAvailableBeats(boardMatrix);
        if (!availableBeats.length) {
          this.gameState.changeTeamMoveOrder();
          return;
        }
        this.prevChecker.select();
        this.tryMarkAvailableCells(availableBeats);
        this.hasBeat = true;
        return;
      }
      this.gameState.changeTeamMoveOrder();
    }
  }

  tryGetBeatenChecker(x1, y1, x2, y2, team) {
    const enemyTeam =
      team === CHECKER_TEAMS.lite ? CHECKER_TEAMS.dark : CHECKER_TEAMS.lite;
    const directionX = (x2 - x1) / Math.abs(x1 - x2);
    const directionY = (y2 - y1) / Math.abs(y1 - y2);
    let posX = x1 + directionX;
    let posY = y1 + directionY;
    const enemyCheckersPoses = this.checkers[enemyTeam].map((checker) =>
      checker.getPos()
    );
    while (isInsideBoard(posX, posY) && posX !== x2 && posY !== y2) {
      for (let i = 0; i < enemyCheckersPoses.length; i++) {
        if (
          enemyCheckersPoses[i].x === posX &&
          enemyCheckersPoses[i].y === posY
        ) {
          const beatenChecker = this.checkers[enemyTeam][i];
          this.checkers[enemyTeam] = this.checkers[enemyTeam].filter(
            (checker) => checker !== beatenChecker
          );
          beatenChecker?.destroy();
          return beatenChecker;
        }
      }
    }
    return null;
  }

  getBoardMatrix() {
    const boardMatrix = new Array(8)
      .fill(null)
      .map(() => new Array(8).fill(null));
    this.checkers[CHECKER_TEAMS.lite].forEach((checker) => {
      const pos = checker.getPos();
      boardMatrix[pos.x][pos.y] = CHECKER_COLORS.lite;
    });
    this.checkers[CHECKER_TEAMS.dark].forEach((checker) => {
      const pos = checker.getPos();
      boardMatrix[pos.x][pos.y] = CHECKER_COLORS.dark;
    });
    return boardMatrix;
  }

  getAllAvailableCheckersAndCells(checkers, boardMatrix) {
    const checkersWhoCaMove = [];
    const checkersWhoCanBeat = [];
    for (let i = 0; i < checkers.length; i++) {
      if (!checkersWhoCanBeat.length) {
        const availableMoves = checkers[i].getAvailableMoves(boardMatrix);
        availableMoves.length &&
          checkersWhoCaMove.push({
            checker: checkers[i],
            cellPoses: availableMoves,
          });
      }
      const availableBeats = checkers[i].getAvailableBeats(boardMatrix);
      availableBeats.length &&
        checkersWhoCanBeat.push({
          checker: checkers[i],
          cellPoses: availableBeats,
        });
    }
    if (!checkersWhoCanBeat.length) {
      return checkersWhoCaMove;
    }
    return checkersWhoCanBeat;
  }

  markCell(x, y) {
    const marker = this.markerPool.get();
    this.markers.push(marker);
    marker.setPos(y, x);
    marker.show();
  }

  clearAllMarkers() {
    for (let i = this.markers.length; i > 0; i--) {
      const marker = this.markers.pop();
      marker.hide();
      this.markerPool.put(marker);
    }
  }

  clearAllSelections(checkers) {
    for (let i = 0; i < checkers.length; i++) {
      checkers[i].unselect();
    }
  }
}
