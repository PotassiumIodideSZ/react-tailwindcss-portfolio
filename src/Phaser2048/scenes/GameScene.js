import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('myImage', '././assets/Armor.png');
    console.error(123)

    this.load.on('complete', () => {
      console.log('Loading assets...');
    });
  }

  create() {
    console.log('Game started!');
    
  }

  update(time, delta) {
    console.log('Updating game state...');
    
  }
}