describe("Sample Test", () => {
  const url = Cypress.env("dev_url")

  it("can open the app", () => {
    cy.visit(url)
    cy.get("h1").should("have.text", "This text is green when Tailwind is working")
  })
})
