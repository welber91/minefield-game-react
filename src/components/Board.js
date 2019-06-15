import React, { useContext } from "react";
import Square from "./Square";
import BoardContext from "../context/BoardContext";

const Board = () => {
  const { board } = useContext(BoardContext);
  return (
    <table>
      <tbody>
        {board.map((row, px) => (
          <tr key={`r_${px}`}>
            {row.map((cell, py) => (
              <th key={`c_${px}_${py}`}>
                <Square x={px} y={py} cell={cell} />
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
