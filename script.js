const gameBoardFactory = (numTiles) => {
  const _board = [...Array(numTiles)].map(() => Array(numTiles));

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

  return {
    getBoard,
    placePiece,
    tileOccupied
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

  _startGameButton.addEventListener('click', () => {
    _startScreen.classList.add('hide');
    _game.classList.remove('hide');
  });

  const setTileEventListener = (func) => {
    _tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        func({row: `${tile.getAttribute('data-row')}`, col: `${tile.getAttribute('data-col')}`});
      });
    });
  } 

  const setTilePiece = (piece, location) => {
    const _tile = document.querySelector(`.tile[data-row="${location.row}"][data-col="${location.col}"]`);
    _tile.textContent = piece;
  }

  const setCurrentTurnName = (name) => {
    _currentTurnName.textContent = `${name}'s turn`;
  }

  const getPlayer1Name = () => {
    return _player1Name;
  }

  const getPlayer2Name = () => {
    return _player2Name;
  }

  return {
    setTilePiece,
    setTileEventListener,
    setCurrentTurnName,
    getPlayer1Name,
    getPlayer2Name
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
  }
  const setName = (name) => {
    _name = name;
  }
  return {
    getName,
    setName,
    getPiece
  };
};

const player1 = playerFactory("", "x");
const player2 = playerFactory("", "o");

const gameBoard = gameBoardFactory(3);

const game = ((gameBoard, dom, players) => {
  const _gameboard = gameBoard;
  const _dom = dom;
  const _players = players;
  let _currentPlayer = 0;

  console.log(players);

  _dom.setTileEventListener((location) => {
    console.log(location);
    if (!_gameboard.tileOccupied(location)) {
      _gameboard.placePiece(_players[_currentPlayer].getPiece(), location);
      _dom.setTilePiece(_players[_currentPlayer].getPiece(), location);
      
      console.log(_checkWin(_players[_currentPlayer].getPiece()));
      console.log(_gameboard.getBoard());
      _nextPlayer();
      dom.setCurrentTurnName(_players[_currentPlayer].getName());
    }
  });

  const _nextPlayer = () => {
    _currentPlayer = (_currentPlayer + 1) % _players.length;
  }

  const play = () => {
    _players[0].setName(dom.getPlayer1Name().value);
    _players[1].setName(dom.getPlayer2Name().value);
    dom.setCurrentTurnName(_players[_currentPlayer].getName());
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

  return {
    play
  };

})(gameBoard, dom, [player1, player2]);

game.play();
