import { Scene } from 'phaser';
import { createButton } from '../components/engine/ui/create-button';
import { questions } from '../components/quiz';
import { calcResults } from '../components/calc-results';

const colors = [0xc864cf, 0x649dfe, 0x66ff9e, 0xfeff5f, 0xfd9c69, 0x643582, 0x94e2e3, 0xffd3d9, 0xef310b];
const questionPadding = 60

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    questionBackground: Phaser.GameObjects.Image;
    questionText: Phaser.GameObjects.Text;
    answersButtonBackgrounds: Phaser.GameObjects.Image[];
    answersButtonTexts: Phaser.GameObjects.Text[];
    retryBackground: Phaser.GameObjects.Image;
    retryText: Phaser.GameObjects.Text;

    question: number
    answers: string[]

    constructor() {
        super('Game');
    }

    create() {
        this.question = 0;
        this.answersButtonBackgrounds = [];
        this.answersButtonTexts = [];
        this.answers = []

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(colors[this.question % colors.length]);

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

        this.background.setAlpha(0.25);

        this.questionText = this.add.text(screenWidth / 2, screenHeight / 14 * 4.5, 'Текст вопроса', {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: '#fef102',
            stroke: '#0075ee',
            strokeThickness: 8,
            align: 'center',
            wordWrap: {
                width: 800,
                useAdvancedWrap: true,
            },
        }).setOrigin(0.5).setDepth(2);
        this.questionBackground = this.add.image(screenWidth / 2, screenHeight / 14 * 4.5, 'button')
            .setOrigin(0.5)
            .setDepth(1);
        const questionTextWidth = this.questionText.width + questionPadding * 2;
        const questionTextHeight = this.questionText.height + questionPadding * 2;
        this.questionBackground.setDisplaySize(questionTextWidth, questionTextHeight);

        const buttonStyle = {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#fef102',
            stroke: '#0075ee',
            strokeThickness: 8,
            align: 'center',
            wordWrap: {
                width: 320,
                useAdvancedWrap: true,
            },
        }

        let buttonData = createButton(this, screenWidth / 7 * 2, screenHeight / 14 * 9, 'Ответ 1', buttonStyle, 'button', () => { });
        this.answersButtonBackgrounds.push(buttonData.button);
        this.answersButtonTexts.push(buttonData.buttonText);
        buttonData = createButton(this, screenWidth / 7 * 2, screenHeight / 7 * 6, 'Ответ 2', buttonStyle, 'button', () => { });
        this.answersButtonBackgrounds.push(buttonData.button);
        this.answersButtonTexts.push(buttonData.buttonText);
        buttonData = createButton(this, screenWidth / 7 * 5, screenHeight / 14 * 9, 'Ответ 3', buttonStyle, 'button', () => { });
        this.answersButtonBackgrounds.push(buttonData.button);
        this.answersButtonTexts.push(buttonData.buttonText);
        buttonData = createButton(this, screenWidth / 7 * 5, screenHeight / 7 * 6, 'Ответ 4', buttonStyle, 'button', () => { });
        this.answersButtonBackgrounds.push(buttonData.button);
        this.answersButtonTexts.push(buttonData.buttonText);

        for (let i = 0; i < 4; i++) {
            this.answersButtonBackgrounds[i].on('pointerdown', () => {
                this.answers[this.question] = questions[this.question].options[i]
                this.question++
                this.camera.setBackgroundColor(colors[this.question % colors.length]);
            });
        }

        buttonData = createButton(this, screenWidth / 2, screenHeight / 14 * 11, 'Попробовать ещё раз', buttonStyle, 'button', () => {
            this.question = 0;
            this.answers = []
            for (let j = 0; j < 4; j++) {
                this.answersButtonBackgrounds[j].visible = true
                this.answersButtonTexts[j].visible = true
            }
            this.retryBackground.visible = false;
            this.retryText.visible = false;
            this.questionBackground
                .setDisplaySize(questionTextWidth, questionTextHeight)
                .setPosition(screenWidth / 2, screenHeight / 14 * 4.5);
            this.questionText
                .setPosition(screenWidth / 2, screenHeight / 14 * 4.5);
        });

        this.retryBackground = buttonData.button;
        this.retryText = buttonData.buttonText;
        this.retryBackground.visible = false;
        this.retryText.visible = false;
    }

    update() {
        if (this.question === questions.length) {
            const screenWidth = this.scale.width;
            const screenHeight = this.scale.height;
            for (let j = 0; j < 4; j++) {
                this.answersButtonBackgrounds[j].visible = false
                this.answersButtonTexts[j].visible = false
            }
            const { text } = calcResults(this.answers)
            this.questionText.setText(text).setPosition(screenWidth / 2, screenHeight / 2);
            const questionTextWidth = this.questionText.width + questionPadding * 2;
            const questionTextHeight = this.questionText.height + questionPadding * 2;
            this.questionBackground
                .setDisplaySize(questionTextWidth, questionTextHeight)
                .setPosition(screenWidth / 2, screenHeight / 2);
            this.retryBackground.visible = true;
            this.retryText.visible = true;
        } else {
            this.questionText.setText(questions[this.question].question);
            const questionTextWidth = this.questionText.width + questionPadding * 2;
            const questionTextHeight = this.questionText.height + questionPadding * 2;
            this.questionBackground.setDisplaySize(questionTextWidth, questionTextHeight);
            for (let i = 0; i < 4; i++) {
                this.answersButtonTexts[i].setText(questions[this.question].options[i])
            }
        }
    }
}
