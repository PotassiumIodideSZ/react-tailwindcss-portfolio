import { tileSize, boardSize, moveDuration } from "./GameStart.js";
import { updateVisualTileStyle } from "./TileStyle.js";

export function moveTilesVisually(movedTiles, gameScene) {
  const visualBoardRect = gameScene.add.container(
    gameScene.cameras.main.centerX,
    gameScene.cameras.main.centerY
  );

  movedTiles.forEach(function(tileObj) {
    const tile = tileObj.tile;
    const tileRect = tile.rect;
    const tileText = tile.text;
    const deltaX = tile.x - tileObj.toX;
    const deltaY = tile.y - tileObj.toY;
    tile.rect.fillStyle(0xdbd2c7);
    tile.rect.fillRoundedRect(
      tile.x * tileSize -
        (boardSize * tileSize) / 2 +
        tileSize / 2 -
        (tileSize * 0.9) / 2,
      tile.y * tileSize -
        (boardSize * tileSize) / 2 +
        tileSize / 2 -
        (tileSize * 0.9) / 2,
      tileSize * 0.9,
      tileSize * 0.9,
      16
    );
    tile.text.setText("")

    const newTileRect = gameScene.add.graphics();

    visualBoardRect.add(newTileRect);
    newTileRect.depth = 2;

    // Create a new text object for the tile
    const newTileText = gameScene.add.text(
      tileText.x,
      tileText.y,
      tile.value,
      {}
    );
    visualBoardRect.add(newTileText);
    newTileText.setOrigin(0.5);
    newTileText.depth = 2;

    const visualTile = {
      value: tile.value,
      rect: newTileRect,
      text: newTileText,
      rectX: tileRect.rectX,
      rectY: tileRect.rectY,
    };

    updateVisualTileStyle(visualTile);
    gameScene.tweens.add({
      targets: [visualTile.rect, visualTile.text],
      x: "-=" + tileSize * deltaX, // new x position
      y: "-=" + tileSize * deltaY, // new y position
      duration: moveDuration, // duration of the tween in milliseconds
      ease: "Linear", // easing function
      onComplete: function() {
        // Remove the objects from the game scene when the animation completes
        visualTile.rect.destroy();
        visualTile.text.destroy();
      },
    });
  });
}
