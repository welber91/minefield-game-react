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

const boardReducer = (state, action) => {
  switch (action.type) {
    case "CLICK":
      return clickHandler(state, action.x, action.y);
    case "RIGHT_CLICK":
      return rightClickHandler(state, action.x, action.y);
    default:
      return state;
  }
};

export default boardReducer;
