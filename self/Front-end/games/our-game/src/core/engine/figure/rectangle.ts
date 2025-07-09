
interface IConstructor {
  scene: Phaser.Scene
  x?: number
  y?: number
  width?: number
  height?: number
  color?: number
  alpha?: number
  justifyCenter?: boolean
}

export class Rectangle {
  scene: Phaser.Scene
  rect: Phaser.GameObjects.Rectangle

  justifyCenter = false

  constructor({
    scene,
    x = 0,
    y = 0,
    width = 800,
    height = 800,
    color = 0x000,
    alpha = 1,
    justifyCenter = false
  }: IConstructor) {
    this.scene = scene
    this.rect = scene.add.rectangle(x, y, width, height, color, alpha);
    this.rect.setOrigin(0)

    justifyCenter && this.setJustifyCenter()
  }

  setJustifyCenter() {
    this.justifyCenter = true
    this.rect.setPosition(this.scene.scale.width / 2 - this.rect.width / 2, this.rect.y)
  }
}