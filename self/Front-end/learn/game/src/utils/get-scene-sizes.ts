import { Scene } from "phaser"

export const getSceneSizes = (scene: Scene) => {
  return {
    width: scene.game.canvas.width as number,
    height: scene.game.canvas.height as number,
  }
}