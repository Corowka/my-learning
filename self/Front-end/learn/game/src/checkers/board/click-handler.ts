import { StreamOptions } from "stream"

import { Board, Cell, Team } from "../types"
import { getAvailableBeats, getAvailableMoves, getAvailableSelections, getFriends } from "./checker-move"

export const clickHandler = (board: Board, team: Team, x: number, y: number) => {
  // unmark
  const marked: (Cell | null)[] = ["MOVE_LITE_CELL", "MOVE_LITE_QUEEN_CELL", "MOVE_DARK_CELL", "MOVE_DARK_QUEEN_CELL"]
  for (let i = 0; i < board.field.length; i++) {
    for (let j = 0; j < board.field[i].length; j++) {
      if (marked.includes(board.field[i][j])) {
        board.field[i][j] = null
      }
    }
  }

  if (board.selectedCell !== null) {

    // unselect
    switch (board.field[board.selectedCell.x][board.selectedCell.y]) {
      case "SELECTED_LITE": board.field[board.selectedCell.x][board.selectedCell.y] = "LITE"; break
      case "SELECTED_DARK": board.field[board.selectedCell.x][board.selectedCell.y] = "DARK"; break
      case "SELECTED_LITE_QUEEN": board.field[board.selectedCell.x][board.selectedCell.y] = "LITE_QUEEN"; break
      case "SELECTED_DARK_QUEEN": board.field[board.selectedCell.x][board.selectedCell.y] = "DARK_QUEEN"; break
      default:
    }

    const friends = getFriends(team)
    if (board.selectedCell.x === x && board.selectedCell.y === y || !friends.includes(board.field[x][y])) {
      board.selectedCell = null
      return
    }
  }

  const availableSelections = getAvailableSelections(board, team)
  if (!availableSelections.some(pos => pos.x === x && pos.y === y)) {
    return
  }

  if (board.selectedCell === null) {
    // select
    switch (board.field[x][y]) {
      case "LITE":
        board.field[x][y] = "SELECTED_LITE"
        break
      case "DARK":
        board.field[x][y] = "SELECTED_DARK"
        break
      case "LITE_QUEEN":
        board.field[x][y] = "SELECTED_LITE_QUEEN"
        break
      case "DARK_QUEEN":
        board.field[x][y] = "SELECTED_DARK_QUEEN"
        break
      default:
    }
    board.selectedCell = { x, y }
  } else {

    // select again
    switch (board.field[x][y]) {
      case "LITE":
        board.field[x][y] = "SELECTED_LITE"
        board.selectedCell = { x, y }
        break
      case "DARK":
        board.field[x][y] = "SELECTED_DARK"
        board.selectedCell = { x, y }
        break
      case "LITE_QUEEN":
        board.field[x][y] = "SELECTED_LITE_QUEEN"
        board.selectedCell = { x, y }
        break
      case "DARK_QUEEN":
        board.field[x][y] = "SELECTED_DARK_QUEEN"
        board.selectedCell = { x, y }
        break
      default:
    }
  }

  // mark
  const availableMoves = getAvailableMoves(board, team, x, y)
  const availableBeats = getAvailableBeats(board, team, x, y)
  if (availableBeats.length) {

    // beats
    for (const beatPos of availableBeats) {
      switch (board.field[x][y]) {
        case "SELECTED_LITE":
          board.field[beatPos.x][beatPos.y] = "MOVE_LITE_CELL"
          break
        case "SELECTED_LITE_QUEEN":
          board.field[beatPos.x][beatPos.y] = "MOVE_LITE_QUEEN_CELL"
          break
        case "SELECTED_DARK":
          board.field[beatPos.x][beatPos.y] = "MOVE_DARK_CELL"
          break
        case "SELECTED_DARK_QUEEN":
          board.field[beatPos.x][beatPos.y] = "MOVE_DARK_QUEEN_CELL"
          break
        default:
      }
    }
  } else {

    // moves
    for (const movePos of availableMoves) {
      switch (board.field[x][y]) {
        case "SELECTED_LITE":
          board.field[movePos.x][movePos.y] = "MOVE_LITE_CELL"
          break
        case "SELECTED_LITE_QUEEN":
          board.field[movePos.x][movePos.y] = "MOVE_LITE_QUEEN_CELL"
          break
        case "SELECTED_DARK":
          board.field[movePos.x][movePos.y] = "MOVE_DARK_CELL"
          break
        case "SELECTED_DARK_QUEEN":
          board.field[movePos.x][movePos.y] = "MOVE_DARK_QUEEN_CELL"
          break
        default:
      }
    }
  }
}