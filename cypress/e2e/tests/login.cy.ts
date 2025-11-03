/// <reference types="cypress" />

import { LoginPage } from "../../pages/LoginPage";

describe("Login Functionality - Demo Bank", () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it("Should successfully login with correct credentials", () => {
    cy.fixture("loginData").then((data) => {
      const validUser = data.validUser;

      loginPage.login(validUser.userId, validUser.userPassword);

      cy.url().should("not.eq", Cypress.config("baseUrl") + "/");
    });
  });

  it("Should show error for unsuccessful login with too short username", () => {
    cy.fixture("loginData").then((data) => {
      const invalidUser = data.invalidUsers.tooShortUsername;
      const errorMsg = data.errorMessages.usernameMinLength;

      loginPage.enterLogin(invalidUser.userId);
      loginPage.triggerLoginValidation();

      loginPage.verifyLoginError(errorMsg);
    });
  });

  it("Should show error for unsuccessful login with too short password", () => {
    cy.fixture("loginData").then((data) => {
      const invalidUser = data.invalidUsers.tooShortPassword;
      const errorMsg = data.errorMessages.passwordMinLength;

      loginPage.enterLogin(invalidUser.userId);
      loginPage.enterPassword(invalidUser.userPassword);
      loginPage.triggerPasswordValidation();

      loginPage.verifyPasswordError(errorMsg);
    });
  });

  it("Should show errors for both too short username and password", () => {
    cy.fixture("loginData").then((data) => {
      const usernameError = data.errorMessages.usernameMinLength;
      const passwordError = data.errorMessages.passwordMinLength;

      loginPage.enterLogin("abc");
      loginPage.triggerLoginValidation();

      loginPage.enterPassword("123");
      loginPage.triggerPasswordValidation();

      loginPage.verifyLoginError(usernameError);
      loginPage.verifyPasswordError(passwordError);
      loginPage.verifyLoginButtonDisabled();
    });
  });
});
