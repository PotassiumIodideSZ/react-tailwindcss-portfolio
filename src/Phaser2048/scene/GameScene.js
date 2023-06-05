import Phaser from "phaser";
import GameStart, {moveDuration} from "./GameStart.js";
import { moveTiles } from "./TilesMoves.js";
import { updateTileStyle } from "./TileStyle.js";

const GameStartClass = new GameStart();

export class GameSceneClass extends Phaser.Scene {
  constructor() {
    super("GameScene");
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

    // Set the value of the tile at the chosen position to a random value (2 or 4)
    const tile = this.board[i][j];
    tile.value = Math.random() < 0.9 ? 2 : 4;
    tile.text.setText(tile.value);
    updateTileStyle(tile, this);
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffffff"); // Set background color to white
  }

  init() {
    GameStartClass.gameInit(this);

    let canMove = true; // flag variable to indicate if a move is allowed

    function moveTilesWrapper(x, y, scene) {
      if (canMove) {
        moveTiles(x, y, scene);
        canMove = false;
        setTimeout(() => {
          canMove = true;
        }, moveDuration); // set flag to true after 0.3 seconds
      }
    }
    //Keyboard
    const cursors = this.input.keyboard.createCursorKeys();
    cursors.left.on("down", () => {
      moveTilesWrapper(-1, 0, this);
    });
    
    cursors.right.on("down", () => {
      moveTilesWrapper(1, 0, this);
    });
    
    cursors.up.on("down", () => {
      moveTilesWrapper(0, -1, this);
    });
    
    cursors.down.on("down", () => {
      moveTilesWrapper(0, 1, this);
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
        // horizontal
        moveTilesWrapper(Math.sign(deltaX), 0, this);
      } else {
        // vertical
        moveTilesWrapper(0, Math.sign(deltaY), this);
      }
    });
  }
}
