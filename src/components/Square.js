import React, { useContext } from "react";
import BoardContext from "../context/BoardContext";
import "./Square.css";

const Square = ({ x, y, cell }) => {
  const { boardDispatch, gameState } = useContext(BoardContext);
  const { clicked, flag, content } = cell;
  const { gameFinished } = gameState;

  const onRightClick = e => {
    e.preventDefault();
    e.stopPropagation();
    if (gameFinished) return;
    boardDispatch({ type: "RIGHT_CLICK", x, y });
  };

  const onSquareClick = e => {
    if (gameFinished) return;
    boardDispatch({ type: "CLICK", x, y });
  };

  const getClassNames = () => {
    let classes = "square-container ";
    if (clicked) classes += "clicked";
    return classes;
  };

  const renderContent = () => {
    if (clicked && content === "B")
      return (
        <svg class="icon-min">
          <use href="#bomb" />
        </svg>
      );
    if (flag)
      return (
        <svg className="icon-min">
          <use href="#flag" />
        </svg>
      );
    if (clicked && content !== 0 && content !== "B") return content;
    return null;
  };

  return (
    <div
      className={getClassNames()}
      onClick={onSquareClick}
      onContextMenu={onRightClick}
    >
      {renderContent()}
    </div>
  );
};

export default Square;
