import Phaser from "phaser";
import { gameCreate, moveDuration } from "./GameStart.js";
import { moveTiles } from "./TilesMoves.js";
import { updateTileStyle } from "./TileStyle.js";

export class GameSceneClass extends Phaser.Scene {
  constructor(options) {
    super(options);

    this.canMove = true;
  }

  addNewTile() {
    const emptyPositions = [];
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j].value === 0) {
          emptyPositions.push({ i, j });
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * emptyPositions.length);
    const { i, j } = emptyPositions[randomIndex];

    const tile = this.board[i][j];
    tile.value = Math.random() < 0.9 ? 2 : 4;
    tile.text.setText(tile.value);
    updateTileStyle(tile, this);
  }

  moveTilesWrapper(x, y, scene) {
    if (scene.canMove) {
      moveTiles(x, y, scene);
      scene.canMove = false;
      setTimeout(() => {
        scene.canMove = true;
      }, moveDuration);
    }
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    gameCreate(this);


    
    //Keyboard
    const cursors = this.input.keyboard.createCursorKeys();
    cursors.left.on("down", () => {
      this.moveTilesWrapper(-1, 0, this);
    });

    cursors.right.on("down", () => {
      this.moveTilesWrapper(1, 0, this);
    });

    cursors.up.on("down", () => {
      this.moveTilesWrapper(0, -1, this);
    });

    cursors.down.on("down", () => {
      this.moveTilesWrapper(0, 1, this);
    });

    //Swipes
    const MIN_SWIPE_DISTANCE = 50;

    let swipeStartX, swipeStartY;

    this.input.on("pointerdown", (pointer) => {
      swipeStartX = pointer.x;
      swipeStartY = pointer.y;
    });

    this.input.on("pointerup", (pointer) => {
      const swipeEndX = pointer.x;
      const swipeEndY = pointer.y;

      const deltaX = swipeEndX - swipeStartX;
      const deltaY = swipeEndY - swipeStartY;

      if (
        Math.abs(deltaX) < MIN_SWIPE_DISTANCE &&
        Math.abs(deltaY) < MIN_SWIPE_DISTANCE
      ) {
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        this.moveTilesWrapper(Math.sign(deltaX), 0, this);
      } else {
        this.moveTilesWrapper(0, Math.sign(deltaY), this);
      }
    });
  }
}
