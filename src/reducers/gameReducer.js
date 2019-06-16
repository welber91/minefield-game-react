const evaluateBoard = board => {
  const state = {
    bombs: 0,
    flags: 0,
    leftBombs: 0,
    clicked: 0,
    boardX: board.length,
    boardY: board[0].length,
    gameFinished: false,
    gameResult: "---",
    percent: 0
  };

  board.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell.content === "B") {
        state.bombs++;
        if (cell.clicked) {
          state.gameFinished = true;
          state.gameResult = "LOST";
        }
      }
      if (cell.flag) {
        state.flags++;
      }
      if (cell.clicked && cell.content !== "B") {
        state.clicked++;
      }
    });
  });

  if (state.boardX * state.boardY - state.bombs === state.clicked) {
    state.gameFinished = true;
    state.gameResult = "WIN";
  }
  state.percent = (
    (state.clicked / (state.boardX * state.boardY - state.bombs)) *
    100
  ).toFixed(1);
  state.leftBombs = Math.max(state.bombs - state.flags, 0);
  return state;
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "EVALUATE_BOARD":
      return evaluateBoard(action.board);
    default:
      return state;
  }
};

export default gameReducer;
