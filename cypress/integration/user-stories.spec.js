describe("Test form error checking", () => {
  beforeEach(function() {
    cy.visit("localhost:3000/test");
  });
  it("should notify the user that they have to fill in the form", () => {
    // click with no input
    cy.get(".btn--submit").click({ force: true });

    // click with only stuff on the calendar
    cy.get(".Toastify__toast-body")
      .contains("Make sure to select days on the calendar")
      .click();
    cy.get(".DayPicker")
      .contains("11")
      .click();
    cy.get(".btn--submit").click({ force: true });
    cy.get(".Toastify__toast-body")
      .contains("Make sure to enter a title for your events")
      .click();

    // enter a title
    cy.get("#title").type("aslkdjf");
    cy.get(".btn--submit").click({ force: true });
    // TODO: don't use Fetch API in tests
    cy.get(".Toastify__toast-body").should(
      "contain",
      "11, " + new Date().getFullYear()
    );
  });
});

describe("should modify the original dropdown", () => {
  beforeEach(function() {
    cy.visit("localhost:3000/test");
  });
  it.only("should modify the original dropdown", () => {
    cy.get("#edit-shifts").click();
    cy.get("#modal-select-shift").select(`["15:30","23:30"]`);
    cy.get(".btn--close").click();
    cy.get("#select-shift").should("have.value", `["15:30","23:30"]`);
  });
  // TODO: delete, create

  // TODO: create should set the new hours to be selected
});
