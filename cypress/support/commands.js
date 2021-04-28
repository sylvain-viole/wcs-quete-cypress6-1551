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


Cypress.Commands.add('forceClick', (locator) => {
    cy.get(locator).click({force: true})
})

Cypress.Commands.add("checkExists", (locator) => {
    cy.get(locator).should("exist");
});
Cypress.Commands.add("checkIsVisible", (locator) => {
    cy.get(locator).scrollIntoView().should("be.visible");
});

Cypress.Commands.add("isThere", (element, visibleMode = false) => {
    if (typeof element === "string") {
        cy.checkExists(element);
        if (visibleMode) {
            cy.checkIsVisible(element);
        }
    }
    if (typeof element === "object") {
        if (Array.isArray(element)) {
            element.forEach((subElement) => {
                cy.checkExists(subElement);
                if (visibleMode) {
                    cy.checkIsVisible(subElement);
                }
            });
        } else {
            for (const subElement in element) {
                cy.checkExists(element[subElement]);
                if (visibleMode) {
                    cy.checkIsVisible(element[subElement]);
                }
            }
        }
    }
});

Cypress.Commands.add("setInput", (locator, value, forceStatus = false) => {
    cy.get(locator).type(value, {force: forceStatus}).should("have.value", value);
});
