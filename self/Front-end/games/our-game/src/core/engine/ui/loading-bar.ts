interface IConstructor {
  scene: Phaser.Scene,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  justifyCenter?: boolean
  endEvent?: string
}

export class LoadingBar {
  scene: Phaser.Scene
  bar: Phaser.GameObjects.Rectangle

  width: number
  justifyCenter: boolean = false

  constructor({
    scene,
    x = 0, y = 0,
    width = scene.scale.height / 16 * 9 * 0.7, height = 28,
    justifyCenter = false
  }: IConstructor) {
    this.scene = scene
    this.width = width
    this.bar = scene.add.rectangle(x, y, 4, height, 0xffffff);

    justifyCenter && this.setJustifyCenter()

    scene.load.on('progress', (progress: number) => {
      this.justifyCenter && this.setJustifyCenter()
      this.bar.setDisplaySize(4 + ((width - 4) * progress), this.bar.height);
      this.setPosition(undefined, y)
    });
  }

  setPosition(x?: number, y?: number) {
    this.bar.setPosition(x ?? this.bar.x, y ?? this.bar.y).setOrigin(0)
  }

  setJustifyCenter() {
    this.justifyCenter = true
    this.bar.setPosition((this.scene.scale.width - this.width) / 2, this.bar.y).setOrigin(0);
  }

  remove() {
    this.bar.destroy()
  }
}