import React, { useReducer, useEffect } from "react";
import Board from "./components/Board";
import Status from "./components/Status";
import boardReducer from "./reducers/boardReducer";
import gameReducer from "./reducers/gameReducer";
import BoardContext from "./context/BoardContext";

const App = () => {
  const [board, boardDispatch] = useReducer(boardReducer, [[]]);
  const [gameState, gameDispatch] = useReducer(gameReducer, {});

  useEffect(() => {
    boardDispatch({ type: "RESTART" });
  }, []);

  useEffect(() => {
    gameDispatch({ type: "EVALUATE_BOARD", board });
  }, [board]);

  return (
    <BoardContext.Provider value={{ board, boardDispatch, gameState }}>
      <div className="App">
        <div className="container" style={{ marginTop: 40 }}>
          <Status />
          <Board />
        </div>
      </div>
    </BoardContext.Provider>
  );
};

export default App;
