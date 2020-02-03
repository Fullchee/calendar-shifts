describe("first test", () => {
  beforeEach(function() {
    cy.visit("localhost:3000/test");
  });
  it("do basically nothing", () => {
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
