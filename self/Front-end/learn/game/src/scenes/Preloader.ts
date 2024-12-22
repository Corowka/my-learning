import { Scene } from "phaser"

export const ASSETS = {
  moveLiteCell: "move_lite_cell",
  moveDarkCell: "move_dark_cell",
  moveLiteQueenCell: "move_lite_queen_cell",
  moveDarkQueenCell: "move_dark_queen_cell",
  liteCell: "lite_cell",
  darkCell: "dark_cell",
  liteChecker: "lite_checker",
  darkChecker: "dark_checker",
  liteQueenChecker: "lite_queen_checker",
  darkQueenChecker: "lite_queen_checker",
  selectedLiteChecker: "selected_lite_checker",
  selectedDarkChecker: "selected_dark_checker",
  selectedLiteQueenChecker: "selected_lite_queen_checker",
  selectedDarkQueenChecker: "selected_dark_queen_checker",
}

export class Preloader extends Scene {
  constructor() {
    super("Preloader")
  }

  init() {
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)
    this.load.on("progress", (progress: number) => {
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    this.load.setPath("assets")
    this.load.image(ASSETS.moveLiteCell, "move_lite_cell.png")
    this.load.image(ASSETS.moveDarkCell, "move_dark_cell.png")
    this.load.image(ASSETS.moveLiteQueenCell, "move_lite_queen_cell.png")
    this.load.image(ASSETS.moveDarkQueenCell, "move_dark_queen_cell.png")
    this.load.image(ASSETS.liteCell, "lite_cell.png")
    this.load.image(ASSETS.darkCell, "dark_cell.png")
    this.load.image(ASSETS.liteChecker, "lite_checker.png")
    this.load.image(ASSETS.darkChecker, "dark_checker.png")
    this.load.image(ASSETS.selectedLiteChecker, "selected_lite_checker.png")
    this.load.image(ASSETS.selectedDarkChecker, "selected_dark_checker.png")
    this.load.image(ASSETS.selectedLiteQueenChecker, "selected_lite_queen_checker.png")
    this.load.image(ASSETS.selectedDarkQueenChecker, "selected_dark_queen_checker.png")
  }

  create() {
    this.scene.start("Game")
  }
}
