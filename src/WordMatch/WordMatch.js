// WordMatchingGame.js
import React, { useState, useEffect } from "react";
import "../css/WordMatch.css";
import { prebuiltFields } from "./Levels.js";
import { deleteWordFromBoard } from "./BoardController.js";

const WordMatch = () => {
  // Create an empty 10x10 game board
  const createEmptyBoard = () => {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push("");
      }
      board.push(row);
    }
    return board;
  };
  

  const [board, setBoard] = useState(createEmptyBoard());
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [mouseEvent, setMouseEvent] = useState(null);

  const [selected, setSelected] = useState([]);
  const [startColumn, setStartColumn] = useState(null);
  const [startRow, setStartRow] = useState(null);

  function handleMouseDown(event) {
    setMouseIsDown(true);
    setMouseEvent(event);
    const square = event.target;
    const rowIndex = Number(square.getAttribute("row_index"));
    const colIndex = Number(square.getAttribute("col_index"));
    setStartColumn(colIndex);
    setStartRow(rowIndex);
  }

  useEffect(() => {
    if (mouseIsDown && mouseEvent) {
      handleSquareClick(mouseEvent);
    }
  }, [mouseIsDown, mouseEvent]);

  function handleMouseUp() {
    console.log(prebuiltFields, levelsInfo);
    setMouseIsDown(false);
    setStartColumn(null);
    setStartRow(null);
    setSelected([]);
    let word = "";
    selected.forEach((square) => {
      const squareId = square.id;
      const squareElement = document.getElementById(squareId);
      squareElement.classList.remove("selected");
      word += square.letter;
    });

    const index = wordList.indexOf(word);

    if (index !== -1) {
      // The word was found, so remove it from the array
      wordList.splice(index, 1);
      setBoard(deleteWordFromBoard(board, selected));
      if (wordList.length === 0) handleNextLevel();
    } else {
    }
  }

  function handleSquareClick(event) {
    if (!mouseIsDown) return;

    const square = event.target;
    const rowIndex = Number(square.getAttribute("row_index"));
    const colIndex = Number(square.getAttribute("col_index"));

    if (rowIndex === startRow || colIndex === startColumn) {
      const lastSelected = selected[selected.length - 1];
      const isSelected = selected.some((sq) => sq.id === square.id);
      if (
        !isSelected &&
        (!selected[0] ||
          (Math.abs(rowIndex - lastSelected.row) === 1 &&
            colIndex === lastSelected.col) ||
          (Math.abs(colIndex - lastSelected.col) === 1 &&
            rowIndex === lastSelected.row))
      ) {
        setSelected([
          ...selected,
          {
            row: rowIndex,
            col: colIndex,
            id: square.id,
            letter: board[rowIndex][colIndex],
          },
        ]);
        square.classList.add("selected");
      }
    }
  }

  const [level, setLevel] = useState(0);
  const [wordList, setWordList] = useState([]);
  const [levelsInfo, setLevelsInfo] = useState(JSON.parse(JSON.stringify(prebuiltFields[level])));

  useEffect(() => {
    console.log(levelsInfo, prebuiltFields, level);
    setBoard(levelsInfo.level);
    setWordList(levelsInfo.wordList)
  }, [levelsInfo]);

  const handleNextLevel = () => {
     let curlevel = level + 1;

    if (curlevel >= prebuiltFields.length) {
      setLevel(0);
      curlevel = 0;
    }
    else setLevel(curlevel);
    setLevelsInfo(prebuiltFields[curlevel]);
  };

  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div className="row">
          {row.map((letter, colIndex) => (
            <div
              className="square"
              id={`square${rowIndex}/${colIndex}`}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleSquareClick}
              onMouseUp={handleMouseUp}
              row_index={rowIndex}
              col_index={colIndex}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordMatch;
