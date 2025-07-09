import { Scene } from 'phaser';
import { LoadingBar } from '../core/engine/ui/loading-bar';
import { BackgroundImage } from '../core/engine/background-image';
import { Text } from '../core/engine/ui/text';
import { debounce } from '../core/utils/debounce';

export class Preloader extends Scene {
    background: BackgroundImage;
    loader: LoadingBar
    text: Text

    constructor() {
        super('Preloader');
    }

    init() {
        this.background = new BackgroundImage({
            scene: this,
            imageId: 'preload-background',
            fullScreen: true
        })
        this.loader = new LoadingBar({
            scene: this,
            y: this.scale.height / 4 * 3,
            justifyCenter: true,
        })
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('background', 'h-preload-background.png');
        this.load.image('field', 'field.png');

        this.load.setPath('assets/balls');
        this.load.image('ball-0', 'ball-0.png');
        this.load.image('ball-1', 'ball-1.png');
        this.load.image('ball-2', 'ball-2.png');
        this.load.image('ball-3', 'ball-3.png');
        this.load.image('ball-4', 'ball-4.png');
        this.load.image('ball-5', 'ball-5.png');
        this.load.image('ball-6', 'ball-6.png');
        this.load.image('ball-7', 'ball-7.png');
        this.load.image('ball-8', 'ball-8.png');
        this.load.image('ball-9', 'ball-9.png');

        this.load.setPath('assets/particles');
        this.load.image('white-blur', 'white.png');

        this.load.setPath('assets/ui');
        this.load.image('repeat', 'repeat.png');

        this.load.setPath('assets/audio');
        this.load.audio('background-music', 'background-music.mp3');
        this.load.audio('merging', 'ball-merging.mp3');
        this.load.audio('new-ball', 'new-ball.mp3');
        this.load.audio('collision', 'ball-collision.mp3');
        this.load.audio('game-over', 'game-over.mp3');

        this.scale.on('resize', debounce(() => {
            this.loader.setJustifyCenter()
            this.loader.setPosition(undefined, this.scale.height / 4 * 3)
        }, 200), this);
    }

    create() {
        this.loader.remove()

        const backgroundGameObject = this.background.getBackgroundImage()
        backgroundGameObject.setInteractive()
        backgroundGameObject.on('pointerdown', () => {
            this.scene.start('Game');
            const backgroundMusic = this.sound.add('background-music', {
                loop: true,
                volume: 0.5
            });
            backgroundMusic.play();
        });

        this.text = new Text({
            scene: this,
            text: "Нажмите ПКМ чтобы начать",
            justifyCenter: true,
            blinking: true,
            fontSize: this.scale.height / 32,
            y: this.scale.height / 4 * 3
        })

        this.scale.on('resize', debounce(this.handleResizeGame.bind(this), 200), this);
    }

    private handleResizeGame() {
        this.background.setFullScreen()
        this.text.setJustifyCenter()
        this.text.setPosition(undefined, this.scale.height / 4 * 3)
    }
}
