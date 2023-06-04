import Phaser from "phaser";
import GameStart from "./GameStart.js";
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

    const cursors = this.input.keyboard.createCursorKeys();
    cursors.left.on("down", () => {
      moveTiles(-1, 0, this);
    });
    cursors.right.on("down", () => {
      moveTiles(1, 0, this);
    });
    cursors.up.on("down", () => {
      moveTiles(0, -1, this);
    });
    cursors.down.on("down", () => {
      moveTiles(0, 1, this);
    });
  }
}
