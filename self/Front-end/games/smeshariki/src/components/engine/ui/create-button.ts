export const createButton = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  style: Phaser.Types.GameObjects.Text.TextStyle,
  imageKey: string,
  onClick: () => void
) => {
  const button = scene.add.image(x, y, imageKey)
    .setInteractive()

  const buttonText = scene.add.text(x, y, text, style).setOrigin(0.5);

  button.on('pointerdown', () => {
    const sound = scene.sound.add('click', {
      volume: 1 
    });
    sound.play();
    if (onClick) onClick();
  });


  button.on('pointerover', () => {
    const sound = scene.sound.add('click', {
      volume: 0.1
    });
    sound.play();
    scene.tweens.add({
      targets: [button],
      scale: [1, 1.1],
      duration: 200,
      ease: 'Power2'
    });
    scene.tweens.add({
      targets: [buttonText],
      scale: [1, 1.2],
      duration: 200,
      ease: 'Power2'
    });
  });

  button.on('pointerout', () => {
    scene.tweens.add({
      targets: [button],
      scale: [1.1, 1],
      duration: 200,
      ease: 'Power2'
    });
    scene.tweens.add({
      targets: [buttonText],
      scale: [1.2, 1],
      duration: 200,
      ease: 'Power2'
    });
  });

  return { button, buttonText };
}
