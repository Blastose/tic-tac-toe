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
  const tiles = document.querySelectorAll('.tile');

  const setTileEventListener = (func) => {
    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        func({row: `${tile.getAttribute('data-row')}`, col: `${tile.getAttribute('data-col')}`});
      });
    });
  } 

  const setTilePiece = (piece, location) => {
    const tile = document.querySelector(`.tile[data-row="${location.row}"][data-col="${location.col}"]`);
    tile.textContent = piece;
  }

  return {
    setTilePiece,
    setTileEventListener
  };
})();

const playerFactory = (name, piece) => {
  const _name = name;
  const _piece = piece;
  const getName = () => {
    return _name;
  };
  const getPiece = () => {
    return _piece;
  }
  return {
    getName,
    getPiece
  };
};

const player1 = playerFactory("jim", "x");
const player2 = playerFactory("bob", "o");

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
    }
  });

  const _nextPlayer = () => {
    _currentPlayer = (_currentPlayer + 1) % _players.length;
  }

  const play = () => {
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
