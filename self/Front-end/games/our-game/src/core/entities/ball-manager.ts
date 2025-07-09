import { gameEvents } from "../engine/event"

export const ball0 = { radius: 0.05, imageId: "ball-0", size: 0, score: 0, color: "#989FD3" }
export const ball1 = { radius: 0.075, imageId: "ball-1", size: 1, score: 2, color: "#F7A986" }
export const ball2 = { radius: 0.11, imageId: "ball-2", size: 2, score: 4, color: "#2CEEC8" }
export const ball3 = { radius: 0.145, imageId: "ball-3", size: 3, score: 8, color: "#E03833" }
export const ball4 = { radius: 0.19, imageId: "ball-4", size: 4, score: 16, color: "#F37E9E" }
export const ball5 = { radius: 0.245, imageId: "ball-5", size: 5, score: 32, color: "#9B66C4" }
export const ball6 = { radius: 0.3, imageId: "ball-6", size: 6, score: 64, color: "#900414" }
export const ball7 = { radius: 0.365, imageId: "ball-7", size: 7, score: 128, color: "#1024A3" }
export const ball8 = { radius: 0.44, imageId: "ball-8", size: 8, score: 256, color: "#EBC36E" }
export const ball9 = { radius: 0.525, imageId: "ball-9", size: 9, score: 512, color: "#98CCDC" }
export const ballsQueue = [ball0, ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9]

interface IConstructorBall {
  scene: Phaser.Scene
  x: number,
  y: number,
  size: number,
  scale: number
  fy: number
}

export class Ball {
  scene: Phaser.Scene
  size: number

  ball: Phaser.Physics.Matter.Sprite
  ballTween: Phaser.Tweens.Tween

  constructor({ scene, x, y, size, scale, fy }: IConstructorBall) {
    this.scene = scene
    this.size = size

    size = Math.min(ballsQueue.length - 1, Math.max(0, size))
    const radius = ballsQueue[size].radius * scale

    this.ball = scene.matter.add.sprite(x, y, ballsQueue[size].imageId, undefined, {
      shape: { type: 'circle' },
      restitution: 0.1,
      friction: 0.1,
      density: 0.01,
    });

    this.ball.setScale(radius);
    this.ball.setData("obj", this)

    const forceMagnitudeVector = { x: 0, y: fy } as Phaser.Math.Vector2;
    this.ball.applyForce(forceMagnitudeVector);

    this.ballTween = scene.tweens.add({
      targets: this.ball,
      scale: [radius / 2, radius],
      duration: 250,
      ease: 'Cubic',
    });

    gameEvents.listenerCount('ADD_SCORE') && gameEvents.emit('ADD_SCORE', ballsQueue[size].score);
  }

  setPosition(x?: number, y?: number) { this.ball.setPosition(x ?? this.ball.x, y ?? this.ball.y) }

  setScale(scale: number) {
    const radius = ballsQueue[this.size].radius * scale
    this.ball.setScale(radius);
  }

  getSize() { return this.size }

  getRadius() { return this.ball.width / 2 * this.ball.scale }

  getPosition() { return { x: this.ball.x, y: this.ball.y } }

  isBall() { return true }

  delete() { this.ballTween.destroy(); this.ball.destroy() }

  static compare(a: Ball, b: Ball) {
    return (a.ball.body as MatterJS.BodyType).id === (b.ball.body as MatterJS.BodyType).id
  }
}

interface IConstructorBallManager {
  scene: Phaser.Scene
  x: number,
  y: number,
  width: number,
  height: number,
  throwTimeout: number
}

export class BallManager {
  scene: Phaser.Scene
  x: number
  y: number
  width: number
  height: number

  throwTimeout: number
  canThrowBall: boolean
  balls: Ball[]
  isBallsMet: boolean[]

  constructor({
    scene,
    x, y,
    width,
    height,
    throwTimeout
  }: IConstructorBallManager) {
    this.scene = scene
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.throwTimeout = throwTimeout
    this.balls = []
    this.canThrowBall = true
    this.isBallsMet = ballsQueue.map(() => false)
  }

