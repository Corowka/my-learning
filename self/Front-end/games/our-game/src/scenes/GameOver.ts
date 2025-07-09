import { Scene } from 'phaser';
import { BackgroundImage } from '../core/engine/background-image';
import { debounce } from '../core/utils/debounce';
import { Rectangle } from '../core/engine/figure/rectangle';
import { MobileGameField } from '../core/engine/mobile-game-field';
import { IconButton } from '../core/engine/ui/icon-button';
import { Text } from '../core/engine/ui/text';
import { gameEvents } from '../core/engine/event';
import { Game } from './Game';

export class GameOver extends Scene {
    background: BackgroundImage;
    rect: Rectangle
    text: Text
    button: IconButton

    constructor() {
        super('GameOver');
    }

    create() {
        const { width, height } = MobileGameField.calcScale(this)
        this.background = new BackgroundImage({
            scene: this,
            imageId: 'background',
            fullScreen: true,
        })
        this.rect = new Rectangle({
            scene: this, x: 0, y: 0, width, height,
            justifyCenter: true, alpha: 0.66,
        })
        const score = (this.scene.get('Game') as Game)?.scoreBar?.getScore()
        this.text = new Text({
            scene: this,
            text: `Твой счет ${score}`,
            y: height / 2 - width * 0.08 / 2,
            fontSize: width * 0.08,
            maxWidth: width * 0.8,
            justifyCenter: true
        })
        this.button = new IconButton({
            scene: this,
            iconId: "repeat",
            y: height / 3 * 2,
            justifyCenter: true,
            size: width / 8,
            onclick: () => this.scene.start("Game")
        })

        this.sound.add('game-over').play({ volume: 0.8 });
        this.scale.on('resize', debounce(this.handleResizeGame.bind(this), 200), this);
    }

    private handleResizeGame() {
        const { width, height } = MobileGameField.calcScale(this)
        this.background.setFullScreen()
        this.rect.setJustifyCenter()
        this.text.setJustifyCenter()
        this.text.setPosition(undefined, height / 2 - width * 0.08 / 2)
        this.button.setJustifyCenter()
        this.button.setPosition(undefined, height / 3 * 2)
    }
}
