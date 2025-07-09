import { gameEvents } from '../engine/event';
import { Ball } from './ball-manager';

interface IConstructor {
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number,
  justifyCenter?: boolean
}

export class LoseLine {
  scene: Phaser.Scene
  line: Phaser.GameObjects.Rectangle
  collider: MatterJS.BodyType

  width: number
  height: number

  interactionStartTime: number = 0
  isInteract: boolean = false
  justifyCenter: boolean = false

  constructor({
    scene,
    x,
    y,
    width,
    height,
    justifyCenter
  }: IConstructor
  ) {
    this.scene = scene
    this.width = width
    this.height = height

    this.line = scene.add.rectangle(x, y, width, height, 0xff0000);
    this.line.setOrigin(0, 0);
    this.line.setData("obj", this)

    justifyCenter && this.setJustifyCenter()
  };

  setJustifyCenter() {
    this.justifyCenter = true
    this.line.setPosition((this.scene.scale.width - this.width) / 2, this.line.y)
  }

  setPosition(x?: number, y?: number) {
    this.line.setPosition(x ?? this.line.x, y ?? this.line.y)
  }

  setSize(width?: number, height?: number) {
    this.width = width ?? this.width
    this.height = height ?? this.height
    this.line.setDisplaySize(this.width, this.height)
  }

  isLoseLine() { return true }

  isBallInteractLoseLine(balls: Ball[]) {
    const h = this.line.y + this.line.height / 2
    for (const ball of balls) {
      const r = ball.getRadius()
      const { y } = ball.getPosition()
      if (y - r <= h) {
        return true
      }
    }
    return false
  }

  startInteraction() {
    if (this.isInteract) return
    this.isInteract = true
    this.interactionStartTime = this.scene.time.now
    gameEvents.listenerCount('SET_MESSAGE_TEXT') && gameEvents.emit('SET_MESSAGE_TEXT', "");
  }

  updateInteraction() {
    if (!this.isInteract) return;
    const duration = this.scene.time.now - this.interactionStartTime;
    if (duration > 5000) this.scene.scene.start('GameOver');
    if (duration > 4000 && duration < 5000) gameEvents.listenerCount('SET_MESSAGE_TEXT') && gameEvents.emit('SET_MESSAGE_TEXT', "Игра закончена");
    if (duration > 3000 && duration < 4000) gameEvents.listenerCount('SET_MESSAGE_TEXT') && gameEvents.emit('SET_MESSAGE_TEXT', "3");
    if (duration > 2000 && duration < 3000) gameEvents.listenerCount('SET_MESSAGE_TEXT') && gameEvents.emit('SET_MESSAGE_TEXT', "2");
    if (duration > 1000 && duration < 2000) gameEvents.listenerCount('SET_MESSAGE_TEXT') && gameEvents.emit('SET_MESSAGE_TEXT', "1");
    if (duration < 1000) gameEvents.listenerCount('SET_MESSAGE_TEXT') && gameEvents.emit('SET_MESSAGE_TEXT', "");
  }

  endInteraction() {
    if (!this.isInteract) return
    this.isInteract = false
    gameEvents.listenerCount('SET_MESSAGE_TEXT') && gameEvents.emit('SET_MESSAGE_TEXT', "");
  }

  update(balls: Ball[]) {
    const action = this.isBallInteractLoseLine(balls)
    if (action) this.startInteraction()
    this.updateInteraction()
    if (!action) this.endInteraction()
  }
}
