import { Board, Team } from "../types"

export const resetBoard = (board: Board, team: Team) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 0) {
        continue
      }
      if (i < 3) {
        board.field[i][j] = team === "DARK" ? "LITE" : "DARK"
        continue
      }
      if (i > 4) {
        board.field[i][j] = team === "DARK" ? "DARK" : "LITE"
      }
    }
  }
  board.selectedCell = null
  board.move = "LITE"
  board.liteScore = 0
  board.darkScore = 0
}