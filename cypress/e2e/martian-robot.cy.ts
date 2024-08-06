describe("Board Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("renders the board and buttons", () => {
    // Check if the board title and buttons are rendered
    cy.get("h1").contains("Martian Robot");
    cy.get("button").contains("Move Forward").should("be.visible");
    cy.get("button").contains("Turn Left").should("be.visible");
    cy.get("button").contains("Turn Right").should("be.visible");
  });

  it("initially places the robot at the bottom-left corner", () => {
    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 0 0 N");
  });

  it("shows the exact current position of the robot after few random moves", () => {
    cy.get("button").contains("Turn Right").click();

    const numberOfMoves = 3;

    // Perform the moves
    for (let i = 0; i < numberOfMoves; i++) {
      cy.get("button").contains("Move Forward").click();
      cy.wait(1000);
    }

    cy.get("button").contains("Turn Left").click();

    for (let i = 0; i < numberOfMoves; i++) {
      cy.get("button").contains("Move Forward").click();
      cy.wait(1000);
    }

    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 3 3 N");
  });

  it("moves the robot forward", () => {
    // Click the "Move Forward" button and verify the new position
    cy.get("button").contains("Move Forward").click();
    cy.wait(1000);
    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 0 1 N");
  });

  it("moves the robot forward until it gets lost at the end of the board", () => {
    // Define the number of moves required to reach the end of the board
    const numberOfMoves = 7;

    // Perform the moves
    for (let i = 0; i < numberOfMoves; i++) {
      cy.get("button").contains("Move Forward").click();
      cy.wait(1000);
    }

    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 0 6 N LOST");
  });

  it("if the robot turns right and keep moving forward, it will get lost at the end of the board", () => {
    cy.get("button").contains("Turn Right").click();
    // Define the number of moves required to reach the end of the board
    const numberOfMoves = 14;

    // Perform the moves
    for (let i = 0; i < numberOfMoves; i++) {
      cy.get("button").contains("Move Forward").click();
      cy.wait(1000);
    }

    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 13 0 E LOST");
  });

  it("turns the robot left and right", () => {
    // Click the "Turn Left" button and check the updated position or state
    cy.wait(1000);
    cy.get("button").contains("Turn Left").click();
    cy.get('[data-cy="current-position"]').should(
      "contain",
      "Current Position: 0 0 W"
    );

    // Click the "Move Forward" button and check the updated position or state
    // So from the 0 0 N position if we click left and move forward, it will get lost and audio will be played
    cy.wait(1000);
    cy.get("button").contains("Move Forward").click();
    cy.get('[data-cy="current-position"]').should(
      "contain",
      "Current Position: 0 0 W LOST"
    );
  });

  it("changes the button color on hover", () => {
    const expectedHoverColor = "rgb(20, 19, 19)";

    // Get all buttons and check hover color
    cy.get("button").each((eachButton: keyof HTMLElementTagNameMap) => {
      cy.get(eachButton)
        .wait(2000)
        // @ts-expect-error
        .realHover()
        .should("have.css", "background-color", expectedHoverColor);
    });
  });

  it("shows the correct background color on hover", () => {
    const expectedHoverColor = "rgb(20, 19, 19)";
    cy.get('[data-cy="current-position"]')
      .wait(2000)
      // @ts-ignore
      .realHover()
      .should("have.css", "background-color", expectedHoverColor);
  });
});
