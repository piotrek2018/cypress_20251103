export class BasePage {
  protected url: string;

  constructor(url: string = "") {
    this.url = url;
  }

  visit(): void {
    cy.visit(this.url);
  }

  clickElement(selector: string, force: boolean = false): void {
    cy.get(selector).should("be.visible").click({ force });
  }

  typeText(selector: string, text: string, clearFirst: boolean = true): void {
    const element = cy.get(selector).should("be.visible");
    if (clearFirst) {
      element.clear();
    }
    element.type(text);
  }

  verifyElementVisible(selector: string): void {
    cy.get(selector).should("be.visible");
  }

  verifyElementContainsText(selector: string, expectedText: string): void {
    cy.get(selector).should("contain.text", expectedText);
  }

  verifyElementEnabled(selector: string): void {
    cy.get(selector).should("not.be.disabled");
  }

  verifyElementDisabled(selector: string): void {
    cy.get(selector).should("be.disabled");
  }
}
