const useCreateBoard = (x, y, bombs) => {
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

export { useCreateBoard as default };
