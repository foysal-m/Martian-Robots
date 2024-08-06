import { Orientation } from "./robot.types";

export const orientationToDegrees = (orientation: Orientation): number => {
  switch (orientation) {
    case "N":
      return 0;
    case "E":
      return 90;
    case "S":
      return 180;
    case "W":
      return 270;
    default:
      throw new Error(`Invalid Orientation ${orientation}`);
  }
};

export const degreesToOrientation = (
  degrees: number
): keyof typeof Orientation => {
  switch (degrees % 360) {
    case 0:
      return "N";
    case 90:
      return "E";
    case 180:
      return "S";
    case 270:
      return "W";
    default:
      throw new Error(`Invalid value ${degrees}`);
  }
};
