import { useState, useEffect } from "react";
import { createRobot } from "../utilities/createRobot";
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

  // Create cells for the board
  const cells = Array.from({ length: boardWidth * boardHeight });

  const moveRobot = (movements: string) => {
    robot.moveAroundBoard(movements);
    setRobotPosition(robot.currentLocation());
  };

  useEffect(() => {
    // Play sound if robot position includes "LOST"
    if (robotPosition.includes("LOST")) {
      const audio = new Audio(require("../../scream.mp3"));
      if (audio) {
        audio.play();
      }
    }
  }, [robotPosition]);

  return (
    <div className={styles.container} data-testid="cypress-container">
      <h1>Martian Robot</h1>
      <div className={styles.board}>
        {cells.map((_, index) => {
          // Calculate the column and row for the current cell
          const x = index % boardWidth;
          const y = Math.floor(index / boardWidth);

          // Determine if this cell contains the robot
          const robotCell =
            robotPosition.startsWith(`${x} ${boardHeight - 1 - y}`) &&
            !robotPosition.includes("LOST");

          return (
            <div
              key={index}
              className={`${styles.boardCell} ${
                robotCell ? styles.robotCell : ""
              }`}
              data-testid={robotCell ? "robot-cell" : ""}
            ></div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button onClick={() => moveRobot("F")}>Move Forward</button>
        <button onClick={() => moveRobot("L")}>Turn Left</button>
        <button onClick={() => moveRobot("R")}>Turn Right</button>
      </div>
      <div className={styles.currentPosition}>
        Current Position: {robotPosition}
      </div>
    </div>
  );
};

export default Board;
