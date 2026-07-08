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

  const selectTile = (xCor, yCor) => {
    return board[yCor - 1][xCor - 1];
  };

  return { getBoard, resetBoard, placeMark, selectTile };
})();

// Player Factory Function
function Player(name, symbol) {
  let winner = false;
  const getSymbol = () => symbol;
  const increaseScore = () => {
    score++;
  };
  const resetPlayer = () => {
    winner = false;
  };
  const isWinner = () => winner;
  const setWinner = () => {
    winnner = true;
  };

  return {
    name,
    getSymbol,
    increaseScore,
    resetPlayer,
    isWinner,
    setWinner,
  };
}

// change when setting inputs from DOM
player1 = Player("Fredy", "X");
player2 = Player("Julia", "O");

const GameLogic = (() => {
  let currentPlayer = player1;
  let rounds = 0;
  let xCor, yCor;

  const getCurrentPlayerCoors = () => {
    alert(`Player: ${currentPlayer.name}, your turn`);
    // change when setting inputs from DOM
    xCor = +prompt("xcor");
    yCor = +prompt("ycor");
  };

  const placeCurrentPlayerMark = () => {
    GameBoard.placeMark(xCor, yCor, currentPlayer.getSymbol());
    rounds++;
  };

  const changeTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    rounds++;
  };

  const boardIsFull = () => {
    return rounds === 9;
  };

  const playerWon = () => {
    currentPlayer.setWinner();
  };

  const isInvalidTile = () => {
    let tileSelected = GameBoard.selectTile(xCor, yCor);
    console.log(tileSelected);
    return tileSelected !== "";
  };

  const isGameWon = () => {
    let currentPlayerSymbol = currentPlayer.getSymbol();
    currentPlayer.setWinner();
  };

  const restartGameLogic = () => {
    rounds = 0;
    xCor = null;
    yCor = null;
    currentPlayer = player1;
  };

  return {
    placeCurrentPlayerMark,
    changeTurn,
    boardIsFull,
    isInvalidTile,
    getCurrentPlayerCoors,
    restartGameLogic,
  };
})();