  setPosition(x?: number, y?: number) {
    const prevX = this.x
    const prevY = this.y
    this.x = x ?? this.x
    this.y = y ?? this.y

    for (const ball of this.balls) {
      const pos = ball.getPosition()
      const dX = (pos.x - prevX)
      const dY = (pos.y - prevY)
      const newPos = { x: this.x + dX, y: this.y + dY }
      ball.setPosition(newPos.x, newPos.y)
    }
  }

  setSize(width?: number, height?: number) {
    const prevWidth = this.width
    const prevHeight = this.height
    this.width = width ?? this.width
    this.height = height ?? this.height

    for (const ball of this.balls) {
      const pos = ball.getPosition()
      const dX = (pos.x - this.x) / prevWidth * this.width
      const dY = (pos.y - this.y) / prevHeight * this.height
      const newPos = { x: this.x + dX, y: this.y + dY }
      ball.setPosition(newPos.x, newPos.y)
      ball.setScale(this.height / 1080)
    }
  }

  createBall({ x, y, size }: {
    x: number
    y: number
    size: number
  }) {
    const ball = new Ball({
      scene: this.scene,
      x: x <= 1 ? this.x + x * this.width : x,
      y: y <= 1 ? this.y + y * this.height : y,
      size,
      scale: this.height / 1080,
      fy: this.height * 0.0002 * this.height / 1080
    })
    this.balls.push(ball)
  }

  throwBall({ x, y, size }: {
    x: number
    y: number
    size: number
  }) {
    if (!this.canThrowBall) {
      return
    }
    this.canThrowBall = false
    this.createBall({ x, y, size })
    setTimeout(() => { this.canThrowBall = true }, this.throwTimeout)

    if (!this.isBallsMet[0]) {
      this.isBallsMet[0] = true
      gameEvents.listenerCount('SHOW_COMBO_TWEEN') && gameEvents.emit("SHOW_COMBO_TWEEN", 0);
    }
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }

  getSize() {
    return {
      width: this.width,
      height: this.height
    }
  }

  removeBall(a: Ball) {
    this.balls = this.balls.filter((b) => !Ball.compare(a, b))
    a.delete()
  }

  sumBalls(a: Ball, b: Ball) {
    if (a.getSize() !== b.getSize()) {
      return
    }
    const size = a.getSize() + 1
    const posA = a.getPosition()
    const posB = b.getPosition()
    if (!(posA && posB)) {
      return
    }
    const posC = { x: (posA.x + posB.x) / 2, y: (posA.y + posB.y) / 2 }
    this.removeBall(a)
    this.removeBall(b)
    this.createBall({ x: posC.x, y: posC.y, size })

    this.scene.sound.add('merging').play({ volume: 0.8 });

    if (!this.isBallsMet[size]) {
      this.isBallsMet[size] = true
      gameEvents.listenerCount('SHOW_COMBO_TWEEN') && gameEvents.emit("SHOW_COMBO_TWEEN", size);
    }
  }

  getInteractedBalls() {
    const interactedBalls = []
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const rA = this.balls[i].getRadius()
        const posA = this.balls[i].getPosition()
        const rB = this.balls[j].getRadius()
        const posB = this.balls[j].getPosition()
        const d = ((posA.x - posB.x) ** 2 + (posA.y - posB.y) ** 2) ** 0.5
        if (d < rA + rB) {
          interactedBalls.push([this.balls[i], this.balls[j]])
        }
      }
    }
    return interactedBalls
  }

  processInteractedBalls() {
    let pairs = this.getInteractedBalls()
    let sameSizePairs = pairs.filter((p) => p[0].getSize() === p[1].getSize())
    while (sameSizePairs.length) {
      this.sumBalls(sameSizePairs[0][0], sameSizePairs[0][1])
      pairs = this.getInteractedBalls()
      sameSizePairs = pairs.filter((p) => p[0].getSize() === p[1].getSize())
    }
  }

  update() {
    this.processInteractedBalls()
  }

  reset() {
    for (const ball of this.balls) {
      this.removeBall(ball)
    }
  }
}