export type Board = {
  field: Cell[][],
  selectedCell: CellPos | null,
  move: Team
  liteScore: number
  darkScore: number
}

export type Cell =
  null |
  "MOVE_LITE_CELL" |
  "MOVE_DARK_CELL" |
  "MOVE_LITE_QUEEN_CELL" |
  "MOVE_DARK_QUEEN_CELL" |
  "LITE" |
  "DARK" |
  "LITE_QUEEN" |
  "DARK_QUEEN" |
  "SELECTED_LITE" |
  "SELECTED_DARK" |
  "SELECTED_LITE_QUEEN" |
  "SELECTED_DARK_QUEEN"

export type CellPos = { x: number, y: number }

export type Team = "LITE" | "DARK"