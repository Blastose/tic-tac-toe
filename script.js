const gameBoardFactory = (numTiles) => {
  let _board = [...Array(numTiles)].map(() => Array(numTiles));

  const getBoard = () => {
    return _board;
  };

  const tileOccupied = (location) => {
    if (_board[location.row][location.col] === undefined) {
      return false;
    } else {
      return true;
    }
  };

  const placePiece = (piece, location) => {
    _board[location.row][location.col] = piece;
  };

  const fillBoard = (piece) => {
    for (let i = 0; i < numTiles; i++) {
      for (let j = 0; j < numTiles; j++) {
        if (_board[i][j] === undefined) {
          _board[i][j] = piece;
        }
      }
    }
  };

  const clearBoard = () => {
    _board = [...Array(numTiles)].map(() => Array(numTiles));
  };

  return {
    getBoard,
    placePiece,
    tileOccupied,
    fillBoard,
    clearBoard
  };
};

const dom = (() => {
  const _tiles = document.querySelectorAll('.tile');
  const _startScreen = document.querySelector('.start-screen');
  const _startGameButton = document.querySelector('.start-game');
  const _game = document.querySelector('.game');
  const _currentTurnName = document.querySelector('.current-turn');
  const _player1Name = document.querySelector('#player1-name');
  const _player2Name = document.querySelector('#player2-name');
  const _modal = document.querySelector('.modal');
  const _modalText = document.querySelector('.modal-text');
  const _closeModalButton = document.querySelector('.close-modal');
  const _returnToStartButton = document.querySelector('.return-to-start');
  const _restartGameButton = document.querySelector('.restart-game');

  const setStartGameEventListener = (func) => {
    _startGameButton.addEventListener('click', () => {
      _startScreen.classList.add('hide');
      _game.classList.remove('hide');
      func();
    });
  };

  _closeModalButton.addEventListener('click', () => {
    hideModal();
  });

  _returnToStartButton.addEventListener('click', () => {
    _startScreen.classList.remove('hide');
    _game.classList.add('hide');
  });

  const setRestartGameEventListener = (func) => {
    _restartGameButton.addEventListener('click', () => {
      func();
    });
  };

  const setTileEventListener = (func) => {
    _tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        func({row: `${tile.getAttribute('data-row')}`, col: `${tile.getAttribute('data-col')}`});
      });
    });
  } ;

  const clearAllTiles = () => {
    _tiles.forEach(tile => {
      tile.textContent = "";
    });
  };

  const setTilePiece = (piece, location) => {
    const _tile = document.querySelector(`.tile[data-row="${location.row}"][data-col="${location.col}"]`);
    _tile.textContent = piece;
  };

  const setCurrentTurnText = (text) => {
    _currentTurnName.textContent = text;
  };

  const setCurrentTurnName = (name) => {
    setCurrentTurnText(`${name}'s turn`);
  };

  const getPlayer1Name = () => {
    return _player1Name;
  };

  const getPlayer2Name = () => {
    return _player2Name;
  };

  const showModal = () => {
    _modal.classList.remove('hide');
  };

  const hideModal = () => {
    _modal.classList.add('hide');
  };

  const setModalWinnerText = (text) => {
    _modalText.textContent = text;
  };

  const setModalWinnerName = (name) => {
    setModalWinnerText(`${name} wins!`);
  };

  const setModalDraw = () => {
    _modalText.textContent = "It's a draw!";
  };

  return {
    setStartGameEventListener,
    setTilePiece,
    setTileEventListener,
    clearAllTiles,
    setRestartGameEventListener,
    setCurrentTurnText,
    setCurrentTurnName,
    getPlayer1Name,
    getPlayer2Name,
    showModal,
    hideModal,
    setModalWinnerText,
    setModalWinnerName,
    setModalDraw
  };
})();

const playerFactory = (name, piece) => {
  let _name = name;
  const _piece = piece;
  const getName = () => {
    return _name;
  };
  const getPiece = () => {
    return _piece;
  };
  const setName = (name) => {
    _name = name;
  };
  return {
    getName,
    setName,
    getPiece
  };
};

const player1 = playerFactory("", "X");
const player2 = playerFactory("", "O");

const gameBoard = gameBoardFactory(3);

const game = ((gameBoard, dom, players) => {
  const _gameboard = gameBoard;
  const _dom = dom;
  const _players = players;
  let _currentPlayer = 0;
  let _placedPieces = 0;

  console.log(players);

  _dom.setTileEventListener((location) => {
    console.log(location);
    if (!_gameboard.tileOccupied(location)) {
      _gameboard.placePiece(_players[_currentPlayer].getPiece(), location);
      _dom.setTilePiece(_players[_currentPlayer].getPiece(), location);
      _placedPieces += 1;

      if (_checkWin(_players[_currentPlayer].getPiece())) {
        _gameboard.fillBoard("");
        _dom.setModalWinnerName(_players[_currentPlayer].getName());
        _dom.setCurrentTurnText(`${_players[_currentPlayer].getName()} wins!`);
        _dom.showModal();
      } else if (_placedPieces == 9) {
        _dom.setModalDraw();
        _dom.setCurrentTurnText("It's a draw!");
        _dom.showModal();
      } else {
        console.log(_checkWin(_players[_currentPlayer].getPiece()));
        console.log(_gameboard.getBoard());
        _nextPlayer();
        _dom.setCurrentTurnName(_players[_currentPlayer].getName());
      }
    }
  });


  const _nextPlayer = () => {
    _currentPlayer = (_currentPlayer + 1) % _players.length;
  };

  const play = () => {
    _currentPlayer = 0;
    _placedPieces = 0;
    _players[0].setName(dom.getPlayer1Name().value || "Player 1");
    _players[1].setName(dom.getPlayer2Name().value || "Player 2");
    _gameboard.clearBoard();
    _dom.clearAllTiles();
    _dom.setCurrentTurnName(_players[_currentPlayer].getName());
    console.log(_gameboard.getBoard());
  };

  const _checkWin = (piece) => {
    if ((_gameboard.getBoard()[0][0] === piece && _gameboard.getBoard()[0][1] === piece && _gameboard.getBoard()[0][2] === piece)
      || (_gameboard.getBoard()[1][0] === piece && _gameboard.getBoard()[1][1] === piece && _gameboard.getBoard()[1][2] === piece)
      || (_gameboard.getBoard()[2][0] === piece && _gameboard.getBoard()[2][1] === piece && _gameboard.getBoard()[2][2] === piece)
      
      || (_gameboard.getBoard()[0][0] === piece && _gameboard.getBoard()[1][0] === piece && _gameboard.getBoard()[2][0] === piece)
      || (_gameboard.getBoard()[0][1] === piece && _gameboard.getBoard()[1][1] === piece && _gameboard.getBoard()[2][1] === piece)
      || (_gameboard.getBoard()[0][2] === piece && _gameboard.getBoard()[1][2] === piece && _gameboard.getBoard()[2][2] === piece)
      
      || (_gameboard.getBoard()[0][0] === piece && _gameboard.getBoard()[1][1] === piece && _gameboard.getBoard()[2][2] === piece)
      || (_gameboard.getBoard()[2][0] === piece && _gameboard.getBoard()[1][1] === piece && _gameboard.getBoard()[0][2] === piece)
      ) {
      return true;
    } else {
      return false;
    }
  };

  _dom.setStartGameEventListener(play);

  _dom.setRestartGameEventListener(play);

  return {
    play
  };

})(gameBoard, dom, [player1, player2]);

game.play();
