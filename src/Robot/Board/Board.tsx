import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createRobot } from "../utilities/createRobot";
import Texts from "../../locales/robot.json";

import styles from "./Board.module.scss";

// Define the board dimensions
const boardWidth = 14; // Upper-right x-coordinate
const boardHeight = 7; // Upper-right y-coordinate

export const Board = () => {
  // Initialize the robot at the bottom-left corner (0, 0)
  const [robot, setRobot] = useState(() =>
    createRobot({ width: boardWidth, height: boardHeight }, 0, 0, "N")
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
    // Play sound if robot position includes "LOST"
    if (isRobotLost) {
      const audio = new Audio(require("../../scream.mp3"));
      if (audio) {
        audio.play();
      }
    }
  }, [robotPosition, isRobotLost]);

  return (
    <div className={styles.container}>
      <h1>{t(Texts.title)}</h1>
      <div className={styles.board}>
        {cells.map((_, index) => {
          // Calculate the column and row for the current cell
          const x = index % boardWidth;
          const y = Math.floor(index / boardWidth);

          // Determine if this cell contains the robot
          const robotCell =
            robotPosition.startsWith(`${x} ${boardHeight - 1 - y}`) &&
            !isRobotLost;

          return (
            <div
              key={index}
              className={`${styles.boardCell} ${
                robotCell ? styles.robotCell : ""
              }`}
            ></div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button onClick={() => moveRobot("F")} disabled={isRobotLost}>
          {t(Texts.moveForward)}
        </button>
        <button onClick={() => moveRobot("L")} disabled={isRobotLost}>
          {t(Texts.turnLeft)}
        </button>
        <button onClick={() => moveRobot("R")} disabled={isRobotLost}>
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
