import { Scene, GameObjects } from 'phaser';
import { createButton } from '../components/engine/ui/create-button';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    buttonText: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'background');
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        const bgAspectRatio = this.background.width / this.background.height;
        const screenAspectRatio = screenWidth / screenHeight;
        if (screenAspectRatio > bgAspectRatio) {
            this.background.setDisplaySize(screenHeight * bgAspectRatio, screenHeight);
        } else {
            this.background.setDisplaySize(screenWidth, screenWidth / bgAspectRatio);
        }
        this.background.setPosition(screenWidth / 2, screenHeight / 2);

        const scale = Math.max(screenWidth / this.background.width, screenHeight / this.background.height);
        this.background.setDisplaySize(this.background.width * scale, this.background.height * scale);

        const buttonStyle = {
            fontFamily: 'Arial Black',
            fontSize: 48,
            color: '#fef102',
            stroke: '#0075ee',
            strokeThickness: 8,
            align: 'center',
        }

        createButton(this, 512, 460, 'Начать', buttonStyle, 'button', () => {
            this.scene.start('Game');
        });
    }
}
