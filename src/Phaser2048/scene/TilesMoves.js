import { isGameOver } from "./GameOver.js";
import { updateTileStyle } from "./TileStyle.js";
import { updateScore } from "./Score.js";
import { moveTileVisually } from "./VisualBoard.js";

export function isValidPosition(i, j, boardSize) {
  return i >= 0 && i < boardSize && j >= 0 && j < boardSize;
}

function swapTiles(tile1, tile2) {
  const tempValue = tile1.value;
  tile1.value = tile2.value;
  tile2.value = tempValue;
  updateTileStyle(tile1);
  updateTileStyle(tile2);

  tile1.text.setText("");
  tile2.text.setText(tile2.value);
}

function mergeTiles(tile1, tile2, gameScene) {
  tile2.value *= 2;
  tile1.value = 0;
  tile2.merged = true;
  updateTileStyle(tile1);
  updateTileStyle(tile2);
  updateScore(tile2.value, gameScene);

  tile1.text.setText("");
  tile2.text.setText(tile2.value);
}

export function moveTiles(deltaX, deltaY, gameScene) {
  let moved = false;
  for (let i = 0; i < gameScene.boardSize; i++) {
    for (let j = 0; j < gameScene.boardSize; j++) {
      const tile = gameScene.board[i][j];
      tile.merged = false;
    }
  }
  // Determine order in which to iterate over tiles based on movement direction
  const startX = deltaX > 0 ? gameScene.boardSize - 1 : 0;
  const endX = deltaX > 0 ? -1 : gameScene.boardSize;
  const incX = deltaX > 0 ? -1 : 1;
  const startY = deltaY > 0 ? gameScene.boardSize - 1 : 0;
  const endY = deltaY > 0 ? -1 : gameScene.boardSize;
  const incY = deltaY > 0 ? -1 : 1;

  let toBeMoved = [];

  for (let i = startY; i !== endY; i += incY) {
    for (let j = startX; j !== endX; j += incX) {
      const tile = gameScene.board[i][j];
      if (tile.value === 0) {
        continue;
      }
      let nextI = i + deltaY;
      let nextJ = j + deltaX;
      toBeMoved.push({ x: j, y: i });
      while (isValidPosition(nextI, nextJ, gameScene.boardSize)) {
        const nextTile = gameScene.board[nextI][nextJ];
        const curTile = gameScene.board[i][j];

        if (nextTile.value === 0) {
          swapTiles(curTile, nextTile);
          moved = true;
        } else if (
          nextTile.value === curTile.value &&
          curTile.merged === false &&
          nextTile.merged === false
        ) {
          mergeTiles(curTile, nextTile, gameScene);
          moved = true;
          break;
        } else {
          break;
        }

        i += deltaY;
        j += deltaX;
        nextI += deltaY;
        nextJ += deltaX;
      }
    }
  }
  
console.log(toBeMoved);

  if (moved) {
    gameScene.addNewTile();

    isGameOver(gameScene);
  }
}
