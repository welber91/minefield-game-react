const createBoard = (x, y, bombs) => {
  let board = [];

  //Set Board
  for (let i = 0; i < x; i++) {
    let row = [];
    for (let j = 0; j < y; j++) {
      row.push({ content: 0, clicked: false });
    }
    board.push(row);
  }

  //Set bombs
  do {
    const px = Math.floor(Math.random() * x);
    const py = Math.floor(Math.random() * y);
    if (board[px][py].content === 0) {
      board[px][py].content = "B";
      bombs--;
    }
  } while (bombs > 0);

  //Set count arround bombs
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (board[i][j].content === "B") {
        continue;
      }
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          if (
            board[i + k] &&
            board[i + k][j + l] &&
            board[i + k][j + l].content === "B"
          ) {
            board[i][j].content++;
          }
        }
      }
    }
  }

  return board;
};

const isValidPosition = (board, x, y) => {
  return !(x < 0 || y < 0 || x >= board.length || y >= board[x].length);
};

const clickHandler = (board, x, y) => {
  if (
    !isValidPosition(board, x, y) ||
    board[x][y].clicked ||
    board[x][y].flag
  ) {
    return board;
  }
  if (board[x][y].content === "B") {
    return openAllBombs(board);
  }
  board[x][y].clicked = true;
  board = openAdjacent(board, x, y);
  return [...board];
};

const rightClickHandler = (board, x, y) => {
  if (!isValidPosition(board, x, y) || board[x][y].clicked) {
    return board;
  }
  board[x][y].flag = !board[x][y].flag;
  return [...board];
};

const openAdjacent = (board, x, y) => {
  if (board[x][y].content === 0) {
    board = clickHandler(board, x - 1, y - 1);
    board = clickHandler(board, x - 1, y);
    board = clickHandler(board, x - 1, y + 1);
    board = clickHandler(board, x, y - 1);
    board = clickHandler(board, x, y + 1);
    board = clickHandler(board, x + 1, y - 1);
    board = clickHandler(board, x + 1, y);
    board = clickHandler(board, x + 1, y + 1);
  }
  return board;
};

const openAllBombs = board => {
  board.forEach(row => {
    row.forEach(cell => {
      if (cell.content === "B") {
        cell.clicked = true;
      }
    });
  });
  return [...board];
};

const boardReducer = (state, action) => {
  switch (action.type) {
    case "CLICK":
      return clickHandler(state, action.x, action.y);
    case "RIGHT_CLICK":
      return rightClickHandler(state, action.x, action.y);
    case "OPEN_ALL_BOMBS":
      return openAllBombs(state);
    case "RESTART":
      return createBoard(action.x || 10, action.y || 10, action.bombs || 10);
    default:
      return state;
  }
};

export default boardReducer;
