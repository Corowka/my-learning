
interface IConstructor {
  scene: Phaser.Scene,
  imageId: string
  x?: number
  y?: number
  fullScreen?: boolean
  tone?: number
}

export class BackgroundImage {
  scene: Phaser.Scene
  background: Phaser.GameObjects.Image

  imageId: string
  fullScreen: boolean = false

  constructor({
    scene,
    imageId,
    x = 0, y = 0,
    fullScreen = false,
    tone,
  }: IConstructor) {
    this.scene = scene
    this.imageId = imageId
    this.background = this.scene.add.image(x, y, this.imageId);

    if (fullScreen) {
      this.setFullScreen()
    }

    tone && this.background.setTint(tone)
  }

  setFullScreen() {
    this.fullScreen = true

    const imageWidth = this.background.width
    const imageHeight = this.background.height
    const screenWidth = this.scene.scale.width;
    const screenHeight = this.scene.scale.height;
    const bgAspectRatio = imageWidth / imageHeight;
    const screenAspectRatio = screenWidth / screenHeight;

    if (screenAspectRatio > bgAspectRatio) {
      this.background.setDisplaySize(screenHeight * bgAspectRatio, screenHeight);
    } else {
      this.background.setDisplaySize(screenWidth, screenWidth / bgAspectRatio);
    }
    this.background.setPosition(screenWidth / 2, screenHeight / 2);

    const scale = Math.max(screenWidth / imageWidth, screenHeight / imageHeight);
    this.background.setDisplaySize(imageWidth * scale, imageHeight * scale);
  }

  getBackgroundImage() {
    return this.background
  }
}