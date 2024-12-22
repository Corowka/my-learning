import { Scene } from "phaser"

import { ASSETS } from "../../scenes/Preloader"
import { Board, Team } from "../types"
import { clickHandler } from "./click-handler"

export const drawBoard = (board: Board, team: Team, scene: Scene, x: number, y: number, w: number, h: number) => {

  const outline = 50

  const boardOutline = scene.add.image(x + w / 2, y + h / 2, ASSETS.darkCell).setTint(0xA6B3BF)
  boardOutline.displayWidth = w + 2 * outline
  boardOutline.displayHeight = h + 2 * outline

  const padding = 40

  const boardBackground = scene.add.image(x + w / 2, y + h / 2, ASSETS.darkCell)
  boardBackground.displayWidth = w + 2 * padding
  boardBackground.displayHeight = h + 2 * padding

  const interline = 10

  const boardInterline = scene.add.image(x + w / 2, y + h / 2, ASSETS.liteCell)
  boardInterline.displayWidth = w + 2 * interline
  boardInterline.displayHeight = h + 2 * interline

  const cellWidth = w / 8
  const cellHeight = h / 8

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let cell
      const pos = { x: x + (0.5 + i) * cellWidth, y: y + (0.5 + j) * cellHeight }
      if ((i + j) % 2 === 0) {
        cell = scene.add.image(pos.x, pos.y, ASSETS.liteCell)
      } else {
        cell = scene.add.image(pos.x, pos.y, ASSETS.darkCell)
      }
      cell.displayWidth = cellWidth
      cell.displayHeight = cellHeight
      cell.setInteractive()
      cell.on('pointerdown', () => {
        clickHandler(board, team, j, i)
        drawBoard(board, team, scene, x, y, w, h)
      })
    }
  }

  console.table(board.field)

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (!board.field[i][j]) {
        continue
      }
      let img = ASSETS.liteChecker
      switch (board.field[i][j]) {
        case "MOVE_LITE_CELL": img = ASSETS.moveLiteCell; break
        case "MOVE_DARK_CELL": img = ASSETS.moveDarkCell; break
        case "MOVE_LITE_QUEEN_CELL": img = ASSETS.moveLiteQueenCell; break
        case "MOVE_DARK_QUEEN_CELL": img = ASSETS.moveDarkQueenCell; break
        case "LITE": img = ASSETS.liteChecker; break
        case "DARK": img = ASSETS.darkChecker; break
        case "LITE_QUEEN": img = ASSETS.liteQueenChecker; break
        case "DARK_QUEEN": img = ASSETS.liteQueenChecker; break
        case "SELECTED_LITE": img = ASSETS.selectedLiteChecker; break
        case "SELECTED_DARK": img = ASSETS.selectedDarkChecker; break
        case "SELECTED_LITE_QUEEN": img = ASSETS.selectedLiteQueenChecker; break
        case "SELECTED_DARK_QUEEN": img = ASSETS.selectedLiteQueenChecker; break
        default:
      }
      const pos = { x: x + (0.5 + j) * cellWidth, y: y + (0.5 + i) * cellHeight }
      const checker = scene.add.image(pos.x, pos.y, img)
      checker.displayWidth = cellWidth
      checker.displayHeight = cellHeight
    }
  }
}