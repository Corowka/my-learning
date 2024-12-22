import { Scene } from "phaser"

import { createBoard } from "../checkers/board/create-board"
import { drawBoard } from "../checkers/board/draw-board"
import { resetBoard } from "../checkers/board/reset-board"
import { Board, Team } from "../checkers/types"
import { getSceneSizes } from "../utils/get-scene-sizes"

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    msg_text: Phaser.GameObjects.Text
    board: Board
    team: Team

    constructor() {
        super("Game")
        this.board = createBoard()
        this.team = Math.random() > 0.5 ? "LITE" : "DARK"
    }

    create() {
        const { width, height } = getSceneSizes(this)
        const padding = 100
        const x = padding
        const y = padding
        const boardSize = height - 2 * padding

        this.camera = this.cameras.main
        resetBoard(this.board, this.team)
        drawBoard(this.board, this.team, this, x, y, boardSize, boardSize)
    }
}
