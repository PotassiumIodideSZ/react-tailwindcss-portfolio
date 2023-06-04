export const tileSize = 128;
export const boardSize = 4;

export default class GameStart {
  gameInit(gameScene) {
    gameScene.tileSize = tileSize;
    gameScene.boardSize = boardSize;
    gameScene.board = [];

    //Board
    const boardRect = gameScene.add.container(
      gameScene.cameras.main.centerX,
      gameScene.cameras.main.centerY
    );

    const boardpadding = 16;
    const boardBackground = gameScene.add.graphics();
    boardBackground.fillStyle(0xbbada0);
    boardBackground.fillRoundedRect(
      (-gameScene.tileSize * gameScene.boardSize) / 2 - boardpadding,
      (-gameScene.tileSize * gameScene.boardSize) / 2 - boardpadding,
      gameScene.tileSize * gameScene.boardSize + boardpadding * 2,
      gameScene.tileSize * gameScene.boardSize + boardpadding * 2,
      16
    );
    boardBackground.lineStyle(6, 0x9e9e9e);
    boardBackground.strokeRoundedRect(
      (-gameScene.tileSize * gameScene.boardSize) / 2 - boardpadding,
      (-gameScene.tileSize * gameScene.boardSize) / 2 - boardpadding,
      gameScene.tileSize * gameScene.boardSize + boardpadding * 2,
      gameScene.tileSize * gameScene.boardSize + boardpadding * 2,
      16
    );
    boardRect.add(boardBackground);
    boardRect.add(boardBackground);
    //GameOver screen
    const gameOverContainer = gameScene.add.container(
      gameScene.cameras.main.centerX,
      gameScene.cameras.main.centerY
    );

    gameOverContainer.setName("gameOverContainer");
    gameOverContainer.visible = false;
    const gameOverBackground = gameScene.add.rectangle(
      0,
      0,
      gameScene.tileSize * gameScene.boardSize,
      gameScene.tileSize * gameScene.boardSize,
      0x000,
      0.5
    );
    gameOverBackground.setOrigin(0.5);
    gameOverContainer.add(gameOverBackground);

    const gameOverText = gameScene.add.text(0, 0, "GAME OVER", {
      fontSize: "48px",
      fill: "#fff",
    });
    gameOverText.setOrigin(0.5);
    gameOverContainer.add(gameOverText);

    //Score field

    gameScene.score = 0;

    const scoreContainer = gameScene.add.container(
      gameScene.cameras.main.centerX,
      gameScene.cameras.main.centerY - gameScene.tileSize * 3
    );

    const scoreBackground = gameScene.add.graphics();
    scoreBackground.fillStyle(0xdadada);
    scoreBackground.fillRoundedRect(
      -gameScene.tileSize * 1.25,
      -gameScene.tileSize * 0.5,
      gameScene.tileSize * 2.5,
      gameScene.tileSize * 1,
      55
    );
    scoreBackground.lineStyle(6, 0x9e9e9e);
    scoreBackground.strokeRoundedRect(
      -gameScene.tileSize * 1.25,
      -gameScene.tileSize * 0.5,
      gameScene.tileSize * 2.5,
      gameScene.tileSize * 1,
      55
    );
    scoreContainer.add(scoreBackground);

    gameScene.scoreText = gameScene.add.text(0, 0, `СЧЁТ: ${gameScene.score}`, {
      fontSize: "48px",
      fill: "#5d5955",
    });
    gameScene.scoreText.setOrigin(0.5);
    scoreContainer.add(gameScene.scoreText);

    //Board creation

    for (let i = 0; i < gameScene.boardSize; i++) {
      gameScene.board.push([]);
      for (let j = 0; j < gameScene.boardSize; j++) {
        const tileRect = gameScene.add.graphics();
        tileRect.fillStyle(0xdbd2c7);
        tileRect.fillRoundedRect(
          j * gameScene.tileSize -
            (gameScene.boardSize * gameScene.tileSize) / 2 +
            gameScene.tileSize / 2 -
            (gameScene.tileSize * 0.9) / 2,
          i * gameScene.tileSize -
            (gameScene.boardSize * gameScene.tileSize) / 2 +
            gameScene.tileSize / 2 -
            (gameScene.tileSize * 0.9) / 2,
          gameScene.tileSize * 0.9,
          gameScene.tileSize * 0.9,
          16
        );
        boardRect.add(tileRect);

        const tileText = gameScene.add.text(
          j * gameScene.tileSize -
            (gameScene.boardSize * gameScene.tileSize) / 2 +
            gameScene.tileSize / 2,
          i * gameScene.tileSize -
            (gameScene.boardSize * gameScene.tileSize) / 2 +
            gameScene.tileSize / 2,
          "",
          {
            color: "rgb(231, 21, 21)",
            fontSize: `${gameScene.tileSize * 0.7}px`,
          }
        );
        tileText.setOrigin(0.5);
        boardRect.add(tileText);

        gameScene.board[i].push({
          value: 0,
          y: i,
          x: j,
          rect: tileRect,
          text: tileText,
          merged: false,
        });
      }
    }
    gameScene.addNewTile();
    gameScene.addNewTile();
  }
}
