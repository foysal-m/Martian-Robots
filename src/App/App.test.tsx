import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the Board component
jest.mock("../Robot/Board/Board", () => ({
  __esModule: true,
  default: () => <div data-testid="board-component">Board Component</div>,
}));

describe("App Component", () => {
  test("renders the App component with Board", () => {
    render(<App />);

    const boardComponent = screen.getByTestId("board-component");
    expect(boardComponent).toBeInTheDocument();
    expect(boardComponent).toHaveTextContent("Board Component");
  });
});
