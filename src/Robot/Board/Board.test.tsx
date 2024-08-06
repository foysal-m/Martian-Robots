import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Board } from "./Board";
import { createRobot } from "../utilities/createRobot";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

// Mock createRobot function
jest.mock("../utilities/createRobot", () => ({
  createRobot: jest.fn(),
}));

const setupRobotMock = (
  location = "0 0 N",
  moveAroundBoardMock = jest.fn()
) => {
  (createRobot as jest.Mock).mockReturnValue({
    currentLocation: jest.fn(() => location),
    moveAroundBoard: moveAroundBoardMock,
  });
};

describe("Board Component", () => {
  beforeAll(() => {
    global.HTMLAudioElement.prototype.play = jest.fn();
    global.HTMLAudioElement.prototype.pause = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("moves the robot forward", () => {
    const moveAroundBoardMock = jest.fn();
    setupRobotMock("0 1 N", moveAroundBoardMock);

    render(<Board />);

    fireEvent.click(screen.getByText("Move Forward"));
    expect(moveAroundBoardMock).toHaveBeenCalledWith("F");
    expect(screen.getByText("Current Position: 0 1 N")).toBeInTheDocument();
  });

  test("rotates the robot left", () => {
    const moveAroundBoardMock = jest.fn();
    setupRobotMock("0 0 W", moveAroundBoardMock);

    render(<Board />);

    fireEvent.click(screen.getByText("Turn Left"));
    expect(moveAroundBoardMock).toHaveBeenCalledWith("L");
    expect(screen.getByText("Current Position: 0 0 W")).toBeInTheDocument();
  });

  test("rotates the robot right", () => {
    const moveAroundBoardMock = jest.fn();
    setupRobotMock("0 0 E", moveAroundBoardMock);

    render(<Board />);

    fireEvent.click(screen.getByText("Turn Right"));
    expect(moveAroundBoardMock).toHaveBeenCalledWith("R");
    expect(screen.getByText("Current Position: 0 0 E")).toBeInTheDocument();
  });

  test("handles robot going out of bounds and plays audio", () => {
    setupRobotMock("0 7 N LOST");

    render(<Board />);

    expect(
      screen.getByText("Current Position: 0 7 N LOST")
    ).toBeInTheDocument();
    expect(global.HTMLAudioElement.prototype.play).toHaveBeenCalledWith();
    expect(screen.queryByTestId("robot-cell")).toBeNull();
  });
});
