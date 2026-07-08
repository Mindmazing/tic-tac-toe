// TIC TAC TOE by Fredy Villatoro

// game Board IIFE
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

  const placeMark = (xCor, yCor, symbol) => {
    board[yCor - 1][xCor - 1] = symbol;
  };

  return { getBoard, resetBoard, placeMark };
})();

// Player Factory Function
function Player(name, symbol) {
  let score = 0;
  const getSymbol = () => symbol;
  const getScore = () => score;
  const increaseScore = () => {
    score++;
  };
  const resetScore = () => {
    score = 0;
  };
  return { name, getSymbol, getScore, increaseScore, resetScore };
}
