import { Board } from "../types"

export const createBoard = (): Board => ({
  field: Array.from({ length: 8 }, () => Array(8).fill(null)),
  selectedCell: null,
  move: "LITE",
  liteScore: 0,
  darkScore: 0
})