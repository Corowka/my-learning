import Phaser from "phaser";
import { CheckerScene } from "./scenes/checker-scene";
import { gameConfig } from "./config/game-config";

gameConfig.scene = [CheckerScene];

const game = new Phaser.Game(gameConfig);

window.onload = () => {
  game.scene.start("CheckerScene");
};
