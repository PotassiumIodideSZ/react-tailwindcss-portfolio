export function deleteWordFromBoard(board, selected) {
  selected.forEach((tile) => {
    board[tile.row][tile.col] = "";
  });
  board = boardControl(board);

  return board;
}

export function boardControl(board) {
  const boardCopy = [...board];
  let letterArray = {0 : 0, 1 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0, 6 : 0, 7 : 0, 8 : 0, 9 : 0};
  boardCopy.reverse().forEach((row) => {
    const rowIndex = boardCopy.indexOf(row);

    for (let index = 0; index < row.length; index++) {
        const letter = row[index];

        if (letter === "") {
          if (index > -1) {
            letterArray[index] += 1;
          }
        } else {
          if (index > -1 && letterArray[index] > 0) {
            boardCopy[rowIndex - letterArray[index]][index] = boardCopy[rowIndex][index];
            boardCopy[rowIndex][index] = "";
          }
        }
      }

  });
  board = boardCopy.reverse();
  return board;
}

export default boardControl;
