import { Board } from "../robot.types";
import { createRobot } from "../createRobot";

const mockBoard: Board = {
  width: 6,
  height: 5,
};

describe("Robot", () => {
  let robot: ReturnType<typeof createRobot>;

  beforeEach(() => {
    robot = createRobot(mockBoard, 0, 0, "N");
  });

  test("initial position and orientation", () => {
    expect(robot.currentLocation()).toBe("0 0 N");
  });

  test("move forward", () => {
    robot.moveAroundBoard("F");
    expect(robot.currentLocation()).toBe("0 1 N");
  });

  test("rotate right and move forward", () => {
    robot.moveAroundBoard("RFRF");
    expect(robot.currentLocation()).toBe("1 0 S LOST");
  });

  test("rotate left and move forward", () => {
    robot.moveAroundBoard("LFRF");
    expect(robot.currentLocation()).toBe("0 0 W LOST");
  });

  test("handle edge of board", () => {
    robot.moveAroundBoard("FFFFF");
    expect(robot.currentLocation()).toBe("0 5 N");
  });

  test("ignore movements after getting lost", () => {
    robot.moveAroundBoard("FFFFF");
    robot.moveAroundBoard("F");
    expect(robot.currentLocation()).toBe("0 5 N LOST");
  });

  test("handle lost scents", () => {
    robot.setLostScents({ "0,5": true });
    robot.moveAroundBoard("FFFFF");
    expect(robot.currentLocation()).toBe("0 5 N");
  });

  test("rotate multiple times", () => {
    robot.moveAroundBoard("RRRR"); // 360 degrees rotation
    expect(robot.currentLocation()).toBe("0 0 N");
  });

  test("robot moveAroundBoard Challenge 1", () => {
    const mockBoardData = {
      width: 5,
      height: 3,
    };

    const robot = createRobot(mockBoardData, 1, 1, "E");

    // Perform the movements
    robot.moveAroundBoard("RFRFRFRF");

    // Assert the final location
    expect(robot.currentLocation()).toBe("1 1 E");
  });

  test("invalid orientation", () => {
    expect(() => {
      createRobot(mockBoard, 0, 0, "X" as "N" | "E" | "S" | "W");
    }).toThrow("Invalid Orientation X");
  });
});
