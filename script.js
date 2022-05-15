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
    const tile = document.querySelector(`div.tile[data-row="${location.row}"][data-col="${location.col}"]`);
    tile.textContent = piece;
  }

  return {
    setTilePiece,
    setTileEventListener
  };
})();

const gameBoard = gameBoardFactory(3);
const game = ((gameBoard, dom) => {
  const _gameboard = gameBoard;
  const _dom = dom;

  _dom.setTileEventListener((location) => {
    console.log(location);
    if (!_gameboard.tileOccupied(location)) {
      _gameboard.placePiece("x", location);
      _dom.setTilePiece("x", location);
    }
    console.log(checkWin("x"));
  });

  const play = () => {
    console.log(_gameboard);
  };
  const checkWin = (piece) => {
    if (_gameboard.getBoard()[0][0] === piece && _gameboard.getBoard()[0][1] === piece && _gameboard.getBoard()[0][2] === piece
      || _gameboard.getBoard()[1][0] === piece && _gameboard.getBoard()[1][1] === piece && _gameboard.getBoard()[1][2] === piece
      || _gameboard.getBoard()[2][0] === piece && _gameboard.getBoard()[2][1] === piece && _gameboard.getBoard()[2][2] === piece
      
      || _gameboard.getBoard()[0][0] === piece && _gameboard.getBoard()[1][0] === piece && _gameboard.getBoard()[2][0] === piece
      || _gameboard.getBoard()[0][1] === piece && _gameboard.getBoard()[1][1] === piece && _gameboard.getBoard()[2][1] === piece
      || _gameboard.getBoard()[0][2] === piece && _gameboard.getBoard()[1][2] === piece && _gameboard.getBoard()[2][2] === piece
      
      || _gameboard.getBoard()[0][0] === piece && _gameboard.getBoard()[1][1] === piece && _gameboard.getBoard()[2][2] === piece
      || _gameboard.getBoard()[2][0] === piece && _gameboard.getBoard()[1][1] === piece && _gameboard.getBoard()[0][2] === piece
      ) {
      return true;
    } else {
      return false;
    }
  };

  return {
    play,
    checkWin
  };
})(gameBoard, dom);

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

game.play();

const player1 = playerFactory("jim", "x");
console.log(player1.getName());