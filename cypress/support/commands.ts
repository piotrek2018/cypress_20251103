// cypress/support/commands.ts

import { LoginPage } from '../pages/LoginPage';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Zalogowanie się do aplikacji Demo Bank
       */
      loginToApp(userId?: string, password?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginToApp', (userId?: string, password?: string) => {
  const loginPage = new LoginPage();
  
  cy.fixture('loginData').then((data) => {
    const user = userId || data.validUser.userId;
    const pass = password || data.validUser.userPassword;
    
    cy.session([user, pass], () => {
      loginPage.visit();
      loginPage.login(user, pass);
      cy.url().should('not.include', '/login');
    });
  });
});

export {};
``