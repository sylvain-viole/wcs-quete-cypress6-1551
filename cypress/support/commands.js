// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add(
    "checkExistsAndVisible",
    (locators, visibleMode = true) => {
        locators.forEach((locator) => {
            cy.get(locator).should("exist");
            if (visibleMode) {
                cy.get(locator).should("be.visible");
            }
        });
    }
);

Cypress.Commands.add("setInput", (locator, value) => {
    cy.get(locator).type(value).should("have.value", value);
});
