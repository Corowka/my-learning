import { gameEvents } from "../engine/event"

interface IConstructor {
  scene: Phaser.Scene
  title?: string
  score?: number
  x?: number
  y?: number
  fontSize?: number
  maxWidth?: number
  justifyCenter?: boolean
  blinking?: boolean
}

export class ScoreBar {
  scene: Phaser.Scene
  text: Phaser.GameObjects.Text
  tween: Phaser.Tweens.Tween

  title: string
  blinking: boolean
  score: number

  constructor({
    scene,
    title = 'Счёт:',
    score = 0,
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
    this.title = title
    this.score = score
    this.text = scene.add.text(x, y, [title, score].join(' '), style)

    justifyCenter && this.setJustifyCenter()
    blinking && this.setBlinking()

    gameEvents.on('ADD_SCORE', this.addScore.bind(this));
  }

  addScore(addition: number) {
    this.score += addition
    this.text.setText([this.title, this.score].join(' '))
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

  stopBlinking() {
    this.blinking = false
    this.tween.destroy()
  }

  getScore() { return this.score }

  reset() {
    this.score = 0
    this.text.setText([this.title, this.score].join(' '))
    this.stopBlinking()
  }

  destroy() {
    gameEvents.removeAllListeners('ADD_SCORE');
  }
}