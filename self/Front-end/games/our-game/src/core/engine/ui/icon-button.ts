
interface IConstructor {
  scene: Phaser.Scene
  iconId: string
  x?: number
  y?: number
  size?: number
  justifyCenter?: boolean
  onclick: () => void
}

export class IconButton {
  scene: Phaser.Scene
  button: Phaser.GameObjects.Image

  justifyCenter = false

  constructor({
    scene,
    iconId,
    x = 0,
    y = 0,
    size = 200,
    justifyCenter = false,
    onclick
  }: IConstructor) {
    this.scene = scene
    this.button = scene.add.image(x, y, iconId)
    this.button.setOrigin(0)
    this.button.setSize(size, size)
    this.button.setDisplaySize(size, size)
    this.button.setInteractive()
    this.button.on("pointerdown", () => onclick())

    justifyCenter && this.setJustifyCenter()
  }

  setPosition(x?: number, y?: number) {
    this.button.setPosition(x ?? this.button.x, y ?? this.button.y)
  }

  setJustifyCenter() {
    this.justifyCenter = true
    this.button.setPosition(this.scene.scale.width / 2 - this.button.width / 2, this.button.y)
  }
}