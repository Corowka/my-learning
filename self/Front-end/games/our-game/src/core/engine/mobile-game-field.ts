interface IConstructor {
  scene: Phaser.Scene
  x?: number
  y?: number
  w?: number
  h?: number
  color?: number
  alpha?: number
  depth?: number
  fullScreen?: boolean
  centered?: boolean
}

export class MobileGameField {
  scene: Phaser.Scene
  field: Phaser.GameObjects.Rectangle
  fullScreen: boolean = false
  centered: boolean = false

  constructor({
    scene,
    x = 0, y = 0, w = 0, h = 0, color = 0x000000, alpha = 0.66,
    depth,
    centered,
    fullScreen
  }: IConstructor) {
    this.scene = scene

    this.field = scene.add.rectangle(x, y, w, h, color, alpha);

    depth && this.setDepth(depth)
    fullScreen && this.setFullScreen()
    centered && this.setPositionCenter()
  }

  setDepth(depth: number) {
    this.field.setDepth(depth)
  }

  setFullScreen() {
    this.fullScreen = true

    const { width: containerWidth, height: containerHeight } = MobileGameField.calcScale(this.scene)

    this.field.setSize(containerWidth, containerHeight)
    this.scene.matter.world.setBounds(this.field.x, this.field.y, containerWidth, containerHeight);
  }

  setPositionCenter() {
    this.centered = true

    const x = (this.scene.scale.width - this.field.width) / 2
    const y = (this.scene.scale.height - this.field.height) / 2

    this.field.setOrigin(0).setPosition(x, y)
    this.scene.matter.world.setBounds(x, y, this.field.width, this.field.height);
  }

  getFieldGameObject() {
    return this.field
  }

  getScale() {
    return {
      top: this.field.y,
      left: this.field.x,
      right: this.field.x + this.field.width,
      bottom: this.field.y + this.field.height,
      x: this.field.x,
      y: this.field.y,
      width: this.field.width,
      height: this.field.height
    }
  }

  static calcScale(scene: Phaser.Scene) {
    const gameWidth = scene.scale.width;
    const gameHeight = scene.scale.height;
    const targetAspectRatio = 9 / 16;

    let containerWidth: number;
    let containerHeight: number;

    if (gameWidth / gameHeight > targetAspectRatio) {
      containerHeight = gameHeight;
      containerWidth = containerHeight * targetAspectRatio;
    } else {
      containerWidth = gameWidth;
      containerHeight = containerWidth / targetAspectRatio;
    }

    return {
      x: scene.scale.width / 2 - containerWidth / 2,
      y: scene.scale.height / 2 - containerHeight / 2,
      width: containerWidth,
      height: containerHeight
    }
  }
}
