import { gameEvents } from "../engine/event"
import { hex2num } from "../utils/hex2num"
import { ballsQueue } from "./ball-manager"

interface IConstructor {
  scene: Phaser.Scene
  x?: number,
  y?: number,
  justifyCenter?: boolean
  width?: number,
  eventName?: string
}

export class ComboTween {
  scene: Phaser.Scene;
  light: Phaser.GameObjects.Sprite;
  balls: Phaser.GameObjects.Sprite[];

  width: number;
  eventName: string;
  justifyCenter: boolean = false;

  startTween: Phaser.Tweens.Tween;
  endTween: Phaser.Tweens.Tween;

  constructor({
    scene,
    x = 0,
    y = 0,
    width = 800,
    justifyCenter = false,
  }: IConstructor) {
    this.scene = scene;
    this.width = width;
    this.light = scene.add.sprite(x, y, "white-blur");
    this.light.setVisible(false);
    this.light.setDisplaySize(width * 3, width * 3)
    this.balls = ballsQueue.map((b) => {
      const sprite = scene.add.sprite(x, y, b.imageId);
      sprite.setDisplaySize(width, width);
      sprite.setVisible(false);
      return sprite;
    });

    justifyCenter && this.setJustifyCenter();

    gameEvents.on("SHOW_COMBO_TWEEN", this.show.bind(this));
  }

  show(size: number) {
    this.startTween?.destroy()
    this.endTween?.destroy()
    size = Math.max(0, Math.min(ballsQueue.length - 1, size));
    this.light.setTint(hex2num(ballsQueue[size].color));
    this.light.setVisible(true);
    this.balls[size].setVisible(true);
    this.scene.sound.add('new-ball').play({ volume: 0.6 });
    this.startTween = this.scene.tweens.add({
      targets: [this.light, ...this.balls],
      y: [this.light.y + this.scene.scale.height / 8, this.light.y],
      alpha: [0, 1],
      duration: 2000,
      ease: 'Power4',
      onComplete: () => {
        this.endTween = this.scene.tweens.add({
          targets: [this.light, ...this.balls],
          alpha: [1, 0],
          duration: 200,
          ease: 'Linear',
          onComplete: () => {
            this.light.setVisible(false)
            this.balls[size].setVisible(true);
          }
        });
      }
    });
  }

  setJustifyCenter() {
    this.light.setPosition(this.scene.scale.width / 2, this.light.y);
    this.balls.forEach((b) => b.setPosition(this.scene.scale.width / 2, b.y));
  }

  setPosition(x?: number, y?: number) {
    const newX = x || this.balls[0].x
    const newY = y || this.balls[0].y
    this.light.setPosition(newX, newY);
    this.balls.forEach((b) => {
      b.setPosition(newX, newY);
    });
  }

  setSize(width: number) {
    this.width = width
    this.light.setDisplaySize(width * 3, width * 3)
    this.balls.forEach(b => {
      b.setDisplaySize(width, width);
    })
  }

  destroy() {
    gameEvents.removeAllListeners("SHOW_COMBO_TWEEN");
  }
}