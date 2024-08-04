import { degreesToOrientation, orientationToDegrees } from "./helper";
import { Board, LostScents } from "./robot.types";
// Constants
const rotateLeft: number = -90;
const rotateRight: number = 90;

// function to create robot
export const createRobot = (
  board: Board,
  x: number = 0,
  y: number = 0,
  orientation: "N" | "E" | "S" | "W" = "N"
) => {
  let currentX = x;
  let currentY = y;
  let currentRotate = orientationToDegrees(orientation);
  let isLost = false;
  const lostScents: LostScents = {};

  const moveToSquare = (newX: number, newY: number) => {
    currentX = newX;
    currentY = newY;
  };

  const moveAroundBoard = (movements: string): string => {
    movements.split("").every((move) => {
      if (isLost) return false; // Stop processing if lost
      let newX = currentX;
      let newY = currentY;
      switch (move.toUpperCase()) {
        case "L":
          currentRotate += rotateLeft;
          break;
        case "R":
          currentRotate += rotateRight;
          break;
        case "F":
          switch (currentRotate % 360) {
            case 0:
              newY += 1;
              break;
            case 90:
              newX += 1;
              break;
            case 180:
              newY -= 1;
              break;
            case 270:
              newX -= 1;
              break;
          }
          break;
      }

      if (newX < 0 || newX >= board.width || newY < 0 || newY >= board.height) {
        if (lostScents[`${currentX},${currentY}`] === undefined) {
          isLost = true;
          return false;
        }
      } else {
        moveToSquare(newX, newY);
      }

      if (currentRotate >= 360) {
        currentRotate -= 360;
      } else if (currentRotate < 0) {
        currentRotate += 360;
      }

      return true;
    });

    return currentLocation();
  };

  const currentLocation = (): string => {
    let location = `${currentX} ${currentY} ${degreesToOrientation(
      currentRotate
    )}`;
    if (isLost) {
      location += " LOST";
    }
    return location;
  };

  return {
    moveToSquare,
    moveAroundBoard,
    currentLocation,
    setLostScents: (scents: LostScents) => {
      Object.assign(lostScents, scents);
    },
  };
};
