// cypress/e2e/board.spec.js

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

  it("moves the robot forward", () => {
    // Click the "Move Forward" button and verify the new position
    cy.get("button").contains("Move Forward").click();
    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 0 1 N");
  });

  it("turns the robot left and right", () => {
    // Click the "Turn Left" button and check the updated position or state
    cy.get("button").contains("Turn Left").click();
    cy.get('[data-cy="current-position"]').should(
      "contain",
      "Current Position: 0 0 W"
    );

    // Click the "Move Forward" button and check the updated position or state
    // So from the 0 0 N position if we click left and move forward, it will get lost and audio will be played
    cy.get("button").contains("Move Forward").click();
    cy.get('[data-cy="current-position"]').should(
      "contain",
      "Current Position: 0 0 W LOST"
    );
  });
});
