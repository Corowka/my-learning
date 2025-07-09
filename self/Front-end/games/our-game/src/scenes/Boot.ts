import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('preload-background', 'assets/h-preload-background.png');
    }

    create() {
        this.scene.start('Preloader');
    }
}
