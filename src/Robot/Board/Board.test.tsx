import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Board } from "./Board";
import { createRobot } from "../utilities/createRobot";

// Mock the createRobot function
jest.mock("../utilities/createRobot", () => ({
  createRobot: jest.fn(() => ({
    currentLocation: jest.fn(() => "0 0 N"),
    moveAroundBoard: jest.fn(),
  })),
}));

describe("Board Component", () => {
  test("moves the robot forward", () => {
    const moveAroundBoardMock = jest.fn();
    (createRobot as jest.Mock).mockReturnValue({
      currentLocation: jest.fn(() => "0 1 N"),
      moveAroundBoard: moveAroundBoardMock,
    });

    render(<Board />);

    const moveForwardButton = screen.getByText("Move Forward");

    fireEvent.click(moveForwardButton);
    expect(moveAroundBoardMock).toHaveBeenCalledWith("F");

    const updatedPosition = screen.getByText("Current Position: 0 1 N");
    expect(updatedPosition).toBeInTheDocument();
  });

  test("rotates the robot left", () => {
    const moveAroundBoardMock = jest.fn();
    (createRobot as jest.Mock).mockReturnValue({
      currentLocation: jest.fn(() => "0 0 W"),
      moveAroundBoard: moveAroundBoardMock,
    });

    render(<Board />);

    const rotateLeftButton = screen.getByText("Rotate Left");

    fireEvent.click(rotateLeftButton);
    expect(moveAroundBoardMock).toHaveBeenCalledWith("L");

    const updatedPosition = screen.getByText("Current Position: 0 0 W");
    expect(updatedPosition).toBeInTheDocument();
  });

  test("rotates the robot right", () => {
    const moveAroundBoardMock = jest.fn();
    (createRobot as jest.Mock).mockReturnValue({
      currentLocation: jest.fn(() => "0 0 E"),
      moveAroundBoard: moveAroundBoardMock,
    });

    render(<Board />);

    const rotateRightButton = screen.getByText("Rotate Right");

    fireEvent.click(rotateRightButton);
    expect(moveAroundBoardMock).toHaveBeenCalledWith("R");

    const updatedPosition = screen.getByText("Current Position: 0 0 E");
    expect(updatedPosition).toBeInTheDocument();
  });

  test("handles robot going out of bounds", () => {
    (createRobot as jest.Mock).mockReturnValue({
      currentLocation: jest.fn(() => "0 7 N LOST"),
      moveAroundBoard: jest.fn(),
    });

    render(<Board />);

    const lostPosition = screen.getByText("Current Position: 0 7 N LOST");
    expect(lostPosition).toBeInTheDocument();

    // Check if the robot is hidden
    const robotCell = screen.queryByTestId("robot-cell");
    expect(robotCell).toBeNull();
  });
});
