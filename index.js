// TIC TAC TOE by Fredy Villatoro

const Game = (() => {
  // game Board IIFE
  const GameBoard = (() => {
    const board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    const getBoard = () => board;

    const boardIsFull = () => {
      let freeSpaces = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            freeSpaces++;
          }
        }
      }
      return freeSpaces === 0;
    };

    const resetBoard = () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          board[i][j] = "";
        }
      }
    };

    const placeMark = (xCor, yCor, symbol) => {
      board[yCor - 1][xCor - 1] = symbol;
    };

    const selectTile = (xCor, yCor) => {
      return board[yCor - 1][xCor - 1];
    };

    return { getBoard, resetBoard, placeMark, selectTile, boardIsFull };
  })();

  // Player Factory Function
  function Player(name, symbol, playerTag) {
    let winner = false;
    let score = 0;
    let tag = playerTag;

    const getTag = () => tag;
    const getSymbol = () => symbol;
    const resetPlayer = () => {
      winner = false;
      score = 0;
    };
    const isWinner = () => winner;
    const setWinner = () => {
      winner = true;
    };

    const increaseScore = () => {
      score++;
    };

    const getScore = () => score;
    return {
      name,
      getSymbol,
      resetPlayer,
      isWinner,
      setWinner,
      increaseScore,
      getTag,
      getScore,
    };
  }

  const GameLogic = (() => {
    let player1;
    let player2;

    let currentPlayer;

    let xCor, yCor;

    const getCurrentPlayer = () => {
      return currentPlayer;
    };

    const setPlayer1 = (name) => {
      player1 = Player(name, "X", "1");
      currentPlayer = player1;
    };
    const setPlayer2 = (name) => {
      player2 = Player(name, "O", "2");
    };

    const getCurrentPlayerCoors = (domXcor, domYcor) => {
      xCor = domXcor;
      yCor = domYcor;
    };

    const placeCurrentPlayerMark = () => {
      GameBoard.placeMark(xCor, yCor, currentPlayer.getSymbol());
    };

    const changeTurn = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const boardIsFull = () => {
      return GameBoard.boardIsFull();
    };

    const playerWon = () => {
      currentPlayer.setWinner();
      currentPlayer.increaseScore();
    };

    const isInvalidTile = () => {
      let tileSelected = GameBoard.selectTile(xCor, yCor);
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
          gameWon = true;
          currentPlayer.setWinner();
          return gameWon;
        }
      }

      return gameWon;
    };

    const rematchGame = () => {
      xCor = null;
      yCor = null;
      currentPlayer = player1;
      GameBoard.resetBoard();
    };

    const restartGameLogic = () => {
      rematchGame();
      player1.resetPlayer();
      player2.resetPlayer();
    };

    return {
      placeCurrentPlayerMark,
      changeTurn,
      boardIsFull,
      isInvalidTile,
      getCurrentPlayerCoors,
      restartGameLogic,
      isGameWon,
      rematchGame,
      setPlayer1,
      setPlayer2,
      getCurrentPlayer,
    };
  })();

  const documentListeners = (() => {
    let playersRegistered = 0;
    // game block wall
    const gameBlockWall = document.querySelector("#players-names-setting");
    const gameWinWall = document.querySelector("#win-display");
    // player 1 name title
    const player1NameTitle = document.querySelector("#player-1 .player-name");
    const player2NameTitle = document.querySelector("#player-2 .player-name");
    // player name form DOM objects
    const player1NameForm = document.querySelector("#player-1 form");
    const player2NameForm = document.querySelector("#player-2 form");
    // player score DOM objects
    const player1Score = document.querySelector("#player-1-score .score");
    const player2Score = document.querySelector("#player-2-score .score");
    // Game board DOM object
    const webGameBoard = document.querySelector(".game-container");
    // reset and rematch buttons
    const resetBtn = document.querySelector("#reset-btn");
    const rematchBtn = document.querySelector("#rematch-btn");

    const setPlayerTitle = (name, playerContainer) => {
      playerContainer.innerText = name;
    };

    const setPlayerScore = (score, playerScoreContainer) => {
      playerScoreContainer.innerText = score;
    };

    const restartWebBoard = () => {
      let tiles = webGameBoard.querySelectorAll(".tile");
      tiles.forEach((tile) => {
        tile.innerText = "";
      });
    };
    player1NameForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let playerName = player1NameForm.querySelector("input").value;
      GameLogic.setPlayer1(playerName);
      setPlayerTitle(playerName, player1NameTitle);
      // hide display
      player1NameForm.style.display = "none";
      playersRegistered++;
      if (playersRegistered === 2) {
        gameBlockWall.style.display = "none";
      }
    });

    player2NameForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let playerName = player2NameForm.querySelector("input").value;
      GameLogic.setPlayer2(playerName);
      setPlayerTitle(playerName, player2NameTitle);
      // hide display
      player2NameForm.style.display = "none";
      playersRegistered++;
      if (playersRegistered === 2) {
        gameBlockWall.style.display = "none";
      }
    });

    resetBtn.addEventListener("click", (event) => {
      GameLogic.restartGameLogic();
      playersRegistered = 0;

      // show display again for player names
      player2NameForm.style.display = "flex";
      player1NameForm.style.display = "flex";

      // set player score to 0
      setPlayerScore("0", player1Score);
      setPlayerScore("0", player2Score);

      // show block wall again
      gameBlockWall.style.display = "flex";
      gameWinWall.style.display = "none";

      // restart rendered board
      restartWebBoard();
    });

    rematchBtn.addEventListener("click", (event) => {
      GameLogic.rematchGame();
      restartWebBoard();
      // hide win wall
      gameWinWall.style.display = "none";
    });

    // event listener for board
    webGameBoard.addEventListener("click", (event) => {
      let tileSelected = event.target;
      let tileXcoor = tileSelected.getAttribute("data-x-coor");
      let tileYcoor = tileSelected.getAttribute("data-y-coor");

      //add tile to GameBoard Object
      GameLogic.getCurrentPlayerCoors(+tileXcoor, tileYcoor);
      if (!GameLogic.isInvalidTile()) {
        GameLogic.placeCurrentPlayerMark();
        tileSelected.innerText = GameLogic.getCurrentPlayer().getSymbol();
        // switch player
        if (!GameLogic.isGameWon()) {
          GameLogic.changeTurn();

          if (GameLogic.boardIsFull()) {
            gameWinWall.style.display = "flex";
            gameWinWall.querySelector("h2").innerText = "Draw";
          }
        } else {
          // Logic after player wins
          GameLogic.getCurrentPlayer().increaseScore();
          let playerTag = GameLogic.getCurrentPlayer().getTag();
          let playerToIncrease =
            playerTag === "1" ? player1Score : player2Score;
          setPlayerScore(
            GameLogic.getCurrentPlayer().getScore(),
            playerToIncrease,
          );
          // show win wall
          gameWinWall.style.display = "flex";
          gameWinWall.querySelector("h2").innerText =
            `${GameLogic.getCurrentPlayer().name} Wins`;
        }

        // check if game tiles are full and game not won
      } else {
      }
    });
  })();
})();
