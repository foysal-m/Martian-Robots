import { degreesToOrientation, orientationToDegrees } from "./helper";
import { Board, LostScents, Orientation } from "./robot.types";

// Constants
const ROTATE_LEFT = -90;
const ROTATE_RIGHT = 90;
const FULL_ROTATION = 360;

// Helper function to normalize rotation
const normalizeRotation = (rotation: number): number => {
  return (rotation + FULL_ROTATION) % FULL_ROTATION;
};

// Function to create robot
export const createRobot = (
  board: Board,
  x = 0,
  y = 0,
  orientation: Orientation = Orientation.N
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
          currentRotate += ROTATE_LEFT;
          break;
        case "R":
          currentRotate += ROTATE_RIGHT;
          break;
        case "F":
          ({ newX, newY } = getNewCoordinates(newX, newY, currentRotate));
          break;
      }

      currentRotate = normalizeRotation(currentRotate);

      if (isOutOfBounds(newX, newY, board)) {
        if (!lostScents[`${currentX},${currentY}`]) {
          isLost = true;
          return false;
        }
      } else {
        moveToSquare(newX, newY);
      }

      return true;
    });

    return currentLocation();
  };

  const getNewCoordinates = (x: number, y: number, rotation: number) => {
    switch (rotation) {
      case 0:
        return { newX: x, newY: y + 1 };
      case 90:
        return { newX: x + 1, newY: y };
      case 180:
        return { newX: x, newY: y - 1 };
      case 270:
        return { newX: x - 1, newY: y };
      default:
        return { newX: x, newY: y };
    }
  };

  const isOutOfBounds = (x: number, y: number, board: Board) => {
    return x < 0 || x >= board.width || y < 0 || y >= board.height;
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
