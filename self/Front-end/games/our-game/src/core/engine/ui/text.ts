interface IConstructor {
  scene: Phaser.Scene,
  text: string
  x?: number
  y?: number
  fontSize?: number
  maxWidth?: number
  justifyCenter?: boolean
  blinking?: boolean
}

export class Text {
  scene: Phaser.Scene
  text: Phaser.GameObjects.Text
  tween: Phaser.Tweens.Tween

  blinking: boolean

  constructor({
    scene,
    text,
    x = 0, y = 0,
    fontSize = 32,
    maxWidth = undefined,
    justifyCenter = false,
    blinking = false
  }: IConstructor) {
    const style = {
      font: fontSize + 'px Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      wordWrap: { width: maxWidth }
    }

    this.scene = scene
    this.text = scene.add.text(x, y, text, style)

    justifyCenter && this.setJustifyCenter()
    blinking && this.setBlinking()
  }

  setJustifyCenter() {
    const gameWidth = this.scene.scale.width;
    this.text.setPosition(gameWidth / 2, this.text.y).setOrigin(0.5, 0)
  }

  setPosition(x?: number, y?: number) {
    this.text.setPosition(x ?? this.text.x, y ?? this.text.y)
  }

  setBlinking() {
    this.blinking = true
    this.tween = this.scene.tweens.add({
      targets: this.text,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
  }
}