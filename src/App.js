import React, { useReducer } from "react";
import Board from "./components/Board";
import useCreateBoard from "./hooks/useCreateBoard";
import boardReducer from "./reducers/boardReducer";
import BoardContext from "./context/BoardContext";

const App = () => {
  const [board, boardDispatch] = useReducer(
    boardReducer,
    useCreateBoard(10, 10, 10)
  );

  return (
    <BoardContext.Provider value={{ board, boardDispatch }}>
      <div className="App">
        <div className="ui container">
          <Board />
        </div>
      </div>
    </BoardContext.Provider>
  );
};

export default App;
