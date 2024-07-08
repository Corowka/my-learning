import Phaser from "phaser";
import { CHECKER_SCENE } from "../utils/scene-constants";
import { CheckerBoard } from "../modules/classes/checkers/checker-board";

import liteCheckerImage from "/assets/images/lite-checker.png";
import darkCheckerImage from "/assets/images/dark-checker.png";
import liteCellImage from "/assets/images/lite-cell.png";
import darkCellImage from "/assets/images/dark-cell.png";
import dormitoryBlurImage from "/assets/images/dormitory-blur.png";
import queenImage from "/assets/images/queen.png";
import markerImage from "/assets/images/marker.png";
import { CheckerGameState } from "../modules/classes/checkers/checker-game-state";

export class CheckerScene extends Phaser.Scene {
  constructor() {
    super("CheckerScene");
  }

  preload() {
    this.load.image(CHECKER_SCENE.liteChecker, liteCheckerImage);
    this.load.image(CHECKER_SCENE.darkChecker, darkCheckerImage);
    this.load.image(CHECKER_SCENE.liteCell, liteCellImage);
    this.load.image(CHECKER_SCENE.darkCell, darkCellImage);
    this.load.image(CHECKER_SCENE.dormitoryBlur, dormitoryBlurImage);
    this.load.image(CHECKER_SCENE.queen, queenImage);
    this.load.image(CHECKER_SCENE.marker, markerImage);
  }

  create() {
    const sceneWidth = this.cameras.main.width;
    const sceneHeight = this.cameras.main.height;

    const dormitorySpriteSourceImage = this.textures
      .get(CHECKER_SCENE.dormitoryBlur)
      .getSourceImage(CHECKER_SCENE.dormitoryBlur);
    const dormitoryScale = Math.max(
      sceneWidth / dormitorySpriteSourceImage.width,
      sceneHeight / dormitorySpriteSourceImage.height
    );

    this.add
      .image(sceneWidth / 2, sceneHeight / 2, CHECKER_SCENE.dormitoryBlur)
      .setScale(dormitoryScale);

    const outCheckerBoardPadding = sceneHeight / 20;
    const checkerBoardSize = sceneHeight - outCheckerBoardPadding * 2;
    const checkerBoardPos = outCheckerBoardPadding + checkerBoardSize / 2;

    this.gameState = new CheckerGameState();

    this.checkerBoard = new CheckerBoard(
      this,
      this.gameState,
      checkerBoardPos,
      checkerBoardPos,
      checkerBoardSize
    );
  }
}
