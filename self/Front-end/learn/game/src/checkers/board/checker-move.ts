import { Board, Cell, CellPos, Team } from "../types"

const liteTeam: (Cell | null)[] = ["LITE", "LITE_QUEEN", "SELECTED_LITE", "SELECTED_LITE_QUEEN"]
const darkTeam: (Cell | null)[] = ["DARK", "DARK_QUEEN", "SELECTED_DARK", "SELECTED_DARK_QUEEN"]
const checkers: (Cell | null)[] = ["LITE", "DARK", "SELECTED_LITE", "SELECTED_DARK"]
const queenCheckers: (Cell | null)[] = ["LITE_QUEEN", "DARK_QUEEN", "SELECTED_LITE_QUEEN", "SELECTED_DARK_QUEEN"]

export const isInsideBoard = (x: number, y: number) => {
  return (0 <= x && x <= 7) && (0 <= y && y <= 7)
}

export const getEnemies = (cell: Cell | null): (Cell | null)[] => {
  if (cell && liteTeam.includes(cell)) {
    return darkTeam
  }
  return liteTeam
}

export const getFriends = (team: Team): (Cell | null)[] => {
  if (team === "LITE") {
    return liteTeam
  }
  return darkTeam
}

export const getDirectionMove = (board: Board, team: Team, x: number, y: number) => {
  if (board.field[x][y] && liteTeam.includes(board.field[x][y])) {
    if (team === "LITE") {
      return -1
    }
    if (team === "DARK") {
      return 1
    }
  }
  if (board.field[x][y] && darkTeam.includes(board.field[x][y])) {
    if (team === "LITE") {
      return 1
    }
    if (team === "DARK") {
      return -1
    }
  }
  return 0
}

export const getAvailableCheckerMoves = (board: Board, team: Team, x: number, y: number) => {
  const directionMove = getDirectionMove(board, team, x, y)
  const availableMoves: CellPos[] = []
  const tryDiagonalMove = (i: number) => {
    const posX = x + directionMove
    const posY = y + i
    if (isInsideBoard(posX, posY) && !board.field[posX][posY]) {
      availableMoves.push({ x: posX, y: posY })
    }
  }
  tryDiagonalMove(1)
  tryDiagonalMove(-1)
  return availableMoves
}

export const getAvailableCheckerBeats = (board: Board, team: Team, x: number, y: number) => {
  const enemies = getEnemies(board.field[x][y])
  const availableBeats: CellPos[] = [];
  const tryDiagonalBeat = (i: number, j: number) => {
    const posX = x + i * 2
    const posY = y + j * 2
    if (
      isInsideBoard(posX, posY) &&
      !board.field[posX][posY] &&
      enemies.includes(board.field[posX - i][posY - j])
    ) {
      availableBeats.push({ x: posX, y: posY })
    }
  };
  tryDiagonalBeat(1, 1)
  tryDiagonalBeat(1, -1)
  tryDiagonalBeat(-1, 1)
  tryDiagonalBeat(-1, -1)
  return availableBeats
}

export const getAvailableQueenCheckerMoves = (board: Board, team: Team, x: number, y: number) => {
  const availableMoves: CellPos[] = [];
  const tryDiagonalMove = (i: number, j: number) => {
    let posX = x + i
    let posY = y + j
    while (isInsideBoard(posX, posY)) {
      if (board.field[posX][posY]) {
        break
      }
      availableMoves.push({ x: posX, y: posY })
      posX += i
      posY += j
    }
  };
  tryDiagonalMove(1, 1)
  tryDiagonalMove(1, -1)
  tryDiagonalMove(-1, 1)
  tryDiagonalMove(-1, -1)
  return availableMoves
}

export const getAvailableQueenCheckerBeats = (board: Board, team: Team, x: number, y: number) => {
  const enemies = getEnemies(board.field[x][y])
  const availableBeats: CellPos[] = []
  const tryDiagonalBeat = (i: number, j: number) => {
    let isEnemyMet = false;
    let posX = x + i
    let posY = y + j
    while (isInsideBoard(posX, posY)) {
      if (
        !isEnemyMet &&
        enemies.includes(board.field[posX - i][posY - j])
      ) {
        isEnemyMet = true
        posX += i
        posY += j
        continue
      }
      if (isEnemyMet) {
        if (!board.field[posX][posY]) {
          availableBeats.push({ x: posX, y: posY })
        } else {
          return
        }
      }
      posX += i
      posY += j
    }
  };
  tryDiagonalBeat(1, 1)
  tryDiagonalBeat(1, -1)
  tryDiagonalBeat(-1, 1)
  tryDiagonalBeat(-1, -1)
  return availableBeats
}

export const getAvailableMoves = (board: Board, team: Team, x: number, y: number) => {
  let availableMoves: CellPos[] = []
  if (checkers.includes(board.field[x][y])) {
    availableMoves = getAvailableCheckerMoves(board, team, x, y)
  }
  if (queenCheckers.includes(board.field[x][y])) {
    availableMoves = getAvailableQueenCheckerMoves(board, team, x, y)
  }
  return availableMoves
}

export const getAvailableBeats = (board: Board, team: Team, x: number, y: number) => {
  let availableBeats: CellPos[] = []
  if (checkers.includes(board.field[x][y])) {
    availableBeats = getAvailableCheckerBeats(board, team, x, y)
  }
  if (queenCheckers.includes(board.field[x][y])) {
    availableBeats = getAvailableQueenCheckerBeats(board, team, x, y)
  }
  return availableBeats
}

export const getAvailableSelections = (board: Board, team: Team) => {
  const checkersWhoCaMove: CellPos[] = [];
  const checkersWhoCanBeat: CellPos[] = [];
  for (let i = 0; i < board.field.length; i++) {
    for (let j = 0; j < board.field[i].length; j++) {
      const isChecker = checkers.includes(board.field[i][j]) || queenCheckers.includes(board.field[i][j])
      const friends = getFriends(team)
      if (isChecker && friends.includes(board.field[i][j])) {
        if (!checkersWhoCanBeat.length) {
          const availableMoves = getAvailableMoves(board, team, i, j)
          availableMoves.length &&
            checkersWhoCaMove.push({ x: i, y: j });
        }
        const availableBeats = getAvailableBeats(board, team, i, j)
        availableBeats.length &&
          checkersWhoCanBeat.push({ x: i, y: j })
      }
    }
  }
  if (!checkersWhoCanBeat.length) {
    return checkersWhoCaMove;
  }
  return checkersWhoCanBeat;
}