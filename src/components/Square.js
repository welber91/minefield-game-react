import React, { useContext, useEffect } from "react";
import BoardContext from "../context/BoardContext";
import "./Square.css";

const Square = ({ x, y, cell }) => {
  const { boardDispatch } = useContext(BoardContext);
  const { clicked, flag, content } = cell;

  //Run one time when this component is mounted
  //Run the return stetament when component is unmounted
  // useEffect(() => {
  //   const onRightClick = e => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     boardDispatch({ type: "RIGHT_CLICK", x, y });
  //   };
  //   document.addEventListener("contextmenu", onRightClick);
  //   return () => {
  //     document.removeEventListener("contextmenu", onRightClick);
  //   };
  // }, []);

  const onRightClick = e => {
    e.preventDefault();
    e.stopPropagation();
    boardDispatch({ type: "RIGHT_CLICK", x, y });
  };

  const onSquareClick = e => {
    boardDispatch({ type: "CLICK", x, y });
  };

  const getClassNames = () => {
    let classes = "square-container ";
    if (clicked) classes += "clicked";
    return classes;
  };

  const renderContent = () => {
    if (flag) return "F";
    if (clicked && content !== 0) return content;
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
