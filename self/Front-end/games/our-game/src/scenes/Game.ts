import { Scene } from 'phaser';
import { ScoreBar } from '../core/entities/score-bar';
import { LoseLine } from '../core/entities/lose-line';
import { MessageText } from '../core/entities/message-text';
import { MobileGameField } from '../core/engine/mobile-game-field';
import { BackgroundImage } from '../core/engine/background-image';
import { BallManager } from '../core/entities/ball-manager';
import { debounce } from '../core/utils/debounce';
import { ComboTween } from '../core/entities/combo-tween';
import { gameEvents } from '../core/engine/event';

export class Game extends Scene {
    field: MobileGameField;
    background: BackgroundImage;
    scoreBar: ScoreBar
    loseLine: LoseLine
    messageText: MessageText
    ballManager: BallManager
    comboTween: ComboTween

    constructor() {
        super('Game');
    }

    create() {
        this.background = new BackgroundImage({
            scene: this,
            imageId: 'background',
            fullScreen: true,
        })
        this.field = new MobileGameField({
            scene: this,
            depth: 0,
            centered: true,
            fullScreen: true,
            color: 0x000,
            alpha: 0.75
        })
        const fieldScale = this.field.getScale()

        this.scoreBar = new ScoreBar({
            scene: this,
            justifyCenter: true,
            y: this.scale.height * 0.05,
            title: "Счёт:",
            score: 0
        })

        const loseLineHeight = 0.2 * fieldScale.height

        this.loseLine = new LoseLine({
            scene: this,
            x: fieldScale.left,
            y: fieldScale.top + loseLineHeight,
            width: fieldScale.width,
            height: 4,
            justifyCenter: true
        })

        this.field.getFieldGameObject().setInteractive().on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.ballManager.throwBall({
                x: (pointer.x - this.field.getScale().left) / this.field.getScale().width,
                y: this.field.getScale().top + this.field.getScale().height * 0.1,
                size: 0
            })
        });

        this.messageText = new MessageText({
            scene: this,
            text: "",
            maxWidth: fieldScale.width * 0.8,
            justifyCenter: true,
            alignCenter: true,
        })
        this.messageText.setDepth(5)

        this.ballManager = new BallManager({
            scene: this,
            x: fieldScale.left,
            y: fieldScale.top,
            width: fieldScale.width,
            height: fieldScale.height,
            throwTimeout: 350
        })

        this.comboTween = new ComboTween({
            scene: this,
            width: fieldScale.width * 0.6,
            y: this.scale.height / 2,
            justifyCenter: true
        })

        this.matter.world.on('collisionstart', (event: any) => {
            event.pairs.forEach((pair: any) => {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;
                const speedA = Math.sqrt(bodyA.velocity.x ** 2 + bodyA.velocity.y ** 2);
                const speedB = Math.sqrt(bodyB.velocity.x ** 2 + bodyB.velocity.y ** 2);
                const maxSpeed = Math.max(speedA, speedB);
                const volume = Phaser.Math.Clamp((maxSpeed / 10) ** 2, 0, 1);
                this.sound.add('collision').play({ volume });
            });
        });

        this.scale.on('resize', debounce(this.handleResizeGame.bind(this), 200), this);
        this.events.on('shutdown', this.shutdown.bind(this));
    }

    private handleResizeGame() {
        this.background.setFullScreen()
        this.field.setFullScreen()
        this.field.setPositionCenter()
        const fieldScale = this.field.getScale()
        this.scoreBar.setJustifyCenter()
        this.scoreBar.setPosition(undefined, fieldScale.top + this.scale.height * 0.05)
        this.ballManager.setPosition(fieldScale.left, fieldScale.top)
        this.ballManager.setSize(fieldScale.width, fieldScale.height)
        this.loseLine.setJustifyCenter()
        this.loseLine.setPosition(fieldScale.left, fieldScale.top + 0.2 * fieldScale.height)
        this.loseLine.setSize(fieldScale.width)
        this.messageText.setJustifyCenter()
        this.messageText.setAlignCenter()
        this.messageText.setMaxWidth(fieldScale.width * 0.8)
        this.comboTween.setJustifyCenter()
        this.comboTween.setPosition(undefined, this.scale.height / 2)
        this.comboTween.setSize(fieldScale.width * 0.6)
    }

    update() {
        this.loseLine.update(this.ballManager.balls)
        this.ballManager.update()
    }

    shutdown() {
        this.comboTween.destroy()
        this.messageText.destroy()
        this.scoreBar.destroy()
    }
}
