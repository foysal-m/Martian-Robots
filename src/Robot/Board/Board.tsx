import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createRobot } from "../utilities/createRobot";
import Texts from "../../locales/robot.json";

import styles from "./Board.module.scss";
import { Orientation } from "../utilities/robot.types";

// Define the board dimensions
const boardWidth = 14; // Upper-right x-coordinate
const boardHeight = 7; // Upper-right y-coordinate

export const Board = () => {
  // Initialize the robot at the bottom-left corner (0, 0)
  const [robot] = useState(() =>
    createRobot({ width: boardWidth, height: boardHeight }, 0, 0, Orientation.N)
  );

  const [robotPosition, setRobotPosition] = useState(robot.currentLocation());
  const { t } = useTranslation();

  // Create cells for the board
  const cells = Array.from({ length: boardWidth * boardHeight });
  const isRobotLost = robotPosition.includes("LOST");

  const moveRobot = (movements: string) => {
    robot.moveAroundBoard(movements);
    setRobotPosition(robot.currentLocation());
  };

  useEffect(() => {
    if (isRobotLost) {
      const audio = new Audio(require("../../scream.mp3"));
      audio.play();
    }
  }, [isRobotLost]);

  return (
    <div className={styles.container}>
      <h1>{t(Texts.title)}</h1>
      <div className={styles.board}>
        {cells.map((_, index) => {
          const x = index % boardWidth;
          const y = Math.floor(index / boardWidth);

          const robotCell =
            robotPosition.startsWith(`${x} ${boardHeight - 1 - y}`) &&
            !isRobotLost;

          return (
            <div
              key={index}
              className={`${styles.boardCell} ${
                robotCell ? styles.robotCell : ""
              } ${isRobotLost ? styles.lostRobot : ""}`}
            ></div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => moveRobot("F")}
          disabled={isRobotLost}
          data-cy="move-forward"
        >
          {t(Texts.moveForward)}
        </button>
        <button
          onClick={() => moveRobot("L")}
          disabled={isRobotLost}
          data-cy="turn-left"
        >
          {t(Texts.turnLeft)}
        </button>
        <button
          onClick={() => moveRobot("R")}
          disabled={isRobotLost}
          data-cy="turn-right"
        >
          {t(Texts.turnRight)}
        </button>
      </div>
      <div className={styles.currentPosition} data-cy="current-position">
        Current Position: {robotPosition}
      </div>
      {isRobotLost && (
        <div className={styles.warningNotification}>
          {t(Texts.refreshMessage)}
        </div>
      )}
    </div>
  );
};

export default Board;
