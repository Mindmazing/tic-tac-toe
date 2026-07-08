// TIC TAC TOE by Fredy Villatoro

// game Board Factory Function
const GameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const resetBoard = () => {
    gameBoard.forEach((row) =>
      row.forEach((tile) => {
        tile = "";
      }),
    );
  };

  const placeMark = (xCor, yCor, mark) => {
    board[yCor - 1][xCor - 1] = mark;
  };

  return { getBoard, resetBoard, placeMark };
})();

GameBoard.placeMark(1, 2, "x");
console.log(GameBoard.getBoard());
