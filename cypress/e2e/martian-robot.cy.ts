describe("Board Component", () => {
  const baseUrl = "http://localhost:3000/";
  const waitTime = 1000;
  const hoverColor = "rgb(20, 19, 19)";

  const moveForward = (steps: number) => {
    for (let i = 0; i < steps; i++) {
      cy.get("button").contains("Move Forward").click();
      cy.wait(waitTime);
    }
  };

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("renders the board and buttons", () => {
    cy.get("h1").contains("Martian Robot");
    ["Move Forward", "Turn Left", "Turn Right"].forEach((button) => {
      cy.get("button").contains(button).should("be.visible");
    });
  });

  it("initially places the robot at the bottom-left corner", () => {
    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 0 0 N");
  });

  it("shows the exact current position of the robot after few random moves", () => {
    cy.get("button").contains("Turn Right").click();
    moveForward(3);
    cy.get("button").contains("Turn Left").click();
    moveForward(3);

    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 3 3 N");
  });

  it("moves the robot forward", () => {
    cy.get("button").contains("Move Forward").click();
    cy.wait(waitTime);
    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 0 1 N");
  });

  it("moves the robot forward until it gets lost at the end of the board", () => {
    moveForward(7);

    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 0 6 N LOST");
  });

  it("if the robot turns right and keeps moving forward, it will get lost at the end of the board", () => {
    cy.get("button").contains("Turn Right").click();
    moveForward(14);

    cy.get('[data-cy="current-position"]')
      .should("be.visible")
      .and("contain", "Current Position: 13 0 E LOST");
  });

  it("turns the robot left and right", () => {
    cy.wait(waitTime);
    cy.get("button").contains("Turn Left").click();
    cy.get('[data-cy="current-position"]').should(
      "contain",
      "Current Position: 0 0 W"
    );

    cy.wait(waitTime);
    cy.get("button").contains("Move Forward").click();
    cy.get('[data-cy="current-position"]').should(
      "contain",
      "Current Position: 0 0 W LOST"
    );
  });

  it("changes the button color on hover", () => {
    cy.get("button").each((button) => {
      cy.wrap(button)
        .wait(waitTime)
        // @ts-expect-error
        .realHover()
        .should("have.css", "background-color", hoverColor);
    });
  });

  it("shows the correct background color on hover", () => {
    cy.get('[data-cy="current-position"]')
      .wait(waitTime)
      // @ts-expect-error
      .realHover()
      .should("have.css", "background-color", hoverColor);
  });
});
