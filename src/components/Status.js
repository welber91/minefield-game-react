import React, { useContext, useState } from "react";
import boardContext from "../context/BoardContext";
import useInterval from "../hooks/useInterval";

const Status = () => {
  const { gameState, boardDispatch } = useContext(boardContext);
  const [time, setTime] = useState(0);

  useInterval(() => {
    setTime(time + 1);
  }, 1000);

  const getPercentIcon = () => {
    if (gameState.gameFinished && gameState.gameResult === "WIN") {
      return (
        <svg className="icon">
          <use href="#cup" />
        </svg>
      );
    } else if (gameState.gameFinished && gameState.gameResult === "LOST") {
      return (
        <svg className="icon">
          <use href="#death" />
        </svg>
      );
    }
    return (
      <i
        className="far fa-thumbs-up"
        style={{ color: "#82c91e", fontSize: 40 }}
      />
    );
  };

  const getBombIcon = () => {
    if (gameState.gameFinished && gameState.gameResult === "LOST") {
      return (
        <svg className="icon">
          <use href="#bomb" />
        </svg>
      );
    }
    return (
      <svg className="icon">
        <use href="#bomb-1" />
      </svg>
    );
  };

  const getGameStatus = () => {
    if (gameState.gameFinished) {
      return gameState.gameResult;
    }
    const sec = ("0" + parseInt(time % 60)).slice(-2);
    const min = ("0" + Math.floor(time / 60)).slice(-2);
    return `${min}:${sec}`;
  };

  return (
    <div
      className="row text-center"
      style={{ margin: "auto", maxWidth: "300px" }}
    >
      <div className="col-sm-4">
        {getBombIcon()}
        <p>{gameState.leftBombs}</p>
      </div>
      <div
        className="col-sm-4"
        onClick={() => {
          setTime(0);
          boardDispatch({ type: "RESTART" });
        }}
      >
        <svg className="icon">
          <use href="#refresh" />
        </svg>
        <p>{getGameStatus()}</p>
      </div>
      <div className="col-sm-4">
        {getPercentIcon()}
        <p>{gameState.percent}%</p>
      </div>
    </div>
  );
};

export default Status;
