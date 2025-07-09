import { gameEvents } from "../engine/event";

interface IConstructor {
  scene: Phaser.Scene
  x?: number,
  y?: number,
  text?: string
  maxWidth?: number
  justifyCenter?: boolean
  alignCenter?: boolean
}

export class MessageText {
  scene: Phaser.Scene
  maxWidth: number
  textComponent: Phaser.GameObjects.Text

  constructor({
    scene,
    x = 0,
    y = 0,
    text = "",
    maxWidth = 800,
    justifyCenter = false,
    alignCenter = false
  }: IConstructor) {
    this.scene = scene
    this.maxWidth = maxWidth
    const textComponent = scene.add.text(x, y, text, {
      font: '48px Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      wordWrap: { width: maxWidth }
    })
    textComponent.setOrigin(0.5).setDepth(100)
    this.textComponent = textComponent;

    justifyCenter && this.setJustifyCenter()
    alignCenter && this.setAlignCenter()

    gameEvents.on('SET_MESSAGE_TEXT', this.setText.bind(this));
  }

  setText(text: string) {
    this.textComponent.setText(text)
  }

  setJustifyCenter() {
    this.textComponent.setPosition(this.scene.scale.width / 2, this.textComponent.y)
  }

  setAlignCenter() {
    this.textComponent.setPosition(this.textComponent.x, this.scene.scale.height / 2 - 16)
  }

  setMaxWidth(maxWidth: number) {
    this.maxWidth = maxWidth || this.maxWidth
    this.textComponent.setWordWrapWidth(this.maxWidth)
  }

  setDepth(depth: number) {
    this.textComponent.setDepth(depth)
  }

  destroy() {
    gameEvents.removeAllListeners('SET_MESSAGE_TEXT');
  }
}