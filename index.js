// TIC TAC TOE by Fredy Villatoro

// game Board IIFE
const GameBoard = (() => {
  const board = [
    ["X", "", "X"],
    ["X", "", "X"],
    ["", "X", "X"],
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
    let gameWon = true;

    // check first diagonal line
    for (let i = 1; i <= 3; i++) {
      if (GameBoard.selectTile(i, i) !== currentPlayerSymbol) {
        gameWon = false;
        break;
      }
    }
    if (gameWon) {
      console.log("DIAGONAL LINE WIN 1");
      gameWon = true;
      currentPlayer.setWinner();
      return gameWon;
    }

    // check second diagonal line
    gameWon = true;
    let y = 1;
    let x = 3;
    for (let i = 0; i < 3; i++) {
      if (GameBoard.selectTile(x--, y++) !== currentPlayerSymbol) {
        gameWon = false;
        break;
      }
    }
    if (gameWon) {
      console.log("DIAGONAL LINE WIN 1");
      gameWon = true;
      currentPlayer.setWinner();
      return gameWon;
    }

    // check Vertical lines
    for (let i = 1; i <= 3; i++) {
      if (
        GameBoard.selectTile(i, 1) === currentPlayerSymbol &&
        GameBoard.selectTile(i, 2) === currentPlayerSymbol &&
        GameBoard.selectTile(i, 3) === currentPlayerSymbol
      ) {
        console.log("VERTICAL WIN");
        gameWon = true;
        currentPlayer.setWinner();
        return gameWon;
      }
    }
    // check Horizontal lines
    for (let i = 1; i <= 3; i++) {
      if (
        GameBoard.selectTile(1, i) === currentPlayerSymbol &&
        GameBoard.selectTile(2, i) === currentPlayerSymbol &&
        GameBoard.selectTile(3, i) === currentPlayerSymbol
      ) {
        console.log("HORIZONTAL WIN");
        gameWon = true;
        currentPlayer.setWinner();
        return gameWon;
      }
    }

    return gameWon;
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
    isGameWon,
  };
})();
